# RZ Builder Design System

The RZ Builder Design System is the reusable visual foundation for the RZ Builder product: design tokens, shared UI components, styles, and implementation guidance.

## Project status

This repository is being stabilized before integration with the separate [Universal ZIP-to-APK Builder](https://github.com/Khun19/Universal-ZIP-to-APK-Builder) project. Do not treat a successful Design System CI run as evidence that Builder integration or Android APK acceptance has passed.

- Source of truth for design tokens: `artifacts/rz-builder-design-system/tokens.json`
- Token generation and contrast checks: `artifacts/rz-builder-design-system/scripts/`
- Shared component source: `artifacts/rz-builder-design-system/src/components/ui/`
- Design System guidance: `artifacts/rz-builder-design-system/docs/`
- Workspace package manager: pnpm, with `pnpm-lock.yaml` committed
- CI: GitHub Actions, using the same frozen-lockfile install and repository scripts developers should use

## Repository map

| Path | Purpose |
| --- | --- |
| `artifacts/rz-builder-design-system/` | Primary Design System app, tokens, shared components, styles, and docs |
| `artifacts/mockup-sandbox/` | Separate component/mockup preview workspace |
| `artifacts/api-server/` | Workspace API service; retain only while it remains required by the project |
| `lib/` | Shared workspace libraries and API/schema packages |
| `scripts/` | Workspace tooling |
| `.github/workflows/` | CI checks and build validation |
| `.agents/memory/` | Durable project identity and handoff notes for continuing work |

## Prerequisites

- Node.js 22
- pnpm 10
- Git

Use pnpm rather than npm or Yarn. Install from the committed lockfile:

```sh
pnpm install --frozen-lockfile
```

## Validate locally

The repository CI runs these checks from the repository root:

```sh
pnpm --filter @workspace/rz-builder-design-system run test:tokens
pnpm run typecheck
pnpm run build
```

The Design System Vite configuration requires `PORT` and `BASE_PATH`. For a local development session, set both explicitly, for example:

```sh
PORT=20455 BASE_PATH=/rz-builder-design-system/ pnpm --filter @workspace/rz-builder-design-system run dev
```

## Design principles

1. **Tokens first.** Update `tokens.json`; generated CSS and TypeScript token outputs are derived artifacts.
2. **Reusable components.** Shared components should consume tokens and avoid product-specific build logic.
3. **Accessibility is a release gate.** Check contrast and keyboard/focus behavior; do not rely on visual appearance alone.
4. **Evidence over assumptions.** Record exact CI results and commit SHA. A local edit or queued workflow is not a passing check.
5. **Separate integration gates.** Design System CI, Builder integration tests, APK build/provenance validation, emulator testing, and physical-device acceptance are distinct outcomes.

## Builder integration boundary

The Builder project may consume a versioned Design System package or a deliberately documented export contract after this repository is stable. Do not couple the repositories through copied generated files, implicit branch references, or shared secrets. Integration must specify the version/commit, exported tokens/components, compatibility expectations, and a test that proves the consuming Builder revision uses the intended Design System revision.

## Development workflow

Follow [the project workflow and handoff policy](docs/DEVELOPMENT-WORKFLOW.md). Work on a focused branch, open a pull request, inspect the changed-file diff and required checks, and merge only after the evidence gate passes. Do not push directly to `main` for ordinary implementation work.

## License

The root package currently declares MIT. Confirm the repository's intended license and add the corresponding root `LICENSE` file before publishing reusable packages. Do not assume the package declaration alone is sufficient licensing documentation.
