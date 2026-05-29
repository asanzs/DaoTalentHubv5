import React from "react";
import { useTranslations } from "next-intl";
import { Brain, ArrowRight, CheckCircle2 } from "lucide-react";

export default function UniversityPage() {
  const t = useTranslations('university');

  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#00F5FF]/20 to-transparent flex items-center justify-center rounded-2xl border border-[#00F5FF]/30 mb-6">
            <Brain className="w-8 h-8 text-[#00F5FF]" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">{t('title')}</h1>
          <p className="text-xl text-gray-400">{t('subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors group">
            <h3 className="text-2xl font-bold text-white mb-4">{t('courseM1')}</h3>
            <div className="flex gap-4 mb-8">
              <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400 flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-[#00F5FF]"/> {t('validated')}</span>
              <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400 flex items-center gap-1"><Brain className="w-3 h-3 text-[#9B5DE5]"/> {t('sbt')}</span>
            </div>
            <button className="w-full py-3 rounded-full border border-white/20 text-white font-bold group-hover:bg-white group-hover:text-black transition-all flex justify-center items-center gap-2">
              {t('startCourse')} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
