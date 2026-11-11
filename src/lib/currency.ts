import { useCallback, useSyncExternalStore } from "react";

/**
 * Prices are in naira: the payment account settles in it and every charge is made in naira. A visitor sees naira by default and may pick another
 * currency, in which case the page shows the equivalent at the day's rate from a public exchange-rate API (nothing about the visitor is sent to
 * anyone). The choice is remembered. Only the display changes.
 */
const RATES_URL = "https://open.er-api.com/v6/latest/USD";
const RATES_KEY = "pawabase.rates";
const CHOICE_KEY = "pawabase.currency";
const RATES_TTL = 12 * 60 * 60 * 1000;

type Rates = Record<string, number>;

export const BASE = "NGN";
const CURRENCIES = [
  "NGN", "USD", "GBP", "EUR", "GHS", "KES", "ZAR", "EGP", "TZS", "UGX", "RWF", "ETB", "MAD", "CHF", "SEK", "NOK", "DKK", "PLN", "CZK", "TRY", "UAH",
  "CAD", "MXN", "BRL", "ARS", "CLP", "COP", "PEN", "INR", "PKR", "BDT", "LKR", "IDR", "PHP", "VND", "THB", "MYR", "SGD", "HKD", "CNY", "JPY", "KRW",
  "TWD", "AUD", "NZD", "AED", "SAR", "ILS", "QAR",
];

function load<T>(key: string): T | null {
  try {
    return JSON.parse(window.localStorage.getItem(key) || "null") as T | null;
  } catch {
    return null;
  }
}
function save(key: string, value: unknown) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* private mode: not remembered */
  }
}

/** Rates against the dollar, kept for half a day; the last known rates stand in when the API cannot be reached. */
async function fetchRates(): Promise<Rates> {
  const kept = load<{ at: number; rates: Rates }>(RATES_KEY);
  if (kept && Date.now() - kept.at < RATES_TTL) return kept.rates;
  try {
    const body = await (await fetch(RATES_URL)).json();
    if (body?.rates?.USD) {
      save(RATES_KEY, { at: Date.now(), rates: body.rates });
      return body.rates as Rates;
    }
  } catch {
    /* offline or blocked */
  }
  return kept?.rates || {};
}

/** The currency to show: the one asked for when rates for it are known, otherwise naira. Rates are against the dollar, as the API gives them. */
export function resolveCurrency(wanted: string | null | undefined, rates: Rates): string {
  return !wanted || wanted === BASE || !(rates[BASE] && rates[wanted]) ? BASE : wanted;
}

/** A naira price as text in `currency`: naira as is, any other currency at the day's rate. */
export function priceIn(naira: number, currency: string, rates: Rates): string {
  if (!naira) return "Free";
  const value = currency === BASE ? naira : (naira * rates[currency]) / rates[BASE];
  const digits = currency === BASE || value >= 50 || Number.isInteger(value) ? 0 : 2;
  return new Intl.NumberFormat("en", { style: "currency", currency, currencyDisplay: "narrowSymbol", minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value);
}

/**
 * The picker and every price read this same choice. Each `useCurrency()` used to keep its own copy, so choosing a
 * currency updated the button and left the prices in naira.
 */
type Store = { rates: Rates; picked: string | null };
const serverStore: Store = { rates: {}, picked: null };
let store: Store = {
  rates: {},
  picked: typeof window === "undefined" ? null : load<string>(CHOICE_KEY),
};
const listeners = new Set<() => void>();
let ratesStarted = false;

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!ratesStarted && typeof window !== "undefined") {
    ratesStarted = true;
    fetchRates().then((rates) => {
      store = { ...store, rates };
      emit();
    });
  }
  return () => listeners.delete(listener);
}

function choose(code: string) {
  save(CHOICE_KEY, code);
  store = { ...store, picked: code };
  emit();
}

export function useCurrency() {
  const current = useSyncExternalStore(subscribe, () => store, () => serverStore);
  const currency = resolveCurrency(current.picked, current.rates);
  /** A price in naira as the visitor's currency. */
  const show = useCallback((naira: number) => priceIn(naira, currency, current.rates), [currency, current.rates]);
  const options = current.rates[BASE]
    ? CURRENCIES.filter((code) => code === BASE || current.rates[code]).sort((a, b) => (a === BASE ? -1 : b === BASE ? 1 : a.localeCompare(b)))
    : [BASE];
  return { currency, show, choose, converted: currency !== BASE, options, base: BASE };
}

/** "Nigerian Naira" for NGN, in the visitor's language. */
export function currencyName(code: string): string {
  try {
    return new Intl.DisplayNames(undefined, { type: "currency" }).of(code) || code;
  } catch {
    return code;
  }
}
