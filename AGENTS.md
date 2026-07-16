# superPlus — AI-Native Spec-Driven Development Kit

superPlus is a **spec-driven development workflow** that merges OpenSpec's artifact-driven approach with Superpowers' behavior-shaping skills. It provides 8 core workflow skills plus 5 auxiliary skills for a complete development lifecycle.

## Workflow

```
exploring → designing ──→ write-plan-tasks ──→ apply-change ──→ verify-change ──→ sync-specs ──→ archive-change
(explore) (design)      (specs + tasks)     (TDD + execute)   (5D validate)     (merge specs)    (finalize)
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

## Skills

| Skill | When | Input | Output |
|-------|------|-------|--------|
| `exploring` | Requirements unclear | Problem statement | Exploration summary (in conversation) |
| `designing` | Design is needed | Exploration summary / clear requirements | `docs/changes/<topic>/design.md` |
| `write-plan-tasks` | Design approved | Design doc | `docs/changes/<name>/{1.specs,2.tasks}.md` |
| `apply-change` | Tasks ready | `tasks.md` | Implemented code (TDD, all tests passing) |
| `verify-change` | Implementation done | Change directory | 5D verification report + issues triage (CRITICAL → `root-cause-debugging` fix loop) |
| `sync-specs` | Verify passed | Delta specs | Updated `docs/specs/<capability>/spec.md` |
| `archive-change` | Sync done | Change directory | Moved to `docs/changes/archive/YYYY-MM-DD-<name>/` |
| `quick-change` | Small change needed | Problem description | Condensed 4-step: Quick Spec → Implement → Verify → Finalize |

## Directory Structure

```
superPlus/
├── skills/              # 13 skills (8 core + 5 auxiliary)
│   ├── exploring/       ├── designing/        ├── write-plan-tasks/
│   ├── apply-change/    ├── verify-change/    ├── sync-specs/
│   ├── archive-change/  ├── quick-change/     ├── root-cause-debugging/
│   ├── test-driven-development/
│   ├── using-git-worktrees/
│   ├── using-superplus/
│   └── writing-skills/
├── hooks/               # Cross-platform session-start hooks
├── scripts/             # Helper scripts
├── docs/
│   ├── changes/         # Designs + active changes (topic/design.md + 1.specs/ + 2.tasks.md)
│   │   └── archive/     # Archived changes
│   └── specs/           # Main spec library
├── .opencode/           # OpenCode plugin config
├── .claude-plugin/      # Claude Code plugin config
├── .codex-plugin/       # Codex plugin config
├── .cursor-plugin/      # Cursor plugin config
├── AGENTS.md            # Full project reference
├── CLAUDE.md            # Claude Code quick guide
└── LICENSE              # MIT license
```

## Conventions

- **Design docs**: `docs/changes/<topic>/design.md` — topic is kebab-case
- **Main specs**: `docs/specs/<capability>/spec.md`
- **Change artifacts**: `docs/changes/<name>/{design.md,1.specs/*,2.tasks}.md`
- **Archives**: `docs/changes/archive/YYYY-MM-DD-<name>/`
- **TDD**: Always write failing test first, then implement, then verify
- **All artifacts required**: specs + tasks for every change

## Installation

### OpenCode（插件方式）

通过 OpenCode 插件机制安装。在 `opencode.json` 中添加：

```json
{
  "plugin": ["./superPlus/superPlus"]
}
```

如果发布到 git 远程源后：

```json
{
  "plugin": ["superplus@git+https://github.com/xcyxiaoxiang/superplus.git"]
}
```

插件会自动注册所有技能并注入 `using-superplus` 引导内容。无需手动复制到全局 skill 目录。

### 其他平台

- **Claude Code**: 见 `.claude-plugin/`
- **Codex**: 见 `.codex-plugin/`
- **Cursor**: 见 `.cursor-plugin/`

---

## Origins

superPlus adapts techniques from:
- **OpenSpec** (artifact DAG, 3D verification, intelligent delta merging)
- **Superpowers** (subagent-driven development, TDD, root cause debugging)

superPlus is an independent workflow kit. It does not depend on or extend either project.

## Acknowledgements

- **OpenSpec** — [github.com/Fission-AI/OpenSpec](https://github.com/Fission-AI/OpenSpec), MIT License, Copyright (c) 2025 Fission AI
- **Superpowers** — [github.com/obra/superpowers](https://github.com/obra/superpowers), MIT License, Copyright (c) 2025 Jesse Vincent
