# Code Quality Reviewer Prompt Template

Use this template when dispatching a code quality reviewer subagent.

**Purpose:** Verify implementation is well-built (clean, tested, maintainable)

**Only dispatch after spec compliance review passes.**

```
Code quality review checklist:

1. Clean, maintainable code
2. Each file has one clear responsibility
3. Units decomposed for independent understanding/testing
4. No new large files or significant growth of existing files
5. Follows project architecture patterns
6. Error handling is consistent

Assess: Strengths, Issues (Critical/Important/Minor), Overall quality
```

**In addition to standard code quality concerns, the reviewer should check:**
- Does each file have one clear responsibility with a well-defined interface?
- Are units decomposed so they can be understood and tested independently?
- Is the implementation following the file structure from the plan?
- Did this implementation create new files that are already large, or significantly grow existing files? (Don't flag pre-existing file sizes — focus on what this change contributed.)

**Code reviewer returns:** Strengths, Issues (Critical/Important/Minor), Assessment
