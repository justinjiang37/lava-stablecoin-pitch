"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/marketing/hero";
import { Calculator } from "@/components/marketing/calculator";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { Countries } from "@/components/marketing/countries";
import { Comparison } from "@/components/marketing/comparison";
import { Testimonials } from "@/components/marketing/testimonials";
import { Pricing } from "@/components/marketing/pricing";
import { TrustSignals } from "@/components/marketing/trust-signals";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col" style={{ scrollBehavior: "smooth" }}>
      <Navbar variant="marketing" />
      <main className="flex-1">
        <Hero />
        <TrustSignals />
        <HowItWorks />
        <Calculator />
        <Countries />
        <Comparison />
        <Testimonials />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
