import {
  Connection,
  PublicKey,
  clusterApiUrl,
  sendAndConfirmTransaction,
  Transaction,
} from "@solana/web3.js";
import {
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
  createTransferCheckedInstruction,
  getAccount,
  getMint,
} from "@solana/spl-token";

import { loadOrGenerateKeypair } from "./utils";

// Token-2022 Program ID
const TOKEN_2022_PROGRAM_ID = new PublicKey("TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb");

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// Helpers
const getPayer = () => loadOrGenerateKeypair("payer");
const getShieldedWallet = () => loadOrGenerateKeypair("shielded-wallet");

export const shieldFunds = async (
  mintAddress: string,
  amount: number // Raw amount (without decimals)
) => {
  const payer = getPayer();
  const shieldedWallet = getShieldedWallet();

  const cleanMintAddress = mintAddress.trim();
  console.log("Using Mint Address:", `"${cleanMintAddress}"`);
  console.log("Shielding funds for:", payer.publicKey.toBase58());
  console.log("Amount:", amount);

  const mint = new PublicKey(cleanMintAddress);

  // Check SOL balance
  const balance = await connection.getBalance(payer.publicKey);
  console.log("Current Balance:", balance / 1e9, "SOL");
  
  if (balance < 0.01 * 1e9) {
    console.log("Requesting Airdrop...");
    const sig = await connection.requestAirdrop(payer.publicKey, 1e9);
    await connection.confirmTransaction(sig);
    console.log("Airdrop confirmed");
  } else {
    console.log("✅ Balance sufficient, skipping airdrop.");
  }

  // Get mint info to determine decimals
  let decimals = 6; // Default for USDC-like tokens
  try {
    const mintInfo = await getMint(connection, mint, "confirmed", TOKEN_2022_PROGRAM_ID);
    decimals = mintInfo.decimals;
    console.log("Token Decimals:", decimals);
  } catch (e) {
    console.log("Could not fetch mint info, using default decimals:", decimals);
  }

  // Calculate amount with decimals
  const amountWithDecimals = BigInt(amount) * BigInt(10 ** decimals);

  // Source ATA (Public)
  const sourceAta = await getAssociatedTokenAddress(
    mint,
    payer.publicKey,
    false,
    TOKEN_2022_PROGRAM_ID
  );
  console.log("Source ATA:", sourceAta.toBase58());

  // Check source balance
  try {
    const rawInfo = await connection.getAccountInfo(sourceAta, "confirmed");
    if (!rawInfo) {
       console.error("❌ Source Account Info is NULL (Not found on chain)");
       console.error("   Run 'npm run create-account' first to set up your token account.");
       return;
    } else {
       console.log(`Source Account Debug: Owner=${rawInfo.owner.toBase58()}, Len=${rawInfo.data.length}, Lamports=${rawInfo.lamports}`);
    }

    // Manual Decode (offset 64 is Amount)
    const amountData = rawInfo.data.subarray(64, 72);
    const balance = amountData.readBigUInt64LE(0);
    console.log("Source Token Balance:", balance.toString());

    if (balance < amountWithDecimals) {
      console.error(`❌ Insufficient token balance. Have: ${balance}, Need: ${amountWithDecimals}`);
      return;
    }
  } catch (e: any) {
    console.error("❌ Error checking source balance:", e);
    return;
  }

  // Destination ATA (Shielded)
  const destAta = await getAssociatedTokenAddress(
    mint,
    shieldedWallet.publicKey,
    false,
    TOKEN_2022_PROGRAM_ID
  );
  console.log("Destination ATA (Shielded):", destAta.toBase58());

  const tx = new Transaction();

  // Check if Dest ATA exists, if not create it
  const destAccountInfo = await connection.getAccountInfo(destAta);
  if (!destAccountInfo) {
    console.log("Initializing Shielded Vault...");
    tx.add(
      createAssociatedTokenAccountInstruction(
        payer.publicKey,
        destAta,
        shieldedWallet.publicKey,
        mint,
        TOKEN_2022_PROGRAM_ID
      )
    );
  }

  // Transfer using transferChecked (required for Token-2022)
  tx.add(
    createTransferCheckedInstruction(
      sourceAta,
      mint,
      destAta,
      payer.publicKey,
      amountWithDecimals,
      decimals,
      [],
      TOKEN_2022_PROGRAM_ID
    )
  );

  console.log(`\nShielding ${amount} tokens (${amountWithDecimals} raw)...`);
  console.log(`From: ${payer.publicKey.toBase58()} (Public)`);
  console.log(`To:   ${shieldedWallet.publicKey.toBase58()} (Shielded Vault)`);

  try {
    const sig = await sendAndConfirmTransaction(connection, tx, [payer]);
    console.log("\n✅ Shield Transaction Confirmed:", sig);
    console.log(`   View: https://explorer.solana.com/tx/${sig}?cluster=devnet`);
    return sig;
  } catch (e: any) {
    console.error("\n❌ Transaction failed:", e.message);
    if (e.logs) {
      console.error("Logs:", e.logs.join("\n"));
    }
    throw e;
  }
};

// Usage
if (process.argv[2]) {
  const amount = parseInt(process.argv[3] || "1000", 10);
  shieldFunds(process.argv[2], amount).catch(console.error);
}
