// User-facing release notes for the changelog page.
//
// The synced CHANGELOG.md (context/source-context/CHANGELOG.md) is written
// for maintainers: flags, file paths, exit codes. The page leads with these
// hand-written notes instead — what someone using Maester can now do — and
// tucks the technical list behind a disclosure. Per
// gspec/features/changelog-page.md §4.
//
// Keyed by version exactly as it appears in CHANGELOG.md. A release without
// an entry here still renders, falling back to its technical changes, and
// the build logs a warning so the note can be written.
//
// Writing guide: describe outcomes for the user, not mechanisms. Prefer
// "You can …" over flag names, keep each highlight to one sentence, and aim
// for 1–5 highlights per release. Inline Markdown is supported.

export interface ReleaseNote {
  /** One sentence: the headline of the release. */
  summary: string;
  /** The outcomes worth knowing about, most important first. */
  highlights: string[];
}

export const releaseNotes: Record<string, ReleaseNote> = {
  '0.6.1': {
    summary: 'Small fixes for scripting and for publishing safely.',
    highlights: [
      'Script against your citadel: `maester list --json` now returns your sources as JSON.',
      'When Maester blocks a sensitive file from being published, it now tells you which file.',
    ],
  },
  '0.6.0': {
    summary:
      'Your coding agent can now set up publishing for you, and a citadel can pull from local folders, whole repositories, and other MCP servers.',
    highlights: [
      'Let your coding agent work out what a repository should publish. It shows you the proposal and only writes what you approve.',
      'Add a folder on your own machine as a source, with no git repository needed.',
      "Pull in any repository's docs, even if it was never set up to publish with Maester.",
      'Add other MCP servers to your citadel once, and every agent in the project can use their tools.',
      'Give documents a category and tags, so agents know what kind of document they are reading.',
      'Add, remove, and list sources and published documents with simple commands instead of editing config by hand.',
    ],
  },
  '0.5.0': {
    summary: 'Connectors now pick up their access tokens automatically.',
    highlights: [
      'Connectors work in Claude Code and Codex using the tokens already set in your shell. There is no extra setup.',
      'In Cursor, the Grand Maester tells you exactly which variables to set.',
      'Maester never writes a secret to disk, only the names of the variables it needs.',
    ],
  },
  '0.4.2': {
    summary: 'The Codex setup Maester writes is now safe to commit and share with your team.',
    highlights: [
      'Commit your Codex config with the repository. It no longer contains paths specific to your machine.',
    ],
  },
  '0.4.1': {
    summary: 'Install commands and the Claude Code integration now work as documented.',
    highlights: [
      'Commands copied from the docs and the CLI now run (`npx baller-maester`).',
      'The Grand Maester freshness check in Claude Code now runs correctly.',
    ],
  },
  '0.4.0': {
    summary:
      'Traveling Maesters: your coding agents can now reach live outside services, starting with GitLab issues.',
    highlights: [
      'Connect an outside service once, and your agents can query it as a tool in Claude Code, Cursor, and Codex.',
      'The first connector lets agents search and read GitLab issues, on gitlab.com or your own GitLab server.',
      'Maester keeps each agent tool configured for you, so adding or removing a connector is one command.',
      'Set up connectors during `maester init` or add them later.',
    ],
  },
  '0.3.0': {
    summary: 'Mark each document as draft or canon when you publish it.',
    highlights: [
      'When you publish, choose whether each document is a draft or canon, so agents know which docs to trust.',
    ],
  },
  '0.2.1': {
    summary: 'A fix to how Maester releases are published.',
    highlights: ['Maester releases on npm now carry verified provenance back to the source repository.'],
  },
  '0.2.0': {
    summary: 'Mark each pulled-in document as draft or canon when you set up a citadel.',
    highlights: [
      'While setting up a citadel, choose whether the documents you pull in are drafts or canon, so agents know which docs to trust.',
    ],
  },
  '0.1.0': {
    summary:
      'First release: gather documentation from your other repositories into one place your coding agents can read.',
    highlights: [
      'Bring docs from multiple repositories into a single citadel with `maester init` and `maester sync`.',
      'Let each repository decide what it shares by publishing a simple manifest.',
      'See at a glance whether your local copies are out of date.',
      'Mark every document as draft or canon, so agents know which docs are authoritative.',
      'Teach Claude Code, Codex, and Cursor to use the citadel and check freshness with the Grand Maester skill.',
    ],
  },
};
