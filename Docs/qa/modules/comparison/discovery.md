# Discovery - Comparison

## Current Facts

- `ComparisonModal.tsx` compares baseline vs theirs, theirs vs ours, and baseline vs ours.
- `client/src/lib/textDiff.ts` provides diff behavior.
- The modal includes comparison, versions, notes, and playbook tabs.

## Risks

- Diff correctness is central to legal negotiation trust.
- Current TypeScript errors reference `ComparisonModal.tsx`, so compile blockers must be fixed before reliable automation.

## Gaps

- Confirm runtime behavior after compile blockers are resolved.

