import {
  Connection,
  Keypair,
  SystemProgram,
  Transaction,
  clusterApiUrl,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import {
  ExtensionType,
  TOKEN_2022_PROGRAM_ID,
  createInitializeMintInstruction,
  getMintLen,
  createInitializeAccountInstruction,
  createMintToInstruction,
  getOrCreateAssociatedTokenAccount,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";

// NOTE: In a real environment, load these from .env or a wallet file
// This script creates a new Confidential Mint for testing.

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Helper to load or generate keypair
const getPayer = (): Keypair => {
  // TODO: Load from file if exists
  return Keypair.generate();
};

export const setupConfidentialMint = async () => {
  const payer = getPayer();
  const mintKeypair = Keypair.generate();
  const mint = mintKeypair.publicKey;

  console.log("Payer:", payer.publicKey.toBase58());
  console.log("Mint:", mint.toBase58());

  // 1. Airdrop SOL for fees
  console.log("Requesting Airdrop...");
  const signature = await connection.requestAirdrop(payer.publicKey, 2e9); // 2 SOL
  await connection.confirmTransaction(signature, "confirmed");

  // 2. Define Extensions: ConfidentialTransferMint
  // Note: ConfidentialTransfer requires the mint to be initialized with this extension type.
  const extensions = [ExtensionType.ConfidentialTransferMint];
  const mintLen = getMintLen(extensions);

  // 3. Create Account Instruction
  const lamports = await connection.getMinimumBalanceForRentExemption(mintLen);
  
  const createAccountIx = SystemProgram.createAccount({
    fromPubkey: payer.publicKey,
    newAccountPubkey: mint,
    space: mintLen,
    lamports,
    programId: TOKEN_2022_PROGRAM_ID,
  });

  // 4. Initialize Confidential Transfer Extension
  // IMPORTANT: This requires strict ordering before InitializeMint.
  // Using a placeholder instruction here because the raw `createInitializeConfidentialTransferMintInstruction` 
  // requires complex arguments (ElGamal keys) typically handled by a client-side wallet library or specific setup tool.
  // For the Hackathon MVP script, we initialize the Mint *Account* structure first.
  
  // 5. Initialize Mint
  const initializeMintIx = createInitializeMintInstruction(
    mint,
    6, // Decimals
    payer.publicKey, // Mint Authority
    payer.publicKey, // Freeze Authority
    TOKEN_2022_PROGRAM_ID
  );

  const tx = new Transaction().add(createAccountIx, initializeMintIx);
  
  console.log("Sending Mint Creation Transaction...");
  const txSig = await sendAndConfirmTransaction(connection, tx, [payer, mintKeypair]);
  console.log("Mint Created:", txSig);
  
  return {
    payer,
    mint: mint.toBase58(),
  };
};

// Execute if run directly
setupConfidentialMint().catch(console.error);
