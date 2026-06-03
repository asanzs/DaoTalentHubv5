import { useTranslations } from 'next-intl';
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Briefcase, ShieldCheck, Play, Scale, ChevronRight, CheckCircle2, Coins, AlertCircle, Landmark } from "lucide-react";
import { 
  fetchEscrowList, 
  disburseEscrow, 
  submitMilestone, 
  createDisputeFromEscrow, 
  fetchB2bBalance, 
  EscrowContract 
} from "@/lib/mocks/service";

export default function B2bProjectsPage() {
  const tApp = useTranslations('app');
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [escrows, setEscrows] = useState<EscrowContract[]>([]);
  const [b2bBalance, setB2bBalance] = useState<number>(0);
  
  // Auditing / Loading states
  const [auditingId, setAuditingId] = useState<string | null>(null);
  const [releasingId, setReleasingId] = useState<string | null>(null);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [showConsole, setShowConsole] = useState(false);

  // Dispute Modal state
  const [disputeProject, setDisputeProject] = useState<EscrowContract | null>(null);
  const [disputeTitle, setDisputeTitle] = useState("Entrega deficiente de código");
  const [disputeDesc, setDisputeDesc] = useState("El entregable no compila en el entorno de producción y excede los límites de consumo de gas.");
  const [submittingDispute, setSubmittingDispute] = useState(false);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [list, balance] = await Promise.all([
        fetchEscrowList(),
        fetchB2bBalance()
      ]);
      setEscrows(list);
      setB2bBalance(balance);
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

  // Simulate developer submitting milestone for B2B to review
  const handleDeveloperSubmit = async (escrowId: string, milestoneId: string) => {
    try {
      await submitMilestone(escrowId, milestoneId);
      await loadData();
      alert("Milestone marcado como 'Entregado' por el Desarrollador para tu revisión.");
    } catch (err: any) {
      alert(err.message || "Error");
    }
  };

  const handleAuditSandbox = async (escrow: EscrowContract, milestoneId: string) => {
    setAuditingId(milestoneId);
    setShowConsole(true);
    setConsoleLogs([
      `[${new Date().toLocaleTimeString()}] Iniciando Sandbox IA para auditoría de entregable...`,
      `[${new Date().toLocaleTimeString()}] Descargando código desde repositorio del developer...`
    ]);

    const logs = [
      "Escaneando vulnerabilidades de seguridad... Cero vulnerabilidades encontradas.",
      "Compilando código Web3... Compilación CORRECTA.",
      "Ejecutando tests automáticos del escrow (15/15)... PASADOS.",
      "Verificación de consumo de Gas... Óptimo (Tier A).",
      "Auditoría finalizada. Match Score del entregable: 98/100. Aprobación recomendada."
    ];

    for (let i = 0; i < logs.length; i++) {
      await new Promise(r => setTimeout(r, 400));
      setConsoleLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${logs[i]}`]);
    }

    setAuditingId(null);
    setTimeout(() => setShowConsole(false), 2000);
  };

  const handleReleaseEscrow = async (escrowId: string) => {
    setReleasingId(escrowId);
    try {
      await disburseEscrow(escrowId);
      await loadData();
      alert("Fondos liberados con éxito del Smart Contract de Custodia. El pago se ha transferido al desarrollador.");
    } catch (err: any) {
      alert(err.message || "Error al liberar");
    } finally {
      setReleasingId(null);
    }
  };

  const handleReleaseMilestone = async (escrowId: string, milestoneId: string) => {
    setReleasingId(milestoneId);
    try {
      await disburseEscrow(escrowId, milestoneId);
      await loadData();
      alert("Hito liberado con éxito. Los fondos del hito se han transferido al desarrollador.");
    } catch (err: any) {
      alert(err.message || "Error al liberar");
    } finally {
      setReleasingId(null);
    }
  };

  const handleOpenDisputeModal = (project: EscrowContract) => {
    setDisputeProject(project);
  };

  const handleCreateDispute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!disputeProject) return;

    setSubmittingDispute(true);
    try {
      await createDisputeFromEscrow(
        disputeProject.id, 
        disputeTitle, 
        disputeProject.amount, 
        disputeDesc
      );
      setDisputeProject(null);
      await loadData();
      alert("Disputa abierta. El smart contract ha sido bloqueado temporalmente y derivado al jurado en el Tribunal.");
    } catch (err: any) {
      alert(err.message || "Error");
    } finally {
      setSubmittingDispute(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="space-y-8 pb-24 relative">
      
      {/* Top Header & Balance */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Briefcase className="w-8 h-8 text-[#9B5DE5]" />
          <div>
            <h2 className="text-3xl font-black text-white font-sans">Proyectos y Custodia (Escrow)</h2>
            <p className="text-gray-400 text-sm">{tApp('manageEscrowContracts')}</p>
          </div>
        </div>

        {/* Escrow Balance HUD */}
        <div className="flex items-center gap-4 bg-white/5 px-6 py-4 rounded-2xl border border-white/10 shrink-0">
          <Landmark className="w-5 h-5 text-[#9B5DE5]" />
          <div>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold block">Tu Cuenta de Custodia</span>
            <span className="text-xl font-black text-white font-mono">${b2bBalance.toLocaleString()} <span className="text-xs text-gray-400">USD</span></span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-6">
          <div className="h-48 bg-white/5 rounded-3xl" />
          <div className="h-48 bg-white/5 rounded-3xl" />
        </div>
      ) : escrows.length === 0 ? (
        <div className="p-12 text-center rounded-3xl border border-white/10 bg-white/5">
          <AlertCircle className="w-12 h-12 text-gray-500 mx-auto mb-4 opacity-50" />
          <p className="text-gray-400 text-sm">No tienes contratos activos en este momento.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {escrows.map(escrow => (
            <div key={escrow.id} className="p-8 rounded-3xl bg-white/5 border border-white/10 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#9B5DE5] to-[#00F5FF]"></div>
              
              {/* Main Card Info */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
                <div>
                  <span className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider mb-2.5 inline-block ${
                    escrow.status === 'Funded' ? 'bg-amber-500/10 text-amber-400' :
                    escrow.status === 'Delivered' ? 'bg-blue-500/10 text-blue-400' :
                    escrow.status === 'Disbursed' ? 'bg-green-500/10 text-green-400' :
                    'bg-white/5 text-gray-400'
                  }`}>
                    {escrow.status === 'Funded' ? 'Fondeado' :
                     escrow.status === 'Delivered' ? 'Entregado (Auditoría Pendiente)' :
                     escrow.status === 'Disbursed' ? 'Completado y Liberado' : 'Pendiente de Fondos'}
                  </span>
                  <h3 className="text-2xl font-black text-white">{escrow.title}</h3>
                  <p className="text-xs text-gray-400 mt-1.5 font-medium">Contratista: <span className="text-[#00F5FF] font-bold">{escrow.talentName}</span></p>
                </div>
                
                <div className="text-left lg:text-right">
                  <span className="block text-[10px] text-gray-500 uppercase font-black tracking-widest">Fondos Totales</span>
                  <span className="text-3xl font-black text-white font-mono">${escrow.amount.toLocaleString()} <span className="text-xs text-gray-400">USD</span></span>
                </div>
              </div>

              {/* Milestones Steps */}
              <div className="space-y-3 mb-8">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Hitos del Contrato (Milestones)</h4>
                
                {escrow.milestones.map((m) => (
                  <div key={m.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5">
                    <div className="flex items-center gap-3">
                      {m.status === 'Completed' ? (
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                      ) : m.status === 'Submitted' ? (
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse" />
                      ) : (
                        <div className="w-2.5 h-2.5 rounded-full bg-gray-600" />
                      )}
                      <div>
                        <span className="text-sm font-bold text-white block leading-tight">{m.title}</span>
                        <span className="text-[10px] text-gray-500 font-medium">Asignado: ${m.amount} USD</span>
                      </div>
                    </div>

                    <div className="mt-3 sm:mt-0 flex gap-2">
                      {/* Simula que el desarrollador entrega para que nosotros (B2B) podamos probar el flujo */}
                      {m.status === 'Pending' && (
                        <button 
                          onClick={() => handleDeveloperSubmit(escrow.id, m.id)}
                          className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-gray-300 hover:bg-white/10"
                        >
                          Simular Entrega Dev
                        </button>
                      )}

                      {m.status === 'Submitted' && (
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleAuditSandbox(escrow, m.id)}
                            disabled={auditingId === m.id}
                            className="px-3.5 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-400 hover:bg-blue-500/20 flex items-center gap-1"
                          >
                            <Play className="w-3 h-3" /> {auditingId === m.id ? "Auditando..." : "Auditar Sandbox IA"}
                          </button>
                          <button 
                            onClick={() => handleReleaseMilestone(escrow.id, m.id)}
                            disabled={releasingId === m.id}
                            className="px-3.5 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-[10px] font-bold text-green-400 hover:bg-green-500/20 flex items-center gap-1"
                          >
                            <ShieldCheck className="w-3 h-3" /> {releasingId === m.id ? "Liberando..." : "Liberar Hito"}
                          </button>
                        </div>
                      )}

                      {m.status === 'Completed' && (
                        <span className="px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-[10px] text-green-400 font-bold uppercase">Liberado</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/5">
                {escrow.status === 'Delivered' && (
                  <button 
                    onClick={() => handleReleaseEscrow(escrow.id)}
                    disabled={releasingId === escrow.id}
                    className="flex-1 py-4 rounded-xl bg-gradient-to-r from-[#9B5DE5] to-[#00F5FF] text-black font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4" /> {releasingId === escrow.id ? "Liberando..." : "Autorizar Pago Escrow"}
                  </button>
                )}
                
                {escrow.status !== 'Disbursed' && (
                  <button 
                    onClick={() => handleOpenDisputeModal(escrow)}
                    className="py-4 px-6 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-black text-xs uppercase tracking-widest hover:bg-red-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Scale className="w-4 h-4" /> Abrir Disputa
                  </button>
                )}

                {escrow.status === 'Disbursed' && (
                  <div className="w-full p-4 bg-green-500/10 text-green-400 border border-green-500/20 rounded-xl text-center text-xs font-bold flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-5 h-5" /> Contrato finalizado. Todos los fondos liberados al Desarrollador.
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* AI Sandbox Console Terminal */}
      {showConsole && (
        <div className="fixed bottom-6 right-6 w-full max-w-md bg-[#0d1117] border border-white/10 rounded-2xl shadow-2xl z-[99999] overflow-hidden flex flex-col">
          <div className="bg-black/50 border-b border-white/10 p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-green-400" />
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Sandbox Audit Core</span>
            </div>
          </div>
          <div className="p-4 h-56 overflow-y-auto font-mono text-[10px] text-[#00F5FF] space-y-1">
            {consoleLogs.map((log, idx) => <div key={idx}>{log}</div>)}
            <div className="animate-pulse">_</div>
          </div>
        </div>
      )}

      {/* Dispute Modal */}
      {disputeProject && (
        <div className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-[#0B0C10] border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl relative">
            <h3 className="text-xl font-black text-white mb-2">Abrir Disputa de Smart Contract</h3>
            <p className="text-xs text-gray-400 mb-6">{tApp('blockEscrowFunds')}</p>
            
            <form onSubmit={handleCreateDispute} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{tApp('disputeTitle')}</label>
                <input 
                  type="text" 
                  value={disputeTitle} 
                  onChange={(e) => setDisputeTitle(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500/50"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{tApp('conflictDescEvidence')}</label>
                <textarea 
                  value={disputeDesc} 
                  onChange={(e) => setDisputeDesc(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white h-24 focus:outline-none focus:border-red-500/50 resize-none"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setDisputeProject(null)} className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 font-bold text-xs uppercase tracking-widest hover:bg-white/5">Cancelar</button>
                <button type="submit" disabled={submittingDispute} className="flex-1 py-3 rounded-xl bg-red-500 text-white font-black text-xs uppercase tracking-widest hover:opacity-90">
                  {submittingDispute ? "Creando..." : "Iniciar Disputa"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
