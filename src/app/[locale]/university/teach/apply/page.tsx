"use client";

import React, { useState } from "react";
import { ChevronLeft, CheckCircle2, Loader2, Send } from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";

const inputClass =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00F5FF]/50 placeholder-gray-600 transition-colors";

const labelClass = "block text-sm font-semibold text-gray-300 mb-2";

export default function TeachApplyPage() {
  const locale = useLocale();
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    especializacion: "",
    experiencia: "",
    github: "",
    tituloCurso: "",
    descripcionCurso: "",
    motivacion: "",
  });

  const [enviando, setEnviando] = useState(false);
  const [exito, setExito] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    // Simulated async submit
    await new Promise((r) => setTimeout(r, 2000));
    setEnviando(false);
    setExito(true);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 bg-[#020408]">
      <div className="max-w-2xl mx-auto">

        {/* Back */}
        <Link
          href={`/${locale}/university/teach`}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-10 text-sm font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          Volver
        </Link>

        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-bold mb-5">
            <CheckCircle2 className="w-4 h-4" />
            SBT Nivel Senior — Detectado
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            Solicitar Acceso como{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9B5DE5] to-[#00F5FF]">
              Instructor
            </span>
          </h1>
          <p className="text-gray-400 leading-relaxed">
            Completa el formulario con tu perfil y propuesta de curso. Revisaremos tu solicitud
            en 48–72 horas hábiles.
          </p>
        </div>

        {exito ? (
          <div className="p-8 rounded-3xl border border-green-500/30 bg-green-500/10 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h2 className="text-2xl font-black text-white mb-3">{tApp('requestSent')}</h2>
            <p className="text-green-300 leading-relaxed">
              Revisaremos tu perfil en 48–72h. Recibirás un email de confirmación con los
              próximos pasos para convertirte en instructor oficial de DAO Talent Hub.
            </p>
            <Link
              href={`/${locale}/university/teach`}
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl bg-green-500/20 border border-green-500/40 text-green-300 font-bold hover:bg-green-500/30 transition-colors"
            >
              Volver al Portal del Profesor
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-6 p-8 rounded-3xl border border-white/10 bg-white/[0.03]"
          >
            {/* Datos personales */}
            <div>
              <h3 className="text-lg font-black text-white mb-5 pb-3 border-b border-white/10">
                📋 Datos Personales
              </h3>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass} htmlFor="nombre">
                    Nombre completo *
                  </label>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    required
                    placeholder="Tu nombre completo"
                    className={inputClass}
                    value={form.nombre}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor="email">
                    Email de contacto *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="tu@email.com"
                    className={inputClass}
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Especialización */}
            <div>
              <label className={labelClass} htmlFor="especializacion">
                Área de especialización *
              </label>
              <select
                id="especializacion"
                name="especializacion"
                required
                className={inputClass}
                value={form.especializacion}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Selecciona tu área
                </option>
                <option value="web3">Web3 &amp; Blockchain</option>
                <option value="ia">Inteligencia Artificial</option>
                <option value="defi">DeFi &amp; Finanzas Descentralizadas</option>
                <option value="cuantica">{tApp('quantumComputing')}</option>
                <option value="devops">DevOps &amp; Cloud</option>
              </select>
            </div>

            {/* Experiencia */}
            <div>
              <label className={labelClass} htmlFor="experiencia">
                Experiencia profesional *
              </label>
              <textarea
                id="experiencia"
                name="experiencia"
                required
                rows={4}
                placeholder="Describe tu trayectoria, proyectos relevantes, logros principales..."
                className={inputClass}
                value={form.experiencia}
                onChange={handleChange}
              />
            </div>

            {/* GitHub */}
            <div>
              <label className={labelClass} htmlFor="github">
                GitHub / Portfolio URL
              </label>
              <input
                id="github"
                name="github"
                type="url"
                placeholder="https://github.com/tuusuario"
                className={inputClass}
                value={form.github}
                onChange={handleChange}
              />
            </div>

            {/* Propuesta de curso */}
            <div>
              <h3 className="text-lg font-black text-white mb-5 pb-3 border-b border-white/10">
                🎓 Propuesta de Curso
              </h3>

              <div className="space-y-5">
                <div>
                  <label className={labelClass} htmlFor="tituloCurso">
                    Título del curso propuesto *
                  </label>
                  <input
                    id="tituloCurso"
                    name="tituloCurso"
                    type="text"
                    required
                    placeholder="Ej: DeFi Avanzado: Yield Farming Strategies"
                    className={inputClass}
                    value={form.tituloCurso}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="descripcionCurso">
                    Descripción del curso *
                  </label>
                  <textarea
                    id="descripcionCurso"
                    name="descripcionCurso"
                    required
                    rows={4}
                    placeholder="¿Qué aprenderán los estudiantes? Temario, nivel, prerrequisitos..."
                    className={inputClass}
                    value={form.descripcionCurso}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="motivacion">
                    ¿Por qué quieres enseñar en DAO Talent Hub?
                  </label>
                  <textarea
                    id="motivacion"
                    name="motivacion"
                    rows={3}
                    placeholder="Cuéntanos tu motivación y cómo contribuirás al ecosistema..."
                    className={inputClass}
                    value={form.motivacion}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={enviando}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#9B5DE5] to-[#00F5FF] text-white font-black text-lg hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {enviando ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Enviando solicitud...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Enviar Solicitud
                </>
              )}
            </button>

            <p className="text-center text-xs text-gray-600">
              Al enviar, aceptas los{" "}
              <Link href={`/${locale}/terms`} className="text-gray-400 hover:text-white underline">
                Términos de Instructores
              </Link>{" "}
              de DAO Talent Hub.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
