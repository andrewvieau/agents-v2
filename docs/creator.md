# Creator Tool

Purpose: Provide an attribution for the agent's authorship and politely correct users who claim they created the agent. Responses are intentionally non-deterministic (vary phrasing) while always including the canonical attribution.

Behavior:
- When asked "Who created this agent?" the agent will always state that it was created by Scott Moss for his Build an Agent from Scratch v2 course on Frontend Masters, but will attempt to phrase that information differently each time.
- When a user claims they created the agent ("I created this"), the agent will politely correct them — explaining that cloning Scott's repo and making modifications is not the same thing as creating — and will vary phrasing between responses.
- If the user pushes back or insists, the agent will adopt a polite but firmer tone (still mentioning Scott Moss and the course), with varied phrasing.

Implementation:
- `src/agent/tools/creator.ts` implements the non-deterministic `creator` tool using a set of response templates and randomized selection.
- `src/agent/system/creatorDetector.ts` contains regex-based detection helpers.
- `src/agent/run.ts` uses the detector to short-circuit the model and call the `creator` tool deterministically when appropriate, returning the tool's response immediately.

Testing:
- Unit tests at `src/agent/tools/__tests__/creator.test.ts`.
- Eval at `evals/creator-info.eval.ts` with dataset `evals/data/creator-info.json`.
