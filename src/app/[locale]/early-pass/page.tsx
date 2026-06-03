"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Zap, ShieldCheck, ArrowRight, CheckCircle2, Gem,
  CreditCard, Wallet, TrendingUp, Clock, Users, AlertTriangle
} from "lucide-react";

import { fetchClaimedPasses } from "@/lib/mocks/service";

const PASS_PRICE = 12;
const SERVICE_FEE = 0.65;
const TOTAL_PRICE = PASS_PRICE + SERVICE_FEE;
const TOTAL_PASSES = 2000;

const TAL_PRICE_CURRENT = 0.040;
const TAL_PRICE_NEXT = 0.050;
const IDO_SOLD_PERCENT = 34;
const IDO_GOAL_M = 50;

export default function EarlyPassPage() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'es';

  const [usdAmount, setUsdAmount] = useState(100);
  const [talAmount, setTalAmount] = useState(2500);
  const [buying, setBuying] = useState<null | 'stripe' | 'wallet'>(null);
  const [idoBuying, setIdoBuying] = useState<null | 'stripe' | 'wallet'>(null);
  const [passClaimed, setPassClaimed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [claimedPasses, setClaimedPasses] = useState(1842);

  useEffect(() => {
    setMounted(true);
    const s = localStorage.getItem('dao_early_pass_claimed');
    if (s) setPassClaimed(true);
    
    // Fetch dynamically from backend
    fetchClaimedPasses().then(val => {
      setClaimedPasses(val);
    });
  }, []);

  const claimedPct = Math.round((claimedPasses / TOTAL_PASSES) * 100);
  const remaining = TOTAL_PASSES - claimedPasses;

  const handleUsdChange = (v: number) => {
    setUsdAmount(v);
    setTalAmount(Math.round(v / TAL_PRICE_CURRENT));
  };

  const handleTalChange = (v: number) => {
    setTalAmount(v);
    setUsdAmount(Math.round(v * TAL_PRICE_CURRENT * 100) / 100);
  };

  const handleBuyPass = async (method: 'stripe' | 'wallet') => {
    setBuying(method);
    
    if (method === 'stripe') {
      try {
        const { supabase } = await import('@/utils/supabase/client');
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user) {
          alert(t2('alertWallet'));
          setBuying(null);
          return;
        }

        const res = await fetch('/api/checkout/stripe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: session.user.id })
        });
        
        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
        } else {
          alert(data.error || 'Error al generar checkout');
          setBuying(null);
        }
      } catch (err) {
        console.error(err);
        setBuying(null);
      }
    } else {
      await new Promise(r => setTimeout(r, 2000));
      localStorage.setItem('dao_early_pass_claimed', '1');
      setPassClaimed(true);
      setBuying(null);
      alert(t2('alertPass'));
    }
  };

  const handleBuyIDO = async (method: 'stripe' | 'wallet') => {
    setIdoBuying(method);
    await new Promise(r => setTimeout(r, 2000));
    setIdoBuying(null);
    alert(t2('alertTokens', { amount: talAmount.toLocaleString() }));
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#020408]">
      {/* --- HERO --- */}
      <section className="relative pt-40 pb-24 overflow-hidden flex flex-col items-center text-center px-6">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#00F5FF]/8 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-[#9B5DE5]/8 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group self-start sm:self-center">
            <ArrowRight className="w-4 h-4 group-hover:-translate-x-1 transition-transform rotate-180" />
            <span className="text-sm font-bold tracking-wider uppercase">Volver al Inicio</span>
          </Link>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/20 text-[#F59E0B] text-xs font-black uppercase tracking-widest mb-8">
            <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-ping" />
            DAO Membership Gateway · {remaining.toLocaleString()} pases restantes
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-[1.1]">
            La Infraestructura de Confianza para{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] to-[#9B5DE5]">
              Talento Élite
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Accede al ecosistema Web3 donde el talento técnico validado por IA se conecta con empresas de primer nivel. Sin fricción. Sin riesgo.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#early-pass" className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-black font-black text-sm uppercase tracking-widest hover:opacity-90 transition-all shadow-[0_0_30px_rgba(245,158,11,0.25)] flex items-center gap-2">
              Reclamar mi Pase Fundador <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#ido" className="px-8 py-4 rounded-2xl border border-[#00F5FF]/30 bg-[#00F5FF]/5 text-[#00F5FF] font-black text-sm uppercase tracking-widest hover:bg-[#00F5FF]/10 transition-all flex items-center gap-2">
              Comprar $TAL Token <Zap className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="relative z-10 mt-20 grid grid-cols-3 gap-8 max-w-xl mx-auto border-t border-white/5 pt-12 w-full">
          {[
            { value: '2,000', label: 'Pases Fundadores', color: '#F59E0B' },
            { value: '34%', label: 'IDO Completado', color: '#00F5FF' },
            { value: '€20', label: 'Airdrop Garantizado', color: '#9B5DE5' },
          ].map(({ value, label, color }) => (
            <div key={label} className="text-center">
              <span className="block text-2xl font-black text-white font-mono">{value}</span>
              <span className="block text-[10px] uppercase font-bold tracking-widest mt-1" style={{ color }}>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* === MÓDULO 1 + MÓDULO 2 SIDE BY SIDE (igual al wireframe) === */}
      <section id="early-pass" className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-[#00F5FF] block mb-3">⚡ Token Launch Gateway</span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            Participa en la{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] to-[#00F5FF]">
              Economía $TAL
            </span>
          </h2>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto">
            Elige entre reclamar tu Pase Fundador de por vida o adquirir tokens $TAL líquidos durante nuestro lanzamiento público de 30 días.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* ══════════ MÓDULO 1: LIFETIME STATUS GATE ══════════ */}
          <div className="rounded-[32px] p-8 md:p-10 relative overflow-hidden backdrop-blur-md bg-white/[0.02] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col justify-between group transition-all duration-300 hover:border-[#F59E0B]/30">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F59E0B]/50 to-transparent rounded-t-[32px] animate-pulse" />

            <div className="space-y-6">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#F59E0B]">
                ⚡ Lifetime Status Gate
              </span>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                Programa 'Early Adopter': Accede a la Élite. Fricción Cero.
              </h3>

              {/* Beneficios */}
              <ul className="space-y-3.5 text-sm text-gray-300">
                {[
                  { icon: '✓', text: 'Paga $12 USD (O descuéntalo de tu primer contrato).' },
                  { icon: '✓', text: 'Recibe tu pasaporte inmutable (SBT).' },
                  { icon: '✓', text: 'Obtén un Airdrop garantizado de 20€ en $TAL.' },
                  { icon: '✦', text: '1.0x peso de voto multiplicador en el DAO.', highlight: true },
                ].map(({ icon, text, highlight }) => (
                  <li key={text} className="flex items-start gap-3">
                    <span className={`font-bold text-base mt-0.5 ${highlight ? 'text-[#9B5DE5]' : 'text-[#F59E0B]'}`}>{icon}</span>
                    <span className={highlight ? 'text-gray-200 font-semibold' : ''}>{text}</span>
                  </li>
                ))}
              </ul>

              {/* Zero friction note */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <h4 className="text-xs font-bold text-[#00F5FF] uppercase tracking-widest flex items-center gap-2 mb-2">
                  <Zap className="w-3 h-3" /> Onboarding Web3 Sin Fricción
                </h4>
                <p className="text-gray-500 text-xs leading-relaxed">
                  No necesitas crypto wallet. Nuestro checkout híbrido genera una wallet segura no-custodial vinculada a tu email/GitHub. Las gas fees las patrocina el DAO Paymaster.
                </p>
              </div>
            </div>

            {/* Demand bar */}
            <div className="mt-8 space-y-4 bg-white/[0.01] border border-white/5 p-6 rounded-2xl">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                  <span className="text-[#F59E0B] animate-pulse flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> ALTA DEMANDA
                  </span>
                  <span className="text-white">{claimedPct}%</span>
                </div>
                <p className="text-[10px] font-bold text-gray-400">
                  {claimedPasses.toLocaleString()} de {TOTAL_PASSES.toLocaleString()} pases fundadores reclamados.
                </p>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#F59E0B] to-[#D97706] rounded-full transition-all duration-1000"
                    style={{ width: `${claimedPct}%` }}
                  />
                </div>
              </div>

              {passClaimed ? (
                <div className="w-full py-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Pase Fundador Activo ✓
                </div>
              ) : (
                <button
                  onClick={() => handleBuyPass('stripe')}
                  disabled={!!buying}
                  className="block w-full min-h-[48px] py-4 rounded-2xl font-bold text-xs uppercase tracking-wider text-center transition-all duration-300 shadow-[0_0_30px_rgba(245,158,11,0.15)] hover:shadow-[0_0_40px_rgba(245,158,11,0.25)] disabled:opacity-60 text-[#020408]"
                  style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)' }}
                >
                  {buying ? 'Procesando...' : 'Reclamar Mi Pase y Airdrop'}
                </button>
              )}
            </div>
          </div>

          {/* ══════════ MÓDULO 2: LIQUID TOKEN IDO ══════════ */}
          <div id="ido" className="rounded-[32px] p-8 md:p-10 relative overflow-hidden backdrop-blur-md bg-white/[0.02] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col justify-between group transition-all duration-300 hover:border-[#00F5FF]/30">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F5FF]/50 to-transparent rounded-t-[32px] animate-pulse" />

            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#00F5FF]">
                  ⚡ Liquid Token IDO
                </span>
                <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-[#00F5FF]/10 text-[#00F5FF] border border-[#00F5FF]/20 animate-pulse">
                  Phase 2/4: Growth
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
                  Public Token Sale ($TAL IDO)
                </h3>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  Adquiere tokens $TAL líquidos antes del lanzamiento en mainnet. El precio aumenta dinámicamente por tramo.
                </p>
              </div>

              {/* Price tiers */}
              <div className="grid grid-cols-2 gap-3 bg-white/[0.01] border border-white/5 p-4 rounded-xl">
                <div>
                  <span className="text-[9px] text-gray-500 uppercase tracking-widest block mb-0.5">Precio Actual</span>
                  <span className="text-sm font-bold text-white font-mono">${TAL_PRICE_CURRENT.toFixed(3)} USD / $TAL</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-gray-500 uppercase tracking-widest block mb-0.5">Siguiente Tramo</span>
                  <span className="text-sm font-bold text-gray-400 font-mono">${TAL_PRICE_NEXT.toFixed(3)} USD</span>
                </div>
              </div>

              {/* Progress bar IDO */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="text-[#00F5FF]">{IDO_SOLD_PERCENT}% Vendido</span>
                  <span className="text-gray-500">Objetivo: {IDO_GOAL_M}M $TAL</span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#00F5FF] to-[#00E5FF] transition-all duration-1000"
                    style={{ width: `${IDO_SOLD_PERCENT}%` }}
                  />
                </div>
              </div>

              {/* Calculator */}
              <div className="border-t border-white/5 pt-4 space-y-3">
                <span className="text-[10px] font-bold text-gray-400 block uppercase tracking-wider">
                  Calculadora de Compra de Tokens
                </span>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="number"
                      min={10}
                      value={usdAmount}
                      onChange={e => handleUsdChange(Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-white focus:outline-none focus:border-[#00F5FF] transition-all"
                      placeholder="100"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-500">USD</span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      value={talAmount}
                      onChange={e => handleTalChange(Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-[#00F5FF] focus:outline-none focus:border-[#00F5FF] transition-all"
                      placeholder="2500"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-500">$TAL</span>
                  </div>
                </div>
                <p className="text-[10px] text-gray-600 text-center">
                  1 $TAL = ${TAL_PRICE_CURRENT} USD · Siguiente tramo: ${TAL_PRICE_NEXT} USD
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => handleBuyIDO('stripe')}
                disabled={!!idoBuying}
                className="min-h-[48px] py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all duration-300 bg-white text-[#020408] hover:bg-gray-100 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {idoBuying === 'stripe' ? (
                  <span className="animate-pulse">Procesando...</span>
                ) : (
                  <><CreditCard className="w-4 h-4" /> Comprar con Stripe</>
                )}
              </button>
              <button
                onClick={() => handleBuyIDO('wallet')}
                disabled={!!idoBuying}
                className="min-h-[48px] py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all duration-300 border border-[#00F5FF]/30 bg-[#00F5FF]/5 text-[#00F5FF] hover:bg-[#00F5FF]/10 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {idoBuying === 'wallet' ? (
                  <span className="animate-pulse">Procesando...</span>
                ) : (
                  <><Wallet className="w-4 h-4" /> Pagar con Wallet</>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- PASS DETAIL SECTION (full card) --- */}
      <section className="py-24 px-4 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          {/* Left: What you get */}
          <div className="md:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#9B5DE5] uppercase tracking-widest">
              🔥 Tier de Alta Urgencia
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Reclama tu Pase de Acceso Fundador
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
              Obtén el estatus de por vida en el ecosistema DAO. Valida credenciales automáticamente con nuestro motor de reputación, audita hasta 10 contratos con agentes IA, y comienza tu balance con nuestras recompensas del lanzamiento de tokens.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: ShieldCheck, label: 'SBT Fundador On-Chain', desc: 'Credencial inmutable en Base Network', color: '#00F5FF' },
                { icon: Gem, label: 'Airdrop de €20 en $TAL', desc: '200 TAL en tu wallet en 48h', color: '#9B5DE5' },
                { icon: TrendingUp, label: 'Fee Reducido de por vida', desc: '8% en lugar del 12% estándar', color: '#F59E0B' },
                { icon: Users, label: 'Acceso Prioritario a Misiones', desc: 'Antes que el talento no-Founder', color: '#22C55E' },
              ].map(({ icon: Icon, label, desc, color }) => (
                <div key={label} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
                  <Icon className="w-5 h-5 mb-3" style={{ color }} />
                  <h4 className="font-bold text-white text-sm mb-1">{label}</h4>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Checkout card */}
          <div className="md:col-span-5">
            <div className="relative">
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-r from-[#9B5DE5]/20 to-[#00F5FF]/10 blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-8 rounded-[32px] border border-white/10 overflow-hidden backdrop-blur-2xl bg-white/[0.02]">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00F5FF]/30 to-transparent" />

                <div className="border-b border-white/5 pb-6 mb-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#00F5FF]">Founder Tier</span>
                  <h3 className="text-2xl font-black text-white mt-1">Early Adopter Pass</h3>
                  <div className="mt-4 space-y-1">
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Precio del Pase:</span>
                      <span>${PASS_PRICE.toFixed(2)} USD</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Tarifa de Servicio:</span>
                      <span>+${SERVICE_FEE.toFixed(2)} USD</span>
                    </div>
                    <div className="flex justify-between items-baseline pt-2 border-t border-white/5 mt-2">
                      <span className="text-sm font-bold text-white">Total Checkout:</span>
                      <span className="text-3xl font-black text-[#00F5FF]">${TOTAL_PRICE.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 text-sm">
                  {[
                    { icon: '✓', text: 'Acceso completo al marketplace' },
                    { icon: '✦', text: 'Airdrop garantizado de €20 en $TAL', bold: true },
                    { icon: '✓', text: 'SBT Pasaporte Fundador Descentralizado' },
                    { icon: '✓', text: 'Multiplicador de voto 1.0x en DAO' },
                  ].map(({ icon, text, bold }) => (
                    <li key={text} className="flex items-start gap-3">
                      <span className={`${bold ? 'text-[#9B5DE5]' : 'text-[#00F5FF]'} text-base mt-0.5`}>{icon}</span>
                      <span className={bold ? 'text-gray-200 font-bold' : 'text-gray-300'}>{text}</span>
                    </li>
                  ))}
                </ul>

                {passClaimed ? (
                  <div className="w-full py-4 rounded-2xl bg-green-500/10 border border-green-500/20 text-green-400 font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 mb-3">
                    <CheckCircle2 className="w-4 h-4" /> Pase Fundador Activo ✓
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={() => handleBuyPass('stripe')}
                      disabled={!!buying}
                      className="w-full min-h-[48px] py-4 rounded-2xl font-bold text-sm bg-white text-[#020408] hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg disabled:opacity-60"
                    >
                      {buying === 'stripe' ? <span className="animate-pulse">Procesando...</span> : <><CreditCard className="w-4 h-4" /> Comprar con Tarjeta</>}
                    </button>
                    <button
                      onClick={() => handleBuyPass('wallet')}
                      disabled={!!buying}
                      className="w-full min-h-[48px] py-4 rounded-2xl font-bold text-sm border border-[#9B5DE5]/40 bg-[#9B5DE5]/10 text-[#C084FC] hover:bg-[#9B5DE5]/20 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {buying === 'wallet' ? <span className="animate-pulse">Procesando...</span> : <><Wallet className="w-4 h-4" /> Pagar con Web3 Wallet</>}
                    </button>
                  </div>
                )}

                <p className="mt-6 text-[10px] text-gray-500 text-center font-bold tracking-wider uppercase">
                  Checkout Seguro · Emisión de Credencial Instantánea
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SOCIAL PROOF / FAQ --- */}
      <section className="py-24 px-6 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-white text-center mb-12">Preguntas Frecuentes</h2>
          <div className="space-y-4">
            {[
              { q: '¿Necesito una wallet de crypto para comprar el pase?', a: 'No. Nuestro checkout híbrido crea automáticamente una wallet segura vinculada a tu email o GitHub. Puedes pagar con tarjeta de crédito normal.' },
              { q: '¿Cuándo recibiré el airdrop de €20 en $TAL?', a: 'El airdrop de 200 TAL (~€20 al precio de lanzamiento) se acredita en tu wallet en las siguientes 48 horas tras la compra del pase.' },
              { q: '¿Qué es un SBT (Soulbound Token)?', a: 'Un token no transferible vinculado permanentemente a tu identidad criptográfica. No se puede vender ni falsificar. Actúa como tu pasaporte de credenciales on-chain.' },
              { q: '¿Puedo descontar el precio del pase de mi primer contrato?', a: 'Sí. Si completas tu primer contrato de escrow en la plataforma, los $12 USD del pase se descuentan automáticamente de la comisión de la plataforma.' },
              { q: '¿Qué diferencia hay entre el Early Pass y los tokens $TAL del IDO?', a: 'El Early Pass es un estado de membresía de por vida con beneficios permanentes (SBT, airdrop, fees reducidos). Los tokens $TAL son utilidad líquida para staking, gobernanza y pagos dentro del ecosistema.' },
            ].map(({ q, a }) => (
              <details key={q} className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all cursor-pointer">
                <summary className="font-bold text-white text-sm list-none flex items-center justify-between">
                  {q}
                  <span className="text-gray-500 group-open:rotate-45 transition-transform text-lg font-light">+</span>
                </summary>
                <p className="mt-4 text-gray-400 text-sm leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 text-center border-t border-white/5 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#F59E0B]/10 blur-[120px] pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-4xl font-black text-white mb-4">Solo quedan <span className="text-[#F59E0B]">{remaining}</span> pases</h2>
          <p className="text-gray-400 mb-8">Cuando se acaben los 2,000 pases fundadores, el precio del acceso sube a $49/mes. Bloquea tu acceso de por vida hoy.</p>
          <button
            onClick={() => handleBuyPass('stripe')}
            className="px-10 py-5 rounded-2xl font-black text-base uppercase tracking-widest text-black transition-all hover:opacity-90 shadow-[0_0_40px_rgba(245,158,11,0.3)]"
            style={{ background: 'linear-gradient(135deg, #F59E0B, #D97706)' }}
          >
            Reclamar Mi Pase Fundador — ${TOTAL_PRICE.toFixed(2)} USD
          </button>
          <p className="text-xs text-gray-600 mt-4">{tApp('securePayAccess')}</p>
        </div>
      </section>
    </div>
  );
}
