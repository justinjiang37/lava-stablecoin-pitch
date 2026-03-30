"use client";

import { motion } from "framer-motion";
import { COMPETITOR_COMPARISON } from "@/lib/constants";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, X as XIcon } from "lucide-react";

const providers = ["remora", "deel", "wise", "payoneer", "wire"] as const;
const providerLabels: Record<(typeof providers)[number], string> = {
  remora: "Remora",
  deel: "Deel",
  wise: "Wise",
  payoneer: "Payoneer",
  wire: "Wire Transfer",
};

function CellValue({ value, provider }: { value: string; provider: string }) {
  if (value === "Yes" && provider === "remora") {
    return <CheckCircle className="inline size-4 text-[#22c55e]" />;
  }
  if (value === "Yes") {
    return <CheckCircle className="inline size-4 text-muted-foreground/50" />;
  }
  if (value === "No") {
    return <XIcon className="inline size-4 text-muted-foreground/30" />;
  }
  return <span>{value}</span>;
}

export function Comparison() {
  return (
    <section id="comparison" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How Remora Compares
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-muted-foreground">
            Purpose-built for African payroll. Not a generic global tool.
          </p>
        </div>

        <motion.div
          className="mt-12 overflow-hidden rounded-xl border shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="min-w-[140px]">Feature</TableHead>
                  {providers.map((p) => (
                    <TableHead
                      key={p}
                      className={
                        p === "remora"
                          ? "bg-[#4338ca]/5 text-center font-bold text-[#4338ca]"
                          : "text-center"
                      }
                    >
                      {providerLabels[p]}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {COMPETITOR_COMPARISON.map((row) => (
                  <TableRow key={row.feature}>
                    <TableCell className="font-medium">{row.feature}</TableCell>
                    {providers.map((p) => (
                      <TableCell
                        key={p}
                        className={
                          p === "remora"
                            ? "bg-[#4338ca]/5 text-center font-semibold text-[#4338ca]"
                            : "text-center"
                        }
                      >
                        <CellValue
                          value={row[p]}
                          provider={p}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
