"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Coins, ChevronRight, HelpCircle, ArrowRight, Zap, ShieldCheck } from "lucide-react";
import { 
  fetchActiveStakes, 
  createStake, 
  fetchUserBalances, 
  ActiveStake, 
  UserBalances 
} from "@/lib/mocks/service";

export default function B2bEscrowStakingPage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stakes, setStakes] = useState<ActiveStake[]>([]);
  const [balances, setBalances] = useState<UserBalances>({ tal: 0, veTal: 0 });

  const [stakeAmount, setStakeAmount] = useState<number>(1000);
  const [lockMonths, setLockMonths] = useState<number>(12);
  const [stakingLoading, setStakingLoading] = useState(false);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [userBalances, activeStakes] = await Promise.all([
        fetchUserBalances(),
        fetchActiveStakes()
      ]);
      setBalances(userBalances);
      setStakes(activeStakes);
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
      alert("Staking corporativo realizado con éxito. Tu nivel de tarifas ha sido actualizado.");
    } catch (err: any) {
      alert(err.message || "Error al procesar staking");
    } finally {
      setStakingLoading(false);
    }
  };

  const totalStakedTal = stakes.reduce((acc, s) => acc + s.amountTal, 0);

  const getFeeTierInfo = (staked: number) => {
    if (staked >= 10000) return { tier: "Tier Premium", fee: 0, nextGoal: null };
    if (staked >= 5000) return { tier: "Tier Oro", fee: 2, nextGoal: { tal: 10000, nextFee: 0 } };
    if (staked >= 2000) return { tier: "Tier Plata", fee: 4, nextGoal: { tal: 5000, nextFee: 2 } };
    if (staked >= 1000) return { tier: "Tier Bronce", fee: 6, nextGoal: { tal: 2000, nextFee: 4 } };
    return { tier: "Sin Tier (Estándar)", fee: 8, nextGoal: { tal: 1000, nextFee: 6 } };
  };

  const currentTier = getFeeTierInfo(totalStakedTal);

  if (!mounted) return null;

  return (
    <div className="space-y-8 pb-24">
      {/* Title */}
      <div className="flex items-center gap-3">
        <Coins className="w-8 h-8 text-green-400" />
        <div>
          <h2 className="text-3xl font-black text-white">Staking y Tarifas Corporativas</h2>
          <p className="text-gray-400">{tApp('reduceFeesStake')}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* HUD Stats */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Active Tier */}
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl"></div>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black block mb-1">Tu Nivel de Descuento</span>
            <h3 className="text-3xl font-black text-white mb-2">{currentTier.tier}</h3>
            
            <div className="my-6">
              <span className="text-sm text-gray-400 block mb-1">{tApp('hiringFee')}</span>
              <span className="text-5xl font-black text-green-400 font-mono">{currentTier.fee}%</span>
            </div>

            {currentTier.nextGoal ? (
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-xs text-gray-400 flex items-center gap-2">
                <Zap className="w-4 h-4 text-green-400 shrink-0 animate-pulse" />
                <p>
                  Bloquea <strong className="text-white">{(currentTier.nextGoal.tal - totalStakedTal)} TAL</strong> {tApp('moreToLower')} <strong className="text-green-400">{currentTier.nextGoal.nextFee}%</strong> {tApp('feesDot')}
                </p>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-green-500/10 border border-green-500/20 text-xs text-green-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>{tApp('zeroFeePerm')}</span>
              </div>
            )}
          </div>

          {/* Staking Balances HUD */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">{tApp('liquidTal')}</span>
              <span className="font-mono font-bold text-white">{balances.tal.toFixed(2)} TAL</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">TAL en Staking:</span>
              <span className="font-mono font-bold text-green-400">{totalStakedTal.toFixed(2)} TAL</span>
            </div>
          </div>
        </div>

        {/* Stake Form Calculator */}
        <div className="lg:col-span-2 p-8 rounded-3xl bg-white/5 border border-white/10 shadow-xl self-start relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-600"></div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-6">Bloquear Tokens $TAL</h3>

          <form onSubmit={handleCreateStake} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Cantidad a bloquear (TAL)</label>
              <div className="relative">
                <input 
                  type="number" 
                  min="100" 
                  step="100"
                  max={balances.tal}
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(Number(e.target.value))}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-4 text-2xl font-mono text-white focus:outline-none focus:border-green-500/50"
                  required
                />
                <button 
                  type="button" 
                  onClick={() => setStakeAmount(balances.tal)} 
                  className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1 rounded bg-white/10 text-xs font-bold hover:bg-white/20 transition-colors"
                >
                  MAX
                </button>
              </div>
              <p className="text-[10px] text-gray-500 mt-2 text-right">Balance de la Empresa: {balances.tal.toFixed(2)} TAL</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Periodo de bloqueo</label>
              <input 
                type="range" 
                min="1" 
                max="48" 
                value={lockMonths}
                onChange={(e) => setLockMonths(Number(e.target.value))}
                className="w-full accent-green-500"
              />
              <div className="flex justify-between text-xs font-bold text-green-400 mt-2">
                <span>1 Mes</span>
                <span>{lockMonths} Meses</span>
                <span>48 Meses</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/10 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">{tApp('estFeeStake')}</span>
                <span className="font-bold text-green-400">{getFeeTierInfo(totalStakedTal + stakeAmount).fee}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Poder de voto ganado:</span>
                <span className="font-bold text-white">{(stakeAmount * (lockMonths >= 48 ? 1.0 : lockMonths >= 12 ? 0.25 : 0.02)).toFixed(2)} veTAL</span>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={stakingLoading || stakeAmount <= 0 || balances.tal < stakeAmount}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-black font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {stakingLoading ? "Bloqueando..." : "Hacer Stake Corporativo"} <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Corporate Stakes Positions */}
      <div className="p-8 rounded-3xl bg-white/5 border border-white/10 shadow-xl">
        <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-6 font-mono">Historial de Posiciones de Staking B2B</h3>
        {stakes.length === 0 ? (
          <p className="text-xs text-gray-500 text-center py-6">No hay registros de staking activos para esta cuenta.</p>
        ) : (
          <div className="space-y-4">
            {stakes.map(stake => (
              <div key={stake.id} className="flex flex-col md:flex-row justify-between items-center p-4 rounded-xl bg-black/30 border border-white/5">
                <div className="flex gap-6 items-center">
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase font-bold block">TAL Bloqueado</span>
                    <span className="text-lg font-mono font-bold text-white">{stake.amountTal} TAL</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase font-bold block">Poder (veTAL)</span>
                    <span className="text-lg font-mono font-bold text-green-400">{stake.amountVeTal}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase font-bold block">Fecha Desbloqueo</span>
                    <span className="text-sm font-bold text-gray-300">{new Date(stake.unlockTimestamp).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <span className="px-4 py-2 rounded-lg bg-green-500/10 text-green-400 text-xs font-bold border border-green-500/20 uppercase tracking-widest">
                  Activo (Locked)
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
