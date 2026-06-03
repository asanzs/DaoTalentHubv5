"use client";

import React from "react";
import { motion } from "framer-motion";
import { Lock, Activity, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function HowItWorks() {
  return (
    <main className="min-h-screen bg-[#0B0C10] font-sans selection:bg-[#00F5FF]/30 pt-32 pb-24">
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#00F5FF]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <Link href="/" className="text-white/50 hover:text-white transition-colors mb-12 block">
          ← Volver al inicio
        </Link>
        
        <h1 className="text-5xl font-black text-white mb-6 tracking-tight">
          El Centro de Confianza.
        </h1>
        <p className="text-xl text-white/60 leading-relaxed font-light mb-16">
          Descubre cómo protegemos el dinero de las empresas y garantizamos el pago de los desarrolladores mediante nuestro algoritmo SafePay Escrow.
        </p>

        <div className="space-y-12">
          {/* Step 1 */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col md:flex-row gap-8 items-start"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#00F5FF]/10 flex items-center justify-center flex-shrink-0">
              <Lock className="w-8 h-8 text-[#00F5FF]" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">1. Pago Protegido (Escrow)</h3>
              <p className="text-white/60 leading-relaxed">
                Cuando una empresa contrata a un desarrollador, el dinero del pago se deposita usando Stripe o Tarjeta de Crédito. Esos fondos no van a nuestra cuenta bancaria, se bloquean en una caja fuerte algorítmica (SafePay) inmutable.
              </p>
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col md:flex-row gap-8 items-start"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#9B5DE5]/10 flex items-center justify-center flex-shrink-0">
              <Activity className="w-8 h-8 text-[#9B5DE5]" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">{tApp('workVerification')}</h3>
              <p className="text-white/60 leading-relaxed">
                El talento realiza el trabajo sabiendo al 100% que los fondos están garantizados y que nadie puede quitárselos. Si hay dudas sobre la calidad del código, un Tribunal de Arbitraje (Revisores Élite) revisa la entrega de forma imparcial.
              </p>
            </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col md:flex-row gap-8 items-start"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-[#00F5FF]/20 to-[#9B5DE5]/20 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">{tApp('autoRelease')}</h3>
              <p className="text-white/60 leading-relaxed">
                Una vez la empresa aprueba el trabajo (o el árbitro da la razón al talento), el sistema SafePay libera los fondos. El desarrollador recibe el 100% en dólares/euros directamente en su cuenta.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
