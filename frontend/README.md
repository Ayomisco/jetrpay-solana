# JetrPay Frontend (Solana Privacy)

The user interface for JetrPay, built with Next.js 14 and configured for the **Solana Privacy Hackathon 2026**.

## 🌟 Privacy Features
*   **Ghost Mode**: Global CSS filter that blurs sensitive financial data (`.privacy-sensitive`) to prevent shoulder surfing.
*   **Compliance Gate**: Integration with **Range Protocol** (`lib/solana/compliance.ts`) to screen wallets before allowing deposits.
*   **Confidentiality**: UI flows for "Shielding" (Public -> Private) and "Unshielding" (Private -> Public) using Token-2022.

## 🛠️ Setup & Run

1.  **Install Dependencies**
    ```bash
    npm install
    # Note: We use legacy-peer-deps due to some wallet-adapter conflicts
    npm install --legacy-peer-deps
    ```

2.  **Environment Configuration**
    Copy `.env.example` to `.env.local` and populate:
    ```env
    NEXT_PUBLIC_HELIUS_RPC_URL=... # Required for Token-2022 Indexing
    NEXT_PUBLIC_RANGE_API_KEY=...  # Required for Risk Scoring
    NEXT_PUBLIC_CONFIDENTIAL_MINT=... # address from 'npm run mint'
    ```

3.  **Start Development Server**
    ```bash
    npm run dev
    ```

## 🧩 Key Components

*   `components/privacy/PrivacyToggle.tsx`: The "Eye" icon logic controlling the global blur state.
*   `components/wallet/SolanaWalletProvider.tsx`: Configured with Helius RPC support.
*   `app/(landing)/`: Marketing pages (Landing, Roadmap, Pricing) re-branded for the hackathon.
