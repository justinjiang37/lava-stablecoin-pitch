export type Country = "Nigeria" | "Kenya" | "Ghana" | "South Africa" | "Ethiopia" | "Uganda" | "Tanzania";
export type CurrencyCode = "NGN" | "KES" | "GHS" | "ZAR" | "ETB" | "UGX" | "TZS";

export type DeliveryMethod =
  | "M-Pesa"
  | "MTN Mobile Money"
  | "Vodafone Cash"
  | "Airtel Money"
  | "Bank Transfer";

export type PaymentStatus = "Delivered" | "In Transit" | "Processing" | "Failed";
export type ContractorStatus = "active" | "paused";
export type PaymentFrequency = "weekly" | "biweekly" | "monthly";
export type W8BENStatus = "collected" | "pending" | "not_required";

export interface CountryConfig {
  name: Country;
  code: string;
  currencyCode: CurrencyCode;
  currencySymbol: string;
  flag: string;
  exchangeRate: number;
  deliveryMethods: DeliveryMethod[];
  banks: string[];
}

export interface Contractor {
  id: string;
  name: string;
  email: string;
  country: Country;
  avatarUrl: string;
  payoutMethod: DeliveryMethod;
  payoutDetails: string;
  bankName?: string;
  monthlyRate: number;
  paymentFrequency: PaymentFrequency;
  status: ContractorStatus;
  w8benStatus: W8BENStatus;
  lastPaidDate: string;
  notes?: string;
}

export interface Payment {
  id: string;
  contractorId: string;
  contractorName: string;
  country: Country;
  amountUsd: number;
  amountLocal: number;
  currencyCode: CurrencyCode;
  exchangeRate: number;
  deliveryMethod: DeliveryMethod;
  status: PaymentStatus;
  date: string;
  fee: number;
  batchId?: string;
  timestamps: {
    initiated: string;
    fundsReceived: string;
    converting: string;
    sending: string;
    delivered?: string;
  };
}

export interface PayrollRun {
  id: string;
  date: string;
  totalAmountUsd: number;
  totalFees: number;
  contractorCount: number;
  status: "Completed" | "Processing" | "Failed";
  payments: string[];
}

export type UserRole = "employer" | "contractor";
