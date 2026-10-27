# Development workflow and continuity contract

## Goal

Build a stable, reusable RZ Builder Design System first, then integrate it with the separate Builder repository through a versioned, testable contract. Keep this workflow in the repository so a future ChatGPT session or contributor can resume from evidence instead of relying on chat history.

## Operating rules

- GitHub repository state is the source of truth for code, plans, decisions, and validation evidence.
- Never claim a task is complete because a file was edited or a workflow was queued.
- Do not push ordinary implementation changes directly to `main`; use a focused branch and pull request.
- Do not merge while required checks are pending or failing. No automatic merge without verified evidence.
- Keep one logical objective per pull request where practical.
- Preserve the existing pnpm lockfile and supply-chain policy. Use `pnpm install --frozen-lockfile` in CI.
- Keep secrets out of source, issues, commits, screenshots, and logs.
- Do not reintroduce retired external-platform files, dependencies, environment variables, or plugins.
- Do not couple Design System CI to Android build/device acceptance. They are separate gates.
- At the end of each work session, update the status/handoff record with the exact main SHA, branch/PR, changed paths, checks and blockers.

## Phase gates

### Phase 0 — Baseline and continuity

- Record the default branch SHA, repository tree, open PRs/issues, package manager, package graph, and current CI results.
- Confirm the current state from GitHub; do not assume old chat notes are current.
- Keep project identity and explicit user decisions in `.agents/memory/`; keep executable workflow and status evidence in `docs/`.

**Exit gate:** a reproducible baseline report with exact commit and known blockers.

### Phase 1 — Remove external development-platform coupling

- Remove platform-only metadata, configuration, SDKs, dependencies, and runtime plugins.
- Search source, manifests, lockfile, docs, workflows, and generated files for remaining references.
- Rebuild the lockfile from the updated manifests; verify frozen-lockfile installation.

**Exit gate:** no unintended platform references remain, and dependency installation is reproducible. Account-level OAuth/app authorization is outside repository commits and must be checked separately in the provider/account settings.

### Phase 2 — CI and repository health

- Run frozen-lockfile installation.
- Run token contrast checks.
- Run workspace typecheck and build.
- Add focused tests for regressions when changing shared behavior.
- Inspect the actual workflow run and job logs; do not infer PASS from a commit or an empty status list.

**Exit gate:** required checks pass on the exact PR head SHA.

### Phase 3 — Design-token contract

- Keep `artifacts/rz-builder-design-system/tokens.json` as the token source of truth.
- Document token naming, semantic roles, light/dark behavior, contrast expectations, and generated-file rules.
- Test generation for deterministic output and validate contrast using the repository script.

**Exit gate:** tokens can be regenerated and checked from a clean checkout, with documented semantics and no unexplained generated-file drift.

### Phase 4 — Component system

- Inventory current components before adding new ones.
- Prioritize components used by the RZ Builder product; avoid growing a component catalog without consumers.
- Validate responsive layout, keyboard access, focus states, accessible names, reduced-motion behavior where relevant, and token usage.
- Keep examples/previews connected to real component implementations.

**Exit gate:** each supported component has a clear API, token usage, accessibility expectations, and a test or repeatable validation method.

### Phase 5 — Documentation and release discipline

- Keep the root README aligned with actual repository behavior.
- Document setup, token changes, component usage, contribution rules, versioning, and known limitations.
- Add a changelog/release notes when versioned package releases begin.
- Confirm the intended repository license and include its full license file.

**Exit gate:** a new contributor can install, validate, and make a token/component change using only repository docs.

### Phase 6 — Builder integration readiness

- Define the package/export contract before changing the Builder repository.
- Pin the consumed package version or exact commit; do not use a moving branch as a production dependency.
- Add a compatibility test that proves the Builder consumes the expected token/component version.
- Keep Design System CI PASS separate from Builder CI PASS, APK validation/provenance PASS, emulator test PASS, and physical-device acceptance PASS.

**Exit gate:** a small, reversible integration PR in the Builder repository passes its own checks and records the exact Design System revision.

## Pull-request checklist

- [ ] Branch starts from the intended current base SHA.
- [ ] Change is scoped and the full diff has been reviewed.
- [ ] No credentials, private data, or unintended generated artifacts.
- [ ] Manifest and lockfile are consistent.
- [ ] Relevant token, typecheck, build, and test checks pass on the exact PR head.
- [ ] Documentation and status/handoff notes are updated.
- [ ] No merge until required checks and review requirements are satisfied.

## Session handoff format

Update `docs/PROJECT-STATUS.md` with:

- Date/time (UTC)
- Main SHA and PR head SHA
- Current phase and completed exit gates
- Branch/PR links and changed paths
- Exact check run IDs and conclusions
- Open blockers and the next single action
- Explicitly unverified items

The status file must distinguish **PASS**, **FAIL**, **PENDING**, and **NOT RUN**. Never convert missing evidence into a pass.
