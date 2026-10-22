import * as React from "react";

import { Button, type ButtonProps } from "./button";

export type IconButtonProps = Omit<ButtonProps, "aria-label" | "children"> & {
  label: string;
  children: React.ReactNode;
};

export const IconButton = React.forwardRef<
  HTMLButtonElement,
  IconButtonProps
>(({ label, children, size = "icon", title, ...props }, ref) => (
  <Button
    {...props}
    ref={ref}
    size={size}
    aria-label={label}
    title={title ?? label}
  >
    {children}
  </Button>
));

IconButton.displayName = "IconButton";
