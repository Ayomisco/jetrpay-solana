# JetrPay Smart Contracts & Scripts

This directory contains the on-chain logic and management scripts for JetrPay's privacy layer.

## 📂 Architecture
*   **`scripts/` (TypeScript)**: The core operational layer for the Hackathon MVP. These scripts interact directly with the **SPL Token-2022 Program** on Devnet.
*   **`programs/` (Rust/Anchor)**: A custom Anchor program implementing "Vesting Streams" for future roadmap items.

## 📜 Operational Scripts (The CLI)

We use these scripts to manage the privacy lifecycle without a custom UI for admin tasks.

### 1. Setup
```bash
npm install
```

### 2. Available Commands

| Command | Action | Description |
| :--- | :--- | :--- |
| `npm run mint` | **Create Privacy Mint** | Deploys a new Token-2022 Mint with *ConfidentialTransfer* enabled. **Run this first.** |
| `npm run create-account <MINT>` | **Create User Account** | Sets up a wallet with the necessary ElGamal encryption keys. |
| `npm run shield <MINT>` | **Deposit Funds** | Moves Public USDC -> Private Balance. |
| `npm run transfer` | **Send Private** | Simulates an encrypted transfer (Client-side ZK proof). |
| `npm run unshield` | **Withdraw** | Moves Private Balance -> Public USDC. |

## 🦀 Rust Anchor Program
Located in `programs/jetrpay/src/lib.rs`.
*   **Feature**: Linear Vesting (Streaming) of wages.
*   **Build**: `anchor build` (Requires Anchor CLI).
*   **Note**: For the Hackathon "Private Payments" track, the TypeScript scripts (leveraging standard SPL Token-2022) are the primary deliverable.
