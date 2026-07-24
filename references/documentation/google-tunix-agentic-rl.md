---
{
  "schema_version": 1,
  "id": "reference:google:tunix-agentic-rl",
  "title": "Scaling Agentic RL: High-Throughput Agentic Training with Tunix",
  "kind": "documentation",
  "publisher": "Google Developers Blog",
  "canonical_url": "https://developers.googleblog.com/scaling-agentic-rl-high-throughput-agentic-training-with-tunix/",
  "published_at": "2026-07-21",
  "accessed_at": "2026-07-24",
  "authors": ["Haoyu Gao", "Lance Wang", "Shadi Noghabi", "Tianshu Bao", "Weiren Yu"],
  "topics": ["agent-tooling", "developer-tools", "evaluation"],
  "reliability": "primary",
  "mutable": true,
  "status": "active",
  "identifiers": {},
  "related": []
}
---

# Scaling Agentic RL with Tunix

## Annotation

Official Google engineering post on infrastructure for high-throughput reinforcement learning of agents that use tools and interact with environments.

## Relevant evidence

The post identifies accelerator under-utilization during environment and tool waits as a central bottleneck in multi-turn agent training and describes Tunix infrastructure intended to improve rollout throughput for these workloads.
