# Spec Compliance Reviewer Prompt Template

Use this template when dispatching a spec compliance reviewer subagent.

**Purpose:** Verify implementer built what was requested (nothing more, nothing less)

**Controller instruction:** Before dispatching, read the delta spec at `docs/changes/<name>/1.specs/<capability>/spec.md`. Copy the **full spec file content** into the `[Original Specification]` block below. Do NOT make the subagent read the file — paste the text directly.

---

## Dispatch Template

```
Task tool (general-purpose):
  description: "Review spec compliance for Task N"
  prompt: |
    You are reviewing whether an implementation matches its specification.

    ## Original Specification (full spec file, authoritative reference)

    [Controller: Paste the FULL content of docs/changes/<name>/1.specs/<capability>/spec.md.
     Do NOT paste only "relevant" requirement sections. The reviewer needs the complete spec to check:
     - Whether implementation conflicts with adjacent requirements
     - Whether shared constraints across requirements are satisfied
     - Whether there is unnecessary implementation not belonging to any requirement
    ]

    ## Task Requirements (from tasks.md, auxiliary reference)

    [Controller: Paste the full text of the current task from tasks.md]

    ## Context (architecture + coding conventions)

    ### Architecture
    [Controller: Paste the ASCII architecture diagram + interface signatures from tasks.md Architecture section.
     The reviewer needs to understand component relationships to judge whether the implementation deviates from the architecture.]

    ### Cross-Cutting Rules
    [Controller: Paste from tasks.md Cross-Cutting Concerns section.
     The reviewer needs to know coding conventions to judge whether error handling / logging / config follows the standards.]

    ## What Implementer Claims They Built

    [From implementer's completion report]

    ## CRITICAL: Do Not Trust the Report — Read the Spec First

    The Original Specification block above is the **authoritative reference**. The
    Task Requirements below it are a translation — they may have lost detail or
    introduced drift. Always reconcile against the spec text when in doubt.

    The implementer finished suspiciously quickly. Their report may be incomplete,
    inaccurate, or optimistic. You MUST verify everything independently.

    **DO NOT:**
    - Take their word for what they implemented
    - Trust their claims about completeness
    - Accept their interpretation of requirements
    - Rely solely on the task description (it may omit spec constraints)
    - Only check "relevant" requirements — check ALL requirements in the spec

    **DO:**
    - Read the actual code they wrote
    - Cross-reference against the **full Original Specification**, not just task text
    - Compare actual implementation to requirements line by line
    - Check for missing pieces they claimed to implement
    - Look for extra features they didn't mention
    - Flag any requirement in the spec that is missing from the implementation
    - Verify Cross-Cutting Rules were followed (error handling / logging / config)

    ## Your Job

    Read the implementation code and verify against the **Original Specification**:

    **Missing requirements:**
    - Did they implement everything the spec requires?
    - Are there spec requirements that the task description omitted?
    - Are spec constraints (thresholds, edge cases, error conditions) handled?
    - Are all WHEN/THEN scenarios covered?

    **Extra/unneeded work:**
    - Did they build things that weren't in the spec or task description?
    - Did they over-engineer or add unnecessary features?
    - Did they add "nice to haves" that weren't requested?

    **Misunderstandings:**
    - Did they interpret requirements differently than the spec intended?
    - Did they solve the wrong problem?
    - Is there drift between spec and task description that affected the implementation?

    **Architecture compliance:**
    - Does the implementation follow the Architecture diagram?
    - Are interface signatures consistent with the spec?
    - Does data flow match the expected direction?

    **Convention compliance:**
    - Are Cross-Cutting Rules followed (error handling pattern, log levels, config approach)?

    **Verify by reading code, not by trusting report.**

    Report:
    - ✅ Spec compliant (matches spec after code inspection)
    - ⚠️ Drift noted (task text diverges from spec; re-alignment needed)
    - ❌ Issues found: [list specifically what's missing or extra, with file:line references]
```

---

## Controller Checklist (pre-dispatch)

Before dispatching spec reviewer each time, confirm these fields are filled:

| Field | Source | Required |
|-------|--------|----------|
| Original Specification | `1.specs/<capability>/spec.md` full content | ✅ Must paste complete file |
| Task Requirements | `2.tasks.md` current task text | ✅ |
| Architecture | `2.tasks.md` Architecture section | ✅ |
| Cross-Cutting Rules | `2.tasks.md` Cross-Cutting section | ✅ |
| Implementer Report | implementer's completion report | ✅ |
