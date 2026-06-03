"use client";
import { useTranslations } from 'next-intl';

import React, { useState, useEffect, useCallback } from "react";
import { Search, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { fetchEscrowList, Talent, EscrowContract } from "@/lib/mocks/service";
import { supabase } from "@/utils/supabase/client";
import { createEscrow } from "@/app/actions/b2b";

export default function TalentDirectoryPage() {
  const tApp = useTranslations('app');
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [talents, setTalents] = useState<Talent[]>([]);
  const [filteredTalents, setFilteredTalents] = useState<Talent[]>([]);
  
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("All");
  const [selectedSbt, setSelectedSbt] = useState("All");
  const [availability, setAvailability] = useState("All");

  // Invitation Modal state
  const [inviteTalent, setInviteTalent] = useState<Talent | null>(null);
  const [, setProjects] = useState<EscrowContract[]>([]);
  const [projectTitle, setProjectTitle] = useState("Auditoría de Tokenomics");
  const [projectAmount, setProjectAmount] = useState(3500);
  const [invitingLoading, setInvitingLoading] = useState(false);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [talentResponse, escrowList] = await Promise.all([
        supabase.from('talents').select('*'),
        fetchEscrowList()
      ]);
      
      const rawTalents = talentResponse.data || [];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const talentList = rawTalents.map((t: any) => ({
        id: t.id,
        name: t.name,
        role: t.role,
        avatar: t.avatar,
        rate: t.rate,
        availability: t.availability,
        skills: t.skills || [],
        credentials: t.credentials || [],
        rating: t.rating || 0,
        matching: t.matching || 0
      }));

      setTalents(talentList);
      setFilteredTalents(talentList);
      setProjects(escrowList);
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

  // Apply filters in real time
  useEffect(() => {
    let result = talents;

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(t => 
        t.name.toLowerCase().includes(q) || 
        t.role.toLowerCase().includes(q) ||
        t.skills.some(s => s.toLowerCase().includes(q))
      );
    }

    if (selectedSkill !== "All") {
      result = result.filter(t => t.skills.includes(selectedSkill));
    }

    if (selectedSbt !== "All") {
      result = result.filter(t => t.credentials.some(c => c.name === selectedSbt || c.platform.includes(selectedSbt)));
    }

    if (availability !== "All") {
      result = result.filter(t => t.availability === availability);
    }

    setFilteredTalents(result);
  }, [searchQuery, selectedSkill, selectedSbt, availability, talents]);

  const handleSendInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteTalent) return;

    setInvitingLoading(true);
    try {
      const res = await createEscrow({
        talentId: inviteTalent.id,
        projectId: "demo_project_id",
        amount: projectAmount
      });
      
      if (!res.success) {
        throw new Error(res.error || "Failed to create escrow via Supabase Server Action");
      }
      
      setInviteTalent(null);
      alert(`¡Invitación enviada! El contrato Escrow por $${projectAmount} USD se ha pre-fondeado en Base Network.`);
    } catch (err: unknown) {
      const e = err as Error;
      alert(e.message || "Error al invitar");
    } finally {
      setInvitingLoading(false);
    }
  };

  // Extract all unique skills & credentials for filter selects
  const allSkills = Array.from(new Set(talents.flatMap(t => t.skills)));
  const allSbts = Array.from(new Set(talents.flatMap(t => t.credentials.map(c => c.name))));

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#0B0C10] text-gray-200 pt-32 pb-24 px-6 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#9B5DE5]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-[#00F5FF]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-8">
        
        {/* Title */}
        <div className="text-center md:text-left">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 group">
            <ArrowRight className="w-4 h-4 group-hover:-translate-x-1 transition-transform rotate-180" />
            <span className="text-sm font-bold tracking-wider uppercase">Volver al Inicio</span>
          </Link>
          <br/>
          <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-[#00F5FF]/10 text-[#00F5FF] border border-[#00F5FF]/20">Directorio On-Chain</span>
          <h1 className="text-4xl md:text-5xl font-black text-white mt-4 mb-3">Buscar Talento Verificado</h1>
          <p className="text-lg text-gray-400 max-w-2xl">{tApp('findValidatedDevs')}</p>
        </div>

        {/* Filter Toolbar */}
        <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input 
                type="text"
                placeholder="Buscar por nombre, cargo o skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#00F5FF]/50 transition-colors"
              />
            </div>

            {/* Filter Toggle Headers */}
            <div className="flex flex-wrap gap-3">
              <select 
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold text-gray-300 focus:outline-none focus:border-[#00F5FF]/50 cursor-pointer"
              >
                <option value="All">Todos los Skills</option>
                {allSkills.map(s => <option key={s} value={s}>{s}</option>)}
              </select>

              <select 
                value={selectedSbt}
                onChange={(e) => setSelectedSbt(e.target.value)}
                className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold text-gray-300 focus:outline-none focus:border-[#00F5FF]/50 cursor-pointer max-w-[180px] truncate"
              >
                <option value="All">Todos los SBTs</option>
                {allSbts.map(s => <option key={s} value={s}>{s}</option>)}
              </select>

              <select 
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-xs font-bold text-gray-300 focus:outline-none focus:border-[#00F5FF]/50 cursor-pointer"
              >
                <option value="All">Disponibilidad</option>
                <option value="Available">Disponible</option>
                <option value="In Contract">En Contrato</option>
              </select>
            </div>
          </div>
        </div>

        {/* Talent Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-64 bg-white/5 rounded-3xl animate-pulse border border-white/5" />
            ))}
          </div>
        ) : filteredTalents.length === 0 ? (
          <div className="p-16 text-center rounded-3xl border border-white/10 bg-white/5">
            <span className="text-4xl block mb-4">🔍</span>
            <h3 className="text-lg font-bold text-white mb-2">Sin resultados</h3>
            <p className="text-gray-500 text-sm">{tApp('noTalentFound')}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTalents.map(t => (
              <div key={t.id} className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-[#00F5FF]/30 transition-all flex flex-col justify-between group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#00F5FF]/5 rounded-full blur-2xl group-hover:bg-[#00F5FF]/10 transition-colors" />
                
                <div>
                  {/* Card Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-black/40 border border-white/5 flex items-center justify-center text-2xl">
                        {t.avatar}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-base leading-tight group-hover:text-[#00F5FF] transition-colors">{t.name}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">{t.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-black text-white font-mono">${t.rate}<span className="text-[10px] text-gray-500 font-normal">/h</span></span>
                    </div>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {t.skills.map(s => (
                      <span key={s} className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-white/5 text-gray-400 border border-white/5">{s}</span>
                    ))}
                  </div>

                  {/* Soulbound Credentials List */}
                  <div className="space-y-2 mb-6">
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-500 block mb-1">Badges SBT Verificados</span>
                    
                    {t.credentials.slice(0, 2).map((c, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-black/30 border border-white/5 text-[10px]">
                        <span className="text-gray-300 font-medium flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />
                          {c.name}
                        </span>
                        <span className="text-[9px] text-[#00F5FF] font-mono">{c.grade}</span>
                      </div>
                    ))}
                    
                    {t.credentials.length > 2 && (
                      <span className="text-[9px] text-gray-500 font-bold block text-right">+{t.credentials.length - 2} credenciales más</span>
                    )}
                  </div>
                </div>

                {/* Hire Action */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                    t.availability === 'Available' ? 'bg-green-500/10 text-green-400' : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    {t.availability === 'Available' ? 'Disponible' : 'En Contrato'}
                  </span>
                  
                  <button 
                    onClick={() => setInviteTalent(t)}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#00F5FF]/10 to-[#9B5DE5]/10 border border-[#00F5FF]/20 text-white font-bold text-xs hover:border-[#00F5FF]/50 transition-all flex items-center gap-1.5"
                  >
                    Invitar <ArrowRight className="w-3 h-3 text-[#00F5FF]" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* Invite Talent Modal */}
      {inviteTalent && (
        <div className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-[#0B0C10] border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl relative">
            <div className="text-center mb-6">
              <span className="text-4xl block mb-2">{inviteTalent.avatar}</span>
              <h3 className="text-xl font-black text-white">Contratar a {inviteTalent.name}</h3>
              <p className="text-xs text-gray-500 mt-1">{inviteTalent.role} • ${inviteTalent.rate}/hora</p>
            </div>
            
            <form onSubmit={handleSendInvite} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{tApp('missionProjectTitle')}</label>
                <input 
                  type="text" 
                  value={projectTitle} 
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00F5FF]/50"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Presupuesto del Escrow (USD)</label>
                <input 
                  type="number" 
                  value={projectAmount} 
                  onChange={(e) => setProjectAmount(Number(e.target.value))}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white focus:outline-none focus:border-[#00F5FF]/50"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setInviteTalent(null)} className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 font-bold text-xs uppercase tracking-widest hover:bg-white/5">Cancelar</button>
                <button type="submit" disabled={invitingLoading} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#00F5FF] to-[#9B5DE5] text-black font-black text-xs uppercase tracking-widest hover:opacity-90">
                  {invitingLoading ? "Enviando..." : "Crear Escrow & Contratar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </main>
  );
}
