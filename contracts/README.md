# JetrPay Contracts (Solana)

This directory contains the on-chain logic for JetrPay.

**Note for Hackathon Judges**:
JetrPay primarily leverages the **Token-2022 Program** which is already deployed on Mainnet. We do not need a custom program to mint or transfer confidential tokens. We simply interact with the SPL Token Program.

If we add custom vesting logic (Streaming), it will live here as an **Anchor** program.

## 📂 Structure
*   `src/`: Rust source code (if applicable).
*   `tests/`: TypeScript tests for the programs.

## 🛠️ Status
*   **Confidential Transfers**: Handled by client-side SDK (`@solana/spl-token`).
*   **Streaming**: Roadmap item.
