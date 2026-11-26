---
name: pr-it-ty
description: Use when creating a pull request or pushing to one.
---

# PR it, ty

Write the PR title as `<type>(<scope>): <short-message>`, following the `commit` skill.

Include these sections in the PR description:

- `## Problem`: What is wrong and why, from evidence only. Without a stated why, describe how it worked before.
- `## Solution`: Explain the change in simple sentences.
- `## Verification`: List checks run, `prove-it` results and evidence, screenshots if uploadable, before/after output for bugs and anything unverified with why.
- `## Risks`: List what could break outside the diff, irreversible changes (e.g. migrations) and where reviewers should look first. Omit if none.

End the PR description with:

```md
> [!NOTE]
> 🤖 **PR created by <model-name>**
```

After every push to an open PR, compare the title and description with the full PR diff and rewrite them if they drifted. Never append a per-push changelog.

Open the PR on the host; a pushed branch is not a PR. End your reply with the worktree, branch, last commit, push status and PR link.
