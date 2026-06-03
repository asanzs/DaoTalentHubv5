"use client";
import { useTranslations } from 'next-intl';

import React from "react";
import { motion } from "framer-motion";
import { Check, X, Star, Building2, Zap } from "lucide-react";
import Link from "next/link";

const TIERS = [
  {
    name: "Pay As You Go",
    description: "Ideal para empresas que contratan puntualmente.",
    price: "15%",
    priceLabel: "comisión por contrato",
    icon: <Building2 className="w-6 h-6 text-white/50" />,
    features: [
      "Acceso ilimitado al Smart Match de IA",
      "Contratación Riesgo Cero (SafePay Escrow)",
      "Facturación en Dólares/Euros",
      "Soporte estándar"
    ],
    missing: [
      "Account Manager dedicado",
      "Cashback corporativo del 100%"
    ],
    buttonText: "Crear Cuenta Gratis",
    popular: false,
    color: "bg-white/5"
  },
  {
    name: "Corporate Premium",
    description: "Nuestra membresía insignia. Cero comisiones de por vida.",
    price: "0%",
    priceLabel: "comisión manteniendo el depósito",
    icon: <Star className="w-6 h-6 text-[#9B5DE5]" />,
    features: [
      "0% Comisión de contratación (Ahorro Masivo)",
      "Acceso prioritario a desarrolladores Top 1%",
      "Account Manager dedicado 24/7",
      "Integración API personalizada",
      "Acceso al Tribunal de Arbitraje Privado"
    ],
    missing: [],
    buttonText: "Depositar Garantía ($20k)",
    popular: true,
    color: "bg-gradient-to-b from-[#9B5DE5]/20 to-[#0B0C10] border-[#9B5DE5]/50"
  }
];

export default function Pricing() {
  const tApp = useTranslations('app');
  

  return (
    <main className="min-h-screen bg-[#0B0C10] font-sans selection:bg-[#9B5DE5]/30 pt-32 pb-24">
      {/* Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#9B5DE5]/15 rounded-[100%] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Link href="/" className="inline-block text-[#9B5DE5] hover:text-white mb-6 transition-colors">
            ← Volver al inicio
          </Link>
          <h1 className="text-5xl font-black text-white mb-6 tracking-tight">
            Contrata sin pagar de más.
          </h1>
          <p className="text-xl text-white/60 leading-relaxed font-light">
            Las agencias tradicionales te cobran un 20%. En DAO Talent Hub tú eliges: o pagas por uso, o haces un depósito de garantía retornable para contratar gratis de por vida.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {TIERS.map((tier, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-8 rounded-3xl border border-white/10 flex flex-col ${tier.color} ${tier.popular ? 'scale-105 shadow-2xl shadow-[#9B5DE5]/10 z-10' : 'z-0'}`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#00F5FF] to-[#9B5DE5] text-black text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                  Recomendado para Startups
                </div>
              )}
              
              <div className="flex items-center gap-4 mb-4">
                {tier.icon}
                <h3 className="text-2xl font-bold text-white">{tier.name}</h3>
              </div>
              <p className="text-white/60 text-sm mb-8">{tier.description}</p>
              
              <div className="mb-8">
                <span className="text-6xl font-black text-white tracking-tighter">{tier.price}</span>
                <span className="block text-white/40 text-sm mt-2">{tier.priceLabel}</span>
              </div>

              <button className={`w-full h-14 rounded-full font-bold text-lg mb-10 transition-transform hover:scale-105 ${tier.popular ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                {tier.buttonText}
              </button>

              <div className="space-y-4 flex-grow">
                {tier.features.map((feat, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#00F5FF] flex-shrink-0" />
                    <span className="text-white/80 text-sm">{feat}</span>
                  </div>
                ))}
                {tier.missing.map((feat, j) => (
                  <div key={j} className="flex items-start gap-3 opacity-40">
                    <X className="w-5 h-5 text-white flex-shrink-0" />
                    <span className="text-white text-sm line-through">{feat}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Explain the Staking */}
        <div className="mt-20 max-w-4xl mx-auto p-10 rounded-3xl bg-white/[0.02] border border-white/5 text-center">
          <Zap className="w-10 h-10 text-[#00F5FF] mx-auto mb-6" />
          <h4 className="text-2xl font-bold text-white mb-4">{tApp('howCorporateStakingWorks')}</h4>
          <p className="text-white/60 leading-relaxed">
            Nuestro modelo Premium es revolucionario. Tu depósito de $20,000 USD se bloquea en un contrato inteligente auditado. Mientras ese dinero esté depositado, tu comisión de contratación es 0%. <strong>Puedes retirar tu depósito íntegro en cualquier momento.</strong> Literalmente contratas gratis.
          </p>
        </div>
      </div>
    </main>
  );
}
