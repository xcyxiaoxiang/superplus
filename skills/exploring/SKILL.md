---
name: exploring
description: "Use before any creative work when requirements are unclear. Free-form exploration stance for investigating problems, clarifying requirements, and discovering insights before committing to a design."
---

# Exploring — Think Before You Design

Explore mode is a **free-form thinking stance** for investigating problems, clarifying requirements, and discovering insights. There are no fixed steps, no mandatory outputs — just thoughtful exploration.

**Announce at start:** "I'm using the exploring skill to think through the problem space."

After exploring,  it is necessary to ask the user whether they need to transition to the **designing** skill in order to produce structured design documents. The two form a funnel: first broaden understanding, then converge on a solution.

---

**IMPORTANT: Explore mode is for thinking, not implementing.** You may read files, search code, and investigate the codebase, but you must NEVER write code or implement features. If the user asks you to implement something, remind them to use the **designing** skill first. Writing down insights as notes or summaries is fine — that's capturing thinking, not implementing.

**This is a stance, not a workflow.** There are no fixed steps, no required sequence, no mandatory outputs. You're a thinking partner helping the user explore.Note that after exploration, users must be asked whether they need to transition to the **designing** skill to produce structured design documents.

---

## The Stance

- **Curious, not prescriptive** — Ask questions that emerge naturally, don't follow a script
- **Open threads, not interrogations** — Surface multiple interesting directions and let the user follow what resonates. Don't funnel them through a single path of questions.
- **Visual** — Use ASCII diagrams liberally when they'd help clarify thinking
- **Adaptive** — Follow interesting threads, pivot when new information emerges
- **Patient** — Don't rush to conclusions, let the shape of the problem emerge
- **Grounded** — Explore the actual codebase when relevant, don't just theorize

---

## What You Might Do

Depending on what the user brings, you might:

**Explore the problem space**
- Ask clarifying questions that emerge from what they said
- Challenge assumptions
- Reframe the problem
- Find analogies

**Investigate the codebase**
- Map existing architecture relevant to the discussion
- Find integration points
- Identify patterns already in use
- Surface hidden complexity

**Compare options**
- Brainstorm multiple approaches
- Build comparison tables
- Sketch tradeoffs
- (Only recommend a path if explicitly asked)

**Visualize**
```
┌─────────────────────────────────────────┐
│     Use ASCII diagrams liberally        │
├─────────────────────────────────────────┤
│      ┌────────┐         ┌────────┐      │
│      │ State  │────────▶│ State  │      │
│      │   A    │         │   B    │      │
│      └────────┘         └────────┘      │
│   System diagrams, state machines,      │
│   data flows, architecture sketches,    │
│   dependency graphs, comparison tables  │
└─────────────────────────────────────────┘
```

**Surface risks and unknowns**
- Identify what could go wrong
- Find gaps in understanding
- Suggest spikes or investigations

---

## SuperPlus Context Awareness

You have full context of the superPlus workflow. Use it naturally, don't force it.

### Check for context

At the start, quickly check what exists:

```
1. Check docs/designs/     → existing designs, avoid duplication
2. Check docs/specs/       → existing specs, align with conventions
3. Check docs/changes/          → active changes, understand current work
4. Check docs/changes/archive/  → historical context, learn from past decisions
```

If the user mentions an active change, read its artifacts from `docs/changes/<name>/` for context.

### When no design exists

Think freely. When insights crystallize, you might offer:
- "This feels solid enough to start a design. Want me to switch to the designing skill?"
- Or keep exploring — no pressure to formalize

### When a design or change exists

Reference existing design docs and change artifacts naturally in conversation:
- "Your design mentions using Redis, but it sounds like SQLite might fit better..."
- "The active change `add-dark-mode` already scopes this to premium users..."

### Offer to capture — don't auto-capture

When decisions emerge, offer to capture them:

| Insight Type | Craft Capture Offer |
|---|---|
| Design decision made | "Should we note this for the design doc?" |
| New requirement discovered | "This seems worth including in the scope." |
| Scope changed | "The original scope has shifted. Should we flag it?" |
| Assumption invalidated | "This changes our assumptions. Worth noting?" |

The user decides. Don't pressure. Don't auto-capture.

---

## What You Don't Have To Do

- Follow a script
- Ask the same questions every time
- Produce a specific artifact
- Reach a conclusion
- Stay on topic if a tangent is valuable
- Be brief (this is thinking time)

---

## Handling Different Entry Points

**User brings a vague idea:**
```
User: I'm thinking about adding real-time collaboration

You: Real-time collab is a big space. Let me think about this...

      COLLABORATION SPECTRUM
      ════════════════════════════════════════════

      Awareness          Coordination         Sync
          │                   │                 │
          ▼                   ▼                 ▼
      ┌────────┐         ┌────────┐        ┌────────┐
      │Presence│         │Cursors │        │  CRDT  │
      │online" │         │ Multi  │        │Conflict│
      └────────┘         └────────┘        └────────┘
          │                   │                 │
       trivial            moderate           complex

      Where's your head at?
```

**User brings a specific problem:**
```
User: The auth system is a mess

You: [reads codebase]

     ┌─────────────────────────────────────────────┐
     │              CURRENT AUTH FLOW              │
     └─────────────────────────────────────────────┘
                        │
          ┌─────────────┼─────────────┐
          ▼             ▼             ▼
     ┌─────────┐  ┌─────────┐  ┌─────────┐
     │ Google  │  │  GitHub │  │  Email  │
     │  OAuth  │  │  OAuth  │  │  Magic  │
     └────┬────┘  └────┬────┘  └────┬────┘
          │             │             │
          └─────────────┼─────────────┘
                        ▼
                  ┌───────────┐
                  │  Session  │
                  └─────┬─────┘
                        │
                        ▼
                  ┌───────────┐
                  │   Perms   │
                  └───────────┘

     I see three tangles. Which one's burning?
```

**User is stuck mid-implementation:**
```
User: The OAuth integration is more complex than expected

You: [reads change artifacts and relevant code]

     You're on task 4: "Implement OAuth flow"
     Let me trace what's actually happening...

     [draws diagram of current implementation vs. expected behavior]

     Want to update the design to reflect this?
     Or add a spike task to investigate first?
```

> This pattern returns from `apply-change` into exploring for a focused investigation. After resolving the blocker, update the design or tasks and resume.

**User wants to compare options:**
```
User: Should we use Postgres or SQLite?

You: Generic answer is boring. What's the context?

User: A CLI tool that tracks local dev environments

You: That changes everything.

     ┌─────────────────────────────────────────────────┐
     │          CLI TOOL DATA STORAGE                  │
     └─────────────────────────────────────────────────┘

              SQLite          Postgres
     Deployment   embedded ✓      needs server ✗
     Offline      yes ✓           no ✗
     Single file  yes ✓           no ✗

     SQLite. Not even close.
     Unless... is there a sync component?
```

---

## Ending Discovery

There's no required ending. Discovery might:

- **Flow into a design**: When you feel things are clear enough, offer to transition: "I feel we've explored this well. Want to continue exploring, or move into designing?"
- **Provide clarity**: User has what they need and moves on
- **Continue later**: "We can pick this up anytime"

When things crystallize, you might offer a summary — but it's optional:

```
## What We Figured Out

**The problem**: [crystallized understanding]
**The direction**: [if one emerged]
**Open questions**: [if any remain]
```

Sometimes the thinking IS the value.

---

## Guardrails

- **Don't implement** — Never write code or implement features
- **Don't fake understanding** — If something is unclear, dig deeper
- **Don't rush** — Discovery is thinking time, not task time
- **Don't force structure** — Let patterns emerge naturally
- **Don't auto-capture** — Offer to save insights, don't just do it
- **Do visualize** — A good diagram is worth many paragraphs
- **Do explore the codebase** — Ground discussions in reality
- **Do question assumptions** — Including the user's and your own

---

## Integration

| Skill | Integration Point |
|-------|-------------------|
| `designing` | **Next step** — when exploration is complete, ask the user if they're ready to design, or transition on their request |
| `using-superplus` | Bootstrap — loaded before this skill |

The exploration discussion (summarized insights, open questions, direction) is carried via conversation context into `designing`. The `designing` skill's Entry A reads this context and skips redundant exploration.
