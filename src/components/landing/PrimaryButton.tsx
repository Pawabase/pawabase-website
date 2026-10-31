import type { ComponentPropsWithoutRef } from "react";

const PRIMARY_BUTTON_STYLES =
  "h-[50px] cursor-pointer items-center justify-center gap-[9px] whitespace-nowrap rounded-lg px-[25px] text-[13.5px] font-bold tracking-[-0.02em] no-underline btn-clay";

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
