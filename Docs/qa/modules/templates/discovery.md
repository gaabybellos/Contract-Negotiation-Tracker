# Discovery - Templates

## Current Facts

- Templates are typed in `client/src/types/index.ts`.
- `useTemplates.ts` handles template CRUD and localStorage persistence.
- `TemplatesPage.tsx` supports manual templates, imports, template clauses, and track changes.
- Template clauses use the 3-text model.

## Risks

- Template clauses must map correctly into contract clauses.
- Imported clauses must not lose baseline text or metadata.

## Gaps

- Confirm template-based contract creation UI path and selectors.

