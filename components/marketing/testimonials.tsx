"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "We were spending $3,200/month just on wire transfer fees to our 15 developers in Nigeria and Kenya. Remora cut that to under $500. The switch paid for itself in the first week.",
    name: "Sarah Chen",
    title: "CTO, Stackflow",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    quote:
      "Our contractors used to wait 3-5 days for payments to clear. Now they get paid the same day we run payroll. Retention went up 40% in six months.",
    name: "James Okonkwo",
    title: "Head of Ops, NovaBridge Agency",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    quote:
      "The M-Pesa integration is a game-changer. Half our Kenyan team doesn't even have traditional bank accounts. Remora just works for everyone.",
    name: "Priya Sharma",
    title: "CEO, RemoteFirst Labs",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" as const },
  }),
};

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Loved by Teams Worldwide
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-muted-foreground">
            Companies saving thousands every month on African contractor
            payments.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              variants={fadeUp}
              custom={i}
            >
              <Card className="h-full border-0 shadow-md">
                <CardContent className="flex h-full flex-col pt-6">
                  <div className="mb-3 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="size-4 fill-[#DBFF5B] text-[#DBFF5B]"
                      />
                    ))}
                  </div>
                  <blockquote className="flex-1 text-sm leading-relaxed text-muted-foreground">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="mt-6 flex items-center gap-3 border-t pt-4">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      width={40}
                      height={40}
                      unoptimized={true}
                      className="rounded-full"
                    />
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {t.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{t.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
