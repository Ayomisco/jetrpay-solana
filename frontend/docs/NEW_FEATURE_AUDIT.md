# 🔍 JetrPay (Solana) - New Feature Audit & Flow

**Core Objective**: Win the "Private Payments" Track by demonstrating a fully compliant, user-friendly implementation of Token-2022 Confidential Transfers.

---

## 1. Compliance-Aware Onboarding (The Range Integration)

This is the first "WOW" factor for judges. We don't just let anyone pay privately. We verify them first.

### Flow
1.  **Connect Wallet**: User clicks "Connect" (Phantom).
2.  **Compliance Check (Background)**:
    *   App calls `lib/solana/compliance.ts`.
    *   API checks address against Range Protocol (Mocked for Hackathon logic to ensure demo works).
    *   **Result**: 
        *   `RISK < 50`: "Verified Secure" badge appears in Header.
        *   `RISK > 50`: "High Risk" warning appears. Shielding features disabled.

### Implementation Status
*   [x] Mock Logic (`compliance.ts`)
*   [x] UI Feedback (Notifications)
*   [ ] Real API Key Integration (Pending User Key)

---

## 2. "Shielding" Assets (The Entry Point)

The user converts Public USDC to Private Wrapped USDC (Confidential Mint).

### Flow
1.  **Navigate to Wallet**: User goes to `/wallet`.
2.  **Click "Shield Funds"**: Opens the Shielding Modal.
3.  **Input Amount**: e.g., "1000 USDC".
4.  **Action**: 
    *   App calls `createDepositInstruction` (Public -> Confidential Account).
    *   User approves transaction in Phantom.
5.  **Result**: 
    *   Public Balance: -1000.
    *   Private Balance: +1000 (Encrypted on-chain).

### Technical Requirements (Contracts)
*   Need a **Mint Script** to create the initial "Confidential Token" on Devnet.
*   Need a **ATA Script** to create the Token-2022 Account for the user.

---

## 3. Ghost Mode (The UX Innovation)

Privacy isn't just encryption; it's UI/UX.

### Features
*   **Global Toggle**: Eye icon in the header.
*   **Effect**: 
    *   Applies `.ghost-mode` class to `<body>`.
    *   CSS filter `blur(6px)` applied to all `.privacy-sensitive` elements (Balances, Transaction Amounts).
*   **Interaction**: Hovering over a specific element temporarily unblurs it (`privacy-sensitive:hover`).

### Implementation Status
*   [x] Toggle Component (`PrivacyToggle.tsx`)
*   [x] Tailwind Utility (`globals.css`)
*   [x] Integration in Header (`app-shell.tsx`)

---

## 4. Private Payroll Streaming (The End Game)

Paying employees without revealing salaries.

### Flow
1.  **Admin Dashboard**: Select "Pay Employees".
2.  **Upload CSV**: List of wallet addresses + amounts.
3.  **Construct Tx**: Batch `TransferConfidential` instructions.
4.  **Execute**: One signature sends funds to 50 employees.
5.  **Explorer View**: Solscan shows "Confidential Transfer" with `Amount: Encrypted`.

### Missing Pieces (To Do)
*   [ ] **Token-2022 Scripts**: We need the `scripts/setup.ts` to actually run this on Devnet.
*   [ ] **Frontend Wiring**: Connect the "Deposit" button to the script logic.

---

## 📋 Action Plan - Architecture to Code

### Phase 1: Smart Contract / Logic (Next Step)
We need to populate `contracts/scripts` with the actual SOL/Typescript code to:
1.  Create a Token-2022 Mint with `ConfidentialTransfer` extension.
2.  Enable the `ConfidentialTransfer` feature on the Mint.
3.  Mint tokens to a wallet.
4.  Configure an account to receive confidential transfers (El Gamal Key generation).

### Phase 2: Wiring
Connect `WalletOverview.tsx` -> `lib/solana/confidential-transfer.ts`.
