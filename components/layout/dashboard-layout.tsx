"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Banknote,
  ArrowLeftRight,
  Settings,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Navbar } from "@/components/layout/navbar";
import { useRole } from "@/lib/role-context";
import { cn } from "@/lib/utils";

const employerSidebarLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/contractors", label: "Contractors", icon: Users },
  { href: "/dashboard/payroll", label: "Payroll", icon: Banknote },
  {
    href: "/dashboard/transactions",
    label: "Transactions",
    icon: ArrowLeftRight,
  },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

const contractorSidebarLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/payments", label: "Payments", icon: Banknote },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardLayout({ children }: { children: ReactNode }) {
  const { role } = useRole();
  const pathname = usePathname();

  const sidebarLinks =
    role === "employer" ? employerSidebarLinks : contractorSidebarLinks;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar variant="dashboard" />

      <div className="flex flex-1">
        {/* Sidebar - hidden on mobile (handled by Sheet in navbar) */}
        <aside className="hidden md:flex w-56 shrink-0 flex-col border-r border-border bg-background">
          <ScrollArea className="flex-1 py-4">
            <nav className="flex flex-col gap-1 px-3">
              {sidebarLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/dashboard" &&
                    pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "text-indigo-400"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active"
                        className="absolute inset-0 rounded-lg bg-indigo-400/10"
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}
                    <link.icon className="relative z-10 h-4 w-4" />
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            <Separator className="my-4 mx-3" />

            {/* Role indicator */}
            <div className="px-3">
              <div className="rounded-lg bg-muted/50 p-3">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Viewing as
                </p>
                <p className="mt-0.5 text-sm font-semibold capitalize text-foreground">
                  {role}
                </p>
              </div>
            </div>
          </ScrollArea>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
