# Discovery - Filters

## Current Facts

- Filter state lives in `NegotiationContext.tsx`.
- Filtering includes search, status, priority, owner, impact category, and risk level.
- Search checks clause number, issue, 3-text fields, and rationale.

## Risks

- Filters must stay synchronized with dashboard counts and table output.
- Search over 3-text fields is a key regression area.

## Gaps

- Confirm sort behavior in `ClauseTable.tsx`.

