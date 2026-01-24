"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Wallet, TrendingUp, Shield, Users, Globe } from "lucide-react"
import { useRouter } from "next/navigation"
import { useApp } from "@/lib/app-context"
import { useEffect } from "react"

export default function LandingPage() {
  const router = useRouter()
  const { isLoggedIn } = useApp()

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard")
    }
  }, [isLoggedIn, router])

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden selection:bg-orange-500 selection:text-black">
      {/* Navigation */}
      <nav className="border-b border-white/5 sticky top-0 z-50 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="font-black text-2xl italic tracking-tighter">
            JetrPay<span className="text-orange-500">.</span>
          </div>
          <div className="hidden md:flex gap-8 items-center text-[10px] font-bold uppercase tracking-widest">
            <a href="#features" className="text-neutral-400 hover:text-white transition">
              Features
            </a>
            <a href="#privacy" className="text-neutral-400 hover:text-white transition">
              Privacy
            </a>
            <a href="#compliance" className="text-neutral-400 hover:text-white transition">
              Compliance
            </a>
            <a href="/roadmap" className="text-neutral-400 hover:text-white transition">
              Roadmap
            </a>
          </div>
          <Button
            onClick={() => router.push("/onboarding")}
            className="bg-orange-500 hover:bg-orange-600 text-black font-black uppercase text-xs tracking-widest rounded-none h-10"
          >
            Launch MVP
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-900/20 via-black to-black" />
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-orange-500/30 bg-orange-500/5 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <p className="text-orange-500 font-black uppercase text-[10px] tracking-widest">
              Live on Solana Devnet
            </p>
          </div>

          <h1 className="text-6xl sm:text-7xl lg:text-9xl font-black italic tracking-tighter leading-none text-balance">
            PAYROLL IN
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600">
              GHOST MODE
            </span>
          </h1>

          <p className="text-xl text-neutral-400 max-w-2xl mx-auto text-balance leading-relaxed">
            The first compliance-aware privacy layer for real-time payments. 
            Stream salaries confidentially using <span className="text-white font-bold">Token-2022</span> and <span className="text-white font-bold">Range Protocol</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button
              onClick={() => router.push("/onboarding")}
              className="bg-white hover:bg-neutral-200 text-black font-black uppercase text-xs tracking-widest rounded-none h-14 px-8"
            >
              Start Shieldimg <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              className="border-neutral-800 text-white hover:bg-white/5 font-black uppercase text-xs tracking-widest rounded-none h-14 px-8 bg-transparent"
            >
              View Architecture
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/5 mt-12 bg-black/50 backdrop-blur-sm">
            <div className="p-4">
              <p className="text-2xl font-black text-orange-500">SPL-22</p>
              <p className="text-[9px] text-neutral-500 font-bold uppercase mt-1">Confidential Standard</p>
            </div>
            <div className="p-4">
              <p className="text-2xl font-black text-cyan-400">Zero</p>
              <p className="text-[9px] text-neutral-500 font-bold uppercase mt-1">Knowledge Proofs</p>
            </div>
            <div className="p-4">
              <p className="text-2xl font-black text-white">Range</p>
              <p className="text-[9px] text-neutral-500 font-bold uppercase mt-1">Protocol Secured</p>
            </div>
            <div className="p-4">
              <p className="text-2xl font-black text-green-500">~400ms</p>
              <p className="text-[9px] text-neutral-500 font-bold uppercase mt-1">Settlement Time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Feature Section */}
      <section id="privacy" className="py-24 border-b border-white/5 bg-neutral-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <Shield className="w-6 h-6 text-orange-500" />
                </div>
                <h2 className="text-xs font-black uppercase tracking-widest text-orange-500">Privacy First</h2>
              </div>
              <h3 className="text-4xl sm:text-5xl font-black italic tracking-tighter mb-6">
                What Happens on Chain, <br/>Stays Encrypted.
              </h3>
              <p className="text-neutral-400 text-lg mb-8 leading-relaxed">
                Traditional payroll on public blockchains exposes every employee's salary to the world. JetrPay uses 
                Solana's <strong>Token-2022 Confidential Transfer</strong> extension to encrypt balances and transfer amounts using Zero-Knowledge proofs.
              </p>
              <ul className="space-y-4">
                {[
                  "ElGamal Encryption for wallet balances",
                  "Twisted ElGamal for transaction amounts",
                  "Auditor View Keys for regulatory compliance",
                  "Ghost Mode UI to prevent shoulder surfing"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-neutral-300">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-cyan-400/20 blur-xl opacity-50" />
              <div className="relative border border-white/10 bg-black p-8 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-neutral-800 rounded-full animate-pulse" />
                    <div className="space-y-2">
                      <div className="w-24 h-2 bg-neutral-800 rounded" />
                      <div className="w-16 h-2 bg-neutral-800 rounded" />
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-green-500/10 text-green-500 text-[10px] font-black uppercase rounded">
                    Encrypted
                  </div>
                </div>
                <div className="space-y-4 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Transfer Amount:</span>
                    <span className="blur-sm select-none text-white">12,500.00 USDC</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Recipient:</span>
                    <span className="text-orange-500">Encrypted Key</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Proof:</span>
                    <span className="text-cyan-400 truncate w-32">zk-snark-valid...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section id="compliance" className="py-24 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 bg-white/5 rounded-full mb-8">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black italic tracking-tighter mb-6">
            Compliance Built-In.<br />Not Bolted On.
          </h2>
          <p className="text-xl text-neutral-400 mb-12">
            The "Tornado Cash" problem is solved. JetrPay integrates <strong>Range Protocol</strong> to screen wallets 
            before they can enter the privacy pool. Illicit funds are rejected at the gate.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 border border-white/5 hover:border-orange-500/50 transition bg-black">
              <h3 className="text-white font-black uppercase text-sm mb-2">1. Connect</h3>
              <p className="text-neutral-500 text-xs">User connects wallet. Range Protocol API is triggered instantly.</p>
            </div>
            <div className="p-6 border border-white/5 hover:border-orange-500/50 transition bg-black">
              <h3 className="text-white font-black uppercase text-sm mb-2">2. Screen</h3>
              <p className="text-neutral-500 text-xs">Wallet risk score analyzes tx history and sanctions list presence.</p>
            </div>
            <div className="p-6 border border-white/5 hover:border-orange-500/50 transition bg-black">
              <h3 className="text-white font-black uppercase text-sm mb-2">3. Shield</h3>
              <p className="text-neutral-500 text-xs">Only Low-Risk wallets (Score &lt; 50) can mint Confidential Tokens.</p>
            </div>
          </div>
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
