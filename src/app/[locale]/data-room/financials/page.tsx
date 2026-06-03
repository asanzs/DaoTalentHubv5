"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, TrendingUp, Activity, DollarSign, Users, LineChart } from "lucide-react";
import { usePathname } from "next/navigation";

export default function FinancialsPage() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'es';

  return (
    <div className="min-h-screen bg-[#020408] pt-32 pb-24 text-white">
      <div className="max-w-6xl mx-auto px-6">
        
        <Link href={`/${locale}/data-room`} className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-wider mb-8">
          <ArrowLeft className="w-4 h-4" /> Volver a Data Room
        </Link>
        
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00F5FF]/10 border border-[#00F5FF]/20 rounded-full text-xs font-bold text-[#00F5FF] mb-4 uppercase tracking-widest">
            <LineChart className="w-3 h-3" /> Dashboard Financiero Live
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Proyecciones y Modelado</h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Métricas clave, presupuesto operativo y proyecciones de volumen de transacciones (GMV) para los primeros 24 meses del ecosistema.
          </p>
        </div>

        {/* KPIs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Presupuesto Operativo Y1", value: "$500,000", sub: "Financiado (Ronda Seed)", icon: <DollarSign className="w-5 h-5 text-green-400"/>, color: "border-green-500/20 bg-green-500/5" },
            { label: "Take-Rate (B2B Escrow)", value: "8.0%", sub: "Fee máximo por contrato", icon: <Activity className="w-5 h-5 text-[#fca311]"/>, color: "border-[#fca311]/20 bg-[#fca311]/5" },
            { label: "Usuarios Activos (MoM)", value: "+32%", sub: "Proyección crecimiento base", icon: <Users className="w-5 h-5 text-[#00F5FF]"/>, color: "border-[#00F5FF]/20 bg-[#00F5FF]/5" },
            { label: "Proyección GMV (Y1)", value: "$1.2M", sub: "Volumen bruto transaccionado", icon: <TrendingUp className="w-5 h-5 text-[#9B5DE5]"/>, color: "border-[#9B5DE5]/20 bg-[#9B5DE5]/5" }
          ].map((kpi, i) => (
            <div key={i} className={`p-6 rounded-3xl border ${kpi.color}`}>
              <div className="flex justify-between items-start mb-4">
                {kpi.icon}
              </div>
              <p className="text-3xl font-black font-mono mb-1">{kpi.value}</p>
              <h3 className="text-sm font-bold text-gray-300">{kpi.label}</h3>
              <p className="text-xs text-gray-500 mt-2">{kpi.sub}</p>
            </div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl font-bold">Proyección de Ingresos Netos (Trimestral)</h2>
              <p className="text-sm text-gray-400">Basado en adopción B2B Escrow + Subscripciones SaaS</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider">
              <span className="flex items-center gap-2 text-gray-400"><div className="w-3 h-3 rounded-sm bg-[#9B5DE5]"/> B2C Pases</span>
              <span className="flex items-center gap-2 text-gray-400"><div className="w-3 h-3 rounded-sm bg-[#00F5FF]"/> B2B SaaS</span>
              <span className="flex items-center gap-2 text-gray-400"><div className="w-3 h-3 rounded-sm bg-[#fca311]"/> Escrow Fees</span>
            </div>
          </div>

          {/* CSS Simulated Chart */}
          <div className="h-64 flex items-end justify-between gap-2 md:gap-6 pt-10 border-b border-white/10 relative">
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[10px] text-gray-600 font-mono pointer-events-none pb-2 w-full">
              <div className="border-t border-white/5 w-full"><span>$400k</span></div>
              <div className="border-t border-white/5 w-full"><span>$300k</span></div>
              <div className="border-t border-white/5 w-full"><span>$200k</span></div>
              <div className="border-t border-white/5 w-full"><span>$100k</span></div>
              <div className="w-full"></div>
            </div>
            
            {/* Bars */}
            {[
              { q: "Q1 Y1", b2c: 30, b2b: 10, esc: 5 },
              { q: "Q2 Y1", b2c: 45, b2b: 25, esc: 15 },
              { q: "Q3 Y1", b2c: 55, b2b: 40, esc: 45 },
              { q: "Q4 Y1", b2c: 65, b2b: 60, esc: 80 },
              { q: "Q1 Y2", b2c: 80, b2b: 90, esc: 130 },
              { q: "Q2 Y2", b2c: 90, b2b: 120, esc: 190 },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end items-center group relative z-10">
                <div className="w-full max-w-[48px] flex flex-col-reverse group-hover:scale-y-[1.02] transition-transform origin-bottom">
                  <div className="w-full bg-[#9B5DE5] rounded-b-md border border-black/20" style={{ height: `${bar.b2c}px` }}></div>
                  <div className="w-full bg-[#00F5FF] border border-black/20" style={{ height: `${bar.b2b}px` }}></div>
                  <div className="w-full bg-[#fca311] rounded-t-md border border-black/20" style={{ height: `${bar.esc}px` }}></div>
                </div>
                <span className="text-xs font-bold text-gray-500 mt-4 font-mono">{bar.q}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Modelo Deflacionario */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-[#9B5DE5]/5 border border-[#9B5DE5]/20">
            <h3 className="text-xl font-bold mb-4 text-[#9B5DE5]">Mecanismo Deflacionario (Buy & Burn)</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              El 20% de los ingresos fiat generados por las comisiones de Escrow B2B y suscripciones premium se destinarán trimestralmente a recomprar tokens `$TAL` en el mercado abierto para ser quemados de forma provable.
            </p>
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-center">
              <span className="block text-xs text-gray-500 uppercase tracking-widest mb-1">Target de Quema Y1-Y3</span>
              <span className="text-2xl font-black font-mono text-[#9B5DE5]">15% del Supply</span>
            </div>
          </div>
          <div className="p-8 rounded-3xl bg-[#00F5FF]/5 border border-[#00F5FF]/20">
            <h3 className="text-xl font-bold mb-4 text-[#00F5FF]">Staking & Tesorería B2B</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Las empresas que contraten talento deberán realizar un staking de tokens `$TAL` proporcional al tamaño del contrato. Este mecanismo bloquea liquidez continuamente mientras genera confianza criptográfica entre las partes.
            </p>
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-center">
              <span className="block text-xs text-gray-500 uppercase tracking-widest mb-1">Ratio de Colateral</span>
              <span className="text-2xl font-black font-mono text-[#00F5FF]">5% por Contrato</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
