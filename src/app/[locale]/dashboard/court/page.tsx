"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Award, AlertCircle, Scale, ShieldCheck, ThumbsUp, ThumbsDown, Code2, Briefcase } from "lucide-react";
import { fetchDisputesList, voteOnDispute, Dispute, fetchUserBalances, UserBalances } from "@/lib/mocks/service";

export default function CourtPage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [balances, setBalances] = useState<UserBalances>({ tal: 0, veTal: 0 });
  const [votingId, setVotingId] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [disputesList, userBalances] = await Promise.all([
        fetchDisputesList(),
        fetchUserBalances()
      ]);
      setDisputes(disputesList);
      setBalances(userBalances);
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

  const handleVote = async (disputeId: string, option: 'DEV' | 'B2B') => {
    if (balances.veTal <= 0) {
      alert("Necesitas tener veTAL (Poder de voto por Staking) para poder votar en el tribunal.");
      return;
    }
    
    setVotingId(disputeId);
    try {
      await voteOnDispute(disputeId, option, balances.veTal);
      await loadData();
      alert("¡Voto registrado con éxito!");
    } catch (err: any) {
      alert(err.message || "Error al votar");
    } finally {
      setVotingId(null);
    }
  };

  if (!mounted) return null;

  return (
    <div className="space-y-8 pb-24">
      <div className="flex items-center gap-3 mb-6">
        <Scale className="w-8 h-8 text-[#EF4444]" />
        <div>
          <h2 className="text-3xl font-black text-white">Tribunal de Justicia (Kleros Style)</h2>
          <p className="text-gray-400">Resuelve disputas de contratos utilizando tu poder de voto (veTAL) y gana recompensas.</p>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-4 mb-8">
        <AlertCircle className="w-6 h-6 text-amber-500 shrink-0" />
        <p className="text-sm text-amber-200">
          Como usuario con <strong>{balances.veTal.toFixed(2)} veTAL</strong>, tu voto tiene peso en la resolución de disputas.
          Los jurados que voten a favor de la opción ganadora recibirán recompensas en $TAL.
        </p>
      </div>

      {loading ? (
        <div className="animate-pulse h-64 bg-white/5 rounded-3xl w-full"></div>
      ) : disputes.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No hay disputas activas en este momento.</p>
      ) : (
        <div className="space-y-8">
          {disputes.map(dispute => {
            const totalVotes = dispute.votesDev + dispute.votesB2b;
            const devPercent = totalVotes > 0 ? (dispute.votesDev / totalVotes) * 100 : 50;
            const b2bPercent = totalVotes > 0 ? (dispute.votesB2b / totalVotes) * 100 : 50;
            const hasVoted = dispute.voters.includes("current_user");

            return (
              <div key={dispute.id} className="p-8 rounded-3xl bg-white/5 border border-white/10 shadow-xl">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider mb-3 inline-block ${
                      dispute.status === 'Open' ? 'bg-amber-500/10 text-amber-400' : 'bg-green-500/10 text-green-400'
                    }`}>
                      {dispute.status === 'Open' ? 'Disputa Abierta' : 'Resuelta'}
                    </span>
                    <h3 className="text-2xl font-black text-white">{dispute.title}</h3>
                    <p className="text-sm text-gray-400 mt-2">{dispute.description}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="block text-xs text-gray-500 uppercase font-bold tracking-widest">En disputa</span>
                    <span className="text-2xl font-black text-[#EF4444]">${dispute.amount}</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="p-6 rounded-2xl bg-[#00F5FF]/5 border border-[#00F5FF]/10">
                    <h4 className="text-sm font-bold text-[#00F5FF] flex items-center gap-2 mb-3">
                      <Code2 className="w-4 h-4" /> Argumento del Developer
                    </h4>
                    <p className="text-sm text-gray-300 italic">"{dispute.devEvidence}"</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-[#9B5DE5]/5 border border-[#9B5DE5]/10">
                    <h4 className="text-sm font-bold text-[#9B5DE5] flex items-center gap-2 mb-3">
                      <Briefcase className="w-4 h-4" /> Argumento de B2B
                    </h4>
                    <p className="text-sm text-gray-300 italic">"{dispute.b2bEvidence}"</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                    <span className="text-[#00F5FF]">Developer ({devPercent.toFixed(1)}%)</span>
                    <span className="text-[#9B5DE5]">Empresa B2B ({b2bPercent.toFixed(1)}%)</span>
                  </div>
                  <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden flex">
                    <div className="h-full bg-[#00F5FF] transition-all duration-500" style={{ width: `${devPercent}%` }} />
                    <div className="h-full bg-[#9B5DE5] transition-all duration-500" style={{ width: `${b2bPercent}%` }} />
                  </div>
                </div>

                {dispute.status === 'Open' && (
                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/5">
                    {hasVoted ? (
                      <div className="w-full text-center p-4 bg-green-500/10 text-green-400 rounded-xl font-bold border border-green-500/20 flex items-center justify-center gap-2">
                        <ShieldCheck className="w-5 h-5" />
                        Ya has emitido tu voto en esta disputa
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => handleVote(dispute.id, 'DEV')}
                          disabled={votingId === dispute.id}
                          className="flex-1 py-4 rounded-xl bg-[#00F5FF]/10 text-[#00F5FF] border border-[#00F5FF]/20 font-black text-sm uppercase tracking-widest hover:bg-[#00F5FF]/20 transition-all flex items-center justify-center gap-2"
                        >
                          <ThumbsUp className="w-4 h-4" /> Votar a favor del Developer
                        </button>
                        <button
                          onClick={() => handleVote(dispute.id, 'B2B')}
                          disabled={votingId === dispute.id}
                          className="flex-1 py-4 rounded-xl bg-[#9B5DE5]/10 text-[#9B5DE5] border border-[#9B5DE5]/20 font-black text-sm uppercase tracking-widest hover:bg-[#9B5DE5]/20 transition-all flex items-center justify-center gap-2"
                        >
                          <ThumbsDown className="w-4 h-4" /> Votar a favor de Empresa
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
