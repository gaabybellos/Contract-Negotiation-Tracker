# Discovery - Import Export

## Current Facts

- Import UI exists in `ImportModal.tsx`, `ImportTemplateDialog.tsx`, and `TemplatesPage.tsx`.
- Document parsing logic exists in `client/src/lib/docxParser.ts`.
- Export utilities exist in `client/src/lib/exportUtils.ts`.
- Imported clause data must map into the 3-text model.

## Risks

- Parsing may produce partial or malformed clause data.
- CSV parsing can be fragile if commas appear inside text.
- Export/import round-trip behavior needs later validation.

## Gaps

- Confirm all supported formats and runtime error states.

