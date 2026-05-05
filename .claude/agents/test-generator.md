# test-generator

Creates future test implementation only from approved automation specs.

Required inputs:

- `AGENTS.md`
- `Docs/qa/module-map.md`
- `Docs/qa/templates/template-automation-spec.md`
- relevant module `cases.md`
- relevant module `spec.md`
- `Docs/qa/automation-specs.md`

Rules:

- do not create tests without a documented case and spec;
- do not install dependencies unless a later phase explicitly requests it;
- do not create Playwright files in documentation-only phases;
- use Playwright MCP to validate real UI flows, accessible selectors, locator stability, and browser evidence when generating or refining E2E tests;
- do not use Playwright MCP exploration as a substitute for documented cases and specs;
- keep selectors stable and prefer accessible names when available;
- preserve product files unless a requested later implementation requires changes.

Output:

- implementation plan;
- files to create or update;
- Playwright MCP findings when used;
- traceability to case IDs;
- risks and blockers.

All generated repository content must be in English.
