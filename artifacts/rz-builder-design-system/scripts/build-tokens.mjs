/**
 * Generates the consumable web theme (src/index.css) and the portable token
 * object (src/generated/tokens.tsx) from tokens.json.
 *
 * tokens.json (DTCG) is the single source of truth. This runs on dev start and
 * on every tokens.json change (see vite.config.ts) and before build/typecheck
 * (see package.json). Do not edit the generated files by hand.
 *
 * - src/index.css        the design system's theme. The preview app imports it,
 *                        and consuming apps import this same file (web).
 * - src/generated/tokens.tsx  hex token object for mobile (Expo) and any other
 *                             platform, so web + mobile share one source.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const tokensPath = join(root, "tokens.json");
const templatePath = join(here, "theme-template.css");
const cssOut = join(root, "src", "index.css");
const tsOutDir = join(root, "src", "generated");
const indexHtmlPath = join(root, "index.html");
const faviconOut = join(root, "public", "favicon.svg");

/** Resolve a DTCG node's $value, following {alias} references. */
function resolveValue(node, tokens) {
  const raw = node?.$value;
  if (typeof raw === "string" && raw.startsWith("{") && raw.endsWith("}")) {
    const path = raw.slice(1, -1).split(".");
    let cur = tokens;
    for (const key of path) cur = cur?.[key];
    return resolveValue(cur, tokens);
  }
  return raw;
}

function hexToHslChannels(hex) {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let s = 0;
  let hue = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        hue = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        hue = (b - r) / d + 2;
        break;
      default:
        hue = (r - g) / d + 4;
    }
    hue /= 6;
  }
  const H = Math.round(hue * 360);
  const S = Math.round(s * 1000) / 10;
  const L = Math.round(l * 1000) / 10;
  return `${H} ${S}% ${L}%`;
}

function toFontStack(value) {
  const stack = Array.isArray(value) ? value : [value];
  return stack
    .map((family) => (/[\s,]/.test(family) ? `"${family}"` : family))
    .join(", ");
}

function kebabCase(value) {
  return value.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

function cssTokenVariables(node, prefix, tokens, output = {}) {
  if (node && typeof node === "object" && "$value" in node) {
    output[prefix] = resolveValue(node, tokens);
    return output;
  }
  if (!node || typeof node !== "object" || Array.isArray(node)) return output;

  for (const [key, child] of Object.entries(node)) {
    if (key.startsWith("$")) continue;
    cssTokenVariables(child, `${prefix}-${kebabCase(key)}`, tokens, output);
  }
  return output;
}

function customPropertyBlock(values) {
  return Object.entries(values)
    .map(([name, value]) => `  ${name}: ${value};`)
    .join("\n");
}

function resolveTree(node, tokens) {
  if (Array.isArray(node)) return node.map((value) => resolveTree(value, tokens));
  if (!node || typeof node !== "object") return node;
  if ("$value" in node) return resolveValue(node, tokens);
  return Object.fromEntries(
    Object.entries(node)
      .filter(([key]) => !key.startsWith("$"))
      .map(([key, value]) => [key, resolveTree(value, tokens)]),
  );
}

function normalizeHex(hex) {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  return `#${h}`;
}

/** Pick black or white text for best contrast on the given background hex. */
function contrastColor(hex) {
  const h = normalizeHex(hex).slice(1);
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const lin = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const luminance = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  return luminance > 0.5 ? "#000000" : "#ffffff";
}

/** First alphanumeric character of the design system's title, uppercased. */
function faviconLetter() {
  let title = "";
  try {
    const html = readFileSync(indexHtmlPath, "utf8");
    title = html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? "";
  } catch {
    title = "";
  }
  const match = title.match(/[A-Za-z0-9]/);
  return (match?.[0] ?? "D").toUpperCase();
}

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function buildFavicon(tokens) {
  const primary = normalizeHex(resolveValue(tokens.color.light.primary, tokens));
  const letter = escapeXml(faviconLetter());
  const fg = contrastColor(primary);
  return `<svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="180" height="180" rx="36" fill="${primary}"/>
  <text x="90" y="92" fill="${fg}" font-family="ui-sans-serif, system-ui, sans-serif" font-size="104" font-weight="700" text-anchor="middle" dominant-baseline="central">${letter}</text>
</svg>
`;
}

function colorEntries(scope, tokens) {
  const out = {};
  for (const [name, node] of Object.entries(tokens.color[scope])) {
    if (name.startsWith("$")) continue;
    out[name] = resolveValue(node, tokens);
  }
  return out;
}

function buildCss(tokens) {
  let css = readFileSync(templatePath, "utf8");
  const replacements = {};

  for (const scope of ["light", "dark"]) {
    for (const [name, hex] of Object.entries(colorEntries(scope, tokens))) {
      replacements[`__DS_${scope.toUpperCase()}_${name.toUpperCase()}__`] =
        hexToHslChannels(hex);
    }
  }

  replacements.__DS_FONT_SANS__ = toFontStack(
    resolveValue(tokens.typography.fontFamily.sans, tokens),
  );
  replacements.__DS_FONT_SERIF__ = toFontStack(
    resolveValue(tokens.typography.fontFamily.serif, tokens),
  );
  replacements.__DS_FONT_MONO__ = toFontStack(
    resolveValue(tokens.typography.fontFamily.mono, tokens),
  );
  replacements.__DS_RADIUS__ = resolveValue(tokens.radius.base, tokens);
  replacements.__DS_SPACING__ = resolveValue(tokens.spacing.base, tokens);

  const primitiveVariables = cssTokenVariables(
    tokens.primitive.color.neutral,
    "--neutral",
    tokens,
  );
  const lightStatusVariables = cssTokenVariables(
    tokens.status.light,
    "--status",
    tokens,
  );
  const darkStatusVariables = cssTokenVariables(
    tokens.status.dark,
    "--status",
    tokens,
  );
  const semanticVariables = (mode) =>
    Object.fromEntries(
      Object.entries(
        cssTokenVariables(tokens.semantic[mode], "--semantic", tokens),
      ).map(([name, value]) => [name.replace("--semantic-", "--"), value]),
    );
  const lightSemanticVariables = semanticVariables("light");
  const darkSemanticVariables = semanticVariables("dark");
  const themeAliases = [
    ...Object.keys(primitiveVariables).map((name) => {
      const suffix = name.replace("--", "");
      return `  --color-${suffix}: var(${name});`;
    }),
    ...Object.keys(lightStatusVariables).map((name) => {
      const suffix = name.replace("--status-", "");
      return `  --color-status-${suffix}: var(${name});`;
    }),
  ].join("\n");
  replacements.__DS_THEME_TOKEN_ALIASES__ = themeAliases;
  replacements.__DS_ROOT_TOKEN_VALUES__ = customPropertyBlock({
    ...primitiveVariables,
    ...lightStatusVariables,
    ...lightSemanticVariables,
    ...cssTokenVariables(tokens.spacing.scale, "--space", tokens),
    ...cssTokenVariables(tokens.sizing.icon, "--icon", tokens),
    ...cssTokenVariables(tokens.sizing.control, "--control", tokens),
    "--border-width-thin": resolveValue(tokens.sizing.border.thin, tokens),
    "--focus-width": resolveValue(tokens.sizing.border.focus, tokens),
    ...cssTokenVariables(tokens.motion, "--motion", tokens),
  });
  replacements.__DS_DARK_STATUS_VALUES__ =
    customPropertyBlock({
      ...darkStatusVariables,
      ...darkSemanticVariables,
    });

  const scaleAliases = {};
  for (const [name, node] of Object.entries(tokens.typography.scale)) {
    scaleAliases[`--text-${kebabCase(name)}`] = resolveValue(
      node.fontSize,
      tokens,
    );
    scaleAliases[`--text-${kebabCase(name)}--line-height`] = resolveValue(
      node.lineHeight,
      tokens,
    );
  }
  const weights = cssTokenVariables(
    tokens.typography.fontWeight,
    "--font-weight",
    tokens,
  );
  const radii = cssTokenVariables(tokens.radius.scale, "--radius", tokens);
  replacements.__DS_THEME_SCALE_TOKENS__ = customPropertyBlock({
    ...scaleAliases,
    ...weights,
    ...radii,
  });

  const utilitySizeMap = {
    xs: "caption",
    sm: "bodySM",
    base: "bodyMD",
    lg: "bodyLG",
    xl: "headingMD",
    "2xl": "headingLG",
    "3xl": "headingXL",
    "4xl": "display",
  };
  for (const [utility, scale] of Object.entries(utilitySizeMap)) {
    replacements[`__DS_TEXT_${utility.replace(/[^A-Z0-9]/gi, "_").toUpperCase()}__`] =
      resolveValue(tokens.typography.scale[scale].fontSize, tokens);
    replacements[
      `__DS_TEXT_${utility.replace(/[^A-Z0-9]/gi, "_").toUpperCase()}_LINE__`
    ] = resolveValue(tokens.typography.scale[scale].lineHeight, tokens);
  }

  for (const [token, value] of Object.entries(replacements)) {
    css = css.split(token).join(value);
  }

  const leftover = css.match(/__DS_[A-Z0-9_]+__/g);
  if (leftover) {
    throw new Error(
      `tokens.json is missing values for: ${[...new Set(leftover)].join(", ")}`,
    );
  }
  return css;
}

function buildTs(tokens) {
  const portable = {
    color: {
      light: colorEntries("light", tokens),
      dark: colorEntries("dark", tokens),
    },
    primitive: resolveTree(tokens.primitive, tokens),
    semantic: {
      light: resolveTree(tokens.semantic.light, tokens),
      dark: resolveTree(tokens.semantic.dark, tokens),
    },
    status: resolveTree(tokens.status, tokens),
    sizing: resolveTree(tokens.sizing, tokens),
    motion: resolveTree(tokens.motion, tokens),
    breakpoint: resolveTree(tokens.breakpoint, tokens),
    fontFamily: {
      sans: resolveValue(tokens.typography.fontFamily.sans, tokens),
      serif: resolveValue(tokens.typography.fontFamily.serif, tokens),
      mono: resolveValue(tokens.typography.fontFamily.mono, tokens),
    },
    typography: {
      scale: resolveTree(tokens.typography.scale, tokens),
      fontWeight: resolveTree(tokens.typography.fontWeight, tokens),
    },
    radius: resolveValue(tokens.radius.base, tokens),
    radiusScale: resolveTree(tokens.radius.scale, tokens),
    spacing: resolveValue(tokens.spacing.base, tokens),
    spacingScale: resolveTree(tokens.spacing.scale, tokens),
  };
  return `/* GENERATED FROM tokens.json -- DO NOT EDIT. Run scripts/build-tokens.mjs. */
// Portable design tokens (colors as hex). Web consumes the theme via
// src/index.css; mobile (Expo) and any other platform import this object so the
// whole product shares one source of truth.
export const tokens = ${JSON.stringify(portable, null, 2)} as const;

export type Tokens = typeof tokens;
export default tokens;
`;
}

export function buildTokens() {
  const tokens = JSON.parse(readFileSync(tokensPath, "utf8"));
  writeFileSync(cssOut, buildCss(tokens));
  mkdirSync(tsOutDir, { recursive: true });
  writeFileSync(join(tsOutDir, "tokens.tsx"), buildTs(tokens));
  mkdirSync(dirname(faviconOut), { recursive: true });
  writeFileSync(faviconOut, buildFavicon(tokens));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  buildTokens();
  process.stdout.write(
    "Generated src/index.css, src/generated/tokens.tsx, and public/favicon.svg\n",
  );
}
