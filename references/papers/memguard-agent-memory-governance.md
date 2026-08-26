---
{
  "schema_version": 1,
  "id": "reference:arxiv:2608.21867",
  "title": "MemGuard: Persisting Verifier Signals for LLM-Agent Memory Governance",
  "kind": "paper",
  "publisher": "arXiv",
  "canonical_url": "https://arxiv.org/abs/2608.21867",
  "published_at": "2026-08-22",
  "accessed_at": "2026-08-26",
  "authors": ["Haoyu Wang", "Guangyuan Dong", "He Liang", "Zijing Zhang", "Jiachen Luo", "Chuang Liu", "Chao Xue", "Hao Tang"],
  "topics": ["memory", "provenance", "evaluation", "context-engineering"],
  "reliability": "primary",
  "mutable": false,
  "status": "active",
  "identifiers": {"arxiv": "2608.21867", "doi": "10.48550/arXiv.2608.21867"},
  "related": []
}
---

# MemGuard: Persisting Verifier Signals for LLM-Agent Memory Governance

## Annotation

Recent preprint proposing that memory-verification results remain attached to records as lifecycle metadata rather than being discarded after admission.

## Relevant evidence

MemGuard stores verifier-derived reward, confidence, label, and uncertainty metadata and reuses those signals during retrieval, conflict resolution, summarization, and archival. Across Terminal-Bench 2.0, SWE-Bench Verified, WebArena, and Mind2Web with four backbones, the authors report the best success metric and lowest average steps in all 16 tested settings, including gains of up to 7.9 success-rate points on WebArena versus the strongest prior memory baseline they evaluated. Results are author-reported preprint evidence.
