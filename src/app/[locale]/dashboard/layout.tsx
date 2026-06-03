"use client";

import React, { useEffect, useState } from "react";
import { useAccount, useWalletModal } from "@/context/Web3Provider";
import { Lock } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tAuth = useTranslations('b2cV2.authModal');
  const { isConnected } = useAccount();
  const { open } = useWalletModal();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isB2b = pathname.includes("/dashboard/b2b");
  const currentLocale = pathname.split('/')[1] || 'en';

  if (!mounted) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6 bg-[#0B0C10] flex items-center justify-center">
        <div className="animate-pulse w-8 h-8 rounded-full bg-[#00F5FF]"></div>
      </div>
    );
  }

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
        {/* Operating Mode Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl mb-8">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#00F5FF] animate-pulse"></div>
            <span className="text-sm font-bold text-gray-300">Modo Activo:</span>
            <span className="text-xs px-2.5 py-1 rounded-full font-black uppercase tracking-wider bg-[#00F5FF]/10 text-[#00F5FF] border border-[#00F5FF]/20">
              {isB2b ? "Empresa B2B" : "Talento B2C"}
            </span>
          </div>
          
          <div className="flex gap-2">
            <Link 
              href={`/${currentLocale}/dashboard`}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${!isB2b ? 'bg-gradient-to-r from-[#00F5FF] to-[#9B5DE5] text-black shadow-lg font-black' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
            >
              Panel Talento
            </Link>
            <Link 
              href={`/${currentLocale}/dashboard/b2b`}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${isB2b ? 'bg-gradient-to-r from-[#9B5DE5] to-[#00F5FF] text-black shadow-lg font-black' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
            >
              Panel Empresa
            </Link>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}
