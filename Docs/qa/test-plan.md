# Test Plan

## Scope

This plan covers QA discovery, manual test case design, automation specs, future execution reporting, and future automation for Contract Negotiation Tracker.

## Execution Notes (Current Phase)

- Execution reports are stored in `Docs/qa/executions/`.
- Playwright E2E suite (`pnpm pw:test`) has been successfully established and covers the core Contract and Clause creation flows.
- Unit testing via Vitest (`pnpm test`) covers the `textDiff` engine logic.
- Outstanding static analysis type mismatches have been logged as product bugs.

## Strategy

1. Document product behavior and risks.
2. Route discovery by module using `Docs/qa/module-map.md`.
3. Create traceable test cases using the case template.
4. Create automation specs only for cases ready to automate.
5. Fix compile blockers before browser automation.
6. Implement automation in a later phase.
7. Record executions and classify failures.

## Initial Test Focus

- contract creation and persistence;
- clause creation with the 3-text model;
- comparison pairs and diff statistics;
- version save and restore;
- filtering by status and search;
- template creation and contract creation from template.

## Quality Gates

- Discovery exists for the module.
- Test cases reference evidence.
- Automation specs define setup, cleanup, selectors, steps, and assertions.
- Compile blockers are resolved before Playwright automation.

