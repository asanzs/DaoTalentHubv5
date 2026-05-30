"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Briefcase, Code2, AlertTriangle, ArrowRight, ShieldCheck } from "lucide-react";
import { 
  fetchMissionsList, 
  applyToMission, 
  submitMissionDeliverable, 
  Mission
} from "@/lib/mocks/service";

export default function MissionsPage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [missions, setMissions] = useState<Mission[]>([]);
  
  const [applyingId, setApplyingId] = useState<string | null>(null);
  const [submittingId, setSubmittingId] = useState<string | null>(null);
  const [submissionMission, setSubmissionMission] = useState<Mission | null>(null);
  const [repoUrl, setRepoUrl] = useState("https://github.com/johndoe/defi-vault-audit");

  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [showConsole, setShowConsole] = useState(false);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchMissionsList();
      setMissions(data);
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

  const handleApplyMission = async (missionId: string) => {
    setApplyingId(missionId);
    try {
      await applyToMission(missionId);
      await loadData();
      alert("Applied to mission successfully!");
    } catch (err: any) {
      alert(err.message || "Application failed");
    } finally {
      setApplyingId(null);
    }
  };

  const handleDeliverMission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!submissionMission) return;

    const missionId = submissionMission.id;
    setSubmittingId(missionId);
    setShowConsole(true);
    setConsoleLogs([
      `[${new Date().toLocaleTimeString()}] Establishing link to AI Sandbox Oracle...`,
      `[${new Date().toLocaleTimeString()}] Git repository connection: CONNECTED to ${repoUrl}`,
    ]);

    const logTimeline = [
      "Running Static Analysis scan... OK",
      "Injecting compiler sandboxed container... OK",
      "Asserting Checks-Effects-Interactions compliance... PASSED",
      "AI Audit report score: 96/100",
      "[Consenso] Llamando a Oráculo de Auditores Pares...",
      "[Consenso] Firma 1 recibida: 0x8fa1...d354b2",
      "[Consenso] Consenso Híbrido AI + Peer aprobado con éxito.",
      "Alerting B2B smart contract safePay escrow release..."
    ];

    for (let i = 0; i < logTimeline.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 450));
      setConsoleLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${logTimeline[i]}`]);
    }

    try {
      await submitMissionDeliverable(missionId, repoUrl);
      setSubmissionMission(null);
      await loadData();
      alert("Deliverable submitted and audited!");
    } catch (err: any) {
      alert(err.message || "Submission failed");
    } finally {
      setSubmittingId(null);
      setTimeout(() => setShowConsole(false), 2500);
    }
  };

  if (!mounted) return null;

  return (
    <div className="space-y-8 pb-24 relative">
      <div className="flex items-center gap-3 mb-6">
        <Briefcase className="w-8 h-8 text-[#00F5FF]" />
        <div>
          <h2 className="text-3xl font-black text-white">Tablón de Misiones (Bounties)</h2>
          <p className="text-gray-400">Aplica a trabajos con Smart Match AI y cobra mediante Smart Contracts sin intermediarios.</p>
        </div>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-32 bg-white/5 rounded-3xl w-full"></div>
          <div className="h-32 bg-white/5 rounded-3xl w-full"></div>
        </div>
      ) : missions.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No missions found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {missions.map(mission => (
            <div key={mission.id} className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{mission.b2bAvatar}</div>
                    <div>
                      <h3 className="font-bold text-white text-lg leading-tight">{mission.title}</h3>
                      <p className="text-xs text-gray-500">{mission.b2bName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block font-black text-[#00F5FF]">${mission.rewardUsd.toLocaleString()}</span>
                    <span className="text-[10px] text-gray-500">+{mission.rewardTal} $TAL</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-400 mb-6 line-clamp-2">{mission.description}</p>
                
                <div className="mb-6 p-3 rounded-xl bg-black/40 border border-white/5 flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#9B5DE5]" />
                  <div className="text-xs">
                    <span className="text-gray-500 block uppercase font-bold text-[9px] tracking-wider">SBT Requerido (Proof of Work)</span>
                    <span className="text-white font-medium">{mission.requiredSbtName}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                <span className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                  mission.status === 'Open' ? 'bg-green-500/10 text-green-400' :
                  mission.status === 'Active' ? 'bg-amber-500/10 text-amber-400' :
                  'bg-blue-500/10 text-blue-400'
                }`}>
                  {mission.status}
                </span>

                {mission.status === 'Open' && (
                  <button
                    onClick={() => handleApplyMission(mission.id)}
                    disabled={applyingId === mission.id}
                    className="px-6 py-2.5 rounded-full bg-white text-black font-black text-xs hover:bg-gray-200 transition-all disabled:opacity-50"
                  >
                    {applyingId === mission.id ? 'Aplicando...' : 'Aplicar (Smart Match)'}
                  </button>
                )}

                {mission.status === 'Active' && (
                  <button
                    onClick={() => setSubmissionMission(mission)}
                    className="px-6 py-2.5 rounded-full bg-[#00F5FF]/10 text-[#00F5FF] border border-[#00F5FF]/20 font-black text-xs hover:bg-[#00F5FF]/20 transition-all"
                  >
                    Entregar (GitHub Repo)
                  </button>
                )}

                {(mission.status === 'Delivered' || mission.status === 'Disbursed') && (
                  <div className="flex items-center gap-2 text-green-400 text-xs font-bold">
                    <ShieldCheck className="w-4 h-4" />
                    Auditoría IA: {mission.auditScore}%
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* AI Submission Modal */}
      {submissionMission && (
        <div className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-[#0B0C10] border border-white/10 p-8 rounded-3xl w-full max-w-lg shadow-2xl">
            <h3 className="text-xl font-black text-white mb-2">Entregar Repositorio a Oráculo IA</h3>
            <p className="text-sm text-gray-400 mb-6">El Oráculo clonará, compilará y auditará tu código antes de liberar el Escrow.</p>
            
            <form onSubmit={handleDeliverMission} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">GitHub URL</label>
                <div className="relative">
                  <Code2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="url"
                    value={repoUrl}
                    onChange={e => setRepoUrl(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#00F5FF]/50"
                    required
                  />
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setSubmissionMission(null)} className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 font-bold text-sm hover:bg-white/5 transition-all">Cancelar</button>
                <button type="submit" disabled={submittingId !== null} className="flex-1 py-3 rounded-xl bg-[#00F5FF] text-black font-black text-sm hover:opacity-90 transition-all">
                  {submittingId ? 'Iniciando Sandbox...' : 'Ejecutar AI Audit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Console Terminal Sandbox */}
      {showConsole && (
        <div className="fixed bottom-6 right-6 w-full max-w-md bg-[#0d1117] border border-white/10 rounded-2xl shadow-2xl z-[99999] overflow-hidden flex flex-col animate-in slide-in-from-bottom-10">
          <div className="bg-black/50 border-b border-white/10 p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">AI Oracle Sandbox</span>
            </div>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
            </div>
          </div>
          <div className="p-4 h-64 overflow-y-auto font-mono text-[10px] sm:text-xs text-[#00F5FF] space-y-1">
            {consoleLogs.map((log, i) => (
              <div key={i}>{log}</div>
            ))}
            <div className="animate-pulse">_</div>
          </div>
        </div>
      )}
    </div>
  );
}
