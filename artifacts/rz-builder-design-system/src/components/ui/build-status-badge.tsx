import { cn } from "../../lib/utils";

export const BUILD_STATUSES = [
  "QUEUED",
  "RUNNING",
  "PASSED",
  "FAILED",
  "CANCELED",
  "NOT_RUN",
  "NOT_VERIFIED",
] as const;

export type BuildStatus = (typeof BUILD_STATUSES)[number];

const statusPresentation: Record<
  BuildStatus,
  { label: string; tone: "neutral" | "info" | "success" | "error" | "warning" }
> = {
  QUEUED: { label: "Queued", tone: "neutral" },
  RUNNING: { label: "Running", tone: "info" },
  PASSED: { label: "Passed", tone: "success" },
  FAILED: { label: "Failed", tone: "error" },
  CANCELED: { label: "Canceled", tone: "neutral" },
  NOT_RUN: { label: "Not run", tone: "neutral" },
  NOT_VERIFIED: { label: "Not verified", tone: "warning" },
};

export function BuildStatusBadge({
  status,
  className,
}: {
  status: BuildStatus;
  className?: string;
}) {
  const presentation = statusPresentation[status];

  return (
    <span
      aria-label={`Build status: ${presentation.label}`}
      className={cn(
        "inline-flex min-h-9 items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-sm font-medium text-foreground",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="size-2 shrink-0 rounded-full"
        style={{ backgroundColor: `var(--status-${presentation.tone})` }}
      />
      {presentation.label}
    </span>
  );
}
