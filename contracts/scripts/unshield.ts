import {
  Connection,
  Keypair,
  PublicKey,
  clusterApiUrl,
  sendAndConfirmTransaction,
  Transaction,
} from "@solana/web3.js";
import {
import {
  TOKEN_2022_PROGRAM_ID,
  createConfidentialTransferWithdrawInstruction,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";

import { loadOrGenerateKeypair } from "./utils";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
const getPayer = () => loadOrGenerateKeypair("payer"); 

export const unshieldFunds = async (
  mintAddress: string,
  amount: number
) => {
  const payer = getPayer();
  const mint = new PublicKey(mintAddress);
  
  const account = getAssociatedTokenAddressSync(
    mint,
    payer.publicKey,
    false,
    TOKEN_2022_PROGRAM_ID
  );

  console.log(`Unshielding ${amount} tokens for ${payer.publicKey.toBase58()}...`);
  
  // 3. Withdraw Instruction (Confidential -> Public)
  // This requires a ZK Proof (which the client lib generates automatically if WASM is loaded)
  // Note: Server-side scripts might fail if ZK WASM isn't present in node environment.
  // For Hackathon MVP, we rely on the Frontend (Ghost Mode) for this, but here is the instruction structure.
  
  const withdrawIx = await createConfidentialTransferWithdrawInstruction(
    account, // Token Account
    mint,    // Mint
    amount,  // Amount to unshield
    6,       // Decimals
    payer.publicKey, // Authority
    [],
    TOKEN_2022_PROGRAM_ID
  );

  const tx = new Transaction().add(withdrawIx);
  const sig = await sendAndConfirmTransaction(connection, tx, [payer]);
  
  console.log("Funds Unshielded to Public Balance:", sig);
  return sig;
};
