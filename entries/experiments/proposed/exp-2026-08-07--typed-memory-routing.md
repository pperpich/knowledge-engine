---
{
  "schema_version": 1,
  "id": "experiment:2026-08-07:typed-memory-routing",
  "title": "Test typed memory routing against uniform summarization",
  "date": "2026-08-07",
  "kind": "experiment",
  "namespace": "ai-knowledge",
  "topics": ["memory", "retrieval", "context-engineering", "evaluation"],
  "references": ["reference:arxiv:2608.03463"],
  "status": "proposed",
  "hypothesis": "On mixed long-term interaction histories, routing memories into profile, event, and source-grounded record representations will reduce median retrieved-context tokens by at least 25% and memory-construction tokens by at least 20% versus uniform summarization, while keeping answer accuracy and citation correctness within 3 percentage points of baseline and at or above 85%.",
  "success_criterion": "Across 45 paired questions, the typed-memory treatment reduces median retrieved-context tokens by at least 25% and construction tokens by at least 20%; mean answer accuracy and citation correctness are each at least 85%, neither is more than 3 percentage points below baseline, and no question-type subgroup is more than 5 percentage points below baseline.",
  "stop_condition": "Stop after 90 question-variant evaluations. Stop early after at least 20 paired questions if either treatment accuracy or citation correctness falls below 75%, or if either trails baseline by more than 10 percentage points.",
  "related": ["brief:ai-knowledge:2026-08-07"]
}
---

# Test typed memory routing against uniform summarization

## Why this experiment

LeanMem argues that stable preferences, evolving events, and detail-heavy records have different compression and fidelity requirements. This experiment isolates that representation choice rather than simultaneously changing the retrieval model, embedding model, or generator.

## Minimal procedure

1. Build a fixed corpus of historical interaction snippets containing three equally sized classes: stable profile facts or preferences, evolving events or states, and detail-intensive records where source fidelity matters.
2. Prepare 45 human-authored questions, 15 per class, with a gold answer and gold supporting source span for each question.
3. **Baseline — uniform summarization:** summarize every source segment into the same free-text memory format.
4. **Treatment — typed memory:** store stable facts as structured profile attributes; evolving information as `{topic, time, state}` event records; and detail-intensive content as a short retrieval gist plus a pointer to the untouched source span.
5. Keep segmentation, embedding model, candidate retrieval algorithm, maximum number of retrieved memory objects, generator model, prompt, temperature, and answer budget identical between conditions.
6. Run both conditions for every question in randomized order. Score with the same predefined rubric, preferably with the scorer blinded to condition.

## Measurement

Track construction tokens, retrieved-context tokens, latency, answer correctness, citation correctness, and unsupported-claim rate. Report paired differences with 95% bootstrap confidence intervals and results separately for profile, event, and record questions.

Definitions:

- **Answer correctness:** the response satisfies the human-written gold factual rubric without a material contradiction.
- **Citation correctness:** cited evidence directly supports the associated claim and resolves to a gold source span or another independently valid source span.
- **Construction tokens:** model input plus output tokens used to create or update stored memory records.
- **Retrieved-context tokens:** tokens actually passed from memory into the final answer-generation context.

## Expected effort

Four to six hours for corpus selection, gold labeling, treatment construction, scripted paired evaluation, and analysis, assuming an existing retrieval harness.

## Stop condition

Stop after 90 question-variant evaluations. An early quality-failure stop is allowed after at least 20 paired questions if treatment accuracy or citation correctness is below 75%, or trails the baseline by more than 10 percentage points.
