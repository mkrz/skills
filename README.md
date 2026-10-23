# skills

Agent skills I wrote for my own daily work and publish here. They run in Claude Code, Codex, Cursor and any other harness that reads the [Agent Skills](https://agentskills.io) format.

## Install

Pick one route per agent. A plugin updates itself, while skills.sh copies files you then own and update by hand. Installing both gives you every skill twice.

**Claude Code**

```bash
claude plugin marketplace add mkrz/skills
claude plugin install mkrz-skills@mkrz
```

**Codex**

```bash
codex plugin marketplace add mkrz/skills
codex plugin add mkrz-skills@mkrz
```

**Any other agent, or editable copies** (skills.sh)

```bash
npx skills@latest add mkrz/skills                    # pick skills interactively
npx skills@latest add mkrz/skills --skill=slopstop   # one skill
```

Update with `npx skills@latest update`. Re-run `add` to pick up skills published since your last install.

## Skills

### User-invoked

You start these by typing their name. The agent never fires them on its own.

- [bulletproof](skills/bulletproof/SKILL.md): check the work in the current thread for blockers only, such as crashes, security holes, broken workflows, and breaks with the existing codebase. A second reviewer on another provider joins when the harness offers one.
- [grill-me-royale](skills/grill-me-royale/SKILL.md): an interview in shrinking rounds. Each round asks a third fewer questions until two remain.

### Model-invoked

The agent loads these when the task matches. You can also call them by name.

- [implement-wisely](skills/implement-wisely/SKILL.md): comments only for constraints the code cannot express, a commit at every milestone or finished task, and one-line Conventional Commits messages and PR titles. Called by name, it implements the referenced tasks, or the ones from the thread, and off the main branch pushes and opens a PR.
- [slopstop](skills/slopstop/SKILL.md): rules that keep AI slop out of UI: Title Case headings and buttons, no letter-spaced uppercase caplines, values that read on their own instead of key/value pairs and badges, and every UI change checked in a browser. To apply it in every session, paste its rules into your global `AGENTS.md`.

## Depends on

`slopstop` verifies UI with the `agent-browser` CLI from [vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser).

## Working on the skills

`scripts/install.sh` symlinks every skill here into `~/.agents/skills` and `~/.claude/skills`, so edits are live in every harness without reinstalling. `node scripts/check.mjs` checks the conventions in [AGENTS.md](AGENTS.md).

## License

[MIT](LICENSE)
