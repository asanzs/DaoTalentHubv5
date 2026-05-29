import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations('footer');
  return (
    <footer className="border-t border-white/5 bg-[#020408] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00F5FF] to-[#9B5DE5] flex items-center justify-center">
                <span className="text-black font-black text-sm">M</span>
              </div>
              <span className="text-xl font-black text-white tracking-tight">MYTHOS</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-8">{t('subtitle')}</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">{t('product')}</h4>
            <ul className="space-y-4">
              <li><Link href="/university" className="text-gray-500 hover:text-[#00F5FF] transition-colors text-sm">Universidad IA</Link></li>
              <li><Link href="/dashboard" className="text-gray-500 hover:text-[#00F5FF] transition-colors text-sm">Staking B2B</Link></li>
              <li><Link href="/early-pass" className="text-gray-500 hover:text-[#00F5FF] transition-colors text-sm">Founder Pass</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">{t('company')}</h4>
            <ul className="space-y-4">
              <li><Link href="/whitepaper" className="text-gray-500 hover:text-[#00F5FF] transition-colors text-sm">Whitepaper</Link></li>
              <li><Link href="/data-room" className="text-gray-500 hover:text-[#00F5FF] transition-colors text-sm">Data Room (VCs)</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
