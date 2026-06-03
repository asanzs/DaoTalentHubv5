import React from "react";
import { Brain, ArrowRight, BookOpen, GraduationCap, Star, Users, Zap, Trophy, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";

const STATS = [
  { label: "Cursos disponibles", value: "6", icon: BookOpen, color: "#00F5FF" },
  { label: "Estudiantes activos", value: "1,842", icon: Users, color: "#9B5DE5" },
  { label: "$TAL distribuidos", value: "240K", icon: Zap, color: "#fca311" },
  { label: "Instructores verificados", value: "24", icon: Trophy, color: "#10b981" },
];

const FEATURED_PATHS = [
  {
    id: "web3",
    title: "Ruta Web3 & Contratos Inteligentes",
    desc: "Desde Solidity básico hasta auditorías de seguridad avanzadas.",
    courses: 3,
    totalTal: 1500,
    gradient: "from-[#00F5FF]/20 to-[#9B5DE5]/10",
    border: "border-[#00F5FF]/30",
    color: "#00F5FF",
    badge: "Más demandada",
    firstCourse: "spec-defi-security",
  },
  {
    id: "ai",
    title: "Ruta IA & Agentes Autónomos",
    desc: "LLMs, RAG, Multi-Agent Systems y herramientas productivas de IA.",
    courses: 2,
    totalTal: 950,
    gradient: "from-[#9B5DE5]/20 to-[#C084FC]/10",
    border: "border-[#9B5DE5]/30",
    color: "#9B5DE5",
    badge: "Tendencia 2026",
    firstCourse: "spec-llm-agents",
  },
  {
    id: "quantum",
    title: "Ruta Computación Cuántica",
    desc: "Algoritmos cuánticos, criptografía post-cuántica y Qiskit.",
    courses: 1,
    totalTal: 1200,
    gradient: "from-[#fca311]/20 to-[#F59E0B]/10",
    border: "border-[#fca311]/30",
    color: "#fca311",
    badge: "Élite",
    firstCourse: "spec-quantum",
  },
];

export default function UniversityPage() {
  const locale = useLocale();
  return (
    <div className="min-h-screen pt-28 pb-24 px-6 bg-[#020408]">
      <div className="max-w-7xl mx-auto">

        {/* Back Button */}
        <div className="mb-10">
          <Link href={`/${locale}/`} className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium">
            <ChevronLeft className="w-4 h-4" /> Volver al Inicio
          </Link>
        </div>

        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#9B5DE5]/10 blur-[120px] pointer-events-none rounded-full" />
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#9B5DE5]/30 to-[#00F5FF]/20 flex items-center justify-center rounded-2xl border border-[#9B5DE5]/40 mb-6 relative z-10">
            <Brain className="w-8 h-8 text-[#9B5DE5]" />
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#9B5DE5]/30 bg-[#9B5DE5]/10 text-[#9B5DE5] text-xs font-bold uppercase tracking-widest mb-6 relative z-10">
            <Star className="w-3 h-3 fill-current" /> Learn-to-Earn · Teach-to-Earn
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 relative z-10 leading-tight">
            Hub Universitario <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9B5DE5] to-[#00F5FF]">DAO</span>
          </h1>
          <p className="text-xl text-gray-400 relative z-10">
            Aprende con IA, gana $TAL por cada módulo y certifica tus habilidades con SBTs verificables on-chain.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {STATS.map((stat) => (
            <div key={stat.label} className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] text-center">
              <stat.icon className="w-6 h-6 mx-auto mb-3" style={{ color: stat.color }} />
              <p className="text-2xl font-black text-white mb-1">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Main CTAs */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {/* Students Card */}
          <div className="p-8 rounded-3xl border border-[#00F5FF]/20 bg-gradient-to-br from-[#00F5FF]/5 to-transparent relative overflow-hidden group hover:border-[#00F5FF]/40 transition-all">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#00F5FF]/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-[#00F5FF]/10 border border-[#00F5FF]/20">
                  <GraduationCap className="w-6 h-6 text-[#00F5FF]" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">Soy Estudiante</h2>
                  <span className="text-xs text-[#00F5FF] font-bold">Learn-to-Earn</span>
                </div>
              </div>
              <p className="text-gray-400 mb-8">Accede a cursos especializados en Web3, IA y Computación Cuántica. Gana $TAL por cada módulo y certifícate con SBTs.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href={`/${locale}/university/marketplace`} className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#00F5FF] to-[#9B5DE5] text-black font-black text-sm hover:opacity-90 transition-opacity">
                  <BookOpen className="w-4 h-4" /> Ver Todos los Cursos
                </Link>
                <Link href={`/${locale}/university/dashboard`} className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-all">
                  Mi Dashboard <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Teachers Card */}
          <div className="p-8 rounded-3xl border border-[#fca311]/20 bg-gradient-to-br from-[#fca311]/5 to-transparent relative overflow-hidden group hover:border-[#fca311]/40 transition-all">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#fca311]/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-[#fca311]/10 border border-[#fca311]/20">
                  <BookOpen className="w-6 h-6 text-[#fca311]" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">Soy Instructor</h2>
                  <span className="text-xs text-[#fca311] font-bold">Teach-to-Earn</span>
                </div>
              </div>
              <p className="text-gray-400 mb-8">Monetiza tu conocimiento. Crea cursos, fija tus precios en USD y $TAL, y cobra el 70% de cada venta directamente.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href={`/${locale}/university/teach`} className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-[#fca311] to-[#F59E0B] text-black font-black text-sm hover:opacity-90 transition-opacity">
                  <Zap className="w-4 h-4" /> Empezar a Enseñar
                </Link>
                <Link href={`/${locale}/university/teach/studio`} className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-sm hover:bg-white/10 transition-all">
                  Ir al Studio <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Learning Paths */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-white">Rutas de Aprendizaje Destacadas</h2>
            <Link href={`/${locale}/university/marketplace`} className="text-sm text-[#00F5FF] font-bold hover:underline flex items-center gap-1">
              Ver todas <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {FEATURED_PATHS.map((path) => (
              <div key={path.id} className={`p-6 rounded-2xl border ${path.border} bg-gradient-to-br ${path.gradient} relative overflow-hidden group hover:scale-[1.02] transition-transform`}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ color: path.color, background: `${path.color}20`, border: `1px solid ${path.color}40` }}>
                    {path.badge}
                  </span>
                  <span className="text-xs text-gray-500">{path.courses} cursos</span>
                </div>
                <h3 className="text-lg font-black text-white mb-2">{path.title}</h3>
                <p className="text-sm text-gray-400 mb-4">{path.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold" style={{ color: path.color }}>+{path.totalTal.toLocaleString()} $TAL</span>
                  <Link href={`/university/course/${path.firstCourse}`} className="flex items-center gap-1 text-sm font-bold text-white hover:underline">
                    Iniciar <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Early Pass Banner */}
        <div className="p-8 rounded-3xl border border-[#9B5DE5]/30 bg-gradient-to-r from-[#9B5DE5]/10 via-[#00F5FF]/5 to-transparent flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-[#fca311] fill-current" />
              <span className="text-xs font-bold text-[#fca311] uppercase tracking-widest">Early Adopter Pass</span>
            </div>
            <h3 className="text-2xl font-black text-white mb-2">Accede a todos los cursos — gratis.</h3>
            <p className="text-gray-400">Con el Pase Fundador ($12 USD) tienes acceso ilimitado a todo el catálogo de cursos mientras dure la preventa.</p>
          </div>
          <Link href={`/${locale}/early-pass`} className="shrink-0 flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#9B5DE5] to-[#00F5FF] text-black font-black hover:opacity-90 transition-opacity whitespace-nowrap">
            Obtener Early Pass <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
