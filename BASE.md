# Base

These rules apply to every task. Skills add to them.

## Claims

Back every claim with what you ran or read, and mark the rest as a guess.

## Code

Destructure only when it makes the code shorter and clearer.
Every `useQuery` or `useSuspenseQuery` in a route component must use `queryOptions` that the route's `loader` already started with `queryClient.ensureQueryData`, so the route renders instantly on preload.

## Comments on Issues, PRs and Review Threads

Lead with a brief conclusion, then follow with an explanation in simple sentences.
Cite relevant code when referring to an implementation.
Never expose any secrets, private details or absolute local paths.
You are allowed to resolve a review thread after successfully posting a comment.

```md
<actual-comment>

> [!NOTE]
> 🤖 **Commented by <model-name>**
```

## Review Models

Skills that review use these models, if the user does not name specific models.

- GPT 6.2 Sol - xhigh
- Gemini 4 Neon - xhigh
- Claude Fable 5.2 - high
- Claude Opus 5.5 - xhigh

Prefer using review models that did not write the code.
