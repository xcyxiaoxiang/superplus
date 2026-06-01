/**
 * superPlus plugin for OpenCode.ai
 *
 * Injects superPlus bootstrap context via system prompt transform.
 * Auto-registers skills directory via config hook (no symlinks needed).
 */

import path from 'path';
import fs from 'fs';
import os from 'os';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Simple frontmatter extraction (avoid dependency on skills-core for bootstrap)
const extractAndStripFrontmatter = (content) => {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, content };

  const frontmatterStr = match[1];
  const body = match[2];
  const frontmatter = {};

  for (const line of frontmatterStr.split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim();
      const value = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, '');
      frontmatter[key] = value;
    }
  }

  return { frontmatter, content: body };
};

// Normalize a path: trim whitespace, expand ~, resolve to absolute
const normalizePath = (p, homeDir) => {
  if (!p || typeof p !== 'string') return null;
  let normalized = p.trim();
  if (!normalized) return null;
  if (normalized.startsWith('~/')) {
    normalized = path.join(homeDir, normalized.slice(2));
  } else if (normalized === '~') {
    normalized = homeDir;
  }
  return path.resolve(normalized);
};

// Module-level cache for bootstrap content
let _bootstrapCache = undefined;

export const SuperplusPlugin = async ({ client, directory }) => {
  const homeDir = os.homedir();
  const skillsDir = path.resolve(__dirname, '../../skills');
  const envConfigDir = normalizePath(process.env.OPENCODE_CONFIG_DIR, homeDir);
  const configDir = envConfigDir || path.join(homeDir, '.config/opencode');

  // Helper to generate bootstrap content (cached after first call)
  const getBootstrapContent = () => {
    if (_bootstrapCache !== undefined) return _bootstrapCache;

    // Try to load using-superplus skill
    const skillPath = path.join(skillsDir, 'using-superplus', 'SKILL.md');
    if (!fs.existsSync(skillPath)) {
      _bootstrapCache = null;
      return null;
    }

    const fullContent = fs.readFileSync(skillPath, 'utf8');
    const { content } = extractAndStripFrontmatter(fullContent);

    // Try to load OpenCode tool mapping reference
    let toolMapping = '';
    const refPath = path.join(skillsDir, 'using-superplus', 'references', 'opencode-tools.md');
    if (fs.existsSync(refPath)) {
      toolMapping = fs.readFileSync(refPath, 'utf8');
    } else {
      toolMapping = `**Tool Mapping for OpenCode:**
When skills reference tools you don't have, substitute OpenCode equivalents:
- \`TodoWrite\` → \`todowrite\`
- \`Task\` tool with subagents → Use OpenCode's subagent system (@mention)
- \`Skill\` tool → OpenCode's native \`skill\` tool
- \`Read\`, \`Write\`, \`Edit\`, \`Bash\` → Your native tools

Use OpenCode's native \`skill\` tool to list and load skills.`;
    }

    _bootstrapCache = `<EXTREMELY_IMPORTANT>
You have superPlus.

**IMPORTANT: The using-superplus skill content is included below. It is ALREADY LOADED - you are currently following it. Do NOT use the skill tool to load "using-superplus" again - that would be redundant.**

${content}

${toolMapping}
</EXTREMELY_IMPORTANT>`;

    return _bootstrapCache;
  };

  return {
    // Inject skills path and register slash command
    config: async (config) => {
      config.skills = config.skills || {};
      config.skills.paths = config.skills.paths || [];
      if (!config.skills.paths.includes(skillsDir)) {
        config.skills.paths.push(skillsDir);
      }

      // Register /sp command — dispatches to the right superPlus skill
      config.command = config.command || {};
      if (!config.command['sp']) {
        config.command['sp'] = {
          template: `The user wants to use a superPlus skill matching "$ARGUMENTS".

Available skills:
- exploring — Free-form problem exploration and requirement clarification
- designing — Structured design documentation
- write-plan-tasks — Generate proposal, specs, plan, and tasks
- apply-change — TDD implementation with parallel subagents
- verify-change — 5D verification against change specs
- sync-specs — Merge delta specs into main spec library
- archive-change — Finalize and archive completed changes
- root-cause-debugging — Systematic root cause investigation and fix
- test-driven-development — Red-green-refactor TDD cycle
- using-git-worktrees — Isolate feature work with git worktrees
- writing-skills — Create and edit skill documents
- using-superplus — Entry point: how to use superPlus

If a skill name was given in $ARGUMENTS, load its SKILL.md and follow the instructions. If not, ask the user which skill they need.`,
          description: 'superPlus: /sp <skill-name> — run a superPlus skill',
          subtask: false,
        };
      }
    },

    // Inject bootstrap into the first user message of each session.
    'experimental.chat.messages.transform': async (_input, output) => {
      const bootstrap = getBootstrapContent();
      if (!bootstrap || !output.messages.length) return;
      const firstUser = output.messages.find(m => m.info.role === 'user');
      if (!firstUser || !firstUser.parts.length) return;

      // Guard: skip if first user message already contains bootstrap
      if (firstUser.parts.some(p => p.type === 'text' && p.text.includes('EXTREMELY_IMPORTANT'))) return;

      const ref = firstUser.parts[0];
      firstUser.parts.unshift({ ...ref, type: 'text', text: bootstrap });
    }
  };
};
