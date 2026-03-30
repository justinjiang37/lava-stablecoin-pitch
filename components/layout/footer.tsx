"use client";

import Link from "next/link";
import { Anchor } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { COUNTRIES } from "@/lib/constants";

const footerSections = [
  {
    title: "Product",
    links: [
      { label: "How it Works", href: "/#how-it-works" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Corridors", href: "/#corridors" },
      { label: "API Docs", href: "/docs" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "AML Policy", href: "/aml" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Status", href: "/status" },
      { label: "Security", href: "/security" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Main footer */}
        <div className="grid grid-cols-2 gap-8 py-12 sm:grid-cols-3 lg:grid-cols-5">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-700 text-white">
                <Anchor className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold tracking-tight text-foreground">
                Remora
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Fast, affordable contractor payments to Africa. Powered by
              stablecoin rails for instant settlement.
            </p>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-foreground">
                {section.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator />

        {/* Corridors */}
        <div className="py-6">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Supported Corridors
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {COUNTRIES.map((country) => (
              <span
                key={country.code}
                className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground"
              >
                <span>{country.flag}</span>
                {country.name}
              </span>
            ))}
          </div>
        </div>

        <Separator />

        {/* Compliance & copyright */}
        <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Remora Financial, Inc. All rights
            reserved.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span className="text-xs text-muted-foreground">
              Money transmission services provided by licensed partners
            </span>
            <span className="text-xs text-muted-foreground">
              SOC 2 Type II Compliant
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
