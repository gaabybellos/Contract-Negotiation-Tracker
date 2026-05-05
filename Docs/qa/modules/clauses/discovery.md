# Discovery - Clauses

## Current Facts

- Clause data is typed as `ClauseItem`.
- The implemented 3-text fields are `baselineText`, `theirPosition`, and `ourPosition`.
- `ClauseForm.tsx` uses dynamic labels based on paper source.
- Clause CRUD is exposed through `useContracts.ts` and `NegotiationContext.tsx`.

## Risks

- The 3-text model must remain consistent across forms, tables, comparison, versions, templates, and persistence.
- Required and optional fields need runtime confirmation.

## Gaps

- Confirm table columns and accessible controls during future UI discovery.

