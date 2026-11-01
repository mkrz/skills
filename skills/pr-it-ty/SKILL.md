---
name: pr-it-ty
description: Use when creating a pull request.
---

# PR it, ty

Write the PR title as a conventional commit, <type>(<scope>): <short-message>, where the message says why it changed and what it improves, not what changed.

In the PR description briefly describe the problem and why this PR exists, then follow with an explanation of the solution in simple sentences.
Never expose any secrets, private details or absolute local paths.

```md
## Problem

<problem>

## Solution

<solution>

> [!NOTE]
> 🤖 **PR created by <model-name>**
```
