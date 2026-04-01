"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Loader2,
  Users,
  DollarSign,
  ChevronDown,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { contractors, payments, payrollRuns } from "@/lib/mock-data";
import { COUNTRY_MAP } from "@/lib/constants";
import { formatUsd, formatLocalCurrency, formatDate, cn } from "@/lib/utils";
import type { Country, Contractor } from "@/lib/types";

export default function PayrollPage() {
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [expandedRun, setExpandedRun] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const activeContractors = contractors.filter((c) => c.status === "active");

  // Group by country
  const grouped = useMemo(() => {
    const map = new Map<Country, Contractor[]>();
    activeContractors.forEach((c) => {
      const list = map.get(c.country) || [];
      list.push(c);
      map.set(c.country, list);
    });
    return Array.from(map.entries());
  }, []);

  const selectedContractors = activeContractors.filter((c) => selected.has(c.id));
  const runningTotal = selectedContractors.reduce((s, c) => s + c.monthlyRate, 0);
  const totalFees = Math.round(runningTotal * 0.015 * 100) / 100;
  const wireCost = runningTotal * 0.06;
  const savings = wireCost - totalFees;

  const toggleAll = () => {
    if (selected.size === activeContractors.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(activeContractors.map((c) => c.id)));
    }
  };

  const toggleContractor = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  };

  const handleProcess = async () => {
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 2500));
    setProcessing(false);
    setCompleted(true);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-48 rounded-lg" />
        <Skeleton className="h-8 w-64 rounded-lg" />
        <Skeleton className="h-96 rounded-xl" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-6"
    >
      <h1 className="text-2xl font-bold tracking-tight">Payroll</h1>

      <Tabs defaultValue="run">
        <TabsList>
          <TabsTrigger value="run">Run Payroll</TabsTrigger>
          <TabsTrigger value="history">Payroll History</TabsTrigger>
        </TabsList>

        {/* Run Payroll Tab */}
        <TabsContent value="run">
          {/* Step indicator */}
          <div className="flex items-center gap-2 py-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors",
                    step >= s
                      ? "bg-[#DBFF5B] text-[#0a0a0a]"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {step > s ? <CheckCircle2 className="h-4 w-4" /> : s}
                </div>
                <span
                  className={cn(
                    "text-sm font-medium",
                    step >= s ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {s === 1 ? "Select" : s === 2 ? "Review" : "Process"}
                </span>
                {s < 3 && (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Select contractors */}
          {step === 1 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Select Contractors</CardTitle>
                    <CardDescription>
                      Choose which contractors to include in this payroll run
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">
                      {selected.size} of {activeContractors.length} selected
                    </span>
                    <Button variant="outline" size="sm" onClick={toggleAll}>
                      {selected.size === activeContractors.length ? "Deselect All" : "Select All"}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {grouped.map(([country, ctrs]) => {
                  const config = COUNTRY_MAP[country];
                  return (
                    <div key={country}>
                      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                        <span>{config?.flag}</span>
                        {country}
                        <span className="text-muted-foreground font-normal">
                          ({ctrs.length} contractor{ctrs.length > 1 ? "s" : ""})
                        </span>
                      </h3>
                      <div className="space-y-2">
                        {ctrs.map((c) => (
                          <div
                            key={c.id}
                            className={cn(
                              "flex items-center gap-3 rounded-lg border p-3 transition-colors cursor-pointer",
                              selected.has(c.id)
                                ? "border-[#DBFF5B]/30 bg-[#DBFF5B]/5"
                                : "border-border hover:bg-muted/50"
                            )}
                            onClick={() => toggleContractor(c.id)}
                          >
                            <Checkbox
                              checked={selected.has(c.id)}
                              onCheckedChange={() => toggleContractor(c.id)}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium">{c.name}</p>
                              <p className="text-xs text-muted-foreground">{c.payoutMethod}</p>
                            </div>
                            <span className="text-sm font-semibold">{formatUsd(c.monthlyRate)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Running Total</p>
                    <p className="text-2xl font-bold">{formatUsd(runningTotal)}</p>
                  </div>
                  <Button
                    className="bg-[#DBFF5B] text-[#0a0a0a] hover:bg-[#c8ec4a]"
                    disabled={selected.size === 0}
                    onClick={() => setStep(2)}
                  >
                    Next: Review
                    <ChevronRight className="ml-1.5 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Review & Confirm */}
          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Review & Confirm</CardTitle>
                <CardDescription>
                  Verify payment details before processing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Contractor</TableHead>
                      <TableHead className="text-right">USD Amount</TableHead>
                      <TableHead className="text-right">Exchange Rate</TableHead>
                      <TableHead className="text-right">Local Amount</TableHead>
                      <TableHead>Delivery</TableHead>
                      <TableHead className="text-right">Fee</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedContractors.map((c) => {
                      const config = COUNTRY_MAP[c.country];
                      const local = c.monthlyRate * config.exchangeRate;
                      const fee = Math.round(c.monthlyRate * 0.015 * 100) / 100;
                      return (
                        <TableRow key={c.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{c.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {config?.flag} {c.country}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {formatUsd(c.monthlyRate)}
                          </TableCell>
                          <TableCell className="text-right text-muted-foreground">
                            1 USD = {config.exchangeRate} {config.currencyCode}
                          </TableCell>
                          <TableCell className="text-right text-muted-foreground">
                            {formatLocalCurrency(local, config.currencyCode)}
                          </TableCell>
                          <TableCell className="text-muted-foreground">{c.payoutMethod}</TableCell>
                          <TableCell className="text-right text-muted-foreground">
                            {formatUsd(fee)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>

                <Separator />

                {/* Totals and savings */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <Card size="sm">
                    <CardContent>
                      <p className="text-xs text-muted-foreground">Total Payout</p>
                      <p className="text-xl font-bold">{formatUsd(runningTotal)}</p>
                      <p className="text-xs text-muted-foreground">+ {formatUsd(totalFees)} fees</p>
                    </CardContent>
                  </Card>
                  <Card size="sm">
                    <CardContent>
                      <p className="text-xs text-muted-foreground">Wire Transfer Cost</p>
                      <p className="text-xl font-bold text-red-500">{formatUsd(wireCost)}</p>
                      <p className="text-xs text-muted-foreground">at ~6% per transfer</p>
                    </CardContent>
                  </Card>
                  <Card size="sm" className="ring-green-500/30">
                    <CardContent>
                      <p className="text-xs text-green-600 font-medium">You Save</p>
                      <p className="text-xl font-bold text-green-600">{formatUsd(savings)}</p>
                      <p className="text-xs text-green-600">
                        vs traditional wire transfers
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    <ChevronLeft className="mr-1.5 h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    className="bg-amber-500 text-white hover:bg-amber-600"
                    onClick={handleProcess}
                  >
                    Confirm & Process
                    <ChevronRight className="ml-1.5 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Processing / Success */}
          {step === 2 && processing && (
            <Card className="mt-4">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-12 w-12 animate-spin text-[#DBFF5B]" />
                <p className="mt-4 text-lg font-semibold">Processing Payroll...</p>
                <p className="text-sm text-muted-foreground">
                  Sending payments to {selected.size} contractors
                </p>
                <div className="mt-6 w-full max-w-xs">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <motion.div
                      className="h-full bg-[#DBFF5B] rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2.3, ease: "easeInOut" }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 2 && completed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="mt-4">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="mt-4 text-lg font-semibold">Payroll Submitted!</p>
                  <p className="text-sm text-muted-foreground">
                    Batch ID: BATCH-{Date.now().toString(36).toUpperCase()}
                  </p>
                  <div className="mt-6 w-full max-w-md space-y-2">
                    {selectedContractors.map((c) => (
                      <div
                        key={c.id}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <div>
                          <p className="text-sm font-medium">{c.name}</p>
                          <p className="text-xs text-muted-foreground">{c.payoutMethod}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{formatUsd(c.monthlyRate)}</span>
                          <span className="inline-flex items-center rounded-full bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-700 dark:text-blue-400">
                            In Transit
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button
                    className="mt-6 bg-[#DBFF5B] text-[#0a0a0a] hover:bg-[#c8ec4a]"
                    onClick={() => {
                      setStep(1);
                      setSelected(new Set());
                      setCompleted(false);
                    }}
                  >
                    Run Another Payroll
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </TabsContent>

        {/* Payroll History Tab */}
        <TabsContent value="history">
          <div className="space-y-4 pt-4">
            {payrollRuns.map((run) => {
              const isExpanded = expandedRun === run.id;
              const runPayments = payments.filter((p) => run.payments.includes(p.id));
              return (
                <Card key={run.id}>
                  <CardContent>
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => setExpandedRun(isExpanded ? null : run.id)}
                    >
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-semibold">{formatDate(run.date)}</p>
                          <p className="text-xs text-muted-foreground">
                            {run.contractorCount} contractors
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold">{formatUsd(run.totalAmountUsd)}</p>
                          <p className="text-xs text-muted-foreground">
                            Fees: {formatUsd(run.totalFees)}
                          </p>
                        </div>
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                            run.status === "Completed"
                              ? "bg-green-500/10 text-green-700 dark:text-green-400"
                              : run.status === "Processing"
                              ? "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                              : "bg-red-500/10 text-red-700 dark:text-red-400"
                          )}
                        >
                          {run.status}
                        </span>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 text-muted-foreground transition-transform",
                            isExpanded && "rotate-180"
                          )}
                        />
                      </div>
                    </div>

                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.2 }}
                        className="mt-4"
                      >
                        <Separator className="mb-4" />
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Contractor</TableHead>
                              <TableHead>Country</TableHead>
                              <TableHead className="text-right">Amount USD</TableHead>
                              <TableHead className="text-right">Amount Local</TableHead>
                              <TableHead>Method</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {runPayments.map((p) => {
                              const config = COUNTRY_MAP[p.country];
                              return (
                                <TableRow key={p.id}>
                                  <TableCell className="font-medium">{p.contractorName}</TableCell>
                                  <TableCell>
                                    {config?.flag} {p.country}
                                  </TableCell>
                                  <TableCell className="text-right">
                                    {formatUsd(p.amountUsd)}
                                  </TableCell>
                                  <TableCell className="text-right text-muted-foreground">
                                    {formatLocalCurrency(p.amountLocal, p.currencyCode)}
                                  </TableCell>
                                  <TableCell className="text-muted-foreground">
                                    {p.deliveryMethod}
                                  </TableCell>
                                  <TableCell>
                                    <span
                                      className={cn(
                                        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                                        p.status === "Delivered"
                                          ? "bg-green-500/10 text-green-700 dark:text-green-400"
                                          : "bg-blue-500/10 text-blue-700 dark:text-blue-400"
                                      )}
                                    >
                                      {p.status}
                                    </span>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
