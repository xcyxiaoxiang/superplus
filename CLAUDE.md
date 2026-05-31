# superPlus — Spec-Driven Development Kit for Claude Code

superPlus is a **spec-driven development workflow** that guides Claude Code through a complete feature lifecycle: discover, design, plan, implement (TDD), verify, sync, and archive.

## Workflow

```
exploring ──→ designing ──→ write-plan-tasks ──→ apply-change ──→ verify-change ──→ sync-specs ──→ archive-change
(explore)     (design)      (proposal + plan)   (TDD + execute)   (5D validate)     (merge specs)    (finalize)
                                                                         │
                                                                         ▼
                                                                root-cause-debugging
                                                                 (issues triage & fix)
                                                                         │
                                                                         ▼
                                                                     re-verify
```

## Getting Started

At session start, load the entry skill:

```
Skill using-superplus
```

This loads the skill discipline rules and shows all available skills. Then follow the workflow above.

### Quick Start for New Features

1. **`Skill exploring`** — explore the problem space (if requirements unclear)
2. **`Skill designing`** — structure the design and produce design doc
3. **`Skill write-plan-tasks`** — generate proposal, specs, plan, and tasks
4. **`Skill apply-change`** — implement with TDD and subagent-driven development
5. **`Skill verify-change`** — 5D verification
   - **If CRITICAL issues found** → `Skill root-cause-debugging` → re-run verify-change
6. **`Skill sync-specs`** — merge delta specs into main spec library
7. **`Skill archive-change`** — finalize and archive

## Skills Overview

| Skill | Trigger | Output |
|-------|---------|--------|
| `exploring` | Unclear requirements, need to investigate | Exploration summary (in conversation) |
| `designing` | Design is needed | Design doc (`docs/designs/`) |
| `write-plan-tasks` | Design approved | Full artifacts: proposal + specs + plan + tasks (`docs/changes/<name>/`) |
| `apply-change` | Tasks ready | Subagent-driven TDD implementation, tests passing |
| `verify-change` | Implementation done | 5D verification report + issues triage (CRITICAL → `root-cause-debugging` fix loop) |
| `sync-specs` | Verify passed | Updated main specs (`docs/specs/`) |
| `archive-change` | All done | Archived (`docs/changes/archive/`) |

Other skills:

- **Bug fix**: `root-cause-debugging` — 5-phase systematic debugging, auto-triggered by `verify-change`
- **TDD**: `test-driven-development` — red-green-refactor cycle
- **Worktree isolation**: `using-git-worktrees` — protects main branch during implementation
- **Writing skills**: `writing-skills` — TDD for documentation
- **Entry point**: `using-superplus` — skill invocation discipline

## Project Structure

```
superPlus/
├── skills/              # 12 skills (7 core + 5 auxiliary)
├── templates/           # 4 templates (proposal/delta-spec/plan/tasks)
├── hooks/               # Session-start hooks
├── scripts/             # Helper scripts
├── docs/
│   ├── changes/         # Active change directories
│   │   └── archive/     # Archived changes
│   ├── designs/         # Design documents
│   └── specs/           # Main spec library
├── .opencode/           # OpenCode plugin config
├── .claude-plugin/      # Claude Code plugin manifest
├── .codex-plugin/       # Codex plugin config
├── .cursor-plugin/      # Cursor plugin config
├── AGENTS.md            # Full project reference
├── CLAUDE.md            # This file
└── LICENSE              # MIT license
```

## Conventions

- **Change naming**: kebab-case, starts with verb (add/fix/update/remove/optimize)
- **Design docs**: `docs/designs/YYYY-MM-DD-<topic>-design.md`
- **Main specs**: `docs/specs/<capability>/spec.md`
- **Change artifacts**: `docs/changes/<name>/{proposal,specs/*,plan,tasks}.md`
- **Archives**: `docs/changes/archive/YYYY-MM-DD-<name>/`
- **TDD**: Always write failing test first, then implement, then verify
- **All artifacts required**: proposal + specs + plan + tasks for every change

## Tool Mapping for Claude Code

This skill uses Claude Code's native tool names. No adaptation needed.
