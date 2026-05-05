# QA Module Map

This file is the routing document agents must use before writing module discovery, cases, or specs.

Rules:

- Write consolidated product findings in `Docs/qa/reverse-engineering.md`.
- Write cross-module flows in `Docs/qa/main-flows.md`.
- Write module-specific discovery in `Docs/qa/modules/<module>/discovery.md`.
- Write module-specific cases in `Docs/qa/modules/<module>/cases.md`.
- Write module-specific automation specs in `Docs/qa/modules/<module>/spec.md`.
- Add new modules here before creating a new module folder.

## contracts

Main entry: create, select, duplicate, complete, archive, and delete contracts.

Likely technical files:

- `client/src/components/Header.tsx`
- `client/src/components/EmptyState.tsx`
- `client/src/components/ContractStatusBar.tsx`
- `client/src/hooks/useContracts.ts`
- `client/src/types/index.ts`

Artifacts:

- `Docs/qa/modules/contracts/discovery.md`
- `Docs/qa/modules/contracts/cases.md`
- `Docs/qa/modules/contracts/spec.md`

## clauses

Main entry: create, edit, view, delete, and classify clauses using the implemented 3-text model.

Likely technical files:

- `client/src/components/ClauseForm.tsx`
- `client/src/components/ClauseTable.tsx`
- `client/src/components/ViewModal.tsx`
- `client/src/hooks/useContracts.ts`
- `client/src/types/index.ts`

## comparison

Main entry: textual comparison modal for baseline, counterparty position, and our position.

Likely technical files:

- `client/src/components/ComparisonModal.tsx`
- `client/src/lib/textDiff.ts`
- `client/src/hooks/useVersionHistory.ts`

## filters

Main entry: dashboard cards, filters, search, sorting, and filtered clause list.

Likely technical files:

- `client/src/components/DashboardStats.tsx`
- `client/src/components/FilterBar.tsx`
- `client/src/components/ClauseTable.tsx`
- `client/src/contexts/NegotiationContext.tsx`

## versions

Main entry: version snapshots, rounds, party attribution, and restore behavior.

Likely technical files:

- `client/src/hooks/useVersionHistory.ts`
- `client/src/components/ComparisonModal.tsx`
- `client/src/types/index.ts`

## templates

Main entry: template library, template clauses, document import, and contract creation from templates.

Likely technical files:

- `client/src/components/TemplatesPage.tsx`
- `client/src/components/NewContractFromTemplateDialog.tsx`
- `client/src/hooks/useTemplates.ts`
- `client/src/lib/docxParser.ts`

## import-export

Main entry: import clauses/templates and export contract data.

Likely technical files:

- `client/src/components/ImportModal.tsx`
- `client/src/components/ImportTemplateDialog.tsx`
- `client/src/lib/exportUtils.ts`
- `client/src/lib/docxParser.ts`

## timeline

Main entry: negotiation lifecycle events.

Likely technical files:

- `client/src/components/Timeline.tsx`
- `client/src/hooks/useContracts.ts`

## playbook

Main entry: negotiation guidance, topics, positions, objections, and clause-related suggestions.

Likely technical files:

- `client/src/components/PlaybookPanel.tsx`
- `client/src/components/PlaybookModal.tsx`
- `client/src/components/PlaybookTopicDialog.tsx`
- `client/src/hooks/usePlaybook.ts`

## settings

Main entry: owners, categories, subcategories, columns, theme, onboarding, and preferences.

Likely technical files:

- `client/src/components/SettingsModal.tsx`
- `client/src/hooks/useImpactConfig.ts`
- `client/src/hooks/useColumnConfig.ts`
- `client/src/contexts/ThemeContext.tsx`

