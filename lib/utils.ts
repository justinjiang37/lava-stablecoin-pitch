import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { COUNTRY_MAP } from "./constants"
import { CurrencyCode, Country } from "./types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  NGN: "₦",
  KES: "KSh ",
  GHS: "GH₵",
  ZAR: "R",
  ETB: "ETB ",
  UGX: "UGX ",
  TZS: "TZS ",
};

export function formatLocalCurrency(amount: number, code: CurrencyCode): string {
  const symbol = CURRENCY_SYMBOLS[code] || code + " ";
  return `${symbol}${new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)}`;
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

export function getCountryConfig(country: Country) {
  return COUNTRY_MAP[country];
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
