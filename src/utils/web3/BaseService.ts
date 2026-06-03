import { createPublicClient, createWalletClient, http, custom, Address } from 'viem';
import { base, baseSepolia } from 'viem/chains';
import { TALENT_HUB_ABI, TALENT_HUB_ADDRESS } from './contracts';

// Select network based on environment (default to Sepolia for development)
export const chain = process.env.NEXT_PUBLIC_USE_MAINNET === 'true' ? base : baseSepolia;

// Public client for reading from the blockchain
export const publicClient = createPublicClient({
  chain,
  transport: http(),
});

// Wallet client for writing to the blockchain (requires window.ethereum)
export const getWalletClient = () => {
  if (typeof window !== 'undefined' && (window as any).ethereum) {
    return createWalletClient({
      chain,
      transport: custom((window as any).ethereum),
    });
  }
  return null;
};

/**
 * Simulate Account Abstraction:
 * Links an authenticated User ID to a Web3 Wallet Address.
 * In a true AA environment, this might deploy a Smart Wallet (e.g., Safe, Biconomy) 
 * for the user based on their social login (like Web3Auth or Privy).
 */
export const simulateAccountAbstraction = async (userId: string, walletAddress: Address) => {
  console.log(`[Account Abstraction] Deploying/Linking Smart Wallet for user: ${userId}`);
  
  try {
    const walletClient = getWalletClient();
    if (!walletClient) throw new Error('No wallet client available');
    
    const [account] = await walletClient.getAddresses();
    
    // Simulate smart contract call to register the user mapping on-chain
    const { request } = await publicClient.simulateContract({
      address: TALENT_HUB_ADDRESS as Address,
      abi: TALENT_HUB_ABI,
      functionName: 'linkAccount',
      args: [userId, walletAddress],
      account,
    });
    
    const hash = await walletClient.writeContract(request);
    await publicClient.waitForTransactionReceipt({ hash });
    
    console.log(`Successfully linked account on-chain. TX: ${hash}`);
    return hash;
  } catch (error) {
    console.error('Error linking account:', error);
    throw error;
  }
};

/**
 * Mint a Soulbound Token (SBT) for the user to represent their DAO membership/reputation
 */
export const mintSBT = async (toAddress: Address, tokenURI: string) => {
  try {
    const walletClient = getWalletClient();
    if (!walletClient) throw new Error('No wallet client available');
    
    const [account] = await walletClient.getAddresses();

    const { request } = await publicClient.simulateContract({
      address: TALENT_HUB_ADDRESS as Address,
      abi: TALENT_HUB_ABI,
      functionName: 'mintSBT',
      args: [toAddress, tokenURI],
      account,
    });
    
    const hash = await walletClient.writeContract(request);
    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    
    return receipt;
  } catch (error) {
    console.error('Error minting SBT:', error);
    throw error;
  }
};

/**
 * Airdrop $TAL tokens to the user
 */
export const airdropTokens = async (toAddress: Address, amount: bigint) => {
  try {
    const walletClient = getWalletClient();
    if (!walletClient) throw new Error('No wallet client available');
    
    const [account] = await walletClient.getAddresses();

    const { request } = await publicClient.simulateContract({
      address: TALENT_HUB_ADDRESS as Address,
      abi: TALENT_HUB_ABI,
      functionName: 'airdropTAL',
      args: [toAddress, amount],
      account,
    });
    
    const hash = await walletClient.writeContract(request);
    const receipt = await publicClient.waitForTransactionReceipt({ hash });
    
    return receipt;
  } catch (error) {
    console.error('Error airdropping tokens:', error);
    throw error;
  }
};
