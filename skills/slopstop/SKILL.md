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

## Verify

After substantial UI changes, review its UX with `agent-browser` (`agent-browser --help` lists the commands):

1. Walk every changed flow end to end, including its empty, loading, and error states.
2. Screenshot each state at desktop and mobile width.
3. Open and read every screenshot. Look for broken layout, clipped or overlapping text, a wrong state, and any rule above that slipped.
4. Fix and reshoot until a full pass is clean.

Report the flows you walked. If `agent-browser` is missing, say the UI is unverified.
