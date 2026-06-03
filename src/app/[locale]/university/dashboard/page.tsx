"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import {
  Trophy,
  BookOpen,
  Flame,
  TrendingUp,
  Star,
  ChevronLeft,
  ArrowRight,
  Zap,
  GraduationCap,
  ShoppingBag,
  Award,
  Calendar,
  CheckCircle2,
  Coins,
  Users,
  Medal,
} from "lucide-react";
import MintSBTButton from "@/components/MintSBTButton";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const USER = {
  name: "Alex Rivera",
  emoji: "🧠",
  level: 3,
  levelLabel: "Senior Web3",
  xp: 2340,
  xpNext: 3000,
};

const COURSES = [
  {
    id: "llm-agents",
    title: "Desarrollo de Agentes Autónomos con LLMs",
    progress: 60,
    currentModule: "Módulo 3: RAG",
    color: "#00F5FF",
  },
  {
    id: "smart-contracts-security",
    title: "Seguridad en Smart Contracts",
    progress: 25,
    currentModule: "Módulo 1: Reentrancy",
    color: "#9B5DE5",
  },
  {
    id: "quantum-algorithms",
    title: "Algoritmos Cuánticos",
    progress: 40,
    currentModule: "Módulo 2: Superposición",
    color: "#fca311",
  },
];

const SBTS = [
  {
    id: 1,
    icon: "🤖",
    name: "Maestro de Agentes LLM",
    course: "Agentes Autónomos",
    date: "12 May 2026",
    color: "#00F5FF",
  },
  {
    id: 2,
    icon: "🔐",
    name: "Guardián de Contratos",
    course: "Smart Contract Security",
    date: "28 Abr 2026",
    color: "#9B5DE5",
  },
  {
    id: 3,
    icon: "⚡",
    name: "Hacker Cuántico Lvl.1",
    course: "Algoritmos Cuánticos",
    date: "5 Abr 2026",
    color: "#fca311",
  },
  {
    id: 4,
    icon: "🌐",
    name: "Ciudadano Web3",
    course: "Fundamentos Web3",
    date: "1 Mar 2026",
    color: "#22c55e",
  },
];

const TAL_BALANCE = 450;
const TAL_HISTORY = [
  { id: 1, desc: "Módulo 3 — RAG completado", tal: "+80 TAL", date: "Hoy" },
  { id: 2, desc: "Módulo 2 — Embeddings completado", tal: "+60 TAL", date: "Ayer" },
  { id: 3, desc: "Quiz de Seguridad aprobado", tal: "+120 TAL", date: "28 May" },
  { id: 4, desc: "Módulo 1 — Reentrancy completado", tal: "+90 TAL", date: "26 May" },
  { id: 5, desc: "Superposición Cuántica completado", tal: "+100 TAL", date: "24 May" },
];

const STREAK_DAYS = 7;
const CALENDAR_DAYS: boolean[] = [
  true, true, false, true, true, true, true,
  true, false, true, true, true, true, true,
];

const LEADERBOARD = [
  { rank: 1, name: "Luna Nakamura", courses: 12, tal: 4_820 },
  { rank: 2, name: "Diego Santos", courses: 10, tal: 4_100 },
  { rank: 3, name: "Alex Rivera", courses: 8, tal: 3_640, isYou: true },
  { rank: 4, name: "Priya Mehta", courses: 7, tal: 2_900 },
  { rank: 5, name: "Omar Al-Rashid", courses: 6, tal: 2_350 },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function XpBar({ xp, xpNext }: { xp: number; xpNext: number }) {
  const pct = Math.round((xp / xpNext) * 100);
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-white/50 mb-1">
        <span>{xp.toLocaleString()} XP</span>
        <span>{xpNext.toLocaleString()} XP → Nivel 4</span>
      </div>
      <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#00F5FF] to-[#9B5DE5] transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function ProgressBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${pct}%`, background: color }}
      />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function UniversityDashboardPage() {
  const tApp = useTranslations('app');
  const locale = useLocale();
  const [expandedTx, setExpandedTx] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-[#020408] pt-28 pb-24 px-4 sm:px-6 text-white font-sans">
      {/* Ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#00F5FF]/5 blur-[120px] pointer-events-none rounded-full z-0" />
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-[#9B5DE5]/5 blur-[120px] pointer-events-none rounded-full z-0" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-10">

        {/* ── Back nav ─────────────────────────────────────────── */}
        <div className="flex items-center gap-4">
          <Link
            href={`/${locale}/university`}
            className="flex items-center gap-1.5 text-sm text-white/50 hover:text-[#00F5FF] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Volver al Hub
          </Link>
        </div>

        {/* ── 1. HEADER PERSONAL ───────────────────────────────── */}
        <section className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-sm relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#00F5FF]/10 blur-[60px] rounded-full pointer-events-none" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00F5FF]/20 to-[#9B5DE5]/20 border border-white/10 flex items-center justify-center text-4xl flex-shrink-0 shadow-[0_0_30px_rgba(0,245,255,0.15)]">
              {USER.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-1">
                <h1 className="text-2xl font-black text-white">{USER.name}</h1>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#9B5DE5]/20 text-[#9B5DE5] border border-[#9B5DE5]/30">
                  Nivel {USER.level} — {USER.levelLabel}
                </span>
              </div>
              <p className="text-white/40 text-sm mb-4">Estudiante activo · DAO Talent University</p>
              <XpBar xp={USER.xp} xpNext={USER.xpNext} />
            </div>
          </div>
        </section>

        {/* ── 2 + 4 (two-column on lg) ─────────────────────────── */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* ── 2. MIS CURSOS EN PROGRESO ──────────────────────── */}
          <section className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-black flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#00F5FF]" />
              Mis cursos en progreso
            </h2>
            {COURSES.map((c) => (
              <div
                key={c.id}
                className="p-5 rounded-2xl border border-white/10 bg-white/[0.03] hover:border-white/20 transition-all group"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-white leading-snug mb-1">{c.title}</h3>
                    <p className="text-xs text-white/40">
                      Continuar en: <span style={{ color: c.color }}>{c.currentModule}</span>
                    </p>
                  </div>
                  <span
                    className="text-xl font-black flex-shrink-0"
                    style={{ color: c.color }}
                  >
                    {c.progress}%
                  </span>
                </div>
                <ProgressBar pct={c.progress} color={c.color} />
                <div className="mt-4">
                  <Link
                    href={`/university/course/${c.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border transition-all hover:scale-[1.02]"
                    style={{
                      borderColor: `${c.color}50`,
                      color: c.color,
                      background: `${c.color}12`,
                    }}
                  >
                    Continuar <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </section>

          {/* ── 4. LEARN-TO-EARN PANEL ─────────────────────────── */}
          <section className="space-y-4">
            <h2 className="text-lg font-black flex items-center gap-2">
              <Coins className="w-5 h-5 text-[#fca311]" />
              Learn-to-Earn
            </h2>

            {/* Balance card */}
            <div className="p-5 rounded-2xl border border-[#fca311]/30 bg-gradient-to-br from-[#fca311]/10 to-transparent relative overflow-hidden">
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#fca311]/15 blur-[30px] rounded-full" />
              <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Ganados esta semana</p>
              <p className="text-4xl font-black text-[#fca311] mb-1">
                {TAL_BALANCE} <span className="text-xl">TAL</span>
              </p>
              <p className="text-xs text-white/30">≈ $67.50 USD</p>
            </div>

            {/* Transaction history */}
            <div className="p-4 rounded-2xl border border-white/10 bg-white/[0.03]">
              <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3">{tApp('latestTxs')}</p>
              <ul className="space-y-2.5">
                {TAL_HISTORY.map((tx) => (
                  <li
                    key={tx.id}
                    className="flex items-center justify-between gap-3 cursor-pointer"
                    onClick={() => setExpandedTx(expandedTx === tx.id ? null : tx.id)}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Zap className="w-3.5 h-3.5 text-[#fca311] flex-shrink-0" />
                      <span className="text-xs text-white/70 truncate">{tx.desc}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-xs font-bold text-[#22c55e]">{tx.tal}</span>
                      <span className="text-[10px] text-white/30">{tx.date}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* ── 3. SBTs GANADOS ──────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black flex items-center gap-2">
              <Award className="w-5 h-5 text-[#fca311]" />
              SBTs Ganados
              <span className="text-sm font-normal text-white/30">(Soul-Bound Tokens)</span>
            </h2>
            <MintSBTButton />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {SBTS.map((sbt) => (
              <div
                key={sbt.id}
                className="p-4 rounded-2xl border flex flex-col items-center text-center gap-2 transition-all hover:scale-[1.02] cursor-default relative overflow-hidden"
                style={{
                  borderColor: `${sbt.color}40`,
                  background: `linear-gradient(135deg, ${sbt.color}15 0%, transparent 70%)`,
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border shadow-lg"
                  style={{
                    borderColor: `${sbt.color}50`,
                    background: `${sbt.color}20`,
                    boxShadow: `0 0 20px ${sbt.color}30`,
                  }}
                >
                  {sbt.icon}
                </div>
                <p className="text-xs font-black text-white leading-tight">{sbt.name}</p>
                <p className="text-[10px] text-white/40">{sbt.course}</p>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ color: sbt.color, background: `${sbt.color}20` }}
                >
                  {sbt.date}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── 5 + 6 (two-column on lg) ─────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* ── 5. RACHA DE APRENDIZAJE ──────────────────────── */}
          <section className="p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
            <h2 className="text-lg font-black flex items-center gap-2 mb-5">
              <Flame className="w-5 h-5 text-orange-400" />
              Racha de Aprendizaje
            </h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex flex-col items-center">
                <span className="text-5xl font-black text-orange-400">{STREAK_DAYS}</span>
                <span className="text-xs text-white/40 mt-1">{tApp('consecutiveDays')}</span>
              </div>
              <div className="flex-1 p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-center">
                <p className="text-orange-300 font-bold text-sm">{tApp('activeStreak')}</p>
                <p className="text-white/40 text-xs mt-1">Estudia hoy para mantenerla</p>
              </div>
            </div>

            {/* Calendar grid — last 14 days */}
            <div>
              <p className="text-xs text-white/40 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Últimos 14 días
              </p>
              <div className="grid grid-cols-7 gap-2">
                {CALENDAR_DAYS.map((active, i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-lg flex items-center justify-center text-xs font-bold transition-all"
                    style={{
                      background: active
                        ? "linear-gradient(135deg, #fb923c, #f97316)"
                        : "rgba(255,255,255,0.05)",
                      boxShadow: active ? "0 0 12px rgba(251,146,60,0.4)" : "none",
                      color: active ? "#fff" : "rgba(255,255,255,0.2)",
                    }}
                  >
                    {active ? "✓" : "–"}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── 6. LEADERBOARD MINI ──────────────────────────── */}
          <section className="p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
            <h2 className="text-lg font-black flex items-center gap-2 mb-5">
              <Trophy className="w-5 h-5 text-[#fca311]" />
              Top Estudiantes del Hub
            </h2>
            <ul className="space-y-3">
              {LEADERBOARD.map((s) => (
                <li
                  key={s.rank}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                    s.isYou
                      ? "bg-[#00F5FF]/10 border border-[#00F5FF]/30"
                      : "bg-white/[0.03] border border-transparent"
                  }`}
                >
                  {/* Rank badge */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${
                      s.rank === 1
                        ? "bg-[#fca311] text-black"
                        : s.rank === 2
                        ? "bg-gray-400 text-black"
                        : s.rank === 3
                        ? "bg-amber-700 text-white"
                        : "bg-white/10 text-white/60"
                    }`}
                  >
                    {s.rank === 1 ? "🥇" : s.rank === 2 ? "🥈" : s.rank === 3 ? "🥉" : s.rank}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-bold truncate ${s.isYou ? "text-[#00F5FF]" : "text-white"}`}>
                      {s.name} {s.isYou && <span className="text-[10px] text-[#00F5FF]/60">{tApp('you')}</span>}
                    </p>
                    <p className="text-[11px] text-white/40">
                      {s.courses} cursos · {s.tal.toLocaleString()} TAL
                    </p>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Star className="w-3.5 h-3.5 text-[#fca311]" />
                    <span className="text-xs font-bold text-[#fca311]">{s.tal.toLocaleString()}</span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex items-center gap-2 text-xs text-white/30 justify-center">
              <Users className="w-3.5 h-3.5" />
              <span>Actualizado en tiempo real</span>
              <TrendingUp className="w-3.5 h-3.5 text-[#22c55e]" />
            </div>
          </section>
        </div>

        {/* ── 7. CTA Buttons ───────────────────────────────────── */}
        <section className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href={`/${locale}/university/marketplace`}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#00F5FF] to-[#9B5DE5] text-black font-black text-sm hover:opacity-90 hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(0,245,255,0.25)]"
          >
            <ShoppingBag className="w-5 h-5" />
            Ir al Marketplace
          </Link>
          <Link
            href={`/${locale}/university`}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white/70 font-bold text-sm hover:border-white/40 hover:text-white transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
            Volver al Hub
          </Link>
        </section>

      </div>
    </main>
  );
}
