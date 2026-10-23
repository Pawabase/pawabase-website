export function BrandMark({ size = 22 }: { size?: number }) {
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
    <span className="inline-flex items-center gap-2.5 text-[15px] font-bold tracking-[-0.035em]">
      <BrandMark size={27} />
      <span>pawabase</span>
    </span>
  );
}
