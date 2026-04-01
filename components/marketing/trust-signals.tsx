"use client";

import { motion } from "framer-motion";
import { Shield, CheckCircle, Landmark, TrendingUp } from "lucide-react";

const signals = [
  {
    icon: Shield,
    label: "SOC 2 Compliant",
    description: "Enterprise-grade security",
  },
  {
    icon: CheckCircle,
    label: "Full KYC/AML",
    description: "Regulatory compliance built in",
  },
  {
    icon: Landmark,
    label: "Licensed MSB",
    description: "Money Services Business",
  },
  {
    icon: TrendingUp,
    label: "$12M+ Processed",
    description: "Trusted by hundreds of teams",
  },
];

export function TrustSignals() {
  return (
    <section className="border-y bg-muted/20 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-2 gap-8 md:grid-cols-4"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {signals.map((signal) => (
            <div
              key={signal.label}
              className="flex flex-col items-center text-center"
            >
              <div className="flex size-12 items-center justify-center rounded-full bg-[#DBFF5B]/10">
                <signal.icon className="size-6 text-[#DBFF5B]" />
              </div>
              <p className="mt-3 text-sm font-semibold text-foreground">
                {signal.label}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {signal.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
