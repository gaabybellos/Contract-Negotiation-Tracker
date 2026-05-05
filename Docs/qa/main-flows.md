# Main Flows

## Create Contract

The user creates a contract from the empty state or header flow, providing name, counterparty, description, and paper source. The contract becomes active and is persisted in localStorage.

Primary modules:

- `contracts`
- `timeline`
- `settings`

## Add Clause With 3-Text Model

The user adds a clause with metadata and three text areas: baseline, counterparty position, and our position. Labels vary based on paper source.

Primary modules:

- `clauses`
- `comparison`
- `versions`

## Compare Clause Texts

The user opens comparison for a clause and switches between baseline vs theirs, theirs vs ours, and baseline vs ours. The modal provides inline and side-by-side views plus diff statistics.

Primary modules:

- `comparison`
- `clauses`

## Save And Restore Versions

The user saves a version snapshot with round and party attribution, then may restore a previous version.

Primary modules:

- `versions`
- `comparison`
- `clauses`

## Filter Clause List

The user filters clauses by status, priority, owner, impact category, risk level, and full-text search.

Primary modules:

- `filters`
- `clauses`

## Manage Templates

The user creates, edits, duplicates, deletes, imports, and uses templates with template clauses.

Primary modules:

- `templates`
- `import-export`
- `contracts`

## Use Playbook Guidance

The user reviews playbook topics and guidance linked to clause classification.

Primary modules:

- `playbook`
- `clauses`

## Track Timeline

The user records negotiation events with dates, types, descriptions, and notes.

Primary modules:

- `timeline`
- `contracts`

