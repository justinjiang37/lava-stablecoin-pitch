"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  CreditCard,
  Users,
  Bell,
  Key,
  Copy,
  Eye,
  EyeOff,
  UserPlus,
  RefreshCw,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const mockTeam = [
  { name: "Alex Thompson", email: "alex@remora.co", role: "Admin", initials: "AT" },
  { name: "Sarah Kim", email: "sarah@remora.co", role: "Finance", initials: "SK" },
  { name: "Jordan Patel", email: "jordan@remora.co", role: "Viewer", initials: "JP" },
];

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [showKey, setShowKey] = useState(false);
  const [notifications, setNotifications] = useState({
    payrollComplete: true,
    paymentFailed: true,
    newContractor: false,
    weeklyReport: true,
    exchangeAlert: false,
  });

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-48 rounded-lg" />
        <Skeleton className="h-8 w-64 rounded-lg" />
        <Skeleton className="h-72 rounded-xl" />
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
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="company">
        <TabsList>
          <TabsTrigger value="company">
            <Building2 className="mr-1.5 h-3.5 w-3.5" />
            Company
          </TabsTrigger>
          <TabsTrigger value="payment">
            <CreditCard className="mr-1.5 h-3.5 w-3.5" />
            Payment
          </TabsTrigger>
          <TabsTrigger value="team">
            <Users className="mr-1.5 h-3.5 w-3.5" />
            Team
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-1.5 h-3.5 w-3.5" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="api">
            <Key className="mr-1.5 h-3.5 w-3.5" />
            API Keys
          </TabsTrigger>
        </TabsList>

        {/* Company Profile */}
        <TabsContent value="company">
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Company Profile</CardTitle>
              <CardDescription>Your organization details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input defaultValue="TechCorp Inc." />
                </div>
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Input defaultValue="United States" />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Billing Email</Label>
                  <Input defaultValue="billing@techcorp.com" />
                </div>
                <div className="space-y-2">
                  <Label>Tax ID / EIN</Label>
                  <Input defaultValue="XX-XXXXXXX" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="bg-[#DBFF5B] text-[#0a0a0a] hover:bg-[#c8ec4a]">
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Method */}
        <TabsContent value="payment">
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Your connected funding source</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">Chase Business Checking</p>
                  <p className="text-xs text-muted-foreground">****4521 | Connected Mar 1, 2026</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-700 dark:text-green-400">
                  Active
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Funds are debited from this account when payroll is processed
                </p>
                <Button variant="outline">Change Account</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team */}
        <TabsContent value="team">
          <Card className="mt-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>Manage who has access to your account</CardDescription>
                </div>
                <Button className="bg-[#DBFF5B] text-[#0a0a0a] hover:bg-[#c8ec4a]">
                  <UserPlus className="mr-1.5 h-3.5 w-3.5" />
                  Invite
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockTeam.map((member) => (
                  <div
                    key={member.email}
                    className="flex items-center gap-3 rounded-lg border p-3"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-[#DBFF5B]/10 text-[#DBFF5B] text-xs dark:text-[#DBFF5B]">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.email}</p>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
                      {member.role}
                    </span>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose what events you want to be notified about</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: "payrollComplete" as const, label: "Payroll Completed", desc: "Get notified when a payroll run finishes" },
                { key: "paymentFailed" as const, label: "Payment Failed", desc: "Alert when a payment fails to deliver" },
                { key: "newContractor" as const, label: "New Contractor Added", desc: "Notification when a team member adds a contractor" },
                { key: "weeklyReport" as const, label: "Weekly Report", desc: "Receive a weekly spending summary" },
                { key: "exchangeAlert" as const, label: "Exchange Rate Alert", desc: "Alert on significant exchange rate changes" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch
                    checked={notifications[item.key]}
                    onCheckedChange={(checked: boolean) =>
                      setNotifications((prev) => ({ ...prev, [item.key]: checked }))
                    }
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Keys */}
        <TabsContent value="api">
          <Card className="mt-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>API Keys</CardTitle>
                  <CardDescription>Manage programmatic access to Remora</CardDescription>
                </div>
                <Button className="bg-[#DBFF5B] text-[#0a0a0a] hover:bg-[#c8ec4a]">
                  <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                  Generate Key
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">Production Key</p>
                    <p className="text-xs text-muted-foreground">Created Mar 5, 2026</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="rounded bg-muted px-2 py-1 text-xs font-mono">
                      {showKey ? "rmr_live_4k8j2m9x7p3q1w5n6t0v" : "rmr_live_**********************"}
                    </code>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setShowKey(!showKey)}
                    >
                      {showKey ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => navigator.clipboard?.writeText("rmr_live_4k8j2m9x7p3q1w5n6t0v")}
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Use API keys to integrate Remora into your systems. Keep your keys secret and never expose them in client-side code.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
