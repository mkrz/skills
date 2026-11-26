---
name: slopstop
description: Use when building, changing or reviewing any UI.
---

# Slopstop

## Text and Case

Use Title Case for short UI labels (titles, sublines, buttons, links, tabs, menu items, form labels, table headers, badges and notifications). Keep short articles, conjunctions and prepositions lowercase unless first or last ("Sign In to Your Account", "Terms of Service").

Use sentence case for body copy (paragraphs, descriptions, helper text, error messages and full sentences). Keep brand names, code identifiers and user data as written.

Do not use small, letter-spaced, uppercase caplines.

## Values and Forms

Write values so they read on their own beside what they describe ("3 open issues", "Paid on 12 March", "Synced 5 minutes ago"). Replace `Label: value` pairs, key-value grids and decorative pills with position, typography and grouping. Color and icons only reinforce the words. Multi-record tables keep their column headers.

Put multi-field create flows in a modal, or on a separate page if large or multi-step. Do not add an inline dropdown and Add button to a list or detail view; use inline entry only for rapid repeated items or single-field composers (e.g. tags, line items or comments).

## Verify

Verify UI changes with the `prove-it` skill. Ask its subagent to check the rules above plus broken layout, clipped or overlapping text, wrong states and edge alignment. If it returns `NOT PROVEN`, fix the issues and run `prove-it` once more; if it still fails, stop and show the user.
