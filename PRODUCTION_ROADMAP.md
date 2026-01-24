# 🗺️ JetrPay Production Roadmap & Implementation Plan

This document outlines the path from Hackathon MVP to a Production-Ready Privacy Payroll Platform on Solana.

## 🛠️ The Production Stack

To run JetrPay in production, you will need the following accounts and tools.

### 1. Infrastructure & Blockchain (Required)
*   **Helius (RPC & Indexing)**
    *   **Purpose**: You need a high-performance RPC to index Token-2022 confidential transfers. Public nodes will fail.
    *   **Cost**: Free tier (Hackathon) -> $49/mo (Pro).
    *   **Action**: Get API Key from [dev.helius.xyz](https://dev.helius.xyz).
*   **Vercel (Hosting)**
    *   **Purpose**: Hosting the Next.js frontend and Edge API functions.
    *   **Cost**: $20/mo (Pro recommended for commercial usage).
*   **Supabase (Database)**
    *   **Purpose**: Storing off-chain metadata (user profiles, payroll schedules, encrypted invoice hashes).
    *   **Cost**: Free tier -> $25/mo.

### 2. Compliance & Security (Critical)
*   **Range Protocol**
    *   **Purpose**: Wallet risk scoring (AML/KYC screening) before allowing shielding.
    *   **Cost**: Enterprise (Contact Sales) / Hackathon Free Tier.
    *   **Action**: Obtain API Key.
*   **Squads Protocol**
    *   **Purpose**: Multi-sig management for the Company Vault.
    *   **Integration**: Use `@sqds/sdk` to require 2/3 signatures for payroll execution.

### 3. Payments (Fiat Rails)
*   **Stripe Connect**
    *   **Purpose**: On-ramping fiat USD to USDC.
    *   **Cost**: ~2.9% + 30¢ per transaction.
*   **Unlimit / MoonPay**
    *   **Alternative**: Direct crypto on-ramp widgets.

---

## 🔑 Required API Keys & Secrets

Create a `.env.local` file in production with these values. **NEVER commit this file.**

```env
# Solana / Helius
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
NEXT_PUBLIC_HELIUS_RPC_URL=https://mainnet.helius-rpc.com/?api-key=YOUR_KEY

# Range Protocol (Compliance)
RANGE_API_KEY=rk_live_...
RANGE_RISK_THRESHOLD=50

# Database (Supabase)
DATABASE_URL=postgres://postgres:...@db.supabase.co:5432/postgres
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

# Auth (Privy or Web3Auth)
NEXT_PUBLIC_PRIVY_APP_ID=...
```

---

## 🚦 Roadmap to Mainnet

### Phase 1: Hackathon MVP (Current Status)
- [x] UI Shell & "Ghost Mode" Privacy (Frontend).
- [x] Mock Compliance Checks (Range Protocol).
- [ ] Token-2022 Minting Script (Devnet).
- [ ] Basic "Shield/Unshield" flow on Devnet.

### Phase 2: Alpha (Post-Hackathon)
- [ ] **Hardened Security**: Integrate Squads SDK for the admin vault. No single key should control the payroll.
- [ ] **Real Compliance**: Replace mock `compliance.ts` with actual Range API calls.
- [ ] **Database**: Connect Supabase to store "Employee Directory" (mapping Wallet -> Name/Role).
- [ ] **Auditing**: Build the "Auditor Dashboard" where a View Key can decrypt the history.

### Phase 3: Beta (Pilot Customers)
- [ ] **Mainnet Deployment**: Mint the real Confidential Token on Solana Mainnet.
- [ ] **Legal Wrapper**: Establish Terms of Service regarding self-custody and "Tech Provider" status to avoid MSB licensing initially.
- [ ] **Fiat On-Ramp**: Switch on Stripe integration.

---

## 💸 Startup Costs Estimator

| Item | Monthly Cost | Notes |
| :--- | :--- | :--- |
| **Vercel Pro** | $20 | Frontend hosting |
| **Supabase** | $25 | Database |
| **Helius** | $49 | Enterprise-grade RPC |
| **Range Protocol** | TBD | Compliance API (Scale-based) |
| **Domain** | $10/yr | jetrpay.com |
| **Deploy Gas** | ~$5 | One-time SOL costs for account rent |
| **Total** | **~$100/mo** | Very lean startup cost! |
