---
{
  "schema_version": 1,
  "id": "reference:arxiv:2608.16357",
  "title": "MELD: A Protocol for Merging Knowledge Across Distributed Agentic Memories",
  "kind": "paper",
  "publisher": "arXiv",
  "canonical_url": "https://arxiv.org/abs/2608.16357",
  "published_at": "2026-08-17",
  "accessed_at": "2026-08-20",
  "authors": ["Lauri Lovén", "Jaakko Sauvola", "Jukka Riekki", "Sasu Tarkoma"],
  "topics": ["memory", "knowledge-graphs", "provenance", "evaluation"],
  "reliability": "primary",
  "mutable": false,
  "status": "active",
  "identifiers": {"arxiv": "2608.16357", "doi": "10.48550/arXiv.2608.16357"},
  "related": []
}
---

# MELD: A Protocol for Merging Knowledge Across Distributed Agentic Memories

## Annotation

Recent preprint proposing a conflict-preserving protocol for reconciling knowledge across sovereign agent memories rather than treating shared memory as simple vector deduplication or last-write-wins state.

## Relevant evidence

MELD classifies incoming claims into insert, merge, relate, conflict, or reject outcomes using claim identity, embedding similarity, natural-language inference, freshness, and context gates. Contradictions are preserved for later adjudication instead of silently overwritten. The paper reports a merge-classifier AUC of 0.968 with a 0.013 false-merge rate, 30/30 CRDT partition-heal reconvergence trials versus 11/30 for last-write-wins, and about three times fewer routing messages at matched recall. These are preprint results and require independent replication.
