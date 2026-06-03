import { useTranslations } from 'next-intl';
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Cpu, Layers, Link as LinkIcon, ShieldCheck, Zap, HeartHandshake, Database, GraduationCap } from "lucide-react";
import { usePathname } from "next/navigation";

export default function WhitepaperPage() {
  const tApp = useTranslations('app');
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'es';

  return (
    <div className="min-h-screen bg-[#020408] selection:bg-[#00F5FF] selection:text-black">
      
      {/* HERO SECTION */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00F5FF]/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-bold text-gray-300 mb-8 uppercase tracking-widest shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-[#00F5FF] animate-pulse" /> Documento Fundacional V5.2
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-tight">
            {tApp('futureOf')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] to-[#9B5DE5]">{tApp('workAndEdu')}</span> {tApp('isOnChain')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            DAO Talent Hub rompe el monopolio del reclutamiento tradicional. Validamos el talento criptográficamente y usamos Inteligencia Artificial para emparejarte directamente con empresas Web3, sin intermediarios.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href={`/${locale}/early-pass`} className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#00F5FF] to-[#9B5DE5] text-black font-black text-lg hover:opacity-90 hover:scale-105 transition-all shadow-[0_0_30px_rgba(0,245,255,0.4)] flex items-center justify-center gap-2">
              Únete al Ecosistema <Zap className="w-5 h-5" />
            </Link>
            <a href="#tokenomics" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 text-white font-bold border border-white/10 hover:bg-white/10 transition-all text-lg flex items-center justify-center gap-2">
              Comprar $TAL <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* SMART MATCH AI ENGINE */}
      <section className="py-24 bg-black/40 border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">El Motor: Smart Match AI</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">{tApp('llmAnalysis')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl border border-white/10 bg-white/5 hover:border-[#00F5FF]/30 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-[#00F5FF]/10 flex items-center justify-center mb-6">
                <Database className="w-7 h-7 text-[#00F5FF]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{tApp('ragExtraction')}</h3>
              <p className="text-gray-400">El motor indexa repositorios de GitHub, commits en cadena (Gitcoin) y certificaciones universitarias (SBTs) creando un perfil vectorial inmutable.</p>
            </div>
            <div className="p-8 rounded-3xl border border-white/10 bg-white/5 hover:border-[#9B5DE5]/30 transition-colors relative">
              <div className="w-14 h-14 rounded-xl bg-[#9B5DE5]/10 flex items-center justify-center mb-6">
                <Cpu className="w-7 h-7 text-[#9B5DE5]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Emparejamiento IA</h3>
              <p className="text-gray-400">{tApp('vectorMatch')}</p>
            </div>
            <div className="p-8 rounded-3xl border border-white/10 bg-white/5 hover:border-green-500/30 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center mb-6">
                <ShieldCheck className="w-7 h-7 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{tApp('autoEscrow')}</h3>
              <p className="text-gray-400">Si hay un match y ambas partes aceptan, un contrato inteligente retiene los fondos (USDC/TAL) y garantiza el pago contra hitos probados.</p>
            </div>
          </div>
        </div>
      </section>

      {/* REPUTATION SYSTEM (SBTs) */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute right-0 top-1/2 w-[600px] h-[600px] bg-[#9B5DE5]/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <span className="text-[#9B5DE5] font-black uppercase tracking-widest text-sm mb-4 block">El fin del Curriculum Falso</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Soulbound Tokens (SBTs)</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Tus habilidades ya no son texto en un PDF que cualquiera puede inventar. Cada curso completado en nuestra Universidad Web3, cada proyecto aprobado por auditoría, emite un token no transferible a tu wallet.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-white"><CheckCircle2 className="w-5 h-5 text-green-400" /> Historial laboral inmutable en cadena.</li>
              <li className="flex items-center gap-3 text-white"><CheckCircle2 className="w-5 h-5 text-green-400" /> Identidad profesional seudónima pero verificable.</li>
              <li className="flex items-center gap-3 text-white"><CheckCircle2 className="w-5 h-5 text-green-400" /> Aumenta tu % de éxito en el Smart Match.</li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: "Solidity Master", role: "Developer", img: "🛡️" },
              { title: "DeFi Auditor", role: "Security", img: "👁️" },
              { title: "React Web3", role: "Frontend", img: "⚡" },
              { title: "Tokenomics", role: "Architect", img: "📊" }
            ].map((badge, i) => (
              <div key={i} className="p-6 rounded-3xl bg-black border border-white/10 hover:border-[#9B5DE5]/50 transition-all text-center group">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{badge.img}</div>
                <h4 className="font-bold text-white mb-1">{badge.title}</h4>
                <p className="text-xs text-[#00F5FF] font-mono">{badge.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOKENOMICS & UTILITY */}
      <section id="tokenomics" className="py-32 bg-[#050810] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Utilidad del Ecosistema $TAL</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">{tApp('nativeTokenEco')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/10">
              <GraduationCap className="w-8 h-8 text-[#00F5FF] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Learn to Earn</h3>
              <p className="text-sm text-gray-400">{tApp('studentRewards')}</p>
            </div>
            <div className="p-6 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/10">
              <HeartHandshake className="w-8 h-8 text-[#9B5DE5] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">B2B Staking</h3>
              <p className="text-sm text-gray-400">Las empresas deben hacer staking de $TAL como colateral para usar el Smart Match AI y firmar contratos.</p>
            </div>
            <div className="p-6 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/10">
              <ShieldCheck className="w-8 h-8 text-green-400 mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Buy & Burn</h3>
              <p className="text-sm text-gray-400">El 20% de los fees B2B recolectados en fiat (USDC) se usan para comprar $TAL en el mercado y quemarlo.</p>
            </div>
            <div className="p-6 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/10">
              <Layers className="w-8 h-8 text-[#fca311] mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">veTAL Governance</h3>
              <p className="text-sm text-gray-400">Bloquea $TAL para obtener poder de voto (veTAL) en la DAO y decidir sobre disputas laborales y airdrops.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

// Pequeño componente interno usado arriba
function CheckCircle2({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
