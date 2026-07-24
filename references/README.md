# References

References are first-class provenance nodes shared across briefs, notes, and experiments.

## Namespaces

- `papers/`: original research, identified by DOI or arXiv ID when available
- `documentation/`: official product and API documentation
- `repositories/`: source-code repositories and releases
- `standards/`: standards bodies, specifications, and government guidance
- `web/`: other canonical web sources

Use one Markdown record per canonical source. Deduplicate by canonical URL or a durable identifier such as DOI, arXiv ID, or repository. Keep the reference ID stable if its title or URL changes.

For mutable pages such as changelogs, retain the stable source record and update `accessed_at`. Future append-only observation records can preserve page-level history when needed.

Store annotations and short evidence only, not complete copyrighted articles.
