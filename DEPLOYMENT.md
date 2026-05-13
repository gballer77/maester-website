# Deployment

This site is deployed to **GitHub Pages** as a project site at <https://baller-software.github.io/maester-website>.

There is no manual deploy step. Every push to `main` flows through `.github/workflows/deploy.yml`, which builds the site, generates the search index, verifies every asset and in-site link, and publishes the result via `actions/deploy-pages`.

## Hosting Environment

| Item                  | Value                                                      |
|-----------------------|------------------------------------------------------------|
| Host                  | GitHub Pages (project site)                                |
| URL                   | <https://baller-software.github.io/maester-website>        |
| Base path             | `/maester-website`                                         |
| DNS                   | Default GitHub Pages domain — no custom domain configured  |
| Required access       | Maintainer rights on `baller-software/maester-website`     |
| Secrets               | None — CI uses the built-in `GITHUB_TOKEN`                 |

A custom domain has not been configured (per `gspec/profile.md` §13, the domain decision is deferred). When one is chosen, set `productionUrl` and `basePath` in `src/config/site.ts`, add a `public/CNAME` file, and re-run CI.

## Pre-Deployment Checklist

Run these locally before pushing to `main`:

- [ ] `npm test` — unit tests pass
- [ ] `npm run build` — production build succeeds without errors or warnings
- [ ] `npm run search:index` — Pagefind index generates successfully
- [ ] `npm run check:links` — no internal link or asset failures (external warnings are acceptable)
- [ ] If this is a release, the version in `package.json` is bumped and `CHANGELOG.md` has a new release entry

The CI pipeline runs all of these on every push, so any oversight is caught before deploy — but running them locally avoids a wasted CI cycle.

## Deployment Steps

```sh
# 1. Confirm you are on main and up to date.
git checkout main
git pull --ff-only

# 2. Push the change.
git push origin main
```

That's it. GitHub Actions takes over from there.

The pipeline:

1. Installs Node 20 LTS and dependencies (`npm ci`).
2. Runs the Vitest unit tests.
3. Runs `astro build` → produces `dist/`.
4. Runs `npx pagefind --site dist` → writes the search index into `dist/pagefind/`.
5. Runs `lychee --config lychee.toml dist` → fails the build on any internal asset or link error.
6. Uploads `dist/` as a Pages artifact and calls `actions/deploy-pages` to publish.

The full status appears as a status check on the commit, and on every pull request that targets `main`.

## Post-Deployment Verification

Once the workflow shows green:

1. Open <https://baller-software.github.io/maester-website> in a fresh browser.
2. Verify the page renders, the theme toggle works, and the primary nav links navigate without 404.
3. Open `/docs` and confirm the sidebar, table of contents, and search palette (⌘K) work.
4. Open `/changelog` and confirm the latest entry is present.
5. Inspect the page source — every `<link rel="canonical">` should point at the production URL.

If anything is wrong, follow the rollback procedure below; do not patch directly in production.

## Rollback Procedure

There are two ways to roll back:

### Option A — revert the offending commit (preferred)

```sh
git checkout main
git pull --ff-only
git revert <bad-commit-sha>
git push origin main
```

CI redeploys automatically.

### Option B — redeploy a previous successful workflow run

1. Open the repository's **Actions** tab.
2. Find the last green run on `main` prior to the regression.
3. Click **Re-run all jobs**.

GitHub Pages will overwrite the live site with the previous build.

## Domain & DNS

Not configured. The site is served from the GitHub Pages default URL. See `gspec/profile.md` §13 for the rationale and the plan to migrate when a domain is chosen.
