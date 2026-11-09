/**
 * A visitor's cookie choice, kept in this browser (localStorage). The site loads no analytics or tracking today; this records
 * what the visitor allows so that anything added later can ask `getConsent()` first, or listen for `pawabase:consent`.
 *
 * Necessary cookies are always on. A choice lasts a year, then the banner asks again.
 */

export type Consent = {
  necessary: true;
  analytics: boolean;
  preferences: boolean;
  /** When it was chosen, as milliseconds since 1970. */
  at: number;
};

export const CONSENT_KEY = "pawabase.consent.v1";
export const CONSENT_EVENT = "pawabase:consent";
export const OPEN_EVENT = "pawabase:cookies";
const YEAR = 365 * 24 * 60 * 60 * 1000;

/** The saved choice, or null when there is none yet (or it is over a year old, or storage is unavailable). */
export function getConsent(): Consent | null {
  try {
    const value = JSON.parse(localStorage.getItem(CONSENT_KEY) || "null") as Partial<Consent> | null;
    if (!value || typeof value.at !== "number" || Date.now() - value.at > YEAR) return null;
    return { necessary: true, analytics: Boolean(value.analytics), preferences: Boolean(value.preferences), at: value.at };
  } catch {
    return null;
  }
}

/** Remember a choice and tell the page (`pawabase:consent`, with the choice as the event's detail). */
export function saveConsent(choice: Pick<Consent, "analytics" | "preferences">): Consent {
  const consent: Consent = { necessary: true, analytics: choice.analytics, preferences: choice.preferences, at: Date.now() };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  } catch {
    /* private mode: the choice holds for this page only */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: consent }));
  return consent;
}

/** Open the cookie settings again (the footer's "Cookie settings" link does this). */
export function openCookieSettings(): void {
  window.dispatchEvent(new Event(OPEN_EVENT));
}
