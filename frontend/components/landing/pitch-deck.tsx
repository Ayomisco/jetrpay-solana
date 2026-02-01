"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ArrowRight, ArrowLeft, Shield, Zap, Lock, CheckCircle, ExternalLink, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

const slides = [
  {
    id: "hook",
    title: "THE HOOK",
    content: (
      <div className="text-center max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        
        <div className="pt-8 space-y-4">
           <p className="text-2xl font-black text-white italic">Prove everything. Reveal nothing. Pay everyone.</p>
           <div className="inline-block border-2 border-orange-500 bg-orange-500/10 px-8 py-3 rounded-lg">
              <span className="text-orange-500 font-mono font-black tracking-widest uppercase text-lg">JetrPay: First Compliance-Aware Privacy Layer</span>
           </div>
        </div>
      </div>
    )
  },
  {
    id: "problem",
    title: "WHY IT MATTERS",
    content: (
      <div className="max-w-6xl mx-auto w-full space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-black text-white">When companies pay salaries on-chain, three things happen:</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-black/50 border-orange-500/50 p-8 flex flex-col space-y-6 hover:border-orange-500 transition-colors group backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <span className="text-5xl font-black text-orange-500">1</span>
                <Shield className="w-12 h-12 text-orange-500" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase">Employers See ALL</h3>
              <p className="text-neutral-400 font-mono text-sm leading-relaxed">
                Your DeFi yields, NFT purchases, side income. All visible. Complete financial surveillance.
              </p>
          </Card>
          <Card className="bg-black/50 border-red-500/50 p-8 flex flex-col space-y-6 hover:border-red-500 transition-colors group backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <span className="text-5xl font-black text-red-500">2</span>
                <Lock className="w-12 h-12 text-red-500" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase">Employees Spy</h3>
              <p className="text-neutral-400 font-mono text-sm leading-relaxed">
                The entire salary structure is public before HR even knows. Coworkers compare paychecks.
              </p>
          </Card>
          <Card className="bg-black/50 border-cyan-500/50 p-8 flex flex-col space-y-6 hover:border-cyan-500 transition-colors group backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <span className="text-5xl font-black text-cyan-500">3</span>
                <Zap className="w-12 h-12 text-cyan-500" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase">Targets Painted</h3>
              <p className="text-neutral-400 font-mono text-sm leading-relaxed">
                High earners become targets for criminals, governments, and bad actors who can identify wealthy wallets.
              </p>
          </Card>
        </div>
        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 p-8 rounded-xl text-center space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center">
            <div>
              <div className="text-5xl font-black text-orange-500">$300B</div>
              <div className="text-sm text-neutral-400 uppercase tracking-widest">Market Per Year</div>
            </div>
            <div className="hidden md:block w-px h-16 bg-white/20" />
            <div>
              <div className="text-5xl font-black text-cyan-500">5M</div>
              <div className="text-sm text-neutral-400 uppercase tracking-widest">Crypto Workers</div>
            </div>
            <div className="hidden md:block w-px h-16 bg-white/20" />
            <div>
              <div className="text-5xl font-black text-red-500">73%</div>
              <div className="text-sm text-neutral-400 uppercase tracking-widest">Want Privacy</div>
            </div>
          </div>
          <p className="text-neutral-300 italic text-lg">They'd take a pay cut for financial privacy.</p>
        </div>
      </div>
    )
  },
  {
    id: "solution",
    title: "THE SOLUTION",
    content: (
      <div className="max-w-6xl mx-auto w-full space-y-12 animate-in fade-in zoom-in-95 duration-700">
          <h2 className="text-3xl font-black text-white text-center">JetrPay uses three cutting-edge technologies:</h2>
          
          <div className="space-y-6">
              <Card className="bg-black/50 border-orange-500/50 p-8 hover:border-orange-500 transition-all">
                  <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                          <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center">
                              <span className="text-3xl font-black text-orange-500">1</span>
                          </div>
                      </div>
                      <div className="space-y-3">
                          <h3 className="text-2xl font-black text-orange-500 uppercase">Solana's Token-2022 Confidential Transfer Extension</h3>
                          <p className="text-neutral-300 text-lg leading-relaxed">
                              Encrypts salary amounts using <span className="text-orange-400 font-bold">ElGamal encryption</span> and <span className="text-orange-400 font-bold">Zero-Knowledge proofs</span>. 
                              The blockchain sees a transaction happened, but <span className="italic">only the sender and receiver know the amount</span>.
                          </p>
                      </div>
                  </div>
              </Card>

              <Card className="bg-black/50 border-purple-500/50 p-8 hover:border-purple-500 transition-all">
                  <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                          <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center">
                              <span className="text-3xl font-black text-purple-500">2</span>
                          </div>
                      </div>
                      <div className="space-y-3">
                          <h3 className="text-2xl font-black text-purple-500 uppercase">Range Protocol for Compliance</h3>
                          <p className="text-neutral-300 text-lg leading-relaxed">
                              Before anyone can enter our privacy pool, their wallet gets <span className="text-purple-400 font-bold">screened</span>. 
                              Sanctioned addresses? <span className="text-red-500 font-bold">Rejected</span>. High-risk wallets? <span className="text-red-500 font-bold">Blocked</span>. 
                              <span className="block mt-2 text-purple-300 italic">This solves the Tornado Cash problem.</span>
                          </p>
                      </div>
                  </div>
              </Card>

              <Card className="bg-black/50 border-cyan-500/50 p-8 hover:border-cyan-500 transition-all">
                  <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                          <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center">
                              <span className="text-3xl font-black text-cyan-500">3</span>
                          </div>
                      </div>
                      <div className="space-y-3">
                          <h3 className="text-2xl font-black text-cyan-500 uppercase">Real-Time Streaming on Solana</h3>
                          <p className="text-neutral-300 text-lg leading-relaxed">
                              Employees <span className="text-cyan-400 font-bold">earn per second</span>, withdraw <span className="text-cyan-400 font-bold">instantly</span>, 
                              and the whole thing costs <span className="text-green-400 font-bold">pennies in fees</span>.
                          </p>
                      </div>
                  </div>
              </Card>
          </div>

          <div className="bg-gradient-to-r from-cyan-500/10 to-orange-500/10 border-2 border-cyan-500/50 p-8 rounded-xl text-center">
              <h4 className="text-3xl font-black text-white uppercase tracking-wide">
                  The Result: <span className="text-cyan-400">Confidential</span> + <span className="text-purple-400">Compliant</span> = <span className="text-orange-400 italic">Winning</span>
              </h4>
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
