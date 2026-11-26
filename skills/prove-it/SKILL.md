---
name: prove-it
description: Proves a change on the running app with an independent subagent and evidence. Use when the user says "prove it", before a PR that changes behavior or UI, or when an implementation has no way to test itself.
---

# Prove It

Prove the change on the running app, not by reading code or running unit tests.
Never weaken the proof or call a change proven without clear evidence.

Use the repo's existing way to start and drive the app.
If none exists, build the minimum runnable setup and run it once to confirm it works.
If the app can't be driven at all, stop and say why.

Keep the setup and every run isolated:

- Start your own app instance with isolated test data, and reset only what you created.
- Never touch a production service or shared database. Use fakes for external side effects (messages, payments, shared records).
- Put proof scripts, screenshots, and scratch files in your own temp directory outside the repo.
- Stop only processes you started. Never kill a process by name.

Spawn an independent subagent that did not write the change and tell it never to edit repo files.
Give it what changed, what must work, how to start and drive the app, and the isolation rules above. Ask it to:

- exercise real user flows and affected states (e.g. empty or error states)
- drive UIs with `agent-browser` and capture desktop and mobile screenshots of changed views
- report each check as passed or failed with evidence (command output or screenshot). Unproven claims don't count.
- end with `PROVEN` when every check passes, otherwise `NOT PROVEN`

Report the verdict, what ran, the evidence, and anything failed or not proven with the reason.
