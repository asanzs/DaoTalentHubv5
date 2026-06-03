"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Target, Cpu, Users, ShieldCheck, Zap } from "lucide-react";
import { usePathname } from "next/navigation";

export default function BusinessPlanPage() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'es';
  const [activeSection, setActiveSection] = useState("resumen");

  const sections = [
    { id: "resumen", label: "1. Resumen Ejecutivo" },
    { id: "problema", label: "2. Problema y Solución" },
    { id: "mercado", label: "3. Mercado B2B/B2C" },
    { id: "tecnologia", label: "4. Arquitectura y Match Engine" },
    { id: "roadmap", label: "5. Roadmap" },
  ];

  return (
    <div className="min-h-screen bg-[#020408] pt-32 pb-24 text-gray-300 selection:bg-[#9B5DE5] selection:text-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12">
        
        {/* Sidebar Nav */}
        <div className="lg:w-64 shrink-0">
          <div className="sticky top-32 space-y-8">
            <Link href={`/${locale}/data-room`} className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-wider mb-8">
              <ArrowLeft className="w-4 h-4" /> Volver a Data Room
            </Link>
            
            <div className="space-y-1">
              <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">Índice del Documento</h4>
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
              Master Business Plan V5.2
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">DAO Talent Hub</h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              El protocolo descentralizado que unifica la educación web3 y la selección de talento B2B mediante Inteligencia Artificial y validación criptográfica On-Chain.
            </p>
          </div>

          <div className="space-y-24 prose prose-invert prose-p:text-gray-400 prose-p:leading-relaxed prose-headings:text-white prose-a:text-[#00F5FF] prose-strong:text-white max-w-none">
            
            <section id="resumen" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#00F5FF]/10 flex items-center justify-center border border-[#00F5FF]/20"><Target className="w-5 h-5 text-[#00F5FF]"/></div>
                <h2 className="text-3xl font-bold m-0">1. Resumen Ejecutivo</h2>
              </div>
              <p>
                DAO Talent Hub no es solo una plataforma de reclutamiento; es un <strong>ecosistema económico completo</strong>. Hemos diseñado un puente trustless (sin confianza requerida) entre el talento global emergente y las necesidades urgentes de las startups tecnológicas en los sectores Web3 e Inteligencia Artificial.
              </p>
              <p>
                A través del token <strong>$TAL</strong>, alineamos los incentivos de tres actores principales: los estudiantes (Learn-to-Earn), los instructores (Teach-to-Earn) y las empresas (Hire-to-Earn mediante staking). Esto permite escalar la captación de usuarios a un coste marginal nulo, mientras generamos ingresos B2B mediante contratos de Escrow automatizados.
              </p>
            </section>

            <section id="problema" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#9B5DE5]/10 flex items-center justify-center border border-[#9B5DE5]/20"><Cpu className="w-5 h-5 text-[#9B5DE5]"/></div>
                <h2 className="text-3xl font-bold m-0">2. El Problema y la Solución AI</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8 my-8">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="text-xl font-bold text-[#fca311] mb-3 mt-0">El Problema</h3>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>• Falsificación de currículums en el sector tech.</li>
                    <li>• Procesos de selección de semanas de duración.</li>
                    <li>• Alta rotación y falta de culture-fit.</li>
                  </ul>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="text-xl font-bold text-[#00F5FF] mb-3 mt-0">La Solución</h3>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>• Credenciales SBT (Soulbound Tokens) imposibles de falsificar.</li>
                    <li>• Smart Match AI Engine: Matching instantáneo basado en datos.</li>
                    <li>• Auditorías de código como prueba de trabajo (PoW).</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="mercado" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#fca311]/10 flex items-center justify-center border border-[#fca311]/20"><Users className="w-5 h-5 text-[#fca311]"/></div>
                <h2 className="text-3xl font-bold m-0">3. Análisis de Mercado</h2>
              </div>
              <p>
                El mercado global de reclutamiento de IT está proyectado a alcanzar los $142 billones para 2028. Sin embargo, nuestra cuña de entrada (wedge) es el nicho de Web3 y desarrollo de IA, un subsegmento con crecimiento compuesto (CAGR) del 32% anual.
              </p>
              <div className="p-6 border border-white/10 bg-black/40 rounded-2xl my-6">
                <h4 className="text-white font-bold mb-4 mt-0">Modelo Híbrido de Ingresos</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-gray-400">B2C (Educación)</span>
                    <span className="font-bold text-[#9B5DE5]">Pases $12 USD + Pagos en TAL</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-gray-400">B2B (Reclutamiento)</span>
                    <span className="font-bold text-[#00F5FF]">Take-rate de 8% en contratos Escrow</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">B2B Premium (SaaS)</span>
                    <span className="font-bold text-[#fca311]">$2,000 USD / mes (Headhunting AI)</span>
                  </div>
                </div>
              </div>
            </section>

            <section id="tecnologia" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center border border-green-500/20"><ShieldCheck className="w-5 h-5 text-green-400"/></div>
                <h2 className="text-3xl font-bold m-0">4. Arquitectura y Seguridad</h2>
              </div>
              <p>
                La plataforma está construida sobre <strong>Base (L2 de Coinbase)</strong> para garantizar transacciones casi gratuitas y una integración perfecta con el ecosistema EVM. Los contratos inteligentes críticos (Escrow, Emisión de SBTs y Staking de Tesorería) están siendo auditados matemáticamente.
              </p>
              <p>
                El Motor de Emparejamiento (Smart Match AI) utiliza RAG (Retrieval-Augmented Generation) sobre los repositorios de GitHub del talento y sus historiales de SBTs para encontrar el ajuste perfecto con el Job Description de la empresa.
              </p>
            </section>

            <section id="roadmap" className="scroll-mt-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20"><Zap className="w-5 h-5 text-blue-400"/></div>
                <h2 className="text-3xl font-bold m-0">5. Roadmap Tecnológico</h2>
              </div>
              <div className="pl-6 border-l-2 border-white/10 space-y-8 mt-8">
                <div className="relative">
                  <div className="absolute w-4 h-4 rounded-full bg-blue-500 -left-[33px] top-1 ring-4 ring-[#020408]"></div>
                  <h4 className="text-white font-bold mb-1 mt-0">Q3 2026: Beta Privada B2B</h4>
                  <p className="text-sm text-gray-400 m-0">Onboarding de 50 startups Web3. Despliegue del Smart Match V2 y primeras validaciones de contratos Escrow en Base Sepolia.</p>
                </div>
                <div className="relative">
                  <div className="absolute w-4 h-4 rounded-full bg-blue-500 -left-[33px] top-1 ring-4 ring-[#020408]"></div>
                  <h4 className="text-white font-bold mb-1 mt-0">Q4 2026: TGE (Token Generation Event)</h4>
                  <p className="text-sm text-gray-400 m-0">Lanzamiento público del token $TAL. Transición de la tesorería al control de la DAO mediante Snapshot.</p>
                </div>
                <div className="relative">
                  <div className="absolute w-4 h-4 rounded-full bg-gray-600 -left-[33px] top-1 ring-4 ring-[#020408]"></div>
                  <h4 className="text-gray-400 font-bold mb-1 mt-0">Q1 2027: Expansión Cuántica e IA</h4>
                  <p className="text-sm text-gray-500 m-0">Apertura del hub universitario a cursos de computación cuántica. Sistema de reputación extendido a oráculos descentralizados.</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
