"use client";

import React, { useState } from "react";
import { Lock, FileText, TrendingUp, Users, ArrowRight, ShieldCheck } from "lucide-react";
import { useWalletModal } from "@/context/Web3Provider";

export default function DataRoomPage() {
  const { open } = useWalletModal();
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "mythos") {
      setUnlocked(true);
    } else {
      alert("Contraseña incorrecta para el Data Room de VCs");
    }
  };

  if (!unlocked) {
    return (
      <main className="min-h-screen bg-[#0B0C10] flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[#00F5FF]/5 blur-[200px] pointer-events-none" />
        
        <div className="w-full max-w-md p-8 rounded-3xl bg-white/5 border border-white/10 relative z-10 text-center">
          <div className="w-16 h-16 rounded-2xl mx-auto mb-6 bg-white/5 flex items-center justify-center border border-white/10">
            <Lock className="w-8 h-8 text-white/50" />
          </div>
          <h1 className="text-2xl font-black text-white mb-2">Portal de Inversores</h1>
          <p className="text-white/50 text-sm mb-8">
            Área restringida. Introduce la contraseña para acceder a la Data Room (Cap Table, Proyecciones Financieras y Tracción).
          </p>

          <form onSubmit={handleUnlock} className="space-y-4">
            <input 
              type="password"
              placeholder="Contraseña (Tip: mythos)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#00F5FF] text-center"
            />
            <button 
              type="submit"
              className="w-full py-3 rounded-xl font-bold bg-[#00F5FF] text-black hover:opacity-90 transition-opacity"
            >
              Desbloquear Data Room
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/5">
            <button onClick={open} className="text-xs text-white/40 hover:text-white flex items-center justify-center gap-1 mx-auto">
              Acceder con Auth Corporativo <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0C10] pt-24 pb-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs mb-4 font-mono uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" /> Acceso Concedido
            </div>
            <h1 className="text-4xl font-black text-white mb-2">Investor Data Room</h1>
            <p className="text-white/50">Confidencial. Q3 2026 - Rondas Institucionales.</p>
          </div>
          <button onClick={() => setUnlocked(false)} className="px-4 py-2 rounded-lg bg-white/5 text-white/50 hover:bg-white/10 hover:text-white transition-colors text-sm">
            Cerrar Sesión Segura
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-4 text-[#00F5FF]">
              <TrendingUp className="w-5 h-5" /> <h3 className="font-bold">ARR Proyectado</h3>
            </div>
            <p className="text-3xl font-black text-white">€4.2M</p>
            <p className="text-white/40 text-xs mt-2">Para el cierre del año 1 post-lanzamiento</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-4 text-[#9B5DE5]">
              <Users className="w-5 h-5" /> <h3 className="font-bold">Usuarios B2C Activos</h3>
            </div>
            <p className="text-3xl font-black text-white">125k</p>
            <p className="text-white/40 text-xs mt-2">Crecimiento MoM 35%</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-4 text-white">
              <Building2 className="w-5 h-5" /> <h3 className="font-bold">B2B Partners</h3>
            </div>
            <p className="text-3xl font-black text-white">142</p>
            <p className="text-white/40 text-xs mt-2">Firmas tecnológicas e instituciones</p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-white mb-6">Documentos Confidenciales</h2>
        <div className="space-y-4">
          {[
            { title: "Business Plan Completo (PDF)", desc: "Estrategia GTM, análisis de competidores y modelo operativo.", date: "Mayo 2026" },
            { title: "Financial Model & Cap Table (Excel)", desc: "Proyecciones a 3 años, burn rate y allocation de rondas.", date: "Mayo 2026" },
            { title: "Deck de Inversión Pitch (PDF)", desc: "Versión detallada para comité de inversiones.", date: "Abril 2026" }
          ].map((doc, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/5 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white/50" />
                </div>
                <div>
                  <h4 className="text-white font-medium">{doc.title}</h4>
                  <p className="text-white/40 text-xs">{doc.desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-white/30 hidden md:block">{doc.date}</span>
                <button className="px-4 py-1.5 rounded-full bg-white/10 text-white text-xs font-medium hover:bg-white/20 transition-colors">
                  Descargar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
