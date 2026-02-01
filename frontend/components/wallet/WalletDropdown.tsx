"use client"

import { Copy, ExternalLink, LogOut, Check } from "lucide-react"
import { useState } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/hooks/use-toast"

export function WalletDropdown() {
  const { publicKey, disconnect } = useWallet()
  const [copied, setCopied] = useState(false)

  if (!publicKey) return null

  const address = publicKey.toBase58()
  const truncated = `${address.slice(0, 4)}•••${address.slice(-4)}`
  const explorerUrl = `https://explorer.solana.com/address/${address}?cluster=devnet`

  const handleCopy = () => {
    navigator.clipboard.writeText(address)
    setCopied(true)
    toast({
      title: "Copied!",
      description: "Wallet address copied to clipboard",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDisconnect = async () => {
    await disconnect()
    toast({
      title: "Disconnected",
      description: "Wallet has been disconnected",
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="border-white/10 hover:bg-white/5 bg-black/50 backdrop-blur-sm font-mono text-sm h-11 px-4 gap-2"
        >
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="font-bold tracking-wider">{truncated}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 bg-black border-white/10 text-white font-mono"
      >
        <div className="px-3 py-2 text-xs text-neutral-500 uppercase tracking-widest">
          Connected Wallet
        </div>
        <DropdownMenuSeparator className="bg-white/10" />
        
        <DropdownMenuItem
          onClick={handleCopy}
          className="cursor-pointer hover:bg-white/5 focus:bg-white/5"
        >
          {copied ? (
            <Check className="mr-2 h-4 w-4 text-green-500" />
          ) : (
            <Copy className="mr-2 h-4 w-4" />
          )}
          <span>{copied ? "Copied!" : "Copy Address"}</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => window.open(explorerUrl, "_blank")}
          className="cursor-pointer hover:bg-white/5 focus:bg-white/5"
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          <span>View on Explorer</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-white/10" />

        <DropdownMenuItem
          onClick={handleDisconnect}
          className="cursor-pointer text-red-500 hover:bg-red-500/10 focus:bg-red-500/10 focus:text-red-500"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Disconnect</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
