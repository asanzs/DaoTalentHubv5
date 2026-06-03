"use client";

import React, { useEffect } from "react";
import { useWriteContract, useAccount } from "wagmi";
import { toast } from "sonner";
import { Award, Loader2 } from "lucide-react";

// TODO: Update this with your deployed contract address
const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000" as const;

// Minimal ABI for minting the SBT
const CONTRACT_ABI = [
  {
    type: "function",
    name: "mintCredential",
    inputs: [
      { name: "account", type: "address" },
      { name: "credentialId", type: "uint256" }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  }
] as const;

export default function MintSBTButton() {
  const { address } = useAccount();
  const { writeContract, isPending, isSuccess, isError, error } = useWriteContract();

  const handleMint = () => {
    if (!address) {
      toast.error("Por favor, conecta tu wallet primero");
      return;
    }

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: "mintCredential",
      args: [address, BigInt(1)], // Mints credential ID 1
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("¡SBT minteado con éxito!");
    }
    if (isError) {
      toast.error(`Error al mintear: ${error?.message || "Desconocido"}`);
    }
  }, [isSuccess, isError, error]);

  return (
    <button
      onClick={handleMint}
      disabled={isPending}
      className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#00F5FF] to-[#9B5DE5] text-black font-black text-sm hover:opacity-90 transition-all shadow-[0_0_20px_rgba(0,245,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isPending ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Award className="w-4 h-4" />
      )}
      {isPending ? "Minteando..." : "Mintear SBT"}
    </button>
  );
}
