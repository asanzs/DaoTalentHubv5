"use client";
import { useTranslations } from 'next-intl';

import React, { useState } from "react";
import { Cpu, Target, ArrowRight, CheckCircle2, ShieldAlert, Users, Sparkles } from "lucide-react";
import { createEscrowContract } from "@/lib/mocks/service";
import { useRouter } from "next/navigation";

interface Candidate {
  id: string;
  name: string;
  avatar: string;
  role: string;
  matchScore: number;
  skills: string[];
  sbtCertificate: string;
  github: string;
}

const MOCK_CANDIDATES: Candidate[] = [
  {
    id: "c1",
    name: "Alex Rivera",
    avatar: "👨‍💻",
    role: "Senior Solidity Engineer",
    matchScore: 98,
    skills: ["Solidity", "EVM", "Auditing", "Foundry"],
    sbtCertificate: "Advanced Smart Contract SBT",
    github: "github.com/alexrivera-eth"
  },
  {
    id: "c2",
    name: "Elena Rostova",
    avatar: "👩‍💻",
    role: "Fullstack Web3 Developer",
    matchScore: 92,
    skills: ["React", "Next.js", "Viem", "TailwindCSS"],
    sbtCertificate: "Web3 & Front-End Integration SBT",
    github: "github.com/elena-rostova"
  },
  {
    id: "c3",
    name: "Kenji Sato",
    avatar: "🧑‍💻",
    role: "Smart Contract Auditor",
    matchScore: 87,
    skills: ["Rust", "Solidity", "Formal Verification", "Defi"],
    sbtCertificate: "Web3 Security Audit SBT",
    github: "github.com/kenjisato-sec"
  }
];

export default function SmartMatchPage() {
  const tApp = useTranslations('app');
  const router = useRouter();
  const [title, setTitle] = useState("Auditoría de Bóveda DeFi");
  const [rewardUsd, setRewardUsd] = useState(3000);
  const [rewardTal, setRewardTal] = useState(150);
  const [requiredSbt, setRequiredSbt] = useState("Advanced Smart Contract SBT");
  
  const [isSearching, setIsSearching] = useState(false);
  const [searchLogs, setSearchLogs] = useState<string[]>([]);
  const [matchedCandidates, setMatchedCandidates] = useState<Candidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);

  const startSmartMatch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setMatchedCandidates([]);
    setSelectedCandidate(null);
    setSearchLogs([
      "Estableciendo enlace con Oráculo de Reputación...",
      "Extrayendo requisitos técnicos del post..."
    ]);

    const logTimeline = [
      `Buscando desarrolladores con: "${requiredSbt}"...`,
      "Verificando firmas on-chain de Soulbound Tokens (Base L2)...",
      "Evaluando reputación histórica y resolución de disputas...",
      "Smart Match AI: Algoritmo de afinidad completado."
    ];

    logTimeline.forEach((log, index) => {
      setTimeout(() => {
        setSearchLogs(prev => [...prev, log]);
        if (index === logTimeline.length - 1) {
          setTimeout(() => {
            setIsSearching(false);
            setMatchedCandidates(MOCK_CANDIDATES);
          }, 800);
        }
      }, (index + 1) * 600);
    });
  };

  const handleHire = async (candidate: Candidate) => {
    try {
      const talentId = parseInt(candidate.id.replace('c', ''));
      await createEscrowContract(talentId, title, rewardUsd);
      alert(`Oferta pre-fundada en Escrow enviada a ${candidate.name}. Fondos bloqueados en Smart Contract.`);
      router.push(`/es/dashboard/b2b/projects`);
    } catch (err: any) {
      alert(`Error al crear contrato: ${err.message}`);
    }
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="flex items-center gap-3">
        <Cpu className="w-8 h-8 text-[#00F5FF]" />
        <div>
          <h2 className="text-3xl font-black text-white">Smart Match AI Matchmaker</h2>
          <p className="text-gray-400">Publica ofertas de trabajo y localiza al 1% de desarrolladores Web3 con SBTs verificados.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        
        {/* Post Form Panel */}
        <div className="lg:col-span-2 p-8 rounded-3xl bg-white/5 border border-white/10 shadow-xl self-start">
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-6">Publicar Nueva Oferta</h3>
          
          <form onSubmit={startSmartMatch} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{tApp('projectNameMission')}</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00F5FF]/50"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Recompensa (USD)</label>
                <input 
                  type="number" 
                  value={rewardUsd} 
                  onChange={(e) => setRewardUsd(Number(e.target.value))}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white focus:outline-none focus:border-[#00F5FF]/50"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Bono $TAL</label>
                <input 
                  type="number" 
                  value={rewardTal} 
                  onChange={(e) => setRewardTal(Number(e.target.value))}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm font-mono text-white focus:outline-none focus:border-[#00F5FF]/50"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{tApp('minSbtReq')}</label>
              <select 
                value={requiredSbt}
                onChange={(e) => setRequiredSbt(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#00F5FF]/50 cursor-pointer"
              >
                <option value="Advanced Smart Contract SBT">Advanced Smart Contract SBT</option>
                <option value="Web3 & Front-End Integration SBT">Web3 & Front-End Integration SBT</option>
                <option value="Web3 Security Audit SBT">Web3 Security Audit SBT</option>
              </select>
            </div>

            <button 
              type="submit" 
              disabled={isSearching}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00F5FF] to-[#9B5DE5] text-black font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,245,255,0.2)]"
            >
              {isSearching ? "Buscando..." : "Postear & Smart Match"} <Sparkles className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Matches / Logs Panel */}
        <div className="lg:col-span-3 min-h-[400px] flex flex-col">
          
          {/* Default state */}
          {!isSearching && matchedCandidates.length === 0 && (
            <div className="flex-1 rounded-3xl border border-white/10 bg-white/5 flex flex-col items-center justify-center p-8 text-center">
              <Users className="w-16 h-16 text-gray-500 mb-4 opacity-50" />
              <h3 className="text-lg font-bold text-white mb-2">Listo para el Matching</h3>
              <p className="text-gray-400 text-sm max-w-sm">{tApp('completeFormOracle')}</p>
            </div>
          )}

          {/* AI Logs state */}
          {isSearching && (
            <div className="flex-1 rounded-3xl border border-white/10 bg-black/80 p-8 font-mono text-xs text-[#00F5FF] space-y-2 overflow-y-auto">
              <div className="flex items-center gap-2 mb-4 border-b border-[#00F5FF]/20 pb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#00F5FF] animate-ping" />
                <span className="font-bold uppercase tracking-widest">Ejecutando Smart Match AI Engine</span>
              </div>
              {searchLogs.map((log, index) => (
                <div key={index} className="animate-in fade-in duration-300">
                  <span className="text-gray-500">{`>`}</span> {log}
                </div>
              ))}
              <div className="animate-pulse">_</div>
            </div>
          )}

          {/* Candidates Results State */}
          {!isSearching && matchedCandidates.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-black uppercase tracking-widest text-[#00F5FF] mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> 3 Candidatos Óptimos Encontrados
              </h3>
              
              {matchedCandidates.map((c) => (
                <div 
                  key={c.id} 
                  className={`p-6 rounded-3xl border transition-all ${
                    selectedCandidate === c.id 
                      ? 'bg-gradient-to-r from-[#00F5FF]/10 to-[#9B5DE5]/10 border-[#00F5FF]' 
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center text-2xl">
                        {c.avatar}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-lg">{c.name}</h4>
                        <p className="text-xs text-gray-500">{c.role}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <span className="text-2xl font-black text-[#00F5FF] font-mono">{c.matchScore}%</span>
                      <span className="block text-[9px] text-gray-500 uppercase font-bold tracking-widest">Score de afinidad</span>
                    </div>
                  </div>

                  <div className="my-4 flex flex-wrap gap-2">
                    {c.skills.map((skill) => (
                      <span key={skill} className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/5 text-gray-300 border border-white/10">{skill}</span>
                    ))}
                  </div>

                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between text-xs text-gray-400">
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-400" /> Credencial Validada: {c.sbtCertificate}</span>
                    <span className="font-mono text-[10px] text-gray-600 hidden sm:inline">{c.github}</span>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <button 
                      onClick={() => handleHire(c)}
                      className="flex-1 py-3 rounded-xl bg-[#00F5FF] text-black font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-1"
                    >
                      Enviar Oferta de Trabajo <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
