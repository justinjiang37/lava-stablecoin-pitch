"use client";

import { motion } from "framer-motion";
import { UserPlus, Calendar, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    icon: UserPlus,
    title: "Add your contractors",
    description:
      "Onboard contractors in minutes. Add their preferred payout method — mobile money, bank transfer, or local wallet — and we handle the rest.",
    step: "01",
  },
  {
    icon: Calendar,
    title: "Set up payroll",
    description:
      "Run one-time payments, set up recurring schedules, or process bulk payroll for your entire team. Full compliance with W-8BEN collection built in.",
    step: "02",
  },
  {
    icon: Zap,
    title: "Contractors get paid",
    description:
      "Contractors receive local currency in under 1 hour. Real-time tracking for you, instant notifications for them. No hidden fees, no surprises.",
    step: "03",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" as const },
  }),
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-muted-foreground">
            Get set up in under 10 minutes. Start paying contractors today.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={i}
            >
              <Card className="group relative h-full border-0 shadow-md transition-shadow hover:shadow-lg">
                <CardContent className="pt-8 pb-6">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-[#DBFF5B]/10">
                      <step.icon className="size-6 text-[#DBFF5B]" />
                    </div>
                    <span className="text-3xl font-extrabold text-[#DBFF5B]/15">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
