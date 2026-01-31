import type React from "react"
import type { Metadata } from "next"
import { Geist_Mono as GeistMono } from "next/font/google"
import "./globals.css"
import { AppProvider } from "@/lib/app-context"
import { SolanaWalletProvider } from "@/components/wallet/SolanaWalletProvider"

const geistMono = GeistMono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "JetrPay | Private Real-Time Payroll",
  description: "Get paid by the second. Privacy-first payroll streaming infrastructure on Solana.",
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geistMono.className} bg-black text-white antialiased`}>
        <SolanaWalletProvider>
            <AppProvider>
            <LayoutWrapper>{children}</LayoutWrapper>
            </AppProvider>
        </SolanaWalletProvider>
      </body>
    </html>
  )
}

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return children
}
