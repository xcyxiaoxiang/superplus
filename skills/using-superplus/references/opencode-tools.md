# OpenCode Tool Mapping

Skills use Claude Code tool names. When you encounter these in a skill, use your platform equivalent:

| Skill references | OpenCode equivalent |
|-----------------|---------------------|
| `Read` (file reading) | `read` |
| `Write` (file creation) | `write` |
| `Edit` (file editing) | `edit` |
| `Bash` (run commands) | `bash` |
| `Grep` (search file content) | `grep` |
| `Glob` (search files by name) | `glob` |
| `TodoWrite` (task tracking) | `todowrite` |
| `Skill` tool (invoke a skill) | `skill` |
| `WebSearch` | `websearch` or `web_search_exa` |
| `WebFetch` | `webfetch` |
| `Task` tool (dispatch subagent) | `task` with `subagent_type` |
| Multiple `Task` calls (parallel) | Multiple `task` calls in one message |
| Task continuation (same session) | `task` with `task_id` to resume |
| `AskUserQuestion` | `question` |
| `ast-grep` pattern search | `ast_grep_search` / `ast_grep_replace` |
| `Subtask` (child session) | `subtask` |
| `EnterPlanMode` / `ExitPlanMode` | No direct equivalent |
| `Read` (directory listing) | `read` on directory path |

## Subagent Types

When a skill says "dispatch a subagent", use `task` with the appropriate `subagent_type`:

| Skill instruction | OpenCode subagent_type |
|-------------------|----------------------|
| General-purpose implementer | `fixer` |
| Codebase explorer / researcher | `explorer` |
| Library documentation lookup | `librarian` |
| UI/UX design or review | `designer` |
| Architecture / code review | `oracle` |
| Code quality review | `oracle` |

## Parallel Dispatch

OpenCode supports parallel subagent dispatch. Call multiple `task` invocations in a single message for independent tasks. Use `task` with `task_id` to resume a previous agent session.

## Additional OpenCode tools

| Tool | Purpose |
|------|---------|
| `auto_continue` | Toggle automatic continuation for incomplete todos |
| `read_session` | Read conversation transcript from a previous session |
| `memory_set` / `memory_replace` / `memory_list` | Persistent memory management |
| `subtask` | Focused child worker session for bounded tasks |
| `webfetch` with `prompt` | Extract specific content from a URL |
| `websearch` with `livecrawl` | Real-time web content fetching |
