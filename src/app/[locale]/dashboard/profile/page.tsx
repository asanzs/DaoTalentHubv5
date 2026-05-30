"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { User, Mail, GitBranch, Wallet, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useAccount } from "wagmi";

export default function ProfilePage() {
  const { address } = useAccount();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-8 pb-24">
      <div className="flex items-center gap-3 mb-6">
        <User className="w-8 h-8 text-[#00F5FF]" />
        <div>
          <h2 className="text-3xl font-black text-white">Perfil y Ajustes</h2>
          <p className="text-gray-400">Gestiona tus conexiones de identidad y preferencias de la cuenta.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Identity Connections */}
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 shadow-xl space-y-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4">Conexiones de Identidad</h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-gray-300" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Web3 Wallet</h4>
                  <p className="text-xs text-gray-500 font-mono mt-1">{address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'No conectado'}</p>
                </div>
              </div>
              {address ? (
                <span className="flex items-center gap-1 text-[10px] text-green-400 font-bold uppercase bg-green-500/10 px-2 py-1 rounded">
                  <CheckCircle2 className="w-3 h-3" /> Conectado
                </span>
              ) : (
                <button className="px-4 py-2 rounded-lg bg-white/10 text-xs font-bold hover:bg-white/20 transition-all">Conectar</button>
              )}
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center">
                  <GitBranch className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">GitHub</h4>
                  <p className="text-xs text-gray-500 mt-1">johndoe (Verified)</p>
                </div>
              </div>
              <span className="flex items-center gap-1 text-[10px] text-green-400 font-bold uppercase bg-green-500/10 px-2 py-1 rounded">
                <CheckCircle2 className="w-3 h-3" /> Conectado
              </span>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Email Principal</h4>
                  <p className="text-xs text-gray-500 mt-1">john.doe@example.com</p>
                </div>
              </div>
              <span className="flex items-center gap-1 text-[10px] text-green-400 font-bold uppercase bg-green-500/10 px-2 py-1 rounded">
                <CheckCircle2 className="w-3 h-3" /> Verificado
              </span>
            </div>
          </div>
        </div>

        {/* KYC & Compliance */}
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 shadow-xl space-y-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4">Verificación (KYC)</h3>

          <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/20 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8 text-green-400" />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Identidad On-Chain Verificada</h4>
            <p className="text-sm text-gray-400 mb-6">Has completado el proceso de verificación descentralizada. Eres elegible para firmar contratos Escrow B2B.</p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/40 border border-white/5 rounded-lg text-xs font-mono text-gray-400">
              DID: did:ethr:{address ? address.slice(0, 12) : '0x...'}...
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500">Notificaciones</h4>
            <label className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5 cursor-pointer hover:bg-white/5 transition-all">
              <span className="text-sm font-medium text-gray-300">Alertas de nuevas misiones (Bounties)</span>
              <input type="checkbox" className="accent-[#00F5FF] w-4 h-4" defaultChecked />
            </label>
            <label className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5 cursor-pointer hover:bg-white/5 transition-all">
              <span className="text-sm font-medium text-gray-300">Actualizaciones de Staking / Tribunal</span>
              <input type="checkbox" className="accent-[#00F5FF] w-4 h-4" defaultChecked />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
