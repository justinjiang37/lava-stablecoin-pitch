"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search,
  LayoutGrid,
  List,
  UserPlus,
  Upload,
  Mail,
  MapPin,
  CreditCard,
  Clock,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
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
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { contractors } from "@/lib/mock-data";
import { COUNTRIES, COUNTRY_MAP } from "@/lib/constants";
import { formatUsd, formatDate, cn } from "@/lib/utils";
import type { Country, DeliveryMethod } from "@/lib/types";

export default function ContractorsPage() {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"card" | "table">("card");
  const [search, setSearch] = useState("");
  const [countryFilter, setCountryFilter] = useState<string>("all");
  const [dialogOpen, setDialogOpen] = useState(false);

  // Form state
  const [formCountry, setFormCountry] = useState<string>("");
  const [formMethod, setFormMethod] = useState<string>("");
  const [formBank, setFormBank] = useState<string>("");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const filteredContractors = useMemo(() => {
    return contractors.filter((c) => {
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase());
      const matchesCountry = countryFilter === "all" || c.country === countryFilter;
      return matchesSearch && matchesCountry;
    });
  }, [search, countryFilter]);

  const selectedCountryConfig = formCountry ? COUNTRY_MAP[formCountry] : null;

  const handleSubmit = () => {
    setDialogOpen(false);
    setFormCountry("");
    setFormMethod("");
    setFormBank("");
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-64 rounded-lg" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-32 rounded-lg" />
          <Skeleton className="h-8 w-32 rounded-lg" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-xl" />
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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Contractors</h1>
          <p className="text-sm text-muted-foreground">
            {contractors.length} contractors ({contractors.filter((c) => c.status === "active").length} active)
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => alert("CSV upload coming soon!")}>
            <Upload className="mr-1.5 h-3.5 w-3.5" />
            Upload CSV
          </Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger
              render={
                <Button className="bg-[#DBFF5B] text-[#0a0a0a] hover:bg-[#c8ec4a]">
                  <UserPlus className="mr-1.5 h-3.5 w-3.5" />
                  Add Contractor
                </Button>
              }
            />
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Add Contractor</DialogTitle>
                <DialogDescription>
                  Add a new contractor to your payroll.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" placeholder="john@example.com" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Country</Label>
                    <Select value={formCountry} onValueChange={(v) => setFormCountry(v ?? "")}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {COUNTRIES.map((c) => (
                          <SelectItem key={c.name} value={c.name}>
                            {c.flag} {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Payout Method</Label>
                    <Select value={formMethod} onValueChange={(v) => setFormMethod(v ?? "")}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        {(selectedCountryConfig?.deliveryMethods || []).map((m) => (
                          <SelectItem key={m} value={m}>
                            {m}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {formMethod === "Bank Transfer" && selectedCountryConfig && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Bank</Label>
                      <Select value={formBank} onValueChange={(v) => setFormBank(v ?? "")}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select bank" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedCountryConfig.banks.map((b) => (
                            <SelectItem key={b} value={b}>
                              {b}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Account Number</Label>
                      <Input placeholder="0123456789" />
                    </div>
                  </div>
                )}

                {formMethod && formMethod !== "Bank Transfer" && (
                  <div className="space-y-2">
                    <Label>Phone Number</Label>
                    <Input placeholder="+254712345678" />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Monthly Rate (USD)</Label>
                    <Input type="number" placeholder="2500" />
                  </div>
                  <div className="space-y-2">
                    <Label>Payment Frequency</Label>
                    <Select defaultValue="monthly">
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="biweekly">Biweekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>W-8BEN Status</Label>
                    <Select defaultValue="pending">
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="collected">Collected</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="not_required">Not Required</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Notes</Label>
                    <Input placeholder="Optional notes..." />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-[#DBFF5B] text-[#0a0a0a] hover:bg-[#c8ec4a]" onClick={handleSubmit}>
                  Add Contractor
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search contractors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={countryFilter} onValueChange={(v) => setCountryFilter(v ?? "all")}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All countries" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Countries</SelectItem>
            {COUNTRIES.map((c) => (
              <SelectItem key={c.name} value={c.name}>
                {c.flag} {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex items-center gap-1 rounded-lg border border-border p-0.5">
          <Button
            variant={view === "card" ? "default" : "ghost"}
            size="icon-sm"
            onClick={() => setView("card")}
            className={view === "card" ? "bg-[#DBFF5B] text-[#0a0a0a]" : ""}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant={view === "table" ? "default" : "ghost"}
            size="icon-sm"
            onClick={() => setView("table")}
            className={view === "table" ? "bg-[#DBFF5B] text-[#0a0a0a]" : ""}
          >
            <List className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Card View */}
      {view === "card" && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredContractors.map((c) => {
            const config = COUNTRY_MAP[c.country];
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full">
                  <CardContent className="pt-0">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={c.avatarUrl} alt={c.name} />
                        <AvatarFallback>{c.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold truncate">{c.name}</h3>
                          <span
                            className={cn(
                              "inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium",
                              c.status === "active"
                                ? "bg-green-500/10 text-green-400"
                                : "bg-amber-500/10 text-amber-400"
                            )}
                          >
                            {c.status}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{c.email}</p>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span>{config?.flag} {c.country}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <CreditCard className="h-3 w-3" />
                        <span>{c.payoutMethod}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        <span className="font-medium text-foreground">{formatUsd(c.monthlyRate)}/mo</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>Paid {formatDate(c.lastPaidDate)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Table View */}
      {view === "table" && (
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contractor</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Payout Method</TableHead>
                  <TableHead className="text-right">Monthly Rate</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Paid</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContractors.map((c) => {
                  const config = COUNTRY_MAP[c.country];
                  return (
                    <TableRow key={c.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-7 w-7">
                            <AvatarImage src={c.avatarUrl} alt={c.name} />
                            <AvatarFallback className="text-[10px]">
                              {c.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{c.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="mr-1">{config?.flag}</span>
                        {c.country}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{c.email}</TableCell>
                      <TableCell>{c.payoutMethod}</TableCell>
                      <TableCell className="text-right font-medium">{formatUsd(c.monthlyRate)}</TableCell>
                      <TableCell>
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                            c.status === "active"
                              ? "bg-green-500/10 text-green-400"
                              : "bg-amber-500/10 text-amber-400"
                          )}
                        >
                          {c.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{formatDate(c.lastPaidDate)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}
