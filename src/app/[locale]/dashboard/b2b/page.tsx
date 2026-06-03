import { useTranslations } from 'next-intl';
"use client";

import React, { useState, useEffect } from "react";
import { useAccount, useWalletModal } from "@/context/Web3Provider";
import { Briefcase, Cpu, Coins, Scale, ArrowRight, ShieldCheck, Landmark, BarChart3 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { fetchUserBalances, fetchActiveStakes, fetchMissionsList } from "@/lib/mocks/service";

export default function B2bDashboardPage() {
  const tApp = useTranslations('app');
  const { isConnected } = useAccount();
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'en';
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [talBalance, setTalBalance] = useState(0);
  const [stakedTal, setStakedTal] = useState(0);
  const [activeProjectsCount, setActiveProjectsCount] = useState(3);
  const [escrowLocked, setEscrowLocked] = useState(12800);

  useEffect(() => {
    setMounted(true);
    const loadBalances = async () => {
      try {
        setLoading(false);
        const balances = await fetchUserBalances();
        setTalBalance(balances.tal);
        
        const stakes = await fetchActiveStakes();
        const totalStaked = stakes.reduce((acc, stake) => acc + stake.amountTal, 0);
        setStakedTal(totalStaked);
      } catch (err) {
        console.error("Error loading B2B balances:", err);
      }
    };
    loadBalances();
  }, []);

  if (!mounted) return null;

  // Fee tier calculation based on staked TAL
  const getFeePercentage = (staked: number) => {
    if (staked >= 10000) return 0;
    if (staked >= 5000) return 2;
    if (staked >= 2000) return 4;
    if (staked >= 1000) return 6;
    return 8;
  };

  const currentFee = getFeePercentage(stakedTal);

  return (
    <div className="space-y-12">
      {/* Title section */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Panel Corporativo B2B</h1>
        <p className="text-xl text-gray-400">Gestiona tus contratos en custodia (Escrow), publica misiones y optimiza comisiones.</p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Smart Match AI & Job Posting */}
        <div className="p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent group hover:border-[#00F5FF]/30 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-white/10 text-white group-hover:bg-[#00F5FF]/20 group-hover:text-[#00F5FF] transition-colors">
                <Cpu className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white">Smart Match AI</h2>
            </div>
            <p className="text-gray-400 mb-8">{tApp('postMissions')}</p>
            <div className="mb-6 p-4 rounded-2xl bg-black/40 border border-white/5 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">Candidatos sugeridos:</span>
                <span className="font-mono text-[#00F5FF] font-bold">12 perfiles</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">Match Promedio:</span>
                <span className="font-mono text-green-400 font-bold">96.8%</span>
              </div>
            </div>
          </div>
          <Link href={`/${currentLocale}/dashboard/b2b/match`} className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5 hover:border-[#00F5FF]/30 group-hover:bg-white/5 transition-all text-white font-bold text-sm">
            Buscar Talento <ArrowRight className="w-4 h-4 text-[#00F5FF]" />
          </Link>
        </div>

        {/* Active Projects & Escrow Contracts */}
        <div className="p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent group hover:border-[#9B5DE5]/30 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-white/10 text-white group-hover:bg-[#9B5DE5]/20 group-hover:text-[#9B5DE5] transition-colors">
                <Briefcase className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white">Proyectos & Custodia</h2>
            </div>
            <p className="text-gray-400 mb-8">{tApp('manageMilestones')}</p>
            <div className="mb-6 p-4 rounded-2xl bg-black/40 border border-white/5 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">Proyectos activos:</span>
                <span className="font-mono text-[#9B5DE5] font-bold">{activeProjectsCount} contrataciones</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">Total en Escrow:</span>
                <span className="font-mono text-white font-bold">${escrowLocked.toLocaleString()} USD</span>
              </div>
            </div>
          </div>
          <Link href={`/${currentLocale}/dashboard/b2b/projects`} className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5 hover:border-[#9B5DE5]/30 group-hover:bg-white/5 transition-all text-white font-bold text-sm">
            Ver Contratos Escrow <ArrowRight className="w-4 h-4 text-[#9B5DE5]" />
          </Link>
        </div>

        {/* Corporate Staking & Commission Reduction */}
        <div className="p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent group hover:border-green-500/30 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-white/10 text-white group-hover:bg-green-500/20 group-hover:text-green-400 transition-colors">
                <Coins className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white">Staking & Tarifas 0%</h2>
            </div>
            <p className="text-gray-400 mb-8">Bloquea tokens $TAL para reducir el Take-Rate corporativo de la plataforma desde un 8% hasta un 0% permanente.</p>
            <div className="mb-6 p-4 rounded-2xl bg-black/40 border border-white/5 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">Tus Tokens en Staking:</span>
                <span className="font-mono text-green-400 font-bold">{stakedTal.toFixed(2)} TAL</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">{tApp('currentFee')}</span>
                <span className="font-mono text-white font-bold">{currentFee}% Take-Rate</span>
              </div>
            </div>
          </div>
          <Link href={`/${currentLocale}/dashboard/b2b/escrow`} className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5 hover:border-green-500/30 group-hover:bg-white/5 transition-all text-white font-bold text-sm">
            Simular Comisión <ArrowRight className="w-4 h-4 text-green-400" />
          </Link>
        </div>

        {/* Analytics & Payment History */}
        <div className="p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent group hover:border-[#9B5DE5]/30 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-white/10 text-white group-hover:bg-[#9B5DE5]/20 group-hover:text-[#9B5DE5] transition-colors">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white">Analytics & Pagos</h2>
            </div>
            <p className="text-gray-400 mb-8">Consulta el historial completo de contratos, escrow liberados y el rendimiento financiero de tus proyectos.</p>
            <div className="mb-6 p-4 rounded-2xl bg-black/40 border border-white/5 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">Total invertido:</span>
                <span className="font-mono text-[#9B5DE5] font-bold">$20,400 USD</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">Score medio IA:</span>
                <span className="font-mono text-green-400 font-bold">96%</span>
              </div>
            </div>
          </div>
          <Link href={`/${currentLocale}/dashboard/b2b/analytics`} className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5 hover:border-[#9B5DE5]/30 group-hover:bg-white/5 transition-all text-white font-bold text-sm">
            Ver Analytics Completo <ArrowRight className="w-4 h-4 text-[#9B5DE5]" />
          </Link>
        </div>

        {/* Dispute Resolution Centre (Kleros B2B Side) */}
        <div className="p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent group hover:border-[#EF4444]/30 transition-all flex flex-col md:col-span-2 lg:col-span-3">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-white/10 text-white group-hover:bg-[#EF4444]/20 group-hover:text-[#EF4444] transition-colors">
                  <Scale className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-white">Tribunal de Justicia Corporativo</h2>
              </div>
              <p className="text-gray-400 max-w-2xl">
                ¿Hubo algún desacuerdo técnico o retraso en una entrega? Abre una disputa de escrow. 
                Los jurados independientes resolverán en base al código aportado y la auditoría IA de la plataforma.
              </p>
            </div>
            <Link href={`/${currentLocale}/dashboard/b2b/disputes`} className="w-full md:w-auto px-8 py-4 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all text-red-400 font-bold flex items-center justify-center gap-2">
              Iniciar Reclamación de Escrow <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

