# Installing superPlus for Codex CLI

## 全局安装

通过 Codex marketplace 安装，所有项目自动可用：

```bash
# 1. 添加 superPlus 市场
codex plugin marketplace add xcyxiaoxiang/superplus

# 2. 打开 TUI 安装插件
codex /plugins
# → 选择 superPlus 市场 → 安装 superplus 插件
```

## 项目级安装

将 superPlus 克隆到本地，添加本地路径为 marketplace：

```bash
git clone https://github.com/xcyxiaoxiang/superplus.git
codex plugin marketplace add /path/to/superplus
# 然后 codex /plugins → 安装
```

## Verification

启动新会话后检查：

- 技能是否被自动加载（执行 `@superplus` 或查看技能列表）
- 运行 `codex /plugins` 查看已安装插件

## 工具映射

superPlus 技能基于 Claude Code 工具名编写。Codex 用户请参考 `skills/using-superplus/references/codex-tools.md`。

关键差异：
- `Task` → `spawn_agent` + `wait_agent` + `close_agent`
- `TodoWrite` → `update_plan`
- 需要在 `~/.codex/config.toml` 中启用 `[features] multi_agent = true`

## 卸载

```bash
codex plugin marketplace remove superplus
```

## Troubleshooting

- 确认 `.agents/plugins/marketplace.json` 和 `.codex-plugin/plugin.json` 存在
- 运行 `codex plugin marketplace list` 检查市场状态
- 多 agent 支持：`~/.codex/config.toml` 添加 `[features] multi_agent = true`

更多信息见 `AGENTS.md`。
