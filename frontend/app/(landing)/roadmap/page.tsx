"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Circle } from "lucide-react"

export default function RoadmapPage() {
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
          <h1 className="text-5xl sm:text-6xl font-black italic tracking-tighter">Product Roadmap</h1>
          <p className="text-neutral-400 mt-4 max-w-2xl">Constructing the privacy layer for the future of work.</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-12">
          {/* Q1 2026 */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black italic tracking-tighter text-orange-500">Q1 2026 — The Privacy Sprint</h2>
            <div className="space-y-3">
              {[
                { item: "Solana Privacy Hackathon MVP", completed: true },
                { item: "Token-2022 Confidential Transfer Integration", completed: true },
                { item: "Ghost Mode UI (Blur Sensitive Data)", completed: true },
                { item: "Range Protocol Compliance Gate (Mock)", completed: true },
              ].map((feature, i) => (
                <div key={i} className="flex gap-4 items-start p-4 bg-[#0f0f0f] border border-neutral-800 rounded-none">
                  {feature.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <Circle className="w-5 h-5 text-neutral-600 flex-shrink-0 mt-0.5" />
                  )}
                  <span className={feature.completed ? "text-neutral-400 line-through" : "text-white"}>
                    {feature.item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Q2 2026 */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black italic tracking-tighter text-cyan-400">Q2 2026 — Security & Compliance</h2>
            <div className="space-y-3">
              {[
                { item: "Mainnet Deployment (Helius Enterprise RPC)", completed: false },
                { item: "Squads Protocol Integration (Multi-Sig Vaults)", completed: false },
                { item: "Auditor Dashboard (View Key Access)", completed: false },
                { item: "Streaming/Vesting Smart Contracts (Anchor)", completed: false },
              ].map((feature, i) => (
                <div key={i} className="flex gap-4 items-start p-4 bg-[#0f0f0f] border border-neutral-800 rounded-none">
                  <Circle className="w-5 h-5 text-neutral-600 flex-shrink-0 mt-0.5" />
                  <span className="text-white">{feature.item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Q3 2026 */}
          <div className="space-y-6">
            <h2 className="text-2xl font-black italic tracking-tighter text-white">Q3 2026 — Global Scale</h2>
            <div className="space-y-3">
              {[
                { item: "Fiat On-Ramp (Stripe Connect)", completed: false },
                { item: "Mobile App (Solana Mobile Stack)", completed: false },
                { item: "Cross-Border Settlement (USDC/EURC)", completed: false },
                { item: "Zero-Knowledge Identity (Civic Integration)", completed: false },
              ].map((feature, i) => (
                <div key={i} className="flex gap-4 items-start p-4 bg-[#0f0f0f] border border-neutral-800 rounded-none">
                  <Circle className="w-5 h-5 text-neutral-600 flex-shrink-0 mt-0.5" />
                  <span className="text-white">{feature.item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feedback CTA */}
        <div className="mt-20 p-12 bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/30 rounded-none text-center space-y-6">
          <h3 className="text-2xl font-black italic tracking-tighter">Help Build JetrPay</h3>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            We are open source. Contribute to our repo or join the discussion.
          </p>
          <Button className="bg-orange-500 hover:bg-orange-600 text-black font-black uppercase text-xs tracking-widest rounded-none h-12 px-8 mx-auto">
            View on GitHub
          </Button>
        </div>
      </div>
    </div>
  )
}
