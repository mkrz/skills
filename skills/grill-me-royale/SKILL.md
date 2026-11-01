---
name: grill-me-royale
description: A battle-royale style interview. Rounds of questions shrink until two finishers remain.
disable-model-invocation: true
---

Grill the user about their plan in battle-royale style. Round 1 has 10 questions, if the user did not specify otherwise.
After that, each round has two questions fewer than the one before.
The last round has two **finisher** questions, then the grilling session is complete. (e.g. 10 -> 8 -> 6 -> 4 -> 2)

In each round, ask the questions as if it were the last round to reach a shared understanding.
Ask about goals, scope and the big forks first. Only dig into one branch once nothing broad is left open.
Use open questions and don't recommend anything. Look up facts yourself or send a subagent.

If the user brings up additional topics in a round, you may add one bonus question per additional topic in the next round.
If the suggest skill was invoked between rounds, you may add one suggestion item per suggestion in the next round.

If the last round brought up either a suggestion or a bonus, you are allowed to go into one more bonus round.

Message style for each round, then wait for the user's answers:

```
🔥 Round 2/5 · 8 Questions

❓ **Q1** - **<title>**: <question>

🎁 **Bonus 1** - **<title>**: <question>

💡 **Suggestion 1** - **<title>**: <question>
```

Once the last finisher is answered, list what you learned. Wait for the user to confirm it before acting.
