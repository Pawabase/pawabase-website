import { useCallback, useEffect, useState } from "react";

/**
 * Prices are stored in US dollars. A visitor sees them in the currency of the country they are in, converted with the day's rate from a
 * public exchange-rate API. The country comes from the browser's language and time zone, so nothing about the visitor is sent to anyone.
 * They can pick another currency; the choice is remembered. Charges are made in US dollars.
 */
const RATES_URL = "https://open.er-api.com/v6/latest/USD";
const RATES_KEY = "pawabase.rates";
const CHOICE_KEY = "pawabase.currency";
const RATES_TTL = 12 * 60 * 60 * 1000;

type Rates = Record<string, number>;

const BY_REGION: Record<string, string> = {
  US: "USD", NG: "NGN", GH: "GHS", KE: "KES", ZA: "ZAR", EG: "EGP", TZ: "TZS", UG: "UGX", RW: "RWF", ET: "ETB", MA: "MAD",
  GB: "GBP", IE: "EUR", DE: "EUR", FR: "EUR", ES: "EUR", IT: "EUR", NL: "EUR", PT: "EUR", BE: "EUR", AT: "EUR", FI: "EUR", GR: "EUR",
  CH: "CHF", SE: "SEK", NO: "NOK", DK: "DKK", PL: "PLN", CZ: "CZK", TR: "TRY", UA: "UAH",
  CA: "CAD", MX: "MXN", BR: "BRL", AR: "ARS", CL: "CLP", CO: "COP", PE: "PEN",
  IN: "INR", PK: "PKR", BD: "BDT", LK: "LKR", ID: "IDR", PH: "PHP", VN: "VND", TH: "THB", MY: "MYR", SG: "SGD", HK: "HKD",
  CN: "CNY", JP: "JPY", KR: "KRW", TW: "TWD", AU: "AUD", NZ: "NZD", AE: "AED", SA: "SAR", IL: "ILS", QA: "QAR",
};
const BY_ZONE: Record<string, string> = {
  "Africa/Lagos": "NG", "Africa/Accra": "GH", "Africa/Nairobi": "KE", "Africa/Johannesburg": "ZA", "Africa/Cairo": "EG",
  "Africa/Dar_es_Salaam": "TZ", "Africa/Kampala": "UG", "Africa/Kigali": "RW", "Africa/Addis_Ababa": "ET", "Africa/Casablanca": "MA",
  "Asia/Kolkata": "IN", "Asia/Calcutta": "IN", "Asia/Karachi": "PK", "Asia/Dhaka": "BD", "Asia/Jakarta": "ID", "Asia/Manila": "PH",
  "Asia/Singapore": "SG", "Asia/Dubai": "AE", "Asia/Tokyo": "JP", "Asia/Seoul": "KR", "Asia/Shanghai": "CN", "Asia/Hong_Kong": "HK",
  "Europe/London": "GB", "Europe/Berlin": "DE", "Europe/Paris": "FR", "Europe/Madrid": "ES", "Europe/Rome": "IT", "Europe/Amsterdam": "NL",
  "America/Sao_Paulo": "BR", "America/Mexico_City": "MX", "America/Toronto": "CA", "America/Vancouver": "CA", "Australia/Sydney": "AU",
};

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

export function detectCurrency(): string {
  let region = "";
  try {
    region = new Intl.Locale(navigator.language).region || "";
  } catch {
    /* the language names no country */
  }
  if (!region) {
    try {
      region = BY_ZONE[Intl.DateTimeFormat().resolvedOptions().timeZone] || "";
    } catch {
      /* no time zone */
    }
  }
  return BY_REGION[region] || "USD";
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
  return kept?.rates || { USD: 1 };
}

export function useCurrency() {
  const [rates, setRates] = useState<Rates>({ USD: 1 });
  const [picked, setPicked] = useState<string | null>(() => load<string>(CHOICE_KEY));
  useEffect(() => {
    let alive = true;
    fetchRates().then((next) => alive && setRates(next));
    return () => {
      alive = false;
    };
  }, []);
  const wanted = picked || detectCurrency();
  const currency = rates[wanted] ? wanted : "USD";
  const rate = rates[currency] || 1;
  /** A price in US dollars as the visitor's currency. */
  const show = useCallback(
    (dollars: number) => {
      const value = dollars * rate;
      const digits = currency === "USD" || value < 50 ? (Number.isInteger(value) ? 0 : 2) : 0;
      return new Intl.NumberFormat(undefined, { style: "currency", currency, minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value);
    },
    [currency, rate],
  );
  const choose = (code: string) => {
    setPicked(code);
    save(CHOICE_KEY, code);
  };
  return { currency, show, choose, converted: currency !== "USD", options: [...new Set(Object.values(BY_REGION))].filter((code) => rates[code]).sort((a, b) => (a === "USD" ? -1 : b === "USD" ? 1 : a.localeCompare(b))) };
}

/** "Nigerian Naira" for NGN, in the visitor's language. */
export function currencyName(code: string): string {
  try {
    return new Intl.DisplayNames(undefined, { type: "currency" }).of(code) || code;
  } catch {
    return code;
  }
}
