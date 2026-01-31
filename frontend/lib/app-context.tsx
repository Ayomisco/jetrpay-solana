"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { Connection, PublicKey, clusterApiUrl, Transaction } from "@solana/web3.js";
import { 
  getAssociatedTokenAddress, 
  getMint,
  createAssociatedTokenAccountInstruction,
  createTransferCheckedInstruction,
  TOKEN_2022_PROGRAM_ID
} from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

// Types
export type UserRole = "employee" | "admin"

export interface TxHistoryItem {
  id: string
  type: "stream" | "withdrawal" | "deposit" | "payment"
  amount: number
  asset: string
  timestamp: string
  status: "confirmed" | "pending" | "failed"
  to?: string
  from?: string
  blockNumber: number
}

export interface Employee {
  id: string
  name: string
  role: string
  status: "Active" | "Paused"
  salary: number
  ratePerSecond: number
  accruedBalance: number
  walletAddress: string
  startDate: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  timestamp: string
  read: boolean
}

interface AppContextType {
  // Auth State
  isLoggedIn: boolean
  setIsLoggedIn: (val: boolean) => void
  userRole: UserRole
  setUserRole: (role: UserRole) => void
  userName: string
  setUserName: (name: string) => void
  userEmail: string
  setUserEmail: (email: string) => void
  walletAddress: string | null
  connectWallet: () => Promise<void>

  // Financial State
  accruedBalance: number
  streamingRate: number // per second
  transactions: TxHistoryItem[]
  employees: Employee[]
  companyStats: {
    monthlyBurn: number
    vaultBalance: number
    totalEmployees: number
    autoTopUpEnabled: boolean
    autoTopUpThreshold: number
    autoTopUpAmount: number
  }

  // Actions
  addTransaction: (tx: Omit<TxHistoryItem, "id" | "timestamp" | "status" | "blockNumber">) => void
  updateEmployeeStatus: (id: string, status: "Active" | "Paused") => void
  addEmployee: (emp: Employee) => void
  bulkAddEmployees: (emps: Employee[]) => void
  removeEmployee: (id: string) => void
  withdrawFunds: (amount: number, destination: string) => void
  depositFunds: (amount: number) => void
  requestAdvance: (amount: number, reason: string) => void
  updateAutoTopUp: (settings: { enabled: boolean; threshold: number; amount: number }) => void

  // System State
  notifications: Notification[]
  unreadCount: number
  addNotification: (notif: Omit<Notification, "id" | "timestamp" | "read">) => void
  markNotificationRead: (id: string) => void
  clearAllNotifications: () => void
  multiFactorEnabled: boolean
  toggleMultiFactor: () => void
  privateModeEnabled: boolean
  togglePrivateMode: () => void
  assessRisk: (wallet: string) => { score: number; level: string }
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: AppShellProps) {
  // Existing state with persistence
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState<UserRole>("employee")
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  // Load from LocalStorage on mount
  useEffect(() => {
    const savedLogin = localStorage.getItem("jetrpay_isLoggedIn") === "true"
    const savedRole = localStorage.getItem("jetrpay_role") as UserRole
    const savedName = localStorage.getItem("jetrpay_name")
    
    if (savedLogin) setIsLoggedIn(true)
    if (savedRole) setUserRole(savedRole)
    if (savedName) setUserName(savedName)
  }, [])

  // Persist changes
  useEffect(() => {
    localStorage.setItem("jetrpay_isLoggedIn", String(isLoggedIn))
    if (userRole) localStorage.setItem("jetrpay_role", userRole)
    if (userName) localStorage.setItem("jetrpay_name", userName)
  }, [isLoggedIn, userRole, userName])

  // Financial state
  const [accruedBalance, setAccruedBalance] = useState(0)
  const [streamingRate, setStreamingRate] = useState(0.0000)
  const [vaultBalance, setVaultBalance] = useState(0)

  // Data Persistence: Employees
  const [employees, setEmployees] = useState<Employee[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("jetrpay_employees")
    if (saved) {
      try {
        setEmployees(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to load employees", e)
      }
    }
  }, [])

  useEffect(() => {
    if (employees.length > 0) {
      localStorage.setItem("jetrpay_employees", JSON.stringify(employees))
    }
  }, [employees])

  // Risk Assessment Simulation (Deterministic based on address)
  const assessRisk = (walletAddr: string): { score: number; level: "Low" | "Medium" | "High" | "Critical" } => {
    // Simple hash to score
    let hash = 0;
    for (let i = 0; i < walletAddr.length; i++) {
      hash = ((hash << 5) - hash) + walletAddr.charCodeAt(i);
      hash |= 0; 
    }
    // Normalize to 0-100
    const score = Math.abs(hash % 100);
    
    let level: "Low" | "Medium" | "High" | "Critical" = "Low";
    if (score > 80) level = "Critical";
    else if (score > 50) level = "High";
    else if (score > 20) level = "Medium";

    return { score, level };
  }

  const [transactions, setTransactions] = useState<TxHistoryItem[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("jetrpay_transactions")
    if (saved) {
      try {
        setTransactions(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to load transactions", e)
      }
    }
  }, [])

  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem("jetrpay_transactions", JSON.stringify(transactions))
    }
  }, [transactions])

  // Notifications
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Stream Initialized",
      message: "Your Arbitrum One salary stream is now active.",
      type: "success",
      timestamp: new Date().toISOString(),
      read: false,
    },
  ])

  // Settings
  const [multiFactorEnabled, setMultiFactorEnabled] = useState(false)
  const [privateModeEnabled, setPrivateModeEnabled] = useState(false)

  // Auto-top-up settings
  const [autoTopUpSettings, setAutoTopUpSettings] = useState({
    enabled: true,
    threshold: 5000,
    amount: 20000,
  })

  // Real-time streaming effect
  useEffect(() => {
    if (isLoggedIn && userRole === "employee") {
      const interval = setInterval(() => {
        setAccruedBalance((prev) => prev + streamingRate)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isLoggedIn, userRole, streamingRate])

  // Real Balance Fetching (Solana Devnet)
  useEffect(() => {
    if (!walletAddress) return;

    const fetchBalances = async () => {
      try {
        const connection = new Connection(
          process.env.NEXT_PUBLIC_HELIUS_RPC_URL || clusterApiUrl("devnet"), 
          "confirmed"
        );
        const pubKey = new PublicKey(walletAddress);

        // 1. SOL Balance
        const solBalance = await connection.getBalance(pubKey);
        
        // 2. Token-2022 Balance (Confidential Mint)
        // Hardcoded Mint from our script output
        const MINT_ADDRESS = new PublicKey("5d4Nb7xFnjkXujjL95T6ktWMcXakc9YX5NqPcsTrGit3"); 
        let tokenBalance = 0;
        
        try {
           const ata = await getAssociatedTokenAddress(MINT_ADDRESS, pubKey, false, new PublicKey("TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"));
           const tokenAccount = await connection.getTokenAccountBalance(ata);
           tokenBalance = tokenAccount.value.uiAmount || 0;
        } catch (e) {
           console.log("No Token-2022 Account found");
        }

        // Update Context State
        // For Admin: Vault Balance = Real Wallet Balance (SOL + USDC Value)
        // Simply summing them for MVP visualization
        setVaultBalance(solBalance / 1e9 * 150 + tokenBalance); // Mocking SOL price $150
        
        console.log("Updated Balances:", { sol: solBalance / 1e9, token: tokenBalance });
      } catch (e) {
        console.error("Failed to fetch balances:", e);
      }
    };

    fetchBalances();
    const timer = setInterval(fetchBalances, 10000); // Poll every 10s
    return () => clearInterval(timer);
  }, [walletAddress]);

  // Wallet Adapter Hooks
  const { publicKey, connected, sendTransaction } = useWallet()
  const { setVisible } = useWalletModal()

  // Sync Wallet Adapter with Local State
  useEffect(() => {
    if (connected && publicKey) {
      const addr = publicKey.toString()
      setWalletAddress(addr)
      // Only set logged in if we have a role (onboarding flow handles the rest)
      if (!isLoggedIn) {
          // If we are already connected but not "logged in" app-wise, 
          // we might want to let onboarding handle the transition.
          // For now, we just sync the address.
      }
    } else {
      setWalletAddress(null)
    }
  }, [connected, publicKey, isLoggedIn])

  // Actions
  const connectWallet = async () => {
    // Open the wallet modal
    setVisible(true)
  }

  const addTransaction = (tx: Omit<TxHistoryItem, "id" | "timestamp" | "status" | "blockNumber">) => {
    const newTx: TxHistoryItem = {
      ...tx,
      id: "tx-" + Math.random().toString(36).slice(2, 9),
      timestamp: new Date().toISOString(),
      status: "confirmed",
      blockNumber: 83000 + transactions.length,
    }
    setTransactions((prev) => [newTx, ...prev])
  }

  const withdrawFunds = (amount: number, destination: string) => {
    if (amount <= accruedBalance) {
      setAccruedBalance((prev) => prev - amount)
      addTransaction({ type: "withdrawal", amount, asset: "USDC", to: destination })
      addNotification({
        title: "Withdrawal Successful",
        message: `${amount} USDC transferred to ${destination}`,
        type: "success",
      })
    }
  }

  const depositFunds = async (amount: number) => {
    if (!publicKey || !connected) {
      setVisible(true)
      return
    }

    try {
      addNotification({ title: "Initializing Shield", message: "Preparing Token-2022 transaction...", type: "info" })
      
      const connection = new Connection(
        process.env.NEXT_PUBLIC_HELIUS_RPC_URL || clusterApiUrl("devnet"), 
        "confirmed"
      )
      const MINT_ADDRESS = new PublicKey("5d4Nb7xFnjkXujjL95T6ktWMcXakc9YX5NqPcsTrGit3"); 
      const SHIELDED_WALLET = new PublicKey("5Kn6x3ie8rjNEhbUEtxj3aEu96oC13PojeDhyFBetSzV");

      // 1. Get Mint Info for decimals
      const mintInfo = await getMint(connection, MINT_ADDRESS, "confirmed", TOKEN_2022_PROGRAM_ID)
      const decimals = mintInfo.decimals
      const amountBigInt = BigInt(Math.floor(amount * Math.pow(10, decimals)))

      // 2. Derive ATAs
      const sourceAta = await getAssociatedTokenAddress(MINT_ADDRESS, publicKey, false, TOKEN_2022_PROGRAM_ID)
      const destAta = await getAssociatedTokenAddress(MINT_ADDRESS, SHIELDED_WALLET, false, TOKEN_2022_PROGRAM_ID)

      const tx = new Transaction()

      // 3. Check/Create Dest ATA (Shielded Vault) - User pays rent for MVP simplicity
      const destInfo = await connection.getAccountInfo(destAta)
      if (!destInfo) {
        tx.add(createAssociatedTokenAccountInstruction(
          publicKey, // Payer
          destAta,
          SHIELDED_WALLET,
          MINT_ADDRESS,
          TOKEN_2022_PROGRAM_ID
        ))
      }

      // 4. Transfer Public -> Shielded Vault
      tx.add(createTransferCheckedInstruction(
        sourceAta,
        MINT_ADDRESS,
        destAta,
        publicKey,
        amountBigInt,
        decimals,
        [],
        TOKEN_2022_PROGRAM_ID
      ))

      const signature = await sendTransaction(tx, connection)
      
      addNotification({ title: "Broadcasting", message: "Shielding transaction sent...", type: "info" })
      
      await connection.confirmTransaction(signature, "confirmed")

      // Update Local State on success
      setVaultBalance((prev) => prev + amount)
      addTransaction({ type: "deposit", amount, asset: "USDC" })
      
      addNotification({
        title: "Shielded Successfully",
        message: `Confidential Transfer Confirmed: ${signature.slice(0, 8)}...`,
        type: "success",
      })

    } catch (error: any) {
      console.error("Shielding failed", error)
      addNotification({
        title: "Shielding Failed",
        message: error.message || "Ensure you have the Mock USDC tokens.",
        type: "error",
      })
    }
  }

  const requestAdvance = (amount: number, reason: string) => {
    addNotification({
      title: "Advance Requested",
      message: `Request for ${amount} USDC submitted for approval. Reason: ${reason}`,
      type: "warning",
    })
  }

  const addNotification = (notif: Omit<Notification, "id" | "timestamp" | "read">) => {
    setNotifications((prev) => [
      {
        ...notif,
        id: Math.random().toString(36).slice(2, 9),
        timestamp: new Date().toISOString(),
        read: false,
      },
      ...prev,
    ])
  }

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const clearAllNotifications = () => {
    setNotifications([])
  }

  const bulkAddEmployees = (newEmps: Employee[]) => {
    setEmployees((prev) => [...prev, ...newEmps])
    addNotification({
      title: "Bulk Import Complete",
      message: `${newEmps.length} new agents enrolled via CSV protocol.`,
      type: "success",
    })
  }

  const updateAutoTopUp = (settings: { enabled: boolean; threshold: number; amount: number }) => {
    setAutoTopUpSettings(settings)
    addNotification({
      title: "Vault Strategy Updated",
      message: `Auto-top-up ${settings.enabled ? "enabled" : "disabled"} at ${settings.threshold} USDC.`,
      type: "info",
    })
  }

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userRole,
        setUserRole,
        userName,
        setUserName,
        userEmail,
        setUserEmail,
        walletAddress,
        connectWallet,
        accruedBalance,
        streamingRate,
        transactions,
        employees,
        companyStats: {
          monthlyBurn: employees.reduce((acc, emp) => acc + (emp.status === "Active" ? emp.salary / 12 : 0), 0),
          vaultBalance,
          totalEmployees: employees.length,
          autoTopUpEnabled: autoTopUpSettings.enabled,
          autoTopUpThreshold: autoTopUpSettings.threshold,
          autoTopUpAmount: autoTopUpSettings.amount,
        },
        addTransaction,
        updateEmployeeStatus: (id, status) => {
          setEmployees((prev) => prev.map((e) => (e.id === id ? { ...e, status } : e)))
          addNotification({
            title: "Status Updated",
            message: `Employee stream status changed to ${status}.`,
            type: "info",
          })
        },
        addEmployee: (emp) => {
          setEmployees((prev) => [...prev, emp])
          addNotification({
            title: "Agent Enrolled",
            message: `${emp.name} added to protocol payroll.`,
            type: "success",
          })
        },
        bulkAddEmployees,
        updateAutoTopUp,
        removeEmployee: (id) => {
          setEmployees((prev) => prev.filter((e) => e.id !== id))
          addNotification({
            title: "Access Revoked",
            message: "Employee access and stream terminated.",
            type: "error",
          })
        },
        withdrawFunds,
        depositFunds,
        requestAdvance,
        notifications,
        unreadCount: notifications.filter((n) => !n.read).length,
        addNotification,
        markNotificationRead,
        clearAllNotifications,
        multiFactorEnabled,
        toggleMultiFactor: () => setMultiFactorEnabled(!multiFactorEnabled),
        privateModeEnabled,
        togglePrivateMode: () => setPrivateModeEnabled(!privateModeEnabled),
        assessRisk,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}

interface AppShellProps {
  children: ReactNode
}
