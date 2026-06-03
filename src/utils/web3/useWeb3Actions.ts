import { useState } from 'react';
import { Address } from 'viem';
import { simulateAccountAbstraction, mintSBT, airdropTokens } from './BaseService';

export function useWeb3Actions() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLinkAccount = async (userId: string, walletAddress: Address) => {
    setIsLoading(true);
    setError(null);
    try {
      const hash = await simulateAccountAbstraction(userId, walletAddress);
      return hash;
    } catch (err: any) {
      setError(err.message || 'Failed to link account');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleMintSBT = async (toAddress: Address, tokenURI: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const receipt = await mintSBT(toAddress, tokenURI);
      return receipt;
    } catch (err: any) {
      setError(err.message || 'Failed to mint SBT');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleAirdrop = async (toAddress: Address, amountStr: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Amount would typically be in wei. Here we just expect it to be scaled appropriately.
      const amount = BigInt(amountStr);
      const receipt = await airdropTokens(toAddress, amount);
      return receipt;
    } catch (err: any) {
      setError(err.message || 'Failed to process airdrop');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    handleLinkAccount,
    handleMintSBT,
    handleAirdrop,
  };
}
