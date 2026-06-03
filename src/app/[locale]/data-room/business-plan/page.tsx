"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Target, Cpu, Users, ShieldCheck, Zap } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export default function BusinessPlanPage() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'es';
  const t = useTranslations("businessPlan");
  const [activeSection, setActiveSection] = useState("resumen");

  const sections = [
    { id: "resumen", label: t('sec1') },
    { id: "problema", label: t('sec2') },
    { id: "mercado", label: t('sec3') },
    { id: "tecnologia", label: t('sec4') },
    { id: "roadmap", label: t('sec5') },
  ];

  return (
    <div className="min-h-screen bg-[#020408] pt-32 pb-24 text-gray-300 selection:bg-[#9B5DE5] selection:text-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12">
        
        {/* Sidebar Nav */}
        <div className="lg:w-64 shrink-0">
          <div className="sticky top-32 space-y-8">
            <Link href={`/${locale}/data-room`} className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-wider mb-8">
              <ArrowLeft className="w-4 h-4" /> {t('back')}
            </Link>
            
            <div className="space-y-1">
              <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">{t('index')}</h4>
              {sections.map(s => (
                <button
                  key={s.id}
                  onClick={() => {
                    setActiveSection(s.id);
                    document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`block w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all ${
                    activeSection === s.id 
                      ? 'bg-[#9B5DE5]/10 text-[#9B5DE5] font-bold border border-[#9B5DE5]/20' 
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 max-w-4xl bg-white/[0.01] border border-white/5 p-8 md:p-12 rounded-3xl backdrop-blur-xl">
          <div className="mb-12 border-b border-white/10 pb-8">
            <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-gray-400 mb-6 uppercase tracking-widest">
              {t('version')}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">DAO Talent Hub</h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              {t('subtitle')}
            </p>
          </div>

          <div className="space-y-24 prose prose-invert prose-p:text-gray-400 prose-p:leading-relaxed prose-headings:text-white prose-a:text-[#00F5FF] prose-strong:text-white max-w-none">
            
            <section id="resumen" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#00F5FF]/10 flex items-center justify-center border border-[#00F5FF]/20"><Target className="w-5 h-5 text-[#00F5FF]"/></div>
                <h2 className="text-3xl font-bold m-0">{t('sec1')}</h2>
              </div>
              <p dangerouslySetInnerHTML={{__html: t('exec1')}} />
              <p dangerouslySetInnerHTML={{__html: t('exec2')}} />
            </section>

            <section id="problema" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#9B5DE5]/10 flex items-center justify-center border border-[#9B5DE5]/20"><Cpu className="w-5 h-5 text-[#9B5DE5]"/></div>
                <h2 className="text-3xl font-bold m-0">{t('sec2')}</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8 my-8">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="text-xl font-bold text-[#fca311] mb-3 mt-0">{t('probTitle')}</h3>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>{t('prob1')}</li>
                    <li>{t('prob2')}</li>
                    <li>{t('prob3')}</li>
                  </ul>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="text-xl font-bold text-[#00F5FF] mb-3 mt-0">{t('solTitle')}</h3>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>{t('sol1')}</li>
                    <li>{t('sol2')}</li>
                    <li>{t('sol3')}</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="mercado" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#fca311]/10 flex items-center justify-center border border-[#fca311]/20"><Users className="w-5 h-5 text-[#fca311]"/></div>
                <h2 className="text-3xl font-bold m-0">{t('sec3')}</h2>
              </div>
              <p>
                {t('marketDesc')}
              </p>
              <div className="p-6 border border-white/10 bg-black/40 rounded-2xl my-6">
                <h4 className="text-white font-bold mb-4 mt-0">{t('revenueTitle')}</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-gray-400">{t('rev1Label')}</span>
                    <span className="font-bold text-[#9B5DE5]">{t('rev1Value')}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-gray-400">{t('rev2Label')}</span>
                    <span className="font-bold text-[#00F5FF]">{t('rev2Value')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">{t('rev3Label')}</span>
                    <span className="font-bold text-[#fca311]">{t('rev3Value')}</span>
                  </div>
                </div>
              </div>
            </section>

            <section id="tecnologia" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center border border-green-500/20"><ShieldCheck className="w-5 h-5 text-green-400"/></div>
                <h2 className="text-3xl font-bold m-0">{t('sec4')}</h2>
              </div>
              <p dangerouslySetInnerHTML={{__html: t('arch1')}} />
              <p>
                {t('arch2')}
              </p>
            </section>

            <section id="roadmap" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20"><Zap className="w-5 h-5 text-blue-400"/></div>
                <h2 className="text-3xl font-bold m-0">{t('sec5')}</h2>
              </div>
              <div className="pl-6 border-l-2 border-white/10 space-y-8 mt-8">
                <div className="relative">
                  <div className="absolute w-4 h-4 rounded-full bg-blue-500 -left-[33px] top-1 ring-4 ring-[#020408]"></div>
                  <h4 className="text-white font-bold mb-1 mt-0">{t('rm1Title')}</h4>
                  <p className="text-sm text-gray-400 m-0">{t('rm1Desc')}</p>
                </div>
                <div className="relative">
                  <div className="absolute w-4 h-4 rounded-full bg-blue-500 -left-[33px] top-1 ring-4 ring-[#020408]"></div>
                  <h4 className="text-white font-bold mb-1 mt-0">{t('rm2Title')}</h4>
                  <p className="text-sm text-gray-400 m-0">{t('rm2Desc')}</p>
                </div>
                <div className="relative">
                  <div className="absolute w-4 h-4 rounded-full bg-gray-600 -left-[33px] top-1 ring-4 ring-[#020408]"></div>
                  <h4 className="text-gray-400 font-bold mb-1 mt-0">{t('rm3Title')}</h4>
                  <p className="text-sm text-gray-500 m-0">{t('rm3Desc')}</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
