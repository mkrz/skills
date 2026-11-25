---
name: tanstack
description: Rules for TanStack Router and TanStack Query code. Use when writing, changing or reviewing routes, loaders or queries that use TanStack.
---

# TanStack

Every `useQuery` or `useSuspenseQuery` in a route component must use `queryOptions` that the route's `loader` already started with `queryClient.ensureQueryData`, so the route renders instantly on preload.
