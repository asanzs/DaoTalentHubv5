"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Compass, ShieldCheck, Hexagon, Fingerprint, Activity } from "lucide-react";
import { fetchTalentSbts, SbtItem } from "@/lib/mocks/service";

export default function PassportPage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sbts, setSbts] = useState<SbtItem[]>([]);
  const [selectedSbt, setSelectedSbt] = useState<SbtItem | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchTalentSbts();
      setSbts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    loadData();
  }, [loadData]);

  if (!mounted) return null;

  return (
    <div className="space-y-8 pb-24">
      <div className="flex items-center gap-3 mb-6">
        <Compass className="w-8 h-8 text-[#9B5DE5]" />
        <div>
          <h2 className="text-3xl font-black text-white">Identity Passport (SBTs)</h2>
          <p className="text-gray-400">Tus credenciales inmutables validadas on-chain mediante Proof of Work.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Verification Summary Card */}
        <div className="md:col-span-1 p-8 rounded-3xl bg-white/5 border border-white/10 shadow-xl space-y-6">
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full border-4 border-[#9B5DE5] flex items-center justify-center p-1 relative">
              <div className="w-full h-full bg-[#9B5DE5]/20 rounded-full flex items-center justify-center">
                <Fingerprint className="w-10 h-10 text-[#9B5DE5]" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1.5 border-4 border-[#0B0C10]">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-black text-white">Trust Score</h3>
            <p className="text-4xl font-black font-mono text-[#00F5FF] mt-2">98.5<span className="text-lg text-gray-500">/100</span></p>
          </div>

          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Identidad Verificada</span>
              <span className="text-green-400 font-bold">World ID</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Total SBTs Obtenidos</span>
              <span className="text-white font-bold">{sbts.length}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400">Red Principal</span>
              <span className="text-[#0052FF] font-bold">Base L2</span>
            </div>
          </div>
        </div>

        {/* SBT Grid */}
        <div className="md:col-span-2">
          {loading ? (
             <div className="grid grid-cols-2 gap-4">
               {[1,2,3,4].map(i => <div key={i} className="h-32 bg-white/5 rounded-2xl animate-pulse" />)}
             </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sbts.map((sbt) => (
                <div 
                  key={sbt.id} 
                  onClick={() => setSelectedSbt(sbt)}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#9B5DE5]/50 cursor-pointer transition-all flex items-start gap-4 group"
                >
                  <div className="text-3xl bg-black/40 p-3 rounded-xl border border-white/5 group-hover:scale-110 transition-transform">
                    {sbt.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm leading-tight mb-1">{sbt.name}</h4>
                    <span className="text-[10px] text-[#9B5DE5] uppercase font-bold tracking-wider">{sbt.platform}</span>
                    <p className="text-[9px] text-gray-500 font-mono mt-2 truncate max-w-[120px]">{sbt.sig}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* SBT Detail Modal */}
      {selectedSbt && (
        <div className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-[#0B0C10] border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#9B5DE5]/20 blur-3xl rounded-full"></div>
            
            <div className="flex justify-center mb-6 relative z-10">
              <div className="w-20 h-20 bg-gradient-to-br from-[#9B5DE5] to-[#00F5FF] p-0.5 rounded-2xl rotate-3 hover:rotate-0 transition-transform">
                <div className="w-full h-full bg-[#0B0C10] rounded-[15px] flex items-center justify-center text-4xl">
                  {selectedSbt.icon}
                </div>
              </div>
            </div>

            <h3 className="text-xl font-black text-white text-center mb-1">{selectedSbt.name}</h3>
            <p className="text-center text-[#9B5DE5] text-sm font-bold mb-6">{selectedSbt.platform}</p>

            <div className="space-y-3 bg-black/50 p-4 rounded-xl border border-white/5 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Issuer</span>
                <span className="text-white font-medium text-right max-w-[200px]">{selectedSbt.issuer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Schema</span>
                <span className="text-white font-medium text-right max-w-[200px]">{selectedSbt.schema}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Network</span>
                <span className="text-white font-medium">{selectedSbt.network}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-white/5">
                <span className="text-gray-500">Tx Signature</span>
                <span className="text-[#00F5FF] font-mono">{selectedSbt.sig}</span>
              </div>
            </div>

            <button 
              onClick={() => setSelectedSbt(null)}
              className="mt-6 w-full py-3 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all"
            >
              Cerrar Detalles
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
