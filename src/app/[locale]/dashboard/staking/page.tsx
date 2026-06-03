"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Coins, Globe, ArrowRight, ShieldCheck } from "lucide-react";
import { useAccount } from "@/context/Web3Provider";
import { 
  fetchActiveStakes, 
  createStake, 
  claimStakedTokens, 
  fetchUserBalances, 
  ActiveStake, 
  UserBalances,
  fetchCrossChainBalances,
  bridgeTokens,
  CrossChainBalances
} from "@/lib/mocks/service";

export default function StakingPage() {
  const tApp = useTranslations('app');
  const { isConnected } = useAccount();

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stakes, setStakes] = useState<ActiveStake[]>([]);
  const [balances, setBalances] = useState<UserBalances>({ tal: 0, veTal: 0 });
  const [xBalances, setXBalances] = useState<CrossChainBalances>({ solana: 0, bnb: 0, base: 0 });
  
  const [stakeAmount, setStakeAmount] = useState<number>(200);
  const [lockMonths, setLockMonths] = useState<number>(12);
  const [stakingLoading, setStakingLoading] = useState(false);
  const [unstakingId, setUnstakingId] = useState<string | null>(null);

  const [bridgeAmount, setBridgeAmount] = useState<number>(500);
  const [sourceChain, setSourceChain] = useState<'solana' | 'bnb' | 'base'>('solana');
  const [bridgingLoading, setBridgingLoading] = useState(false);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [userBalances, activeStakes, crossChainBal] = await Promise.all([
        fetchUserBalances(),
        fetchActiveStakes(),
        fetchCrossChainBalances()
      ]);
      setBalances(userBalances);
      setStakes(activeStakes);
      setXBalances(crossChainBal);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    loadData();
  }, [loadData]);

  const handleCreateStake = async (e: React.FormEvent) => {
    e.preventDefault();
    if (stakeAmount <= 0) return;
    setStakingLoading(true);
    try {
      await createStake(stakeAmount, lockMonths);
      await loadData();
      alert("¡Staking realizado con éxito! Tu poder de voto (veTAL) ha sido actualizado.");
    } catch (err: any) {
      alert(err.message || "Error al realizar el staking");
    } finally {
      setStakingLoading(false);
    }
  };

  const handleUnstake = async (stakeId: string) => {
    setUnstakingId(stakeId);
    try {
      await claimStakedTokens(stakeId);
      await loadData();
      alert("¡Tokens retirados con éxito! El balance TAL ha sido actualizado.");
    } catch (err: any) {
      alert(err.message || "Error al retirar tokens");
    } finally {
      setUnstakingId(null);
    }
  };

  const handleBridgeTokens = async (e: React.FormEvent) => {
    e.preventDefault();
    if (bridgeAmount <= 0) return;
    setBridgingLoading(true);
    try {
      await new Promise(r => setTimeout(r, 1500)); // simulate delay
      await bridgeTokens(bridgeAmount, sourceChain);
      await loadData();
      alert(`¡Bridge completado! ${bridgeAmount} TAL transferidos a Base Network con éxito.`);
    } catch (err: any) {
      alert(err.message || "Error en el bridge");
    } finally {
      setBridgingLoading(false);
    }
  };

  if (!mounted) return null;

  const getMultiplier = (months: number) => {
    if (months >= 48) return 1.00;
    if (months >= 12) return 0.25;
    if (months >= 6) return 0.10;
    return 0.02;
  };
  const getApy = (months: number) => {
    if (months >= 48) return 36;
    if (months >= 12) return 12;
    if (months >= 6) return 8;
    return 4;
  };

  return (
    <div className="space-y-12 pb-24">
      {/* Staking Calculator & Interface */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#F59E0B] to-[#D97706]" />
          <h2 className="text-2xl font-black mb-2 text-white flex items-center gap-2">
            <Coins className="w-6 h-6 text-[#F59E0B]" />
            Bloqueo y Staking (veTAL)
          </h2>
          <p className="text-sm text-gray-400 mb-8">{tApp('lockTalTokens')}</p>

          <form onSubmit={handleCreateStake} className="space-y-6 relative z-10">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Cantidad a bloquear ($TAL)</label>
              <div className="relative">
                <input 
                  type="number" 
                  min="1" 
                  step="1"
                  max={balances.tal}
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(Number(e.target.value))}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-xl font-mono text-white focus:outline-none focus:border-[#F59E0B]/50 transition-colors"
                />
                <button type="button" onClick={() => setStakeAmount(balances.tal)} className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 rounded bg-white/10 text-xs font-bold hover:bg-white/20 transition-colors">MAX</button>
              </div>
              <p className="text-[10px] text-gray-500 mt-2 text-right">Balance: {balances.tal.toFixed(2)} TAL</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Periodo de bloqueo</label>
              <input 
                type="range" 
                min="1" 
                max="48" 
                value={lockMonths}
                onChange={(e) => setLockMonths(Number(e.target.value))}
                className="w-full accent-[#F59E0B]"
              />
              <div className="flex justify-between text-xs font-bold text-[#F59E0B] mt-2">
                <span>1 Mes</span>
                <span>{lockMonths} Meses</span>
                <span>48 Meses</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/20">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Poder de Voto Estimado:</span>
                <span className="font-bold text-white">{(stakeAmount * getMultiplier(lockMonths)).toFixed(2)} veTAL</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Rendimiento (APY):</span>
                <span className="font-bold text-green-400">+{getApy(lockMonths)}%</span>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={stakingLoading || stakeAmount <= 0 || balances.tal < stakeAmount}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-black font-black text-sm uppercase tracking-widest hover:opacity-90 transition-all disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {stakingLoading ? "Procesando..." : "Bloquear Tokens"} <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Bridge Section */}
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#A855F7] to-[#7E22CE]" />
          <h2 className="text-2xl font-black mb-2 text-white flex items-center gap-2">
            <Globe className="w-6 h-6 text-[#A855F7]" />
            Cross-Chain Bridge
          </h2>
          <p className="text-sm text-gray-400 mb-8">{tApp('transferTalLiq')}</p>

          <form onSubmit={handleBridgeTokens} className="space-y-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Origen</label>
                <select 
                  value={sourceChain}
                  onChange={(e) => setSourceChain(e.target.value as any)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-sm font-bold text-white focus:outline-none focus:border-[#A855F7]/50 appearance-none cursor-pointer"
                >
                  <option value="solana">Solana (SPL)</option>
                  <option value="bnb">BNB Chain (BEP20)</option>
                </select>
                <p className="text-[10px] text-gray-500 mt-2 text-right">Disponible: {xBalances[sourceChain]} TAL</p>
              </div>
              
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mt-4">
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </div>

              <div className="flex-1">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Destino</label>
                <div className="w-full bg-[#0052FF]/10 border border-[#0052FF]/30 rounded-xl px-4 py-4 text-sm font-bold text-[#0052FF] flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  Base (ERC20)
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Cantidad a transferir</label>
              <div className="relative">
                <input 
                  type="number" 
                  min="1" 
                  step="1"
                  max={xBalances[sourceChain]}
                  value={bridgeAmount}
                  onChange={(e) => setBridgeAmount(Number(e.target.value))}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-xl font-mono text-white focus:outline-none focus:border-[#A855F7]/50 transition-colors"
                />
                <button type="button" onClick={() => setBridgeAmount(xBalances[sourceChain])} className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 rounded bg-white/10 text-xs font-bold hover:bg-white/20 transition-colors">MAX</button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={bridgingLoading || bridgeAmount <= 0 || xBalances[sourceChain] < bridgeAmount}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#A855F7] to-[#7E22CE] text-white font-black text-sm uppercase tracking-widest hover:opacity-90 transition-all disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {bridgingLoading ? "Verificando firmas..." : "Ejecutar Bridge Interoperable"}
            </button>
          </form>
        </div>
      </div>

      {/* Active Stakes List */}
      <div className="p-8 rounded-3xl bg-white/5 border border-white/10 shadow-xl">
        <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-6">Posiciones Activas (Staking)</h3>
        {stakes.length === 0 ? (
          <p className="text-xs text-gray-500 text-center py-6">No tienes posiciones de staking activas.</p>
        ) : (
          <div className="space-y-4">
            {stakes.map(stake => (
              <div key={stake.id} className="flex flex-col md:flex-row justify-between items-center p-4 rounded-xl bg-black/30 border border-white/5">
                <div className="flex gap-6 items-center">
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase font-bold block">Bloqueado</span>
                    <span className="text-lg font-mono font-bold text-white">{stake.amountTal} TAL</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase font-bold block">Poder (veTAL)</span>
                    <span className="text-lg font-mono font-bold text-[#F59E0B]">{stake.amountVeTal}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase font-bold block">Desbloqueo</span>
                    <span className="text-sm font-bold text-gray-300">{new Date(stake.unlockTimestamp).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <button
                  onClick={() => handleUnstake(stake.id)}
                  disabled={stake.status === 'Claimed' || Date.now() < stake.unlockTimestamp || unstakingId === stake.id}
                  className={`px-6 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all mt-4 md:mt-0 ${
                    stake.status === 'Claimed' 
                      ? 'bg-white/5 text-gray-500 border border-white/5'
                      : Date.now() < stake.unlockTimestamp
                      ? 'bg-white/5 text-gray-500 border border-white/10 cursor-not-allowed'
                      : 'bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20'
                  }`}
                >
                  {unstakingId === stake.id ? 'Retirando...' : stake.status === 'Claimed' ? 'Retirado' : Date.now() < stake.unlockTimestamp ? 'Bloqueado' : 'Retirar Tokens'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
