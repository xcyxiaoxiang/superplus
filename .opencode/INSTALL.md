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

## Verification

启动会话后检查：

- 是否看到 **"You have superPlus"** 引导信息
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
