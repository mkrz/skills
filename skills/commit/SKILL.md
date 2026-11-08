---
name: commit
description: Read when creating a commit.
---

# Commit

Write single line commit messages following conventional commits, <type>(<scope>): <message>.
Pick the type by the effect. A change in behavior is never a refactor.

The message specifically tells why the commit was made and what it improves, if you have evidence for the why.
Evidence is what the user said, an issue, a failing test or a bug you reproduced. Never make up a why.
Without evidence, say precisely what changed instead.
Never use vague words like "improve", "update" or "enhance" in the message.
Keep the message under 150 characters.
Never write commit bodies.
