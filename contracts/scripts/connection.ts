import { Connection, clusterApiUrl } from "@solana/web3.js";
import * as dotenv from "dotenv";
import * as path from "path";

// Load environment variables from frontend .env.local
const envPath = path.join(__dirname, "../../frontend/.env.local");
dotenv.config({ path: envPath });

// Get RPC URL from environment or use default
const getRpcUrl = (): string => {
  const heliusRpc = process.env.NEXT_PUBLIC_HELIUS_RPC_URL;
  
  if (heliusRpc) {
    console.log("✅ Using Helius RPC from environment");
    return heliusRpc;
  }
  
  console.log("⚠️  Using default Solana devnet RPC");
  return clusterApiUrl("devnet");
};

// Create and export a singleton connection
export const getConnection = (): Connection => {
  return new Connection(getRpcUrl(), "confirmed");
};

export default getConnection;
