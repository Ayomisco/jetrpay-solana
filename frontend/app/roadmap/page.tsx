"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, CheckCircle, Circle, Clock } from "lucide-react"

export default function RoadmapPage() {
  const quarters = [
    {
      quarter: "Q1 2026",
      status: "completed",
      title: "Foundation & MVP",
      items: [
        { done: true, text: "Token-2022 confidential transfer integration" },
        { done: true, text: "Range Protocol compliance screening" },
        { done: true, text: "Real-time payroll streaming engine" },
        { done: true, text: "Solana devnet deployment" },
        { done: true, text: "Ghost Mode privacy UI" },
      ]
    },
    {
      quarter: "Q2 2026",
      status: "in-progress",
      title: "Mainnet & Scale",
      items: [
        { done: false, text: "Solana mainnet migration" },
        { done: false, text: "Multi-signature treasury support" },
        { done: false, text: "Automated payroll tax calculations" },
        { done: false, text: "Mobile app (React Native)" },
        { done: false, text: "10,000+ employee stress testing" },
      ]
    },
    {
      quarter: "Q3 2026",
      status: "planned",
      title: "Cross-Chain & Compliance",
      items: [
        { done: false, text: "Ethereum L2 support (Arbitrum, Optimism)" },
        { done: false, text: "OFAC/EU sanctions auto-screening" },
        { done: false, text: "Audit trail exports (SOC2 compliant)" },
        { done: false, text: "Fiat on/off-ramps (Stripe, MoonPay)" },
        { done: false, text: "API for third-party integrations" },
      ]
    },
    {
      quarter: "Q4 2026",
      status: "planned",
      title: "Enterprise & Global",
      items: [
        { done: false, text: "Multi-currency support (EUR, GBP, JPY)" },
        { done: false, text: "Advanced analytics dashboard" },
        { done: false, text: "White-label solutions for enterprises" },
        { done: false, text: "Global payroll compliance (50+ countries)" },
        { done: false, text: "Hardware wallet integration (Ledger)" },
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <nav className="border-b border-white/5 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition text-sm font-bold uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-orange-500/30 bg-orange-500/5 rounded-full mb-6">
            <Clock className="w-4 h-4 text-orange-500" />
            <p className="text-orange-500 font-black uppercase text-[10px] tracking-widest">
              Product Roadmap
            </p>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-6">
            Building the Future of
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-cyan-500">
              Private Payroll
            </span>
          </h1>
          
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Our journey from hackathon project to production-ready enterprise solution.
          </p>
        </div>
      </section>

      {/* Roadmap Timeline */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {quarters.map((quarter, index) => (
              <div key={index} className="relative">
                {/* Timeline Line */}
                {index !== quarters.length - 1 && (
                  <div className="absolute left-6 top-20 bottom-0 w-px bg-white/10 hidden md:block" />
                )}
                
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Quarter Badge */}
                  <div className="flex-shrink-0">
                    <div className={`
                      w-48 h-20 flex items-center justify-center border-2 relative
                      ${quarter.status === 'completed' ? 'border-green-500 bg-green-500/10' : 
                        quarter.status === 'in-progress' ? 'border-orange-500 bg-orange-500/10' : 
                        'border-white/20 bg-white/5'}
                    `}>
                      <div className="text-center">
                        <p className={`text-2xl font-black ${
                          quarter.status === 'completed' ? 'text-green-500' : 
                          quarter.status === 'in-progress' ? 'text-orange-500' : 
                          'text-white'
                        }`}>
                          {quarter.quarter}
                        </p>
                        <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-500">
                          {quarter.status}
                        </p>
                      </div>
                      
                      {/* Status Icon */}
                      <div className={`absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center
                        ${quarter.status === 'completed' ? 'bg-green-500' : 
                          quarter.status === 'in-progress' ? 'bg-orange-500 animate-pulse' : 
                          'bg-neutral-800 border border-white/20'}
                      `}>
                        {quarter.status === 'completed' ? (
                          <CheckCircle className="w-4 h-4 text-black" />
                        ) : (
                          <Circle className="w-2 h-2 fill-white text-white" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <Card className="flex-1 bg-black border-white/10 p-8">
                    <h3 className="text-2xl font-black italic text-white mb-6">
                      {quarter.title}
                    </h3>
                    
                    <ul className="space-y-4">
                      {quarter.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                            item.done ? 'text-green-500' : 'text-neutral-600'
                          }`}>
                            {item.done ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : (
                              <Circle className="w-5 h-5" />
                            )}
                          </div>
                          <span className={`font-mono text-sm ${
                            item.done ? 'text-white line-through' : 'text-neutral-300'
                          }`}>
                            {item.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black italic mb-6">Want to shape our roadmap?</h2>
          <p className="text-neutral-400 mb-8">
            We're building this for the crypto community. Join our Discord to suggest features and vote on priorities.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild className="bg-orange-500 hover:bg-orange-600 text-black font-black uppercase text-xs tracking-widest rounded-none h-12 px-8">
              <Link href="/onboarding">Try the Demo</Link>
            </Button>
            <Button asChild variant="outline" className="border-white/20 hover:bg-white/5 font-black uppercase text-xs tracking-widest rounded-none h-12 px-8">
              <Link href="https://github.com" target="_blank">View on GitHub</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[10px] text-neutral-600 font-bold uppercase">
            © 2026 JetrPay Privacy Labs. Roadmap subject to change.
          </p>
        </div>
      </footer>
    </div>
  )
}
