import type { FooterLink } from "./footerLinks";

export function FooterNavLink({
  link,
  className = "",
}: {
  link: FooterLink;
  className?: string;
}) {
  const base =
    "inline-block max-w-full break-words text-[15px] leading-[1.55] no-underline";

  if (link.status === "planned") {
    return (
      <span
        role="link"
        aria-disabled="true"
        tabIndex={-1}
        title="Planned - this page is not live yet"
        className={`${base} cursor-default text-faint ${className}`}
      >
        {link.label}
        <span className="sr-only"> (planned)</span>
      </span>
    );
  }

  return (
    <a
      href={link.href}
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noreferrer" : undefined}
      className={`${base} text-muted transition-colors duration-150 hover:text-brand ${className}`}
    >
      {link.label}
      {link.external ? (
        <span className="sr-only"> (opens in a new tab)</span>
      ) : null}
    </a>
  );
}
