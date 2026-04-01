"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PRICING_TIERS } from "@/lib/constants";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" as const },
  }),
};

export function Pricing() {
  return (
    <section id="pricing" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-muted-foreground">
            No hidden FX markups. No surprise fees. Just straightforward pricing.
          </p>
          <div className="mt-4 inline-block rounded-full bg-[#DBFF5B]/10 px-5 py-2 text-sm font-semibold text-[#DBFF5B]">
            Compare to the hidden 5-8% you&apos;re paying now
          </div>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {PRICING_TIERS.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              variants={fadeUp}
              custom={i}
            >
              <Card
                className={`relative h-full border-0 shadow-md ${
                  tier.highlighted
                    ? "ring-2 ring-[#DBFF5B] shadow-lg"
                    : ""
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#DBFF5B] px-4 py-1 text-xs font-bold text-[#0a0a0a]">
                    Most Popular
                  </div>
                )}
                <CardHeader className="pb-2 pt-6">
                  <CardTitle className="text-lg">{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col">
                  <div className="mb-6">
                    <span className="text-4xl font-extrabold text-foreground">
                      {tier.price}
                    </span>
                    <span className="ml-1 text-sm text-muted-foreground">
                      {tier.priceDetail}
                    </span>
                    {tier.monthly !== "Custom" && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {tier.monthly === "Free"
                          ? "No monthly fee"
                          : `+ ${tier.monthly}`}
                      </p>
                    )}
                  </div>

                  <ul className="mb-8 flex-1 space-y-3">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <Check className="mt-0.5 size-4 shrink-0 text-[#22c55e]" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={
                      tier.highlighted
                        ? "h-10 w-full bg-[#DBFF5B] text-[#0a0a0a] font-bold hover:bg-[#c8ec4a]"
                        : "h-10 w-full"
                    }
                    variant={tier.highlighted ? "default" : "outline"}
                    render={<Link href="/dashboard" />}
                  >
                    {tier.cta}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
