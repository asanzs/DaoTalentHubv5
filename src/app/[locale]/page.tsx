"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Code2, Briefcase, Zap, ShieldCheck, Cpu, Globe2, Network, Database, CheckCircle2, Lock, ArrowUpRight, Trophy, Coins } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const t = useTranslations('index');
  const [view, setView] = useState<'b2c' | 'b2b'>('b2c');

  return (
    <div className="flex flex-col min-h-screen bg-[#020408]">
      {/* HERO SECTION NEUTRAL */}
      <section className="relative pt-40 pb-20 overflow-hidden flex flex-col items-center">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20"></div>
        
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00F5FF]/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-[1.1]">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>

          {/* COGNITIVE BIFURCATION TOGGLE */}
          <div className="relative inline-flex items-center p-1 bg-white/5 border border-white/10 rounded-full mb-16 backdrop-blur-sm overflow-hidden">
            <button
              onClick={() => setView('b2c')}
              className={`relative z-10 flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg transition-colors duration-300 ${view === 'b2c' ? 'text-black' : 'text-gray-400 hover:text-white'}`}
            >
              <Code2 className="w-5 h-5" />
              {t('hero.b2c_cta')}
            </button>
            <button
              onClick={() => setView('b2b')}
              className={`relative z-10 flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg transition-colors duration-300 ${view === 'b2b' ? 'text-black' : 'text-gray-400 hover:text-white'}`}
            >
              <Briefcase className="w-5 h-5" />
              {t('hero.b2b_cta')}
            </button>
            
            {/* Sliding Pill */}
            <motion.div
              layout
              initial={false}
              animate={{
                x: view === 'b2c' ? 0 : '100%',
                background: view === 'b2c' 
                  ? 'linear-gradient(to right, #00F5FF, #9B5DE5)' 
                  : 'linear-gradient(to right, #ffffff, #e2e8f0)'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute left-1 top-1 bottom-1 w-[calc(50%-4px)] rounded-full -z-0"
            />
          </div>

          {/* DYNAMIC CONTENT AREA */}
          <div className="relative min-h-[400px] w-full max-w-5xl mx-auto">
            <AnimatePresence mode="wait">
              {view === 'b2c' ? (
                <motion.div
                  key="b2c"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-left"
                >
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                      <div className="inline-block px-3 py-1 rounded-full bg-[#00F5FF]/10 border border-[#00F5FF]/20 text-[#00F5FF] text-sm font-bold tracking-widest uppercase">
                        {t('b2c.title')}
                      </div>
                      <h2 className="text-3xl md:text-5xl font-black text-white">{t('b2c.subtitle')}</h2>
                      <ul className="space-y-4">
                        {[0, 1, 2, 3].map((i) => (
                          <li key={i} className="flex items-center gap-3 text-gray-300">
                            <Zap className="w-5 h-5 text-[#9B5DE5]" />
                            {t(`b2c.features.${i}`)}
                          </li>
                        ))}
                      </ul>
                      <Link href="/talent" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#00F5FF] to-[#9B5DE5] text-black font-black text-lg hover:opacity-90 transition-all mt-4">
                        Acceder <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                    {/* B2C Visual: Dark IDE Terminal */}
                    <div className="rounded-2xl border border-white/10 bg-[#0d1117] p-6 shadow-2xl relative overflow-hidden h-full flex flex-col justify-center">
                       <div className="absolute top-0 left-0 right-0 h-8 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                       </div>
                       <div className="mt-8 font-mono text-sm text-[#00F5FF]">
                         <p>➜  ~ dao-talent-hub connect wallet</p>
                         <p className="text-gray-400 mt-2">Verifying identity...</p>
                         <p className="text-green-400 mt-1">✓ SBT Identity Verified</p>
                         <p className="text-gray-400 mt-2">Minting reputation tokens...</p>
                         <p className="text-purple-400 mt-1">+ 1,500 $TAL earned</p>
                         <p className="text-gray-400 mt-4 animate-pulse">_</p>
                       </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="b2b"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-left"
                >
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                      <div className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-sm font-bold tracking-widest uppercase">
                        {t('b2b.title')}
                      </div>
                      <h2 className="text-3xl md:text-5xl font-black text-white">{t('b2b.subtitle')}</h2>
                      <ul className="space-y-4">
                        {[0, 1, 2, 3].map((i) => (
                          <li key={i} className="flex items-center gap-3 text-gray-300">
                            <ShieldCheck className="w-5 h-5 text-white" />
                            {t(`b2b.features.${i}`)}
                          </li>
                        ))}
                      </ul>
                      <Link href="/dashboard" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-black text-lg hover:bg-gray-200 transition-all mt-4">
                        Crear Empresa <ArrowRight className="w-5 h-5" />
                      </Link>
                    </div>
                    {/* B2B Visual: Clean SaaS Dashboard */}
                    <div className="rounded-2xl border border-white/10 bg-[#ffffff] p-8 shadow-2xl relative overflow-hidden text-black h-full">
                       <div className="flex justify-between items-center mb-6 border-b pb-4">
                          <h3 className="font-bold text-lg">Billing Dashboard</h3>
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-bold">Verified KYB</span>
                       </div>
                       <div className="space-y-4">
                          <div className="p-4 rounded-xl border bg-gray-50 flex justify-between items-center">
                             <div>
                               <p className="text-sm text-gray-500 font-medium">Active Escrow Contracts</p>
                               <p className="font-black text-3xl mt-1">$24,500</p>
                             </div>
                             <ShieldCheck className="text-blue-500 w-10 h-10" />
                          </div>
                          <div className="p-4 rounded-xl border bg-gray-50">
                             <p className="text-sm text-gray-500 mb-3 font-medium">Recent Hires</p>
                             <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center"><Cpu className="w-5 h-5 text-gray-500"/></div>
                                <div>
                                  <p className="font-bold">Senior Solidity Dev</p>
                                  <p className="text-gray-500 text-sm">Delivered successfully</p>
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF (Marquee) */}
      <section className="py-12 border-y border-white/5 bg-white/[0.02] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-6 text-center">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">{t('expanded.socialProof')}</p>
        </div>
        <div className="flex gap-16 items-center w-max animate-pulse opacity-50 px-6">
           <h3 className="text-2xl font-black text-white flex items-center gap-2"><Globe2 className="w-6 h-6"/> OMNICORP</h3>
           <h3 className="text-2xl font-black text-white flex items-center gap-2"><Network className="w-6 h-6"/> NEXUS LABS</h3>
           <h3 className="text-2xl font-black text-white flex items-center gap-2"><Database className="w-6 h-6"/> DATASCALE</h3>
           <h3 className="text-2xl font-black text-white flex items-center gap-2"><ShieldCheck className="w-6 h-6"/> SECURECHAIN</h3>
           <h3 className="text-2xl font-black text-white flex items-center gap-2"><Cpu className="w-6 h-6"/> AI VENTURES</h3>
           <h3 className="text-2xl font-black text-white flex items-center gap-2"><Globe2 className="w-6 h-6"/> OMNICORP</h3>
           <h3 className="text-2xl font-black text-white flex items-center gap-2"><Network className="w-6 h-6"/> NEXUS LABS</h3>
        </div>
      </section>

      {/* HOW IT WORKS (3 Steps) */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6" dangerouslySetInnerHTML={{ __html: t('expanded.howItWorks.title') }} />
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">{t('expanded.howItWorks.subtitle')}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl border border-white/10 bg-white/5 relative overflow-hidden group hover:border-[#00F5FF]/50 transition-all">
              <div className="w-16 h-16 rounded-2xl bg-[#00F5FF]/10 flex items-center justify-center mb-8">
                <CheckCircle2 className="w-8 h-8 text-[#00F5FF]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{t('expanded.howItWorks.step1Title')}</h3>
              <p className="text-gray-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('expanded.howItWorks.step1Desc') }} />
            </div>
            
            <div className="p-8 rounded-3xl border border-white/10 bg-white/5 relative overflow-hidden group hover:border-[#9B5DE5]/50 transition-all">
              <div className="w-16 h-16 rounded-2xl bg-[#9B5DE5]/10 flex items-center justify-center mb-8">
                <Network className="w-8 h-8 text-[#9B5DE5]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{t('expanded.howItWorks.step2Title')}</h3>
              <p className="text-gray-400 leading-relaxed">{t('expanded.howItWorks.step2Desc')}</p>
            </div>
            
            <div className="p-8 rounded-3xl border border-white/10 bg-white/5 relative overflow-hidden group hover:border-[#fca311]/50 transition-all">
              <div className="w-16 h-16 rounded-2xl bg-[#fca311]/10 flex items-center justify-center mb-8">
                <Lock className="w-8 h-8 text-[#fca311]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{t('expanded.howItWorks.step3Title')}</h3>
              <p className="text-gray-400 leading-relaxed">{t('expanded.howItWorks.step3Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* THE ENGINE (Smart Match AI) */}
      <section className="py-32 bg-[#050810] border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#9B5DE5]/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#9B5DE5]/10 border border-[#9B5DE5]/20 text-[#9B5DE5] font-bold text-sm mb-6">
              <Cpu className="w-4 h-4" /> {t('expanded.engine.tag')}
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6" dangerouslySetInnerHTML={{ __html: t('expanded.engine.title') }} />
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">{t('expanded.engine.desc')}</p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-white font-medium"><CheckCircle2 className="w-5 h-5 text-[#9B5DE5]" /> {t('expanded.engine.bullet1')}</li>
              <li className="flex items-center gap-3 text-white font-medium"><CheckCircle2 className="w-5 h-5 text-[#9B5DE5]" /> {t('expanded.engine.bullet2')}</li>
              <li className="flex items-center gap-3 text-white font-medium"><CheckCircle2 className="w-5 h-5 text-[#9B5DE5]" /> {t('expanded.engine.bullet3')}</li>
            </ul>
            <Link href="/whitepaper" className="text-white font-bold hover:text-[#9B5DE5] transition-colors flex items-center gap-2">
              {t('expanded.engine.link')} <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="relative">
             <div className="absolute inset-0 bg-gradient-to-tr from-[#9B5DE5]/20 to-transparent rounded-3xl blur-2xl"></div>
             <div className="rounded-3xl border border-white/10 bg-black/50 backdrop-blur-xl p-8 relative">
               <pre className="font-mono text-sm text-[#00F5FF] overflow-x-auto">
{`{
  "match_request": {
    "role": "Senior Solidity Dev",
    "required_skills": ["EVM", "Foundry", "Yul"],
    "culture_fit": "Async startup"
  },
  "engine_response": {
    "candidate_id": "0x7a...9b4",
    "sbt_verification": true,
    "match_score": 98.5,
    "confidence_interval": "High",
    "action": "Execute_Escrow_Contract"
  }
}`}
               </pre>
             </div>
          </div>
        </div>
      </section>

      {/* TOKENOMICS & GAMIFICATION */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-16">
             <h2 className="text-4xl md:text-5xl font-black text-white mb-6">{t('expanded.tokenomics.title')}</h2>
             <p className="text-xl text-gray-400 max-w-2xl mx-auto">{t('expanded.tokenomics.subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto text-left">
             <div className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 flex flex-col items-start hover:bg-white/10 transition-all">
                <Trophy className="w-12 h-12 text-[#fca311] mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">{t('expanded.tokenomics.card1Title')}</h3>
                <p className="text-gray-400 mb-6">{t('expanded.tokenomics.card1Desc')}</p>
             </div>
             <div className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 flex flex-col items-start hover:bg-white/10 transition-all">
                <Coins className="w-12 h-12 text-[#00F5FF] mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">{t('expanded.tokenomics.card2Title')}</h3>
                <p className="text-gray-400 mb-6">{t('expanded.tokenomics.card2Desc')}</p>
             </div>
          </div>
        </div>
      </section>

      {/* GLOBAL CTA */}
      <section className="py-32 border-t border-white/5 relative overflow-hidden bg-gradient-to-b from-[#020408] to-[#0a0f1a]">
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00F5FF]/10 blur-[150px] pointer-events-none"></div>
         <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tight">{t('expanded.cta.title')}</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
               <Link href="/dashboard" className="w-full sm:w-auto px-10 py-5 rounded-full bg-white text-black font-black text-lg hover:scale-105 transition-transform flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                  <Briefcase className="w-5 h-5" /> {t('expanded.cta.btnB2B')}
               </Link>
               <Link href="/talent" className="w-full sm:w-auto px-10 py-5 rounded-full bg-gradient-to-r from-[#00F5FF] to-[#9B5DE5] text-black font-black text-lg hover:scale-105 transition-transform flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(0,245,255,0.3)]">
                  <Code2 className="w-5 h-5" /> {t('expanded.cta.btnB2C')}
               </Link>
            </div>
         </div>
      </section>
    </div>
  );
}
