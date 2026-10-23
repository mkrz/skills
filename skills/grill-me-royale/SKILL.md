---
name: grill-me-royale
description: A battle-royale interview. Question rounds shrink by a third until two finishers remain.
argument-hint: "[first-round questions, default 10]"
disable-model-invocation: true
---

Grill the user about their plan as a **battle royale**. You get a fixed budget of questions, asked in rounds. The **zone** shrinks every round until two **finishers** remain. Once the finishers are answered you know everything you need to act, with nothing left open.

## The zone

The first round has 10 questions, or the number the user gave when invoking. Each next round has two-thirds of the previous one, rounded to nearest. Any round that would have 2 or fewer questions is the finisher round: exactly 2 questions, and the last.

10 gives 10 → 7 → 5 → 3 → 2. Work out the full zone before round 1. Its sum is your whole budget. There is no round after the finishers.

## Spending the budget

Map the plan as a **design tree**, where every answer opens the questions that hang off it. Keep a running list of what is still **open**.

- **Rethink every round.** The zone's counts are fixed, its questions are not. After each round, rebuild the open list from the answers and choose the next round fresh.
- **Breadth first.** Broad open issues (goals, scope, constraints, the big forks) come before any deeper follow-up on one branch. Go down a branch only once nothing broad is left open, so the budget never drains into a rabbit hole.
- **Ask only what you can ask now.** A question whose answer depends on another question open in the same round belongs to a later round.
- **Stay inside the zone.** Before each round, check that the open issues fit the remaining budget. When they don't, bundle related issues into one question.
- **Fill every slot.** When fewer issues are open than the round's count, spend the spare questions probing settled answers for edge cases, failure modes, or what the user ruled out.
- **Save two for the finishers.** Plan each round so exactly the last two open issues reach the final round.

## Asking

Ask open questions the user answers in their own words: what, why, who, how it should behave. Offer options only when a real limit leaves just a few possible answers. The answers are the user's own, so give no recommendation.

Finding _facts_ is your job. When a question needs a fact from the environment (files, tools, docs), dispatch a sub-agent to look it up and ask only the questions that don't depend on it. Ask the user what only they know: intent, context, priorities.

Head each round with its place in the zone, then wait for the answers:

```
🔥 Round 2/5 · 7 Questions

❓ **Q1** - **<question title>**: <open question>

---

❓ **Q2** - ...
```

## After the finishers

Summarise what you learned in a short list. Wait for the user to confirm it as the shared understanding before acting on it.
