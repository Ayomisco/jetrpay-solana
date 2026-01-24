# 🦅 JetrPay (Solana Privacy)

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-Hackathon_MVP-orange.svg)
![Network](https://img.shields.io/badge/network-Solana_Devnet-green.svg)
![Track](https://img.shields.io/badge/track-Private_Payments-purple.svg)

**The first compliance-aware privacy layer for real-time payroll on Solana.**

> "Pay employees anonymously - companies send salaries without knowing who received what, employees receive without revealing identity."

## 📊 Track & Prize Target
*   **Primary Track**: Private Payments ($15,000)
*   **Bounties**: 
    *   **Range Protocol** (Compliance & Risk Scoring)
    *   **Helius** (Enterprise RPC & Indexing)
    *   **Token-2022** (Confidential Transfers)

---

## 💡 The Privacy Crisis in Payroll

### Problem 1: Employer Surveillance
In traditional and crypto payroll, employers know everything.
*   Exactly what each employee earns.
*   Side income from other sources (wallet tracking).
*   Spending habits (DeFi yield farming, NFT purchases).
*   *Real impact*: Only finding out your employee has a side hustle affects raise negotiations ("She doesn't need more money").

### Problem 2: Employee Privacy Leaks
When companies pay salaries on-chain via standard SPL transfers:
*   **The Glass House**: All employees can see each other's wallets via the transaction graph.
*   **Competitive Intelligence**: Competitors can map your entire org chart and salary structure.
*   **Targeting**: Criminals target high-earning employee wallets.
*   **Discrimination**: Salary transparency reveals pay gaps publicly before HR can address them.

### Problem 3: Cross-Border Surveillance
Remote workers (e.g., in Nigeria/Brazil working for US DAOs) face:
*   Banks flagging crypto conversions.
*   Family pressure when income is visible on-chain.
*   Tax authorities tracking every micro-transaction.

### Problem 4: Financial Censorship
Controversial industries (Adult content, journalism, crypto-native) often face bank freezes or payment processor bans based purely on "who is paying you."

---

## ❌ Current Solutions Are Broken

| Solution | Why it fails for Payroll |
| :--- | :--- |
| **Mixers (Tornado Cash)** | Sanctioned, high risk of criminal association, complex UX. |
| **Multiple Wallets** | Gas inefficient, still linkable via timing analytics, management nightmare. |
| **Privacy Coins (Monero)** | Not on Solana, low liquidity, difficult off-ramps. |
| **Traditional Banks** | Slow (3-5 days), expensive ($45 SWIFT fees), high surveillance. |

---

## ✅ The JetrPay Solution

We leverage **Solana's Token-2022 Confidential Transfers** to solve this *natively*.

### Core Innovation: Compliance-Aware Confidentiality

1.  **Shielded Corporate Vault**:
    The company deposits payroll funds (USDC) into a **Confidential Token Account** (Token-2022).
    *   *Result*: The company's treasury balance is encrypted on-chain.

2.  **Confidential Streaming**:
    Salaries are sent using `TransferConfidential` instructions.
    *   *Result*: The **Amount** is encrypted using Twisted ElGamal. The public ledger sees a transaction happened, but not only the Sender and Receiver know the value.

3.  **Compliance Gate (Range Protocol)**:
    Before any wallet can interact with the privacy pool (Shield/Unshield), it is screened.
    *   *Result*: Illicit actors (sanctioned wallets) are rejected at the gate, keeping the anonymity set clean.

4.  **Ghost Mode UI**:
    A client-side privacy layer that blurs sensitive data in the browser to prevent "shoulder surfing" in co-working spaces.

---

## 🏗️ Architecture

```mermaid
graph TD
    %% Styling
    classDef private fill:#1a1a1a,stroke:#f97316,stroke-width:2px,color:#fff;
    classDef public fill:#fafafa,stroke:#333,stroke-width:1px,color:#000;
    classDef compliance fill:#e0f2fe,stroke:#0ea5e9,stroke-width:2px,color:#000;

    subgraph "Frontend Layer"
        UI[Ghost Mode UI]:::private
        Wallet[Phantom / Solflare]:::public
    end

    subgraph "Compliance Gate (Range Protocol)"
        API[Range API]:::compliance
        RiskEngine{Risk Score < 50?}:::compliance
    end

    subgraph "Solana Network (Token-2022)"
        PublicUSDC[Public USDC]:::public
        ConfidentialMint[Confidential Wrapped Mint]:::private
        
        CompanyVault[Company Vault (Encrypted)]:::private
        EmpWallet[Employee Wallet (Encrypted)]:::private
    end

    %% Flow
    User((Employer)) -->|1. Connect| Wallet
    Wallet -->|2. Shield Request| UI
    UI -->|3. Verify AML| API
    
    RiskEngine --"Block"--> UI
    RiskEngine --"Allow"--> Wallet
    
    Wallet -->|4. Deposit| ConfidentialMint
    ConfidentialMint -->|5. Mint Encrypted| CompanyVault
    
    CompanyVault -->|6. Confidential Transfer| EmpWallet
    
    subgraph "Auditing"
        Auditor((IRS/Auditor)) -.->|View Key| CompanyVault
    end
```

---

## 💰 Market Opportunity

*   **TAM**: $600B Global Payroll Market.
*   **Crypto-Native Workforce**: 5M+ people.
*   **The Opportunity**: ~$300B/year in crypto payroll.
*   **Demand**: 73% of employees would take a 5% pay cut for financial privacy.

---

## 🚀 Quick Start

### 1. Installation
```bash
git clone git@github.com:Ayomisco/jetrpay-solana.git
cd jetrpay-solana/frontend
npm install
```

### 2. Configuration
Copy `.env.example` to `.env.local` and add your keys (Helius, Range).

### 3. Run
```bash
npm run dev
```

### 4. Smart Contract Scripts
Manage the privacy lifecycle from the CLI:
```bash
cd ../contracts
npm run mint      # Create Confidential Mint
npm run shield    # Deposit Funds
npm run transfer  # Send Private Payment
```

---

## 🛠️ Technology Stack

*   **Blockchain**: Solana (Devnet)
*   **Privacy Standard**: SPL Token-2022 (ConfidentialTransfer Extension)
*   **Compliance**: Range Protocol (Risk Scoring)
*   **Infrastructure**: Helius (RPC & Indexing)
*   **Frontend**: Next.js 14, Tailwind, Shadcn/UI

## 📄 License
MIT | Built for Solana Privacy Hackathon 2026
