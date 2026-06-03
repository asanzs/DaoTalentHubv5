"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
  PieChart, LineChart, Target, FileText, ArrowRight, Table, FileSpreadsheet, Lock, ExternalLink
} from "lucide-react";

export default function DataRoomPage() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'es';

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
            <span className="text-sm font-bold tracking-wider uppercase">Volver al Inicio</span>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row items-start justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#9B5DE5]/30 bg-[#9B5DE5]/10 text-[#a855f7] text-xs font-bold tracking-wider uppercase mb-4">
              <Lock className="w-3 h-3" /> Acceso Restringido · Inversores Institucionales
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Mythos Data Room Privada
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              Expediente maestro interactivo del ecosistema DAO Talent Hub. Documentos de negocio oficiales, proyecciones auditadas, cap table y tokenomics integrados de forma nativa en la plataforma.
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
              <h3 className="text-2xl font-black text-white mb-4">Cap Table Simplificada</h3>
              <p className="text-gray-400 text-xs leading-relaxed mb-6">
                Estructura de distribución de capital interactiva. Explora los SAFEs, Warrants y vesting de tokens de forma visual.
              </p>
              
              <div className="space-y-3.5 border-t border-white/5 pt-4">
                {[
                  { name: "Early Backers & F&F", pct: "15%", tokens: "30,000,000 $TAL", detail: "Vesting 12m/36m" },
                  { name: "Equipo Core & Asesores", pct: "20%", tokens: "40,000,000 $TAL", detail: "12m Cliff, 36m lineal" },
                  { name: "Ecosistema / Incentivos DAO", pct: "65%", tokens: "130,000,000 $TAL", detail: "Liberación por hitos" },
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
              <h3 className="text-2xl font-black text-white mb-4">Master Business Plan</h3>
              <p className="text-gray-400 text-xs leading-relaxed mb-6">
                Documento fundacional detallado. Incluye análisis de mercado, modelo de negocio B2B/B2C y arquitectura de red.
              </p>
              
              <div className="space-y-4 relative border-l border-white/10 pl-4 ml-2">
                {[
                  { quarter: "Q3 2026", title: "Lanzamiento Smart Match V2", desc: "Integración de LLM + validación de SBTs en Base Sepolia." },
                  { quarter: "Q3 2026", title: "Auditoría de Custodia Escrow", desc: "Certificación matemática de smart contracts Core." },
                  { quarter: "Q4 2026", title: "TGE Público & Formación DAO", desc: "Lanzamiento del token $TAL y descentralización del tribunal." },
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
              <h3 className="text-2xl font-black text-white mb-4">Cerebro Financiero</h3>
              <p className="text-gray-400 text-xs leading-relaxed mb-6">
                Dashboard financiero en vivo con métricas clave, proyecciones de ingresos y modelo deflacionario del ecosistema.
              </p>
              
              <div className="space-y-3.5 border-t border-white/5 pt-4">
                {[
                  { label: "Suministro Total", value: "200,000,000 $TAL", color: "text-white" },
                  { label: "Precio Semilla (Seed)", value: "$0.040 USD / TAL", color: "text-[#fca311]" },
                  { label: "Presupuesto Operativo Y1", value: "$500,000 USD", color: "text-white" },
                  { label: "Take-rate de Contrato B2C", value: "8.0% máximo", color: "text-[#00F5FF]" },
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
            <Table className="w-6 h-6 text-[#9B5DE5]" /> Índice de Documentos On-Chain
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-gray-500 font-bold uppercase tracking-wider">
                  <th className="pb-4 w-1/2">Sección de la Plataforma</th>
                  <th className="pb-4">Origen Histórico (Legacy)</th>
                  <th className="pb-4">Estado</th>
                  <th className="pb-4 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-300">
                {[
                  { name: "Master Business Plan Completo", folder: "INVERSORES-INSTITUCIONAL", status: "Integrado Nativo", link: `/${locale}/data-room/business-plan`, type: "Text" },
                  { name: "Executive Whitepaper Comercial", folder: "PUBLICO-COMERCIAL", status: "Integrado Nativo", link: `/${locale}/whitepaper`, type: "Text" },
                  { name: "Dashboard Financiero Interactivo", folder: "PROYECCIÓN EXCEL", status: "Dashboard en Vivo", link: `/${locale}/data-room/financials`, type: "Data" },
                  { name: "Estructura Cap Table & Tokenomics", folder: "PROYECCIÓN EXCEL (Auditoría)", status: "Dashboard en Vivo", link: `/${locale}/data-room/cap-table`, type: "Data" },
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
                        Abrir <ArrowRight className="w-3 h-3" />
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
