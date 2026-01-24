"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-orange-500 selection:text-black">
      {/* Header */}
      <div className="border-b border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-neutral-400 hover:text-white text-[10px] font-bold uppercase mb-6 inline-block"
          >
            ← Back to Home
          </Link>
          <h1 className="text-5xl sm:text-6xl font-black italic tracking-tighter">Pricing</h1>
          <p className="text-neutral-400 mt-4 max-w-2xl">Compliance-aware privacy doesn't have to be expensive.</p>
        </div>
      </div>

      {/* Pricing Table */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Public",
              desc: "Standard SPL Transfers",
              price: "Free",
              period: "Forever",
              features: ["Public Ledger Payments", "Unlimited Transactions", "Basic Dashboard", "Community Support"],
              cta: "Start Public",
              highlight: false,
            },
            {
              name: "Ghost",
              desc: "Token-2022 Confidentiality",
              price: "$49",
              period: "/month",
              features: [
                "Encrypted Balances",
                "Confidential Transfers (Zero-Knowledge)",
                "Ghost Mode UI Access",
                "Range Protocol Screening (Basic)",
                "Priority Support",
              ],
              cta: "Go Private",
              highlight: true,
            },
            {
              name: "Enterprise",
              desc: "Regulatory Compliance",
              price: "Custom",
              period: "pricing",
              features: [
                "Auditor View Keys",
                "Custom Compliance Gates",
                "Multi-Sig Vault (Squads)",
                "Dedicated Account Manager",
                "SLA Guarantee",
                "Fiat On-Ramp Integration",
              ],
              cta: "Contact Sales",
              highlight: false,
            },
          ].map((plan, i) => (
            <div
              key={i}
              className={`rounded-none border p-8 space-y-6 ${
                plan.highlight
                  ? "bg-gradient-to-br from-orange-500/10 to-transparent border-orange-500/50 relative"
                  : "bg-[#0f0f0f] border-neutral-800"
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 right-0 bg-orange-500 text-black px-4 py-1 text-[9px] font-black uppercase tracking-widest">
                  Hackathon Finalist
                </div>
              )}
              <div>
                <h3 className="text-xl font-black tracking-tighter">{plan.name}</h3>
                <p className="text-[10px] text-neutral-500 font-bold uppercase mt-1">{plan.desc}</p>
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black">{plan.price}</span>
                  <span className="text-[10px] text-neutral-500 font-bold uppercase">{plan.period}</span>
                </div>
              </div>
              <ul className="space-y-3">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex gap-3 text-sm">
                    <Check className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full font-black uppercase text-xs tracking-widest rounded-none h-12 ${
                  plan.highlight
                    ? "bg-orange-500 hover:bg-orange-600 text-black"
                    : "border border-neutral-800 text-white hover:bg-white/5 bg-transparent"
                }`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-2xl mx-auto space-y-8">
          <h2 className="text-3xl font-black italic tracking-tighter text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Is the Confidential Transfer really private?", a: "Yes. It uses ElGamal encryption and Zero-Knowledge proofs standard in Token-2022." },
              { q: "What is Range Protocol screening?", a: "We check all outgoing/incoming wallets against AML lists to ensure you don't interact with illicit actors." },
              { q: "Can I upgrade from Public to Ghost?", a: "Instantly. Just shield your assets to switch modes." },
              { q: "Do auditors have access?", a: "Only if you grant them a specific View Key. You retain full control." },
            ].map((faq, i) => (
              <div key={i} className="p-4 bg-[#0f0f0f] border border-neutral-800 rounded-none space-y-2">
                <p className="font-black uppercase tracking-tight">{faq.q}</p>
                <p className="text-neutral-400 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
