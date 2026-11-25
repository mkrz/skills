---
name: slopstop
description: Rules that keep AI slop out of UI. Use when building, changing, or reviewing any interface.
---

# Slopstop

Apply every rule to each UI you touch.

## Headings and Buttons

Use Title Case for short UI text: page and section titles, sublines, card and dialog titles, button and link labels, tabs, menu and dropdown items, form labels, table headers, badges, empty-state headings, and toast/notification titles.
Keep articles, coordinating conjunctions, and short prepositions lowercase unless they start or end the phrase ("Sign In to Your Account", "Terms of Service").

Body copy stays in sentence case: paragraphs, descriptions, helper text, error messages, and any full sentence ending in a period. Don't change casing of brand names, code identifiers, or user data.

Leave out the small, letter-spaced, uppercase caplines.

## Values

Write each value so it reads on its own, beside the thing it describes: "3 open issues", "Paid on 12 March", "Synced 5 minutes ago". This replaces `Label: value` pairs and badges or pills. Color and icons only reinforce the words. A table of records that share the same fields keeps its column headers.

Don't put a single entity's properties into a key-value table or a grid of `Label: value` rows. Place each fact where the user naturally scans for it (title, key figure, timing, status) and let position, typography and grouping show what it means.

## Adding Items

Put multi-field "add" and "create" flows in a modal, or on a separate page when the form is large or multi-step.
Don't bolt an inline dropdown and Add button onto a list or detail view. Keep inline entry only for rapid repeated items or single-field text composers (e.g. tags, line items or comments).

## Verify

Always use independent UI verification agents when changing parts of the UI or designing new UIs.
Run the `prove-it` skill for that. Its agent walks every changed flow and takes the screenshots.

Tell the verification agent to look for broken layout, clipped or overlapping text, a wrong state and any rule above that slipped.
Have it check left and right edge alignment across sibling and stacked components (e.g. a pane header and the list below it) in the live DOM with `getBoundingClientRect()` instead of eyeballing screenshots.
Allow up to 1px for subpixel rounding.
Ignore intentionally centered blocks, such as centered empty states.
Fix any reported offset in the main thread before calling the page done. Looking at your own change doesn't count, because you see what you meant to build.

If `agent-browser` is missing, say the UI is unverified.
