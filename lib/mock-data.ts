import { Contractor, Payment, PayrollRun, Country, CurrencyCode, PaymentStatus, DeliveryMethod } from "./types";
import { COUNTRY_MAP } from "./constants";

export const contractors: Contractor[] = [
  {
    id: "c1",
    name: "Adebayo Ogundimu",
    email: "adebayo.o@email.com",
    country: "Nigeria",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    payoutMethod: "Bank Transfer",
    payoutDetails: "0123456789",
    bankName: "GTBank",
    monthlyRate: 3500,
    paymentFrequency: "monthly",
    status: "active",
    w8benStatus: "collected",
    lastPaidDate: "2026-03-15",
    notes: "Senior backend developer",
  },
  {
    id: "c2",
    name: "Amina Wanjiku",
    email: "amina.w@email.com",
    country: "Kenya",
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    payoutMethod: "M-Pesa",
    payoutDetails: "+254712345678",
    monthlyRate: 2800,
    paymentFrequency: "monthly",
    status: "active",
    w8benStatus: "collected",
    lastPaidDate: "2026-03-15",
    notes: "UI/UX designer",
  },
  {
    id: "c3",
    name: "Kwame Mensah",
    email: "kwame.m@email.com",
    country: "Ghana",
    avatarUrl: "https://randomuser.me/api/portraits/men/67.jpg",
    payoutMethod: "MTN Mobile Money",
    payoutDetails: "+233241234567",
    monthlyRate: 2200,
    paymentFrequency: "monthly",
    status: "active",
    w8benStatus: "collected",
    lastPaidDate: "2026-03-15",
  },
  {
    id: "c4",
    name: "Thandiwe Ndlovu",
    email: "thandiwe.n@email.com",
    country: "South Africa",
    avatarUrl: "https://randomuser.me/api/portraits/women/28.jpg",
    payoutMethod: "Bank Transfer",
    payoutDetails: "9876543210",
    bankName: "FNB",
    monthlyRate: 4200,
    paymentFrequency: "monthly",
    status: "active",
    w8benStatus: "collected",
    lastPaidDate: "2026-03-15",
    notes: "Technical lead",
  },
  {
    id: "c5",
    name: "Chidi Eze",
    email: "chidi.e@email.com",
    country: "Nigeria",
    avatarUrl: "https://randomuser.me/api/portraits/men/45.jpg",
    payoutMethod: "Bank Transfer",
    payoutDetails: "1122334455",
    bankName: "Access Bank",
    monthlyRate: 1800,
    paymentFrequency: "biweekly",
    status: "active",
    w8benStatus: "pending",
    lastPaidDate: "2026-03-01",
    notes: "QA engineer",
  },
  {
    id: "c6",
    name: "Fatima Hassan",
    email: "fatima.h@email.com",
    country: "Kenya",
    avatarUrl: "https://randomuser.me/api/portraits/women/52.jpg",
    payoutMethod: "Bank Transfer",
    payoutDetails: "5544332211",
    bankName: "Equity Bank",
    monthlyRate: 3100,
    paymentFrequency: "monthly",
    status: "active",
    w8benStatus: "collected",
    lastPaidDate: "2026-03-15",
    notes: "Product manager",
  },
  {
    id: "c7",
    name: "Yaw Boateng",
    email: "yaw.b@email.com",
    country: "Ghana",
    avatarUrl: "https://randomuser.me/api/portraits/men/78.jpg",
    payoutMethod: "Vodafone Cash",
    payoutDetails: "+233201234567",
    monthlyRate: 1500,
    paymentFrequency: "monthly",
    status: "active",
    w8benStatus: "not_required",
    lastPaidDate: "2026-03-15",
    notes: "Content writer",
  },
  {
    id: "c8",
    name: "Desta Kebede",
    email: "desta.k@email.com",
    country: "Ethiopia",
    avatarUrl: "https://randomuser.me/api/portraits/men/23.jpg",
    payoutMethod: "Bank Transfer",
    payoutDetails: "1000123456789",
    bankName: "CBE",
    monthlyRate: 2000,
    paymentFrequency: "monthly",
    status: "active",
    w8benStatus: "collected",
    lastPaidDate: "2026-03-15",
  },
  {
    id: "c9",
    name: "Nakato Ssemwanga",
    email: "nakato.s@email.com",
    country: "Uganda",
    avatarUrl: "https://randomuser.me/api/portraits/women/36.jpg",
    payoutMethod: "Airtel Money",
    payoutDetails: "+256701234567",
    monthlyRate: 1700,
    paymentFrequency: "monthly",
    status: "active",
    w8benStatus: "collected",
    lastPaidDate: "2026-03-15",
  },
  {
    id: "c10",
    name: "Baraka Mwanga",
    email: "baraka.m@email.com",
    country: "Tanzania",
    avatarUrl: "https://randomuser.me/api/portraits/men/55.jpg",
    payoutMethod: "M-Pesa",
    payoutDetails: "+255712345678",
    monthlyRate: 1600,
    paymentFrequency: "monthly",
    status: "active",
    w8benStatus: "pending",
    lastPaidDate: "2026-03-15",
  },
  {
    id: "c11",
    name: "Ngozi Okafor",
    email: "ngozi.o@email.com",
    country: "Nigeria",
    avatarUrl: "https://randomuser.me/api/portraits/women/62.jpg",
    payoutMethod: "Bank Transfer",
    payoutDetails: "6677889900",
    bankName: "Zenith Bank",
    monthlyRate: 2500,
    paymentFrequency: "monthly",
    status: "active",
    w8benStatus: "collected",
    lastPaidDate: "2026-03-15",
    notes: "Frontend developer",
  },
  {
    id: "c12",
    name: "Sipho Dlamini",
    email: "sipho.d@email.com",
    country: "South Africa",
    avatarUrl: "https://randomuser.me/api/portraits/men/18.jpg",
    payoutMethod: "Bank Transfer",
    payoutDetails: "4455667788",
    bankName: "Standard Bank",
    monthlyRate: 3800,
    paymentFrequency: "monthly",
    status: "paused",
    w8benStatus: "collected",
    lastPaidDate: "2026-02-15",
    notes: "On leave until April",
  },
  {
    id: "c13",
    name: "Grace Akinyi",
    email: "grace.a@email.com",
    country: "Kenya",
    avatarUrl: "https://randomuser.me/api/portraits/women/71.jpg",
    payoutMethod: "M-Pesa",
    payoutDetails: "+254798765432",
    monthlyRate: 2400,
    paymentFrequency: "monthly",
    status: "active",
    w8benStatus: "collected",
    lastPaidDate: "2026-03-15",
    notes: "Data analyst",
  },
  {
    id: "c14",
    name: "Samuel Mwangi",
    email: "samuel.mw@email.com",
    country: "Uganda",
    avatarUrl: "https://randomuser.me/api/portraits/men/39.jpg",
    payoutMethod: "MTN Mobile Money",
    payoutDetails: "+256771234567",
    monthlyRate: 1900,
    paymentFrequency: "monthly",
    status: "active",
    w8benStatus: "collected",
    lastPaidDate: "2026-03-15",
  },
];

function makePayment(
  id: string,
  contractorId: string,
  date: string,
  status: PaymentStatus,
  batchId?: string
): Payment {
  const c = contractors.find((x) => x.id === contractorId)!;
  const config = COUNTRY_MAP[c.country];
  const amountUsd = c.monthlyRate;
  const rate = config.exchangeRate;
  const fee = Math.round(amountUsd * 0.015 * 100) / 100;
  const amountLocal = Math.round(amountUsd * rate * 100) / 100;
  const d = new Date(date);
  return {
    id,
    contractorId,
    contractorName: c.name,
    country: c.country as Country,
    amountUsd,
    amountLocal,
    currencyCode: config.currencyCode as CurrencyCode,
    exchangeRate: rate,
    deliveryMethod: c.payoutMethod as DeliveryMethod,
    status,
    date,
    fee,
    batchId,
    timestamps: {
      initiated: d.toISOString(),
      fundsReceived: new Date(d.getTime() + 5 * 60000).toISOString(),
      converting: new Date(d.getTime() + 10 * 60000).toISOString(),
      sending: new Date(d.getTime() + 20 * 60000).toISOString(),
      delivered: status === "Delivered" ? new Date(d.getTime() + 35 * 60000).toISOString() : undefined,
    },
  };
}

// Active contractors (exclude paused)
const activeContractorIds = contractors.filter((c) => c.status === "active").map((c) => c.id);

// March 2026 payroll
const marchPayments: Payment[] = activeContractorIds.map((cid, i) =>
  makePayment(`p-mar-${i + 1}`, cid, "2026-03-15T10:00:00Z", "Delivered", "batch-mar-2026")
);

// February 2026 payroll
const febPayments: Payment[] = activeContractorIds.map((cid, i) =>
  makePayment(`p-feb-${i + 1}`, cid, "2026-02-15T10:00:00Z", "Delivered", "batch-feb-2026")
);

// January 2026 payroll
const janPayments: Payment[] = activeContractorIds.map((cid, i) =>
  makePayment(`p-jan-${i + 1}`, cid, "2026-01-15T10:00:00Z", "Delivered", "batch-jan-2026")
);

// December 2025 payroll
const decPayments: Payment[] = activeContractorIds.map((cid, i) =>
  makePayment(`p-dec-${i + 1}`, cid, "2025-12-15T10:00:00Z", "Delivered", "batch-dec-2025")
);

export const payments: Payment[] = [
  ...marchPayments,
  ...febPayments,
  ...janPayments,
  ...decPayments,
];

export const payrollRuns: PayrollRun[] = [
  {
    id: "batch-mar-2026",
    date: "2026-03-15",
    totalAmountUsd: marchPayments.reduce((s, p) => s + p.amountUsd, 0),
    totalFees: marchPayments.reduce((s, p) => s + p.fee, 0),
    contractorCount: marchPayments.length,
    status: "Completed",
    payments: marchPayments.map((p) => p.id),
  },
  {
    id: "batch-feb-2026",
    date: "2026-02-15",
    totalAmountUsd: febPayments.reduce((s, p) => s + p.amountUsd, 0),
    totalFees: febPayments.reduce((s, p) => s + p.fee, 0),
    contractorCount: febPayments.length,
    status: "Completed",
    payments: febPayments.map((p) => p.id),
  },
  {
    id: "batch-jan-2026",
    date: "2026-01-15",
    totalAmountUsd: janPayments.reduce((s, p) => s + p.amountUsd, 0),
    totalFees: janPayments.reduce((s, p) => s + p.fee, 0),
    contractorCount: janPayments.length,
    status: "Completed",
    payments: janPayments.map((p) => p.id),
  },
  {
    id: "batch-dec-2025",
    date: "2025-12-15",
    totalAmountUsd: decPayments.reduce((s, p) => s + p.amountUsd, 0),
    totalFees: decPayments.reduce((s, p) => s + p.fee, 0),
    contractorCount: decPayments.length,
    status: "Completed",
    payments: decPayments.map((p) => p.id),
  },
];

// Monthly spend data for charts
export const monthlySpendData = [
  { month: "Oct 2025", amount: 28500, fees: 427, wireCost: 2280 },
  { month: "Nov 2025", amount: 30200, fees: 453, wireCost: 2416 },
  { month: "Dec 2025", amount: decPayments.reduce((s, p) => s + p.amountUsd, 0), fees: decPayments.reduce((s, p) => s + p.fee, 0), wireCost: decPayments.reduce((s, p) => s + p.amountUsd, 0) * 0.06 },
  { month: "Jan 2026", amount: janPayments.reduce((s, p) => s + p.amountUsd, 0), fees: janPayments.reduce((s, p) => s + p.fee, 0), wireCost: janPayments.reduce((s, p) => s + p.amountUsd, 0) * 0.06 },
  { month: "Feb 2026", amount: febPayments.reduce((s, p) => s + p.amountUsd, 0), fees: febPayments.reduce((s, p) => s + p.fee, 0), wireCost: febPayments.reduce((s, p) => s + p.amountUsd, 0) * 0.06 },
  { month: "Mar 2026", amount: marchPayments.reduce((s, p) => s + p.amountUsd, 0), fees: marchPayments.reduce((s, p) => s + p.fee, 0), wireCost: marchPayments.reduce((s, p) => s + p.amountUsd, 0) * 0.06 },
];

export const spendByCountry = (() => {
  const map: Record<string, number> = {};
  marchPayments.forEach((p) => {
    map[p.country] = (map[p.country] || 0) + p.amountUsd;
  });
  return Object.entries(map).map(([country, amount]) => ({ country, amount }));
})();
