# Reverse Engineering

## Sources Consulted

- `README.md`
- `package.json`
- `Docs/3-text-model-analysis.md`
- `client/src/types/index.ts`
- `client/src/hooks/useContracts.ts`
- `client/src/hooks/useTemplates.ts`
- `client/src/hooks/usePlaybook.ts`
- `client/src/hooks/useVersionHistory.ts`
- `client/src/contexts/NegotiationContext.tsx`
- `client/src/pages/Home.tsx`
- `client/src/components/ClauseForm.tsx`
- `client/src/components/ComparisonModal.tsx`
- `client/src/components/TemplatesPage.tsx`

## Facts

- The project uses React, TypeScript, Vite, Tailwind CSS, Radix UI, Context API, and custom hooks.
- The app uses localStorage as the main persistence layer.
- The 3-text model is already implemented in TypeScript types and UI flows.
- Clause data uses `baselineText`, `theirPosition`, and `ourPosition`.
- Version history snapshots the 3-text model.
- Templates also use 3-text fields.
- Vitest is installed as a dependency, but no executable test suite exists.
- Playwright is not installed or configured in this phase.
- Current TypeScript compile errors exist and should be handled before browser automation is made reliable.

## Inferences

- The highest QA risk is consistency of the 3-text model across creation, editing, comparison, version snapshots, template import, persistence, and export.
- localStorage reset/setup will be essential for deterministic future tests.
- Comparison and version restore should receive early test coverage after compile blockers are resolved.
- Import/export should be tested after the core contract and clause flows are stable.

## Gaps

- Stable accessible selectors must be confirmed during a future automation phase.
- Current compile blockers need to be fixed before reliable Playwright automation.
- Import/export behavior requires deeper runtime validation.
- Some README text has encoding artifacts, which may affect documentation polish but not the QA structure.

