---
name: writing-code
description: Use when writing code.
---

# Writing Code

## Comments

Write code without explanatory comments. Only write simple comments for constraints the code cannot express, such as a workaround, a decision or a special characteristic in the spec.
Keep existing comments, and hold them to the same rule when you edit them.

## TypeScript

Destructure only when it makes the code shorter and clearer.
Never destructure props or nested objects just to rename them.
Access properties directly instead (e.g. `user.name`).

## TanStack Router

Every `useQuery` or `useSuspenseQuery` in a route component must use `queryOptions` that the route's `loader` already started with `queryClient.ensureQueryData`, so the route renders instantly on preload.
