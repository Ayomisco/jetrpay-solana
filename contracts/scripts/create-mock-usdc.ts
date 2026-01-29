import {
  Connection,
  Keypair,
  clusterApiUrl,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import {
  createInitializeMintInstruction,
  TOKEN_PROGRAM_ID, // Standard Token Program (Not 2022) for Mock USDC to show "Legacy" compatibility
  MINT_SIZE,
  getMinimumBalanceForRentExemptMint,
  createMintToInstruction,
  getAssociatedTokenAddressSync,
  createAssociatedTokenAccountInstruction,
} from "@solana/spl-token";

import { loadOrGenerateKeypair } from "./utils";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Helper to get payer
const getPayer = () => loadOrGenerateKeypair("payer"); 

export const setupMockUSDC = async () => {
  const payer = getPayer();
  const mintKeypair = loadOrGenerateKeypair("mock-usdc-mint");
  const mint = mintKeypair.publicKey;

  console.log("Setting up Mock USDC on Devnet...");
  console.log("Payer:", payer.publicKey.toBase58());
  
  // 1. Check Balance & Airdrop if needed
  const balance = await connection.getBalance(payer.publicKey);
  console.log("Current Balance:", balance / 1e9, "SOL");

  if (balance < 1 * 1e9) {
    try {
      console.log("Requesting Airdrop...");
      await connection.requestAirdrop(payer.publicKey, 2e9).then(sig => 
        connection.confirmTransaction(sig, "confirmed")
      );
    } catch (e) {
      console.warn("⚠️ Airdrop failed. If you have funds, this is fine.");
      console.warn("Please fund wallet manually at https://faucet.solana.com/");
      console.warn("Wallet:", payer.publicKey.toBase58());
      
      // Re-check balance to see if we can proceed anyway
      const newBalance = await connection.getBalance(payer.publicKey);
      if (newBalance < 0.01 * 1e9) {
        throw new Error("Insufficient funds. Please fund manually.");
      }
    }
  } else {
    console.log("✅ Balance sufficient, skipping airdrop.");
  }

  // 2. Create Mint Account (If not exists)
  const mintInfo = await connection.getAccountInfo(mint);
  const tx = new Transaction();

  if (!mintInfo) {
    console.log("Mint does not exist. Creating...");
    const lamports = await getMinimumBalanceForRentExemptMint(connection);
    
    const createAccountIx = SystemProgram.createAccount({
      fromPubkey: payer.publicKey,
      newAccountPubkey: mint,
      space: MINT_SIZE,
      lamports,
      programId: TOKEN_PROGRAM_ID,
    });
    
     const initializeMintIx = createInitializeMintInstruction(
      mint,
      6,
      payer.publicKey,
      payer.publicKey,
      TOKEN_PROGRAM_ID
    );
    
    tx.add(createAccountIx, initializeMintIx);
  } else {
    console.log("✅ Mint already exists at:", mint.toBase58());
  }

  // 4. Create ATA for Payer (The Faucet Source)
  // 4. Create ATA for Payer (The Faucet Source)
  const ata = getAssociatedTokenAddressSync(mint, payer.publicKey);
  
  // Check if ATA exists
  const ataInfo = await connection.getAccountInfo(ata);
  if (!ataInfo) {
    console.log("Creating Payer ATA...");
    const createATAIx = createAssociatedTokenAccountInstruction(
      payer.publicKey,
      ata,
      payer.publicKey,
      mint,
      TOKEN_PROGRAM_ID
    );
    tx.add(createATAIx);
  }

  // 5. Mint 1 Million Tokens to Payer (Always top up)
  const mintToIx = createMintToInstruction(
    mint,
    ata,
    payer.publicKey,
    1_000_000 * 10**6, // 1M USDC
    [],
    TOKEN_PROGRAM_ID
  );

  tx.add(mintToIx);
  
  const sig = await sendAndConfirmTransaction(connection, tx, [payer, mintKeypair]);
  
  console.log("✅ Mock USDC Created!");
  console.log("Mint Address:", mint.toBase58());
  console.log("Faucet Authority Secret Key:", `[${payer.secretKey.toString()}]`);
  
  return {
    mint: mint.toBase58(),
    payerSecret: payer.secretKey
  };
};

// Run if main
if (require.main === module) {
  setupMockUSDC().catch(console.error);
}
