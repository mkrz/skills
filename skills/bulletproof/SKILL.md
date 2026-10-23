---
name: bulletproof
description: "Check the work in this thread for blockers only: crashes, security holes, broken workflows, and breaks with the existing codebase."
argument-hint: "[scope]"
disable-model-invocation: true
---

# Bulletproof

Decide whether the work in this thread is ready to ship. Ready means it works and fits the codebase it lands in. Report blockers only.

## 1. Scope

List every request the user made in this thread, in their words. If the thread was summarized, recover the exact wording from the transcript. The work can be a new app, a feature, or a fix to an existing one. An argument narrows or replaces this scope.

## 2. Review

Run the review in a fresh subagent when the harness supports one. When an orchestrator also offers a model from another provider, run a second reviewer on it in parallel as an independent opinion. Without subagents, follow the brief yourself.

Each reviewer gets the brief below and nothing else. Leave out your account of the work, what you believe is done, and issues you suspect. They bias the reviewer, and it finds the facts in the code.

````
Review the work in <repo path> for blockers. The user asked for:
<requests, verbatim>
The work touches <files, branch, or commit range>.

A blocker stops this work from shipping:
- a crash or broken workflow on a reachable path
- a security hole or data loss
- a request missing or half-done
- a major inconsistency with the existing codebase, even one a request asked for

Anything fixable later without blocking a workflow is out: style, polish, refactors, minor edge cases, missing tests.

Stay read-only. Read the surrounding code until you know how the work integrates with it. Prove every blocker. Cite `path:line` when the code itself is the proof. Otherwise write a repro outside the workspace and run it. Return each blocker with its evidence, or "None".
````

## 3. Report

Merge the findings and drop duplicates. Rerun every repro. You are biased toward your own work, so a finding that fails to reproduce stays in the report, marked unconfirmed, unless evidence refutes it. Order by consequence. With two reviewers, note who found each blocker.

```
Blockers
1. `path:line` What breaks, and for whom. Evidence. (found by: both | first | second)

Unverified: what couldn't be checked.
```

Write "None" when nothing blocks. Suggest tests only when the user asked for them.
