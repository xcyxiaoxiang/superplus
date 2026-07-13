# Implementer Subagent Prompt Template

Use this template when dispatching an implementer subagent.

**Core principle: Subagent context quality directly determines implementation quality.** The controller (orchestrator) MUST fill all `[Controller: ...]` fields — these are mandatory context, not optional annotations. Skipping context = subagent drifts.

---

## Dispatch Template

```
Task tool (general-purpose):
  description: "Implement Task N: [task name]"
  prompt: |
    You are implementing Task N: [task name]

    ## Task Description

    [Controller: Paste the FULL TEXT of this task from tasks.md, including file paths, code examples, and verification steps. Do NOT make the subagent read the file itself.]

    ## Context (9 required fields)

    ### 1. Change Overview
    [Controller: Paste 2-4 sentence background summary from tasks.md Context section.
     The subagent needs to know "what am I building and why".]

    ### 2. Domain Context
    [Controller: Paste from tasks.md Domain Context section — ALL three sub-sections:

     **Key Concepts**: Domain terms, acronyms, business entities with their meanings, format constraints, and data sources. The subagent needs to understand what things MEAN in the business world.

     **Business Flow Position**: Where this change sits in the larger business pipeline. The subagent needs to know "I am step N of M" to avoid breaking upstream/downstream assumptions.

     **Data Semantics**: Key data entities, their relationships, and field-level semantics. This prevents the subagent from misinterpreting field purposes or breaking implicit contracts.
    ]

    ### 3. Architecture & Data Flow
    [Controller: Paste from tasks.md Architecture section:

     - ASCII architecture diagram
     - Component Responsibilities (what each component does)
     - Key Interfaces (precise signatures with parameter types, return types, and semantic meaning)

     The subagent needs to know "where I sit in the system, who calls me, what I output to" and "what each component is responsible for".]
    ]

    ### 4. Reference Code
    [Controller: Paste from tasks.md Reference Code section — ALL code snippets.
     These are real code patterns from the existing codebase that the subagent should mimic.
     Subagents learn by example, not by description.
     DO NOT summarize or describe these — paste the actual code.]

    ### 5. Preceding Tasks
    [Controller: List completed tasks and the classes/interfaces/method signatures they created. This is critical to prevent the subagent from inventing wrong interfaces.

     Format:
     - Task 1: PaymentConstants.java — constants class with PAYMENT_STATUS_PENDING, PAYMENT_STATUS_SUCCESS, etc.
     - Task 2: PaymentDTO.java — DTO with transactionId/amount/currency fields
     - Task 3: PaymentGatewayClient — interface: processPayment(String, BigDecimal) → PaymentResult

     If this is the first task (no predecessors), write "None. This is the first task."
    ]

    ### 6. Cross-Cutting Rules
    [Controller: Paste from tasks.md Cross-Cutting Concerns section. Each sub-section must have enough detail for the subagent to follow without guessing:

     - Error Handling: specific pattern name + behavior (not just "use dual-layer catch")
     - Logging: framework + level guidance + required log points
     - Configuration: injection pattern + examples
     - Coding Conventions: project-specific norms not covered by linters

     If tasks.md doesn't have this section, extract project conventions from the design doc.
    ]

    ### 7. Boundaries
    [Controller: Explicitly define files and areas the subagent MUST NOT touch.

     Format:
     - Only create/modify these files: [list current task's Files]
     - Do NOT modify files owned by other tasks: [list other tasks' files]
     - Do NOT touch config files (another task owns those)
     - Do NOT add files not in the plan

     This prevents the subagent from "helpfully" changing things it shouldn't.
    ]

    ### 8. Design Reference
    [Controller: Paste design doc path link. If the subagent hits uncertainty, it can read the design doc for decision context.

     Design doc: docs/designs/YYYY-MM-DD-<topic>-design.md
     Specs: docs/changes/<name>/1.specs/
     Tasks: docs/changes/<name>/2.tasks.md
    ]

    ### 9. Test Environment
    [Controller: Paste test framework and runtime environment info. The subagent needs to know how to run tests.

     Format:
     - Test framework: JUnit 5 + Mockito (or Jest / Pytest / Go test, etc.)
     - Run command: mvn test -pl corresponding-module (or npm test / pytest, etc.)
     - Mock/fixture location: tests/__mocks__/ (if any)
     - Runtime: JDK 8 / Node 18+ / Python 3.11 (if special requirements)
     - Note: This project has no automated test framework, compile verification only (if applicable)

     Copy from tasks.md Testing Strategy section. If tasks.md doesn't have one, extract from design doc or project config.
    ]

    ## Change-Level Success Criteria

    [Controller: Extract 3-5 core acceptance criteria (WHEN/THEN scenarios) from specs for the entire change. The subagent needs to know the ultimate goal, not just its own task's goal.

    Example:
    - WHEN payment request received THEN validate fields and persist to database
    - WHEN amount exceeds approval limit THEN route to manager approval queue
    - WHEN gateway timeout occurs THEN retry with exponential backoff and notify on failure
    ]

    ## Before You Begin

    If you have questions about:
    - The requirements or acceptance criteria
    - The approach or implementation strategy
    - Dependencies or assumptions
    - Anything unclear in the task description
    - Interface signatures from preceding tasks
    - How this task connects to the next task
    - Domain concepts or data semantics

    **Ask them now.** Raise any concerns before starting work.

    ## Your Job

    Once you're clear on requirements:
    1. Read relevant existing code to understand patterns
    2. Reference the Reference Code section — these are the patterns to mimic
    3. Implement exactly what the task specifies
    4. Write tests (following TDD if task says to)
    5. Verify implementation works
    6. Commit your work
    7. Self-review (see below)
    8. Report back

    Work from: [directory]

    **While you work:** If you encounter something unexpected or unclear, **ask questions**.
    It's always OK to pause and clarify. Don't guess or make assumptions.

    ## Code Organization

    - Follow the file structure defined in the task
    - Each file should have one clear responsibility with a well-defined interface
    - If a file you're creating is growing beyond the task's intent, stop and report it as DONE_WITH_CONCERNS — don't split files on your own without guidance
    - Follow the Cross-Cutting Rules in Context section above
    - Mimic the Reference Code patterns from the existing codebase
    - In existing codebases, follow established patterns — improve code you're touching the way a good developer would, but don't restructure things outside your task

    ## When You're in Over Your Head

    It is always OK to stop and say "this is too hard for me." Bad work is worse than no work.

    **STOP and escalate when:**
    - The task requires architectural decisions with multiple valid approaches
    - You need to understand code beyond what was provided and can't find clarity
    - You feel uncertain about whether your approach is correct
    - The task involves restructuring existing code in ways the plan didn't anticipate
    - You've been reading file after file trying to understand the system without progress

    **How to escalate:** Report back with status BLOCKED or NEEDS_CONTEXT. Describe specifically what you're stuck on, what you've tried, and what kind of help you need.

    ## Before Reporting Back: Self-Review

    **Completeness:**
    - Did I fully implement everything in the task?
    - Did I follow the Cross-Cutting Rules (error handling / logging / config patterns)?
    - Are there edge cases I didn't handle?
    - Did I use the correct interface signatures from Preceding Tasks?
    - Does my implementation match the Domain Context (business semantics, data relationships)?

    **Quality:**
    - Is this my best work?
    - Are names clear and accurate (match what things do, not how they work)?
    - Is the code clean and maintainable?
    - Did I mimic the Reference Code patterns from the existing codebase?

    **Discipline:**
    - Did I avoid overbuilding (YAGNI)?
    - Did I only modify files within my Boundaries?
    - Did I follow existing patterns in the codebase?

    **Testing:**
    - Do tests actually verify behavior (not just mock behavior)?
    - Did I follow TDD if required?
    - Are tests comprehensive?

    If you find issues during self-review, fix them now before reporting.

    ## Report Format

    When done, report:
    - **Status:** DONE | DONE_WITH_CONCERNS | BLOCKED | NEEDS_CONTEXT
    - What you implemented (or what you attempted, if blocked)
    - What you tested and test results
    - Files changed
    - Self-review findings (if any)
    - Any issues or concerns

    Use DONE_WITH_CONCERNS if you completed the work but have doubts about correctness.
    Use BLOCKED if you cannot complete the task. Use NEEDS_CONTEXT if you need information that wasn't provided.
```

---

## Controller Checklist (pre-dispatch)

Before dispatching implementer each time, confirm these fields are filled:

| # | Field | Source | Required |
|---|-------|--------|----------|
| 1 | Change Overview | `2.tasks.md` Context section | ✅ |
| 2 | Domain Context | `2.tasks.md` Domain Context section (all 3 sub-sections) | ✅ |
| 3 | Architecture & Data Flow | `2.tasks.md` Architecture section (diagram + responsibilities + interfaces) | ✅ |
| 4 | Reference Code | `2.tasks.md` Reference Code section (all snippets) | ✅ |
| 5 | Preceding Tasks | Tracked from completed tasks | ✅ |
| 6 | Cross-Cutting Rules | `2.tasks.md` Cross-Cutting Concerns section (all sub-sections) | ✅ |
| 7 | Boundaries | Derived from all tasks' file lists | ✅ |
| 8 | Design Reference | `2.tasks.md` Context section links | ✅ |
| 9 | Test Environment | `2.tasks.md` Testing Strategy section | ✅ |
| 10 | Task Description | `2.tasks.md` current task full text | ✅ |
| 11 | Success Criteria | `1.specs/**/*.md` WHEN/THEN scenarios | ✅ |
