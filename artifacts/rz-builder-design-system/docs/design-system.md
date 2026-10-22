# RZ Builder design system

## Purpose and status

This package defines the shared visual foundation for RZ Builder, a
framework-aware Universal ZIP-to-APK Builder. Its visual direction is Silver
Chrome Premium Tech: obsidian surfaces, restrained silver actions, neutral
grays, clear hierarchy, and minimal decoration.

The logo preview uses the user's source image unchanged. Keep the product name
exactly `RZ Builder` and retain the supplied `UNIVERSAL APK BUILDER` tagline
when using that source artwork.

This workspace does not currently contain the RZ Builder web client, build
workflow endpoints, or an Android application. The package implements reusable
design-system foundations, not product workflow behavior. It must not display
invented projects, build outcomes, hashes, artifacts, security results, or
device acceptance evidence.

## Implemented

- `tokens.json` is the single editable source for neutral primitives, semantic
  light/dark colors, status colors, typography, spacing, radii, control/icon
  sizes, border widths, motion, and responsive test targets.
- `scripts/build-tokens.mjs` generates the web theme and typed cross-platform
  token object. Do not edit `src/index.css` or `src/generated/tokens.tsx`
  directly.
- The light and dark themes include semantic surfaces and foregrounds.
- The token validator checks completeness, alias resolution, typography
  fallbacks, and WCAG AA contrast for the defined text/surface and status/
  background pairs.
- The existing component scaffold is themed. RZ Builder additions include
  `Button` loading/disabled behavior and size/variant tokens, `IconButton` with
  a required accessible name, and a typed `BuildStatusBadge` supporting
  `QUEUED`, `RUNNING`, `PASSED`, `FAILED`, `CANCELED`, `NOT_RUN`, and
  `NOT_VERIFIED`.
- The preview includes a Burmese Unicode/mixed-language typography sample,
  status vocabulary examples explicitly marked as non-live, and a theme toggle.
- Reduced-motion CSS, visible keyboard focus styling, and a zoom-compatible
  viewport declaration are present.

## Token reference

### Neutral primitives

| Token | Value | Token | Value |
| --- | --- | --- | --- |
| `neutral.0` | `#FFFFFF` | `neutral.50` | `#F5F6F7` |
| `neutral.100` | `#E4E7EB` | `neutral.200` | `#D7DCE2` |
| `neutral.300` | `#C7CCD2` | `neutral.400` | `#A6ADB7` |
| `neutral.500` | `#858C96` | `neutral.600` | `#5E646E` |
| `neutral.700` | `#343941` | `neutral.800` | `#24272D` |
| `neutral.850` | `#17191D` | `neutral.900` | `#101114` |
| `neutral.950` | `#090A0C` | | |

### Semantic themes

| Role | Light | Dark |
| --- | --- | --- |
| Background / primary | `#FFFFFF` | `#090A0C` |
| Background / secondary | `#F5F6F7` | `#101114` |
| Surface / default | `#F5F6F7` | `#17191D` |
| Surface / elevated | `#FFFFFF` | `#24272D` |
| Text / primary | `#101114` | `#F5F6F7` |
| Text / secondary | `#5E646E` | `#B8BEC7` |
| Text / muted | `#5E646E` | `#A6ADB7` |
| Text / inverse | `#090A0C` | `#090A0C` |
| Border / default | `#858C96` | `#42464E` |
| Border / subtle | `#A6ADB7` | `#30343B` |
| Action / primary | `#343941` | `#C7CCD2` |
| Action / hover | `#24272D` | `#E4E7EB` |
| Action / text | `#F5F6F7` | `#090A0C` |
| Focus ring | `#343941` | `#C7CCD2` |

Status semantic colors are defined for both themes under `status.light` and
`status.dark`; use their visible labels and do not communicate status by color
alone. The token check requires a 4.5:1 contrast ratio for text/status pairs
against their declared surface.

| Status | Light | Dark |
| --- | --- | --- |
| Success | `#047857` | `#34D399` |
| Warning | `#854D0E` | `#FBBF24` |
| Error | `#B42318` | `#F87171` |
| Info | `#1D4ED8` | `#60A5FA` |
| Neutral | `#5E646E` | `#A6ADB7` |

### Other foundations

- Spacing: 4px base with `0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64px` values.
- Typography: Inter, then Noto Sans Myanmar and system fallbacks. Display is
  40/48px; heading sizes are 32/40, 24/32, and 20/28px; body sizes are 18/28,
  16/24, and 14/20px; label is 14/20px and caption is 12/16px.
- Font weights: 400, 500, 600, and 700.
- Radius: 4, 8, 12, 16, 24, and 999px.
- Icons: 16, 20, and 24px. Controls: 36, 44, and 48px.
- Borders: 1px standard, 2px focus. Motion: 120, 200, and 300ms.
- Responsive test targets: 320, 360, 768, 1024, and 1440px. These are test
  widths, not device support limits.

## Component usage

### Buttons

Use the shared `Button` for primary, secondary, tertiary, destructive, and
ghost actions. Small, medium, and large sizes map to 36, 44, and 48px minimum
heights. Set `loading` for a pending action; it disables the button and sets
`aria-busy`. Keep labels clear and avoid duplicate submissions.

Use `IconButton` only for actions whose purpose is clear from a concise
accessible label. The label is required and is also shown as a tooltip/title.

### Build status

Use the `BuildStatus` union and `BuildStatusBadge` rather than inventing status
strings. `PASSED` on one stage does not imply APK validation, provenance, or
device acceptance passed. Missing evidence must remain `NOT_RUN` or
`NOT_VERIFIED`.

### Existing scaffold components

The package includes the initial reusable component scaffold under
`src/components/ui/`. It is not a claim that every component is fully audited
for the RZ Builder workflows. Check the component source and story before
reusing it; extend an existing primitive rather than duplicating it.

## Accessibility and responsive rules

- Use semantic HTML, explicit labels, and visible focus. Never use placeholder
  text as the only label.
- Keep status text visible; do not rely on a color chip alone.
- Pair dynamic status changes with an appropriate live-region announcement in
  the consuming application.
- Support browser zoom and text scaling. Avoid fixed content heights.
- Let long filenames and localized strings wrap or truncate with an accessible
  full value. Build logs should use a horizontally scrollable code region rather
  than forcing page-wide overflow.
- At narrow widths, reflow columns and navigation; preserve touch targets and
  do not clip form actions.
- Respect `prefers-reduced-motion`.
- The contrast script is an automated check only. Keyboard, screen-reader,
  text-scaling, and real-device checks remain manual or consumer-app work and
  must not be marked passed without evidence.

## Product workflows not implemented here

ZIP upload, server validation, safe extraction, framework detection, strategy
selection, builds, APK validation, SHA-256/provenance, artifact downloads,
security/failure details, and device acceptance all require real product
services and data. Do not add mock success states in the design-system preview.
The current workspace has no Android source; no Android components are
implemented or verified. Shared token output is available for future platform
consumers.

## Naming and change management

- Use primitive tokens for literal palette values and semantic tokens for
  component-facing meaning. Prefer semantic colors in components.
- Use stable camelCase keys in `tokens.json`; CSS output is kebab-case.
- Add a token once, regenerate outputs, run contrast validation and typecheck,
  and update preview/documentation in the same change.
- Treat removed or renamed exported tokens and components as breaking API
  changes. No release/versioning policy beyond the private package's current
  workspace version is established.

## Validation commands

Run from the workspace root:

```sh
pnpm --filter @workspace/rz-builder-design-system run test:tokens
pnpm --filter @workspace/rz-builder-design-system run typecheck
pnpm --filter @workspace/rz-builder-design-system run build
```

The token check records automated contrast and completeness only. The package
does not currently include dedicated component, accessibility, screenshot
regression, or product workflow tests.

## Verification record

Recorded for this design-system revision:

- **PASS** — `pnpm --filter @workspace/rz-builder-design-system run test:tokens`
- **PASS** — `pnpm --filter @workspace/rz-builder-design-system run typecheck`
- **PASS** — `PORT=5173 BASE_PATH=/rz-builder-design-system pnpm --filter @workspace/rz-builder-design-system run build`
- **VISUAL SPOT CHECK** — overview reviewed at 320×568 and 1440×1000; Burmese
  typography page reviewed at 320×568 and 390×844. Burmese Unicode rendered and
  wrapped without visible horizontal clipping; screenshots reported no browser
  runtime errors.
- **NOT RUN** — automated component, responsive viewport, keyboard, screen-reader,
  and visual-regression suites; no such test harness existed in the artifact.
- **NOT VERIFIED** — real RZ Builder workflows and Android rendering; neither
  product source exists in this workspace.

The untouched-repository baseline was not recorded before the initial design
system artifact was scaffolded. There were no product-specific web/Android
screens or lint/test scripts in the inspected workspace.
