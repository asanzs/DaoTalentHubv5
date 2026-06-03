export const TALENT_HUB_ADDRESS = process.env.NEXT_PUBLIC_TALENT_HUB_ADDRESS || '0x0000000000000000000000000000000000000000';

export const TALENT_HUB_ABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "string", "name": "tokenURI", "type": "string" }
    ],
    "name": "mintSBT",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "airdropTAL",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "userId", "type": "string" },
      { "internalType": "address", "name": "wallet", "type": "address" }
    ],
    "name": "linkAccount",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;
