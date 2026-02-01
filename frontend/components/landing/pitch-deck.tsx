"use client"

import { useState, useEffect } from "react"
import { ArrowRight, ArrowLeft, Shield, Zap, Lock, CheckCircle, ExternalLink, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

const slides = [
  {
    id: "hook",
    title: "THE PRIVACY CRISIS",
    content: (
      <div className="text-center max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase italic leading-[0.9]">
          Payroll is <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Public</span>.
        </h1>
        <p className="text-xl md:text-3xl text-neutral-400 font-bold uppercase tracking-widest max-w-2xl mx-auto">
          Every salary. Every bonus. Every side hustle. Visible to everyone.
        </p>
        <div className="pt-12">
           <div className="inline-block border border-orange-500/30 bg-orange-500/10 px-6 py-2 rounded-full">
              <span className="text-orange-500 font-mono font-bold tracking-widest uppercase text-sm">🛑 THE $300B PROBLEM</span>
           </div>
        </div>
      </div>
    )
  },
  {
    id: "problem",
    title: "WHY IT MATTERS",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto w-full animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
        <Card className="bg-black/50 border-white/10 p-8 flex flex-col items-center text-center space-y-6 hover:border-orange-500/50 transition-colors group backdrop-blur-sm">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-orange-500/10 transition-colors">
                <Shield className="w-10 h-10 text-neutral-500 group-hover:text-orange-500 transition-colors" />
            </div>
            <h3 className="text-2xl font-black text-white uppercase italic">Zero Privacy</h3>
            <p className="text-neutral-500 font-mono text-sm leading-relaxed">
                Employers track your DeFi activity. Coworkers see your raise before you do.
            </p>
        </Card>
        <Card className="bg-black/50 border-white/10 p-8 flex flex-col items-center text-center space-y-6 hover:border-red-500/50 transition-colors group backdrop-blur-sm">
            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-red-500/10 transition-colors">
                <Lock className="w-10 h-10 text-neutral-500 group-hover:text-red-500 transition-colors" />
            </div>
            <h3 className="text-2xl font-black text-white uppercase italic">Targeted Attacks</h3>
            <p className="text-neutral-500 font-mono text-sm leading-relaxed">
                High-net-worth wallets distinctively marked for criminals and scammers.
            </p>
        </Card>
        <Card className="bg-black/50 border-white/10 p-8 flex flex-col items-center text-center space-y-6 hover:border-cyan-500/50 transition-colors group backdrop-blur-sm">
             <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/10 transition-colors">
                <Zap className="w-10 h-10 text-neutral-500 group-hover:text-cyan-500 transition-colors" />
            </div>
            <h3 className="text-2xl font-black text-white uppercase italic">73% Unhappy</h3>
            <p className="text-neutral-500 font-mono text-sm leading-relaxed">
                Of crypto workers would take a PAY CUT just to have financial privacy.
            </p>
        </Card>
      </div>
    )
  },
  {
    id: "solution",
    title: "THE SOLUTION",
    content: (
      <div className="max-w-5xl mx-auto w-full space-y-12 animate-in fade-in zoom-in-95 duration-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative">
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-orange-500/20 via-cyan-500/20 to-green-500/20 -z-10" />

              <div className="bg-black border border-white/10 p-8 w-full md:w-1/3 text-center relative z-10 transition-all hover:scale-105 duration-300">
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-black font-black text-xs px-2 py-1 uppercase tracking-widest">Step 1</span>
                  <h3 className="text-xl font-black text-white uppercase mb-2">Shield</h3>
                  <p className="text-xs text-neutral-500 font-mono uppercase">Token-2022 Encryption</p>
                  <p className="mt-4 text-xs text-neutral-400">Public USDC &rarr; Encrypted</p>
              </div>

              <div className="bg-black border border-cyan-500/50 p-8 w-full md:w-1/3 text-center relative z-10 shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all hover:scale-110 duration-300">
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-500 text-black font-black text-xs px-2 py-1 uppercase tracking-widest">Core Engine</span>
                  <h3 className="text-2xl font-black text-white uppercase mb-2 italic">Stream</h3>
                  <p className="text-xs text-cyan-500 font-mono uppercase font-bold">Real-Time Pay</p>
                   <p className="mt-4 text-xs text-neutral-400">Encrypted flow / sec</p>
              </div>

              <div className="bg-black border border-white/10 p-8 w-full md:w-1/3 text-center relative z-10 transition-all hover:scale-105 duration-300">
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500 text-black font-black text-xs px-2 py-1 uppercase tracking-widest">Step 3</span>
                  <h3 className="text-xl font-black text-white uppercase mb-2">Unshield</h3>
                  <p className="text-xs text-neutral-500 font-mono uppercase">Range Compliance</p>
                   <p className="mt-4 text-xs text-neutral-400">Encrypted &rarr; Private Cash Out</p>
              </div>
          </div>

          <div className="text-center pt-8">
              <h4 className="text-2xl font-bold text-white uppercase tracking-widest">
                  Compliance + Privacy = <span className="text-cyan-400 italic">Practical</span>
              </h4>
          </div>
      </div>
    )
  },
  {
    id: "demo",
    title: "LIVE PROOF",
    content: (
        <div className="max-w-4xl mx-auto w-full text-center space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="bg-white/5 border border-white/10 p-8 rounded-xl backdrop-blur-sm">
                <p className="text-xs font-black text-neutral-500 uppercase tracking-[0.2em] mb-4">LIVE ON SOLANA DEVNET</p>
                <div className="font-mono text-lg md:text-2xl text-cyan-400 break-all">
                    5d4Nb7xFnjkXujjL95T6ktWMcXakc9YX5NqPcsTrGit3
                </div>
                <div className="mt-6 flex justify-center gap-4">
                    <Button variant="outline" className="border-white/10 hover:bg-white/5 uppercase tracking-widest font-black text-xs" asChild>
                        <Link href="https://explorer.solana.com/address/5d4Nb7xFnjkXujjL95T6ktWMcXakc9YX5NqPcsTrGit3?cluster=devnet" target="_blank">
                             Review on Explorer <ExternalLink className="w-3 h-3 ml-2" />
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="animate-pulse">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-black font-black uppercase tracking-widest text-lg h-16 px-12" asChild>
                    <Link href="/onboarding">
                         <Play className="w-6 h-6 mr-3 fill-black" /> Launch Live Demo
                    </Link>
                </Button>
            </div>
        </div>
    )
  },
  {
    id: "bounty",
    title: "WHY WE WIN",
    content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto w-full animate-in fade-in slide-in-from-bottom-8 duration-700">
            {[
                { title: "Private Payments Track", desc: "Solving the $300B payroll privacy gap.", color: "text-orange-500", border: "border-orange-500/50" },
                { title: "Token-2022 Implementation", desc: "Native Confidential Transfer Extension. No wrappers.", color: "text-cyan-400", border: "border-cyan-500/50" },
                { title: "Range Protocol", desc: "Compliance-gated privacy pools. Anti-laundering built in.", color: "text-purple-500", border: "border-purple-500/50" },
                { title: "Helius RPC", desc: "Production-grade infrastructure for reliability.", color: "text-green-500", border: "border-green-500/50" }
            ].map((item, i) => (
                <div key={i} className={`bg-black/80 border ${item.border} p-6 flex items-start gap-4 transition-all hover:scale-[1.02] duration-300`}>
                    <CheckCircle className={`w-6 h-6 ${item.color} mt-1`} />
                    <div className="text-left">
                        <h4 className={`text-lg font-black uppercase italic ${item.color}`}>{item.title}</h4>
                        <p className="text-neutral-400 font-mono text-xs uppercase mt-2 leading-relaxed">{item.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    )
  }
]

export default function PitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1))
      } else if (e.key === "ArrowLeft") {
        setCurrentSlide((prev) => Math.max(prev - 1, 0))
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden font-sans selection:bg-orange-500/30">
        
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-orange-900/10 to-transparent pointer-events-none" />

      <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-center z-50">
          <div className="flex items-center gap-2">
               <div className="w-3 h-3 bg-orange-500 rounded-sm" />
               <span className="font-black text-xl italic tracking-tighter">JETRPAY</span>
          </div>
          <div className="text-xs font-mono text-neutral-600 uppercase tracking-widest">
              SLIDE {currentSlide + 1} / {slides.length}
          </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative z-10">
        <div key={currentSlide} className="w-full max-w-7xl animate-in fade-in duration-500">
            <div className="text-center mb-16 animate-in slide-in-from-top-4 duration-500 delay-100">
                    <h2 className="text-sm font-black text-orange-500 uppercase tracking-[0.3em] mb-4">{slides[currentSlide].title}</h2>
            </div>
            {slides[currentSlide].content}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full p-8 flex justify-between items-end z-50">
          <div className="text-[10px] text-neutral-700 font-mono uppercase max-w-xs hidden md:block">
              Solana Privacy Hackathon 2026<br/>
              Track: Private Payments
          </div>

          <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                disabled={currentSlide === 0}
                className="border-white/10 hover:bg-white/10 rounded-full w-12 h-12"
            >
                  <ArrowLeft className="w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
                disabled={currentSlide === slides.length - 1}
                className="border-white/10 hover:bg-white/10 rounded-full w-12 h-12"
            >
                  <ArrowRight className="w-5 h-5" />
              </Button>
          </div>
      </div>
    </div>
  )
}
