import React from "react";
import { useTranslations } from "next-intl";
import { Gem, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export default function EarlyPassPage() {
  const t = useTranslations('earlyPass');
  
  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] to-[#9B5DE5] mb-6">
          {t('title')}
        </h1>
        <p className="text-xl text-gray-400">{t('subtitle')}</p>
      </div>

      <div className="max-w-3xl mx-auto p-1 bg-gradient-to-br from-[#00F5FF] to-[#9B5DE5] rounded-[2.5rem]">
        <div className="bg-black rounded-[2.4rem] p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">{t('benefits')}</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-300"><Gem className="w-5 h-5 text-[#00F5FF]" /> {t('b1')}</li>
                <li className="flex items-center gap-3 text-gray-300"><ShieldCheck className="w-5 h-5 text-[#9B5DE5]" /> {t('b2')}</li>
                <li className="flex items-center gap-3 text-gray-300"><Zap className="w-5 h-5 text-[#00F5FF]" /> {t('b3')}</li>
              </ul>
            </div>
            <div className="flex flex-col justify-center items-center p-8 bg-white/5 rounded-3xl border border-white/10">
              <div className="text-4xl font-black text-white mb-2">0.5 ETH</div>
              <div className="text-gray-500 mb-8">Limitado a 1000 pases</div>
              <button className="w-full py-4 rounded-full bg-white text-black font-black hover:scale-105 transition-transform flex items-center justify-center gap-2">
                {t('mint')} <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
