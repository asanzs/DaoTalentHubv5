"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useWalletModal, useAccount } from "@/context/Web3Provider";
import { Globe, ChevronDown, Lock } from "lucide-react";
import { useUserStore } from "@/store/userStore";
import { supabase } from "@/utils/supabase/client";

const LOCALES = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
];

export default function NavBar() {
  const t = useTranslations('nav');
  const { open } = useWalletModal();
  const { isConnected, address, disconnect } = useAccount();
  const pathname = usePathname();
  const router = useRouter();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const balance = useUserStore((state) => state.balance);

  // Synchronize Web3 login with Supabase
  useEffect(() => {
    if (isConnected && address) {
      const syncUser = async () => {
        try {
          const { error } = await supabase
            .from('users')
            .upsert(
              { wallet_address: address },
              { onConflict: 'wallet_address' }
            );
          
          if (error) {
            console.error('Error syncing user to Supabase:', error);
          }
        } catch (err) {
          console.error('Failed to sync user:', err);
        }
      };
      syncUser();
    }
  }, [isConnected, address]);

  // Extract current locale from pathname (e.g., /es/about -> es)
  const currentLocale = pathname.split('/')[1] || 'en';
  const currentLocaleObj = LOCALES.find(l => l.code === currentLocale) || LOCALES[0];

  const switchLanguage = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
    setIsLangOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 top-0 border-b border-white/5 bg-black/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00F5FF] to-[#9B5DE5] p-[1px]">
            <div className="w-full h-full bg-black rounded-xl flex items-center justify-center group-hover:bg-transparent transition-colors">
              <span className="text-white font-black text-xl">D</span>
            </div>
          </div>
          <span className="text-xl font-black text-white tracking-tight">DAO TALENT HUB</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="/university" className="text-sm font-bold text-gray-400 hover:text-white transition-colors">{t('university')}</Link>
          <Link href="/whitepaper" className="text-sm font-bold text-gray-400 hover:text-white transition-colors">Whitepaper</Link>
          <Link href="/data-room" className="text-sm font-bold text-gray-400 hover:text-white transition-colors flex items-center gap-1">Data Room <Lock className="w-3 h-3"/></Link>
        </div>

        <div className="flex items-center gap-6">
          {/* Language Switcher */}
          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 text-sm font-bold text-gray-300 hover:text-white transition-colors bg-white/5 px-3 py-2 rounded-lg border border-white/10"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">{currentLocaleObj.flag} {currentLocaleObj.code.toUpperCase()}</span>
              <ChevronDown className="w-3 h-3 opacity-50" />
            </button>
            
            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-[#0d1117] border border-white/10 rounded-xl shadow-2xl py-2 overflow-hidden backdrop-blur-xl">
                {LOCALES.map((locale) => (
                  <button
                    key={locale.code}
                    onClick={() => switchLanguage(locale.code)}
                    className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors text-left ${currentLocale === locale.code ? 'bg-[#00F5FF]/10 text-[#00F5FF] font-bold' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
                  >
                    <span>{locale.flag}</span>
                    {locale.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Auth Button */}
          {isConnected ? (
            <div className="relative group">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#00F5FF]/30 bg-[#00F5FF]/10 text-white font-bold text-sm hover:bg-[#00F5FF]/20 transition-all">
                <span className="w-2 h-2 rounded-full bg-[#00F5FF] animate-pulse" />
                {address?.slice(0,6)}...{address?.slice(-4)}
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              
              <div className="absolute right-0 mt-2 w-48 bg-[#0d1117] border border-white/10 rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <Link href="/dashboard" className="block px-4 py-3 text-sm font-bold text-white hover:bg-white/5 transition-colors border-b border-white/5">
                  Ir al Dashboard
                </Link>
                <div className="px-4 py-3 text-xs text-gray-400 border-b border-white/5 bg-black/20">
                  <span className="block mb-1">Balance</span>
                  <span className="font-mono font-bold text-[#00F5FF]">{balance.toLocaleString()} $TAL</span>
                </div>
                <button 
                  onClick={() => { disconnect(); setIsLangOpen(false); }} 
                  className="w-full text-left px-4 py-3 text-sm font-bold text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  Disconnect
                </button>
              </div>
            </div>
          ) : (
            <button onClick={open} className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#00F5FF] to-[#9B5DE5] text-black font-black text-sm hover:opacity-90 transition-all shadow-[0_0_20px_rgba(0,245,255,0.3)] hover:shadow-[0_0_30px_rgba(155,93,229,0.5)]">
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
