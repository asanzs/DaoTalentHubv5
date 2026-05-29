"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useAccount } from "@/context/Web3Provider";
import { Lock, Zap, ShieldCheck, ArrowRight } from "lucide-react";

export default function DashboardPage() {
  const t = useTranslations('dashboard');
  const { isConnected } = useAccount();
  const [isB2B, setIsB2B] = useState(false);

  if (!isConnected) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6 flex items-center justify-center">
        <div className="p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl text-center">
          <Lock className="w-12 h-12 text-[#00F5FF] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">{t('walletNotConnected')}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-black text-white mb-2">{isB2B ? t('titleB2B') : t('titleB2C')}</h1>
            <p className="text-gray-400">{isB2B ? t('subtitleB2B') : t('subtitleB2C')}</p>
          </div>
          <button 
            onClick={() => setIsB2B(!isB2B)}
            className="mt-6 md:mt-0 px-6 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold transition-all">
            {isB2B ? t('switchB2C') : t('switchB2B')}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 p-8 rounded-3xl border border-white/5 bg-white/[0.02]">
            {/* Dashboard Content Area */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00F5FF]/20 to-transparent flex items-center justify-center border border-[#00F5FF]/30">
                <ShieldCheck className="w-6 h-6 text-[#00F5FF]" />
              </div>
              <h3 className="text-xl font-bold text-white">Status / Milestones</h3>
            </div>
            <div className="h-64 rounded-2xl bg-black/50 border border-white/5 flex items-center justify-center">
              <span className="text-gray-500 font-mono">No active smart contracts</span>
            </div>
          </div>
          
          <div className="p-8 rounded-3xl border border-[#9B5DE5]/30 bg-[#9B5DE5]/5">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#9B5DE5]/20 to-transparent flex items-center justify-center border border-[#9B5DE5]/30">
                <Zap className="w-6 h-6 text-[#9B5DE5]" />
              </div>
              <h3 className="text-xl font-bold text-white">{t('stakingLabel')}</h3>
            </div>
            <p className="text-gray-400 mb-8">{t('stakingDesc')}</p>
            <button className="w-full px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-colors flex items-center justify-center gap-2">
              Stake MYTH Tokens <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
