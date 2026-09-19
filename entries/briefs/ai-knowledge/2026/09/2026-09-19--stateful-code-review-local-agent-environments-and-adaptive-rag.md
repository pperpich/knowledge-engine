---
{
  "schema_version": 1,
  "id": "brief:ai-knowledge:2026-09-19",
  "title": "Stateful code review, local agent environments, and adaptive RAG",
  "date": "2026-09-19",
  "kind": "daily-brief",
  "namespace": "ai-knowledge",
  "topics": ["agent-tooling", "developer-tools", "evaluation", "rag", "retrieval", "memory", "provenance"],
  "entities": ["GitHub Copilot", "Sentry", "Visual Studio Code", "DRAG"],
  "references": ["reference:github:copilot-weekly-2026-09-18", "reference:arxiv:2609.17709"],
  "experiment": "experiment:2026-09-19:review-state-provenance",
  "related": [],
  "confidence": "medium",
  "status": "published"
}
---

# Stateful code review, local agent environments, and adaptive RAG

## Three meaningful changes

1. **Copilot code review became more stateful across revisions.** GitHub says subsequent reviews now preserve a review overview, distinguish open, resolved, and previously missed findings, and auto-resolve addressed comments with resolution reasons. Reviews can also use shell tools to validate changes. [GitHub Copilot weekly releases — September 14](https://github.blog/changelog/2026-09-18-github-copilot-weekly-releases-september-14/)

2. **VS Code agents can run inside local Dev Containers.** VS Code 1.138 is gradually rolling out support for Agents-window sessions to execute with a project's tools and dependencies inside local Dev Containers. GitHub states that Docker and a supported Dev Container configuration are required. [GitHub Copilot weekly releases — September 14](https://github.blog/changelog/2026-09-18-github-copilot-weekly-releases-september-14/)

3. **Copilot app added a Sentry-to-fix workflow.** GitHub's new Sentry canvas exposes production errors, stack traces, and related context to Copilot so a developer can investigate the cause, validate a fix, and prepare a pull request from the same workflow. [GitHub Copilot weekly releases — September 14](https://github.blog/changelog/2026-09-18-github-copilot-weekly-releases-september-14/)

## Why they matter

**Interpretation:** the common direction is not simply "more agent autonomy"; it is tighter coupling between agents and durable engineering context. Review state gives an agent memory across code revisions, Dev Containers make the execution environment closer to the project's declared runtime, and Sentry supplies production evidence before code changes begin. For builders, that shifts important context from prompt prose into structured state, executable environments, and operational telemetry.

The code-review change is especially interesting as a knowledge-system primitive: a finding now has a lifecycle rather than being disposable text. That makes provenance questions testable: what was found, against which revision, what evidence resolved it, and whether a later review contradicted the earlier state.

## Knowledge-system research

An uncaptured September 15 preprint, **DRAG**, studies joint adaptation of retriever and generator configurations rather than using one fixed RAG stack for every query. Across factoid and multi-hop QA, the authors report that stronger retrieval often produces larger gains than extra generation effort, while both show diminishing and sometimes non-monotonic returns. Their training-free variant routes retrieval with query-performance-prediction signals and generation with measures derived from retrieved context; a supervised variant predicts both jointly. [One Size Does Not Fit All! Dynamic Retriever and Generator Selection for RAG](https://arxiv.org/abs/2609.17709)

**Interpretation:** this extends the recent query-adaptive retrieval theme rather than replacing it. The useful delta is joint resource allocation: retrieval depth and generator effort should potentially be selected together because spending more on either stage is not uniformly beneficial. **Uncertainty:** this is author-reported preprint evidence across four QA benchmarks, not independent validation or a production workload result.

## One experiment

Test **structured review-state provenance versus stateless re-review**. On 80 paired multi-revision pull requests, preserve only a structured ledger of prior findings, statuses, and code-based resolution evidence in the treatment arm. Keep model, prompt, tools, token budget, and code snapshots fixed. The treatment must reduce repeated or contradictory findings by at least 30% relative while both arms retain at least 80% true-defect recall and treatment recall trails baseline by no more than 3 percentage points. See `experiment:2026-09-19:review-state-provenance`.

## Risks or disagreements

GitHub's three builder changes come from one vendor release roundup, so they are distinct workflow changes but not three independent ecosystem signals. Dev Container support is still a gradual rollout, so availability may differ by user. The Sentry canvas demonstrates product integration, not evidence that agent-generated fixes improve production outcomes. Stateful review can also anchor later reviews to earlier mistakes; that is why the experiment treats defect recall as an absolute guardrail rather than optimizing only for fewer repeated comments.

For DRAG, the reported effectiveness/efficiency trade-off may depend strongly on benchmark mix, retriever families, generator families, and router overhead. The paper supports testing joint routing, not assuming that its routing signals are universally optimal.

## Primary sources

- [GitHub Copilot weekly releases — September 14, published September 18, 2026](https://github.blog/changelog/2026-09-18-github-copilot-weekly-releases-september-14/)
- [One Size Does Not Fit All! Dynamic Retriever and Generator Selection for RAG, arXiv:2609.17709, submitted September 15, 2026](https://arxiv.org/abs/2609.17709)
