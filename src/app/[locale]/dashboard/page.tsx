"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useAccount, useWalletModal } from "@/context/Web3Provider";
import { Lock, User, ShieldCheck, Target, Zap, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const t = useTranslations('b2cV2.b2cDashboard');
  const tAuth = useTranslations('b2cV2.authModal');
  const { isConnected } = useAccount();
  const { open } = useWalletModal();

  if (!isConnected) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6 flex items-center justify-center bg-[#0B0C10]">
        <div className="max-w-md w-full p-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00F5FF] to-[#9B5DE5]"></div>
          <Lock className="w-16 h-16 text-[#00F5FF] mx-auto mb-6 opacity-80" />
          <h2 className="text-3xl font-black text-white mb-4">{tAuth('title')}</h2>
          <p className="text-gray-400 mb-8">{tAuth('subtitle')}</p>
          <button 
            onClick={open}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-[#00F5FF] to-[#00D4FF] text-black font-bold hover:shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-all"
          >
            {tAuth('title')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 bg-[#0B0C10]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">{t('title')}</h1>
          <p className="text-xl text-gray-400">{t('subtitle')}</p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Identity & KYC Profile */}
          <div className="p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent group hover:border-[#00F5FF]/30 transition-all">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-white/10 text-white group-hover:bg-[#00F5FF]/20 group-hover:text-[#00F5FF] transition-colors">
                <User className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white">{t('profile.title')}</h2>
            </div>
            <p className="text-gray-400 mb-8 flex-grow">{t('profile.desc')}</p>
            <div className="mb-6 flex gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/30">Email ✓</span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30">GitHub X</span>
            </div>
            <Link href="/dashboard/profile" className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5 hover:border-[#00F5FF]/30 group-hover:bg-white/5 transition-all text-white font-bold text-sm">
              {t('profile.btn')} <ArrowRight className="w-4 h-4 text-[#00F5FF]" />
            </Link>
          </div>

          {/* Talent Passport (SBTs) */}
          <div className="p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent group hover:border-[#9B5DE5]/30 transition-all relative overflow-hidden">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-[#9B5DE5]/10 rounded-full blur-3xl"></div>
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="p-3 rounded-xl bg-white/10 text-white group-hover:bg-[#9B5DE5]/20 group-hover:text-[#9B5DE5] transition-colors">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white">{t('passport.title')}</h2>
            </div>
            <p className="text-gray-400 mb-8 relative z-10">{t('passport.desc')}</p>
            <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
              <div className="aspect-square rounded-2xl border border-[#9B5DE5]/30 bg-[#9B5DE5]/5 flex flex-col items-center justify-center p-4">
                <BookOpen className="w-8 h-8 text-[#9B5DE5] mb-2 opacity-50" />
                <span className="text-xs text-center text-gray-400">University (Pending)</span>
              </div>
              <div className="aspect-square rounded-2xl border border-white/10 bg-black/40 flex flex-col items-center justify-center p-4 opacity-50">
                <span className="text-xs text-center text-gray-500">Empty Slot</span>
              </div>
            </div>
            <Link href="/dashboard/passport" className="relative z-10 flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5 hover:border-[#9B5DE5]/30 group-hover:bg-white/5 transition-all text-white font-bold text-sm">
              {t('passport.btn')} <ArrowRight className="w-4 h-4 text-[#9B5DE5]" />
            </Link>
          </div>

          {/* Mission Center */}
          <div className="p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent group hover:border-[#fca311]/30 transition-all flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-white/10 text-white group-hover:bg-[#fca311]/20 group-hover:text-[#fca311] transition-colors">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white">{t('missions.title')}</h2>
            </div>
            <p className="text-gray-400 mb-8 flex-grow">{t('missions.desc')}</p>
            <div className="mb-6 space-y-3">
              <div className="p-3 rounded-lg bg-black/40 border border-white/5 text-xs text-gray-400">
                <span className="text-[#fca311] font-bold">New:</span> Build DeFi Dashboard para CompanyX
              </div>
              <div className="p-3 rounded-lg bg-black/40 border border-white/5 text-xs text-gray-400">
                <span className="text-[#fca311] font-bold">New:</span> Auditoría de Smart Contracts
              </div>
            </div>
            <Link href="/dashboard/missions" className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5 hover:border-[#fca311]/30 group-hover:bg-white/5 transition-all text-white font-bold text-sm mt-auto">
              {t('missions.btn')} <ArrowRight className="w-4 h-4 text-[#fca311]" />
            </Link>
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
            <Link href="/dashboard/court" className="flex items-center justify-center w-full md:w-auto px-8 py-4 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all text-red-400 font-bold mt-auto">
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
                <Link href="/dashboard/staking" className="flex items-center justify-center w-full md:w-auto px-8 py-4 rounded-xl bg-green-500/20 border border-green-500/30 hover:bg-green-500/30 transition-all text-green-400 font-bold">
                  {t('staking.btn')} <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
