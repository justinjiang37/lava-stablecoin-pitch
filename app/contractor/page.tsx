"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  Calendar,
  TrendingUp,
  Clock,
  Download,
  ChevronDown,
  Edit,
  CreditCard,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { contractors, payments } from "@/lib/mock-data";
import { COUNTRY_MAP } from "@/lib/constants";
import { formatUsd, formatLocalCurrency, formatDate, cn } from "@/lib/utils";

// Mock logged-in contractor is Amina Wanjiku (c2)
const CONTRACTOR_ID = "c2";

export default function ContractorPage() {
  const [loading, setLoading] = useState(true);
  const [expandedPayment, setExpandedPayment] = useState<string | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const contractor = contractors.find((c) => c.id === CONTRACTOR_ID)!;
  const config = COUNTRY_MAP[contractor.country];

  const myPayments = useMemo(
    () => payments.filter((p) => p.contractorId === CONTRACTOR_ID).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    ),
    []
  );

  const totalEarnedAllTime = myPayments.reduce((s, p) => s + p.amountUsd, 0);
  const thisMonth = myPayments.filter((p) => p.date.startsWith("2026-03"));
  const earnedThisMonth = thisMonth.reduce((s, p) => s + p.amountUsd, 0);
  const thisYear = myPayments.filter((p) => p.date.startsWith("2026"));
  const earnedThisYear = thisYear.reduce((s, p) => s + p.amountUsd, 0);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl space-y-6 p-6">
        <Skeleton className="h-10 w-64 rounded-lg" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-72 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="space-y-6"
      >
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome, {contractor.name.split(" ")[0]}
          </h1>
          <p className="text-sm text-muted-foreground">
            {config?.flag} {contractor.country} &middot; {contractor.payoutMethod}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Total Earned</p>
                  <p className="text-2xl font-bold">{formatUsd(totalEarnedAllTime)}</p>
                  <p className="text-xs text-muted-foreground">all time</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-700/10">
                  <DollarSign className="h-5 w-5 text-indigo-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold">{formatUsd(earnedThisMonth)}</p>
                  <p className="text-xs text-muted-foreground">March 2026</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">This Year</p>
                  <p className="text-2xl font-bold">{formatUsd(earnedThisYear)}</p>
                  <p className="text-xs text-muted-foreground">2026</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-700/10">
                  <Calendar className="h-5 w-5 text-indigo-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Next Payment</p>
                  <p className="text-2xl font-bold">Apr 15</p>
                  <p className="text-xs text-muted-foreground">{formatUsd(contractor.monthlyRate)}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment History */}
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>All your received payments</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount USD</TableHead>
                  <TableHead className="text-right">Amount Local</TableHead>
                  <TableHead className="text-right">Rate</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myPayments.map((p) => {
                  const isExpanded = expandedPayment === p.id;
                  return (
                    <>
                      <TableRow
                        key={p.id}
                        className="cursor-pointer"
                        onClick={() => setExpandedPayment(isExpanded ? null : p.id)}
                      >
                        <TableCell>{formatDate(p.date)}</TableCell>
                        <TableCell className="text-right font-medium">
                          {formatUsd(p.amountUsd)}
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground">
                          {formatLocalCurrency(p.amountLocal, p.currencyCode)}
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground">
                          {p.exchangeRate.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-muted-foreground">{p.deliveryMethod}</TableCell>
                        <TableCell>
                          <span
                            className={cn(
                              "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                              p.status === "Delivered"
                                ? "bg-green-500/10 text-green-400"
                                : p.status === "In Transit"
                                ? "bg-blue-500/10 text-blue-400"
                                : "bg-amber-500/10 text-amber-400"
                            )}
                          >
                            {p.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 text-muted-foreground transition-transform",
                              isExpanded && "rotate-180"
                            )}
                          />
                        </TableCell>
                      </TableRow>
                      {isExpanded && (
                        <TableRow key={`${p.id}-detail`}>
                          <TableCell colSpan={7}>
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.2 }}
                              className="rounded-lg bg-muted/50 p-4"
                            >
                              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                                <div>
                                  <p className="text-xs text-muted-foreground">Transaction ID</p>
                                  <p className="text-sm font-mono">{p.id}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">Batch ID</p>
                                  <p className="text-sm font-mono">{p.batchId || "N/A"}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">Fee</p>
                                  <p className="text-sm">{formatUsd(p.fee)}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">Net Amount</p>
                                  <p className="text-sm font-medium">{formatUsd(p.amountUsd - p.fee)}</p>
                                </div>
                              </div>
                              <div className="mt-3">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    alert("Receipt downloaded (mock)");
                                  }}
                                >
                                  <Download className="mr-1.5 h-3.5 w-3.5" />
                                  Download Receipt
                                </Button>
                              </div>
                            </motion.div>
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Payout Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Payout Settings
                </CardTitle>
                <CardDescription>Your current payout configuration</CardDescription>
              </div>
              <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogTrigger
                  render={
                    <Button variant="outline" size="sm">
                      <Edit className="mr-1.5 h-3.5 w-3.5" />
                      Edit
                    </Button>
                  }
                />
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Edit Payout Settings</DialogTitle>
                    <DialogDescription>
                      Update your payout method and details
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-2">
                    <div className="space-y-2">
                      <Label>Payout Method</Label>
                      <Select defaultValue={contractor.payoutMethod}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {config.deliveryMethods.map((m) => (
                            <SelectItem key={m} value={m}>
                              {m}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>
                        {contractor.payoutMethod === "Bank Transfer"
                          ? "Account Number"
                          : "Phone Number"}
                      </Label>
                      <Input defaultValue={contractor.payoutDetails} />
                    </div>
                    {contractor.bankName && (
                      <div className="space-y-2">
                        <Label>Bank</Label>
                        <Select defaultValue={contractor.bankName}>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {config.banks.map((b) => (
                              <SelectItem key={b} value={b}>
                                {b}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setEditOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      className="bg-indigo-700 text-white hover:bg-indigo-800"
                      onClick={() => setEditOpen(false)}
                    >
                      Save Changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              <div>
                <p className="text-xs text-muted-foreground">Method</p>
                <p className="text-sm font-medium">{contractor.payoutMethod}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">
                  {contractor.payoutMethod === "Bank Transfer" ? "Account" : "Phone"}
                </p>
                <p className="text-sm font-medium">{contractor.payoutDetails}</p>
              </div>
              {contractor.bankName && (
                <div>
                  <p className="text-xs text-muted-foreground">Bank</p>
                  <p className="text-sm font-medium">{contractor.bankName}</p>
                </div>
              )}
              <div>
                <p className="text-xs text-muted-foreground">Currency</p>
                <p className="text-sm font-medium">
                  {config.currencyCode} ({config.currencySymbol})
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
