---
name: pr-it-ty
description: Use whenever working with pull requests, such as creating one or pushing to one.
---

# PR it, ty

Write the PR title as a conventional commit, <type>(<scope>): <short-message>. Follow the `commit` skill for the type and the message.

In the PR description briefly describe the problem and why this PR exists, then follow with an explanation of the solution in simple sentences.
Only write a problem you have evidence for. If the user didn't say why, describe how it worked before and leave the cause out. Never make up a why.
Never expose any secrets, private details or absolute local paths.

```md
## Problem

<problem>

## Solution

<solution>

> [!NOTE]
> 🤖 **PR created by <model-name>**
```

After every push to a branch with an open PR, compare the title and the description with the whole diff of the PR.
Update them when they no longer match. Rewrite the description so it describes the PR as it is now, never append a list of what each push changed.
