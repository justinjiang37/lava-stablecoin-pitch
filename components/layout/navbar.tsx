"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Anchor,
  LayoutDashboard,
  Users,
  Banknote,
  Settings,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useRole } from "@/lib/role-context";
import { cn } from "@/lib/utils";
import { UserRole } from "@/lib/types";

interface NavbarProps {
  variant?: "marketing" | "dashboard";
}

const employerLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/contractors", label: "Contractors", icon: Users },
  { href: "/dashboard/payroll", label: "Payroll", icon: Banknote },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

const contractorLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/payments", label: "Payments", icon: Banknote },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Navbar({ variant = "dashboard" }: NavbarProps) {
  const { role, setRole } = useRole();
  const pathname = usePathname();

  const links = role === "employer" ? employerLinks : contractorLinks;
  const isMarketing = variant === "marketing";

  return (
    <header
      className={cn(
        "z-50 w-full border-b transition-colors duration-200",
        isMarketing
          ? "absolute top-0 left-0 border-transparent bg-transparent"
          : "sticky top-0 border-border bg-background/80 backdrop-blur-md"
      )}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-700 text-white transition-transform group-hover:scale-105">
            <Anchor className="h-4 w-4" />
          </div>
          <span
            className={cn(
              "text-lg font-bold tracking-tight",
              isMarketing ? "text-white" : "text-foreground"
            )}
          >
            Remora
          </span>
        </Link>

        {/* Desktop nav links (dashboard only) */}
        {!isMarketing && (
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/dashboard" &&
                  pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                    isActive
                      ? "text-indigo-400"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 rounded-md bg-indigo-400/10"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        )}

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          {/* Role toggle */}
          <div
            className={cn(
              "hidden sm:flex items-center rounded-lg p-0.5 text-sm",
              isMarketing
                ? "bg-white/10 backdrop-blur-sm"
                : "bg-muted"
            )}
          >
            {(["employer", "contractor"] as UserRole[]).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={cn(
                  "relative rounded-md px-3 py-1 text-xs font-medium capitalize transition-colors",
                  role === r
                    ? isMarketing
                      ? "text-white"
                      : "text-foreground"
                    : isMarketing
                      ? "text-white/60 hover:text-white/80"
                      : "text-muted-foreground hover:text-foreground"
                )}
              >
                {role === r && (
                  <motion.div
                    layoutId="role-toggle"
                    className={cn(
                      "absolute inset-0 rounded-md shadow-sm",
                      isMarketing
                        ? "bg-white/20"
                        : "bg-background"
                    )}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 28,
                    }}
                  />
                )}
                <span className="relative z-10">{r}</span>
              </button>
            ))}
          </div>

          {/* Mobile menu */}
          {!isMarketing && (
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger
                  render={<Button variant="ghost" size="icon" />}
                >
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Menu</span>
                </SheetTrigger>
                <SheetContent side="right" className="w-72">
                  <SheetHeader>
                    <SheetTitle>Navigation</SheetTitle>
                  </SheetHeader>

                  {/* Mobile role toggle */}
                  <div className="px-4">
                    <div className="flex items-center rounded-lg bg-muted p-0.5">
                      {(["employer", "contractor"] as UserRole[]).map(
                        (r) => (
                          <button
                            key={r}
                            onClick={() => setRole(r)}
                            className={cn(
                              "flex-1 rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-colors",
                              role === r
                                ? "bg-background text-foreground shadow-sm"
                                : "text-muted-foreground"
                            )}
                          >
                            {r}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  {/* Mobile nav links */}
                  <nav className="flex flex-col gap-1 px-4 pt-2">
                    {links.map((link) => {
                      const isActive =
                        pathname === link.href ||
                        (link.href !== "/dashboard" &&
                          pathname.startsWith(link.href));
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={cn(
                            "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                            isActive
                              ? "bg-indigo-400/10 text-indigo-400"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          <link.icon className="h-4 w-4" />
                          {link.label}
                        </Link>
                      );
                    })}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
