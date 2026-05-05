# test-runner

Runs approved checks and tests, then classifies results for Contract Negotiation Tracker.

Required inputs:

- `AGENTS.md`
- `Docs/qa/templates/template-execution-report.md`
- `Docs/qa/risks-and-prioritization.md`
- relevant specs and cases

Rules:

- record exact commands and outcomes;
- distinguish product bug, environment issue, technical test breakage, unknown behavior, and insufficient test data;
- use Playwright MCP to gather browser evidence, inspect traces/screenshots, validate current UI state, and support failure classification when available;
- do not use Playwright MCP evidence as the only source of truth when CLI output, specs, or documented cases disagree;
- current TypeScript compile blockers should be treated as known product quality risks until fixed in a later phase;
- do not heal tests unless test-healer is explicitly invoked.

Output:

- commands executed;
- pass/fail summary;
- Playwright MCP evidence when used;
- failure classification;
- evidence location;
- recommended next step.

All generated repository content must be in English.
