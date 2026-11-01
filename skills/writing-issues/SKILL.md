---
name: writing-issues
description: Use when writing issues.
---

# Writing Issues

The issue title should briefly describe the problem in simple words and not propose a change.

In the issue description, first explain the problem and why the issue exists. Screenshots and videos help as well, when you have a way to upload them.
Then list confirmed facts that someone working on it could easily miss and can't find by reading the codebase: settings in external services, production data or decisions made outside the repo (e.g. in a meeting or the current agent thread of the user).
If there is nothing to watch out for, you can remove this section.
Don't write steps or propose a fix. Only list things you verified. Mark anything unverified as an open question.

Never reference code or files in git repos directly; always include all necessary information either in Watch Out For or the problem.

Never expose any secrets, private details or absolute local paths.

```md
<problem>

## Watch Out For

- <fact>

> 🤖 **Issue written by <model-name>**
```
