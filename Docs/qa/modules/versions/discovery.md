# Discovery - Versions

## Current Facts

- Version behavior is implemented in `useVersionHistory.ts`.
- Versions snapshot `baselineText`, `theirPosition`, and `ourPosition`.
- Version metadata includes round, party, label, status, timestamp, and notes.
- Restore should preserve a backup of the current state.

## Risks

- Restore behavior can corrupt negotiation state if snapshot shape and UI shape diverge.
- Current compile blockers indicate a mismatch between `ClauseVersion` type and `ComparisonModal.tsx` references.

## Gaps

- Confirm actual restore behavior after TypeScript issues are fixed.

