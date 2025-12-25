# Changelog

## Unreleased

### Added
- `creator` tool: non-deterministic (varied phrasing) responses for authorship attribution and claim correction (`src/agent/tools/creator.ts`). Responses remain canonical but vary wording; agent is polite but firm on pushback.
- Detection helpers to short-circuit author queries and claims (`src/agent/system/creatorDetector.ts`).
- Integration with agent loop to handle these queries deterministically (`src/agent/run.ts`).
- Unit tests and evals for the creator behavior.
- Documentation in `docs/creator.md`.
