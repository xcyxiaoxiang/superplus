# Code Quality Reviewer Prompt Template

Use this template when dispatching a code quality reviewer subagent.

**Purpose:** Verify implementation is well-built (clean, tested, maintainable)

**Only dispatch after spec compliance review passes.**

**Core principle:** The code quality reviewer focuses on **how well it's built**, not **what was built** (that's the spec reviewer's job).

---

## Dispatch Template

```
Task tool (general-purpose):
  description: "Code quality review for Task N"
  prompt: |
    You are reviewing code quality for Task N: [task name]

    ## Context (required)

    ### Architecture
    [Controller: Paste the ASCII architecture diagram + interface signatures from tasks.md Architecture section.
     The reviewer needs to understand architecture to judge whether file responsibilities are singular and component boundaries are clean.]

    ### Cross-Cutting Rules
    [Controller: Paste from tasks.md Cross-Cutting Concerns section.
     The reviewer needs to know coding conventions to judge whether error handling / logging / config follows the standards.

     Example:
     - Error handling: dual-layer catch, ServiceException re-throw + generic Exception wrap
     - Logging: key nodes INFO/WARN/ERROR
     - Configuration: @Value injection
    ]

    ## What Implementer Claims They Built

    [Controller: Paste from the implementer's completion report]

    ## Your Job

    Read the implementation code and assess quality. Focus on craftsmanship, not correctness (spec compliance was already verified).

    ### Checklist

    **Code Standards**
    1. Are names clear and accurate (express "what it does" not "how it works")?
    2. Are comments necessary and accurate (don't comment the obvious)?
    3. Does formatting match the project's existing style?

    **Structure**
    4. Does each file have a single clear responsibility?
    5. Are units decomposed to be independently understandable and testable?
    6. Are interfaces concise with reasonable parameters?
    7. Are new files already too large? (single file > 300 lines needs justification)

    **Error Handling**
    8. Does error handling follow the Cross-Cutting Rules pattern?
    9. Are error messages meaningful (helpful for diagnosis)?
    10. Are there swallowed exceptions (catch block with no action)?

    **Logging**
    11. Are log levels appropriate (DEBUG/INFO/WARN/ERROR)?
    12. Do key operations have log statements?
    13. Do log messages contain sufficient context?

    **Testing**
    14. Do tests verify behavior (not implementation details)?
    15. Do tests cover happy path + error path?
    16. Are test names clear and expressive of expected behavior?

    **Complexity**
    17. Is there excessive nesting (> 3 levels)?
    18. Are there overly long methods (> 30 lines needs justification)?
    19. Is there duplicated code that could be extracted?

    ## Report Format

    **Strengths:** [list what was done well]

    **Issues:**
    | Severity | Category | File:Line | Description |
    |----------|----------|-----------|-------------|
    | Critical | ... | ... | ... |
    | Important | ... | ... | ... |
    | Minor | ... | ... | ... |

    **Assessment:** APPROVE | REQUEST_CHANGES

    - **APPROVE**: Code quality is acceptable, no changes needed
    - **REQUEST_CHANGES**: Issues found that need fixing (list specific issues and suggestions)
```

---

## Controller Checklist (pre-dispatch)

Before dispatching code quality reviewer each time, confirm these fields are filled:

| Field | Source | Required |
|-------|--------|----------|
| Architecture | `2.tasks.md` Architecture section | ✅ |
| Cross-Cutting Rules | `2.tasks.md` Cross-Cutting section | ✅ |
| Implementer Report | implementer's completion report | ✅ |

**Note:** Only dispatch code quality review AFTER spec compliance review has passed ✅.
