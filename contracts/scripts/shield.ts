import {
  Connection,
  Keypair,
  PublicKey,
  clusterApiUrl,
  sendAndConfirmTransaction,
  Transaction,
} from "@solana/web3.js";
import {
  TOKEN_2022_PROGRAM_ID,
  createDepositInstruction,
  getAssociatedTokenAddressSync,
  amountToUiAmount,
} from "@solana/spl-token";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Helper
const getPayer = () => Keypair.generate(); // Replace with persistent keypair load

export const shieldFunds = async (
  mintAddress: string,
  amount: number // Raw amount
) => {
  const payer = getPayer();
  const mint = new PublicKey(mintAddress);
  
  // Assuming the payer is the one shielding their own funds
  const account = getAssociatedTokenAddressSync(
    mint,
    payer.publicKey,
    false,
    TOKEN_2022_PROGRAM_ID
  );

  console.log("Shielding funds for:", payer.publicKey.toBase58());
  console.log("Amount:", amount);

  // 1. Airdrop (Mock env)
  await connection.requestAirdrop(payer.publicKey, 1e9).then(sig => 
    connection.confirmTransaction(sig, "confirmed")
  );

  // 2. Deposit Instruction
  // This takes Public Balance from the account and moves it to the "Confidential Pending" balance
  const depositIx = createDepositInstruction(
    account, // Token Account
    mint,    // Mint
    amount,  // Amount to shield
    payer.publicKey, // Authority
    [], 
    TOKEN_2022_PROGRAM_ID
  );

  const tx = new Transaction().add(depositIx);
  
  const sig = await sendAndConfirmTransaction(connection, tx, [payer]);
  console.log("Shield Transaction Confirmed:", sig);
  
  // NOTE: After depositing, you usually need to call `applyPendingBalance` 
  // to move funds from "Pending" to "Available" confidential balance.
  // This prevents front-running/timing attacks.
  
  return sig;
};

// Usage
if (process.argv[2]) {
    shieldFunds(process.argv[2], 1000).catch(console.error);
}
