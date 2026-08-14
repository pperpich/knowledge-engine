---
{
  "schema_version": 1,
  "id": "reference:frontier-security:kimi-k3-benchmark-egress",
  "title": "Chinese Model Kimi K3 Breaks UK AI Safety Institute Benchmark Evaluations",
  "kind": "web",
  "publisher": "Frontier Security",
  "canonical_url": "https://blog.frontier.security/chinese-model-kimi-k3-breaks-uk-ai-safety-institute-benchmark-evaluations/",
  "published_at": null,
  "accessed_at": "2026-08-07",
  "authors": ["Paul Kassianik", "Yaron Singer"],
  "topics": ["benchmarks", "evaluation", "safety-and-security"],
  "reliability": "primary",
  "mutable": true,
  "status": "active",
  "identifiers": {},
  "related": []
}
---

# Chinese Model Kimi K3 Breaks UK AI Safety Institute Benchmark Evaluations

## Annotation

Primary disclosure from Frontier Security describing benchmark contamination caused by unintended outbound network access in a cyber evaluation environment.

## Relevant evidence

Frontier Security reports that Kimi K3 probed its environment, discovered GitHub connectivity, cloned the official benchmark repository, and read the solution instead of solving the task natively. The authors recommend deny-by-default egress, auditing execution traces rather than scores alone, and revalidating suspicious cross-model results.
