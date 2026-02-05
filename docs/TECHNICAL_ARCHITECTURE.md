# JetrPay Technical Architecture

## System Overview

**JetrPay** is a privacy-first payroll streaming platform built on Solana, leveraging Token-2022's Confidential Transfer extension, Range Protocol [@range_org](https://x.com/range_org) for compliance, and real-time streaming mechanics.

---

## High-Level Architecture Diagram

```
╔══════════════════════════════════════════════════════════════════════════════════════════════════════╗
║                                                                                                      ║
║                              J E T R P A Y   -   S Y S T E M   A R C H I T E C T U R E               ║
║                                                                                                      ║
║                        Privacy-First Payroll Streaming on Solana                                     ║
║                                                                                                      ║
╠══════════════════════════════════════════════════════════════════════════════════════════════════════╣
║                                                                                                      ║
║    ┌────────────────────────────────────────────────────────────────────────────────────────────┐    ║
║    │                                    F R O N T E N D   L A Y E R                              │    ║
║    │                                       (Next.js 14 + React)                                  │    ║
║    ├────────────────────────────────────────────────────────────────────────────────────────────┤    ║
║    │                                                                                            │    ║
║    │   ┌──────────────────┐   ┌──────────────────┐   ┌──────────────────┐   ┌──────────────┐   │    ║
║    │   │   Landing Page   │   │    Dashboard     │   │   Wallet View    │   │  Ghost Mode  │   │    ║
║    │   │   (Pitch Deck)   │   │  (Admin/Employee)│   │  (Vault/Streams) │   │  (Privacy UI)│   │    ║
║    │   └────────┬─────────┘   └────────┬─────────┘   └────────┬─────────┘   └──────┬───────┘   │    ║
║    │            │                      │                      │                     │          │    ║
║    │            └──────────────────────┼──────────────────────┼─────────────────────┘          │    ║
║    │                                   │                      │                                │    ║
║    │                                   ▼                      ▼                                │    ║
║    │   ┌───────────────────────────────────────────────────────────────────────────────────┐   │    ║
║    │   │                         A P P   C O N T E X T   ( R e a c t )                     │   │    ║
║    │   │                                                                                   │   │    ║
║    │   │   • User State (Role, Auth, Wallet)     • Transaction History                    │   │    ║
║    │   │   • Real-time Streaming Calculations    • Notification System                    │   │    ║
║    │   │   • Employee Management                 • Company Statistics                     │   │    ║
║    │   │                                                                                   │   │    ║
║    │   └───────────────────────────────────────────────────────────────────────────────────┘   │    ║
║    │                                                                                            │    ║
║    └────────────────────────────────────────────────────────────────────────────────────────────┘    ║
║                                               │                                                      ║
║                                               │                                                      ║
║    ╔══════════════════════════════════════════╪══════════════════════════════════════════════════╗   ║
║    ║                                          │                                                  ║   ║
║    ║           W A L L E T   &   R P C   C O N N E C T I O N   L A Y E R                         ║   ║
║    ║                                          │                                                  ║   ║
║    ╠══════════════════════════════════════════╪══════════════════════════════════════════════════╣   ║
║    ║                                          ▼                                                  ║   ║
║    ║   ┌──────────────────────┐        ┌───────────────────┐        ┌──────────────────────┐    ║   ║
║    ║   │  @solana/wallet-    │        │    Helius RPC     │        │  Range Risk API    │    ║   ║
║    ║   │  adapter-react      │        │  @heliuslabs      │        │  @range_org        │    ║   ║
║    ║   │                     │        │  • Enhanced       │        │  • Wallet Screening  │    ║   ║
║    ║   │  • Phantom          │◀──────▶│    Reliability    │        │  • Risk Scoring 1-10 │    ║   ║
║    ║   │  • Solflare         │        │  • TX Indexing    │◀──────▶│  • OFAC/EU/UK/UN     │    ║   ║
║    ║   │  • Backpack         │        │  • Devnet/Mainnet │        │  • ML Threat Detect  │    ║   ║
║    ║   │                     │        │                   │        │                      │    ║   ║
║    ║   └──────────────────────┘        └───────────────────┘        └──────────────────────┘    ║   ║
║    ║                                          │                                                  ║   ║
║    ╚══════════════════════════════════════════╪══════════════════════════════════════════════════╝   ║
║                                               │                                                      ║
║                                               │                                                      ║
║    ╔══════════════════════════════════════════╪══════════════════════════════════════════════════╗   ║
║    ║                                          ▼                                                  ║   ║
║    ║                     S O L A N A   B L O C K C H A I N   L A Y E R                           ║   ║
║    ║                                                                                             ║   ║
║    ╠═════════════════════════════════════════════════════════════════════════════════════════════╣   ║
║    ║                                                                                             ║   ║
║    ║   ┌─────────────────────────────────────────────────────────────────────────────────────┐   ║   ║
║    ║   │                                                                                     │   ║   ║
║    ║   │                    T O K E N - 2 0 2 2   P R O G R A M                              │   ║   ║
║    ║   │                                                                                     │   ║   ║
║    ║   │   Program ID: TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb                          │   ║   ║
║    ║   │                                                                                     │   ║   ║
║    ║   │   ┌─────────────────────────────────────────────────────────────────────────────┐   │   ║   ║
║    ║   │   │                                                                             │   │   ║   ║
║    ║   │   │              C O N F I D E N T I A L   T R A N S F E R   E X T              │   │   ║   ║
║    ║   │   │                                                                             │   │   ║   ║
║    ║   │   │   ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐            │   │   ║   ║
║    ║   │   │   │  ElGamal        │  │  Twisted        │  │  Zero-Knowledge │            │   │   ║   ║
║    ║   │   │   │  Encryption     │  │  ElGamal        │  │  Proofs (ZKP)   │            │   │   ║   ║
║    ║   │   │   │                 │  │                 │  │                 │            │   │   ║   ║
║    ║   │   │   │  • Encrypts     │  │  • Encrypts     │  │  • Range Proofs │            │   │   ║   ║
║    ║   │   │   │    account      │  │    transfer     │  │  • Equality     │            │   │   ║   ║
║    ║   │   │   │    balances     │  │    amounts      │  │    Proofs       │            │   │   ║   ║
║    ║   │   │   │  • 256-bit      │  │  • Homomorphic  │  │  • Validity     │            │   │   ║   ║
║    ║   │   │   │    security     │  │    properties   │  │    Proofs       │            │   │   ║   ║
║    ║   │   │   │                 │  │                 │  │                 │            │   │   ║   ║
║    ║   │   │   └─────────────────┘  └─────────────────┘  └─────────────────┘            │   │   ║   ║
║    ║   │   │                                                                             │   │   ║   ║
║    ║   │   └─────────────────────────────────────────────────────────────────────────────┘   │   ║   ║
║    ║   │                                                                                     │   ║   ║
║    ║   └─────────────────────────────────────────────────────────────────────────────────────┘   ║   ║
║    ║                                                                                             ║   ║
║    ║                                                                                             ║   ║
║    ║   ┌─────────────────────────────────────────────────────────────────────────────────────┐   ║   ║
║    ║   │                                                                                     │   ║   ║
║    ║   │                 J E T R P A Y   A N C H O R   P R O G R A M                         │   ║   ║
║    ║   │                                                                                     │   ║   ║
║    ║   │   Contract: 5d4Nb7xFnjkXujjL95T6ktWMcXakc9YX5NqPcsTrGit3 (Devnet)                  │   ║   ║
║    ║   │                                                                                     │   ║   ║
║    ║   │   ┌───────────────────────┐   ┌───────────────────────┐   ┌─────────────────────┐   │   ║   ║
║    ║   │   │   initialize_stream   │   │       withdraw        │   │   Stream Account    │   │   ║   ║
║    ║   │   │                       │   │                       │   │                     │   │   ║   ║
║    ║   │   │  • Sets up payment    │   │  • Calculate vested   │   │  • sender: Pubkey   │   │   ║   ║
║    ║   │   │    stream between     │   │    amount based on    │   │  • recipient: Pubkey│   │   ║   ║
║    ║   │   │    sender/recipient   │   │    elapsed time       │   │  • mint: Pubkey     │   │   ║   ║
║    ║   │   │  • Defines start_time │   │  • Transfer from      │   │  • start_time: i64  │   │   ║   ║
║    ║   │   │    and end_time       │   │    vault to recipient │   │  • end_time: i64    │   │   ║   ║
║    ║   │   │  • Transfers funds    │   │  • Update withdrawn   │   │  • total_amount: u64│   │   ║   ║
║    ║   │   │    to vault PDA       │   │    amount tracker     │   │  • withdrawn: u64   │   │   ║   ║
║    ║   │   │                       │   │                       │   │  • bump: u8         │   │   ║   ║
║    ║   │   └───────────────────────┘   └───────────────────────┘   └─────────────────────┘   │   ║   ║
║    ║   │                                                                                     │   ║   ║
║    ║   └─────────────────────────────────────────────────────────────────────────────────────┘   ║   ║
║    ║                                                                                             ║   ║
║    ╚═════════════════════════════════════════════════════════════════════════════════════════════╝   ║
║                                                                                                      ║
╚══════════════════════════════════════════════════════════════════════════════════════════════════════╝
```

---

## Transaction Flow Diagrams

### 1. Shield Flow (Deposit to Confidential Vault)

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                                 │
│                         S H I E L D   F L O W   ( D E P O S I T )                               │
│                                                                                                 │
│    Converts public USDC to confidential cUSDC with compliance pre-check                        │
│                                                                                                 │
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                 │
│                                                                                                 │
│    ┌────────────┐                                                                               │
│    │            │                                                                               │
│    │   USER     │                                                                               │
│    │  (Company) │                                                                               │
│    │            │                                                                               │
│    └──────┬─────┘                                                                               │
│           │                                                                                     │
│           │  1️⃣  Initiate Shield (amount: 10,000 USDC)                                          │
│           │                                                                                     │
│           ▼                                                                                     │
│    ┌─────────────────────────────────────────────────────────────────┐                          │
│    │                                                                 │                          │
│    │                    F R O N T E N D   A P P                       │                          │
│    │                                                                 │                          │
│    │    • Captures deposit intent                                   │                          │
│    │    • Triggers compliance check                                 │                          │
│    │    • Displays UI feedback                                      │                          │
│    │                                                                 │                          │
│    └─────────────────────────────┬───────────────────────────────────┘                          │
│                                  │                                                              │
│                                  │  2️⃣  Check Wallet Risk Score                                 │
│                                  │                                                              │
│                                  ▼                                                              │
│    ┌─────────────────────────────────────────────────────────────────┐                          │
│    │                                                                 │                          │
│    │                R A N G E   P R O T O C O L   A P I              │                          │
│    │                                                                 │                          │
│    │    Input:  wallet_address                                      │                          │
│    │    Output: { risk_score: 10, allowed: true }                   │                          │
│    │                                                                 │                          │
│    │    Checks:                                                     │                          │
│    │    ├── OFAC Sanctions List                                     │                          │
│    │    ├── Known Illicit Activity                                  │                          │
│    │    ├── Mixer/Tumbler Associations                              │                          │
│    │    └── Transaction Pattern Analysis                            │                          │
│    │                                                                 │                          │
│    └─────────────────────────────┬───────────────────────────────────┘                          │
│                                  │                                                              │
│                    ┌─────────────┴─────────────┐                                                │
│                    │                           │                                                │
│                    ▼                           ▼                                                │
│         ┌───────────────────┐       ┌───────────────────┐                                       │
│         │   Risk < 50       │       │   Risk >= 50      │                                       │
│         │   ✅ ALLOWED       │       │   ❌ BLOCKED       │                                       │
│         └─────────┬─────────┘       └─────────┬─────────┘                                       │
│                   │                           │                                                 │
│                   │                           ▼                                                 │
│                   │               ┌───────────────────────┐                                     │
│                   │               │  Transaction Rejected │                                     │
│                   │               │  "High Risk Wallet"   │                                     │
│                   │               └───────────────────────┘                                     │
│                   │                                                                             │
│                   │  3️⃣  Execute Token-2022 Transfer                                            │
│                   │                                                                             │
│                   ▼                                                                             │
│    ┌─────────────────────────────────────────────────────────────────┐                          │
│    │                                                                 │                          │
│    │               S O L A N A   T O K E N - 2 0 2 2                  │                          │
│    │                                                                 │                          │
│    │    Instruction: TransferChecked                                │                          │
│    │                                                                 │                          │
│    │    ┌─────────────────┐        ┌─────────────────┐              │                          │
│    │    │  Source ATA     │ ──────▶│  Destination ATA │              │                          │
│    │    │  (Public USDC)  │        │  (Confidential)  │              │                          │
│    │    │                 │        │                  │              │                          │
│    │    │  Balance: 10000 │        │  Balance: ????   │ ◀── Encrypted│                          │
│    │    │  (visible)      │        │  (hidden)        │              │                          │
│    │    └─────────────────┘        └─────────────────┘              │                          │
│    │                                                                 │                          │
│    └─────────────────────────────┬───────────────────────────────────┘                          │
│                                  │                                                              │
│                                  │  4️⃣  Apply Pending Balance                                   │
│                                  │                                                              │
│                                  ▼                                                              │
│    ┌─────────────────────────────────────────────────────────────────┐                          │
│    │                                                                 │                          │
│    │          C O N F I D E N T I A L   V A U L T   S T A T E        │                          │
│    │                                                                 │                          │
│    │    ┌───────────────────────────────────────────────────────┐   │                          │
│    │    │                                                       │   │                          │
│    │    │   Encrypted Balance: 0x7f3a9b2c1d4e5f6a7b8c9d0e1f2a3  │   │                          │
│    │    │                      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^   │   │                          │
│    │    │                      (Only owner can decrypt)          │   │                          │
│    │    │                                                       │   │                          │
│    │    │   Public View: "Balance: [ENCRYPTED]"                  │   │                          │
│    │    │                                                       │   │                          │
│    │    └───────────────────────────────────────────────────────┘   │                          │
│    │                                                                 │                          │
│    └─────────────────────────────────────────────────────────────────┘                          │
│                                                                                                 │
│    ✅ RESULT: 10,000 USDC now exists as encrypted cUSDC in confidential vault                    │
│                                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### 2. Stream Flow (Confidential Payment)

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                                 │
│                   S T R E A M   F L O W   ( C O N F I D E N T I A L   P A Y M E N T )           │
│                                                                                                 │
│    Time-based salary streaming with encrypted amounts                                           │
│                                                                                                 │
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                 │
│                                                                                                 │
│    ┌──────────────────────────────────────────────────────────────────────────────────────┐     │
│    │                                                                                      │     │
│    │                     S T R E A M   I N I T I A L I Z A T I O N                         │     │
│    │                                                                                      │     │
│    │   Company calls: initialize_stream(amount, start_time, end_time)                    │     │
│    │                                                                                      │     │
│    │   ┌────────────────────────────────────────────────────────────────────────────┐    │     │
│    │   │                                                                            │    │     │
│    │   │   Stream Parameters:                                                       │    │     │
│    │   │   ├── Total Amount:    86,400 cUSDC (encrypted)                           │    │     │
│    │   │   ├── Start Time:      Unix timestamp (now)                               │    │     │
│    │   │   ├── End Time:        Unix timestamp (now + 30 days)                     │    │     │
│    │   │   ├── Rate Per Second: $0.033333... (calculated client-side)              │    │     │
│    │   │   └── Recipient:       Employee wallet address                            │    │     │
│    │   │                                                                            │    │     │
│    │   └────────────────────────────────────────────────────────────────────────────┘    │     │
│    │                                                                                      │     │
│    └──────────────────────────────────────────────────────────────────────────────────────┘     │
│                                              │                                                  │
│                                              │                                                  │
│                                              ▼                                                  │
│    ┌──────────────────────────────────────────────────────────────────────────────────────┐     │
│    │                                                                                      │     │
│    │                           V A U L T   P D A   ( E S C R O W )                        │     │
│    │                                                                                      │     │
│    │   Account Seeds: ["vault", stream.key()]                                            │     │
│    │                                                                                      │     │
│    │   ┌───────────────────────────────────────────────────────────┐                     │     │
│    │   │                                                           │                     │     │
│    │   │        🔒 86,400 cUSDC (Encrypted)                         │                     │     │
│    │   │                                                           │                     │     │
│    │   │   Authority: Stream PDA                                   │                     │     │
│    │   │   Can only be withdrawn by recipient via program         │                     │     │
│    │   │                                                           │                     │     │
│    │   └───────────────────────────────────────────────────────────┘                     │     │
│    │                                                                                      │     │
│    └──────────────────────────────────────────────────────────────────────────────────────┘     │
│                                              │                                                  │
│                                              │   Time Passes...                                 │
│                                              │                                                  │
│                                              ▼                                                  │
│    ┌──────────────────────────────────────────────────────────────────────────────────────┐     │
│    │                                                                                      │     │
│    │               V E S T I N G   C A L C U L A T I O N   ( O n - C h a i n )            │     │
│    │                                                                                      │     │
│    │   ┌────────────────────────────────────────────────────────────────────────────┐    │     │
│    │   │                                                                            │    │     │
│    │   │   vested_amount = total_amount × (current_time - start_time)              │    │     │
│    │   │                                   ─────────────────────────────            │    │     │
│    │   │                                   (end_time - start_time)                  │    │     │
│    │   │                                                                            │    │     │
│    │   │   withdrawable = vested_amount - withdrawn_amount                          │    │     │
│    │   │                                                                            │    │     │
│    │   │   Example after 10 days:                                                   │    │     │
│    │   │   ├── vested_amount   = 86,400 × (10/30) = 28,800 cUSDC                   │    │     │
│    │   │   ├── withdrawn_amount = 0                                                 │    │     │
│    │   │   └── withdrawable    = 28,800 cUSDC                                       │    │     │
│    │   │                                                                            │    │     │
│    │   └────────────────────────────────────────────────────────────────────────────┘    │     │
│    │                                                                                      │     │
│    └──────────────────────────────────────────────────────────────────────────────────────┘     │
│                                              │                                                  │
│                                              │  Employee calls: withdraw()                      │
│                                              │                                                  │
│                                              ▼                                                  │
│    ┌──────────────────────────────────────────────────────────────────────────────────────┐     │
│    │                                                                                      │     │
│    │             C O N F I D E N T I A L   T R A N S F E R   ( Z K   P R O O F )          │     │
│    │                                                                                      │     │
│    │   ┌────────────────────────────────────────────────────────────────────────────┐    │     │
│    │   │                                                                            │    │     │
│    │   │   1. Generate ZK Range Proof                                               │    │     │
│    │   │      └── Proves: 0 ≤ transfer_amount ≤ available_balance                  │    │     │
│    │   │          (without revealing actual amount)                                 │    │     │
│    │   │                                                                            │    │     │
│    │   │   2. Encrypt Amount for Recipient                                          │    │     │
│    │   │      └── Uses recipient's ElGamal public key                              │    │     │
│    │   │      └── Ciphertext: C = (G^r, M × H^r)                                    │    │     │
│    │   │                                                                            │    │     │
│    │   │   3. Update Encrypted Balances                                             │    │     │
│    │   │      └── Sender:    balance' = balance - encrypted_amount                  │    │     │
│    │   │      └── Recipient: balance' = balance + encrypted_amount                  │    │     │
│    │   │                                                                            │    │     │
│    │   │   4. Verify Proof On-Chain                                                 │    │     │
│    │   │      └── Token-2022 program validates ZK proof                            │    │     │
│    │   │      └── Transaction succeeds only if proof is valid                       │    │     │
│    │   │                                                                            │    │     │
│    │   └────────────────────────────────────────────────────────────────────────────┘    │     │
│    │                                                                                      │     │
│    │   Public Observer Sees:                                                             │     │
│    │   ┌────────────────────────────────────────────────────────────────────────────┐    │     │
│    │   │   • Transaction from Vault → Employee Wallet                               │    │     │
│    │   │   • Amount: [ENCRYPTED]                                                    │    │     │
│    │   │   • ZK Proof: [Valid]                                                      │    │     │
│    │   └────────────────────────────────────────────────────────────────────────────┘    │     │
│    │                                                                                      │     │
│    │   Employee Sees (with decryption key):                                             │     │
│    │   ┌────────────────────────────────────────────────────────────────────────────┐    │     │
│    │   │   • Received: 28,800 cUSDC                                                 │    │     │
│    │   │   • New Balance: 28,800 cUSDC                                              │    │     │
│    │   └────────────────────────────────────────────────────────────────────────────┘    │     │
│    │                                                                                      │     │
│    └──────────────────────────────────────────────────────────────────────────────────────┘     │
│                                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### 3. Unshield Flow (Withdraw to Public)

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                                 │
│                            U N S H I E L D   F L O W   ( W I T H D R A W )                      │
│                                                                                                 │
│    Converts confidential cUSDC back to public USDC for off-ramp                                │
│                                                                                                 │
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                 │
│    ┌───────────────────────┐                             ┌───────────────────────┐              │
│    │                       │                             │                       │              │
│    │   CONFIDENTIAL VAULT  │                             │   PUBLIC WALLET       │              │
│    │                       │                             │                       │              │
│    │   Balance: ????????   │  ═══════════════════════▶   │   Balance: 5,000 USDC │              │
│    │   (Encrypted)         │      Unshield 5,000         │   (Visible)           │              │
│    │                       │                             │                       │              │
│    └───────────────────────┘                             └───────────────────────┘              │
│                                                                                                 │
│                                                                                                 │
│    ┌──────────────────────────────────────────────────────────────────────────────────────┐     │
│    │                                                                                      │     │
│    │                         U N S H I E L D   P R O C E S S                              │     │
│    │                                                                                      │     │
│    │   Step 1: User decrypts balance client-side                                         │     │
│    │           └── Uses private ElGamal key stored in browser                            │     │
│    │                                                                                      │     │
│    │   Step 2: Create WithdrawConfidential instruction                                   │     │
│    │           └── Specifies amount to convert                                           │     │
│    │           └── Includes ZK proof that amount ≤ encrypted balance                     │     │
│    │                                                                                      │     │
│    │   Step 3: Token-2022 program executes                                               │     │
│    │           └── Decrements encrypted balance (homomorphically)                        │     │
│    │           └── Credits public token account                                          │     │
│    │                                                                                      │     │
│    │   Step 4: Standard SPL Transfer available                                           │     │
│    │           └── Send to exchange, bank off-ramp, etc.                                 │     │
│    │                                                                                      │     │
│    └──────────────────────────────────────────────────────────────────────────────────────┘     │
│                                                                                                 │
│    ⚠️  NOTE: Privacy is lost for unshielded amount (necessary for fiat off-ramps)               │
│                                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Cryptographic Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                                 │
│              C R Y P T O G R A P H I C   A R C H I T E C T U R E   ( T O K E N - 2 0 2 2 )      │
│                                                                                                 │
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                 │
│                                                                                                 │
│   ╔═══════════════════════════════════════════════════════════════════════════════════════╗     │
│   ║                                                                                       ║     │
│   ║                    E L G A M A L   E N C R Y P T I O N                                 ║     │
│   ║                                                                                       ║     │
│   ║   Purpose: Encrypt account balances                                                   ║     │
│   ║                                                                                       ║     │
│   ║   ┌─────────────────────────────────────────────────────────────────────────────┐     ║     │
│   ║   │                                                                             │     ║     │
│   ║   │   Key Generation:                                                           │     ║     │
│   ║   │   ├── Private Key: x ← random scalar                                        │     ║     │
│   ║   │   └── Public Key:  H = x × G (where G is generator point)                   │     ║     │
│   ║   │                                                                             │     ║     │
│   ║   │   Encryption (for balance B):                                               │     ║     │
│   ║   │   ├── Random scalar: r ← random                                             │     ║     │
│   ║   │   ├── Ciphertext C = (D, E) where:                                          │     ║     │
│   ║   │   │   └── D = r × G                                                          │     ║     │
│   ║   │   │   └── E = B × G + r × H                                                  │     ║     │
│   ║   │   │                                                                         │     ║     │
│   ║   │   Decryption:                                                               │     ║     │
│   ║   │   └── B × G = E - x × D                                                      │     ║     │
│   ║   │   └── Solve discrete log to recover B (practical for small B)               │     ║     │
│   ║   │                                                                             │     ║     │
│   ║   └─────────────────────────────────────────────────────────────────────────────┘     ║     │
│   ║                                                                                       ║     │
│   ╚═══════════════════════════════════════════════════════════════════════════════════════╝     │
│                                                                                                 │
│                                                                                                 │
│   ╔═══════════════════════════════════════════════════════════════════════════════════════╗     │
│   ║                                                                                       ║     │
│   ║               T W I S T E D   E L G A M A L   ( F o r   A m o u n t s )               ║     │
│   ║                                                                                       ║     │
│   ║   Purpose: Encrypt transfer amounts with homomorphic properties                       ║     │
│   ║                                                                                       ║     │
│   ║   ┌─────────────────────────────────────────────────────────────────────────────┐     ║     │
│   ║   │                                                                             │     ║     │
│   ║   │   Key Benefit: Allows encrypted arithmetic                                  │     ║     │
│   ║   │                                                                             │     ║     │
│   ║   │   Homomorphic Addition:                                                     │     ║     │
│   ║   │   ├── Enc(A) + Enc(B) = Enc(A + B)                                          │     ║     │
│   ║   │   └── Update balances without decryption!                                   │     ║     │
│   ║   │                                                                             │     ║     │
│   ║   │   Example Transfer:                                                         │     ║     │
│   ║   │   ├── Sender balance:    Enc(1000) - Enc(100) = Enc(900)                    │     ║     │
│   ║   │   └── Recipient balance: Enc(500)  + Enc(100) = Enc(600)                    │     ║     │
│   ║   │                                                                             │     ║     │
│   ║   │   On-chain: Only encrypted values change, amounts never revealed            │     ║     │
│   ║   │                                                                             │     ║     │
│   ║   └─────────────────────────────────────────────────────────────────────────────┘     ║     │
│   ║                                                                                       ║     │
│   ╚═══════════════════════════════════════════════════════════════════════════════════════╝     │
│                                                                                                 │
│                                                                                                 │
│   ╔═══════════════════════════════════════════════════════════════════════════════════════╗     │
│   ║                                                                                       ║     │
│   ║                  Z E R O - K N O W L E D G E   P R O O F S                            ║     │
│   ║                                                                                       ║     │
│   ║   Purpose: Prove statement validity without revealing underlying data                 ║     │
│   ║                                                                                       ║     │
│   ║   ┌─────────────────────────────────────────────────────────────────────────────┐     ║     │
│   ║   │                                                                             │     ║     │
│   ║   │   Range Proof:                                                              │     ║     │
│   ║   │   ├── Statement: "Transfer amount is between 0 and 2^64"                    │     ║     │
│   ║   │   ├── Proves: No negative amounts or overflow attacks                       │     ║     │
│   ║   │   └── Reveals: Nothing about actual amount                                  │     ║     │
│   ║   │                                                                             │     ║     │
│   ║   │   Equality Proof:                                                           │     ║     │
│   ║   │   ├── Statement: "Ciphertext C₁ encrypts same value as C₂"                  │     ║     │
│   ║   │   ├── Proves: Amount deducted from sender = amount added to recipient       │     ║     │
│   ║   │   └── Reveals: Nothing about actual amount                                  │     ║     │
│   ║   │                                                                             │     ║     │
│   ║   │   Validity Proof:                                                           │     ║     │
│   ║   │   ├── Statement: "Sender balance ≥ transfer amount"                         │     ║     │
│   ║   │   ├── Proves: Sufficient funds exist                                        │     ║     │
│   ║   │   └── Reveals: Nothing about actual balances                                │     ║     │
│   ║   │                                                                             │     ║     │
│   ║   └─────────────────────────────────────────────────────────────────────────────┘     ║     │
│   ║                                                                                       ║     │
│   ╚═══════════════════════════════════════════════════════════════════════════════════════╝     │
│                                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Smart Contract Architecture (Anchor Program)

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                                 │
│                A N C H O R   P R O G R A M   A R C H I T E C T U R E                            │
│                                                                                                 │
│   Contract Address: 5d4Nb7xFnjkXujjL95T6ktWMcXakc9YX5NqPcsTrGit3 (Devnet)                       │
│                                                                                                 │
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                 │
│                                                                                                 │
│   ┌───────────────────────────────────────────────────────────────────────────────────────┐     │
│   │                                                                                       │     │
│   │                            P R O G R A M   M O D U L E                                 │     │
│   │                                                                                       │     │
│   │   ┌─────────────────────────────────────────────────────────────────────────────┐     │     │
│   │   │                                                                             │     │     │
│   │   │   pub mod jetrpay {                                                         │     │     │
│   │   │                                                                             │     │     │
│   │   │       // Initialize a new payment stream                                    │     │     │
│   │   │       pub fn initialize_stream(                                             │     │     │
│   │   │           ctx: Context<InitializeStream>,                                   │     │     │
│   │   │           amount: u64,        // Total tokens to stream                     │     │     │
│   │   │           start_time: i64,    // Unix timestamp                             │     │     │
│   │   │           end_time: i64       // Unix timestamp                             │     │     │
│   │   │       ) -> Result<()>                                                       │     │     │
│   │   │                                                                             │     │     │
│   │   │       // Withdraw vested tokens                                             │     │     │
│   │   │       pub fn withdraw(                                                      │     │     │
│   │   │           ctx: Context<Withdraw>                                            │     │     │
│   │   │       ) -> Result<()>                                                       │     │     │
│   │   │                                                                             │     │     │
│   │   │   }                                                                         │     │     │
│   │   │                                                                             │     │     │
│   │   └─────────────────────────────────────────────────────────────────────────────┘     │     │
│   │                                                                                       │     │
│   └───────────────────────────────────────────────────────────────────────────────────────┘     │
│                                                                                                 │
│                                                                                                 │
│   ┌───────────────────────────────────────────────────────────────────────────────────────┐     │
│   │                                                                                       │     │
│   │                         A C C O U N T   S T R U C T U R E S                            │     │
│   │                                                                                       │     │
│   │   ┌─────────────────────────────────────────────────────────────────────────────┐     │     │
│   │   │                                                                             │     │     │
│   │   │   #[account]                                                                │     │     │
│   │   │   pub struct Stream {                                                       │     │     │
│   │   │       pub sender: Pubkey,           // 32 bytes - Company wallet           │     │     │
│   │   │       pub recipient: Pubkey,        // 32 bytes - Employee wallet          │     │     │
│   │   │       pub mint: Pubkey,             // 32 bytes - Token mint address       │     │     │
│   │   │       pub start_time: i64,          //  8 bytes - Stream start             │     │     │
│   │   │       pub end_time: i64,            //  8 bytes - Stream end               │     │     │
│   │   │       pub total_amount: u64,        //  8 bytes - Total tokens             │     │     │
│   │   │       pub withdrawn_amount: u64,    //  8 bytes - Already withdrawn        │     │     │
│   │   │       pub bump: u8,                 //  1 byte  - PDA bump seed            │     │     │
│   │   │   }                                 // ─────────                            │     │     │
│   │   │                                     // 129 bytes + 8 (discriminator)       │     │     │
│   │   │                                                                             │     │     │
│   │   └─────────────────────────────────────────────────────────────────────────────┘     │     │
│   │                                                                                       │     │
│   └───────────────────────────────────────────────────────────────────────────────────────┘     │
│                                                                                                 │
│                                                                                                 │
│   ┌───────────────────────────────────────────────────────────────────────────────────────┐     │
│   │                                                                                       │     │
│   │                         P D A   D E R I V A T I O N S                                  │     │
│   │                                                                                       │     │
│   │   ┌─────────────────────────────────────────────────────────────────────────────┐     │     │
│   │   │                                                                             │     │     │
│   │   │   Stream PDA:                                                               │     │     │
│   │   │   ├── Seeds: ["stream", sender.pubkey, recipient.pubkey]                    │     │     │
│   │   │   └── Ensures: One unique stream per sender-recipient pair                  │     │     │
│   │   │                                                                             │     │     │
│   │   │   Vault PDA:                                                                │     │     │
│   │   │   ├── Seeds: ["vault", stream.pubkey]                                       │     │     │
│   │   │   └── Ensures: Escrowed funds controlled by program                         │     │     │
│   │   │                                                                             │     │     │
│   │   └─────────────────────────────────────────────────────────────────────────────┘     │     │
│   │                                                                                       │     │
│   └───────────────────────────────────────────────────────────────────────────────────────┘     │
│                                                                                                 │
│                                                                                                 │
│   ┌───────────────────────────────────────────────────────────────────────────────────────┐     │
│   │                                                                                       │     │
│   │                   I N S T R U C T I O N   A C C O U N T S                             │     │
│   │                                                                                       │     │
│   │   InitializeStream:                     Withdraw:                                     │     │
│   │   ┌─────────────────────────────┐       ┌─────────────────────────────┐              │     │
│   │   │ stream (init, PDA)          │       │ stream (mut)                │              │     │
│   │   │ sender (signer, mut)        │       │ recipient (signer, mut)     │              │     │
│   │   │ recipient                   │       │ sender                      │              │     │
│   │   │ mint                        │       │ vault (mut, PDA)            │              │     │
│   │   │ sender_token (mut)          │       │ recipient_token (mut)       │              │     │
│   │   │ vault (init_if_needed, PDA) │       │ token_program               │              │     │
│   │   │ system_program              │       └─────────────────────────────┘              │     │
│   │   │ token_program               │                                                    │     │
│   │   │ rent                        │                                                    │     │
│   │   └─────────────────────────────┘                                                    │     │
│   │                                                                                       │     │
│   └───────────────────────────────────────────────────────────────────────────────────────┘     │
│                                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Security Model

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                                 │
│                           S E C U R I T Y   M O D E L                                           │
│                                                                                                 │
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                 │
│   ┌───────────────────────────────────────────────────────────────────────────────────────┐     │
│   │                                                                                       │     │
│   │                    T H R E A T   M O D E L   &   M I T I G A T I O N S                 │     │
│   │                                                                                       │     │
│   ├───────────────────────────────────────────────────────────────────────────────────────┤     │
│   │                                                                                       │     │
│   │   ┌─────────────────────┬─────────────────────┬─────────────────────────────────┐     │     │
│   │   │       THREAT        │       IMPACT        │          MITIGATION             │     │     │
│   │   ├─────────────────────┼─────────────────────┼─────────────────────────────────┤     │     │
│   │   │ Sanctioned wallet   │ Contaminated        │ @range_org Risk API           │     │     │
│   │   │ enters privacy pool │ anonymity set       │ pre-screens before shield     │     │     │
│   │   ├─────────────────────┼─────────────────────┼─────────────────────────────────┤     │     │
│   │   │ Balance leakage     │ Privacy compromise  │ ElGamal 256-bit encryption      │     │     │
│   │   │ through chain       │                     │ on all balance data             │     │     │
│   │   │ analysis            │                     │                                 │     │     │
│   │   ├─────────────────────┼─────────────────────┼─────────────────────────────────┤     │     │
│   │   │ Transfer amount     │ Salary exposure     │ Twisted ElGamal with ZK        │     │     │
│   │   │ visibility          │                     │ proofs for all transfers        │     │     │
│   │   ├─────────────────────┼─────────────────────┼─────────────────────────────────┤     │     │
│   │   │ Shoulder surfing    │ UI data exposure    │ Ghost Mode blurs sensitive     │     │     │
│   │   │                     │                     │ data in public settings         │     │     │
│   │   ├─────────────────────┼─────────────────────┼─────────────────────────────────┤     │     │
│   │   │ Key compromise      │ Full account access │ Client-side key management,    │     │     │
│   │   │                     │                     │ no server-side secrets          │     │     │
│   │   ├─────────────────────┼─────────────────────┼─────────────────────────────────┤     │     │
│   │   │ Smart contract bug  │ Fund loss           │ Audited Token-2022 program,    │     │     │
│   │   │                     │                     │ minimal custom logic            │     │     │
│   │   └─────────────────────┴─────────────────────┴─────────────────────────────────┘     │     │
│   │                                                                                       │     │
│   └───────────────────────────────────────────────────────────────────────────────────────┘     │
│                                                                                                 │
│   ┌───────────────────────────────────────────────────────────────────────────────────────┐     │
│   │                                                                                       │     │
│   │                         P R I V A C Y   G U A R A N T E E S                            │     │
│   │                                                                                       │     │
│   │   ┌─────────────────────────────────────────────────────────────────────────────┐     │     │
│   │   │                                                                             │     │     │
│   │   │   ✅ HIDDEN FROM PUBLIC OBSERVERS:                                           │     │     │
│   │   │      ├── Account balances                                                   │     │     │
│   │   │      ├── Transfer amounts                                                   │     │     │
│   │   │      ├── Salary information                                                 │     │     │
│   │   │      └── Payment frequency patterns (within confidential realm)             │     │     │
│   │   │                                                                             │     │     │
│   │   │   ⚠️  VISIBLE TO PUBLIC OBSERVERS:                                           │     │     │
│   │   │      ├── Transaction occurred (but not amount)                              │     │     │
│   │   │      ├── Sender and recipient addresses                                     │     │     │
│   │   │      └── Unshielded amounts (when converting to public USDC)                │     │     │
│   │   │                                                                             │     │     │
│   │   │   🔐 VISIBLE ONLY TO AUTHORIZED PARTIES:                                     │     │     │
│   │   │      ├── Sender can see: Amounts they sent                                  │     │     │
│   │   │      ├── Recipient can see: Amounts they received                           │     │     │
│   │   │      └── Auditor (if configured): View-only access via audit key            │     │     │
│   │   │                                                                             │     │     │
│   │   └─────────────────────────────────────────────────────────────────────────────┘     │     │
│   │                                                                                       │     │
│   └───────────────────────────────────────────────────────────────────────────────────────┘     │
│                                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Technology Stack Summary

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                                 │
│                      T E C H N O L O G Y   S T A C K   S U M M A R Y                            │
│                                                                                                 │
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                 │
│   ┌───────────────────────────────────────────────────────────────────────────────────────┐     │
│   │                                                                                       │     │
│   │   LAYER                │  TECHNOLOGY              │  PURPOSE                          │     │
│   │   ─────────────────────┼─────────────────────────┼───────────────────────────────────│     │
│   │   Blockchain           │  Solana (Devnet)        │  High-speed, low-cost settlement  │     │
│   │                        │                         │                                   │     │
│   │   Token Standard       │  Token-2022             │  Native confidential transfers    │     │
│   │                        │                         │                                   │     │
│   │   Privacy Extension    │  Confidential Transfer  │  ElGamal + ZK proofs             │     │
│   │                        │                         │                                   │     │
│   │   Smart Contracts      │  Anchor Framework       │  Payment streaming logic          │     │
│   │                        │                         │                                   │     │
│   │   Compliance           │  Range Risk API (@range_org) │  Wallet screening + sanctions  │     │
│   │                        │                         │                                   │     │
│   │   RPC Infrastructure   │  Helius                 │  Enhanced reliability             │     │
│   │                        │                         │                                   │     │
│   │   Frontend Framework   │  Next.js 14             │  Server components, app router    │     │
│   │                        │                         │                                   │     │
│   │   UI Library           │  React + TypeScript     │  Type-safe components             │     │
│   │                        │                         │                                   │     │
│   │   Styling              │  Tailwind CSS           │  Utility-first design             │     │
│   │                        │                         │                                   │     │
│   │   Components           │  shadcn/ui              │  Accessible, customizable UI      │     │
│   │                        │                         │                                   │     │
│   │   Wallet Integration   │  @solana/wallet-adapter │  Multi-wallet support             │     │
│   │                        │                         │                                   │     │
│   │   State Management     │  React Context          │  Global app state                 │     │
│   │                                                                                       │     │
│   └───────────────────────────────────────────────────────────────────────────────────────┘     │
│                                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Deployment Information

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                                 │
│                        D E P L O Y M E N T   I N F O R M A T I O N                              │
│                                                                                                 │
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                 │
│   LIVE APPLICATION                                                                              │
│   ├── URL:     https://www.jetrpay.xyz/                                                         │
│   └── Hosting: Vercel                                                                           │
│                                                                                                 │
│   SMART CONTRACT (Confidential Mint)                                                            │
│   ├── Network:  Solana Devnet                                                                   │
│   ├── Address:  5d4Nb7xFnjkXujjL95T6ktWMcXakc9YX5NqPcsTrGit3                                    │
│   ├── Program:  Token-2022 (TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb)                        │
│   └── Explorer: https://explorer.solana.com/address/5d4Nb7xFnjkXujjL95T6ktWMcXakc9YX5NqPcsTrGit3?cluster=devnet
│                                                                                                 │
│   SOURCE CODE                                                                                   │
│   └── GitHub:   https://github.com/ayomisco/jetrpay-solana                                      │
│                                                                                                 │
│   HACKATHON                                                                                     │
│   └── Event:    Solana Privacy Hackathon (https://solana.com/privacyhack)                       │
│                                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Document Information

| Field | Value |
|-------|-------|
| Version | 1.0 |
| Author | JetrPay Team |
| Last Updated | February 2026 |
| License | MIT |

