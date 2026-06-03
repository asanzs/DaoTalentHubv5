"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  Plus,
  Trash2,
  CheckCircle2,
  ChevronRight,
  Video,
  BookOpen,
  Code2,
  HelpCircle,
  FolderKanban,
  Radio,
} from "lucide-react";
import Link from "next/link";
import { useLocale } from "next-intl";

// ─── Types ───────────────────────────────────────────────────────────────────
type LessonType =
  | "Video"
  | "Lectura"
  | "Coding Challenge"
  | "Quiz"
  | "Proyecto"
  | "Sesión en Vivo";

interface Lesson {
  id: string;
  type: LessonType;
  title: string;
  content: string;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2, 9);

const inputClass =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00F5FF]/50 placeholder-gray-600 transition-colors";

const labelClass = "block text-sm font-semibold text-gray-300 mb-2";

const lessonTypeIcon: Record<LessonType, React.ReactNode> = {
  Video: <Video className="w-3.5 h-3.5" />,
  Lectura: <BookOpen className="w-3.5 h-3.5" />,
  "Coding Challenge": <Code2 className="w-3.5 h-3.5" />,
  Quiz: <HelpCircle className="w-3.5 h-3.5" />,
  Proyecto: <FolderKanban className="w-3.5 h-3.5" />,
  "Sesión en Vivo": <Radio className="w-3.5 h-3.5" />,
};

// ─── STEP LABELS ─────────────────────────────────────────────────────────────
const STEPS = ["Información", "Currículo", "Economía", "Publicar"];

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function TeachStudioPage() {
  const locale = useLocale();
  const [step, setStep] = useState(1);

  // Step 1 – Course info
  const [info, setInfo] = useState({
    titulo: "",
    descripcion: "",
    nivel: "",
    categoria: "",
    precioUSD: "",
    precioTAL: "",
    earlyPassGratis: false,
    trailer: "",
  });

  // Step 2 – Curriculum
  const [modules, setModules] = useState<Module[]>([]);

  // Step 3 – Economics
  const [eco, setEco] = useState({
    porcentajeInstructor: 70,
    aceptaTAL: true,
    bonusTAL: "",
    estudiantesEjemplo: 50,
  });

  // Step 4 – Publish
  const [showModal, setShowModal] = useState(false);
  const [publicado, setPublicado] = useState(false);

  // ── Step 1 handlers ─────────────────────────────────────────────────────
  const handleInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const value =
      target instanceof HTMLInputElement && target.type === "checkbox"
        ? target.checked
        : target.value;
    setInfo((prev) => ({ ...prev, [target.name]: value }));
  };

  // ── Step 2 handlers ─────────────────────────────────────────────────────
  const addModule = () =>
    setModules((prev) => [
      ...prev,
      { id: uid(), title: "", lessons: [] },
    ]);

  const removeModule = (mid: string) =>
    setModules((prev) => prev.filter((m) => m.id !== mid));

  const updateModuleTitle = (mid: string, title: string) =>
    setModules((prev) =>
      prev.map((m) => (m.id === mid ? { ...m, title } : m))
    );

  const addLesson = (mid: string) =>
    setModules((prev) =>
      prev.map((m) =>
        m.id === mid
          ? {
              ...m,
              lessons: [
                ...m.lessons,
                { id: uid(), type: "Video", title: "", content: "" },
              ],
            }
          : m
      )
    );

  const removeLesson = (mid: string, lid: string) =>
    setModules((prev) =>
      prev.map((m) =>
        m.id === mid
          ? { ...m, lessons: m.lessons.filter((l) => l.id !== lid) }
          : m
      )
    );

  const updateLesson = (
    mid: string,
    lid: string,
    field: keyof Lesson,
    value: string
  ) =>
    setModules((prev) =>
      prev.map((m) =>
        m.id === mid
          ? {
              ...m,
              lessons: m.lessons.map((l) =>
                l.id === lid ? { ...l, [field]: value } : l
              ),
            }
          : m
      )
    );

  // ── Step 3 handlers ─────────────────────────────────────────────────────
  const handleEcoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const target = e.target;
    const value =
      target.type === "checkbox"
        ? target.checked
        : target.type === "number"
        ? Number(target.value)
        : target.value;
    setEco((prev) => ({ ...prev, [target.name]: value }));
  };

  const estimadoMensual =
    eco.estudiantesEjemplo *
    (parseFloat(info.precioUSD) || 0) *
    (eco.porcentajeInstructor / 100);

  // ── Publish ─────────────────────────────────────────────────────────────
  const handlePublish = () => {
    setShowModal(false);
    setPublicado(true);
  };

  // ── Progress bar ────────────────────────────────────────────────────────
  const ProgressBar = () => (
    <div className="flex items-center gap-0 mb-12">
      {STEPS.map((label, i) => {
        const idx = i + 1;
        const isActive = idx === step;
        const isDone = idx < step;
        return (
          <React.Fragment key={label}>
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-black border-2 transition-all duration-300 ${
                  isDone
                    ? "bg-[#00F5FF] border-[#00F5FF] text-black"
                    : isActive
                    ? "bg-[#00F5FF]/20 border-[#00F5FF] text-[#00F5FF]"
                    : "bg-white/5 border-white/20 text-gray-500"
                }`}
              >
                {isDone ? <CheckCircle2 className="w-5 h-5" /> : idx}
              </div>
              <span
                className={`text-xs font-semibold mt-2 ${
                  isActive ? "text-[#00F5FF]" : isDone ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`h-0.5 flex-1 -mt-5 transition-all duration-500 ${
                  isDone ? "bg-[#00F5FF]" : "bg-white/10"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );

  // ── Navigation ──────────────────────────────────────────────────────────
  const NavButtons = () => (
    <div className="flex justify-between mt-10 pt-6 border-t border-white/10">
      <button
        onClick={() => setStep((s) => Math.max(1, s - 1))}
        disabled={step === 1}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 font-bold hover:bg-white/10 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-4 h-4" /> Anterior
      </button>
      {step < 4 ? (
        <button
          onClick={() => setStep((s) => Math.min(4, s + 1))}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00F5FF]/20 to-[#9B5DE5]/20 border border-[#00F5FF]/30 text-[#00F5FF] font-bold hover:from-[#00F5FF]/30 hover:to-[#9B5DE5]/30 transition-all"
        >
          Siguiente <ChevronRight className="w-4 h-4" />
        </button>
      ) : null}
    </div>
  );

  // ── STEP 1: Information ────────────────────────────────────────────────
  const Step1 = () => (
    <div className="space-y-6">
      <div>
        <label className={labelClass}>Título del curso *</label>
        <input
          name="titulo"
          type="text"
          placeholder="Ej: Web3 Full Stack: De Cero a DApp"
          className={inputClass}
          value={info.titulo}
          onChange={handleInfoChange}
        />
      </div>

      <div>
        <label className={labelClass}>Descripción</label>
        <textarea
          name="descripcion"
          rows={4}
          placeholder="¿Qué aprenderán? ¿A quién va dirigido?"
          className={inputClass}
          value={info.descripcion}
          onChange={handleInfoChange}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Nivel</label>
          <select
            name="nivel"
            className={inputClass}
            value={info.nivel}
            onChange={handleInfoChange}
          >
            <option value="">Seleccionar nivel</option>
            <option>Básico</option>
            <option>Intermedio</option>
            <option>Avanzado</option>
            <option>Experto</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Categoría</label>
          <select
            name="categoria"
            className={inputClass}
            value={info.categoria}
            onChange={handleInfoChange}
          >
            <option value="">Seleccionar categoría</option>
            <option>Web3</option>
            <option>Inteligencia Artificial</option>
            <option>DeFi</option>
            <option>Computación Cuántica</option>
            <option>DevOps</option>
            <option>Seguridad</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Precio en USD ($)</label>
          <input
            name="precioUSD"
            type="number"
            min={0}
            placeholder="99"
            className={inputClass}
            value={info.precioUSD}
            onChange={handleInfoChange}
          />
        </div>
        <div>
          <label className={labelClass}>Precio en $TAL</label>
          <input
            name="precioTAL"
            type="number"
            min={0}
            placeholder="500"
            className={inputClass}
            value={info.precioTAL}
            onChange={handleInfoChange}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/[0.03]">
        <input
          id="earlyPass"
          name="earlyPassGratis"
          type="checkbox"
          className="w-5 h-5 accent-[#00F5FF] cursor-pointer"
          checked={info.earlyPassGratis}
          onChange={handleInfoChange}
        />
        <label htmlFor="earlyPass" className="text-gray-300 cursor-pointer text-sm">
          <span className="font-bold text-white">¿Gratis con Early Pass?</span> — Los holders
          del Early Pass acceden sin costo adicional.
        </label>
      </div>

      <div>
        <label className={labelClass}>URL del trailer</label>
        <input
          name="trailer"
          type="url"
          placeholder="https://youtube.com/..."
          className={inputClass}
          value={info.trailer}
          onChange={handleInfoChange}
        />
      </div>
    </div>
  );

  // ── STEP 2: Curriculum ─────────────────────────────────────────────────
  const Step2 = () => (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-gray-400 text-sm">
          {modules.length === 0
            ? "Añade módulos y lecciones para estructurar tu curso."
            : `${modules.length} módulo${modules.length > 1 ? "s" : ""} · ${modules.reduce((a, m) => a + m.lessons.length, 0)} lecciones`}
        </p>
        <button
          onClick={addModule}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00F5FF]/10 border border-[#00F5FF]/30 text-[#00F5FF] text-sm font-bold hover:bg-[#00F5FF]/20 transition-colors"
        >
          <Plus className="w-4 h-4" /> Añadir Módulo
        </button>
      </div>

      {modules.length === 0 && (
        <div className="py-16 text-center rounded-2xl border border-dashed border-white/10 text-gray-600">
          <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>Aún no tienes módulos. ¡Crea el primero!</p>
        </div>
      )}

      {modules.map((mod, mi) => (
        <div
          key={mod.id}
          className="p-5 rounded-2xl border border-white/10 bg-white/[0.03] space-y-4"
        >
          {/* Module header */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-black text-gray-500 w-8 text-center">M{mi + 1}</span>
            <input
              type="text"
              placeholder="Título del módulo"
              className={`${inputClass} flex-1`}
              value={mod.title}
              onChange={(e) => updateModuleTitle(mod.id, e.target.value)}
            />
            <button
              onClick={() => removeModule(mod.id)}
              className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Lessons */}
          <div className="ml-11 space-y-3">
            {mod.lessons.map((les, li) => (
              <div
                key={les.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-black/30 border border-white/5"
              >
                <span className="text-xs text-gray-600 w-6 text-center">{li + 1}</span>
                <select
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00F5FF]/50 transition-colors"
                  value={les.type}
                  onChange={(e) =>
                    updateLesson(mod.id, les.id, "type", e.target.value)
                  }
                >
                  {(
                    [
                      "Video",
                      "Lectura",
                      "Coding Challenge",
                      "Quiz",
                      "Proyecto",
                      "Sesión en Vivo",
                    ] as LessonType[]
                  ).map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                <span className="text-gray-600 flex-shrink-0">
                  {lessonTypeIcon[les.type]}
                </span>
                <input
                  type="text"
                  placeholder="Título de la lección"
                  className="flex-1 bg-transparent border-b border-white/10 text-white text-sm px-2 py-1 focus:outline-none focus:border-[#00F5FF]/50 placeholder-gray-600"
                  value={les.title}
                  onChange={(e) =>
                    updateLesson(mod.id, les.id, "title", e.target.value)
                  }
                />
                <button
                  onClick={() => removeLesson(mod.id, les.id)}
                  className="p-1.5 rounded-lg text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            <button
              onClick={() => addLesson(mod.id)}
              className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-white transition-colors py-1"
            >
              <Plus className="w-3.5 h-3.5" /> Añadir lección
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  // ── STEP 3: Economics ──────────────────────────────────────────────────
  const Step3 = () => (
    <div className="space-y-8">
      <div>
        <label className={labelClass}>% de ingresos para el instructor</label>
        <div className="flex items-center gap-4">
          <input
            name="porcentajeInstructor"
            type="range"
            min={50}
            max={90}
            step={5}
            className="flex-1 accent-[#00F5FF]"
            value={eco.porcentajeInstructor}
            onChange={handleEcoChange}
          />
          <span className="w-16 text-center text-2xl font-black text-[#00F5FF]">
            {eco.porcentajeInstructor}%
          </span>
        </div>
        <p className="text-xs text-gray-600 mt-1">
          El {100 - eco.porcentajeInstructor}% restante va al Treasury DAO y mantenimiento de
          plataforma.
        </p>
      </div>

      <div className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/[0.03]">
        <input
          id="aceptaTAL"
          name="aceptaTAL"
          type="checkbox"
          className="w-5 h-5 accent-[#fca311] cursor-pointer"
          checked={eco.aceptaTAL}
          onChange={handleEcoChange}
        />
        <label htmlFor="aceptaTAL" className="text-gray-300 cursor-pointer text-sm">
          <span className="font-bold text-white">Acepta pago en $TAL</span> — Los estudiantes
          podrán inscribirse usando el token nativo de la DAO.
        </label>
      </div>

      <div>
        <label className={labelClass}>Bonus $TAL para mejor estudiante del mes</label>
        <input
          name="bonusTAL"
          type="number"
          min={0}
          placeholder="Ej: 100"
          className={inputClass}
          value={eco.bonusTAL}
          onChange={handleEcoChange}
        />
      </div>

      {/* Estimado mensual */}
      <div className="p-6 rounded-2xl border border-[#00F5FF]/20 bg-[#00F5FF]/5">
        <h3 className="text-sm font-black text-[#00F5FF] mb-4 uppercase tracking-widest">
          Calculadora de Ingresos
        </h3>
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1">
            <label className="text-xs text-gray-500 mb-1 block">Estudiantes estimados / mes</label>
            <input
              name="estudiantesEjemplo"
              type="number"
              min={1}
              className={inputClass}
              value={eco.estudiantesEjemplo}
              onChange={handleEcoChange}
            />
          </div>
          <div className="flex-1">
            <label className="text-xs text-gray-500 mb-1 block">Precio del curso (USD)</label>
            <input
              type="number"
              disabled
              className={`${inputClass} opacity-50`}
              value={info.precioUSD || "0"}
            />
          </div>
        </div>
        <div className="text-center py-4 rounded-xl bg-[#00F5FF]/10 border border-[#00F5FF]/20">
          <p className="text-xs text-gray-400 mb-1">Tu estimado mensual con</p>
          <p className="text-sm text-gray-300 mb-2">
            <span className="text-[#00F5FF] font-black">{eco.estudiantesEjemplo}</span>{" "}
            estudiantes a{" "}
            <span className="text-[#fca311] font-black">${info.precioUSD || 0} USD</span>
          </p>
          <p className="text-4xl font-black text-white">
            ${estimadoMensual.toLocaleString("es-ES", { maximumFractionDigits: 0 })}{" "}
            <span className="text-lg text-gray-400">USD</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            con {eco.porcentajeInstructor}% de los ingresos
          </p>
        </div>
      </div>
    </div>
  );

  // ── STEP 4: Publish ────────────────────────────────────────────────────
  const Step4 = () => {
    const totalLessons = modules.reduce((a, m) => a + m.lessons.length, 0);
    return (
      <div className="space-y-6">
        {publicado ? (
          <div className="p-10 rounded-3xl border border-green-500/30 bg-green-500/10 text-center">
            <CheckCircle2 className="w-20 h-20 text-green-400 mx-auto mb-5" />
            <h2 className="text-3xl font-black text-white mb-3">¡Curso publicado!</h2>
            <p className="text-green-300 text-lg">
              Los estudiantes ya pueden inscribirse a{" "}
              <span className="font-bold">{info.titulo || "tu curso"}</span>.
            </p>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-black text-white pb-3 border-b border-white/10">
              Resumen del Curso
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { label: "Título", value: info.titulo || "—" },
                { label: "Categoría", value: info.categoria || "—" },
                { label: "Nivel", value: info.nivel || "—" },
                {
                  label: "Precio",
                  value:
                    info.precioUSD
                      ? `$${info.precioUSD} USD ${info.precioTAL ? `/ ${info.precioTAL} $TAL` : ""}`
                      : "Gratuito",
                },
                {
                  label: "Currículo",
                  value: `${modules.length} módulos · ${totalLessons} lecciones`,
                },
                {
                  label: "Ingresos instructor",
                  value: `${eco.porcentajeInstructor}%`,
                },
                {
                  label: "Early Pass",
                  value: info.earlyPassGratis ? "Sí — Acceso gratis" : "No",
                },
                {
                  label: "Acepta $TAL",
                  value: eco.aceptaTAL ? "Sí" : "No",
                },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="p-4 rounded-xl border border-white/10 bg-white/[0.03] flex justify-between items-center"
                >
                  <span className="text-gray-500 text-sm">{label}</span>
                  <span className="text-white font-semibold text-sm text-right max-w-[60%] truncate">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {info.descripcion && (
              <div className="p-4 rounded-xl border border-white/10 bg-white/[0.03]">
                <p className="text-gray-500 text-xs mb-2">Descripción</p>
                <p className="text-gray-300 text-sm leading-relaxed">{info.descripcion}</p>
              </div>
            )}

            <button
              onClick={() => setShowModal(true)}
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#fca311] to-[#00F5FF] text-black font-black text-lg hover:opacity-90 transition-opacity"
            >
              🚀 Publicar Curso
            </button>
          </>
        )}

        {/* Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-6">
            <div className="bg-[#0a0f1e] border border-white/20 rounded-3xl p-8 max-w-md w-full shadow-2xl">
              <h3 className="text-2xl font-black text-white mb-3 text-center">
                ¿Confirmar publicación?
              </h3>
              <p className="text-gray-400 text-center mb-8 leading-relaxed">
                Tu curso{" "}
                <span className="text-white font-bold">
                  &quot;{info.titulo || "Sin título"}&quot;
                </span>{" "}
                quedará visible para todos los estudiantes de DAO Talent Hub.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 font-bold hover:bg-white/10 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handlePublish}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#fca311] to-[#00F5FF] text-black font-black hover:opacity-90 transition-opacity"
                >
                  Publicar ahora
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ── RENDER ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 bg-[#020408]">
      <div className="max-w-3xl mx-auto">

        {/* Back */}
        <Link
          href={`/${locale}/university/teach`}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-10 text-sm font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          Volver al Portal del Profesor
        </Link>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3 leading-tight">
            Course{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fca311] to-[#00F5FF]">
              Studio
            </span>
          </h1>
          <p className="text-gray-400">
            Crea y publica tu curso en 4 pasos.
          </p>
        </div>

        {/* Progress */}
        <ProgressBar />

        {/* Step Content */}
        <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.03]">
          <h2 className="text-xl font-black text-white mb-6">
            {step === 1 && "📋 Información del Curso"}
            {step === 2 && "📚 Currículo"}
            {step === 3 && "💰 Modelo Económico"}
            {step === 4 && "🚀 Publicar"}
          </h2>

          {step === 1 && <Step1 />}
          {step === 2 && <Step2 />}
          {step === 3 && <Step3 />}
          {step === 4 && <Step4 />}

          {!publicado && <NavButtons />}
        </div>
      </div>
    </div>
  );
}
