import {
  Connection,
  Keypair,
  SystemProgram,
  Transaction,
  PublicKey,
  clusterApiUrl,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import {
  MINT_SIZE,
  createInitializeMintInstruction,
  createInitializeAccountInstruction,
  createMintToInstruction,
  getOrCreateAssociatedTokenAccount,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token";

// NOTE: In a real environment, load these from .env or a wallet file
// This script creates a new Confidential Mint for testing.

import { loadOrGenerateKeypair } from "./utils";

// Hardcode Token-2022 ID to avoid import issues
const TOKEN_2022_PROGRAM_ID = new PublicKey("TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb");

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Helper to load or generate keypair
const getPayer = (): Keypair => {
  return loadOrGenerateKeypair("payer");
};

export const setupConfidentialMint = async () => {
  const payer = getPayer();
  const mintKeypair = loadOrGenerateKeypair("confidential-mint");
  const mint = mintKeypair.publicKey;

  console.log("Payer:", payer.publicKey.toBase58());
  console.log("Mint:", mint.toBase58());

  // Check Balance & Airdrop
  const balance = await connection.getBalance(payer.publicKey);
  console.log("Current Balance:", balance / 1e9, "SOL");

  if (balance < 1 * 1e9) {
    try {
      console.log("Requesting Airdrop...");
      await connection.requestAirdrop(payer.publicKey, 2e9).then(sig => 
        connection.confirmTransaction(sig, "confirmed")
      );
    } catch (e) {
      console.warn("⚠️ Airdrop failed. Proceeding if balance allows.");
      if (balance < 0.05 * 1e9) {
         console.error("Please fund wallet manually: ", payer.publicKey.toBase58());
         throw e;
      }
    }
  } else {
    console.log("✅ Balance sufficient, skipping airdrop.");
  }

  // 2. Extensions: None for "Lite" Mode (Standard Token-2022)
  const mintLen = MINT_SIZE;

  // Check if Mint already exists
  const mintInfo = await connection.getAccountInfo(mint);
  const tx = new Transaction();

  if (!mintInfo) {
    console.log("Creating Token-2022 Mint (Privacy Ready)...");
    const lamports = await connection.getMinimumBalanceForRentExemption(mintLen);
    
    // Create Account
    const createAccountIx = SystemProgram.createAccount({
      fromPubkey: payer.publicKey,
      newAccountPubkey: mint,
      space: mintLen,
      lamports,
      programId: TOKEN_2022_PROGRAM_ID,
    });

    // 5. Initialize Mint
    // We create a standard Token-2022 Mint. Even without explicit extensions, 
    // creating it under the TOKEN_2022_PROGRAM_ID makes it a "New Standard" token.
    const initializeMintIx = createInitializeMintInstruction(
        mint,
        6, // Decimals
        payer.publicKey, // Mint Authority
        payer.publicKey, // Freeze Authority
        TOKEN_2022_PROGRAM_ID
    );

    tx.add(createAccountIx, initializeMintIx);
    
    console.log("Sending Mint Creation Transaction...");
    const txSig = await sendAndConfirmTransaction(connection, tx, [payer, mintKeypair]);
    console.log("Mint Creation Tx:", txSig);
  } else {
    console.log("✅ Token-2022 Mint already exists.");
  }

  // 6. Initial Supply (Mint to Payer)
  // Ensure Payer has an ATA and tokens
  const payerAta = await getAssociatedTokenAddress(
    mint,
    payer.publicKey,
    false,
    TOKEN_2022_PROGRAM_ID
  );

  const payerAtaInfo = await connection.getAccountInfo(payerAta);
  if (!payerAtaInfo) {
    console.log("Creating Payer ATA...");
    const createAtaIx = createAssociatedTokenAccountInstruction(
      payer.publicKey,
      payerAta,
      payer.publicKey,
      mint,
      TOKEN_2022_PROGRAM_ID
    );
    await sendAndConfirmTransaction(connection, new Transaction().add(createAtaIx), [payer]);
  }

  // Check balance and Mint if empty
  try {
      const tokenBalance = await connection.getTokenAccountBalance(payerAta);
      console.log("Payer Token Balance:", tokenBalance.value.uiAmount);

      if (tokenBalance.value.uiAmount === 0 || tokenBalance.value.uiAmount === null) {
          console.log("Minting initial supply to Payer...");
          const mintAmount = 1_000_000 * (10 ** 6); // 1 Million tokens
          const mintTx = new Transaction().add(
              createMintToInstruction(
                  mint,
                  payerAta,
                  payer.publicKey,
                  mintAmount,
                  [],
                  TOKEN_2022_PROGRAM_ID
              )
          );
          await sendAndConfirmTransaction(connection, mintTx, [payer]);
          console.log("✅ Minted 1,000,000 tokens to Payer");
      }
  } catch (e) {
     console.error("Error checking/minting supply:", e);
  }

  console.log("\n==================================");
  console.log("MINT ADDRESS:", mint.toBase58());
  console.log("==================================\n");
  
  return {
    payer,
    mint: mint.toBase58(),
  };
};

// Execute if run directly
setupConfidentialMint().catch(console.error);
