import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Users, Code2 } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations('landing');

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-40"></div>
        
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00F5FF]/10 blur-[120px] rounded-full"></div>
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-[#9B5DE5]/10 blur-[120px] rounded-full"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-300 text-sm mb-8 backdrop-blur-md hover:bg-white/10 transition-colors cursor-pointer">
            <span className="flex h-2 w-2 rounded-full bg-[#00F5FF] animate-pulse"></span>
            {t('badge')}
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tight leading-[1.1]" dangerouslySetInnerHTML={{ __html: t.raw('title') }} />
          
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/talent" className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#00F5FF] to-[#9B5DE5] text-black font-black text-lg hover:opacity-90 transition-all shadow-[0_0_30px_rgba(0,245,255,0.3)] hover:shadow-[0_0_50px_rgba(155,93,229,0.5)] flex items-center justify-center gap-2">
              {t('ctaPrimary')} <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/early-pass" className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 bg-white/5 text-white font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2 backdrop-blur-md">
              {t('ctaSecondary')}
            </Link>
          </div>
        </div>
      </section>

      {/* VALUE PROPOSITION B2B */}
      <section className="py-24 bg-black relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">¿Por qué las empresas eligen Mythos?</h2>
            <p className="text-gray-400">La infraestructura que protege tu capital de inversión (VC) y optimiza tus recursos.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: "Cero Riesgo Financiero", desc: "Los fondos se bloquean en un contrato inteligente. Si el talento no entrega, recuperas tu dinero al 100% mediante nuestro Tribunal Descentralizado." },
              { icon: Zap, title: "Cero Comisiones (Staking)", desc: "Olvídate del 20% de las agencias. Haciendo staking de nuestra liquidez, las tarifas de contratación bajan al 0%." },
              { icon: Code2, title: "Talento Validado (SBTs)", desc: "Nadie entra sin pasar por nuestra IA (Universidad). Validamos repositorios, código y habilidades blandas automáticamente." }
            ].map((f, idx) => (
              <div key={idx} className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00F5FF]/20 to-transparent flex items-center justify-center border border-[#00F5FF]/30 mb-6">
                  <f.icon className="w-6 h-6 text-[#00F5FF]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
