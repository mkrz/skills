# Michael's Skill Stack

These are the agent skills I use for my daily work.

## Skills

### User Invoked

Only you can start these by typing their name. The agent never fires them on its own.

| Skill             | Say                | What it does                                                                          |
| ----------------- | ------------------ | ------------------------------------------------------------------------------------- |
| `grill-me-royale` | `/grill-me-royale` | Grills you about your plan in rounds that shrink until two finisher questions remain. |

### Model Invoked

The agent loads these when the task matches. You can also call them by name.

| Skill              | Fires when                                   | What it does                                                                                         |
| ------------------ | -------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `go-all-in`        | you say 'go all in'                          | Works on your tasks until the PR is ready to merge: commits, reviews, opens the PR and satisfies CI. |
| `satisfy-ci`       | you want to satisfy the CI                   | Verifies every bot comment and CI failure in a PR, fixes the real ones and dismisses the rest.       |
| `bulletproof`      | you say "bulletproof it"                     | Runs `consolidate` with models from different providers for up to 5 rounds.                          |
| `consolidate`      | you want the current changes reviewed        | Reviews the changes in up to 3 rounds and fixes the real findings in the main thread.                |
| `easy-fix`         | fixing findings from a review, bots or CI    | Verifies the finding, then fixes its cause with the easiest correct change.                          |
| `commit`           | creating a commit                            | Single line conventional commits that say why, or precisely what when the why is unknown.            |
| `pr-it-ty`         | creating a PR                                | A conventional commit title and a description of the problem and solution.                           |
| `writing-comments` | leaving a comment                            | Leads with a brief conclusion, then explains it in simple sentences.                                 |
| `writing-issues`   | writing an issue                             | Describes the problem and the facts to watch out for, without proposing a fix.                       |
| `writing-code`     | writing code                                 | No explaining comments, sparse destructuring and route queries started in the loader.                |
| `suggest`          | you say "propose", "suggest" or "suggestion" | Challenges your idea and proposes a better fit for your goal.                                        |
| `slopstop`         | building, changing or reviewing a UI         | Keeps AI slop out of UI and checks every UI change in a browser.                                     |

Some skills call others. Install the ones they need too:

- `go-all-in` uses `consolidate`, `bulletproof`, `pr-it-ty` and `satisfy-ci`.
- `bulletproof` uses `consolidate`.
- `consolidate` uses `easy-fix`.
- `satisfy-ci` uses `easy-fix` and `writing-comments`.
- `pr-it-ty` uses `commit`.
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
- `bulletproof` needs models from different providers to work properly.
- `slopstop` verifies UI with the `agent-browser` CLI from [vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser).
