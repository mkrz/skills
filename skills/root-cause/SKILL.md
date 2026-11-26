---
name: root-cause
description: Use when the user says "find the root cause" or reports a bug whose cause is unknown.
---

# Root Cause

Prove the cause from running code before you fix anything.

Reproduce the bug first using the repo's app, CLI or test runner.
If it does not reproduce, tighten the conditions or add logging. If it still does not reproduce, stop and tell the user what you tried. Never fix a bug you did not reproduce.

Only output from running code rules a suspect in or out (e.g. a log line, failing test or debugger value). Reading code only gives suspects.
Trace the fault back to the first place the state went wrong, not where it showed up.

When a cheap local test path exists, write and run a failing regression test before fixing. Prefer a throwaway check (deleted after) over a brittle or mock-heavy test.
Fix the proven cause using the `easy-fix` skill and include any regression test in the fix commit. Revert temporary logging and changes from ruled-out suspects.

If two fixes fail the reproduction, stop fixing and test the assumption both shared. If a third fix fails, stop and show the user the evidence.

Report what broke, the proven cause, the before/after reproduction output and the fix.
