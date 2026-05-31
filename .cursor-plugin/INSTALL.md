# Installing superPlus for Cursor

## 项目级安装

将 superPlus 克隆到项目目录，直接在 Cursor 中打开：

```bash
git clone https://github.com/xcyxiaoxiang/superplus.git
cursor /path/to/superplus
```

Cursor 通过 `.cursor/skills/`（符号链接到 `skills/`）自动发现 12 个 superPlus 技能。

## 全局安装

通过符号链接将技能安装到 Cursor 全局技能目录，所有项目可用：

```bash
# 1. 克隆 superPlus 到本地
git clone https://github.com/xcyxiaoxiang/superplus.git ~/projects/superPlus

# 2. 创建符号链接到 Cursor 全局技能目录
ln -s ~/projects/superPlus/skills ~/.cursor/skills/superplus
```

## Verification

启动 Cursor 后检查：

- 在 Agent Chat 中输入 `/` 查看技能列表，应看到 superPlus 技能
- 打开 **Cursor Settings → Rules** → **Agent Decides** 部分查看已发现的技能

## 卸载

```bash
# 项目级安装：从项目目录删除 .cursor/skills/ 目录
rm -r .cursor/skills

# 全局安装：删除全局符号链接
rm ~/.cursor/skills/superplus
```

## Troubleshooting

- 技能未显示：确认 `.cursor/skills/` 符号链接正确（`ls -la .cursor/skills`）
- 某些技能缺失：确认 `skills/` 下全部 12 个技能目录包含 `SKILL.md`
- 重启 Cursor 后重试

更多信息见 `AGENTS.md`。
