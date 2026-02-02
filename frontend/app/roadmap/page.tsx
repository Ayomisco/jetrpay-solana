"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, Circle, ArrowRight } from "lucide-react"

export default function RoadmapPage() {
  const quarters = [
    {
      quarter: "Q1 2026",
      status: "In Progress",
      color: "orange",
      milestones: [
        { done: true, text: "Hackathon MVP & Demo Platform" },
        { done: true, text: "Token-2022 Confidential Transfer Integration" },
        { done: true, text: "Range Protocol Compliance Screening" },
        { done: false, text: "Security Audit (Audit Firm TBD)" },
        { done: false, text: "Mainnet Beta Launch" },
        { done: false, text: "First 10 Enterprise Pilot Partners" }
      ]
    },
    {
      quarter: "Q2 2026",
      status: "Planned",
      color: "cyan",
      milestones: [
        { done: false, text: "Mobile App (iOS & Android)" },
        { done: false, text: "Fiat On/Off-Ramp Integration (Stripe, Circle)" },
        { done: false, text: "Multi-Token Support (USDT, EURC)" },
        { done: false, text: "Automated Tax Reporting (1099/W-2 Generation)" },
        { done: false, text: "Public Mainnet Launch" },
        { done: false, text: "100+ Active Companies" }
      ]
    },
    {
      quarter: "Q3 2026",
      status: "Planned",
      color: "purple",
      milestones: [
        { done: false, text: "Enterprise Dashboard & Analytics" },
        { done: false, text: "Payroll Scheduling Automation (Biweekly, Monthly)" },
        { done: false, text: "HR Platform Integrations (Gusto, Rippling)" },
        { done: false, text: "Multi-Sig Wallet Support for Enterprise" },
        { done: false, text: "API for Third-Party Developers" },
        { done: false, text: "1,000+ DAOs & Web3 Companies Onboarded" }
      ]
    },
    {
      quarter: "Q4 2026",
      status: "Vision",
      color: "green",
      milestones: [
        { done: false, text: "Cross-Chain Privacy (Arbitrum, Base via LayerZero)" },
        { done: false, text: "Institutional Grade Custody Integration" },
        { done: false, text: "Compliance Reporting Dashboard for Regulators" },
        { done: false, text: "Global Payroll (50+ Countries, Local Currencies)" },
        { done: false, text: "Series A Funding Round" },
        { done: false, text: "10,000+ Companies, $1B+ in Payroll Volume" }
      ]
    }
  ]

  const colorMap: Record<string, string> = {
    orange: "border-orange-500/50 bg-orange-500/5",
    cyan: "border-cyan-500/50 bg-cyan-500/5",
    purple: "border-purple-500/50 bg-purple-500/5",
    green: "border-green-500/50 bg-green-500/5"
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden selection:bg-orange-500/30">
      {/* Navigation */}
      <nav className="border-b border-white/5 sticky top-0 z-50 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="font-black text-2xl italic tracking-tighter">
            JetrPay<span className="text-orange-500">.</span>
          </Link>
          <Button
            asChild
            className="bg-orange-500 hover:bg-orange-600 text-black font-black uppercase text-xs tracking-widest rounded-none h-10"
          >
            <Link href="/onboarding">Launch MVP</Link>
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-24 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-orange-500/30 bg-orange-500/5 rounded-full">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <p className="text-orange-500 font-black uppercase text-[10px] tracking-widest">
              Building in Public
            </p>
          </div>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter">
            Product Roadmap
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Our journey from hackathon MVP to the privacy-first payroll standard for Web3.
          </p>
        </div>
      </section>

      {/* Roadmap Timeline */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {quarters.map((q, i) => (
            <Card key={i} className={`bg-black border ${colorMap[q.color]} p-8 rounded-none`}>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-black italic tracking-tight">{q.quarter}</h2>
                  <p className="text-sm text-neutral-500 uppercase tracking-widest font-bold mt-1">
                    {q.status}
                  </p>
                </div>
                <div className={`px-4 py-2 border border-${q.color}-500/50 bg-${q.color}-500/10 rounded-lg`}>
                  <p className={`text-${q.color}-500 font-mono text-xs font-black uppercase`}>
                    {q.milestones.filter(m => m.done).length}/{q.milestones.length} Complete
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {q.milestones.map((m, j) => (
                  <div key={j} className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
                    {m.done ? (
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="w-5 h-5 text-neutral-600 flex-shrink-0 mt-0.5" />
                    )}
                    <p className={`text-sm font-bold ${m.done ? 'text-white' : 'text-neutral-400'}`}>
                      {m.text}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-black italic tracking-tight">
            Want to Shape the Future?
          </h2>
          <p className="text-xl text-neutral-400">
            Join our pilot program and get early access to privacy-first payroll.
          </p>
          <Button
            size="lg"
            asChild
            className="bg-white hover:bg-neutral-200 text-black font-black uppercase text-sm tracking-widest rounded-none h-16 px-12"
          >
            <Link href="/onboarding">
              Get Started <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full" />
            <p className="text-[10px] text-neutral-500 font-bold uppercase">Systems Operational</p>
          </div>
          <p className="text-[10px] text-neutral-600 font-bold uppercase">
            © 2026 JetrPay Privacy Labs. Built for Solana Hackathon.
          </p>
        </div>
      </footer>
    </div>
  )
}
