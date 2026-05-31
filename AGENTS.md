# superPlus — AI-Native Spec-Driven Development Kit

superPlus is a **spec-driven development workflow** that merges OpenSpec's artifact-driven approach with Superpowers' behavior-shaping skills. It provides 7 core workflow skills plus 5 auxiliary skills for a complete development lifecycle.

## Workflow

```
exploring → designing ──→ write-plan-tasks ──→ apply-change ──→ verify-change ──→ sync-specs ──→ archive-change
(explore) (design)      (proposal + plan)   (TDD + execute)   (5D validate)     (merge specs)    (finalize)
                                                                     │
                                                                     ▼
                                                            root-cause-debugging
                                                             (issues triage & fix)
                                                                     │
                                                                     ▼
                                                                 re-verify
```

## Skills

| Skill | When | Input | Output |
|-------|------|-------|--------|
| `exploring` | Requirements unclear | Problem statement | Exploration summary (in conversation) |
| `designing` | Design is needed | Exploration summary / clear requirements | `docs/designs/YYYY-MM-DD-<topic>-design.md` |
| `write-plan-tasks` | Design approved | Design doc | `docs/changes/<name>/{proposal,specs,plan,tasks}.md` |
| `apply-change` | Tasks ready | `tasks.md` | Implemented code (TDD, all tests passing) |
| `verify-change` | Implementation done | Change directory | 5D verification report + issues triage (CRITICAL → `root-cause-debugging` fix loop) |
| `sync-specs` | Verify passed | Delta specs | Updated `docs/specs/<capability>/spec.md` |
| `archive-change` | Sync done | Change directory | Moved to `docs/changes/archive/YYYY-MM-DD-<name>/` |

## Directory Structure

```
superPlus/
├── skills/              # 12 skills (7 core + 5 auxiliary)
│   ├── exploring/       ├── designing/        ├── write-plan-tasks/
│   ├── apply-change/    ├── verify-change/    ├── sync-specs/
│   ├── archive-change/  ├── root-cause-debugging/
│   ├── test-driven-development/
│   ├── using-git-worktrees/
│   ├── using-superplus/
│   └── writing-skills/
├── templates/           # Artifact templates
│   ├── proposal.md
│   ├── delta-spec.md
│   ├── plan.md
│   └── tasks.md
├── hooks/               # Cross-platform session-start hooks
├── scripts/             # Helper scripts
├── docs/
│   ├── changes/         # Active change directories
│   │   └── archive/     # Archived changes
│   ├── designs/         # Design documents
│   └── specs/           # Main spec library
├── .opencode/           # OpenCode plugin config
├── .claude-plugin/      # Claude Code plugin config
├── .codex-plugin/       # Codex plugin config
├── .cursor-plugin/      # Cursor plugin config
├── AGENTS.md            # Full project reference
├── CLAUDE.md            # Claude Code quick guide
└── LICENSE              # MIT license
```
superPlus/
├── skills/              # All superPlus skills
│   ├── exploring/
│   ├── designing/
│   ├── write-plan-tasks/
│   ├── apply-change/
│   ├── verify-change/
│   ├── sync-specs/
│   ├── archive-change/
├── templates/           # Artifact templates
│   ├── proposal.md
│   ├── delta-spec.md
│   ├── plan.md
│   └── tasks.md
├── docs/changes/             # Active change directories
│   └── archive/         # Archived changes
├── docs/
│   ├── designs/         # Design documents
│   └── specs/           # Main spec library
└── AGENTS.md
```

## Conventions

- **Change naming**: kebab-case, starts with verb (add/fix/update/remove/optimize)
- **Design docs**: `docs/designs/YYYY-MM-DD-<topic>-design.md`
- **Main specs**: `docs/specs/<capability>/spec.md`
- **Change artifacts**: `docs/changes/<name>/{proposal,specs/*,plan,tasks}.md`
- **Archives**: `docs/changes/archive/YYYY-MM-DD-<name>/`
- **TDD**: Always write failing test first, then implement, then verify
- **All artifacts required**: proposal + specs + plan + tasks for every change

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
