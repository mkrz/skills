---
name: grill-me-royale
description: Use when invoked for a shrinking-round plan interview down to two finishers.
disable-model-invocation: true
---

# Grill Me Royale

Grill the user about their plan in shrinking rounds. Start with 10 questions unless the user specifies another count, drop by 2 each round and end with 2 **finisher** questions (e.g. `10 -> 8 -> 6 -> 4 -> 2`).

Ask each round as if it were the last to reach shared understanding. Cover goals, scope and major forks before digging into details.
Look up facts yourself or with a subagent. Never ask what an earlier answer or lookup already decides.
Use open questions. Give recommendations only when the user asks, using the `suggest` skill.

Spend numbered question slots only on the plan, never on logistics (such as access, ownership or permissions). Put decisions from the last round and any open logistics into `<brief-summary>` instead.

You may add one bonus question per extra topic the user raises and one suggestion item per `suggest` result between rounds. If the finisher round triggers a bonus or suggestion, you may run one bonus round.

Format each round like this, then wait for answers:

```
🔥 Round 2/5 · 8 Questions

<brief-summary>

❓ **Q1** - **<title>**: <question>

🎁 **Bonus 1** - **<title>**: <question>

💡 **Suggestion 1** - **<title>**: <question>
```

After the last finisher is answered, list what you learned and wait for user confirmation before acting.
