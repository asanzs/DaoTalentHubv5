"use client";
import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useWalletModal, useAccount } from "@/context/Web3Provider";

export default function NavBar() {
  const t = useTranslations('nav');
  const { open } = useWalletModal();
  const { isConnected, address } = useAccount();

  return (
    <nav className="fixed w-full z-50 top-0 border-b border-white/5 bg-black/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00F5FF] to-[#9B5DE5] p-[1px]">
            <div className="w-full h-full bg-black rounded-xl flex items-center justify-center group-hover:bg-transparent transition-colors">
              <span className="text-white font-black text-xl">M</span>
            </div>
          </div>
          <span className="text-xl font-black text-white tracking-tight">MYTHOS</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/whitepaper" className="text-sm font-bold text-gray-400 hover:text-white transition-colors">{t('whitepaper')}</Link>
          <Link href="/university" className="text-sm font-bold text-gray-400 hover:text-white transition-colors">{t('university')}</Link>
          <Link href="/data-room" className="text-sm font-bold text-gray-400 hover:text-white transition-colors">{t('dataRoom')}</Link>
          <Link href="/early-pass" className="text-sm font-bold text-[#00F5FF] hover:text-white transition-colors">{t('earlyPass')}</Link>
        </div>
        <div className="flex items-center gap-4">
          {isConnected ? (
            <Link href="/dashboard" className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all">
              {t('dashboard')} ({address?.slice(0,6)}...)
            </Link>
          ) : (
            <button onClick={open} className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#00F5FF] to-[#9B5DE5] text-black font-black text-sm hover:opacity-90 transition-all shadow-[0_0_20px_rgba(0,245,255,0.3)] hover:shadow-[0_0_30px_rgba(155,93,229,0.5)]">
              {t('login')}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
