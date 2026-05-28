"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Code, CheckCircle2, Bot, ArrowRight, Zap, Sparkles } from "lucide-react";
import Link from "next/link";

// Nav component
// Hero Component
const Hero = () => {
  return (
    <section className="relative pt-40 pb-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#9B5DE5]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-[#00F5FF]/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/80 text-sm mb-8">
            <Sparkles className="w-4 h-4 text-[#00F5FF]" />
            <span>La nueva generación de contratación remota</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight mb-8">
            Contrata al Top 1%. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] to-[#9B5DE5]">
              Sin comisiones abusivas.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Una plataforma única donde las empresas contratan sin riesgo financiero y el talento verificado por IA se queda con el 100% de lo que gana.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto h-14 px-8 rounded-full bg-gradient-to-r from-[#00F5FF] to-[#00D4FF] text-black font-bold text-lg hover:shadow-[0_0_30px_rgba(0,245,255,0.4)] transition-all">
              Quiero Contratar (Empresas)
            </button>
            <button className="w-full sm:w-auto h-14 px-8 rounded-full bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              Soy Talento (Gratis) <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Social Proof & Simulator for B2B
const CompanyValue = () => {
  const [searchTerm, setSearchTerm] = useState("");
  

  return (
    <section id="empresas" className="py-24 bg-black/40 border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl font-bold text-white mb-6">Contratación 100% segura con <span className="text-[#00F5FF]">Riesgo Cero</span></h2>
          <p className="text-white/60 text-lg mb-8 leading-relaxed">
            Olvídate de pagar comisiones del 20% a agencias o plataformas. Nuestro sistema Escrow retiene tu dinero de forma segura. <strong>Solo pagas cuando el código que solicitaste funciona perfectamente.</strong>
          </p>
          
          <ul className="space-y-4 mb-10">
            {[
              "Talento auditado y verificado por Inteligencia Artificial.",
              "Cashback corporativo: Reduce tus comisiones al 0% con nuestro plan Premium.",
              "Manejo de pagos en Fiat (Tarjetas de Crédito) o Crypto."
            ].map((text, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#9B5DE5] flex-shrink-0" />
                <span className="text-white/80">{text}</span>
              </li>
            ))}
          </ul>
          
          <button className="h-12 px-8 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform">
            Ver Planes y Precios
          </button>
        </div>
        
        {/* Fake Simulator UX */}
        <div className="p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-transparent">
          <div className="bg-[#0B0C10] p-8 rounded-2xl h-full shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <Bot className="w-6 h-6 text-[#00F5FF]" />
              <h3 className="text-white font-medium">Smart Match IA Simulator</h3>
            </div>
            
            <div className="relative mb-6">
              <input 
                type="text" 
                placeholder="Ej: Necesito un experto en React y Rust..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#00F5FF] transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button 
                
                className="absolute right-2 top-2 bottom-2 bg-[#00F5FF]/10 text-[#00F5FF] px-4 rounded-lg text-sm font-medium hover:bg-[#00F5FF]/20 transition-colors"
              >
                Buscar
              </button>
            </div>

            <div className="space-y-3">
              {/* Fake Candidates */}
              <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex items-center justify-between opacity-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#9B5DE5] to-[#00F5FF] opacity-50" />
                  <div>
                    <p className="text-white font-medium text-sm">Senior Fullstack Dev</p>
                    <p className="text-white/40 text-xs">Match Score: 98%</p>
                  </div>
                </div>
                <button className="text-xs font-medium px-3 py-1 rounded bg-white/5 text-white/50">Contactar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Talent Value
const TalentValue = () => {
  return (
    <section id="talento" className="py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">Para el Talento: <span className="text-[#9B5DE5]">Gana el 100% de tu trabajo</span></h2>
        <p className="text-white/60 text-lg max-w-2xl mx-auto mb-16 leading-relaxed">
          Revolucionamos la industria eliminando al intermediario extractivo. Tus credenciales son tuyas, tus clientes son tuyos y tu dinero te llega directamente a tu banco o wallet.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-left hover:bg-white/[0.07] transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#00F5FF]/10 flex items-center justify-center mb-6">
              <Code className="w-6 h-6 text-[#00F5FF]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">1. Verificación por IA</h3>
            <p className="text-white/60">Sube tu código. Nuestro auditor IA lo validará matemáticamente y te otorgará credenciales inmutables que prueban tu nivel.</p>
          </div>
          
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-left hover:bg-white/[0.07] transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#9B5DE5]/10 flex items-center justify-center mb-6">
              <Briefcase className="w-6 h-6 text-[#9B5DE5]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">2. Ofertas Directas</h3>
            <p className="text-white/60">Las empresas te enviarán ofertas exclusivas basadas en tu &quot;Match Score&quot;. Sin enviar miles de CVs, las empresas vienen a ti.</p>
          </div>

          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-left hover:bg-white/[0.07] transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#00F5FF]/10 flex items-center justify-center mb-6">
              <Zap className="w-6 h-6 text-[#00F5FF]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">3. Cero Comisiones</h3>
            <p className="text-white/60">Retira tus fondos directamente en USDC, Euros o Dólares. Todo lo que ganas es tuyo, el modelo B2B cubre los gastos de la red.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0C10] font-sans selection:bg-[#00F5FF]/30">
            <Hero />
      <CompanyValue />
      <TalentValue />
    </main>
  );
}
