---
name: using-superplus
description: "Use when starting any conversation — establishes how to find and use superPlus skills. Requires Skill tool invocation before ANY response including clarifying questions. This is the entry point for all superPlus methodologies."
---

# Using superPlus — Skill Discovery & Discipline

This skill defines **how to use all superPlus skills**. It enforces the core discipline: always check skills before responding.

<SUBAGENT-STOP>
If you were dispatched as a subagent to execute a specific task, skip this skill.
</SUBAGENT-STOP>

---

<EXTREMELY-IMPORTANT>
If you think there is even a 1% chance a skill might apply to what you are doing, you ABSOLUTELY MUST invoke the skill.

IF A SKILL APPLIES TO YOUR TASK, YOU DO NOT HAVE A CHOICE. YOU MUST USE IT.

This is not negotiable. This is not optional. You cannot rationalize your way out of this.
</EXTREMELY-IMPORTANT>

---

## Instruction Priority

superPlus skills override default system prompt behavior, but **user instructions always take precedence**:

1. **User's explicit instructions** (AGENTS.md, CLAUDE.md, direct requests) — highest priority
2. **superPlus skills** — override default system behavior where they conflict
3. **Default system prompt** — lowest priority

If AGENTS.md says "don't use TDD" and a skill says "always use TDD," follow AGENTS.md. The user is in control.

---

## superPlus Workflow

The six-step spec-driven development workflow. Start here when building new features:

```
exploring ──→ designing ──→ write-plan-tasks ──→ apply-change ──→ verify-change ──→ sync-specs ──→ archive-change
(explore)     (design)      (proposal + plan)   (TDD + execute)   (5D validate)     (merge specs)    (finalize)
```

For issues outside the main flow (bugs, code review, etc.), see [When Multiple Skills Apply](#when-multiple-skills-apply).

---

## How to Access Skills

**In Claude Code:** Use the `Skill` tool. When you invoke a skill, its content is loaded and presented to you — follow it directly. Never use the Read tool on skill files directly.

**In Copilot CLI:** Use the `skill` tool. Skills are auto-discovered from installed plugins. The `skill` tool works the same as Claude Code's `Skill` tool.

**In OpenCode:** Use the `skill` tool. Skills are discovered from all configured sources (global `~/.config/opencode/skill/`, project-level directories, and plugins).

**In other environments:** Check your platform's documentation for how skills are loaded.

## Platform Adaptation

Skills use Claude Code tool names. Non-CC platforms should check the platform-specific reference:

| Platform | Reference |
|----------|-----------|
| Claude Code | No adaptation needed — native tool names |
| Copilot CLI | `references/copilot-tools.md` |
| Codex CLI | `references/codex-tools.md` |
| OpenCode | `references/opencode-tools.md` |

---

## The Skill Discipline

**Invoke relevant or requested skills BEFORE any response or action.** Even a 1% chance a skill might apply means you should invoke the skill to check. If an invoked skill turns out to be wrong, you don't need to use it.

```
User message received ──→ Might any skill apply?
    │                       ├── yes, even 1% ──→ Invoke Skill tool ──→ Follow skill exactly
    │                       └── definitely not ──→ Respond normally
```

When you invoke a skill, announce it: "Using [skill-name] to [purpose]." If the skill has a checklist, create TodoWrite items for each.

---

## Red Flags — You're Rationalizing

| Thought | Reality |
|---------|---------|
| "This is just a simple question" | Questions are tasks. Check for skills. |
| "I need more context first" | Skill check comes BEFORE clarifying questions. |
| "Let me explore the codebase first" | Skills tell you HOW to explore. Check first. |
| "I can check git/files quickly" | Files lack conversation context. Check for skills. |
| "Let me gather information first" | Skills tell you HOW to gather information. |
| "This doesn't need a formal skill" | If a skill exists, use it. |
| "I know what that means" | Knowing the concept ≠ using the skill. Invoke it. |
| "The skill is overkill" | Simple things become complex. Use it. |
| "I remember this skill" | Skills evolve. Read current version. |
| "I'll just do this one thing first" | Check BEFORE doing anything. |

---

## Skill Types

- **Rigid** (TDD, debugging): Follow exactly. Don't adapt away discipline.
- **Flexible** (patterns): Adapt principles to context.

The skill itself tells you which.

---

## When Multiple Skills Apply

Use the **workflow sequence** as your guide. The 6-step flow is the primary path:

| Phase | Skill | Trigger |
|-------|-------|---------|
| Explore | `exploring` | Unclear requirements, need to investigate |
| Design | `designing` | Requirements clear, need structured design |
| Planning | `write-plan-tasks` | Design approved, need implementation plan |
| Implementation | `apply-change` | Tasks ready, need code |
| Verification | `verify-change` | Implementation done, validate against specs |
| Sync | `sync-specs` | Verify passed, merge delta specs |
| Archive | `archive-change` | All done, finalize |

For issues outside the main flow:

| Issue | Skill |
|-------|-------|
| Bug | `root-cause-debugging` first, then domain-specific |
| Code review | Built into `apply-change` (per-task) and `verify-change` (global) |
| Feature branch isolation | `using-git-worktrees` |
| Task execution (same session) | `apply-change` |
| Task execution (parallel subagents) | `apply-change` (dispatches internally) |
| Test methodology | `test-driven-development` |
| Writing or editing skills | `writing-skills` |

---

## Skill Sources

superPlus skills live in `superPlus/skills/`. The `skill` tool discovers them automatically when invoked from within the project. The global `using-superplus` entry skill lives at `~/.config/opencode/skill/using-superplus/`.

For the full project context (conventions, directory structure, workflow details), see `superPlus/AGENTS.md`.

---

## Installing superPlus for New Projects

See `superPlus/AGENTS.md` → **Installation** section for setup instructions: how to copy the project kit, install the global skill, and configure AGENTS.md for a new project.
