import React from "react";
import { useTranslations } from "next-intl";
import { Download, PieChart, LineChart, Target } from "lucide-react";

export default function DataRoomPage() {
  const t = useTranslations('dataRoom');

  return (
    <div className="min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between mb-16">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">{t('title')}</h1>
            <p className="text-gray-400 text-lg">{t('subtitle')}</p>
          </div>
          <button className="mt-6 md:mt-0 px-6 py-3 rounded-full bg-gradient-to-r from-[#00F5FF]/20 to-transparent border border-[#00F5FF]/50 text-[#00F5FF] font-bold flex items-center gap-2 hover:bg-[#00F5FF]/30 transition-colors">
            <Download className="w-4 h-4" /> {t('download')}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02]">
            <PieChart className="w-8 h-8 text-[#9B5DE5] mb-6" />
            <h3 className="text-xl font-bold text-white mb-4">{t('capTable')}</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm"><span className="text-gray-400">Early Backers</span><span className="text-white font-mono">15%</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-400">Team & Advisors</span><span className="text-white font-mono">20%</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-400">Ecosystem / DAO</span><span className="text-white font-mono">65%</span></div>
            </div>
          </div>
          
          <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02]">
            <Target className="w-8 h-8 text-[#00F5FF] mb-6" />
            <h3 className="text-xl font-bold text-white mb-4">{t('roadmap')}</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>• Q3: Smart Match V2 Launch</li>
              <li>• Q3: B2B Escrow Protocol Audit</li>
              <li>• Q4: Public TGE & DAO Formation</li>
            </ul>
          </div>

          <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02]">
            <LineChart className="w-8 h-8 text-white mb-6" />
            <h3 className="text-xl font-bold text-white mb-4">{t('tokenomics')}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              El modelo deflacionario está atado al staking de las agencias y corporaciones. Las comisiones del 0% se logran aportando liquidez permanente al protocolo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
