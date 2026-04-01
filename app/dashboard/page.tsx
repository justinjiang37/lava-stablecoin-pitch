"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Search,
  Play,
  UserPlus,
  Send,
} from "lucide-react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as ReTooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { contractors, payments, monthlySpendData, spendByCountry } from "@/lib/mock-data";
import { formatUsd, formatLocalCurrency, formatDate, cn } from "@/lib/utils";
import { COUNTRY_MAP } from "@/lib/constants";
import type { PaymentStatus } from "@/lib/types";

const statusColor: Record<PaymentStatus, string> = {
  Delivered: "bg-green-500/10 text-green-400",
  "In Transit": "bg-blue-500/10 text-blue-400",
  Processing: "bg-amber-500/10 text-amber-400",
  Failed: "bg-red-500/10 text-red-400",
};

const PIE_COLORS = ["#DBFF5B", "#f59e0b", "#22c55e", "#3b82f6", "#ef4444", "#8b5cf6", "#06b6d4"];

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const activeContractors = contractors.filter((c) => c.status === "active");
  const marchPayments = payments.filter((p) => p.date.startsWith("2026-03"));
  const totalPaidThisMonth = marchPayments.reduce((s, p) => s + p.amountUsd, 0);
  const totalFees = marchPayments.reduce((s, p) => s + p.fee, 0);
  const wireCostThisMonth = totalPaidThisMonth * 0.06;
  const savings = wireCostThisMonth - totalFees;

  const recentPayments = useMemo(() => {
    const filtered = payments.filter((p) =>
      p.contractorName.toLowerCase().includes(search.toLowerCase())
    );
    return filtered.slice(0, 10);
  }, [search]);

  const feeSavingsData = monthlySpendData.map((d) => ({
    month: d.month,
    "Wire Cost": Math.round(d.wireCost),
    "Remora Cost": Math.round(d.fees),
  }));

  const sparklineData = monthlySpendData.map((d) => ({ v: d.amount }));

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-10 w-64 rounded-lg" />
        <Skeleton className="h-72 rounded-xl" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-72 rounded-xl" />
          ))}
        </div>
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
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Overview of your contractor payments</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/payroll">
            <Button className="bg-amber-500 text-white hover:bg-amber-600">
              <Play className="mr-1.5 h-3.5 w-3.5" />
              Run Payroll
            </Button>
          </Link>
          <Link href="/dashboard/contractors">
            <Button variant="outline">
              <UserPlus className="mr-1.5 h-3.5 w-3.5" />
              Add Contractor
            </Button>
          </Link>
          <Button variant="outline">
            <Send className="mr-1.5 h-3.5 w-3.5" />
            Send Payment
          </Button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Total Contractors</p>
                <p className="text-2xl font-bold">{activeContractors.length}</p>
                <p className="text-xs text-muted-foreground">active</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#DBFF5B]/10">
                <Users className="h-5 w-5 text-[#DBFF5B]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Next Payroll</p>
                <p className="text-2xl font-bold">Apr 15</p>
                <p className="text-xs text-muted-foreground">{formatUsd(totalPaidThisMonth)}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#DBFF5B]/10">
                <Calendar className="h-5 w-5 text-[#DBFF5B]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-muted-foreground">Paid This Month</p>
                <p className="text-2xl font-bold">{formatUsd(totalPaidThisMonth)}</p>
                <p className="text-xs text-muted-foreground">{marchPayments.length} payments</p>
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
                <p className="text-xs font-medium text-muted-foreground">Saved vs Traditional</p>
                <p className="text-2xl font-bold text-green-600">{formatUsd(savings)}</p>
                <p className="text-xs text-green-600 font-medium">this month</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-0">
            <div>
              <p className="text-xs font-medium text-muted-foreground">Monthly Spend</p>
              <div className="mt-1 h-12">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sparklineData}>
                    <Line
                      type="monotone"
                      dataKey="v"
                      stroke="#DBFF5B"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">6-month trend</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Payments */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Recent Payments</CardTitle>
              <CardDescription>Latest contractor payouts</CardDescription>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search contractor..."
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
                <TableHead>Contractor</TableHead>
                <TableHead>Country</TableHead>
                <TableHead className="text-right">Amount USD</TableHead>
                <TableHead className="text-right">Amount Local</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentPayments.map((p) => {
                const config = COUNTRY_MAP[p.country];
                return (
                  <TableRow key={p.id}>
                    <TableCell>
                      <Link
                        href={`/dashboard/transactions/${p.id}`}
                        className="font-medium text-[#DBFF5B] hover:underline"
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

      {/* Analytics */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Spend by Country */}
        <Card>
          <CardHeader>
            <CardTitle>Spend by Country</CardTitle>
            <CardDescription>March 2026 distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={spendByCountry}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="amount"
                    nameKey="country"
                    paddingAngle={2}
                  >
                    {spendByCountry.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
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
                  <Legend
                    verticalAlign="bottom"
                    iconSize={8}
                    wrapperStyle={{ fontSize: "11px" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Spend Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Spend Over Time</CardTitle>
            <CardDescription>6-month history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlySpendData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
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
                    name="Total Spend"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Fee Savings */}
        <Card>
          <CardHeader>
            <CardTitle>Fee Savings</CardTitle>
            <CardDescription>Wire cost vs Remora cost</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={feeSavingsData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                  />
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
                  <Legend iconSize={8} wrapperStyle={{ fontSize: "11px" }} />
                  <Bar dataKey="Wire Cost" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Remora Cost" fill="#22c55e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
