"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useWalletModal, useAccount } from "@/context/Web3Provider";
import { Globe, ChevronDown } from "lucide-react";

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
  const { isConnected, address } = useAccount();
  const pathname = usePathname();
  const router = useRouter();
  const [isLangOpen, setIsLangOpen] = useState(false);

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
            <Link href="/dashboard" className="px-5 py-2 rounded-full border border-white/10 bg-white/5 text-white font-bold text-sm hover:bg-white/10 transition-all">
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
