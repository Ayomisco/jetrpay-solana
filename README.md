# 🦅 JetrPay (Solana Privacy)

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-Hackathon_MVP-orange.svg)
![Network](https://img.shields.io/badge/network-Solana_Devnet-green.svg)
![Privacy](https://img.shields.io/badge/privacy-Token--2022-purple.svg)

**The first compliance-aware privacy layer for real-time payroll on Solana.**

JetrPay allows businesses to stream salaries and make batched payments confidentially using **Token-2022**, while maintaining regulatory compliance through **Range Protocol** risk scoring and View Key auditing.

> **🏆 Built for the Solana Privacy Hackathon 2026**
> *   **Track**: Private Payments
> *   **Integrations**: Range Protocol, Helius, Token-2022, Radr Labs (ShadowWire)

![JetrPay Banner](https://placehold.co/1200x400/000000/FFF?text=JetrPay+Privacy+Layer)

---

## 🏗️ Technical Architecture

JetrPay bridges the gap between **on-chain privacy** and **real-world compliance**. We utilize a "Gatekeeper" architecture where funds can only enter the hidden state (Confidential Token) after passing a Risk Score check.

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
        Program[SPL Token-2022]:::private
        PublicMint[Public USDC Mint]:::public
        PrivateMint[Confidential Wrapped Mint]:::private
        Vault[Company Private Vault]:::private
        EmpWallet[Employee Wallet]:::private
    end

    %% Flow
    User((Employer)) -->|1. Connect| Wallet
    Wallet -->|2. Request Shield| UI
    UI -->|3. Verify AML/KYC| API
    API --> RiskEngine
    
    RiskEngine --"High Risk (Block)"--> UI
    RiskEngine --"Low Risk (Allow)"--> Wallet
    
    Wallet -->|4. Deposit Public USDC| Program
    Program --"Lock"--> PublicMint
    Program --"Mint 1:1"--> PrivateMint
    
    PrivateMint -->|5. Encrypted Balance| Vault
    Vault -->|6. Confidential Transfer| EmpWallet
    
    subgraph "Auditing"
        Auditor((IRS/Auditor)) -.->|View Key| Vault
    end
```

---

## ⚡ Key Features

### 1. 👁️ Ghost Mode
A one-click privacy toggle in the UI (Global Header). When active, it:
*   Blurs all balance amounts.
*   Switches the dashboard to a "Stealth" color palette.
*   Prevents shoulder-surfing in public workspaces (co-working, cafes).

### 2. 🛡️ Compliance-First Shielding
We solve the "Tornado Cash" problem. JetrPay is **not** a mixer for illicit funds.
*   **Range Protocol Integration**: Before any wallet can mint the private token, its history is screened against AML/Sanctions lists.
*   **Gatekeeper Logic**: High-risk scores trigger a UI block, preventing the transaction from being constructed.

### 3. 🔒 Token-2022 Confidential Transfers
We leverage the native Solana standard, not a custom quirky smart contract.
*   **Encryption**: Uses ElGamal encryption for balances.
*   **Performance**: Indexed via **Helius RPC** for low latency.
*   **Future Proof**: Standard SPL tokens mean wallet compatibility.

---

## 🚀 Quick Start

### Prerequisites
*   Node.js 18+
*   pnpm
*   Solana CLI (optional)

### Installation

1.  **Clone & Install**
    ```bash
    git clone git@github.com:Ayomisco/jetrpay-solana.git
    cd jetrpay-solana
    
    # Install Frontend
    cd frontend
    pnpm install
    ```

2.  **Environment Setup**
    Create `.env.local` in `frontend/`:
    ```env
    NEXT_PUBLIC_SOLANA_NETWORK=devnet
    NEXT_PUBLIC_HELIUS_RPC_URL=https://devnet.helius-rpc.com/?api-key=YOUR_KEY
    NEXT_PUBLIC_RANGE_API_KEY=YOUR_RANGE_KEY
    ```

3.  **Run Development Server**
    ```bash
    pnpm dev
    ```

---

## 📂 Repository Structure

| Path | Description |
| :--- | :--- |
| `frontend/` | Next.js 14 App Router application. |
| `frontend/lib/solana/` | Core logic for Token-2022 interactions. |
| `frontend/components/privacy/` | Ghost Mode UI components. |
| `contracts/` | Anchor workspace for custom logic (if needed). |
| `contracts/scripts/` | TypeScript scripts to setup Mints and test transfers. |

## 🛠️ Technology Stack

*   **Frontend**: Next.js 14, Tailwind CSS, Shadcn/UI
*   **Blockchain**: Solana (Devnet)
*   **Token Standard**: SPL Token-2022 (Extensions: ConfidentialTransfer)
*   **RPC Provider**: **Helius** (Required for indexing confidential transfers)
*   **Compliance**: **Range Protocol** (Wallet Risk Screening)
*   **Wallet**: Solana Wallet Adapter (Phantom, Solflare)

## 📄 License

Distributed under the MIT License.
