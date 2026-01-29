import { Keypair } from "@solana/web3.js";
import * as fs from "fs";
import * as path from "path";

const KEYS_DIR = path.join(__dirname, "../keys");

// Ensure keys directory exists
if (!fs.existsSync(KEYS_DIR)) {
  fs.mkdirSync(KEYS_DIR, { recursive: true });
}

export const loadOrGenerateKeypair = (name: string): Keypair => {
  const filePath = path.join(KEYS_DIR, `${name}.json`);

  if (fs.existsSync(filePath)) {
    console.log(`Loading existing keypair: ${name}`);
    const secretKeyString = fs.readFileSync(filePath, "utf-8");
    const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
    return Keypair.fromSecretKey(secretKey);
  }

  console.log(`Generating new keypair: ${name}`);
  const keypair = Keypair.generate();
  fs.writeFileSync(filePath, JSON.stringify(Array.from(keypair.secretKey)));
  return keypair;
};

export const saveKeypair = (name: string, keypair: Keypair) => {
    const filePath = path.join(KEYS_DIR, `${name}.json`);
    fs.writeFileSync(filePath, JSON.stringify(Array.from(keypair.secretKey)));
    console.log(`Saved keypair: ${name} to ${filePath}`);
}
