import React from "react";
import { useTranslations } from "next-intl";
import { Brain, ArrowRight, BookOpen, GraduationCap, Lock, Star } from "lucide-react";
import Link from "next/link";

export default function UniversityPage() {
  const t = useTranslations('universityV2.hub');

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 bg-[#020408]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#00F5FF]/10 blur-[100px] pointer-events-none rounded-full"></div>
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#00F5FF]/20 to-transparent flex items-center justify-center rounded-2xl border border-[#00F5FF]/30 mb-6 relative z-10">
            <Brain className="w-8 h-8 text-[#00F5FF]" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 relative z-10">{t('title')}</h1>
          <p className="text-xl text-gray-400 relative z-10">{t('subtitle')}</p>
        </div>

        {/* Dual-Sided Bento Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* LEARN-TO-EARN (Students) */}
          <div className="p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-transparent relative overflow-hidden group">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-[#00F5FF]/10 border border-[#00F5FF]/20">
                <GraduationCap className="w-6 h-6 text-[#00F5FF]" />
              </div>
              <h2 className="text-2xl font-black text-white">{t('students.title')}</h2>
            </div>
            <p className="text-gray-400 mb-8">{t('students.desc')}</p>

            <div className="space-y-4 mb-8">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 hover:border-[#00F5FF]/30 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-white font-bold">{t('students.course1')}</h3>
                  <Star className="w-4 h-4 text-[#00F5FF] fill-[#00F5FF]/20" />
                </div>
                <p className="text-xs text-[#00F5FF] font-medium tracking-wide uppercase flex items-center gap-1">
                  ✨ {t('students.badge')}
                </p>
                <Link href="/university/course/m1" className="mt-4 w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-bold flex justify-center items-center gap-2 transition-all">
                  {t('students.btn')} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 hover:border-[#9B5DE5]/30 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-white font-bold">{t('students.course2')}</h3>
                  <Star className="w-4 h-4 text-[#9B5DE5] fill-[#9B5DE5]/20" />
                </div>
                <p className="text-xs text-[#9B5DE5] font-medium tracking-wide uppercase flex items-center gap-1">
                  ✨ {t('students.badge')}
                </p>
                <Link href="/university/course/ai-101" className="mt-4 w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-bold flex justify-center items-center gap-2 transition-all">
                  {t('students.btn')} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* TEACH-TO-EARN (Teachers) */}
          <div className="p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.02] to-transparent relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <BookOpen className="w-32 h-32 text-white" />
            </div>
            
            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="p-3 rounded-xl bg-[#fca311]/10 border border-[#fca311]/20">
                <BookOpen className="w-6 h-6 text-[#fca311]" />
              </div>
              <h2 className="text-2xl font-black text-white">{t('teachers.title')}</h2>
            </div>
            <p className="text-gray-400 mb-8 relative z-10">{t('teachers.desc')}</p>

            <div className="p-6 rounded-2xl bg-black/60 border border-red-500/20 flex flex-col items-center justify-center text-center mt-auto h-[220px] relative z-10 backdrop-blur-sm">
              <Lock className="w-10 h-10 text-red-400 mb-4" />
              <p className="text-red-400 font-bold mb-4">{t('teachers.lockText')}</p>
              <button disabled className="w-full py-3 rounded-full border border-white/10 bg-white/5 text-gray-500 font-bold cursor-not-allowed">
                {t('teachers.btn')}
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
