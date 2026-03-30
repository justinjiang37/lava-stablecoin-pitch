"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Circle,
  Clock,
  CreditCard,
  User,
  Globe,
  ArrowRightLeft,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { payments, contractors } from "@/lib/mock-data";
import { COUNTRY_MAP } from "@/lib/constants";
import { formatUsd, formatLocalCurrency, formatDateTime, cn } from "@/lib/utils";
import type { Payment } from "@/lib/types";

const STEPS = [
  { key: "initiated", label: "Initiated" },
  { key: "fundsReceived", label: "Funds Received" },
  { key: "converting", label: "Converting" },
  { key: "sending", label: "Sending" },
  { key: "delivered", label: "Delivered" },
] as const;

type StepKey = (typeof STEPS)[number]["key"];

function getStepStatus(payment: Payment, stepKey: StepKey): "completed" | "current" | "pending" {
  const ts = payment.timestamps;
  if (stepKey === "delivered") {
    if (ts.delivered) return "completed";
    if (payment.status === "In Transit" || payment.status === "Processing") return "current";
    return "pending";
  }
  const order: StepKey[] = ["initiated", "fundsReceived", "converting", "sending", "delivered"];
  const stepIdx = order.indexOf(stepKey);

  if (payment.status === "Delivered") return "completed";

  // For non-delivered, figure out the current step
  const statusToStep: Record<string, number> = {
    Processing: 2,
    "In Transit": 3,
  };
  const currentIdx = statusToStep[payment.status] ?? 0;
  if (stepIdx < currentIdx) return "completed";
  if (stepIdx === currentIdx) return "current";
  return "pending";
}

export default function TransactionDetailPage() {
  const params = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const payment = payments.find((p) => p.id === params.id);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-32 rounded-lg" />
        <Skeleton className="h-64 rounded-xl" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Skeleton className="h-48 rounded-xl" />
          <Skeleton className="h-48 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!payment) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-lg font-semibold">Transaction not found</p>
        <Link href="/dashboard">
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="mr-1.5 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  const contractor = contractors.find((c) => c.id === payment.contractorId);
  const config = COUNTRY_MAP[payment.country];
  const midMarketRate = config.exchangeRate;
  const usedRate = payment.exchangeRate;
  const spread = ((usedRate - midMarketRate) / midMarketRate * 100).toFixed(3);
  const platformFee = payment.fee;
  const networkFee = Math.round(payment.amountUsd * 0.002 * 100) / 100;
  const exchangeFee = Math.round(payment.amountUsd * 0.003 * 100) / 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-6"
    >
      {/* Back button + header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Transaction {payment.id}</h1>
          <p className="text-sm text-muted-foreground">
            {formatUsd(payment.amountUsd)} to {payment.contractorName}
          </p>
        </div>
      </div>

      {/* Timeline stepper */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Timeline</CardTitle>
          <CardDescription>Track the progress of this payment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-0">
            {STEPS.map((step, i) => {
              const status = getStepStatus(payment, step.key);
              const ts = payment.timestamps[step.key as keyof typeof payment.timestamps];
              return (
                <div key={step.key} className="flex gap-4">
                  {/* Vertical line + icon */}
                  <div className="flex flex-col items-center">
                    {status === "completed" ? (
                      <CheckCircle2 className="h-6 w-6 text-green-600 shrink-0" />
                    ) : status === "current" ? (
                      <Loader2 className="h-6 w-6 text-amber-500 animate-spin shrink-0" />
                    ) : (
                      <Circle className="h-6 w-6 text-muted-foreground/40 shrink-0" />
                    )}
                    {i < STEPS.length - 1 && (
                      <div
                        className={cn(
                          "w-0.5 flex-1 min-h-8",
                          status === "completed" ? "bg-green-600" : "bg-muted"
                        )}
                      />
                    )}
                  </div>
                  {/* Content */}
                  <div className="pb-6">
                    <p
                      className={cn(
                        "text-sm font-semibold",
                        status === "completed"
                          ? "text-green-600"
                          : status === "current"
                          ? "text-amber-600"
                          : "text-muted-foreground"
                      )}
                    >
                      {step.label}
                    </p>
                    {ts && (
                      <p className="text-xs text-muted-foreground">
                        {formatDateTime(ts)}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Fee Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Fee Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Platform Fee (1.5%)</span>
              <span className="font-medium">{formatUsd(platformFee)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Exchange Rate Margin</span>
              <span className="font-medium">{formatUsd(exchangeFee)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Network Fee</span>
              <span className="font-medium">{formatUsd(networkFee)}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between text-sm font-semibold">
              <span>Total Fees</span>
              <span>{formatUsd(platformFee + exchangeFee + networkFee)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Exchange Rate */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowRightLeft className="h-4 w-4" />
              Exchange Rate
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Used Rate</span>
              <span className="font-medium">
                1 USD = {usedRate.toLocaleString()} {config.currencyCode}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Mid-market Rate</span>
              <span className="font-medium">
                1 USD = {midMarketRate.toLocaleString()} {config.currencyCode}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Spread</span>
              <span className="font-medium text-green-600">{spread}%</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Amount Sent</span>
              <span className="font-semibold">{formatUsd(payment.amountUsd)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Amount Received</span>
              <span className="font-semibold">
                {formatLocalCurrency(payment.amountLocal, payment.currencyCode)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contractor Details */}
      {contractor && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Contractor Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              <div>
                <p className="text-xs text-muted-foreground">Name</p>
                <p className="text-sm font-medium">{contractor.name}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium">{contractor.email}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Country</p>
                <p className="text-sm font-medium">
                  {config?.flag} {contractor.country}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Payout Method</p>
                <p className="text-sm font-medium">{contractor.payoutMethod}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}
