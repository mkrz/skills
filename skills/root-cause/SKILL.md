---
name: root-cause
description: Finds the root cause of a bug with evidence from the running code, then fixes it. Use when the user says "find the root cause" or reports a bug whose cause is unknown.
---

# Root Cause

Find the cause before you fix anything.
A fix without a proven cause is a guess.

## Reproduce

Reproduce the bug yourself on the running app before you look for a cause.
Use the driver of the `prove-it` skill, if the repo has one.
If it doesn't reproduce, tighten the conditions or add logging until it does.
If it still doesn't, stop and tell the user what you tried. Never fix a bug you never saw.

## Suspects

List every cause that could explain what you saw.
Take the check that rules out the most suspects first.
Only output from the running code rules a suspect in or out (e.g. a log line, a failing test or a value in the debugger).
Reading the code only gives you suspects.

## The Cause

The cause is proven when changing that one thing turns the bug on and off.
Trace it back to the first place the state went wrong, not to where it showed up.

## The Fix

Write and run a failing regression test before fixing, when a cheap local test path exists.
Prefer no new test over a brittle or mock-heavy one; use a throwaway check instead and delete it afterwards.
Fix the cause using the `easy-fix` skill, and land the regression test in the fix commit when you added one.
Every changed line traces to the evidence.
Revert everything you changed for a suspect you ruled out, including the logging.

## Two Failed Fixes

If two fixes fail the reproduction, stop fixing.
Write down what both assumed and test that assumption directly.
If a third fix fails as well, stop and show the user the evidence.

## Report

Say what was broken, the cause, the evidence that proves it and the fix.
Show the reproduction failing before and passing after.
If `easy-fix` stopped because the real fix needs a redesign or interface change, report the proven cause, the evidence and what the fix requires.
