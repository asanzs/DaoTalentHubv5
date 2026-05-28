"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, CheckCircle2, PlayCircle, ShieldCheck, ChevronRight, Lock, Code2 } from "lucide-react";
import Link from "next/link";
import { useWalletModal } from "@/context/Web3Provider";

export default function CoursePage({ params }: { params: { id: string } }) {
  const { open } = useWalletModal();
  const [activeLesson, setActiveLesson] = useState(1);
  const [codeSubmitted, setCodeSubmitted] = useState(false);
  const [validating, setValidating] = useState(false);

  const handleValidation = () => {
    setValidating(true);
    setTimeout(() => {
      setValidating(false);
      setCodeSubmitted(true);
    }, 3000);
  };

  const isM1 = params.id === "m1" || params.id === "rust-advanced";

  return (
    <main className="min-h-screen bg-[#0B0C10] pt-24 pb-20 text-white font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Main Content Area */}
          <div className="flex-1">
            <div className="mb-6">
              <Link href="/academy" className="text-[#00F5FF] text-sm font-bold flex items-center gap-1 hover:underline">
                <ChevronRight className="w-4 h-4 rotate-180" /> Volver a la Academia
              </Link>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-black mb-4">
              {isM1 ? "Desarrollo de Smart Contracts Avanzados" : "Módulo de Verificación"}
            </h1>
            <p className="text-white/60 mb-8 leading-relaxed">
              Completa este módulo para obtener tu credencial SBT inmutable. Las empresas buscan activamente talento con esta certificación y los Match Scores aumentan en un 40%.
            </p>

            <div className="aspect-video w-full bg-black rounded-2xl border border-white/10 mb-8 relative flex items-center justify-center overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[#00F5FF]/5" />
              <PlayCircle className="w-16 h-16 text-white/30 hover:text-[#00F5FF] transition-colors cursor-pointer relative z-10" />
            </div>

            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Code2 className="text-[#9B5DE5]" /> Reto Final: Verificación por IA
              </h2>
              <p className="text-white/50 mb-6">
                Escribe un contrato inteligente seguro en Rust/Solidity que maneje depósitos Escrow y pase todas las aserciones de nuestro Auditor de IA.
              </p>
              
              <div className="p-4 rounded-xl bg-black font-mono text-sm border border-white/10 mb-6 min-h-[150px] relative">
                <textarea 
                  className="w-full h-full bg-transparent text-white/80 focus:outline-none resize-none"
                  placeholder="// Escribe o pega tu código aquí para ser auditado por la IA..."
                />
              </div>

              {codeSubmitted ? (
                <div className="p-6 rounded-xl bg-green-500/10 border border-green-500/30 flex items-start gap-4">
                  <ShieldCheck className="w-8 h-8 text-green-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-bold text-green-400 mb-1">¡Auditoría Exitosa! 100/100</h3>
                    <p className="text-white/60 text-sm mb-4">
                      Tu código es matemáticamente seguro. Hemos minteado tu credencial (SBT) en Base Network. Las empresas ahora pueden verte como Talento Verificado.
                    </p>
                    <Link href="/dashboard" className="px-6 py-2 rounded-lg bg-green-500/20 text-green-400 font-bold text-sm hover:bg-green-500/30 transition-colors">
                      Ir al Dashboard B2C
                    </Link>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={handleValidation}
                  disabled={validating}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-[#00F5FF] to-[#00D4FF] text-black font-bold hover:shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-all disabled:opacity-50"
                >
                  {validating ? "La IA está auditando tu código..." : "Enviar Código a la IA"}
                </button>
              )}
            </div>
          </div>

          {/* Sidebar Modules */}
          <div className="w-full md:w-80 flex-shrink-0">
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 sticky top-28">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5" /> Contenido del Curso
              </h3>

              <div className="space-y-4">
                {[
                  { id: 1, title: "Introducción a Escrow", locked: false },
                  { id: 2, title: "Seguridad y Reentrancy", locked: false },
                  { id: 3, title: "Optimización de Gas", locked: false },
                  { id: 4, title: "Reto Práctico: Verificación IA", locked: false },
                  { id: 5, title: "Módulo Premium (Opcional)", locked: true },
                ].map((lesson) => (
                  <div 
                    key={lesson.id} 
                    onClick={() => !lesson.locked && setActiveLesson(lesson.id)}
                    className={`flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${
                      activeLesson === lesson.id 
                        ? "bg-[#00F5FF]/10 border border-[#00F5FF]/30" 
                        : lesson.locked 
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        activeLesson === lesson.id ? "bg-[#00F5FF] text-black" : "bg-white/10"
                      }`}>
                        {lesson.id}
                      </div>
                      <span className={`text-sm font-medium ${activeLesson === lesson.id ? "text-[#00F5FF]" : ""}`}>
                        {lesson.title}
                      </span>
                    </div>
                    {lesson.locked ? (
                      <Lock className="w-4 h-4 text-white/30" />
                    ) : (
                      activeLesson === lesson.id && <CheckCircle2 className="w-4 h-4 text-[#00F5FF]" />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-xs text-white/50 text-center mb-4">
                  Desbloquea todos los módulos con el Pase Fundador.
                </p>
                <Link href="/early-pass" className="w-full h-10 rounded-lg border border-[#9B5DE5] text-[#9B5DE5] flex items-center justify-center text-sm font-bold hover:bg-[#9B5DE5]/10 transition-colors">
                  Ver Suscripción Fundador
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
