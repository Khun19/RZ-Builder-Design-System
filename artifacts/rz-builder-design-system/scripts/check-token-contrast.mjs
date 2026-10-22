import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const tokens = JSON.parse(readFileSync(join(root, "tokens.json"), "utf8"));

const requiredRoles = [
  "background",
  "foreground",
  "border",
  "card",
  "cardForeground",
  "popover",
  "popoverForeground",
  "primary",
  "primaryForeground",
  "secondary",
  "secondaryForeground",
  "muted",
  "mutedForeground",
  "accent",
  "accentForeground",
  "destructive",
  "destructiveForeground",
  "input",
  "ring",
  "chart1",
  "chart2",
  "chart3",
  "chart4",
  "chart5",
  "sidebar",
  "sidebarForeground",
  "sidebarBorder",
  "sidebarPrimary",
  "sidebarPrimaryForeground",
  "sidebarAccent",
  "sidebarAccentForeground",
  "sidebarRing",
];
const contrastPairs = [
  ["background", "foreground"],
  ["card", "cardForeground"],
  ["popover", "popoverForeground"],
  ["primary", "primaryForeground"],
  ["secondary", "secondaryForeground"],
  ["muted", "mutedForeground"],
  ["accent", "accentForeground"],
  ["destructive", "destructiveForeground"],
  ["sidebar", "sidebarForeground"],
  ["sidebarPrimary", "sidebarPrimaryForeground"],
  ["sidebarAccent", "sidebarAccentForeground"],
];
const expectedStatuses = ["success", "warning", "error", "info", "neutral"];
const semanticTextPairs = [
  ["background.primary", "text.primary"],
  ["background.primary", "text.secondary"],
  ["background.primary", "text.muted"],
  ["background.secondary", "text.primary"],
  ["background.secondary", "text.secondary"],
  ["background.secondary", "text.muted"],
  ["surface.default", "text.primary"],
  ["surface.default", "text.secondary"],
  ["surface.default", "text.muted"],
  ["surface.elevated", "text.primary"],
  ["surface.elevated", "text.secondary"],
  ["surface.elevated", "text.muted"],
  ["action.primary", "action.primaryText"],
  ["action.primaryHover", "action.primaryText"],
];
const failures = [];

function resolve(node, seen = new Set()) {
  const value = node?.$value;
  if (typeof value !== "string" || !value.startsWith("{") || !value.endsWith("}")) {
    return value;
  }
  const path = value.slice(1, -1);
  if (seen.has(path)) throw new Error(`Circular token alias: ${path}`);
  seen.add(path);
  const target = path.split(".").reduce((current, key) => current?.[key], tokens);
  return resolve(target, seen);
}

function parseHex(hex, tokenName) {
  if (typeof hex !== "string" || !/^#[0-9a-f]{6}$/i.test(hex)) {
    failures.push(`${tokenName} must resolve to a six-digit hex color; got ${hex}`);
    return [0, 0, 0];
  }
  return [1, 3, 5].map((index) => parseInt(hex.slice(index, index + 2), 16) / 255);
}

function relativeLuminance(hex, tokenName) {
  const channels = parseHex(hex, tokenName).map((channel) =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
  );
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
}

function contrastRatio(foreground, background, label) {
  const a = relativeLuminance(foreground, `${label} foreground`);
  const b = relativeLuminance(background, `${label} background`);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

for (const mode of ["light", "dark"]) {
  const semantic = tokens.semantic?.[mode];
  if (!semantic) {
    failures.push(`Missing semantic.${mode}`);
  } else {
    for (const path of [
      "background.primary",
      "background.secondary",
      "surface.default",
      "surface.elevated",
      "text.primary",
      "text.secondary",
      "text.muted",
      "text.inverse",
      "border.default",
      "border.subtle",
      "action.primary",
      "action.primaryHover",
      "action.primaryText",
      "focus.ring",
    ]) {
      const target = path.split(".").reduce((current, key) => current?.[key], semantic);
      if (!target) failures.push(`Missing semantic.${mode}.${path}`);
    }

    for (const [surface, foreground] of semanticTextPairs) {
      const surfaceToken = surface.split(".").reduce((current, key) => current?.[key], semantic);
      const foregroundToken = foreground
        .split(".")
        .reduce((current, key) => current?.[key], semantic);
      if (!surfaceToken || !foregroundToken) continue;
      const ratio = contrastRatio(
        resolve(foregroundToken),
        resolve(surfaceToken),
        `${mode} semantic.${surface}/${foreground}`,
      );
      if (ratio < 4.5) {
        failures.push(
          `${mode} semantic.${surface}/${foreground} contrast is ${ratio.toFixed(2)}:1; minimum is 4.5:1`,
        );
      }
    }
  }

  const roles = tokens.color?.[mode] ?? {};
  for (const role of requiredRoles) {
    if (!roles[role]) failures.push(`Missing color.${mode}.${role}`);
  }
  for (const role of Object.keys(roles)) {
    if (!requiredRoles.includes(role)) {
      failures.push(`Unexpected color.${mode}.${role}; use documented semantic roles`);
    }
  }

  for (const [surface, foreground] of contrastPairs) {
    if (!roles[surface] || !roles[foreground]) continue;
    const ratio = contrastRatio(
      resolve(roles[foreground]),
      resolve(roles[surface]),
      `${mode} ${surface}/${foreground}`,
    );
    if (ratio < 4.5) {
      failures.push(
        `${mode} ${surface}/${foreground} contrast is ${ratio.toFixed(2)}:1; minimum is 4.5:1`,
      );
    }
  }

  for (const status of expectedStatuses) {
    const value = tokens.status?.[mode]?.[status];
    if (!value) {
      failures.push(`Missing status.${mode}.${status}`);
      continue;
    }
    const ratio = contrastRatio(
      resolve(value),
      resolve(roles.background),
      `${mode} status.${status}/background`,
    );
    if (ratio < 4.5) {
      failures.push(
        `${mode} status.${status} contrast is ${ratio.toFixed(2)}:1; minimum is 4.5:1`,
      );
    }
  }
}

if (
  JSON.stringify(Object.keys(tokens.color.light).sort()) !==
  JSON.stringify(Object.keys(tokens.color.dark).sort())
) {
  failures.push("Light and dark themes must have identical semantic color roles");
}

const fontFamilies = tokens.typography?.fontFamily?.sans?.$value ?? [];
if (!fontFamilies.includes("Inter") || !fontFamilies.includes("Noto Sans Myanmar")) {
  failures.push("The sans stack must include Inter and Noto Sans Myanmar");
}

if (failures.length) {
  process.stderr.write(`Design token validation failed:\n- ${failures.join("\n- ")}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write(
    "Design tokens are complete; all checked text/status pairs meet WCAG AA contrast (4.5:1).\n",
  );
}
