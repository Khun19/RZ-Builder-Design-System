import {
  BUILD_STATUSES,
  BuildStatusBadge,
} from "../../components/ui/build-status-badge";

export function BuildStatusDemo() {
  return (
    <div className="space-y-5 rounded-xl border bg-card p-6 text-card-foreground">
      <div>
        <h2 className="text-lg font-semibold">Available status labels</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Examples of the status vocabulary only; these are not live build
          results.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        {BUILD_STATUSES.map((status) => (
          <BuildStatusBadge key={status} status={status} />
        ))}
      </div>
    </div>
  );
}
