import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Figure } from "./Figure";

type Props = {
  title: string;
  lede: string;
  figure: string;
  figureLabel: string;
  primary: { href?: string; to?: string; label: string };
  secondary?: { href?: string; to?: string; label: string };
  children?: ReactNode;
};

const Btn = ({ b, primary }: { b: NonNullable<Props["secondary"]>; primary?: boolean }) =>
  b.to ? (
    <Link className={`btn ${primary ? "btn-primary" : ""}`} to={b.to}>
      {b.label}
    </Link>
  ) : (
    <a className={`btn ${primary ? "btn-primary" : ""}`} href={b.href}>
      {b.label}
    </a>
  );

/** The top of a product page: the product's name as the headline, a line saying what it is, and its figure. */
export function PageHead({ title, lede, figure, figureLabel, primary, secondary, children }: Props) {
  return (
    <section className="pagehead">
      <i className="fx dots soft fill" aria-hidden="true" />
      <div className="wrap split">
        <div className="c6">
          <h1 className="h1">{title}</h1>
          <p className="lede">{lede}</p>
          <div className="actions">
            <Btn b={primary} primary />
            {secondary && <Btn b={secondary} />}
          </div>
          {children}
        </div>
        <div className="c6">
          <div className="stage">
            <Figure name={figure} names={(c) => c} label={figureLabel} ratio="5 / 4" />
          </div>
        </div>
      </div>
    </section>
  );
}
