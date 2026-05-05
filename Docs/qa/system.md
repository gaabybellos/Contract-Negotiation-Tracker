# System - Contract Negotiation Tracker

## Overview

Contract Negotiation Tracker is a browser-based application for managing contract negotiations. It helps users organize contracts, clauses, negotiation positions, version history, templates, playbook guidance, filters, timeline events, and local data persistence.

## Main Entities

### Contract

Represents a contract negotiation.

Main fields:

- `id`
- `name`
- `counterparty`
- `description`
- `status`
- `paperSource`
- `ballInCourt`
- `createdAt`
- `updatedAt`
- `items`
- `timeline`

### ClauseItem

Represents a clause under negotiation.

The implemented 3-text model is central:

- `baselineText`: starting point text;
- `theirPosition`: counterparty current position;
- `ourPosition`: our current position.

Other relevant fields:

- `clauseNumber`
- `topic`
- `issue`
- `rationale`
- `currentRound`
- `status`
- `priority`
- `owner`
- `riskLevel`
- `impactCategory`
- `impactSubcategory`
- `versions`
- `annotations`

### ClauseVersion

Represents a snapshot of the 3-text model at a point in negotiation.

### Template

Represents reusable contract template data and template clauses.

### PlaybookTopic

Represents negotiation guidance, common objections, and positions.

## Persistence

The product primarily uses browser localStorage.

Known keys:

- `negotiation-tracker-contracts`
- `negotiation-tracker-contracts-version`
- `negotiation-tracker-templates`
- `negotiation-tracker-templates-version`
- `negotiation-tracker-playbook`
- `negotiation-tracker-columns`
- `negotiation-tracker-columns-version`
- `negotiation-tracker-impact-categories`
- `negotiation-tracker-owners`
- `negotiation-tracker-onboarding`
- `theme`

## Current QA Interpretation

The 3-text model is already implemented and should be treated as a core QA risk because it affects clause creation, comparison, templates, version history, imports, persistence, and export behavior.

