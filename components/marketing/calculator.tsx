"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Calculator as CalcIcon } from "lucide-react";

const FEE_RATES = {
  remora: 0.015,
  wire: 0.065,
  paypal: 0.05,
  payoneer: 0.03,
};

export function Calculator() {
  const [contractors, setContractors] = useState(10);
  const [avgPayment, setAvgPayment] = useState(2000);

  const annualVolume = contractors * avgPayment * 12;
  const remoraCost = annualVolume * FEE_RATES.remora;
  const wireCost = annualVolume * FEE_RATES.wire;
  const paypalCost = annualVolume * FEE_RATES.paypal;
  const payoneerCost = annualVolume * FEE_RATES.payoneer;

  const wireSavings = wireCost - remoraCost;
  const paypalSavings = paypalCost - remoraCost;
  const payoneerSavings = payoneerCost - remoraCost;

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <section id="calculator" className="bg-gradient-to-b from-transparent to-[#4338ca]/5 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            See How Much You&apos;ll Save
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-muted-foreground">
            Calculate your annual savings compared to traditional payment methods.
          </p>
        </div>

        <div className="mt-12 grid items-start gap-8 lg:grid-cols-2">
          {/* Inputs */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <CalcIcon className="size-5 text-[#4338ca]" />
                Your Team
              </CardTitle>
              <CardDescription>
                Adjust the sliders to match your payroll
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">
                    Number of contractors
                  </label>
                  <span className="text-sm font-semibold text-[#4338ca]">
                    {contractors}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={200}
                  value={contractors}
                  onChange={(e) => setContractors(Number(e.target.value))}
                  className="mt-2 w-full accent-[#4338ca]"
                />
                <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                  <span>1</span>
                  <span>200</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-foreground">
                    Avg. monthly payment (USD)
                  </label>
                  <span className="text-sm font-semibold text-[#4338ca]">
                    {fmt(avgPayment)}
                  </span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={10000}
                  step={100}
                  value={avgPayment}
                  onChange={(e) => setAvgPayment(Number(e.target.value))}
                  className="mt-2 w-full accent-[#4338ca]"
                />
                <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                  <span>$100</span>
                  <span>$10,000</span>
                </div>
              </div>

              <div className="rounded-lg bg-muted/50 p-4">
                <p className="text-sm text-muted-foreground">Annual payroll volume</p>
                <p className="text-2xl font-bold text-foreground">{fmt(annualVolume)}</p>
              </div>
            </CardContent>
          </Card>

          {/* Savings output */}
          <div className="space-y-4">
            <Card className="border-2 border-[#22c55e]/30 shadow-lg">
              <CardContent className="pt-6">
                <p className="text-sm font-medium text-muted-foreground">
                  Your annual savings with Remora
                </p>
                <p className="mt-2 text-5xl font-extrabold text-[#22c55e]">
                  {fmt(wireSavings)}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  vs. international wire transfers
                </p>
              </CardContent>
            </Card>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="border-0 shadow-md">
                <CardContent className="pt-6">
                  <p className="text-xs font-medium text-muted-foreground">vs. PayPal</p>
                  <p className="mt-1 text-2xl font-bold text-[#22c55e]">
                    {fmt(paypalSavings)}
                  </p>
                  <p className="text-xs text-muted-foreground">saved/year</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md">
                <CardContent className="pt-6">
                  <p className="text-xs font-medium text-muted-foreground">vs. Payoneer</p>
                  <p className="mt-1 text-2xl font-bold text-[#22c55e]">
                    {fmt(payoneerSavings)}
                  </p>
                  <p className="text-xs text-muted-foreground">saved/year</p>
                </CardContent>
              </Card>
            </div>

            <div className="rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Remora fee:</strong>{" "}
                {fmt(remoraCost)}/year ({(FEE_RATES.remora * 100).toFixed(1)}%)
              </p>
              <p className="mt-1">
                <strong className="text-foreground">Wire fee:</strong>{" "}
                {fmt(wireCost)}/year ({(FEE_RATES.wire * 100).toFixed(1)}% avg incl. FX markup)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
