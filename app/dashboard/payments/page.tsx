"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  Calendar,
  TrendingUp,
  Search,
  Download,
  Clock,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip as ReTooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
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
import { payments, monthlySpendData } from "@/lib/mock-data";
import { formatUsd, formatLocalCurrency, formatDate, cn } from "@/lib/utils";
import type { PaymentStatus } from "@/lib/types";

// Contractor sees their own payments — use contractor c2 (Amina Wanjiku) as the demo user
const MY_CONTRACTOR_ID = "c2";

const statusColor: Record<PaymentStatus, string> = {
  Delivered: "bg-green-500/10 text-green-400",
  "In Transit": "bg-blue-500/10 text-blue-400",
  Processing: "bg-amber-500/10 text-amber-400",
  Failed: "bg-red-500/10 text-red-400",
};

export default function ContractorPaymentsPage() {
  const [search, setSearch] = useState("");

  const myPayments = useMemo(() => {
    return payments
      .filter((p) => p.contractorId === MY_CONTRACTOR_ID)
      .filter(
        (p) =>
          p.id.toLowerCase().includes(search.toLowerCase()) ||
          p.date.includes(search)
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [search]);

  const totalReceived = myPayments
    .filter((p) => p.status === "Delivered")
    .reduce((s, p) => s + p.amountUsd, 0);
  const totalLocal = myPayments
    .filter((p) => p.status === "Delivered")
    .reduce((s, p) => s + p.amountLocal, 0);
  const nextPayment = "Apr 15, 2026";
  const avgDelivery = "42 min";

  const earningsData = [
    { month: "Oct", amount: 2800 },
    { month: "Nov", amount: 2800 },
    { month: "Dec", amount: 2800 },
    { month: "Jan", amount: 2800 },
    { month: "Feb", amount: 2800 },
    { month: "Mar", amount: 2800 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-6"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Payments</h1>
          <p className="text-sm text-muted-foreground">Track your incoming payments and earnings</p>
        </div>
        <Button variant="outline" onClick={() => alert("Export coming soon!")}>
          <Download className="mr-1.5 h-3.5 w-3.5" />
          Download Statement
        </Button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Total Received</p>
                <p className="text-2xl font-bold">{formatUsd(totalReceived)}</p>
                <p className="text-xs text-muted-foreground">{myPayments.length} payments</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#DBFF5B]/10">
                <DollarSign className="h-5 w-5 text-[#DBFF5B]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">In Local Currency</p>
                <p className="text-2xl font-bold">KSh {totalLocal.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">KES total</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#DBFF5B]/10">
                <TrendingUp className="h-5 w-5 text-[#DBFF5B]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Next Payment</p>
                <p className="text-2xl font-bold">{nextPayment}</p>
                <p className="text-xs text-muted-foreground">{formatUsd(2800)} expected</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                <Calendar className="h-5 w-5 text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Avg Delivery</p>
                <p className="text-2xl font-bold">{avgDelivery}</p>
                <p className="text-xs text-green-400 font-medium">via M-Pesa</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                <Clock className="h-5 w-5 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Earnings chart */}
      <Card>
        <CardHeader>
          <CardTitle>Earnings Over Time</CardTitle>
          <CardDescription>Monthly payment history (USD)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `$${v}`}
                />
                <ReTooltip
                  formatter={(value) => formatUsd(Number(value))}
                  contentStyle={{
                    borderRadius: "8px",
                    fontSize: "12px",
                    border: "1px solid var(--border)",
                    background: "var(--popover)",
                    color: "var(--popover-foreground)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#DBFF5B"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  name="Earnings"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Payment history */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>All your received payments</CardDescription>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by ID or date..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead className="text-right">Amount USD</TableHead>
                <TableHead className="text-right">Amount KES</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myPayments.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">{p.id}</TableCell>
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
}
