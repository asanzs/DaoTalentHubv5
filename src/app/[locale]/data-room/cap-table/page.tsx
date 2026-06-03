"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, PieChart, Coins, Lock, CheckCircle2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export default function CapTablePage() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'es';
  const t = useTranslations('capTable');
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null);

  const TOKENOMICS = [
    { id: 1, label: t("t1Label"), pct: 65, tokens: 130000000, color: "#00F5FF", desc: t("t1Desc"), vesting: t("t1Vest") },
    { id: 2, label: t("t2Label"), pct: 20, tokens: 40000000, color: "#9B5DE5", desc: t("t2Desc"), vesting: t("t2Vest") },
    { id: 3, label: t("t3Label"), pct: 15, tokens: 30000000, color: "#fca311", desc: t("t3Desc"), vesting: t("t3Vest") }
  ];

  return (
    <div className="min-h-screen bg-[#020408] pt-32 pb-24 text-white">
      <div className="max-w-5xl mx-auto px-6">
        
        <Link href={`/${locale}/data-room`} className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-wider mb-8">
          <ArrowLeft className="w-4 h-4" /> Volver a Data Room
        </Link>
        
        <div className="mb-12 border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#9B5DE5]/10 border border-[#9B5DE5]/20 rounded-full text-xs font-bold text-[#9B5DE5] mb-4 uppercase tracking-widest">
              <PieChart className="w-3 h-3" /> Auditado: V5.1
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">{t('title')}</h1>
            <p className="text-xl text-gray-400 max-w-2xl">
              {t('desc')}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mb-1">{t('seedPrice')}</p>
            <p className="text-3xl font-black font-mono text-[#fca311]">$0.040 USD</p>
          </div>
        </div>

        {/* Visualizer */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">{t('distTitle')}</h2>
            <div className="space-y-4">
              {TOKENOMICS.map((item) => (
                <div 
                  key={item.id} 
                  onMouseEnter={() => setHoveredSlice(item.id)}
                  onMouseLeave={() => setHoveredSlice(null)}
                  className={`p-5 rounded-2xl border transition-all cursor-crosshair ${
                    hoveredSlice === item.id || hoveredSlice === null 
                      ? 'border-white/10 bg-white/5 opacity-100' 
                      : 'border-white/5 bg-transparent opacity-40'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <h3 className="font-bold text-lg">{item.label}</h3>
                    </div>
                    <span className="text-xl font-black font-mono" style={{ color: item.color }}>{item.pct}%</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">{item.desc}</p>
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-gray-500 flex items-center gap-1"><Coins className="w-3 h-3"/> {item.tokens.toLocaleString()} TAL</span>
                    <span className="text-gray-500 flex items-center gap-1"><Lock className="w-3 h-3"/> {item.vesting}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col justify-center items-center relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#9B5DE5]/10 to-[#00F5FF]/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="w-full max-w-sm aspect-square relative flex flex-col justify-center gap-4 z-10">
              {/* Stacked bar representation instead of complex donut for native simple UI */}
              {TOKENOMICS.map((item) => (
                <div 
                  key={item.id}
                  onMouseEnter={() => setHoveredSlice(item.id)}
                  onMouseLeave={() => setHoveredSlice(null)}
                  className="w-full relative transition-all duration-500 ease-out flex items-center justify-center"
                  style={{ 
                    height: `${item.pct}%`, 
                    backgroundColor: item.color,
                    opacity: hoveredSlice === item.id || hoveredSlice === null ? 1 : 0.2,
                    boxShadow: hoveredSlice === item.id ? `0 0 30px ${item.color}80` : 'none',
                    borderRadius: '16px',
                    transform: hoveredSlice === item.id ? 'scale(1.02)' : 'scale(1)'
                  }}
                >
                  {(hoveredSlice === item.id || item.pct > 20) && (
                    <span className="font-black text-black text-2xl drop-shadow-md">{item.pct}%</span>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-8 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" /> Suministro Fijo Inmutable (200M)
            </p>
          </div>
        </div>

        {/* Proyecciones de Vesting */}
        <div className="p-8 rounded-3xl bg-black/40 border border-white/10">
          <h2 className="text-2xl font-bold mb-6">{t('vestTitle')}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-gray-500 uppercase tracking-wider">
                  <th className="pb-4 font-bold">{t('cohort')}</th>
                  <th className="pb-4 font-bold">{t('month0')}</th>
                  <th className="pb-4 font-bold">{t('month12')}</th>
                  <th className="pb-4 font-bold">{t('month24')}</th>
                  <th className="pb-4 font-bold">{t('month36')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-300 font-mono">
                <tr>
                  <td className="py-4 text-white font-sans font-bold">{t('v1Coh')}</td>
                  <td className="py-4 text-gray-500">0%</td>
                  <td className="py-4 text-[#00F5FF]">33.3%</td>
                  <td className="py-4 text-[#00F5FF]">66.6%</td>
                  <td className="py-4 text-green-400">100%</td>
                </tr>
                <tr>
                  <td className="py-4 text-white font-sans font-bold">{t('v2Coh')}</td>
                  <td className="py-4 text-gray-500">0%</td>
                  <td className="py-4 text-[#9B5DE5]">25.0%</td>
                  <td className="py-4 text-[#9B5DE5]">50.0%</td>
                  <td className="py-4 text-green-400">100%</td>
                </tr>
                <tr>
                  <td className="py-4 text-white font-sans font-bold">{t('v3Coh')}</td>
                  <td className="py-4 text-[#fca311]">{t('v3M0')}</td>
                  <td className="py-4 text-gray-400">{t('v3M12')}</td>
                  <td className="py-4 text-gray-400">{t('v3M12')}</td>
                  <td className="py-4 text-gray-400">{t('v3M36')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
