"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";

function AnimatedCounter({
  end,
  suffix,
  prefix = "",
  duration = 2000,
}: {
  end: number;
  suffix: string;
  prefix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const stats = [
  { end: 12, prefix: "$", suffix: "M+ Processed" },
  { end: 2500, prefix: "", suffix: "+ Contractors Paid" },
  { end: 7, prefix: "", suffix: " Countries" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#DBFF5B]/5 to-transparent">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pb-24 sm:pt-20 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text content */}
          <div className="max-w-xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0}
            >
              <span className="inline-block rounded-full bg-[#DBFF5B]/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-[#DBFF5B] uppercase">
                Built for African Payroll
              </span>
            </motion.div>

            <motion.h1
              className="mt-6 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={1}
            >
              Pay your African contractors in minutes, not days.{" "}
              <span className="text-[#22c55e]">Save 80% on fees.</span>
            </motion.h1>

            <motion.p
              className="mt-6 text-lg leading-relaxed text-muted-foreground"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={2}
            >
              Bulk payroll to 7 African countries. Compliance-ready with W-8BEN
              collection. Deliver via mobile money, bank transfer, or local
              wallets — contractors get paid in under an hour.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={3}
            >
              <Button
                size="lg"
                className="h-12 gap-2 rounded-xl bg-[#DBFF5B] px-6 text-base font-bold text-[#0a0a0a] hover:bg-[#c8ec4a]"
                render={<Link href="/dashboard" />}
              >
                Start Paying Contractors
                <ArrowRight className="size-4" />
              </Button>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#DBFF5B] transition-colors hover:text-[#DBFF5B]/80"
              >
                See How It Works
                <ChevronDown className="size-4" />
              </a>
            </motion.div>
          </div>

          {/* Hero image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
          >
            <div className="overflow-hidden rounded-2xl shadow-2xl shadow-[#DBFF5B]/10">
              <Image
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80"
                alt="African professionals working remotely"
                width={1200}
                height={800}
                unoptimized={true}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Animated counters */}
        <motion.div
          className="mt-16 grid grid-cols-1 gap-8 border-t pt-10 sm:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {stats.map((stat) => (
            <div key={stat.suffix} className="text-center">
              <p className="text-3xl font-bold text-[#DBFF5B] sm:text-4xl">
                <AnimatedCounter
                  end={stat.end}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
