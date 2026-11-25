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

| Skill            | Fires when                                                    | What it does                                                                                           |
| ---------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `go-all-in`      | you say 'go all in'                                           | Works on your tasks until the PR is ready to merge: commits, reviews, proves it and satisfies CI.      |
| `prove-it`       | you say "prove it" or a change needs proof                    | Proves a change on the running app with an independent agent, and builds the setup when it is missing. |
| `root-cause`     | you say "find the root cause" or a bug's cause is unknown     | Finds the root cause of a bug with evidence from the running code, then fixes it.                      |
| `never-again`    | you say "never again" or a mistake came up twice              | Turns a repeated mistake into a design change, a type, a lint rule or a test.                          |
| `satisfy-ci`     | you want to satisfy the CI                                    | Verifies every bot comment and CI failure in a PR, fixes the real ones and dismisses the rest.         |
| `consolidate`    | you say "consolidate it" or want a review                     | Reviews the changes in up to 3 rounds (5 for security) and fixes the real findings in the main thread. |
| `easy-fix`       | fixing findings from a review, bots or CI                     | Verifies the finding, then fixes its cause with the easiest correct change.                            |
| `commit`         | creating a commit                                             | Single line conventional commits that say why, or precisely what when the why is unknown.              |
| `pr-it-ty`       | working with PRs                                              | A conventional commit title and a description with the problem, solution, verification and risks.      |
| `writing-issues` | writing an issue                                              | Describes the problem and the facts to watch out for, without proposing a fix.                         |
| `suggest`        | you say "propose", "suggest", "challenge" or "improvements"   | Challenges your idea and proposes a better fit for your goal.                                          |
| `slopstop`       | building, changing or reviewing a UI                          | Keeps AI slop out of UI and has an independent agent verify every UI change.                           |
| `tanstack`       | writing, changing or reviewing TanStack Router and Query code | Ensures route queries preload through `loader` and `queryClient.ensureQueryData`.                      |

Some skills call others. Install the ones they need too:

- `go-all-in` uses `consolidate`, `prove-it`, `pr-it-ty` and `satisfy-ci`.
- `prove-it` uses `easy-fix` and `slopstop`.
- `slopstop` uses `prove-it`.
- `root-cause` uses `prove-it` and `easy-fix`.
- `easy-fix` uses `root-cause`.
- `consolidate` uses `easy-fix`.
- `satisfy-ci` uses `easy-fix`.
- `pr-it-ty` uses `commit` and reports results from `prove-it`.
- `grill-me-royale` adds suggestion questions when you use `suggest` between rounds.

`go-all-in`, `consolidate` and `satisfy-ci` end with the causes that came up twice, so you can run `never-again` on them.

## Base Rules

[`BASE.md`](BASE.md) holds the rules that apply to every task: how to back a claim, when to act, how to write replies and comments and which models to use by role.
The skills expect it in every session, e.g. `consolidate` takes its review model from it.

## Get Them Now

```bash
git clone https://github.com/mkrz/skills
cp -R skills/skills/* ~/.claude/skills/   # Claude Code
cp -R skills/skills/* ~/.codex/skills/    # Codex
```

Then install the base rules:

```bash
mkdir -p ~/.claude/rules
cp skills/BASE.md ~/.claude/rules/mkrz.md   # Claude Code
cp skills/BASE.md ~/.codex/mkrz.md          # Codex
```

Claude Code loads every file in `~/.claude/rules` on its own.
Codex only loads `~/.codex/AGENTS.md`, so add this line to it:

```md
Read `~/.codex/mkrz.md` before your first reply in every session. It holds rules that apply to every task.
```

`npx skills@latest add mkrz/skills` installs the skills as well, but not the base rules.

## Requirements

- An authenticated [GitHub CLI](https://cli.github.com) (`gh`) for `satisfy-ci` and `go-all-in`.
- Access to the models listed in [`BASE.md`](BASE.md) (or name your own) for role-based subagents and `consolidate`.
- `prove-it` and `slopstop` drive a UI with the `agent-browser` CLI from [vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser).

## Changing a Skill

Read [`AGENTS.md`](AGENTS.md) first. `pnpm run verify` checks the format, the house rules and that the skills, their triggers and this page still match.
