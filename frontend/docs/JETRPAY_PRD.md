# JetrPay (Solana) - Product Requirements Document

## Executive Summary
**JetrPay** on Solana is a privacy-first payroll and payments platform. It leverages **Token-2022 Confidential Transfers** to enable businesses to stream salaries and make payments without revealing their treasury balance or employee salaries to the public, while maintaining full auditability for compliance.

## 1. Product Vision
*   **Problem**: Public blockchains expose sensitive salary data. Businesses cannot use them for payroll without "doxing" their employees.
*   **Solution**: A "Venmo for Privacy" wrapper. You send USDC, but the transfer is encrypted on-chain.
*   **Network**: Solana Mainnet (using Token-2022 extensions).

## 2. Core Features

### 2.1 Confidential Payroll (The Killer Feature)
*   **Encrypted Amounts**: The amount sent is hidden from the public explorer.
*   **Stealth Addresses**: Optional generation of fresh addresses for recipients.
*   **View Key Auditing**: The employer can generate a "read-only" key to share with tax auditors.

### 2.2 Ghost Mode UI
*   **Default**: The dashboard shows "* * * *" for balances.
*   **Action**: Toggle "Ghost Mode" to reveal/hide sensitive data.
*   **Visuals**: Matrix/Cyberpunk aesthetic when privacy is active.

## 3. Technical Architecture (Solana)
*   **Frontend**: Next.js 14 + Tailwind.
*   **Wallet Integration**: Solana Wallet Adapter (Phantom, Solflare).
*   **Smart Contract**:
    *   **Native**: We primarily use the SPL Token-2022 Program (no custom Rust code needed for basic transfers).
    *   **Custom (Optional)**: An Anchor program for "Streaming" logic if time permits.
*   **RPC**: Helius (for high-performance indexing).

## 4. User Flow
1.  **Connect**: Employer connects Phantom.
2.  **Shield**: Employer deposits public USDC -> receives Private Wrapped USDC.
3.  **Pay**: Employer selects "Pay Batch", uploads CSV.
4.  **Sign**: Employer signs 1 transaction.
5.  **Verify**: Explorer shows "Confidential Transfer". Employee sees funds in their JetrPay dashboard.
