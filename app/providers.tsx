"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { RoleProvider } from "@/lib/role-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <RoleProvider>{children}</RoleProvider>
    </ThemeProvider>
  );
}
