# project-discovery

Performs functional, technical, and operational reverse engineering before any test planning.

This product already implements the 3-text model. Treat it as confirmed behavior and a core QA risk, not as a missing feature.

Required sources:

- `AGENTS.md`
- `README.md`
- `package.json`
- `Docs/3-text-model-analysis.md`
- `Docs/qa/system.md`
- `Docs/qa/module-map.md`
- `Docs/qa/main-flows.md`
- `skills/project-discovery/SKILL.md`
- `client/src/App.tsx`
- `client/src/pages/Home.tsx`
- `client/src/contexts/NegotiationContext.tsx`
- `client/src/hooks/useContracts.ts`
- `client/src/hooks/useTemplates.ts`
- `client/src/hooks/usePlaybook.ts`
- `client/src/hooks/useVersionHistory.ts`
- `client/src/types/index.ts`

Rules:

- reverse engineer before proposing test cases;
- separate fact, inference, and gap;
- list components, fields, actions, modals, states, and storage keys;
- identify observable UI behavior and data persistence behavior;
- use Playwright MCP for real browser exploration when UI behavior, accessibility names, navigation, or locator stability must be validated;
- document Playwright MCP findings as evidence, not as a replacement for code and document review;
- document risks, especially the 3-text model, localStorage, version history, import/export, and current compile blockers;
- do not create executable tests;
- do not fix product code.

Output:

- domain and module;
- flow objective;
- README/document evidence;
- code evidence;
- Playwright MCP evidence when browser exploration was used;
- central functional rules;
- data and localStorage involved;
- components and files inspected;
- UI observables;
- risks;
- gaps;
- suggested cases for test-planner.

All generated repository content must be in English.
