# Risks And Prioritization

## Priority 1 - Compile Blockers

Current TypeScript compile blockers should be fixed before Playwright automation. Browser tests may be noisy or unreliable while the product does not pass `pnpm check`.

Known categories include:

- type mismatches between `ClauseVersion` and `ComparisonModal`;
- missing typed fields such as playbook position rationale;
- sample data values that do not match current enums;
- template clause shape mismatches.

## Priority 2 - 3-Text Model Consistency

The implemented 3-text model is the product's central QA risk. It must remain consistent across:

- clause creation and editing;
- comparison pairs;
- version snapshots;
- restore behavior;
- templates;
- import/export;
- localStorage persistence.

## Priority 3 - localStorage Determinism

Future automation must define setup and cleanup for localStorage keys. Without deterministic state, E2E tests may be flaky.

## Priority 4 - Import And Export

Document and file parsing can introduce malformed data. These flows should be tested after the core model is stable.

## Priority 5 - UI Accessibility And Selectors

Future Playwright tests should prefer accessible names. Gaps in button names, modal labels, or dynamic UI states should be recorded as testability risks.

## Priority 6 - Responsive And Visual Behavior

The app promises desktop and tablet support. Responsive checks should be added after core functional coverage exists.

