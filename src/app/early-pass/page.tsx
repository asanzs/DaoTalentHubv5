"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Award, Zap, Building2, ChevronRight, Lock } from "lucide-react";
import { useWalletModal } from "@/context/Web3Provider";

export default function EarlyPassPage() {
  const { open } = useWalletModal();
  const [success, setSuccess] = useState(false);

  const handleCheckout = () => {
    // Simulamos que tras iniciar sesión / pagar, se valida la membresía
    setSuccess(true);
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-[#0B0C10] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#9B5DE5]/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 py-24 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#00F5FF] text-sm mb-6 font-mono uppercase tracking-widest">
            <Lock className="w-4 h-4" /> Oferta Limitada
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Suscripción Fundador
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Acceso vitalicio a la red de talento Top 1%. Sin comisiones futuras, prioridad de contratación y soporte VIP garantizado.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Tarjeta de Beneficios */}
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-[#00F5FF]/10 flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-[#00F5FF]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">0% Comisiones Vitalicias</h3>
                <p className="text-white/50 text-sm">Contrata o se contratado sin pagar el 20% habitual de las plataformas tradicionales.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-[#9B5DE5]/10 flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-[#9B5DE5]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Prioridad de Emparejamiento</h3>
                <p className="text-white/50 text-sm">Tu perfil o las ofertas de tu empresa aparecerán primero mediante el algoritmo de IA.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Soporte Concierge VIP</h3>
                <p className="text-white/50 text-sm">Un account manager dedicado para ayudarte a cerrar contratos o encontrar el mejor talento.</p>
              </div>
            </div>
          </div>

          {/* Tarjeta de Checkout */}
          <div className="p-8 rounded-3xl border border-[#9B5DE5]/30 relative overflow-hidden"
               style={{ background: 'linear-gradient(135deg, rgba(155,93,229,0.1), rgba(0,245,255,0.05))' }}>
            <div className="absolute top-0 right-0 p-4">
              <span className="px-3 py-1 rounded-full bg-[#00F5FF]/20 text-[#00F5FF] text-xs font-bold uppercase tracking-wider">
                Sólo 500 Plazas
              </span>
            </div>
            
            <h2 className="text-2xl font-black text-white mb-2">Pase Fundador (B2C / B2B)</h2>
            <p className="text-white/50 text-sm mb-8">Pago único. Acceso para siempre.</p>

            <div className="flex items-end gap-2 mb-8">
              <span className="text-5xl font-black text-white">€499</span>
              <span className="text-white/40 mb-2 line-through">€1,200</span>
            </div>

            {success ? (
              <div className="w-full py-4 rounded-xl bg-green-500/20 text-green-400 font-bold text-center border border-green-500/30 flex items-center justify-center gap-2">
                <ShieldCheck className="w-5 h-5" /> Validando Membresía...
              </div>
            ) : (
              <div className="space-y-4">
                <button 
                  onClick={handleCheckout}
                  className="w-full py-4 rounded-xl font-bold bg-gradient-to-r from-[#9B5DE5] to-[#00F5FF] text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(155,93,229,0.4)]"
                >
                  Adquirir Suscripción <ChevronRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={open}
                  className="w-full py-4 rounded-xl font-bold bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-all border border-white/10"
                >
                  Conectar Cuenta Existente
                </button>
              </div>
            )}
            
            <p className="mt-6 text-center text-xs text-white/30 font-mono">
              Pagos procesados mediante Stripe (Fiat) o Infraestructura Web3.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
