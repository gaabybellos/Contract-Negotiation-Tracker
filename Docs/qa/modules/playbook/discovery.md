# Discovery - Playbook

## Current Facts

- Playbook data is typed as `PlaybookTopic` and `PlaybookPosition`.
- `usePlaybook.ts` handles CRUD, search, category grouping, and localStorage persistence.
- Playbook guidance can be surfaced from clause context.

## Risks

- Current TypeScript errors indicate UI references to fields not present in the typed `PlaybookPosition`.
- Search and related clause matching are string-based and need regression coverage.

## Gaps

- Confirm final typed shape before automation.

