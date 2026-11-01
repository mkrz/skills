# Michael's Skill Stack

These are the agent skills I use for my daily work.

## Skills

### User Invoked

Only you can start these by typing their name. The agent never fires them on its own.

| Skill             | Say                | What it does                                                                                         |
| ----------------- | ------------------ | ---------------------------------------------------------------------------------------------------- |
| `bulletproof`     | `/bulletproof`     | Reviews the changes with three models from different providers in a loop and fixes real blockers.    |
| `grill-me-royale` | `/grill-me-royale` | Grills you about your plan in rounds that shrink until two finisher questions remain.                |
| `satisfy-ci`      | `/satisfy-ci`      | Verifies every bot comment and CI failure in a PR, fixes the real ones and dismisses the rest.       |
| `go-all-in`       | `/go-all-in`       | Works on your tasks until the PR is merged: commits, reviews, opens the PR, satisfies CI and merges. |

### Model Invoked

The agent loads these when the task matches. You can also call them by name.

| Skill              | Fires when                                   | What it does                                                                   |
| ------------------ | -------------------------------------------- | ------------------------------------------------------------------------------ |
| `consolidate`      | you want the current changes reviewed        | One review by a subagent, with the findings fixed in the main thread.          |
| `easy-fix`         | fixing findings from a review, bots or CI    | Fixes with the smallest change in the intended way and commits separately.     |
| `commit`           | creating a commit                            | Single line conventional commits that say why, not what.                       |
| `pr-it-ty`         | creating a PR                                | A conventional commit title and a description of the problem and solution.     |
| `writing-comments` | leaving a comment                            | Leads with a brief conclusion, then explains it in simple sentences.           |
| `writing-issues`   | writing an issue                             | Describes the problem and the facts to watch out for, without proposing a fix. |
| `writing-code`     | writing code                                 | No explaining comments, only constraints the code cannot express.              |
| `suggest`          | you say "propose", "suggest" or "suggestion" | Challenges your idea and proposes a better fit for your goal.                  |
| `slopstop`         | building, changing or reviewing a UI         | Keeps AI slop out of UI and checks every UI change in a browser.               |

Some skills call others. Install the ones they need too:

- `go-all-in` uses `consolidate`, `bulletproof`, `pr-it-ty` and `satisfy-ci`.
- `bulletproof` uses `consolidate`.
- `consolidate` uses `easy-fix`.
- `satisfy-ci` uses `easy-fix` and `writing-comments`.
- `grill-me-royale` adds suggestion questions when you use `suggest` between rounds.

## Get Them Now

```bash
npx skills@latest add mkrz/skills
```

or

```bash
git clone https://github.com/mkrz/skills
cp -R skills/skills/* ~/.claude/skills/   # Claude Code
cp -R skills/skills/* ~/.codex/skills/    # Codex
```

## Requirements

- An authenticated [GitHub CLI](https://cli.github.com) (`gh`) for `satisfy-ci` and `go-all-in`.
- `bulletproof` needs models from three different providers to work properly.
- `slopstop` verifies UI with the `agent-browser` CLI from [vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser).
