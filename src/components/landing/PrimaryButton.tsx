import type { ComponentPropsWithoutRef } from "react";

const PRIMARY_BUTTON_STYLES =
  "h-[50px] cursor-pointer items-center justify-center gap-[9px] whitespace-nowrap rounded-lg border border-[#2dd4bf] bg-[#2dd4bf] px-[25px] text-[13.5px] font-bold tracking-[-0.02em] text-[#03201c] no-underline shadow-none transition-colors duration-200 hover:bg-[#5eead4]";

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
