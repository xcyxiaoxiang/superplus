# superPlus — Spec-Driven Development Kit for Claude Code

superPlus is a **spec-driven development workflow** that guides Claude Code through a complete feature lifecycle: discover, design, plan, implement (TDD), verify, sync, and archive.

## Workflow

```
exploring ──→ designing ──→ write-plan-tasks ──→ apply-change ──→ verify-change ──→ sync-specs ──→ archive-change
(explore)     (design)      (specs + tasks)     (TDD + execute)   (5D validate)     (merge specs)    (finalize)
                                                                          │
                                                                          ▼
                                                                 root-cause-debugging
                                                                  (issues triage & fix)
                                                                          │
                                                                          ▼
                                                                      re-verify

quick-change ──→ 4-step condensed flow (Quick Spec → Implement → Verify → Finalize)
(for small changes)
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
3. **`Skill write-plan-tasks`** — generate specs and tasks
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
| `write-plan-tasks` | Design approved | Full artifacts: specs + tasks (`docs/changes/<name>/`) |
| `apply-change` | Tasks ready | Subagent-driven TDD implementation, tests passing |
| `verify-change` | Implementation done | 5D verification report + issues triage (CRITICAL → `root-cause-debugging` fix loop) |
| `sync-specs` | Verify passed | Updated main specs (`docs/specs/`) |
| `archive-change` | All done | Archived (`docs/changes/archive/`) |
| `quick-change` | Small change needed | Condensed 4-step: Quick Spec → Implement → Verify → Finalize |

Other skills:

- **Bug fix**: `root-cause-debugging` — 5-phase systematic debugging, auto-triggered by `verify-change`
- **TDD**: `test-driven-development` — red-green-refactor cycle
- **Worktree isolation**: `using-git-worktrees` — protects main branch during implementation
- **Writing skills**: `writing-skills` — TDD for documentation
- **Entry point**: `using-superplus` — skill invocation discipline

## Project Structure

```
superPlus/
├── skills/              # 13 skills (8 core + 5 auxiliary)
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
- **Change artifacts**: `docs/changes/<name>/{1.specs/*,2.tasks}.md`
- **Archives**: `docs/changes/archive/YYYY-MM-DD-<name>/`
- **TDD**: Always write failing test first, then implement, then verify
- **All artifacts required**: specs + tasks for every change

## Tool Mapping for Claude Code

This skill uses Claude Code's native tool names. No adaptation needed.
