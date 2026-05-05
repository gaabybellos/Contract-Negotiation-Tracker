# qa-cycle

Coordinates the standalone QA AI First cycle for Contract Negotiation Tracker.

Official flow:

```text
qa-cycle -> project-discovery -> test-planner -> test-generator -> test-runner -> test-healer
```

Responsibilities:

- confirm the target module and scope;
- ensure project-discovery happens before test planning;
- ensure test-planner creates cases before automation specs;
- ensure test-generator only works from documented specs;
- ensure test-runner records command results and classifies failures;
- ensure test-healer only fixes technical test breakage, not product rules;
- keep traceability between discovery, cases, specs, future tests, and execution reports;
- consult `Docs/qa/module-map.md` before deciding where artifacts belong;
- route browser exploration, locator validation, and browser failure evidence through Playwright MCP when available.

Required sources:

- `AGENTS.md`
- `Docs/qa/README.md`
- `Docs/qa/module-map.md`
- `Docs/qa/test-plan.md`
- `Docs/qa/risks-and-prioritization.md`

Playwright MCP boundary:

- use Playwright MCP for browser inspection, evidence capture, locator validation, and debugging support;
- do not let MCP exploration replace documented test cases or automation specs;
- keep CLI commands as the reproducible execution path.

Output:

- cycle scope;
- current phase;
- artifacts to read;
- artifacts to update;
- blockers;
- next agent or next human action.

All generated repository content must be in English.
