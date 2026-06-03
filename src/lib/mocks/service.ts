import talentMocks from './talent.json';
import escrowMocks from './escrow.json';
import missionMocks from './missions.json';
import { supabase } from '@/utils/supabase/client';

export interface Talent {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rate: number;
  rating: number;
  availability: string;
  matching: {
    total: number;
    codeAudit: number;
    smartContracts: number;
    rateAvailability: number;
  };
  skills: string[];
  credentials: Array<{ platform: string; name: string; grade: string }>;
}

export interface EscrowContract {
  id: string;
  talentId: number;
  talentName: string;
  title: string;
  amount: number;
  currency: string;
  status: 'Pending' | 'Funded' | 'Delivered' | 'Disbursed';
  milestones: Array<{ id: string; title: string; amount: number; status: 'Pending' | 'Submitted' | 'Completed' }>;
  auditLogs?: string[];
}

export interface AirdropState {
  hasPass: boolean;
  passMinted: boolean;
  airdropClaimed: boolean;
  airdropStatus: 'Locked' | 'Claimable' | 'Claimed';
  missionPercent: number;
  milestonesCompleted: number;
}

export interface Mission {
  id: string;
  title: string;
  b2bName: string;
  b2bAvatar: string;
  description: string;
  rewardUsd: number;
  rewardTal: number;
  requiredSbt: string;
  requiredSbtName: string;
  status: 'Open' | 'Applied' | 'Active' | 'Delivered' | 'Disbursed';
  deliverableRepo?: string;
  auditScore?: number;
  escrowId?: string;
}

export interface SbtItem {
  id: string;
  name: string;
  platform: string;
  icon: string;
  issuer: string;
  schema: string;
  sig: string;
  network: string;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const IS_SERVER = typeof window === 'undefined';

const TALENT_KEY = 'dao_talent_list';
const ESCROW_KEY = 'dao_escrow_list';
const AIRDROP_KEY = 'dao_airdrop_state';
const BALANCE_KEY = 'dao_b2b_balance';
const MISSIONS_KEY = 'dao_missions_list';
const SBTS_KEY = 'dao_talent_sbts';

function getLocalStorage<T>(key: string, fallback: T): T {
  if (IS_SERVER) return fallback;
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : fallback;
}

function setLocalStorage<T>(key: string, value: T): void {
  if (IS_SERVER) return;
  localStorage.setItem(key, JSON.stringify(value));
}

export const initAirdropState: AirdropState = {
  hasPass: true,
  passMinted: true,
  airdropClaimed: false,
  airdropStatus: 'Locked',
  missionPercent: 0,
  milestonesCompleted: 0
};

export const initBalance = 12500;

export const defaultSbts: SbtItem[] = [
  {
    id: "sbt-git-103",
    name: "Verified Open-Source Contributor",
    platform: "GitHub Verified",
    icon: "🐙",
    issuer: "DAO Talent Hub GitHub Oracle #05",
    schema: "ERC-721 Soulbound Open Source Credential v1.0",
    sig: "0xf472...28ff4e",
    network: "Base Mainnet"
  },
  {
    id: "sbt-hf-space-001",
    name: "Open LLM & Dataset Curator SBT",
    platform: "Hugging Face Verified",
    icon: "🤗",
    issuer: "DAO Talent Hub HF Oracle #12",
    schema: "ERC-721 Soulbound AI Rep Credential v1.0",
    sig: "0x8fa1...d354b2",
    network: "Base Mainnet"
  },
  {
    id: "sbt-kaggle-gm-002",
    name: "Kaggle Grandmaster Rank SBT",
    platform: "Kaggle Verified",
    icon: "🏆",
    issuer: "DAO Talent Hub Kaggle Oracle #03",
    schema: "ERC-721 Soulbound DS Medal v1.0",
    sig: "0x3bc7...a56ef7",
    network: "Base Mainnet"
  },
  {
    id: "sbt-replicate-003",
    name: "ML API Production Deployer",
    platform: "Replicate Verified",
    icon: "🚀",
    issuer: "DAO Talent Hub Replicate Oracle #08",
    schema: "ERC-721 Soulbound Deploy Rep v1.0",
    sig: "0x91e2...f5481d",
    network: "Base Mainnet"
  },
  {
    id: "sbt-radicle-004",
    name: "P2P Sovereign Code Contributor",
    platform: "Radicle Protocol",
    icon: "🌱",
    issuer: "DAO Talent Hub Radicle Oracle #01",
    schema: "ERC-721 Soulbound P2P Credential v1.0",
    sig: "0x5df9...e7246b",
    network: "Base Mainnet"
  },
  {
    id: "sbt-dework-005",
    name: "Verified Web3 Bounty Hunter",
    platform: "Dework Protocol",
    icon: "💸",
    issuer: "DAO Talent Hub Dework Escrow #07",
    schema: "ERC-721 Soulbound Work History v1.0",
    sig: "0x63da...b1297e",
    network: "Base Mainnet"
  },
  {
    id: "sbt-gitcoin-006",
    name: "Web3 Public Goods Patron",
    platform: "Gitcoin Passport",
    icon: "🪙",
    issuer: "DAO Talent Hub Gitcoin Oracle #02",
    schema: "ERC-721 Soulbound Passport Score v1.0",
    sig: "0x74e1...29c4ba",
    network: "Base Mainnet"
  },
  {
    id: "sbt-ibm-qiskit-007",
    name: "Quantum Circuit Developer (Qiskit)",
    platform: "IBM Quantum Platform",
    icon: "⚛️",
    issuer: "DAO Talent Hub Quantum Oracle #04",
    schema: "ERC-721 Quantum Circuit Cert v1.0",
    sig: "0x43ff...28cc42",
    network: "Base Mainnet"
  },
  {
    id: "sbt-pennylane-008",
    name: "Quantum ML Practitioner",
    platform: "PennyLane Xanadu",
    icon: "🔬",
    issuer: "DAO Talent Hub PennyLane Oracle #11",
    schema: "ERC-721 Soulbound QML Cert v1.0",
    sig: "0x12ff...99bb88",
    network: "Base Mainnet"
  }
];

export async function fetchTalentList(): Promise<Talent[]> {
  try {
    const { data, error } = await supabase.from('talents').select('*');
    if (!error && data && data.length > 0) {
      return data as Talent[];
    }
  } catch (err) {
    console.warn('Supabase fetchTalentList failed, falling back to mocks', err);
  }

  await delay(1500);
  return getLocalStorage<Talent[]>(TALENT_KEY, talentMocks as Talent[]);
}

export async function fetchEscrowList(): Promise<EscrowContract[]> {
  try {
    const { data, error } = await supabase.from('escrows').select('*');
    if (!error && data && data.length > 0) {
      return data as EscrowContract[];
    }
  } catch (err) {
    console.warn('Supabase fetchEscrowList failed, falling back to mocks', err);
  }

  await delay(1500);
  return getLocalStorage<EscrowContract[]>(ESCROW_KEY, escrowMocks as EscrowContract[]);
}

export async function fetchAirdropState(): Promise<AirdropState> {
  await delay(1200);
  return getLocalStorage<AirdropState>(AIRDROP_KEY, initAirdropState);
}

export async function fetchB2bBalance(): Promise<number> {
  await delay(1000);
  return getLocalStorage<number>(BALANCE_KEY, initBalance);
}

export async function fetchClaimedPasses(): Promise<number> {
  await delay(800);
  // Simulating a backend call that might change over time
  return getLocalStorage<number>('dao_claimed_passes', 1842);
}

export async function addB2bBalance(amount: number): Promise<number> {
  await delay(1500);
  const current = getLocalStorage<number>(BALANCE_KEY, initBalance);
  const updated = current + amount;
  setLocalStorage(BALANCE_KEY, updated);
  return updated;
}

export async function createEscrowContract(talentId: number, title: string, amount: number): Promise<EscrowContract> {
  await delay(1500);
  const talents = getLocalStorage<Talent[]>(TALENT_KEY, talentMocks as Talent[]);
  const talent = talents.find(t => t.id === talentId);
  if (!talent) throw new Error("Talent not found");

  const escrows = getLocalStorage<EscrowContract[]>(ESCROW_KEY, escrowMocks as EscrowContract[]);
  
  const newContract: EscrowContract = {
    id: `escrow-${Date.now()}`,
    talentId,
    talentName: talent.name,
    title,
    amount,
    currency: 'USD',
    status: 'Funded',
    milestones: [
      { id: `m-${Date.now()}-1`, title: "Task 1: Architecture & Sandbox Setup", amount: amount / 2, status: 'Pending' },
      { id: `m-${Date.now()}-2`, title: "Task 2: Repository Delivery & Verification", amount: amount / 2, status: 'Pending' }
    ]
  };

  escrows.push(newContract);
  setLocalStorage(ESCROW_KEY, escrows);

  const balance = getLocalStorage<number>(BALANCE_KEY, initBalance);
  setLocalStorage(BALANCE_KEY, Math.max(0, balance - amount));

  return newContract;
}

export async function submitMilestone(escrowId: string, milestoneId: string): Promise<EscrowContract> {
  await delay(1500);
  const escrows = getLocalStorage<EscrowContract[]>(ESCROW_KEY, escrowMocks as EscrowContract[]);
  const escrow = escrows.find(e => e.id === escrowId);
  if (!escrow) throw new Error("Contract not found");

  const milestone = escrow.milestones.find(m => m.id === milestoneId);
  if (!milestone) throw new Error("Milestone not found");

  milestone.status = 'Submitted';
  escrow.status = 'Delivered';
  
  escrow.auditLogs = [
    `[${new Date().toLocaleTimeString()}] AI Oracle Sandbox initialized for payload: ${escrow.title}`,
    `[${new Date().toLocaleTimeString()}] Downloading code repository snapshots...`,
    `[${new Date().toLocaleTimeString()}] Static vulnerability scan: 0 alerts found.`,
    `[${new Date().toLocaleTimeString()}] Compiling codebase... SUCCESS.`,
    `[${new Date().toLocaleTimeString()}] Running automated integration tests (12/12)... SUCCESS.`,
    `[${new Date().toLocaleTimeString()}] Code efficiency match score: 98%`,
    `[${new Date().toLocaleTimeString()}] Verification successful. Ready for B2B escrow signature release.`
  ];

  setLocalStorage(ESCROW_KEY, escrows);
  return escrow;
}

export async function disburseEscrow(escrowId: string, milestoneId?: string): Promise<EscrowContract> {
  await delay(1500);
  const escrows = getLocalStorage<EscrowContract[]>(ESCROW_KEY, escrowMocks as EscrowContract[]);
  const escrow = escrows.find(e => e.id === escrowId);
  if (!escrow) throw new Error("Contract not found");

  let amountToDisburse = 0;

  if (milestoneId) {
    const milestone = escrow.milestones.find(m => m.id === milestoneId);
    if (!milestone) throw new Error("Milestone not found");
    if (milestone.status === 'Completed') throw new Error("Milestone already completed");
    
    milestone.status = 'Completed';
    amountToDisburse = milestone.amount;
    
    // Check if all milestones are completed
    const allDone = escrow.milestones.every(m => m.status === 'Completed');
    if (allDone) {
      escrow.status = 'Disbursed';
    } else {
      escrow.status = 'Funded';
    }
  } else {
    escrow.status = 'Disbursed';
    escrow.milestones.forEach(m => {
      if (m.status !== 'Completed') {
        amountToDisburse += m.amount;
        m.status = 'Completed';
      }
    });
  }

  setLocalStorage(ESCROW_KEY, escrows);

  const airdrop = getLocalStorage<AirdropState>(AIRDROP_KEY, initAirdropState);
  airdrop.airdropStatus = 'Claimable';
  airdrop.missionPercent = 100;
  airdrop.milestonesCompleted = Math.min(2, airdrop.milestonesCompleted + 1);
  setLocalStorage(AIRDROP_KEY, airdrop);

  // Credit the developer's balance with the disbursed amount in TAL (10:1 ratio)
  if (amountToDisburse > 0) {
    const currentTal = getLocalStorage<number>(USER_TAL_BALANCE_KEY, 10000);
    setLocalStorage(USER_TAL_BALANCE_KEY, currentTal + (amountToDisburse / 10));
  }

  return escrow;
}

export async function claimAirdrop(): Promise<AirdropState> {
  await delay(1500);
  const airdrop = getLocalStorage<AirdropState>(AIRDROP_KEY, initAirdropState);
  if (airdrop.airdropStatus !== 'Claimable') throw new Error("Airdrop is locked");
  
  airdrop.airdropStatus = 'Claimed';
  airdrop.airdropClaimed = true;
  setLocalStorage(AIRDROP_KEY, airdrop);
  return airdrop;
}

// --- NEW MISSIONS & DYNAMIC SBTS FUNCTIONS ---

export interface ActiveStake {
  id: string;
  amountTal: number;
  amountVeTal: number;
  lockMonths: number;
  unlockTimestamp: number;
  apy: number;
  status: 'Locked' | 'Expired' | 'Claimed';
}

export interface UserBalances {
  tal: number;
  veTal: number;
}

export interface CrossChainBalances {
  solana: number;
  bnb: number;
  base: number;
}

const CROSS_CHAIN_BALANCES_KEY = 'dao_cross_chain_balances';
const defaultCrossChainBalances: CrossChainBalances = { solana: 2500, bnb: 1200, base: 800 };

export async function fetchCrossChainBalances(): Promise<CrossChainBalances> {
  await delay(800);
  return getLocalStorage<CrossChainBalances>(CROSS_CHAIN_BALANCES_KEY, defaultCrossChainBalances);
}

export async function bridgeTokens(amount: number, fromChain: 'solana' | 'bnb' | 'base'): Promise<CrossChainBalances> {
  await delay(1500);
  const xchain = getLocalStorage<CrossChainBalances>(CROSS_CHAIN_BALANCES_KEY, defaultCrossChainBalances);
  
  if (xchain[fromChain] < amount) {
    throw new Error(`Insufficient TAL balance on ${fromChain.toUpperCase()}`);
  }

  // Deduct from source chain
  xchain[fromChain] -= amount;
  setLocalStorage(CROSS_CHAIN_BALANCES_KEY, xchain);

  // Credit to target liquid Base balance
  const currentTal = getLocalStorage<number>(USER_TAL_BALANCE_KEY, 1000);
  setLocalStorage(USER_TAL_BALANCE_KEY, currentTal + amount);

  return xchain;
}

const STAKES_KEY = 'dao_active_stakes';
const USER_TAL_BALANCE_KEY = 'dao_user_tal_balance';
const USER_VETAL_BALANCE_KEY = 'dao_user_vetal_balance';

export async function fetchUserBalances(): Promise<UserBalances> {
  await delay(800);
  const tal = getLocalStorage<number>(USER_TAL_BALANCE_KEY, 10000);
  const veTal = getLocalStorage<number>(USER_VETAL_BALANCE_KEY, 0);
  return { tal, veTal };
}

export async function addTalBalance(amount: number): Promise<number> {
  const current = getLocalStorage<number>(USER_TAL_BALANCE_KEY, 1000);
  const updated = current + amount;
  setLocalStorage(USER_TAL_BALANCE_KEY, updated);
  return updated;
}

export async function fetchActiveStakes(): Promise<ActiveStake[]> {
  await delay(800);
  return getLocalStorage<ActiveStake[]>(STAKES_KEY, []);
}

export async function createStake(amountTal: number, lockMonths: number): Promise<ActiveStake> {
  await delay(1500);
  const talBalance = getLocalStorage<number>(USER_TAL_BALANCE_KEY, 1000);
  if (talBalance < amountTal) throw new Error("Insufficient TAL balance");

  let multiplier = 0.02;
  let apy = 4;
  if (lockMonths >= 48) {
    multiplier = 1.00;
    apy = 36;
  } else if (lockMonths >= 12) {
    multiplier = 0.25;
    apy = 12;
  } else if (lockMonths >= 6) {
    multiplier = 0.10;
    apy = 8;
  }

  const amountVeTal = amountTal * multiplier;
  const unlockTimestamp = Date.now() + (lockMonths * 30 * 24 * 60 * 60 * 1000);

  const stakes = getLocalStorage<ActiveStake[]>(STAKES_KEY, []);
  const newStake: ActiveStake = {
    id: `stake-${Date.now()}`,
    amountTal,
    amountVeTal,
    lockMonths,
    unlockTimestamp,
    apy,
    status: 'Locked'
  };

  stakes.push(newStake);
  setLocalStorage(STAKES_KEY, stakes);

  setLocalStorage(USER_TAL_BALANCE_KEY, Math.max(0, talBalance - amountTal));
  const veTalBalance = getLocalStorage<number>(USER_VETAL_BALANCE_KEY, 0);
  setLocalStorage(USER_VETAL_BALANCE_KEY, veTalBalance + amountVeTal);

  return newStake;
}

export async function claimStakedTokens(stakeId: string): Promise<ActiveStake> {
  await delay(1500);
  const stakes = getLocalStorage<ActiveStake[]>(STAKES_KEY, []);
  const stake = stakes.find(s => s.id === stakeId);
  if (!stake) throw new Error("Stake position not found");
  if (stake.status === 'Claimed') throw new Error("Already claimed");

  stake.status = 'Claimed';
  setLocalStorage(STAKES_KEY, stakes);

  const talBalance = getLocalStorage<number>(USER_TAL_BALANCE_KEY, 1000);
  setLocalStorage(USER_TAL_BALANCE_KEY, talBalance + stake.amountTal);

  const veTalBalance = getLocalStorage<number>(USER_VETAL_BALANCE_KEY, 0);
  setLocalStorage(USER_VETAL_BALANCE_KEY, Math.max(0, veTalBalance - stake.amountVeTal));

  return stake;
}

export async function fetchMissionsList(): Promise<Mission[]> {
  try {
    const { data, error } = await supabase.from('missions').select('*');
    if (!error && data && data.length > 0) {
      return data as Mission[];
    }
  } catch (err) {
    console.warn('Supabase fetchMissionsList failed, falling back to mocks', err);
  }

  await delay(1200);
  return getLocalStorage<Mission[]>(MISSIONS_KEY, missionMocks as Mission[]);
}

export async function fetchTalentSbts(): Promise<SbtItem[]> {
  if (IS_SERVER) return defaultSbts;
  return getLocalStorage<SbtItem[]>(SBTS_KEY, defaultSbts);
}

export async function mintSbt(sbtId: string, sbtName: string, platform: string, icon: string): Promise<SbtItem> {
  const currentSbts = getLocalStorage<SbtItem[]>(SBTS_KEY, defaultSbts);
  if (currentSbts.some(s => s.id === sbtId)) {
    return currentSbts.find(s => s.id === sbtId)!;
  }

  const newSbt: SbtItem = {
    id: sbtId,
    name: sbtName,
    platform: platform,
    icon: icon,
    issuer: "DAO Labs AI Sandbox Oracle #12",
    schema: "ERC-721 Soulbound Skill Credential v1.0",
    sig: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 8)}`,
    network: "Base Sepolia Testnet"
  };

  currentSbts.push(newSbt);
  setLocalStorage(SBTS_KEY, currentSbts);

  // Award TAL to dynamic wallet balance on earning an SBT (e.g. 500 TAL)
  const currentTal = getLocalStorage<number>(USER_TAL_BALANCE_KEY, 1000);
  setLocalStorage(USER_TAL_BALANCE_KEY, currentTal + 500);

  return newSbt;
}

export async function applyToMission(missionId: string): Promise<Mission> {
  await delay(1500);
  const missions = getLocalStorage<Mission[]>(MISSIONS_KEY, missionMocks as Mission[]);
  const mission = missions.find(m => m.id === missionId);
  if (!mission) throw new Error("Mission not found");

  const sbts = getLocalStorage<SbtItem[]>(SBTS_KEY, defaultSbts);
  const hasSbt = sbts.some(s => s.id === mission.requiredSbt);
  if (!hasSbt) throw new Error("Missing required SBT badge");

  const escrows = getLocalStorage<EscrowContract[]>(ESCROW_KEY, escrowMocks as EscrowContract[]);
  const escrowId = `escrow-mission-${Date.now()}`;
  
  const newEscrow: EscrowContract = {
    id: escrowId,
    talentId: 99,
    talentName: "John Doe",
    title: mission.title,
    amount: mission.rewardUsd,
    currency: 'USD',
    status: 'Funded',
    milestones: [
      { id: `milestone-${Date.now()}-1`, title: `Delivery: ${mission.title}`, amount: mission.rewardUsd, status: 'Pending' }
    ]
  };

  escrows.push(newEscrow);
  setLocalStorage(ESCROW_KEY, escrows);

  const balance = getLocalStorage<number>(BALANCE_KEY, initBalance);
  setLocalStorage(BALANCE_KEY, Math.max(0, balance - mission.rewardUsd));

  mission.status = 'Active';
  mission.escrowId = escrowId;
  
  setLocalStorage(MISSIONS_KEY, missions);
  return mission;
}

export async function submitMissionDeliverable(missionId: string, repoUrl: string): Promise<Mission> {
  await delay(1500);
  const missions = getLocalStorage<Mission[]>(MISSIONS_KEY, missionMocks as Mission[]);
  const mission = missions.find(m => m.id === missionId);
  if (!mission) throw new Error("Mission not found");

  const escrows = getLocalStorage<EscrowContract[]>(ESCROW_KEY, escrowMocks as EscrowContract[]);
  const escrow = escrows.find(e => e.id === mission.escrowId);
  if (escrow) {
    escrow.status = 'Delivered';
    if (escrow.milestones[0]) {
      escrow.milestones[0].status = 'Submitted';
    }
    escrow.auditLogs = [
      `[${new Date().toLocaleTimeString()}] AI Sandbox Oracle initialized audit scanner for ${repoUrl}`,
      `[${new Date().toLocaleTimeString()}] Analyzing deliverable compliance against repository heuristics...`,
      `[${new Date().toLocaleTimeString()}] Vulnerability report: 0 medium/high issues detected.`,
      `[${new Date().toLocaleTimeString()}] Audit Score: 96% - PASS.`,
      `[${new Date().toLocaleTimeString()}] Alerting B2B smart contract release signatures...`
    ];
    setLocalStorage(ESCROW_KEY, escrows);
  }

  mission.status = 'Delivered';
  mission.deliverableRepo = repoUrl;
  mission.auditScore = 96;

  setLocalStorage(MISSIONS_KEY, missions);
  return mission;
}

export async function releaseMissionPayment(missionId: string): Promise<Mission> {
  await delay(1500);
  const missions = getLocalStorage<Mission[]>(MISSIONS_KEY, missionMocks as Mission[]);
  const mission = missions.find(m => m.id === missionId);
  if (!mission) throw new Error("Mission not found");

  const escrows = getLocalStorage<EscrowContract[]>(ESCROW_KEY, escrowMocks as EscrowContract[]);
  const escrow = escrows.find(e => e.id === mission.escrowId);
  if (escrow) {
    escrow.status = 'Disbursed';
    if (escrow.milestones[0]) {
      escrow.milestones[0].status = 'Completed';
    }
    setLocalStorage(ESCROW_KEY, escrows);
  }

  mission.status = 'Disbursed';
  setLocalStorage(MISSIONS_KEY, missions);

  const airdrop = getLocalStorage<AirdropState>(AIRDROP_KEY, initAirdropState);
  airdrop.airdropStatus = 'Claimable';
  airdrop.missionPercent = 100;
  airdrop.milestonesCompleted = Math.min(2, airdrop.milestonesCompleted + 1);
  setLocalStorage(AIRDROP_KEY, airdrop);

  // Award the USD reward converted to TAL as well in user balance
  const currentTal = getLocalStorage<number>(USER_TAL_BALANCE_KEY, 1000);
  setLocalStorage(USER_TAL_BALANCE_KEY, currentTal + mission.rewardTal);

  return mission;
}

export interface SmartWalletState {
  address: string;
  gasSponsoring: boolean;
  sponsoredTxsRemaining: number;
}

export interface Dispute {
  id: string;
  escrowId: string;
  title: string;
  description: string;
  devEvidence: string;
  b2bEvidence: string;
  amount: number;
  status: 'Open' | 'Resolved_Dev' | 'Resolved_B2B';
  votesDev: number;
  votesB2b: number;
  voters: string[];
}

const SMART_WALLET_KEY = 'dao_smart_wallet_state';
const DISPUTES_KEY = 'dao_disputes_list';

const defaultSmartWallet: SmartWalletState = {
  address: "0x8E192f159E0bC088f123472C6A91d354b2d42cc6",
  gasSponsoring: true,
  sponsoredTxsRemaining: 10
};

const defaultDisputes: Dispute[] = [
  {
    id: "dispute-1",
    escrowId: "escrow-mock-1",
    title: "AI Agent Context Cache Discrepancy",
    description: "La empresa B2B afirma que el agente LLM entregado no cumple con las directrices de caché semántica y supera el límite de latencia de 800ms. El desarrollador argumenta que el código cumple estrictamente con el esquema del repositorio y las pruebas unitarias integradas.",
    devEvidence: "Cache semántico basado en Redis implementado. Latencia media de 180ms en simulaciones locales con 500 llamadas consecutivas. Cobertura de tests al 98%.",
    b2bEvidence: "Latencia superior a 1200ms en el entorno de staging de AWS. El recolector de basura de la memoria se desborda tras 10 minutos de uso continuo.",
    amount: 1200,
    status: "Open",
    votesDev: 1420,
    votesB2b: 980,
    voters: []
  }
];

export async function fetchSmartWalletState(): Promise<SmartWalletState> {
  await delay(500);
  return getLocalStorage<SmartWalletState>(SMART_WALLET_KEY, defaultSmartWallet);
}

export async function toggleGasSponsoring(): Promise<SmartWalletState> {
  await delay(600);
  const state = getLocalStorage<SmartWalletState>(SMART_WALLET_KEY, defaultSmartWallet);
  state.gasSponsoring = !state.gasSponsoring;
  setLocalStorage(SMART_WALLET_KEY, state);
  return state;
}

export async function useSponsoredTx(): Promise<SmartWalletState> {
  const state = getLocalStorage<SmartWalletState>(SMART_WALLET_KEY, defaultSmartWallet);
  if (state.gasSponsoring && state.sponsoredTxsRemaining > 0) {
    state.sponsoredTxsRemaining -= 1;
    setLocalStorage(SMART_WALLET_KEY, state);
  }
  return state;
}

export async function fetchDisputesList(): Promise<Dispute[]> {
  await delay(800);
  return getLocalStorage<Dispute[]>(DISPUTES_KEY, defaultDisputes);
}

export async function voteOnDispute(disputeId: string, voteOption: 'DEV' | 'B2B', jurorVeTal: number): Promise<Dispute[]> {
  await delay(1200);
  const disputes = getLocalStorage<Dispute[]>(DISPUTES_KEY, defaultDisputes);
  const dispute = disputes.find(d => d.id === disputeId);
  if (!dispute) throw new Error("Dispute not found");
  if (dispute.status !== 'Open') throw new Error("Dispute is already resolved");

  if (voteOption === 'DEV') {
    dispute.votesDev += Math.round(jurorVeTal * 10);
  } else {
    dispute.votesB2b += Math.round(jurorVeTal * 10);
  }
  dispute.voters.push("current_user");
  
  // Instantly resolve dispute in demo mode if votes cross certain thresholds
  if (dispute.votesDev > 3000) {
    dispute.status = 'Resolved_Dev';
  } else if (dispute.votesB2b > 3000) {
    dispute.status = 'Resolved_B2B';
  }

  setLocalStorage(DISPUTES_KEY, disputes);
  return disputes;
}

export async function createDisputeFromEscrow(escrowId: string, title: string, amount: number, description: string): Promise<Dispute[]> {
  await delay(1200);
  const disputes = getLocalStorage<Dispute[]>(DISPUTES_KEY, defaultDisputes);
  const escrows = getLocalStorage<EscrowContract[]>(ESCROW_KEY, []);
  const escrow = escrows.find(e => e.id === escrowId);
  if (escrow) {
    escrow.status = 'Delivered';
    escrow.auditLogs = escrow.auditLogs || [];
    escrow.auditLogs.push(`[${new Date().toLocaleTimeString()}] B2B Client initiated a dispute on this contract.`);
    setLocalStorage(ESCROW_KEY, escrows);
  }

  const newDispute: Dispute = {
    id: `dispute-${Date.now()}`,
    escrowId,
    title,
    description,
    devEvidence: "El entregable cumple con todas las especificaciones detalladas en el smart contract y los tests unitarios.",
    b2bEvidence: description,
    amount,
    status: 'Open',
    votesDev: 120,
    votesB2b: 340,
    voters: []
  };

  disputes.push(newDispute);
  setLocalStorage(DISPUTES_KEY, disputes);
  return disputes;
}


export function resetDemoState(): void {
  if (IS_SERVER) return;
  localStorage.removeItem(TALENT_KEY);
  localStorage.removeItem(ESCROW_KEY);
  localStorage.removeItem(AIRDROP_KEY);
  localStorage.removeItem(BALANCE_KEY);
  localStorage.removeItem(MISSIONS_KEY);
  localStorage.removeItem(SBTS_KEY);
  localStorage.removeItem(STAKES_KEY);
  localStorage.removeItem(USER_TAL_BALANCE_KEY);
  localStorage.removeItem(USER_VETAL_BALANCE_KEY);
  localStorage.removeItem(CROSS_CHAIN_BALANCES_KEY);
  localStorage.removeItem(SMART_WALLET_KEY);
  localStorage.removeItem(DISPUTES_KEY);
}

