"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Wallet, Briefcase, Award, CheckCircle2, 
  Zap, Search, Plus, 
  ArrowRightLeft, Scale, ShieldAlert,
  ArrowUpRight, Building2, Terminal,
  ShieldCheck, Lock, ArrowRight, User
} from "lucide-react";
import Link from "next/link";
import { useAccount } from "wagmi";
import { useWalletModal } from "@/context/Web3Provider";

export default function Dashboard() {
  const [view, setView] = useState<"b2c" | "b2b">("b2c");
  const [activeTab, setActiveTab] = useState<"overview" | "arbitration" | "bridge">("overview");
  const [b2bTab, setB2bTab] = useState<"overview" | "staking">("overview");
  const [isBridging, setIsBridging] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [stakedAmount, setStakedAmount] = useState(0);
  const { address, isConnected } = useAccount();
  const { open } = useWalletModal();

  return (
    <main className="min-h-screen bg-[#0B0C10] font-sans text-white">
      {/* Top Nav */}
      <nav className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-black/20 sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-black text-xl tracking-tighter">V5</Link>
          <div className="h-6 w-px bg-white/20 mx-2" />
          <div className="bg-white/5 p-1 rounded-lg flex text-sm">
            <button 
              onClick={() => { setView("b2c"); setActiveTab("overview"); }}
              className={`px-4 py-1.5 rounded-md transition-colors flex items-center gap-2 ${view === "b2c" ? "bg-white/10 font-bold" : "text-white/50 hover:text-white"}`}
            >
              <Terminal className="w-4 h-4" /> Talento (B2C)
            </button>
            <button 
              onClick={() => { setView("b2b"); setB2bTab("overview"); }}
              className={`px-4 py-1.5 rounded-md transition-colors flex items-center gap-2 ${view === "b2b" ? "bg-[#00F5FF]/20 text-[#00F5FF] font-bold" : "text-white/50 hover:text-[#00F5FF]"}`}
            >
              <Building2 className="w-4 h-4" /> Empresa (B2B)
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold">{isConnected ? "Usuario Autenticado" : "Modo Demo"}</p>
            <p className="text-xs text-[#00F5FF]">
              {isConnected && address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "No conectado"}
            </p>
          </div>
          <button 
            onClick={open}
            className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#9B5DE5] to-[#00F5FF] flex items-center justify-center font-bold text-black border-2 border-black hover:opacity-80 transition-opacity"
          >
            {isConnected ? <CheckCircle2 className="w-5 h-5" /> : <User className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* =======================
            B2C (TALENT) VIEW
            ======================= */}
        {view === "b2c" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="flex items-end justify-between border-b border-white/5 pb-4">
              <div className="flex gap-6">
                <button onClick={() => setActiveTab("overview")} className={`pb-4 border-b-2 font-bold ${activeTab === 'overview' ? 'border-[#00F5FF] text-white' : 'border-transparent text-white/50 hover:text-white'} -mb-4.5 transition-all`}>
                  Mi Panel
                </button>
                <button onClick={() => setActiveTab("bridge")} className={`pb-4 border-b-2 font-bold flex items-center gap-2 ${activeTab === 'bridge' ? 'border-[#00F5FF] text-white' : 'border-transparent text-white/50 hover:text-white'} -mb-4.5 transition-all`}>
                  <ArrowRightLeft className="w-4 h-4" /> Retirar Fondos
                </button>
                <button onClick={() => setActiveTab("arbitration")} className={`pb-4 border-b-2 font-bold flex items-center gap-2 ${activeTab === 'arbitration' ? 'border-[#9B5DE5] text-white' : 'border-transparent text-white/50 hover:text-white'} -mb-4.5 transition-all`}>
                  <Scale className="w-4 h-4" /> Tribunal de Arbitraje
                </button>
              </div>
            </div>

            {/* TAB: OVERVIEW B2C */}
            {activeTab === "overview" && (
              <div className="grid md:grid-cols-3 gap-6">
                {/* Balance Card */}
                <div className="p-8 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Wallet className="w-24 h-24" />
                  </div>
                  <div className="flex items-center gap-2 text-white/60 mb-4 relative z-10">
                    <Wallet className="w-5 h-5" /> Saldo Disponible
                  </div>
                  <h2 className="text-5xl font-black mb-6 tracking-tighter relative z-10">$1,450.00 <span className="text-2xl text-white/40 font-medium">USD</span></h2>
                  <button onClick={() => setActiveTab("bridge")} className="w-full h-12 rounded-full bg-white text-black font-bold hover:bg-white/90 transition-transform hover:scale-105 active:scale-95 relative z-10 flex items-center justify-center gap-2">
                    Retirar al Banco <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Badges/SBTs */}
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2 text-white/60 font-medium">
                      <Award className="w-5 h-5" /> Credenciales (SBTs)
                    </div>
                  </div>
                  <div className="space-y-3 flex-grow">
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors cursor-default">
                      <CheckCircle2 className="w-6 h-6 text-[#00F5FF]" />
                      <div>
                        <span className="font-bold block">Senior React Dev</span>
                        <span className="text-xs text-[#00F5FF]">Verificado por IA</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors cursor-default">
                      <CheckCircle2 className="w-6 h-6 text-[#9B5DE5]" />
                      <div>
                        <span className="font-bold block">Smart Contract Auditor</span>
                        <span className="text-xs text-[#9B5DE5]">Verificado por IA</span>
                      </div>
                    </div>
                  </div>
                  <Link href="/academy" className="mt-6 w-full h-12 rounded-full border border-white/10 flex items-center justify-center text-sm font-bold text-white/60 hover:text-white hover:bg-white/5 transition-all">
                    Obtener nueva credencial
                  </Link>
                </div>

                {/* Arbitrator Upsell / Staking */}
                <div className="p-8 rounded-3xl bg-gradient-to-br from-[#9B5DE5]/20 to-[#0B0C10] border border-[#9B5DE5]/30 flex flex-col justify-between relative overflow-hidden group">
                  <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-[#9B5DE5]/20 rounded-full blur-[30px] group-hover:bg-[#9B5DE5]/40 transition-colors" />
                  <div className="relative z-10">
                    <h3 className="font-black text-2xl mb-3 flex items-center gap-3">
                      <Zap className="w-6 h-6 text-[#9B5DE5]" /> Revisor Élite
                    </h3>
                    <p className="text-white/70 leading-relaxed mb-6">Bloquea una fracción de tus ganancias para ganar derechos de voto en el Tribunal. Recibe ingresos pasivos por auditar código.</p>
                  </div>
                  <button onClick={() => setActiveTab("arbitration")} className="mt-auto w-full h-12 rounded-full bg-[#9B5DE5] text-black font-bold hover:shadow-[0_0_20px_rgba(155,93,229,0.4)] transition-all relative z-10">
                    Acceder al Tribunal
                  </button>
                </div>
              </div>
            )}

            {/* TAB: BRIDGE / RETIRADA FIAT */}
            {activeTab === "bridge" && (
              <div className="max-w-2xl mx-auto mt-10 p-10 rounded-3xl bg-white/5 border border-white/10">
                <div className="text-center mb-10">
                  <div className="w-16 h-16 rounded-full bg-[#00F5FF]/10 flex items-center justify-center mx-auto mb-4">
                    <ArrowRightLeft className="w-8 h-8 text-[#00F5FF]" />
                  </div>
                  <h2 className="text-3xl font-black mb-2">Retirar a Cuenta Bancaria</h2>
                  <p className="text-white/50">Tus fondos en Base Mainnet se convertirán a Dólares/Euros mediante Stripe/CCIP automáticamente.</p>
                </div>
                
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-black/40 border border-white/5 flex justify-between items-center">
                    <div>
                      <p className="text-white/50 text-sm mb-1">Disponible para retirar</p>
                      <p className="text-2xl font-bold">$1,450.00 USD</p>
                    </div>
                    <button className="text-[#00F5FF] text-sm font-bold">Máx</button>
                  </div>

                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-white/50 text-sm mb-4">Cuenta Destino</p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-white/10 rounded flex items-center justify-center text-xs font-bold">IBAN</div>
                      <div>
                        <p className="font-bold">Cuenta Corriente ES** **** 4455</p>
                        <p className="text-xs text-white/50">Santander / Openbank</p>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setIsBridging(true);
                      setTimeout(() => setIsBridging(false), 3000);
                    }}
                    disabled={isBridging}
                    className="w-full h-14 rounded-full bg-gradient-to-r from-[#00F5FF] to-[#00D4FF] text-black font-black text-lg hover:shadow-[0_0_30px_rgba(0,245,255,0.4)] transition-all disabled:opacity-50"
                  >
                    {isBridging ? "Procesando transferencia segura..." : "Confirmar Retirada Inmediata"}
                  </button>
                </div>
              </div>
            )}

            {/* TAB: ARBITRATION (DISPUTAS) */}
            {activeTab === "arbitration" && (
              <div className="max-w-4xl mx-auto mt-10">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-black mb-2 flex items-center gap-3">
                      <Scale className="text-[#9B5DE5]" /> Tribunal de Arbitraje
                    </h2>
                    <p className="text-white/50">Resuelve disputas de código entre empresas y desarrolladores para ganar recompensas.</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/50 text-sm">Tu poder de voto (veTAL)</p>
                    <p className="text-2xl font-black text-[#9B5DE5]">450 Votos</p>
                  </div>
                </div>

                <div className="p-8 rounded-3xl bg-white/5 border border-[#9B5DE5]/30">
                  <div className="flex items-center gap-2 text-red-400 mb-6 font-bold text-sm bg-red-400/10 w-fit px-3 py-1 rounded-full border border-red-400/20">
                    <ShieldAlert className="w-4 h-4" /> Disputa Activa #8492
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4">Caso: Módulo de Autenticación incompleto</h3>
                  <p className="text-white/70 leading-relaxed mb-6">
                    La empresa &quot;Acme Corp&quot; afirma que el desarrollador no implementó el factor 2FA requerido en las especificaciones. El desarrollador afirma que no estaba en el contrato original.
                  </p>

                  <div className="p-6 rounded-xl bg-black mb-8 font-mono text-sm text-white/50 border border-white/10">
                    <p className="text-[#00F5FF] mb-2">{/* Código enviado por el desarrollador */}</p>
                    <p>function login(email, password) {"{"}</p>
                    <p className="pl-4">const user = await db.verify(email, password);</p>
                    <p className="pl-4 text-red-400">{/* TODO: Implement 2FA next sprint */}</p>
                    <p className="pl-4">return user.token;</p>
                    <p>{"}"}</p>
                  </div>

                  {!hasVoted ? (
                    <div className="flex gap-4">
                      <button onClick={() => setHasVoted(true)} className="flex-1 h-12 rounded-xl bg-red-500/10 border border-red-500/50 text-red-400 font-bold hover:bg-red-500/20 transition-colors">
                        Votar a favor de la Empresa (Devolución)
                      </button>
                      <button onClick={() => setHasVoted(true)} className="flex-1 h-12 rounded-xl bg-green-500/10 border border-green-500/50 text-green-400 font-bold hover:bg-green-500/20 transition-colors">
                        Votar a favor del Talento (Pago)
                      </button>
                    </div>
                  ) : (
                    <div className="p-6 rounded-xl bg-[#9B5DE5]/20 border border-[#9B5DE5]/50 text-center">
                      <CheckCircle2 className="w-12 h-12 text-[#9B5DE5] mx-auto mb-3" />
                      <h4 className="text-xl font-bold text-white mb-2">Voto Registrado Mágicamente</h4>
                      <p className="text-white/60">Has votado con éxito. Si la mayoría del jurado concuerda contigo, ganarás una comisión por arbitraje.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}


        {/* =======================
            B2B (COMPANY) VIEW
            ======================= */}
        {view === "b2b" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="flex items-end justify-between border-b border-white/5 pb-4">
              <div className="flex gap-6">
                <button onClick={() => setB2bTab("overview")} className={`pb-4 border-b-2 font-bold ${b2bTab === 'overview' ? 'border-[#00F5FF] text-white' : 'border-transparent text-white/50 hover:text-white'} -mb-4.5 transition-all`}>
                  Panel Central
                </button>
                <button onClick={() => setB2bTab("staking")} className={`pb-4 border-b-2 font-bold flex items-center gap-2 ${b2bTab === 'staking' ? 'border-[#00F5FF] text-white' : 'border-transparent text-white/50 hover:text-white'} -mb-4.5 transition-all`}>
                  <ShieldCheck className="w-4 h-4" /> Membresía y Garantías (Staking)
                </button>
              </div>
              <button className="h-10 px-6 rounded-full bg-gradient-to-r from-[#00F5FF] to-[#00D4FF] text-black font-bold flex items-center gap-2 hover:scale-105 transition-transform">
                <Plus className="w-4 h-4" /> Nueva Contratación
              </button>
            </div>

            {/* TAB: B2B OVERVIEW */}
            {b2bTab === "overview" && (
              <>
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Escrow Balance */}
                  <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-white/60 font-medium">
                        <Lock className="w-5 h-5" /> Retenido en Garantía
                      </div>
                    </div>
                    <h2 className="text-4xl font-black mb-2">$5,000.00</h2>
                    <p className="text-sm text-[#00F5FF] flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Asegurado en SafePay</p>
                  </div>

                  {/* Corporate Staking Status */}
                  <div className="p-8 rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex flex-col justify-between cursor-pointer group" onClick={() => setB2bTab("staking")}>
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-bold text-white/60">Comisión Actual</span>
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold">Plan Básico</span>
                      </div>
                      <p className="text-4xl font-black text-white mb-2">15%</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#00F5FF] group-hover:translate-x-1 transition-transform">
                      Ver cómo bajarla a 0% <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Active Contracts */}
                  <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2 text-white/60 mb-4 font-medium">
                      <Briefcase className="w-5 h-5" /> Contratos Activos
                    </div>
                    <h2 className="text-4xl font-black mb-2">1</h2>
                    <p className="text-sm text-white/50">App React Native (Fase 2)</p>
                  </div>
                </div>

                {/* Smart Match */}
                <div className="mt-12">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-2xl font-black mb-1">Smart Match IA</h3>
                      <p className="text-white/50">Candidatos sugeridos en tiempo real para tus misiones abiertas.</p>
                    </div>
                    <div className="relative w-64">
                      <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                      <input type="text" placeholder="Filtrar rol..." className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm focus:outline-none focus:border-[#00F5FF] transition-colors" />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {[1, 2].map((i) => (
                      <div key={i} className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col hover:bg-white/5 transition-all cursor-pointer group">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#00F5FF] to-[#9B5DE5] opacity-30 group-hover:opacity-100 transition-opacity flex items-center justify-center font-bold text-black">
                              ID#{i*442}
                            </div>
                            <div>
                              <p className="text-white font-bold text-lg">Desarrollador Auditado</p>
                              <div className="flex items-center gap-1 text-[#00F5FF] text-sm font-bold bg-[#00F5FF]/10 px-2 py-0.5 rounded">
                                <Sparkles className="w-3 h-3" /> Match: 9{9-i}%
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 mb-6">
                          <span className="px-3 py-1 bg-white/10 rounded-lg text-xs font-medium">Senior Rust</span>
                          <span className="px-3 py-1 bg-white/10 rounded-lg text-xs font-medium">Solidity</span>
                        </div>
                        <button className="w-full h-12 rounded-xl bg-white text-black font-bold group-hover:bg-[#00F5FF] transition-colors">
                          Ver Perfil y Contratar
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* TAB: B2B STAKING / MEMBERSHIP */}
            {b2bTab === "staking" && (
              <div className="max-w-4xl mx-auto mt-10">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-black mb-4">Membresía & Cashback (Staking)</h2>
                  <p className="text-white/60 text-lg">Bloquea capital de garantía en el contrato inteligente corporativo para reducir tus comisiones de contratación a 0%. Retira tu depósito íntegro cuando quieras.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Current Plan */}
                  <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                    <h3 className="text-xl font-bold mb-6 text-white/50">Tu Plan Actual</h3>
                    <div className="text-center py-8">
                      <p className="text-6xl font-black mb-2">15%</p>
                      <p className="text-white/50">Comisión por contrato</p>
                      <div className="mt-8 p-4 bg-red-500/10 text-red-400 rounded-xl font-medium text-sm border border-red-500/20">
                        Has gastado $4,500 en comisiones este año. Puedes evitar esto activando Premium.
                      </div>
                    </div>
                  </div>

                  {/* Premium Upsell */}
                  <div className="p-8 rounded-3xl bg-gradient-to-br from-[#00F5FF]/20 to-[#0B0C10] border border-[#00F5FF]/50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-20"><Zap className="w-24 h-24 text-[#00F5FF]" /></div>
                    <h3 className="text-xl font-bold mb-6 text-white relative z-10 flex items-center gap-2">
                      <Award className="text-[#00F5FF]" /> Premium Zero-Fee
                    </h3>
                    
                    <div className="relative z-10">
                      <p className="text-5xl font-black mb-2">0%</p>
                      <p className="text-white/70 mb-8">Comisión de por vida</p>
                      
                      <div className="space-y-4 mb-8">
                        <p className="text-sm text-white/60">Para activar este plan, debes depositar una garantía retornable (Corporate Stake).</p>
                        <div className="p-4 bg-black/40 rounded-xl border border-white/10 flex justify-between items-center">
                          <span className="font-medium">Depósito Requerido</span>
                          <span className="font-bold text-[#00F5FF]">$20,000 USD</span>
                        </div>
                      </div>

                      {stakedAmount > 0 ? (
                        <div className="w-full h-14 rounded-xl bg-green-500/20 text-green-400 font-bold flex items-center justify-center border border-green-500/50">
                          <CheckCircle2 className="mr-2" /> Plan Premium Activado
                        </div>
                      ) : (
                        <button 
                          onClick={() => setStakedAmount(20000)}
                          className="w-full h-14 rounded-xl bg-[#00F5FF] text-black font-black hover:shadow-[0_0_30px_rgba(0,245,255,0.4)] transition-all"
                        >
                          Depositar Garantía ($20k)
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

      </div>
    </main>
  );
}

// Just to silence missing lucide icons temporarily without importing all individually if omitted above
const Sparkles = ({className}: {className?: string}) => <Zap className={className} />;
