"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Code2, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

const COURSES = [
  {
    title: "Auditoría de Smart Contracts",
    description: "Domina la seguridad Web3. Supera el test de la IA y consigue acceso a misiones B2B de alto pago.",
    tags: ["Solidity", "Security", "Advanced"],
    status: "Disponible",
    color: "from-[#00F5FF] to-[#00D4FF]"
  },
  {
    title: "Fullstack React & Node.js",
    description: "Certifica tus habilidades en el stack más demandado. Construye y aprueba el proyecto final.",
    tags: ["React", "Node.js", "Frontend"],
    status: "Disponible",
    color: "from-[#9B5DE5] to-[#F15BB5]"
  },
  {
    title: "Rust para Sistemas Críticos",
    description: "Alta demanda corporativa. Obtén tu credencial y desbloquea el nivel 'Revisor Élite'.",
    tags: ["Rust", "Systems", "Backend"],
    status: "Próximamente",
    color: "from-white/20 to-white/10"
  }
];

export default function Academy() {
  return (
    <main className="min-h-screen bg-[#0B0C10] font-sans selection:bg-[#00F5FF]/30 pt-32 pb-24">
      {/* Background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#9B5DE5]/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex items-center gap-4 mb-12">
          <Link href="/" className="text-white/50 hover:text-white transition-colors">
            ← Volver
          </Link>
          <div className="h-6 w-px bg-white/10" />
          <span className="text-[#00F5FF] font-medium flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> Academia
          </span>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mb-16"
        >
          <h1 className="text-5xl font-black text-white mb-6 tracking-tight">
            Aprende. Certifícate.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] to-[#9B5DE5]">
              Consigue Empleo.
            </span>
          </h1>
          <p className="text-xl text-white/60 leading-relaxed font-light">
            No más currículums aburridos. Aprueba nuestros retos técnicos evaluados por Inteligencia Artificial, obtén tu credencial inmutable y deja que las empresas Top te envíen ofertas directas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {COURSES.map((course, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-white/5 hover:from-[#00F5FF]/50 hover:to-transparent transition-all cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-tr opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl blur-xl z-0" style={{ backgroundImage: `linear-gradient(to top right, var(--tw-gradient-stops))` }} />
              
              <div className="bg-[#0B0C10]/90 backdrop-blur-xl p-8 rounded-2xl h-full relative z-10 flex flex-col">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${course.color} flex items-center justify-center mb-6 opacity-80`}>
                  <Code2 className="w-6 h-6 text-black" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3">{course.title}</h3>
                <p className="text-white/60 text-sm mb-6 flex-grow leading-relaxed">{course.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {course.tags.map((tag, j) => (
                    <span key={j} className="px-2.5 py-1 rounded bg-white/5 text-white/70 text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                  <span className={`text-sm font-semibold ${course.status === 'Disponible' ? 'text-[#00F5FF]' : 'text-white/30'}`}>
                    {course.status}
                  </span>
                  <ArrowRight className={`w-5 h-5 ${course.status === 'Disponible' ? 'text-white group-hover:translate-x-1 transition-transform' : 'text-white/20'}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="mt-20 p-8 rounded-2xl bg-gradient-to-r from-[#9B5DE5]/20 to-[#00F5FF]/10 border border-white/10 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 max-w-2xl">
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <ShieldCheck className="text-[#00F5FF]" /> Tu progreso está asegurado
            </h3>
            <p className="text-white/60">Al aprobar un curso, recibes una credencial técnica incopiable. Las empresas de nuestra red utilizan estos certificados para filtrar candidatos instantáneamente.</p>
          </div>
          <button className="h-12 px-8 rounded-full bg-white text-black font-bold hover:scale-105 transition-transform flex-shrink-0">
            Crear mi Perfil
          </button>
        </div>
      </div>
    </main>
  );
}
