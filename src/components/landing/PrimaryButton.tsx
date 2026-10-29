import type { ComponentPropsWithoutRef } from "react";

const PRIMARY_BUTTON_STYLES =
  "h-[50px] cursor-pointer items-center justify-center gap-[9px] whitespace-nowrap rounded-lg border border-white/[0.78] bg-[#F5F3EE] px-[25px] text-[13.5px] font-bold tracking-[-0.02em] text-[#101315] no-underline shadow-[inset_0_-2px_0_rgba(245,243,238,0.45)] transition-colors duration-200 hover:bg-white";

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
