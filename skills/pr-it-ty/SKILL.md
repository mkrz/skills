---
name: pr-it-ty
description: Use whenever working with pull requests, such as creating one or pushing to one.
---

# PR it, ty

Write the PR title as a conventional commit, <type>(<scope>): <short-message>. Follow the `commit` skill for the type and the message.

In the PR description briefly describe the problem and why this PR exists, then follow with an explanation of the solution in simple sentences.
Only write a problem you have evidence for. If the user didn't say why, describe how it worked before and leave the cause out. Never make up a why.
Never expose any secrets, private details or absolute local paths.

In Verification, list what you ran and what it showed: the checks, the features walked with the `prove-it` skill and the evidence. Add screenshots, when you have a way to upload them.
For a bug, show the reproduction failing before and passing after.
Say what you could not verify and why.

In Risks, list what could break outside the diff, anything that can't be undone (e.g. a migration) and what a reviewer should look at first.
If there are no risks, you can remove this section.

```md
## Problem

<problem>

## Solution

<solution>

## Verification

<verification>

## Risks

<risks>

> [!NOTE]
> 🤖 **PR created by <model-name>**
```

After every push to a branch with an open PR, compare the title and the description with the whole diff of the PR.
Update them when they no longer match. Rewrite the description so it describes the PR as it is now, never append a list of what each push changed.

A pushed branch is not a PR. Creating a PR means it is open on the host.
After creating or pushing to a PR, end your reply to the user with the worktree, branch, last commit, pushed or not and the PR link.
