import type { ComponentPropsWithoutRef } from "react";

const PRIMARY_BUTTON_STYLES =
  "btn btn-light btn-lg";

export function PrimaryButton({
  className = "",
  children,
  ...props
}: ComponentPropsWithoutRef<"a">) {
  return (
    <a className={`${PRIMARY_BUTTON_STYLES} ${className}`} {...props}>
      {children}
    </a>
  );
}
