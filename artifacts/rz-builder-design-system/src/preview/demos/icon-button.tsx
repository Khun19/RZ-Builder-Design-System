import { MoreHorizontal, Search } from "lucide-react";

import { IconButton } from "../../components/ui/icon-button";
import { Row } from "../parts";

export function IconButtonDemo() {
  return (
    <div className="space-y-6 rounded-xl border bg-card p-6 text-card-foreground">
      <Row label="Accessible icon actions">
        <IconButton label="Search projects" variant="secondary">
          <Search aria-hidden="true" />
        </IconButton>
        <IconButton label="More build actions" variant="tertiary">
          <MoreHorizontal aria-hidden="true" />
        </IconButton>
        <IconButton label="Disabled action" disabled>
          <Search aria-hidden="true" />
        </IconButton>
      </Row>
      <p className="text-sm text-muted-foreground">
        Each icon-only control requires a descriptive accessible label.
      </p>
    </div>
  );
}
