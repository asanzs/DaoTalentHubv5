import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Layers, Shield, Cpu, ArrowRight } from 'lucide-react';

export default function WhitepaperPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 px-4 bg-[url('/grid.svg')] bg-center relative">
      <div className="max-w-4xl mx-auto relative z-10">
        
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium tracking-wider uppercase">Volver al Inicio</span>
        </Link>

        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00F5FF]/30 bg-[#00F5FF]/10 text-[#00F5FF] text-xs font-bold tracking-wider uppercase mb-6">
            <BookOpen className="w-3 h-3" />
            Documentación Oficial
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            Protocolo <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] to-[#9B5DE5]">DAO Talent Hub</span>
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-2xl">
            La arquitectura técnica detrás del primer hub descentralizado que elimina el riesgo en la contratación global mediante Inteligencia Artificial y Smart Contracts.
          </p>
        </div>

        <div className="space-y-12">
          <section className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00F5FF]/20 to-transparent flex items-center justify-center border border-[#00F5FF]/30">
                <Cpu className="w-6 h-6 text-[#00F5FF]" />
              </div>
              <h2 className="text-2xl font-bold text-white">Auditoría IA (Smart Match)</h2>
            </div>
            <p className="text-gray-400 leading-relaxed mb-4">
              Cada talento en nuestra red debe superar una auditoría técnica automatizada. La IA no solo valida repositorios de GitHub, sino que simula entornos de resolución de problemas reales.
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
              <li>Precisión predictiva superior al 94%.</li>
              <li>Generación automática de Soulbound Tokens (SBTs).</li>
              <li>Análisis continuo de rendimiento.</li>
            </ul>
          </section>

          <section className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#9B5DE5]/20 to-transparent flex items-center justify-center border border-[#9B5DE5]/30">
                <Shield className="w-6 h-6 text-[#9B5DE5]" />
              </div>
              <h2 className="text-2xl font-bold text-white">Escrow Inteligente (Staking)</h2>
            </div>
            <p className="text-gray-400 leading-relaxed mb-4">
              Para empresas (B2B), el modelo elimina el riesgo. Los fondos se bloquean en un Smart Contract y solo se liberan tras validación de hitos (Milestones).
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2 ml-4">
              <li>0% de comisiones al hacer Staking del token nativo.</li>
              <li>Protección contra impagos para el talento (100% de ganancias).</li>
              <li>Tribunal de arbitraje descentralizado.</li>
            </ul>
          </section>

          <section className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Tokenomics V5</h2>
            </div>
            <p className="text-gray-400 leading-relaxed mb-4">
              El ecosistema se sostiene a través del staking de liquidez B2B y las tarifas de arbitraje B2C. Las proyecciones indican un ARR sólido gracias a nuestro Early Pass.
            </p>
            <Link href="/data-room" className="inline-flex items-center gap-2 text-[#00F5FF] hover:text-white font-medium mt-4">
              Ver Data Room Privada <ArrowRight className="w-4 h-4" />
            </Link>
          </section>
        </div>

      </div>
    </div>
  );
}
