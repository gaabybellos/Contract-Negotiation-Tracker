# Discovery - Timeline

## Current Facts

- Timeline events are typed as `TimelineEvent`.
- Contract creation automatically creates an initial timeline event.
- Timeline actions are handled through `useContracts.ts`.

## Risks

- Event ordering depends on date parsing.
- Timeline changes should persist with the active contract.

## Gaps

- Confirm UI edit/delete behavior in `Timeline.tsx`.

