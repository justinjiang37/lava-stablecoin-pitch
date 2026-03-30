"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  ArrowUpDown,
  Filter,
  Download,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { payments } from "@/lib/mock-data";
import { formatUsd, formatLocalCurrency, formatDate, cn } from "@/lib/utils";
import { COUNTRY_MAP } from "@/lib/constants";
import type { PaymentStatus } from "@/lib/types";

const statusColor: Record<PaymentStatus, string> = {
  Delivered: "bg-green-500/10 text-green-400",
  "In Transit": "bg-blue-500/10 text-blue-400",
  Processing: "bg-amber-500/10 text-amber-400",
  Failed: "bg-red-500/10 text-red-400",
};

type SortField = "date" | "amount" | "contractor" | "country";

export default function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<PaymentStatus | "all">("all");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortAsc, setSortAsc] = useState(false);

  const filtered = useMemo(() => {
    let list = payments.filter((p) =>
      p.contractorName.toLowerCase().includes(search.toLowerCase()) ||
      p.country.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase())
    );
    if (statusFilter !== "all") {
      list = list.filter((p) => p.status === statusFilter);
    }
    list.sort((a, b) => {
      let cmp = 0;
      switch (sortField) {
        case "date":
          cmp = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case "amount":
          cmp = a.amountUsd - b.amountUsd;
          break;
        case "contractor":
          cmp = a.contractorName.localeCompare(b.contractorName);
          break;
        case "country":
          cmp = a.country.localeCompare(b.country);
          break;
      }
      return sortAsc ? cmp : -cmp;
    });
    return list;
  }, [search, statusFilter, sortField, sortAsc]);

  function toggleSort(field: SortField) {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  }

  const totalVolume = payments.reduce((s, p) => s + p.amountUsd, 0);
  const totalFees = payments.reduce((s, p) => s + p.fee, 0);
  const deliveredCount = payments.filter((p) => p.status === "Delivered").length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-6"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
          <p className="text-sm text-muted-foreground">All payment history across your contractors</p>
        </div>
        <Button variant="outline" onClick={() => alert("Export coming soon!")}>
          <Download className="mr-1.5 h-3.5 w-3.5" />
          Export CSV
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-0">
            <p className="text-xs font-medium text-muted-foreground">Total Volume</p>
            <p className="text-2xl font-bold">{formatUsd(totalVolume)}</p>
            <p className="text-xs text-muted-foreground">{payments.length} transactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-0">
            <p className="text-xs font-medium text-muted-foreground">Total Fees</p>
            <p className="text-2xl font-bold">{formatUsd(totalFees)}</p>
            <p className="text-xs text-muted-foreground">{((totalFees / totalVolume) * 100).toFixed(2)}% avg rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-0">
            <p className="text-xs font-medium text-muted-foreground">Success Rate</p>
            <p className="text-2xl font-bold text-green-400">{((deliveredCount / payments.length) * 100).toFixed(1)}%</p>
            <p className="text-xs text-muted-foreground">{deliveredCount} delivered</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>{filtered.length} transactions</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search name, country, ID..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
              <div className="flex items-center gap-1 rounded-lg bg-muted p-0.5">
                {(["all", "Delivered", "In Transit", "Processing", "Failed"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={cn(
                      "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                      statusFilter === s
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {s === "all" ? "All" : s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>
                  <button onClick={() => toggleSort("contractor")} className="flex items-center gap-1 hover:text-foreground">
                    Contractor <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead>
                  <button onClick={() => toggleSort("country")} className="flex items-center gap-1 hover:text-foreground">
                    Country <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead className="text-right">
                  <button onClick={() => toggleSort("amount")} className="ml-auto flex items-center gap-1 hover:text-foreground">
                    Amount <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
                <TableHead className="text-right">Local Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>
                  <button onClick={() => toggleSort("date")} className="flex items-center gap-1 hover:text-foreground">
                    Date <ArrowUpDown className="h-3 w-3" />
                  </button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => {
                const config = COUNTRY_MAP[p.country];
                return (
                  <TableRow key={p.id}>
                    <TableCell className="font-mono text-xs text-muted-foreground">{p.id}</TableCell>
                    <TableCell>
                      <Link
                        href={`/dashboard/transactions/${p.id}`}
                        className="font-medium text-indigo-400 hover:underline"
                      >
                        {p.contractorName}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <span className="mr-1">{config?.flag}</span>
                      {p.country}
                    </TableCell>
                    <TableCell className="text-right font-medium">{formatUsd(p.amountUsd)}</TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {formatLocalCurrency(p.amountLocal, p.currencyCode)}
                    </TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                          statusColor[p.status]
                        )}
                      >
                        {p.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{p.deliveryMethod}</TableCell>
                    <TableCell className="text-muted-foreground">{formatDate(p.date)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
}
