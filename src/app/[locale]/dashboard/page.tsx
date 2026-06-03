"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { User, ShieldCheck, Target, Zap, ArrowRight, BookOpen, Gift, Check, Lock, Unlock, GraduationCap, Flame } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  fetchAirdropState, 
  claimAirdrop, 
  fetchUserBalances, 
  addTalBalance,
  AirdropState 
} from "@/lib/mocks/service";

export default function DashboardPage() {
  const t = useTranslations('b2cV2.b2cDashboard');
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'en';

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [airdrop, setAirdrop] = useState<AirdropState | null>(null);
  const [talBalance, setTalBalance] = useState<number>(0);
  const [claiming, setClaiming] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const [state, balances] = await Promise.all([
        fetchAirdropState(),
        fetchUserBalances()
      ]);
      setAirdrop(state);
      setTalBalance(balances.tal);
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    loadData();
  }, [loadData]);

  const handleClaim = async () => {
    if (!airdrop || airdrop.airdropStatus !== 'Claimable') return;
    setClaiming(true);
    try {
      // Claim the airdrop in mock backend
      const updatedAirdrop = await claimAirdrop();
      // Add 200 TAL tokens reward (equivalent to ~€20 welcome balance)
      const newBal = await addTalBalance(200);
      setAirdrop(updatedAirdrop);
      setTalBalance(newBal);
      alert("¡Airdrop de 200 TAL (~€20) reclamado con éxito! Se ha transferido a tu wallet en Base network.");
    } catch (err: any) {
      alert(err.message || "Error al reclamar el airdrop");
    } finally {
      setClaiming(false);
    }
  };

  if (!mounted) return null;

  return (
    <>
      <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">{t('title')}</h1>
          <p className="text-xl text-gray-400">{t('subtitle')}</p>
        </div>

        {/* TAL Balance HUD */}
        <div className="flex items-center gap-4 bg-white/5 px-6 py-4 rounded-2xl border border-white/10 shrink-0">
          <div className="p-2.5 rounded-xl bg-green-500/10 text-green-400">
            <Gift className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block">Tu Balance de TAL</span>
            <span className="text-xl font-black text-white font-mono">{loading ? "..." : talBalance.toLocaleString()} <span className="text-xs text-gray-400">TAL</span></span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="h-64 bg-white/5 rounded-3xl animate-pulse" />
          <div className="h-64 bg-white/5 rounded-3xl animate-pulse" />
          <div className="h-64 bg-white/5 rounded-3xl animate-pulse" />
        </div>
      ) : (
        <div className="space-y-8">
          
          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Identity & KYC Profile */}
            <div className="p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent group hover:border-[#00F5FF]/30 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-white/10 text-white group-hover:bg-[#00F5FF]/20 group-hover:text-[#00F5FF] transition-colors">
                    <User className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{t('profile.title')}</h2>
                </div>
                <p className="text-gray-400 mb-6">{t('profile.desc')}</p>
                <div className="mb-6 flex gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/30">Email ✓</span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30">GitHub X</span>
                </div>
              </div>
              <Link href={`/${currentLocale}/dashboard/profile`} className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5 hover:border-[#00F5FF]/30 group-hover:bg-white/5 transition-all text-white font-bold text-sm">
                {t('profile.btn')} <ArrowRight className="w-4 h-4 text-[#00F5FF]" />
              </Link>
            </div>

            {/* Talent Passport (SBTs) */}
            <div className="p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent group hover:border-[#9B5DE5]/30 transition-all relative overflow-hidden flex flex-col justify-between">
              <div className="absolute -right-6 -top-6 w-32 h-32 bg-[#9B5DE5]/10 rounded-full blur-3xl"></div>
              <div>
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="p-3 rounded-xl bg-white/10 text-white group-hover:bg-[#9B5DE5]/20 group-hover:text-[#9B5DE5] transition-colors">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{t('passport.title')}</h2>
                </div>
                <p className="text-gray-400 mb-6 relative z-10">{t('passport.desc')}</p>
                <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
                  <div className="aspect-square rounded-2xl border border-[#9B5DE5]/30 bg-[#9B5DE5]/5 flex flex-col items-center justify-center p-4">
                    <BookOpen className="w-8 h-8 text-[#9B5DE5] mb-2 opacity-50" />
                    <span className="text-xs text-center text-gray-400">University (Pending)</span>
                  </div>
                  <div className="aspect-square rounded-2xl border border-white/10 bg-black/40 flex flex-col items-center justify-center p-4 opacity-50">
                    <span className="text-xs text-center text-gray-500">Empty Slot</span>
                  </div>
                </div>
              </div>
              <Link href={`/${currentLocale}/dashboard/passport`} className="relative z-10 flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5 hover:border-[#9B5DE5]/30 group-hover:bg-white/5 transition-all text-white font-bold text-sm">
                {t('passport.btn')} <ArrowRight className="w-4 h-4 text-[#9B5DE5]" />
              </Link>
            </div>

            {/* Mission Center */}
            <div className="p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent group hover:border-[#fca311]/30 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-white/10 text-white group-hover:bg-[#fca311]/20 group-hover:text-[#fca311] transition-colors">
                    <Target className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{t('missions.title')}</h2>
                </div>
                <p className="text-gray-400 mb-6">{t('missions.desc')}</p>
                <div className="mb-6 space-y-3">
                  <div className="p-3 rounded-lg bg-black/40 border border-white/5 text-xs text-gray-400">
                    <span className="text-[#fca311] font-bold">New:</span> Build DeFi Dashboard para CompanyX
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-white/5 text-xs text-gray-400">
                    <span className="text-[#fca311] font-bold">New:</span> Auditoría de Smart Contracts
                  </div>
                </div>
              </div>
              <Link href={`/${currentLocale}/dashboard/missions`} className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5 hover:border-[#fca311]/30 group-hover:bg-white/5 transition-all text-white font-bold text-sm">
                {t('missions.btn')} <ArrowRight className="w-4 h-4 text-[#fca311]" />
              </Link>
            </div>

            {/* €20 Welcome Airdrop Validation Panel */}
            <div className="p-8 rounded-3xl border border-[#00F5FF]/20 bg-gradient-to-br from-[#00F5FF]/5 via-transparent to-transparent group hover:border-[#00F5FF]/40 transition-all relative overflow-hidden flex flex-col justify-between lg:col-span-3">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#00F5FF]/5 rounded-full blur-3xl -z-10"></div>
              
              <div className="flex flex-col lg:flex-row gap-8 justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-[#00F5FF]/10 text-[#00F5FF]">
                      <Gift className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{t('airdrop.title')}</h2>
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                        airdrop?.airdropStatus === 'Claimed' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                        airdrop?.airdropStatus === 'Claimable' ? 'bg-[#00F5FF]/20 text-[#00F5FF] border border-[#00F5FF]/30 animate-pulse' :
                        'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {airdrop?.airdropStatus === 'Claimed' ? t('airdrop.statusClaimed') :
                         airdrop?.airdropStatus === 'Claimable' ? t('airdrop.statusClaimable') :
                         t('airdrop.statusLocked')}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-400 mb-6 max-w-2xl">{t('airdrop.desc')}</p>
                </div>

                {/* Checklist steps */}
                <div className="flex-1 max-w-md bg-black/30 p-6 rounded-2xl border border-white/5 space-y-3 shrink-0">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 font-bold uppercase tracking-wider">Requisitos de Verificación</span>
                    <span className="text-[#00F5FF] font-bold font-mono">{airdrop?.airdropStatus === 'Claimed' ? "3/3" : airdrop?.airdropStatus === 'Claimable' ? "3/3" : "2/3"}</span>
                  </div>
                  
                  {/* Step 1: Email */}
                  <div className="flex items-center justify-between p-2 rounded bg-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center border border-green-500/30">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-xs text-white font-medium">{t('airdrop.stepEmail')}</span>
                    </div>
                    <span className="text-[10px] text-green-400 font-bold">✓ Completado</span>
                  </div>

                  {/* Step 2: Github SBT */}
                  <div className="flex items-center justify-between p-2 rounded bg-white/5">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center border border-green-500/30">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-xs text-white font-medium">{t('airdrop.stepGithub')}</span>
                    </div>
                    <span className="text-[10px] text-green-400 font-bold">✓ Completado</span>
                  </div>

                  {/* Step 3: Milestones */}
                  <div className="flex items-center justify-between p-2 rounded bg-white/5">
                    <div className="flex items-center gap-3">
                      {airdrop && airdrop.milestonesCompleted > 0 ? (
                        <div className="w-5 h-5 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center border border-green-500/30">
                          <Check className="w-3 h-3" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                          <Lock className="w-3 h-3" />
                        </div>
                      )}
                      <span className="text-xs text-white font-medium">{t('airdrop.stepMission')}</span>
                    </div>
                    {airdrop && airdrop.milestonesCompleted > 0 ? (
                      <span className="text-[10px] text-green-400 font-bold">✓ Completado</span>
                    ) : (
                      <span className="text-[10px] text-amber-400 font-bold">Pendiente (0/1)</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Claim Action Button */}
              <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-gray-500">
                  {airdrop?.airdropStatus === 'Locked' && (
                    <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" /> Completa una misión de desarrollo o recibe un hito B2B para desbloquear el reclamo.</span>
                  )}
                  {airdrop?.airdropStatus === 'Claimable' && (
                    <span className="flex items-center gap-1.5 text-green-400"><Unlock className="w-3.5 h-3.5" /> ¡Tu dirección está validada y es elegible para el reclamo del airdrop!</span>
                  )}
                  {airdrop?.airdropStatus === 'Claimed' && (
                    <span className="flex items-center gap-1.5 text-gray-400"><Check className="w-3.5 h-3.5" /> Recompensa de bienvenida acreditada y minteada exitosamente.</span>
                  )}
                </div>

                <button
                  onClick={handleClaim}
                  disabled={claiming || airdrop?.airdropStatus !== 'Claimable'}
                  className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                    airdrop?.airdropStatus === 'Claimable' 
                      ? 'bg-gradient-to-r from-[#00F5FF] to-[#9B5DE5] text-black hover:opacity-90 cursor-pointer shadow-lg shadow-[#00F5FF]/20'
                      : airdrop?.airdropStatus === 'Claimed'
                      ? 'bg-green-500/10 border border-green-500/20 text-green-400 cursor-not-allowed'
                      : 'bg-white/5 border border-white/10 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {claiming ? t('airdrop.btnClaiming') : airdrop?.airdropStatus === 'Claimed' ? t('airdrop.statusClaimed') : t('airdrop.btnClaim')}
                </button>
              </div>
            </div>

            {/* University Widget */}
            <div className="p-8 rounded-3xl border border-[#9B5DE5]/20 bg-gradient-to-br from-[#9B5DE5]/5 to-transparent group hover:border-[#9B5DE5]/40 transition-all flex flex-col md:col-span-2 lg:col-span-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#9B5DE5]/5 rounded-full blur-3xl -z-0" />
              <div className="relative z-10 flex flex-col lg:flex-row gap-8 justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-[#9B5DE5]/10 text-[#9B5DE5]">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">DAO University</h2>
                      <span className="text-xs text-[#9B5DE5] font-bold uppercase tracking-widest">Learn-to-Earn Activo</span>
                    </div>
                  </div>
                  <p className="text-gray-400 mb-6 max-w-lg">Continúa tu formación, gana $TAL por cada módulo completado y convierte tus certificados en SBTs verificables on-chain.</p>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#fca311]/10 border border-[#fca311]/20">
                      <Flame className="w-4 h-4 text-[#fca311]" />
                      <span className="text-xs font-bold text-[#fca311]">7 días de racha</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20">
                      <Zap className="w-4 h-4 text-green-400" />
                      <span className="text-xs font-bold text-green-400">+450 TAL esta semana</span>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 w-full lg:w-72 space-y-3">
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-3">Cursos en Progreso</p>
                  {[
                    { title: 'Agentes Autónomos con LLMs', pct: 60, color: '#9B5DE5' },
                    { title: 'Seguridad en Smart Contracts', pct: 25, color: '#00F5FF' },
                  ].map((course) => (
                    <div key={course.title} className="p-3 rounded-xl bg-black/40 border border-white/5">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-white font-medium truncate mr-2">{course.title}</span>
                        <span className="text-xs font-bold shrink-0" style={{ color: course.color }}>{course.pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/10">
                        <div className="h-full rounded-full transition-all" style={{ width: `${course.pct}%`, background: course.color }} />
                      </div>
                    </div>
                  ))}
                  <div className="flex gap-3 pt-2">
                    <Link href={`/${currentLocale}/university/dashboard`} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#9B5DE5]/20 border border-[#9B5DE5]/30 hover:bg-[#9B5DE5]/30 transition-all text-[#9B5DE5] font-bold text-sm">
                      <GraduationCap className="w-4 h-4" /> Mi Dashboard
                    </Link>
                    <Link href={`/${currentLocale}/university/marketplace`} className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-white font-bold text-sm">
                      <BookOpen className="w-4 h-4" /> Cursos
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Tribunal / Court */}

            <div className="p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent group hover:border-[#EF4444]/30 transition-all flex flex-col md:col-span-2 lg:col-span-3">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-white/10 text-white group-hover:bg-[#EF4444]/20 group-hover:text-[#EF4444] transition-colors">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-white">Tribunal de Justicia (Kleros)</h2>
              </div>
              <p className="text-gray-400 mb-8 flex-grow">Resuelve disputas de contratos utilizando tu poder de voto (veTAL) y gana recompensas. Tu voto ayuda a mantener la integridad del ecosistema B2B.</p>
              <Link href={`/${currentLocale}/dashboard/court`} className="flex items-center justify-center w-full md:w-auto px-8 py-4 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all text-red-400 font-bold mt-auto">
                Acceder al Tribunal <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            {/* Staking Panel (Spans 3 columns on large screens) */}
            <div className="lg:col-span-3 p-8 rounded-3xl border border-green-500/20 bg-gradient-to-br from-green-500/5 to-transparent relative overflow-hidden group">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-green-500/20 text-green-400">
                      <Zap className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">{t('staking.title')}</h2>
                  </div>
                  <p className="text-gray-400 max-w-xl">{t('staking.desc')}</p>
                </div>
                
                <div className="flex-shrink-0 bg-black/50 p-6 rounded-2xl border border-white/10 flex items-center gap-8 w-full md:w-auto">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Total Staked</p>
                    <p className="text-3xl font-black text-white">0.00 <span className="text-green-400 text-lg">TAL</span></p>
                  </div>
                  <div className="h-12 w-px bg-white/10"></div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Match Score</p>
                    <p className="text-3xl font-black text-[#00F5FF]">1.0x</p>
                  </div>
                </div>

                <div className="flex-shrink-0 w-full md:w-auto">
                  <Link href={`/${currentLocale}/dashboard/staking`} className="flex items-center justify-center w-full md:w-auto px-8 py-4 rounded-xl bg-green-500/20 border border-green-500/30 hover:bg-green-500/30 transition-all text-green-400 font-bold">
                    {t('staking.btn')} <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
