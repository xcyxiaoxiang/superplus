# Installing superPlus for OpenCode

## 全局安装

在 OpenCode 配置文件 `opencode.json` 中声明 git 远程源：

```json
{
  "plugin": ["superplus@git+https://github.com/xcyxiaoxiang/superplus.git"]
}
```

OpenCode 会自动克隆并注册所有 superPlus 技能。重启后即可使用。

## 项目级安装

将 superPlus 复制到项目目录中，在 `opencode.json` 添加本地路径：

```json
{
  "plugin": ["./superPlus"]
}
```

## 使用

安装后在 TUI 中输入 `/sp-<skill>`，每个技能对应一个独立命令，输入 `/` 即可看到所有选项：

```
/sp-exploring          探索需求
/sp-designing          设计文档
/sp-apply-change       TDD 实现
/sp-verify-change      5D 验证
/sp-root-cause-debugging   根因调试
```

可用命令（共 12 个）：

| 命令 | 技能 |
|------|------|
| `/sp-exploring` | exploring |
| `/sp-designing` | designing |
| `/sp-write-plan-tasks` | write-plan-tasks |
| `/sp-apply-change` | apply-change |
| `/sp-verify-change` | verify-change |
| `/sp-sync-specs` | sync-specs |
| `/sp-archive-change` | archive-change |
| `/sp-root-cause-debugging` | root-cause-debugging |
| `/sp-test-driven-development` | test-driven-development |
| `/sp-using-git-worktrees` | using-git-worktrees |
| `/sp-writing-skills` | writing-skills |
| `/sp-using-superplus` | using-superplus |

## Verification

启动会话后检查：

- 是否看到 **"You have superPlus"** 引导信息
- 输入 `/` 查看命令列表，应看到 `sp — superPlus`
- 运行 `skill` 工具能否列出所有 superPlus 技能

## 卸载

```bash
# 全局安装：从 opencode.json 移除 plugin 声明
# 并可清理缓存：rm -rf ~/.cache/opencode/packages/superplus

# 项目级安装：从 opencode.json 移除并删除本地目录
```

## Troubleshooting

- 全局安装确认网络可访问 GitHub
- git 远程插件被缓存到 `~/.cache/opencode/packages/`
- 项目级安装确认路径正确

更多信息见 `AGENTS.md`。
