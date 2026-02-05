/**
 * Range Protocol API Client
 * 
 * Real integration with Range's Risk API for wallet compliance screening.
 * https://docs.range.org/risk-api/risk-introduction
 * 
 * Built for Solana Privacy Hackathon - Compliant Privacy Bounty
 * Sponsor: Range (@range_org on X)
 */

import dotenv from "dotenv";
dotenv.config();

const RANGE_API_BASE_URL = "https://api.range.org/v1";
const RANGE_API_KEY = process.env.RANGE_API_KEY || "";

// TypeScript types matching Range API response schema
export type RiskLevel =
  | "CRITICAL RISK (Directly malicious)"
  | "Extremely high risk"
  | "High risk"
  | "Medium risk"
  | "Low risk"
  | "Very low risk";

export interface MaliciousEvidence {
  address: string;
  distance: number;
  name_tag: string | null;
  entity: string | null;
  category: string;
}

export interface Attribution {
  name_tag: string;
  entity: string;
  category: string;
  address_role: string;
}

export interface AddressRiskResponse {
  riskScore: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  riskLevel: RiskLevel;
  numHops: number;
  maliciousAddressesFound: MaliciousEvidence[];
  reasoning: string;
  attribution?: Attribution | null;
}

export interface ComplianceResult {
  allowed: boolean;
  riskScore: number;
  riskLevel: RiskLevel;
  numHops: number;
  reasoning: string;
  maliciousAddresses: MaliciousEvidence[];
  attribution?: Attribution | null;
  rawResponse?: AddressRiskResponse;
}

/**
 * Risk Score Thresholds for JetrPay Compliance
 * 
 * Based on Range's scoring:
 * - 10: CRITICAL (directly malicious)
 * - 9-8: Extremely high risk (1 hop from malicious)
 * - 7-6: High risk (2 hops)
 * - 5-4: Medium risk (3 hops)
 * - 3-2: Low risk (4 hops)
 * - 1: Very low risk (5+ hops or known good)
 * 
 * JetrPay Policy: Block if riskScore >= 6 (High risk or above)
 */
const RISK_THRESHOLD = 6;

/**
 * Check wallet risk using Range Protocol's Address Risk API
 * 
 * @param walletAddress - Solana wallet address to screen
 * @returns ComplianceResult with risk assessment
 */
export const checkWalletRisk = async (walletAddress: string): Promise<ComplianceResult> => {
  console.log(`\n[Range Protocol] 🔍 Screening wallet: ${walletAddress}`);
  
  if (!RANGE_API_KEY) {
    console.warn("[Range Protocol] ⚠️  No API key found. Set RANGE_API_KEY in .env");
    console.warn("[Range Protocol] ⚠️  Using fallback mock response for development");
    return getMockResponse(walletAddress);
  }

  try {
    const url = new URL(`${RANGE_API_BASE_URL}/risk/address`);
    url.searchParams.append("address", walletAddress);
    url.searchParams.append("network", "solana");

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${RANGE_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[Range Protocol] ❌ API Error (${response.status}): ${errorText}`);
      
      // Handle specific error cases
      if (response.status === 401) {
        throw new Error("Invalid Range API key. Check your RANGE_API_KEY in .env");
      }
      if (response.status === 429) {
        throw new Error("Rate limited by Range API. Please wait and retry.");
      }
      
      throw new Error(`Range API error: ${response.status}`);
    }

    const data: AddressRiskResponse = await response.json();
    
    console.log(`[Range Protocol] ✅ Risk Score: ${data.riskScore}/10`);
    console.log(`[Range Protocol] 📊 Risk Level: ${data.riskLevel}`);
    console.log(`[Range Protocol] 🔗 Hops to malicious: ${data.numHops}`);
    console.log(`[Range Protocol] 💬 Reasoning: ${data.reasoning}`);
    
    if (data.maliciousAddressesFound.length > 0) {
      console.log(`[Range Protocol] ⚠️  Found ${data.maliciousAddressesFound.length} connected malicious address(es)`);
    }

    const allowed = data.riskScore < RISK_THRESHOLD;
    
    return {
      allowed,
      riskScore: data.riskScore,
      riskLevel: data.riskLevel,
      numHops: data.numHops,
      reasoning: data.reasoning,
      maliciousAddresses: data.maliciousAddressesFound,
      attribution: data.attribution,
      rawResponse: data,
    };

  } catch (error: any) {
    console.error(`[Range Protocol] ❌ Error: ${error.message}`);
    
    // In production, you might want to fail-closed (reject on error)
    // For hackathon/dev, we'll use a fallback
    console.warn("[Range Protocol] ⚠️  Using fallback response due to API error");
    return getMockResponse(walletAddress);
  }
};

/**
 * Fallback mock response for development/testing without API key
 */
const getMockResponse = (walletAddress: string): ComplianceResult => {
  // Simulate different risk levels based on address patterns
  const lowerAddr = walletAddress.toLowerCase();
  
  // Known malicious pattern (for testing)
  if (lowerAddr.startsWith("risk") || lowerAddr.includes("hack") || lowerAddr.includes("exploit")) {
    return {
      allowed: false,
      riskScore: 10,
      riskLevel: "CRITICAL RISK (Directly malicious)",
      numHops: 0,
      reasoning: "[MOCK] Address matches known malicious pattern for testing",
      maliciousAddresses: [{
        address: walletAddress,
        distance: 0,
        name_tag: "Test Malicious",
        entity: null,
        category: "test_blocked"
      }],
    };
  }

  // Medium risk pattern (for testing)
  if (lowerAddr.includes("medium") || lowerAddr.includes("warn")) {
    return {
      allowed: false,
      riskScore: 7,
      riskLevel: "High risk",
      numHops: 2,
      reasoning: "[MOCK] Address exhibits medium risk patterns for testing",
      maliciousAddresses: [],
    };
  }

  // Default: Clean wallet
  return {
    allowed: true,
    riskScore: 1,
    riskLevel: "Very low risk",
    numHops: 5,
    reasoning: "[MOCK] No suspicious paths found within 5 hops. Note: Using mock response - set RANGE_API_KEY for real screening.",
    maliciousAddresses: [],
  };
};

/**
 * Validate that a wallet can enter the JetrPay privacy pool
 * This is the main entry point for compliance checks
 * 
 * @param walletAddress - Solana wallet address
 * @returns true if wallet is allowed, throws if rejected
 */
export const validateWalletForShielding = async (walletAddress: string): Promise<boolean> => {
  console.log("\n" + "=".repeat(60));
  console.log("  RANGE PROTOCOL COMPLIANCE CHECK");
  console.log("  Pre-screening wallet before entering privacy pool");
  console.log("=".repeat(60));
  
  const result = await checkWalletRisk(walletAddress);
  
  console.log("\n" + "-".repeat(60));
  console.log(`  DECISION: ${result.allowed ? "✅ APPROVED" : "❌ REJECTED"}`);
  console.log("-".repeat(60));
  
  if (!result.allowed) {
    throw new Error(
      `Wallet compliance check failed!\n` +
      `Risk Score: ${result.riskScore}/10 (Threshold: ${RISK_THRESHOLD})\n` +
      `Risk Level: ${result.riskLevel}\n` +
      `Reason: ${result.reasoning}\n` +
      `\nThis wallet cannot shield funds in JetrPay's privacy pool.`
    );
  }
  
  return true;
};

// Export threshold for use elsewhere
export const COMPLIANCE_RISK_THRESHOLD = RISK_THRESHOLD;

// CLI usage
if (require.main === module) {
  const testAddress = process.argv[2] || "7AmvTQJAQAseV53Sqbnwxm3MTKKy6chZa1rhT1FqRkfL";
  
  console.log("\n🔒 JetrPay Compliance Check\n");
  console.log("Testing wallet:", testAddress);
  
  checkWalletRisk(testAddress)
    .then(result => {
      console.log("\n📋 Full Result:", JSON.stringify(result, null, 2));
    })
    .catch(console.error);
}
