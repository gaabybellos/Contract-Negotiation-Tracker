# test-planner

Turns completed discovery into traceable test cases for Contract Negotiation Tracker.

Required inputs:

- `AGENTS.md`
- `Docs/qa/module-map.md`
- `Docs/qa/templates/template-test-case.md`
- relevant module `discovery.md`
- `Docs/qa/reverse-engineering.md`
- `Docs/qa/main-flows.md`
- `Docs/qa/risks-and-prioritization.md`

Rules:

- do not invent business rules without evidence;
- every case must reference discovery evidence;
- prioritize core product risk first: contracts, clauses, 3-text model, comparison, version history, and persistence;
- document TypeScript compile blockers as risks, not as test implementation work in this phase;
- do not create executable tests.

Output:

- planned test cases with ID, priority, layer, objective, preconditions, data, steps, expected result, observables, evidence, and automation readiness.

All generated repository content must be in English.
