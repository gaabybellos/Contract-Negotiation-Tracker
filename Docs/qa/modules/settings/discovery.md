# Discovery - Settings

## Current Facts

- Owners are persisted through `NegotiationContext.tsx`.
- Column config is handled by `useColumnConfig.ts`.
- Impact categories are handled by `useImpactConfig.ts`.
- Theme persistence uses `ThemeContext.tsx`.

## Risks

- Configuration values affect clause form options and table visibility.
- localStorage cleanup must include settings keys for deterministic tests.

## Gaps

- Confirm UI behavior for settings dialogs and validation.

