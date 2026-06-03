"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Scale, AlertCircle, ShieldAlert, ArrowRight, CheckCircle2, ChevronRight, FileText } from "lucide-react";
import { 
  fetchDisputesList, 
  createDisputeFromEscrow, 
  fetchEscrowList, 
  Dispute, 
  EscrowContract 
} from "@/lib/mocks/service";

export default function B2bDisputesPage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [escrows, setEscrows] = useState<EscrowContract[]>([]);

  // Form states for creating a new dispute
  const [selectedEscrowId, setSelectedEscrowId] = useState("");
  const [title, setTitle] = useState("Entrega incompleta de módulo de pagos");
  const [desc, setDesc] = useState("El desarrollador no integró los Webhooks del procesador de pagos (Stripe) y el sistema no detecta las suscripciones en staging.");
  const [submitting, setSubmitting] = useState(false);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [disList, escList] = await Promise.all([
        fetchDisputesList(),
        fetchEscrowList()
      ]);
      setDisputes(disList);
      
      // Only allow disputing funded or delivered escrows
      const eligibleEscrows = escList.filter(e => e.status === 'Funded' || e.status === 'Delivered');
      setEscrows(eligibleEscrows);
      if (eligibleEscrows.length > 0 && !selectedEscrowId) {
        setSelectedEscrowId(eligibleEscrows[0].id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [selectedEscrowId]);

  useEffect(() => {
    setMounted(true);
    loadData();
  }, [loadData]);

  const handleCreateDispute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEscrowId) {
      alert("Por favor, selecciona un contrato activo para disputar.");
      return;
    }

    const selectedEscrow = escrows.find(e => e.id === selectedEscrowId);
    if (!selectedEscrow) return;

    setSubmitting(true);
    try {
      await createDisputeFromEscrow(selectedEscrowId, title, selectedEscrow.amount, desc);
      setTitle("");
      setDesc("");
      await loadData();
      alert("Disputa creada correctamente y enviada al Tribunal descentralizado.");
    } catch (err: any) {
      alert(err.message || "Error al crear la disputa");
    } finally {
      setSubmitting(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="space-y-8 pb-24">
      {/* Title */}
      <div className="flex items-center gap-3">
        <Scale className="w-8 h-8 text-[#EF4444]" />
        <div>
          <h2 className="text-3xl font-black text-white">Centro de Disputas Corporativas</h2>
          <p className="text-gray-400">Inicia reclamaciones de Smart Contracts bloqueados y haz el seguimiento de resoluciones de jurados.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        
        {/* Form to Open Dispute */}
        <div className="lg:col-span-2 p-8 rounded-3xl bg-white/5 border border-white/10 shadow-xl self-start relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#EF4444]"></div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-6">Abrir Nueva Reclamación</h3>

          <form onSubmit={handleCreateDispute} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Selecciona un Contrato Activo</label>
              {escrows.length === 0 ? (
                <div className="p-3 rounded-lg bg-black/40 border border-white/5 text-xs text-gray-500">
                  No tienes contratos financiados elegibles para disputar en este momento.
                </div>
              ) : (
                <select 
                  value={selectedEscrowId}
                  onChange={(e) => setSelectedEscrowId(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-red-500/50 cursor-pointer"
                >
                  {escrows.map(esc => (
                    <option key={esc.id} value={esc.id}>{esc.title} (${esc.amount} USD)</option>
                  ))}
                </select>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Título del conflicto</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500/50"
                required
                placeholder="Ej. Código no compatible"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Evidencias y Argumentos</label>
              <textarea 
                value={desc} 
                onChange={(e) => setDesc(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white h-24 focus:outline-none focus:border-red-500/50 resize-none"
                required
                placeholder="Ingresa los fallos en tests, capturas o commits fallidos..."
              />
            </div>

            <button 
              type="submit" 
              disabled={submitting || escrows.length === 0}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {submitting ? "Procesando..." : "Crear Disputa e Inmovilizar Escrow"} <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Active Corporate Disputes List */}
        <div className="lg:col-span-3 space-y-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-2">Historial de Reclamaciones Activas</h3>
          
          {loading ? (
            <div className="animate-pulse h-48 bg-white/5 rounded-3xl" />
          ) : disputes.length === 0 ? (
            <div className="p-8 text-center rounded-3xl border border-white/10 bg-white/5 text-xs text-gray-500">
              No tienes disputas abiertas en el tribunal.
            </div>
          ) : (
            <div className="space-y-6">
              {disputes.map(dispute => {
                const totalVotes = dispute.votesDev + dispute.votesB2b;
                const devPercent = totalVotes > 0 ? (dispute.votesDev / totalVotes) * 100 : 50;
                const b2bPercent = totalVotes > 0 ? (dispute.votesB2b / totalVotes) * 100 : 50;

                return (
                  <div key={dispute.id} className="p-6 rounded-3xl bg-white/5 border border-white/10 shadow-xl space-y-4">
                    
                    {/* Header */}
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider mb-2 inline-block ${
                          dispute.status === 'Open' ? 'bg-amber-500/10 text-amber-400' :
                          dispute.status === 'Resolved_B2B' ? 'bg-green-500/10 text-green-400' :
                          'bg-red-500/10 text-red-400'
                        }`}>
                          {dispute.status === 'Open' ? 'Juicio Abierto' :
                           dispute.status === 'Resolved_B2B' ? 'Resuelto: Favor Empresa' : 'Resuelto: Favor Dev'}
                        </span>
                        <h4 className="font-bold text-white text-lg leading-tight">{dispute.title}</h4>
                        <p className="text-xs text-gray-500 mt-1 font-mono">Contrato ID: {dispute.escrowId}</p>
                      </div>
                      
                      <div className="text-right shrink-0">
                        <span className="block text-[10px] text-gray-500 uppercase font-black tracking-widest">En Garantía</span>
                        <span className="text-xl font-mono font-black text-[#EF4444]">${dispute.amount}</span>
                      </div>
                    </div>

                    {/* Evidencia */}
                    <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-xs text-gray-300">
                      <div className="flex items-center gap-2 mb-2 font-bold text-white">
                        <FileText className="w-4 h-4 text-[#EF4444]" /> Tu Evidencia Presentada:
                      </div>
                      <p className="italic">"{dispute.b2bEvidence}"</p>
                    </div>

                    {/* Votos del Jurado */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-wider">
                        <span className="text-[#00F5FF]">Developer ({devPercent.toFixed(1)}%)</span>
                        <span className="text-[#9B5DE5]">Tu Empresa ({b2bPercent.toFixed(1)}%)</span>
                      </div>
                      
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden flex">
                        <div className="h-full bg-[#00F5FF] transition-all" style={{ width: `${devPercent}%` }} />
                        <div className="h-full bg-[#9B5DE5] transition-all" style={{ width: `${b2bPercent}%` }} />
                      </div>
                      
                      <div className="flex justify-between text-[9px] text-gray-500 uppercase font-bold">
                        <span>{dispute.votesDev} Votos</span>
                        <span>{dispute.votesB2b} Votos</span>
                      </div>
                    </div>

                    {dispute.status === 'Open' && (
                      <div className="p-3 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/20 text-[10px] text-red-300 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 animate-pulse" />
                        <span>Esperando resoluciones adicionales de los jurados de la DAO. El saldo del Escrow sigue retenido.</span>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
