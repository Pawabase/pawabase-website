export function BrandMark({ size = 24 }: { size?: number }) {
  return (
    <img
      src="/brand/mark.svg"
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      className="block object-contain"
    />
  );
}

export function Wordmark() {
  return (
    <img src="/brand/horizontal-dark.svg" width={156} height={38} alt="Pawabase" className="block h-auto w-[156px] shrink-0" />
  );
}
