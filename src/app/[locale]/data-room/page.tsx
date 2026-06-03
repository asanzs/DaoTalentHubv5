"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { 
  PieChart, LineChart, Target, FileText, ArrowRight, Table, FileSpreadsheet, Lock, ExternalLink
} from "lucide-react";

export default function DataRoomPage() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'es';
  const t = useTranslations("dataRoomHub");

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 bg-[#020408] relative overflow-hidden">
      {/* Background glow animations */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#9B5DE5]/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-[#00F5FF]/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-8">
          <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4 group">
            <ArrowRight className="w-4 h-4 group-hover:-translate-x-1 transition-transform rotate-180" />
            <span className="text-sm font-bold tracking-wider uppercase">{t('back')}</span>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row items-start justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#9B5DE5]/30 bg-[#9B5DE5]/10 text-[#a855f7] text-xs font-bold tracking-wider uppercase mb-4">
              <Lock className="w-3 h-3" /> {t('restricted')}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              {t('title')}
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              {t('desc')}
            </p>
          </div>
          
          <Link 
            href={`/${locale}/data-room/business-plan`}
            className="mt-6 md:mt-0 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#9B5DE5] to-[#7c3aed] text-white font-black text-sm uppercase tracking-wider flex items-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(155,93,229,0.2)]"
          >
            <FileText className="w-4 h-4" /> Abrir Master Plan
          </Link>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          
          {/* Card 1: CAP TABLE */}
          <div className="p-8 rounded-[32px] border border-white/10 bg-white/[0.02] backdrop-blur-md flex flex-col justify-between hover:border-white/20 transition-all group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#9B5DE5]/20 to-transparent border border-[#9B5DE5]/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <PieChart className="w-6 h-6 text-[#9B5DE5]" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4">{t('capTitle')}</h3>
              <p className="text-gray-400 text-xs leading-relaxed mb-6">
                {t('capDesc')}
              </p>
              
              <div className="space-y-3.5 border-t border-white/5 pt-4">
                {[
                  { name: t("item1Name"), pct: "15%", tokens: "30,000,000 $TAL", detail: t("item1Detail") },
                  { name: t("item2Name"), pct: "20%", tokens: "40,000,000 $TAL", detail: t("item2Detail") },
                  { name: t("item3Name"), pct: "65%", tokens: "130,000,000 $TAL", detail: t("item3Detail") },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-xs">
                    <div>
                      <span className="text-gray-300 font-bold block">{item.name}</span>
                      <span className="text-gray-500 text-[10px]">{item.tokens} · {item.detail}</span>
                    </div>
                    <span className="text-white font-black text-sm font-mono bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">{item.pct}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <Link 
              href={`/${locale}/data-room/cap-table`}
              className="w-full mt-8 py-3 rounded-xl border border-white/10 hover:bg-[#9B5DE5]/10 hover:border-[#9B5DE5]/30 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4 text-[#9B5DE5]" /> Explorar Cap Table
            </Link>
          </div>
          
          {/* Card 2: BUSINESS PLAN */}
          <div className="p-8 rounded-[32px] border border-white/10 bg-white/[0.02] backdrop-blur-md flex flex-col justify-between hover:border-white/20 transition-all group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00F5FF]/20 to-transparent border border-[#00F5FF]/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6 text-[#00F5FF]" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4">{t('bpTitle')}</h3>
              <p className="text-gray-400 text-xs leading-relaxed mb-6">
                {t('bpDesc')}
              </p>
              
              <div className="space-y-4 relative border-l border-white/10 pl-4 ml-2">
                {[
                  { quarter: "Q3 2026", title: t("bpStep1Title"), desc: t("bpStep1Desc") },
                  { quarter: "Q3 2026", title: t("bpStep2Title"), desc: t("bpStep2Desc") },
                  { quarter: "Q4 2026", title: t("bpStep3Title"), desc: t("bpStep3Desc") },
                ].map((step, i) => (
                  <div key={i} className="relative space-y-1">
                    <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#00F5FF] shadow-[0_0_10px_rgba(0,245,255,0.5)]" />
                    <span className="text-[10px] text-[#00F5FF] font-black uppercase tracking-wider block">{step.quarter}</span>
                    <h5 className="text-xs font-bold text-white leading-none">{step.title}</h5>
                  </div>
                ))}
              </div>
            </div>
            
            <Link 
              href={`/${locale}/data-room/business-plan`}
              className="w-full mt-8 py-3 rounded-xl border border-white/10 hover:bg-[#00F5FF]/10 hover:border-[#00F5FF]/30 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4 text-[#00F5FF]" /> Leer Business Plan
            </Link>
          </div>

          {/* Card 3: FINANCIALS & TOKENOMICS */}
          <div className="p-8 rounded-[32px] border border-white/10 bg-white/[0.02] backdrop-blur-md flex flex-col justify-between hover:border-white/20 transition-all group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#22C55E]/20 to-transparent border border-[#22C55E]/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <LineChart className="w-6 h-6 text-[#22C55E]" />
              </div>
              <h3 className="text-2xl font-black text-white mb-4">{t('finTitle')}</h3>
              <p className="text-gray-400 text-xs leading-relaxed mb-6">
                {t('finDesc')}
              </p>
              
              <div className="space-y-3.5 border-t border-white/5 pt-4">
                {[
                  { label: t("finItem1"), value: "200,000,000 $TAL", color: "text-white" },
                  { label: t("finItem2"), value: "$0.040 USD / TAL", color: "text-[#fca311]" },
                  { label: t("finItem3"), value: "$500,000 USD", color: "text-white" },
                  { label: t("finItem4"), value: t("finItem4Value"), color: "text-[#00F5FF]" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center text-xs">
                    <span className="text-gray-400 font-medium">{item.label}</span>
                    <span className={`font-bold font-mono ${item.color}`}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <Link 
              href={`/${locale}/data-room/financials`}
              className="w-full mt-8 py-3 rounded-xl border border-white/10 hover:bg-[#22C55E]/10 hover:border-[#22C55E]/30 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4 text-[#22C55E]" /> Ver Dashboard Financiero
            </Link>
          </div>
        </div>

        {/* Master documents list table */}
        <div className="p-8 rounded-[32px] border border-white/10 bg-white/[0.01] backdrop-blur-xl mt-12">
          <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
            <Table className="w-6 h-6 text-[#9B5DE5]" /> {t('idxTitle')}
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-gray-500 font-bold uppercase tracking-wider">
                  <th className="pb-4 w-1/2">{t('idxCol1')}</th>
                  <th className="pb-4">{t('idxCol2')}</th>
                  <th className="pb-4">{t('idxCol3')}</th>
                  <th className="pb-4 text-right">{t('idxCol4')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-300">
                {[
                  { name: "{t('bpTitle')} Completo", folder: t("doc1Folder"), status: t("doc1Status"), link: `/${locale}/data-room/business-plan`, type: "Text" },
                  { name: t("doc2Name"), folder: t("doc2Folder"), status: t("doc1Status"), link: `/${locale}/whitepaper`, type: "Text" },
                  { name: t("doc3Name"), folder: t("doc3Folder"), status: t("doc3Status"), link: `/${locale}/data-room/financials`, type: "Data" },
                  { name: t("doc4Name"), folder: t("doc4Folder"), status: t("doc3Status"), link: `/${locale}/data-room/cap-table`, type: "Data" },
                ].map((doc, i) => (
                  <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 font-bold flex items-center gap-2">
                      {doc.type === "Data" ? (
                        <FileSpreadsheet className="w-4 h-4 text-[#00F5FF] shrink-0" />
                      ) : (
                        <FileText className="w-4 h-4 text-[#9B5DE5] shrink-0" />
                      )}
                      <span className="text-white">{doc.name}</span>
                    </td>
                    <td className="py-4 text-gray-500 font-mono">{doc.folder}</td>
                    <td className="py-4">
                       <span className="px-2 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-md text-[10px] font-bold uppercase tracking-wider">
                         {doc.status}
                       </span>
                    </td>
                    <td className="py-4 text-right">
                      <Link 
                        href={doc.link}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 hover:text-white transition-all text-xs font-bold border border-white/10"
                      >
                        {t('openBtn')} <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
