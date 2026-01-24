# JetrPay Frontend (Solana)

The user interface for JetrPay, built with Next.js 14 and configured for the Solana Privacy Hackathon.

## 🌟 Features Implemented

*   **Ghost Mode**: A global privacy context that blurs sensitive numbers (`globals.css` utility).
*   **Solana Provider**: Wrapped in `layout.tsx` using Helius RPC recommendation.
*   **Compliance Mock**: `lib/solana/compliance.ts` simulates Range Protocol checks.
*   **Wallet Overview**: `wallet-overview.tsx` handles the "Shield/Unshield" workflow.

## 🛠️ Commands

*   `pnpm dev`: Start dev server.
*   `pnpm build`: Build for production (Vercel).
*   `pnpm lint`: Check code quality.

## 🔑 Environment Variables

Required in `.env.local`:

```
NEXT_PUBLIC_HELIUS_RPC_URL=https://mainnet.helius-rpc.com/?api-key=...
NEXT_PUBLIC_RANGE_API_KEY=...
NEXT_PUBLIC_SOLANA_NETWORK=devnet
```

## 🧩 Key Components

*   `components/privacy/PrivacyToggle.tsx`: The "Eye" icon logic.
*   `components/dashboard/wallet-overview.tsx`: The main interacting point for shielding.
*   `lib/app-context.tsx`: Manages global state (user role, balances).
