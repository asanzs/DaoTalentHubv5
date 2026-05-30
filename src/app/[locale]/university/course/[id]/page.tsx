"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { BookOpen, CheckCircle2, PlayCircle, ShieldCheck, ChevronRight, Lock, Code2, Terminal, Loader2 } from "lucide-react";
import Link from "next/link";

export default function CoursePage({ params }: { params: { id: string } }) {
  const t = useTranslations('universityV2.course');
  const [activeLesson, setActiveLesson] = useState(1);
  const [envConnected, setEnvConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [codeSubmitted, setCodeSubmitted] = useState(false);
  const [validating, setValidating] = useState(false);

  const isM1 = params.id === "m1" || params.id === "rust-advanced";

  const handleConnect = () => {
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      setEnvConnected(true);
    }, 2000);
  };

  const handleValidation = () => {
    setValidating(true);
    setTimeout(() => {
      setValidating(false);
      setCodeSubmitted(true);
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-[#0B0C10] pt-24 pb-20 text-white font-sans">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Main Content Area */}
          <div className="flex-1">
            <div className="mb-6">
              <Link href="/university" className="text-[#00F5FF] text-sm font-bold flex items-center gap-1 hover:underline">
                <ChevronRight className="w-4 h-4 rotate-180" /> {t('backBtn')}
              </Link>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-black mb-4">
              {isM1 ? t('titleM1') : t('titleAI')}
            </h1>
            <p className="text-white/60 mb-8 leading-relaxed">
              {t('desc')}
            </p>

            <div className="aspect-video w-full bg-black rounded-2xl border border-white/10 mb-8 relative flex items-center justify-center overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[#00F5FF]/5" />
              <PlayCircle className="w-16 h-16 text-white/30 hover:text-[#00F5FF] transition-colors cursor-pointer relative z-10" />
            </div>

            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden">
              {/* Glassmorphism Success Modal Overlay */}
              {codeSubmitted && (
                <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-8 text-center border border-green-500/30 rounded-3xl">
                  <div className="max-w-md">
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(34,197,94,0.4)]">
                      <ShieldCheck className="w-10 h-10 text-green-400" />
                    </div>
                    <h3 className="text-3xl font-black text-white mb-4">{t('modalSuccess')}</h3>
                    <p className="text-gray-300 mb-8 leading-relaxed">
                      {t('modalDesc')}
                    </p>
                    <Link href="/talent" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 text-black font-black hover:scale-105 transition-transform shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                      {t('btnDashboard')} <ChevronRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              )}

              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Code2 className="text-[#9B5DE5]" /> {t('challengeTitle')}
              </h2>
              <p className="text-white/50 mb-6">
                {t('challengeDesc')}
              </p>
              
              <div className="p-4 rounded-xl bg-black font-mono text-sm border border-white/10 mb-6 min-h-[150px] relative">
                <textarea 
                  className="w-full h-full bg-transparent text-white/80 focus:outline-none resize-none"
                  placeholder={t('placeholder')}
                  disabled={!envConnected || codeSubmitted}
                />
                {!envConnected && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm rounded-xl">
                    <button 
                      onClick={handleConnect}
                      disabled={connecting}
                      className="px-6 py-3 rounded-lg bg-[#24292e] text-white font-bold flex items-center gap-3 hover:bg-[#2f363d] transition-colors border border-white/10"
                    >
                      {connecting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Terminal className="w-5 h-5" />}
                      {connecting ? t('btnConnecting') : t('btnConnect')}
                    </button>
                  </div>
                )}
              </div>

              <button 
                onClick={handleValidation}
                disabled={validating || !envConnected || codeSubmitted}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-[#00F5FF] to-[#9B5DE5] text-black font-bold hover:opacity-90 transition-all disabled:opacity-30 disabled:grayscale flex items-center justify-center gap-2"
              >
                {validating && <Loader2 className="w-5 h-5 animate-spin" />}
                {validating ? t('btnAuditing') : t('btnAudit')}
              </button>
            </div>
          </div>

          {/* Sidebar Modules */}
          <div className="w-full md:w-80 flex-shrink-0">
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 sticky top-28">
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5" /> {t('sidebarTitle')}
              </h3>

              <div className="space-y-4">
                {[
                  { id: 1, title: isM1 ? "Introducción a Escrow" : "Intro a LLMs", locked: false },
                  { id: 2, title: isM1 ? "Seguridad y Reentrancy" : "Prompt Engineering", locked: false },
                  { id: 3, title: isM1 ? "Optimización de Gas" : "Fine-tuning básico", locked: false },
                  { id: 4, title: t('challengeTitle'), locked: false },
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
                  {t('unlockPass')}
                </p>
                <Link href="/early-pass" className="w-full h-10 rounded-lg border border-[#9B5DE5] text-[#9B5DE5] flex items-center justify-center text-sm font-bold hover:bg-[#9B5DE5]/10 transition-colors">
                  {t('btnPass')}
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
