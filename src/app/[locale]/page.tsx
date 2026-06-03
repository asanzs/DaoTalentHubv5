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

      {/* DAO GOVERNANCE & TREASURY */}
      <section className="py-32 relative border-b border-white/5 bg-[#020408]">
        <div className="absolute left-0 top-1/3 w-72 h-72 bg-[#00F5FF]/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute right-0 bottom-1/3 w-72 h-72 bg-[#fca311]/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-green-400 block mb-3">100% On-Chain</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Gobernanza & Tesorería DAO</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              El poder y el capital residen en la comunidad. Los holders de $TAL deciden el futuro del protocolo y auditan los fondos en tiempo real.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Treasury Widget */}
            <div className="p-8 md:p-10 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col justify-between group hover:border-[#00F5FF]/30 transition-all">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#00F5FF]/10 flex items-center justify-center">
                      <Database className="w-6 h-6 text-[#00F5FF]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Tesorería DAO</h3>
                      <span className="text-xs text-[#00F5FF] font-mono">Live on Base</span>
                    </div>
                  </div>
                  <Link href="/data-room/financials" className="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1">
                    Ver Dashboard <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
                
                <div className="space-y-6">
                  <div>
                     <p className="text-sm text-gray-500 font-medium mb-1">Total Value Locked (TVL)</p>
                     <p className="text-4xl font-black text-white tracking-tight">$4,250,000 <span className="text-xl text-gray-500 font-medium">USD</span></p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                        <p className="text-xs text-gray-500 mb-1">En Escrow (B2B)</p>
                        <p className="font-mono font-bold text-green-400">$1,120,500</p>
                     </div>
                     <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                        <p className="text-xs text-gray-500 mb-1">Reserva Staking</p>
                        <p className="font-mono font-bold text-[#9B5DE5]">15.4M $TAL</p>
                     </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Governance Widget */}
            <div className="p-8 md:p-10 rounded-3xl bg-white/[0.02] border border-white/10 flex flex-col justify-between group hover:border-[#fca311]/30 transition-all">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#fca311]/10 flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6 text-[#fca311]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Gobernanza Activa</h3>
                      <span className="text-xs text-[#fca311] font-mono">Snapshot.org</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 hover:border-white/20 transition-all cursor-pointer">
                     <div className="flex justify-between items-start mb-2">
                       <span className="px-2 py-1 rounded text-[10px] font-bold bg-green-500/20 text-green-400 border border-green-500/20 uppercase">Activa</span>
                       <span className="text-xs text-gray-500">Termina en 2 días</span>
                     </div>
                     <p className="text-sm font-bold text-white mb-3">DIP-14: Reducir fee de B2B Escrow del 2% al 1% para startups Web3</p>
                     <div className="flex items-center gap-4 text-xs font-mono">
                        <div className="flex-1">
                          <div className="flex justify-between mb-1 text-gray-400"><span>A Favor</span><span className="text-green-400">82%</span></div>
                          <div className="h-1.5 rounded-full bg-white/10"><div className="h-full bg-green-400 rounded-full" style={{width: '82%'}}></div></div>
                        </div>
                     </div>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 opacity-60">
                     <div className="flex justify-between items-start mb-2">
                       <span className="px-2 py-1 rounded text-[10px] font-bold bg-gray-500/20 text-gray-400 border border-gray-500/20 uppercase">Ejecutada</span>
                       <span className="text-xs text-gray-500">Hace 1 semana</span>
                     </div>
                     <p className="text-sm font-bold text-white">DIP-13: Aprobar airdrop de 2,000,000 $TAL para la temporada 2</p>
                  </div>
                </div>
              </div>
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


      {/* ══════════════════════════════════════════════════════
          EARLY PASS + IDO MODULES (matching modulos-earlypass-IDO.JPG)
      ══════════════════════════════════════════════════════ */}
      <section className="py-32 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#F59E0B]/5 blur-[140px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="text-xs font-black uppercase tracking-widest text-[#00F5FF] block mb-3">⚡ Token Launch Gateway</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Participa en la{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] to-[#00F5FF]">
                Economía $TAL
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Elige entre reclamar tu Pase Fundador de por vida o adquirir tokens $TAL líquidos durante nuestro lanzamiento público.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-stretch">
            {/* MÓDULO 1: LIFETIME STATUS GATE */}
            <div className="rounded-[32px] p-8 md:p-10 relative overflow-hidden backdrop-blur-md bg-white/[0.02] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col justify-between group hover:border-[#F59E0B]/30 transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F59E0B]/50 to-transparent rounded-t-[32px] animate-pulse" />
              
              <div className="space-y-6">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#F59E0B]">
                  ⚡ Lifetime Status Gate
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                  Programa 'Early Adopter': Accede a la Élite. Fricción Cero.
                </h3>
                <ul className="space-y-3.5 text-sm text-gray-300">
                  {[
                    'Paga $12 USD (O descuéntalo de tu primer contrato).',
                    'Recibe tu pasaporte inmutable (SBT).',
                    'Obtén un Airdrop garantizado de 20€ en $TAL.',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="text-[#F59E0B] font-bold text-base mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-8 space-y-4 bg-white/[0.01] border border-white/5 p-6 rounded-2xl">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-[#F59E0B] animate-pulse">⚠️ ALTA DEMANDA</span>
                    <span className="text-white">92%</span>
                  </div>
                  <p className="text-[10px] font-bold text-gray-400">1,842 de 2,000 pases fundadores reclamados.</p>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#F59E0B] to-[#D97706] rounded-full" style={{ width: '92%' }} />
                  </div>
                </div>
                <Link
                  href="/early-pass"
                  className="block w-full min-h-[48px] py-4 rounded-2xl font-bold text-xs uppercase tracking-wider text-center transition-all duration-300 shadow-[0_0_30px_rgba(245,158,11,0.15)] hover:shadow-[0_0_40px_rgba(245,158,11,0.25)] text-[#020408]"
                  style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)' }}
                >
                  Reclamar Mi Pase y Airdrop
                </Link>
              </div>
            </div>

            {/* MÓDULO 2: LIQUID TOKEN IDO */}
            <div className="rounded-[32px] p-8 md:p-10 relative overflow-hidden backdrop-blur-md bg-white/[0.02] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col justify-between group hover:border-[#00F5FF]/30 transition-all duration-300">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F5FF]/50 to-transparent rounded-t-[32px] animate-pulse" />
              
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#00F5FF]">
                    ⚡ Liquid Token IDO
                  </span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-[#00F5FF]/10 text-[#00F5FF] border border-[#00F5FF]/20 animate-pulse">
                    Phase 2/4: Growth
                  </span>
                </div>
                
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                    Public Token Sale ($TAL IDO)
                  </h3>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                    Adquiere tokens $TAL líquidos antes del lanzamiento en mainnet. El precio aumenta dinámicamente por tramo.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-3 bg-white/[0.01] border border-white/5 p-4 rounded-xl">
                  <div>
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest block mb-0.5">Precio Actual</span>
                    <span className="text-sm font-bold text-white font-mono">$0.040 USD / $TAL</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest block mb-0.5">Siguiente Tramo</span>
                    <span className="text-sm font-bold text-gray-400 font-mono">$0.050 USD</span>
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="text-[#00F5FF]">34% Vendido</span>
                    <span className="text-gray-500">Objetivo: 50M $TAL</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#00F5FF] to-[#00E5FF]" style={{ width: '34%' }} />
                  </div>
                </div>
                
                <div className="border-t border-white/5 pt-4 space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-wider">Calculadora de Compra</span>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <input
                        type="number"
                        defaultValue={100}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-white focus:outline-none focus:border-[#00F5FF] transition-all"
                        placeholder="100"
                        readOnly
                        onClick={() => window.location.href = '/early-pass#ido'}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-500">USD</span>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        defaultValue={2500}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-[#00F5FF] focus:outline-none focus:border-[#00F5FF] transition-all"
                        placeholder="2500"
                        readOnly
                        onClick={() => window.location.href = '/early-pass#ido'}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-500">$TAL</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-3">
                <Link href="/early-pass#ido" className="min-h-[48px] py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all duration-300 bg-white text-[#020408] hover:bg-gray-100 flex items-center justify-center gap-2">
                  💳 Buy with Stripe
                </Link>
                <Link href="/early-pass#ido" className="min-h-[48px] py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all duration-300 border border-[#00F5FF]/30 bg-[#00F5FF]/5 text-[#00F5FF] hover:bg-[#00F5FF]/10 flex items-center justify-center gap-2">
                  🔌 Pay with Wallet
                </Link>
              </div>
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
