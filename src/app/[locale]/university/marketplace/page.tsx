"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import {
  Search,
  Star,
  ArrowRight,
  ChevronLeft,
  Filter,
  BookOpen,
  Coins,
  Users,
  Zap,
  Lock,
  X,
  SlidersHorizontal,
  GraduationCap,
} from "lucide-react";
import { supabase } from "@/utils/supabase/client";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CourseModule {
  id: string;
  title: string;
  talReward: number;
  completed: boolean;
}

interface CourseRaw {
  id: string;
  title: string;
  instructorName: string;
  instructorTitle: string;
  instructorAvatar: string;
  category: string;
  totalTal: number;
  lang: string;
  gradientFrom: string;
  gradientTo: string;
  color: string;
  modules: CourseModule[];
}

interface CourseEnriched extends CourseRaw {
  priceUSD: number | null; // null = free
  priceTAL: number | null;
  rating: number;
  students: number;
  level: "Básico" | "Avanzado" | "Experto";
  isFreeWithPass: boolean;
  isNew: boolean;
}

// ─── Static Price/Rating Enrichment ──────────────────────────────────────────

const PRICE_MAP: Record<
  string,
  {
    priceUSD: number | null;
    priceTAL: number | null;
    rating: number;
    students: number;
    level: "Básico" | "Avanzado" | "Experto";
    isFreeWithPass: boolean;
    isNew: boolean;
  }
> = {
  m1: {
    priceUSD: null,
    priceTAL: null,
    rating: 4.9,
    students: 3840,
    level: "Básico",
    isFreeWithPass: true,
    isNew: false,
  },
  "spec-defi-security": {
    priceUSD: 29,
    priceTAL: 500,
    rating: 4.8,
    students: 1254,
    level: "Avanzado",
    isFreeWithPass: true,
    isNew: false,
  },
  "spec-llm-agents": {
    priceUSD: 49,
    priceTAL: 750,
    rating: 4.9,
    students: 2107,
    level: "Avanzado",
    isFreeWithPass: true,
    isNew: true,
  },
  "spec-quantum": {
    priceUSD: 89,
    priceTAL: 1200,
    rating: 4.7,
    students: 612,
    level: "Experto",
    isFreeWithPass: true,
    isNew: false,
  },
  "spec-web3-marketplaces": {
    priceUSD: 39,
    priceTAL: 600,
    rating: 4.8,
    students: 987,
    level: "Avanzado",
    isFreeWithPass: true,
    isNew: false,
  },
  "spec-solidity-advanced": {
    priceUSD: 59,
    priceTAL: 800,
    rating: 4.9,
    students: 1532,
    level: "Experto",
    isFreeWithPass: true,
    isNew: true,
  },
};

// ─── Build Enriched Courses Array ─────────────────────────────────────────────

// ─── Component State for Courses ──────────────────────────────────────────────

// ─── Helpers ──────────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < full
              ? "text-amber-400 fill-amber-400"
              : half && i === full
              ? "text-amber-400 fill-amber-400/40"
              : "text-white/20"
          }`}
        />
      ))}
      <span className="text-amber-400 font-bold text-xs ml-1">{rating}</span>
    </span>
  );
}

function LevelBadge({ level }: { level: string }) {
  const colors: Record<string, string> = {
    Básico: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Avanzado: "bg-[#9B5DE5]/10 text-[#9B5DE5] border-[#9B5DE5]/20",
    Experto: "bg-[#00F5FF]/10 text-[#00F5FF] border-[#00F5FF]/20",
  };
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${colors[level] ?? colors["Básico"]}`}
    >
      {level}
    </span>
  );
}

// ─── Filter types ─────────────────────────────────────────────────────────────

type SortOption = "popular" | "rating" | "newest";
type PriceFilter = "all" | "free-with-pass" | "paid";

const CATEGORIES = [
  "Todas",
  "IA Avanzada",
  "Web3",
  "DeFi",
  "Computación Cuántica",
];

function matchCategory(course: CourseEnriched, cat: string): boolean {
  if (cat === "Todas") return true;
  const c = course.category.toLowerCase();
  if (cat === "IA Avanzada") return c.includes("ia") || c.includes("llm") || c.includes("avanzada") && c.includes("ia") || course.id === "spec-llm-agents";
  if (cat === "Web3") return c.includes("web3") || c.includes("marketplace") || c.includes("solidity") || c.includes("génesis");
  if (cat === "DeFi") return c.includes("defi") || c.includes("smart") || c.includes("seguridad");
  if (cat === "Computación Cuántica") return c.includes("cuántica") || c.includes("quantum");
  return true;
}

// ─── Course Card ──────────────────────────────────────────────────────────────

function CourseCard({ course }: { course: CourseEnriched }) {
  return (
    <div className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300 overflow-hidden">
      {/* Cover Gradient */}
      <div
        className="relative h-36 flex-shrink-0 flex items-end p-4 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${course.gradientFrom}33, ${course.gradientTo}55)`,
        }}
      >
        {/* Glassy orb */}
        <div
          className="absolute top-4 right-4 w-16 h-16 rounded-full blur-2xl opacity-40 pointer-events-none"
          style={{ background: course.gradientFrom }}
        />
        {/* Avatar */}
        <div className="text-4xl relative z-10 select-none">{course.instructorAvatar}</div>

        {/* Badges top row */}
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          {course.isNew && (
            <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-[#00F5FF] text-black">
              Nuevo
            </span>
          )}
          <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-black/50 text-white/80 border border-white/10 backdrop-blur-sm">
            {course.lang}
          </span>
        </div>

        {/* Early Pass badge */}
        {course.isFreeWithPass && (
          <div className="absolute top-3 right-3">
            <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 backdrop-blur-sm">
              ✓ Early Pass
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Category + Level */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest truncate">
            {course.category}
          </span>
          <LevelBadge level={course.level} />
        </div>

        {/* Title */}
        <h3 className="text-white font-black text-sm leading-tight line-clamp-2 group-hover:text-[#00F5FF] transition-colors">
          {course.title}
        </h3>

        {/* Instructor */}
        <p className="text-white/50 text-xs truncate">{course.instructorName} · {course.instructorTitle.split("·")[0].trim()}</p>

        {/* Rating + Students */}
        <div className="flex items-center gap-3">
          <StarRating rating={course.rating} />
          <span className="text-white/30 text-xs flex items-center gap-1">
            <Users className="w-3 h-3" />
            {course.students.toLocaleString("es-ES")}
          </span>
        </div>

        {/* Modules + TAL */}
        <div className="flex items-center gap-3 text-xs text-white/40">
          <span className="flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            {course.modules.length} módulos
          </span>
          <span className="flex items-center gap-1 text-[#00F5FF]">
            <Coins className="w-3.5 h-3.5" />
            +{course.totalTal.toLocaleString("es-ES")} $TAL
          </span>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Price Section */}
        <div className="pt-3 border-t border-white/5">
          {course.priceUSD === null ? (
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl font-black text-emerald-400">GRATIS</span>
              <span className="text-xs text-white/30 line-through"></span>
            </div>
          ) : (
            <div className="flex items-start justify-between mb-3 gap-2">
              <div>
                <div className="text-xl font-black text-white">${course.priceUSD} USD</div>
                <div className="text-xs text-[#00F5FF] font-bold">{course.priceTAL?.toLocaleString("es-ES")} $TAL</div>
              </div>
              {course.isFreeWithPass && (
                <div className="shrink-0 px-2 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-center">
                  <div className="text-[9px] font-black uppercase tracking-wider text-emerald-400">GRATIS con</div>
                  <div className="text-[9px] font-black text-emerald-300">Early Pass</div>
                </div>
              )}
            </div>
          )}

          <Link
            href={`/university/course/${course.id}`}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 text-black"
            style={{
              background: `linear-gradient(135deg, ${course.gradientFrom}, ${course.gradientTo})`,
            }}
          >
            Acceder al Curso
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function MarketplacePage() {
  const locale = useLocale();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [selectedLevel, setSelectedLevel] = useState<string>("Todos");
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const [allCourses, setAllCourses] = useState<CourseEnriched[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCourses() {
      try {
        const { data, error } = await supabase.from('courses').select('*');
        if (error) throw error;
        
        if (data) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const enriched = data.map((c: any) => {
            const meta = PRICE_MAP[c.id] ?? {
              priceUSD: 29,
              priceTAL: 500,
              rating: 4.5,
              students: 500,
              level: "Básico" as const,
              isFreeWithPass: true,
              isNew: false,
            };
            return {
              id: c.id,
              title: c.title || "",
              instructorName: c.instructor_name || c.instructorName || "",
              instructorTitle: c.instructor_title || c.instructorTitle || "",
              instructorAvatar: c.instructor_avatar || c.instructorAvatar || "",
              category: c.category || "",
              totalTal: c.total_tal || c.totalTal || 0,
              lang: c.lang || "ES",
              gradientFrom: c.gradient_from || c.gradientFrom || "#000",
              gradientTo: c.gradient_to || c.gradientTo || "#000",
              color: c.color || "#000",
              modules: c.modules || [],
              priceUSD: c.price_usd !== undefined ? c.price_usd : c.priceUSD !== undefined ? c.priceUSD : meta.priceUSD,
              priceTAL: c.price_tal !== undefined ? c.price_tal : c.priceTAL !== undefined ? c.priceTAL : meta.priceTAL,
              rating: c.rating !== undefined ? c.rating : meta.rating,
              students: c.students !== undefined ? c.students : meta.students,
              level: c.level !== undefined ? c.level : meta.level,
              isFreeWithPass: c.is_free_with_pass !== undefined ? c.is_free_with_pass : c.isFreeWithPass !== undefined ? c.isFreeWithPass : meta.isFreeWithPass,
              isNew: c.is_new !== undefined ? c.is_new : c.isNew !== undefined ? c.isNew : meta.isNew,
            };
          });
          setAllCourses(enriched);
        }
      } catch (err) {
        console.error("Error loading courses:", err);
      } finally {
        setLoading(false);
      }
    }
    loadCourses();
  }, []);

  // Debounce search
  const debounceRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleSearch = useCallback((val: string) => {
    setSearchQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedQuery(val);
    }, 300);
  }, []);

  const filtered = useMemo(() => {
    let list = [...allCourses];

    // Search
    if (debouncedQuery.trim()) {
      const q = debouncedQuery.toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.instructorName.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.lang.toLowerCase().includes(q)
      );
    }

    // Category
    list = list.filter((c) => matchCategory(c, selectedCategory));

    // Level
    if (selectedLevel !== "Todos") {
      list = list.filter((c) => c.level === selectedLevel);
    }

    // Price
    if (priceFilter === "free-with-pass") {
      list = list.filter((c) => c.isFreeWithPass);
    } else if (priceFilter === "paid") {
      list = list.filter((c) => c.priceUSD !== null);
    }

    // Sort
    if (sortBy === "popular") {
      list.sort((a, b) => b.students - a.students);
    } else if (sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "newest") {
      list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return list;
  }, [debouncedQuery, selectedCategory, selectedLevel, priceFilter, sortBy, allCourses]);

  const resetFilters = () => {
    setSearchQuery("");
    setDebouncedQuery("");
    setSelectedCategory("Todas");
    setSelectedLevel("Todos");
    setPriceFilter("all");
    setSortBy("popular");
  };

  const hasActiveFilters =
    selectedCategory !== "Todas" ||
    selectedLevel !== "Todos" ||
    priceFilter !== "all" ||
    sortBy !== "popular" ||
    debouncedQuery.trim() !== "";

  return (
    <div className="min-h-screen bg-[#020408] text-white pt-24 pb-24">
      {/* Ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#9B5DE5]/10 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-[#00F5FF]/5 blur-[140px] rounded-full pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

        {/* ── Header ── */}
        <div className="mb-10">
          <Link
            href={`/${locale}/university`}
            className="inline-flex items-center gap-1.5 text-[#00F5FF] text-sm font-bold hover:opacity-80 transition-opacity mb-6 group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Volver al Hub
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-[#9B5DE5]/20 to-[#00F5FF]/10 border border-[#9B5DE5]/30">
                  <GraduationCap className="w-6 h-6 text-[#9B5DE5]" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-[#9B5DE5]">
                  DAO Labs University
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                Marketplace de{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9B5DE5] to-[#00F5FF]">
                  Cursos
                </span>
              </h1>
              <p className="text-white/50 mt-3 text-lg max-w-xl">
                Aprende, gana <strong className="text-[#00F5FF]">$TAL</strong> y lanza tu carrera Web3. Acceso total con tu Early Pass.
              </p>
            </div>

            {/* Stats pills */}
            <div className="flex gap-3 flex-wrap">
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-center">
                <div className="text-xl font-black text-white">{allCourses.length}</div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest">Cursos</div>
              </div>
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-center">
                <div className="text-xl font-black text-[#00F5FF]">
                  {allCourses.reduce((s, c) => s + c.totalTal, 0).toLocaleString("es-ES")}
                </div>
                <div className="text-[10px] text-white/40 uppercase tracking-widest">$TAL Totales</div>
              </div>
              <div className="px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-center">
                <div className="text-xl font-black text-emerald-400">
                  {allCourses.filter((c) => c.isFreeWithPass).length}
                </div>
                <div className="text-[10px] text-emerald-400/70 uppercase tracking-widest">Con Early Pass</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Search Bar ── */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Buscar cursos, instructores, tecnologías..."
            className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm font-medium focus:outline-none focus:border-[#9B5DE5]/50 focus:bg-white/8 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => { setSearchQuery(""); setDebouncedQuery(""); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* ── Mobile Filter Toggle ── */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden mb-4 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-bold text-white/70 hover:text-white transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filtros
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-[#9B5DE5] animate-pulse" />
          )}
        </button>

        {/* ── Layout ── */}
        <div className="flex gap-6">

          {/* ── Sidebar Filters ── */}
          <aside
            className={`
              fixed md:static inset-0 z-40 md:z-auto
              md:w-64 md:flex-shrink-0
              transition-all duration-300
              ${sidebarOpen ? "flex" : "hidden md:block"}
            `}
          >
            {/* Mobile backdrop */}
            {sidebarOpen && (
              <div
                className="fixed inset-0 bg-black/70 md:hidden"
                onClick={() => setSidebarOpen(false)}
              />
            )}

            <div className="relative z-50 w-72 md:w-full h-full md:h-auto overflow-y-auto md:overflow-visible bg-[#0a0d14] md:bg-transparent p-6 md:p-0 flex flex-col gap-6">

              {/* Mobile close */}
              <div className="flex items-center justify-between md:hidden">
                <span className="font-black text-white flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#9B5DE5]" />
                  Filtros
                </span>
                <button onClick={() => setSidebarOpen(false)} className="text-white/50 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sticky inner */}
              <div className="md:sticky md:top-28 space-y-5">

                {/* Reset */}
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="w-full py-2 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 text-xs font-bold hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2"
                  >
                    <X className="w-3.5 h-3.5" />
                    Limpiar filtros
                  </button>
                )}

                {/* Category */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <h3 className="text-xs font-black uppercase tracking-widest text-white/50 mb-3 flex items-center gap-2">
                    <Filter className="w-3.5 h-3.5" />
                    Categoría
                  </h3>
                  <div className="space-y-1.5">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                          selectedCategory === cat
                            ? "bg-[#9B5DE5]/20 text-[#9B5DE5] border border-[#9B5DE5]/30"
                            : "text-white/50 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Level */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <h3 className="text-xs font-black uppercase tracking-widest text-white/50 mb-3 flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5" />
                    Nivel
                  </h3>
                  <div className="space-y-1.5">
                    {["Todos", "Básico", "Avanzado", "Experto"].map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => setSelectedLevel(lvl)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                          selectedLevel === lvl
                            ? "bg-[#00F5FF]/10 text-[#00F5FF] border border-[#00F5FF]/20"
                            : "text-white/50 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <h3 className="text-xs font-black uppercase tracking-widest text-white/50 mb-3 flex items-center gap-2">
                    <Coins className="w-3.5 h-3.5" />
                    Precio
                  </h3>
                  <div className="space-y-1.5">
                    {[
                      { key: "all", label: "Todos" },
                      { key: "free-with-pass", label: "Gratis con Pass" },
                      { key: "paid", label: "De pago" },
                    ].map(({ key, label }) => (
                      <button
                        key={key}
                        onClick={() => setPriceFilter(key as PriceFilter)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                          priceFilter === key
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "text-white/50 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <h3 className="text-xs font-black uppercase tracking-widest text-white/50 mb-3 flex items-center gap-2">
                    <Star className="w-3.5 h-3.5" />
                    Ordenar por
                  </h3>
                  <div className="space-y-1.5">
                    {[
                      { key: "popular", label: "Más populares" },
                      { key: "rating", label: "Mejor valorados" },
                      { key: "newest", label: "Más nuevos" },
                    ].map(({ key, label }) => (
                      <button
                        key={key}
                        onClick={() => setSortBy(key as SortOption)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                          sortBy === key
                            ? "bg-white/10 text-white border border-white/20"
                            : "text-white/50 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Early Pass CTA */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#F59E0B]/10 to-transparent border border-[#F59E0B]/20 text-center">
                  <Lock className="w-6 h-6 text-[#F59E0B] mx-auto mb-2" />
                  <p className="text-xs font-bold text-white/70 mb-3 leading-snug">
                    Accede a <strong className="text-[#F59E0B]">todos los cursos gratis</strong> con el Early Pass
                  </p>
                  <Link
                    href={`/${locale}/early-pass`}
                    className="block w-full py-2 rounded-xl text-xs font-black uppercase tracking-wider text-[#020408] transition-all hover:opacity-90"
                    style={{ background: "linear-gradient(135deg, #F59E0B, #D97706)" }}
                  >
                    Obtener Early Pass
                  </Link>
                </div>
              </div>
            </div>
          </aside>

          {/* ── Course Grid ── */}
          <div className="flex-1 min-w-0">
            {/* Results count */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-white/40">
                <span className="text-white font-bold">{filtered.length}</span>{" "}
                {filtered.length === 1 ? "curso encontrado" : "cursos encontrados"}
              </p>
              {debouncedQuery && (
                <p className="text-sm text-white/30">
                  para &ldquo;<span className="text-white/60">{debouncedQuery}</span>&rdquo;
                </p>
              )}
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-64 bg-white/5 rounded-2xl animate-pulse border border-white/5" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                  <Search className="w-10 h-10 text-white/20" />
                </div>
                <h3 className="text-xl font-black text-white mb-2">Sin resultados</h3>
                <p className="text-white/40 mb-6">
                  No hay cursos que coincidan con tus filtros actuales.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white text-sm font-bold hover:bg-white/10 transition-colors"
                >
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
