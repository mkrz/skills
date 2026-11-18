---
name: prove-it
description: Proves a change on the running app with an independent agent and evidence, and builds the setup for it when a repo has none. Use when the user says "prove it", before a PR that changes behavior or UI, or when a repo has no way to test itself.
---

# Prove It

Prove the change on the running app, not by reading the code.
Green unit tests and "it compiles" are not proof.

## The Setup

A repo that can be proven has three things:

- A feature map in `docs/features/`, with one file per feature.
- A driver: one script that starts the app, waits until it's usable and drives it. Build it on `agent-browser` for a UI. For a library or a CLI, it runs the public commands.
- Seed data the driver can reset.

Build what is missing first. Start with the features the change touches.
Run the setup once from a clean checkout before you call it done. A setup that never ran is a draft.
Ready means usable, not that a process answers.
Only stop what you started. Never kill a process by its name.

## Feature Map

`docs/features/README.md` lists the features and how to start the driver.
Each feature file is written from the user's point of view:

```md
# <Feature>

<what the user can do>

## Parts

- `<id>`: <one behavior>

## How to Get There

- <entry point>

## How to Drive It

- <user action>: `<exact command>`, then <what must be visible>

## Gotchas

- <a trap that wastes or breaks a run>
```

List every entry point (e.g. a button, a shortcut and a URL).
Name things the way the UI names them, so "the filter above the invoice table" means one thing.
Keep implementation details out of the map.
Change a feature's file in the same PR that changes the feature.

## The Proof

Spawn an independent agent that did not write the change.
Give it the goal, the changed features, the feature map and the bar. Tell it not to edit anything.

It walks every changed feature through each entry point, including its empty, loading and error states.
For a UI, it takes a screenshot of each state at desktop and mobile width and checks them against the `slopstop` skill.
It runs the reload test on every changed page: set each control that picks which data the page shows (e.g. a filter, a sort, a search, a tab or the page of a table), reload and compare. The page must show the same data.
State like this belongs in the URL or on the server.
Anything else may be gone after a reload (e.g. an open menu or dialog, hover, focus, an unsaved form, a password or a picked file).
For a bug, it reproduces the bug on the old code first, then shows it gone on the new code.

It reports each part as passed or failed with its evidence: a screenshot or the output of a command. A part without evidence doesn't count.
It ends with "PROVEN" when every part passed, otherwise "CHANGES".

Open and read every screenshot yourself.
Fix what failed using the `easy-fix` skill, then start a fresh agent with the same brief and the list of what failed before.
Stop after 3 rounds and show the user what is still open.
Never weaken the walk to make it pass (e.g. by skipping an entry point or calling an internal function).

## Report

List the features walked, the evidence and what was not proven with the reason.
If the app can't be driven at all, stop and say why. Never call a change proven without a run.
