---
{
  "schema_version": 1,
  "id": "experiment:2026-09-05:structure-aware-reranking",
  "title": "Test structure-aware reranking over a frozen candidate pool",
  "date": "2026-09-05",
  "kind": "experiment",
  "namespace": "ai-knowledge",
  "topics": ["retrieval", "rag", "reranking", "context-engineering", "evaluation", "provenance"],
  "references": ["reference:arxiv:2609.03874"],
  "status": "proposed",
  "hypothesis": "On long structured documents, reranking a fixed dense-retrieval candidate pool with heading-path relevance and section coherence will improve evidence retrieval without changing the reader, corpus, embeddings, or evidence budget.",
  "success_criterion": "Across at least 60 paired questions spanning at least 6 documents, treatment Recall@5 must improve by at least 8 percentage points over baseline with a paired bootstrap 95% confidence interval whose lower bound is above 0; treatment must also achieve Recall@5 >= 0.80 and citation correctness >= 0.90 overall, with no document below 0.65 Recall@5.",
  "stop_condition": "Stop if fewer than 60 questions can be assigned source-grounded gold evidence, if the frozen candidate pool contains no gold chunk for more than 20% of questions, or if treatment requires changing chunk content, candidate generation, reader prompts, or the final evidence budget.",
  "related": ["brief:ai-knowledge:2026-09-05"]
}
---

# Test structure-aware reranking over a frozen candidate pool

## Why this experiment

STAIR reports stronger retrieval when global document structure such as a table of contents is incorporated into a learned retrieval system. Because that result combines structure with a finetuned generative retriever, this experiment isolates a smaller question: can document hierarchy improve **ordering** when candidate generation is held fixed? [Primary source](https://arxiv.org/abs/2609.03874)

## Minimal procedure

1. Select at least 6 long documents with explicit heading hierarchies and create at least 10 source-grounded questions per document, for at least 60 questions total. Each question must have one or more gold chunks that independently contain enough evidence to support the answer.
2. Chunk each document once. Store each chunk’s document ID, heading path, section position, and text. Freeze these chunks for both variants.
3. Use one fixed embedding model and retrieval configuration to generate the same top-20 candidate pool for each question.
4. **Baseline:** order the top-20 candidates only by dense retrieval score.
5. **Treatment:** rerank those exact candidates with a preregistered score combining dense relevance, semantic similarity between the query and heading path, and a section-coherence bonus for candidates sharing an ancestor section with another high-relevance candidate. Do not add or remove candidates.
6. Give both variants the same top-5 evidence count, reader model, answer prompt, token budget, temperature, and production order. Randomize which variant is scored first during blind answer grading.
7. Score retrieval and generated answers per question and report overall plus per-document results.

Definitions: **baseline** means dense-score ordering of the frozen top-20 pool. **Production order** means the sequence in which the reader receives the top-5 chunks. **Correctness** means the generated answer matches the gold answer without a material factual error. **Citation correctness** means every cited chunk actually supports the claim attached to it; unsupported or mismatched citations fail that item. **Strongest evidence** means the gold chunk or smallest gold chunk set preregistered before either variant is run.

## Measurement

Primary metric: Recall@5 against preregistered gold evidence. Secondary metrics: answer correctness, citation correctness, MRR of the first gold chunk, input tokens, and reranking latency.

Use paired per-question differences because both variants share the same questions and candidate pools. Report the mean paired Recall@5 difference with a 95% bootstrap confidence interval and show results per document so one easy source cannot hide regressions elsewhere.

The experiment passes only if the front-matter success criterion is met. The absolute Recall@5, citation-correctness, and per-document guardrails prevent a relative gain from passing when both systems are poor.

## Expected effort

About 4–6 hours if the documents and embedding index already exist: roughly 2 hours to create and verify the gold set, 1–2 hours to implement the structure features and fixed reranker, and 1–2 hours to run, blind-score, and analyze the paired evaluation.

## Stop condition

Apply the front-matter stop condition before interpreting results. Also stop and redesign if manual inspection finds that heading paths leak gold answers directly into the reranker in a way unavailable in the source document, because that would test answer leakage rather than structural retrieval.