const LOGO_SRC = "/logo.png?v=5";
const BRAND_SRC = "/brand.png?v=5";

export function BrandMark({
  className = "h-10 w-auto",
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  return (
    // next/image optimizer can flatten the black-keyed PNG; native img keeps alpha.
    // mix-blend-screen hides leftover black on dark chrome without a box.
    <img
      src={LOGO_SRC}
      alt=""
      width={830}
      height={978}
      className={`bg-transparent object-contain ${onDark ? "mix-blend-screen" : ""} ${className}`}
    />
  );
}

export function BrandLockup({
  tone = "light",
}: {
  tone?: "light" | "dark";
}) {
  const name = tone === "light" ? "text-white" : "text-secondary";
  return (
    <span className="inline-flex items-center gap-3">
      <BrandMark className="h-11 w-auto" onDark={tone === "light"} />
      <span className="flex flex-col items-center">
        <span className={`-mr-[0.22em] text-[15px] font-extrabold tracking-[0.22em] ${name}`}>
          ANKADER
        </span>
        <span className="-mt-0.5 w-full text-center font-script text-[17px] leading-none whitespace-nowrap text-primary">
          Küllerinden Doğuyor
        </span>
      </span>
    </span>
  );
}

export function BrandStack({
  className = "w-44",
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  return (
    <img
      src={BRAND_SRC}
      alt="ANKADER — Küllerinden Doğuyor"
      width={771}
      height={760}
      className={`h-auto bg-transparent object-contain ${onDark ? "mix-blend-screen" : ""} ${className}`}
    />
  );
}
