import React from "react";
import {
  Building2,
  User,
  ChevronLeft,
  BookOpen,
  DollarSign,
  Users,
  Star,
  Pencil,
  Globe,
  CreditCard,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";

export default function TeachPage() {
  const locale = useLocale();
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 bg-[#020408]">
      <div className="max-w-5xl mx-auto">

        {/* Back */}
        <Link
          href={`/${locale}/university`}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-10 text-sm font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          Volver al Hub
        </Link>

        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-20 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#fca311]/8 blur-[120px] pointer-events-none rounded-full" />

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#fca311]/10 border border-[#fca311]/30 text-[#fca311] text-sm font-bold mb-6 relative z-10">
            <BookOpen className="w-4 h-4" />
            Teach-to-Earn
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 relative z-10 leading-tight">
            Enseña y Gana{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fca311] to-[#00F5FF]">
              $TAL
            </span>
          </h1>

          <p className="text-xl text-gray-400 relative z-10 leading-relaxed">
            Comparte tu conocimiento y recibe{" "}
            <span className="text-white font-semibold">70% de ingresos en USD</span> + un{" "}
            <span className="text-[#fca311] font-semibold">15% de bonus en $TAL</span> por cada
            estudiante que complete tu curso.
          </p>
        </div>

        {/* Access Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">

          {/* Institución / Empresa */}
          <div className="group p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent hover:border-[#00F5FF]/40 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Building2 className="w-40 h-40 text-white" />
            </div>

            <div className="relative z-10">
              <div className="p-3 rounded-xl bg-[#00F5FF]/10 border border-[#00F5FF]/20 w-fit mb-5">
                <Building2 className="w-7 h-7 text-[#00F5FF]" />
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00F5FF]/10 border border-[#00F5FF]/20 text-[#00F5FF] text-xs font-bold mb-4">
                KYB Requerido
              </div>

              <h2 className="text-2xl font-black text-white mb-3">
                Soy Institución / Empresa
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Publica cursos bajo tu marca institucional. Proceso de verificación KYB (Know Your Business)
                para garantizar calidad y confianza en la plataforma.
              </p>

              <Link
                href={`/${locale}/university/teach/studio`}
                className="inline-flex items-center justify-center w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#00F5FF]/20 to-[#00F5FF]/10 hover:from-[#00F5FF]/30 hover:to-[#00F5FF]/20 border border-[#00F5FF]/30 hover:border-[#00F5FF]/60 text-[#00F5FF] font-bold transition-all duration-200"
              >
                Acceder al Studio →
              </Link>
            </div>
          </div>

          {/* Instructor Individual */}
          <div className="group p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent hover:border-[#9B5DE5]/40 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <User className="w-40 h-40 text-white" />
            </div>

            <div className="relative z-10">
              <div className="p-3 rounded-xl bg-[#9B5DE5]/10 border border-[#9B5DE5]/20 w-fit mb-5">
                <User className="w-7 h-7 text-[#9B5DE5]" />
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#9B5DE5]/10 border border-[#9B5DE5]/20 text-[#9B5DE5] text-xs font-bold mb-4">
                🏅 SBT Senior Requerido
              </div>

              <h2 className="text-2xl font-black text-white mb-3">
                Soy Instructor Individual
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Comparte tu expertise como instructor independiente. Necesitas un Soul-Bound Token de
                nivel Senior para demostrar tu trayectoria en la DAO.
              </p>

              <Link
                href={`/${locale}/university/teach/apply`}
                className="inline-flex items-center justify-center w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#9B5DE5]/20 to-[#9B5DE5]/10 hover:from-[#9B5DE5]/30 hover:to-[#9B5DE5]/20 border border-[#9B5DE5]/30 hover:border-[#9B5DE5]/60 text-[#9B5DE5] font-bold transition-all duration-200"
              >
                Aplicar como Instructor →
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Pasos */}
        <div className="mb-20">
          <h2 className="text-3xl font-black text-white text-center mb-12">
            Así de simple funciona
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                step: 1,
                icon: Pencil,
                title: "Crea",
                desc: "Diseña tu curso con nuestro Studio: módulos, lecciones, desafíos y proyectos.",
                color: "#00F5FF",
              },
              {
                step: 2,
                icon: DollarSign,
                title: "Publica precio",
                desc: "Establece tu precio en USD o $TAL. Tú decides el valor de tu conocimiento.",
                color: "#fca311",
              },
              {
                step: 3,
                icon: Users,
                title: "Estudiantes compran",
                desc: "Los alumnos se inscriben, aprenden y completan los desafíos de tu curso.",
                color: "#9B5DE5",
              },
              {
                step: 4,
                icon: CreditCard,
                title: "Cobra",
                desc: "Recibes el 70% en USD + 15% bonus en $TAL de forma automática on-chain.",
                color: "#00ff88",
              },
            ].map(({ step, icon: Icon, title, desc, color }) => (
              <div
                key={step}
                className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-200 text-center group"
              >
                <div
                  className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-4 border"
                  style={{
                    background: `${color}15`,
                    borderColor: `${color}30`,
                  }}
                >
                  <Icon className="w-6 h-6" style={{ color }} />
                </div>
                <div
                  className="text-xs font-black mb-2 tracking-widest"
                  style={{ color }}
                >
                  PASO {step}
                </div>
                <h3 className="text-white font-black text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-16">
          {[
            { icon: Users, value: "1,240", label: "Instructores activos", color: "#00F5FF" },
            { icon: Globe, value: "$2.4M", label: "Pagados a instructores", color: "#fca311" },
            { icon: Star, value: "4.8/5", label: "Valoración promedio", color: "#9B5DE5" },
          ].map(({ icon: Icon, value, label, color }) => (
            <div
              key={label}
              className="p-6 rounded-2xl border border-white/10 bg-white/[0.03] text-center"
            >
              <div
                className="w-10 h-10 mx-auto rounded-xl flex items-center justify-center mb-4 border"
                style={{ background: `${color}15`, borderColor: `${color}30` }}
              >
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
              <div className="text-3xl font-black text-white mb-1">{value}</div>
              <div className="text-gray-500 text-sm">{label}</div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
          {[
            "✅ Pagos automáticos on-chain",
            "🔒 Smart contracts auditados",
            "📊 Dashboard de analíticas",
            "🎓 Certificados NFT para estudiantes",
          ].map((badge) => (
            <span
              key={badge}
              className="px-4 py-2 rounded-full bg-white/5 border border-white/10"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
