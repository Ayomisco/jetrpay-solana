"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Building2, Briefcase } from "lucide-react"
import { useRouter } from "next/navigation"

export default function UseCasesPage() {
  const router = useRouter()

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
          <h1 className="text-5xl sm:text-6xl font-black italic tracking-tighter">Use Cases</h1>
          <p className="text-neutral-400 mt-4 max-w-2xl">
            Why privacy matters for modern payroll infrastructure.
          </p>
        </div>
      </div>

      {/* Use Cases */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-12">
        {/* Enterprises */}
        <section className="border border-neutral-800 rounded-none overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="p-12 bg-[#0f0f0f] space-y-6">
              <div className="p-3 bg-orange-500/10 border border-orange-500/30 rounded-none w-fit">
                <Building2 className="w-6 h-6 text-orange-500" />
              </div>
              <h2 className="text-3xl font-black italic tracking-tighter">Enterprises & Startups</h2>
              <p className="text-neutral-400">
                **Competitors shouldn't know your burn rate.** Stream salaries confidentially so you don't leak vital 
                business intelligence on the public ledger.
              </p>
              <ul className="space-y-3 text-sm text-neutral-400">
                <li className="flex gap-3">
                  <span className="text-orange-500 font-bold">✓</span>
                  <span>Hide payroll volume from competitors</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-500 font-bold">✓</span>
                  <span>Protect employee salary privacy</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-500 font-bold">✓</span>
                  <span>Compliance-ready audit logs (View Keys)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-orange-500 font-bold">✓</span>
                  <span>Instant settlement via Solana</span>
                </li>
              </ul>
              <Button className="bg-orange-500 hover:bg-orange-600 text-black font-black uppercase text-xs tracking-widest rounded-none h-12 w-full mt-6">
                Start Private Payroll
              </Button>
            </div>
            <div className="bg-gradient-to-br from-orange-500/10 to-transparent p-12 flex items-center justify-center border-l border-neutral-800">
              <div className="space-y-6">
                <div className="p-4 bg-black border border-neutral-800 rounded-none">
                  <p className="text-[10px] font-bold text-neutral-500 uppercase mb-2">Privacy Impact</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span>Data Leaks Prevented</span>
                      <span className="text-orange-500 font-bold">100%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Compliance Score</span>
                      <span className="text-orange-500 font-bold">Passing</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Competitor Visibility</span>
                      <span className="text-orange-500 font-bold">Zero</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Freelancers */}
        <section className="border border-neutral-800 rounded-none overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="bg-gradient-to-br from-cyan-400/10 to-transparent p-12 flex items-center justify-center border-r border-neutral-800 order-2 md:order-1">
              <div className="space-y-6">
                <div className="p-4 bg-black border border-neutral-800 rounded-none">
                  <p className="text-[10px] font-bold text-neutral-500 uppercase mb-2">Freedom to Earn</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span>Identity Exposure</span>
                      <span className="text-cyan-400 font-bold">None</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Wallet History</span>
                      <span className="text-cyan-400 font-bold">Shielded</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Access to Funds</span>
                      <span className="text-cyan-400 font-bold">Instant</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="p-12 bg-[#0f0f0f] space-y-6 order-1 md:order-2">
              <div className="p-3 bg-cyan-400/10 border border-cyan-400/30 rounded-none w-fit">
                <Briefcase className="w-6 h-6 text-cyan-400" />
              </div>
              <h2 className="text-3xl font-black italic tracking-tighter">Freelancers & Contractors</h2>
              <p className="text-neutral-400">
                Your income is your business. Receive payments without revealing your entire wallet balance 
                or transaction history to clients.
              </p>
              <ul className="space-y-3 text-sm text-neutral-400">
                <li className="flex gap-3">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <span>Selective disclosure of financial data</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <span>Connect multiple clients to one shielded vault</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <span>Avoid "Wallet Stalking"</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-cyan-400 font-bold">✓</span>
                  <span>Auto-deposit into savings (Private)</span>
                </li>
              </ul>
              <Button className="bg-cyan-400 hover:bg-cyan-500 text-black font-black uppercase text-xs tracking-widest rounded-none h-12 w-full mt-6">
                Open Shielded Vault
              </Button>
            </div>
          </div>
        </section>

        {/* Case Study */}
        <section className="border border-neutral-800 rounded-none p-12 bg-[#0f0f0f] space-y-8">
          <h2 className="text-3xl font-black italic tracking-tighter">Case Study: Privacy DAO</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Treasury Privacy", value: "Locked", change: "Only members with View Key see balance" },
              { label: "Contributor Payments", value: "Confidential", change: "No publicsalary dox" },
              {
                label: "Regulatory Risk",
                value: "Mitigated",
                change: "Via Range Protocol Screening",
              },
            ].map((stat, i) => (
              <div key={i} className="p-6 border border-neutral-800 rounded-none space-y-3">
                <p className="text-[10px] font-bold text-neutral-500 uppercase">{stat.label}</p>
                <p className="text-3xl font-black text-orange-500">{stat.value}</p>
                <p className="text-[9px] text-neutral-500 font-bold">{stat.change}</p>
              </div>
            ))}
          </div>
          <p className="text-neutral-400">
            "We needed a way to pay contributors globally without exposing our entire treasury strategy. JetrPay was the only solution that offered both privacy and compliance."
          </p>
          <p className="font-black text-white">— Core Contributor, Privacy DAO</p>
        </section>
      </div>

      {/* Footer CTA */}
      <section className="border-t border-white/5 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl font-black italic tracking-tighter">Ready to Start?</h2>
          <Button
            onClick={() => (window.location.href = "/onboarding")}
            className="bg-orange-500 hover:bg-orange-600 text-black font-black uppercase text-xs tracking-widest rounded-none h-14 px-8 mx-auto"
          >
            Launch JetrPay Now <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  )
}
