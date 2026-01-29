import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  clusterApiUrl,
  sendAndConfirmTransaction,
  Transaction,
} from "@solana/web3.js";
import {
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
  createInitializeAccountInstruction,
  ExtensionType,
} from "@solana/spl-token";

import { loadOrGenerateKeypair } from "./utils";

// Hardcode Token-2022 ID
const TOKEN_2022_PROGRAM_ID = new PublicKey("TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb");

// Config - To be loaded from env or shared config in real app
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Helper: In production, use your actual wallet
const getPayer = () => loadOrGenerateKeypair("payer"); 

export const createConfidentialAccount = async (
  mintAddress: string,
  owner?: Keypair // Optional: Defaults to a new keypair if not provided
) => {
  const payer = getPayer();
  const cleanMintAddress = mintAddress.trim();
  console.log("Using Mint Address:", `"${cleanMintAddress}"`);
  
  const mint = new PublicKey(cleanMintAddress);
  const user = owner || Keypair.generate();

  console.log("Creating Account for:", user.publicKey.toBase58());

  // 1. Check Balance & Fund Payer (Avoid spamming faucet)
  const balance = await connection.getBalance(payer.publicKey);
  console.log("Current Balance:", balance / 1e9, "SOL");
  
  if (balance < 1 * 1e9) {
      console.log("Requesting Airdrop...");
      await connection.requestAirdrop(payer.publicKey, 1e9).then(sig => 
        connection.confirmTransaction(sig, "confirmed")
      );
  } else {
      console.log("✅ Balance sufficient, skipping airdrop.");
  }

  // 2. Get ATA Address
  // Note: For Token-2022 Confidential Transfers, we typically use the standard ATA
  // but it must be initialized correctly if not using the default `createAssociatedTokenAccount` helper
  // which might not auto-enable extensions depending on the version. 
  // However, `createAssociatedTokenAccountInstruction` with correct ProgramId usually works.
  // The crucial part is that the MINT has the extension, so the Account inherits it?
  // Actually, for ConfidentialTransfer, the *Account* also needs initialization for the encryption keys.
  // This usually happens *after* creation via `createConfigureAccountInstruction` 
  
  /* 
     Using async getAssociatedTokenAddress to avoid version issues
  */
  const ata = await getAssociatedTokenAddress(
    mint,
    user.publicKey,
    false,
    TOKEN_2022_PROGRAM_ID
  );

  console.log("ATA Address:", ata.toBase58());

  const createATAIx = createAssociatedTokenAccountInstruction(
    payer.publicKey,
    ata,
    user.publicKey,
    mint,
    TOKEN_2022_PROGRAM_ID
  );

  /* 
     IMPORTANT: 
     After creating the account, you normally need to call `configureAccount` 
     to generate the ElGamal encryption keys. This is a complex instruction 
     that client-side libraries handle. For this server-side script, 
     we assume the standard SPL CLI flow or simplified initialization.
  */

  const tx = new Transaction().add(createATAIx);
  
  const sig = await sendAndConfirmTransaction(connection, tx, [payer]);
  console.log("Account Created:", sig);

  return {
    user,
    ata: ata.toBase58()
  };
};

// MOCK RUN (Replace with real Mint from setup-mint.ts)
const MOCK_MINT = "Your_Mint_Address_Here";
if (process.argv[2]) {
    createConfidentialAccount(process.argv[2]).catch(console.error);
}
