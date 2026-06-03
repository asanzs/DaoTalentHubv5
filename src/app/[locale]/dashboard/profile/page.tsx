"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { User, Mail, GitBranch, Wallet, ShieldCheck, CheckCircle2, Bell, Edit3, Save, X } from "lucide-react";
import { useAccount, useWalletModal } from "@/context/Web3Provider";

export default function ProfilePage() {
  const { address, isConnected } = useAccount();
  const { open } = useWalletModal();
  const [mounted, setMounted] = useState(false);

  // Editable profile state
  const [editing, setEditing] = useState(false);
  const [nombre, setNombre] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [bio, setBio] = useState("Desarrollador Web3 especializado en Solidity y arquitectura DeFi. Top 1% en la plataforma.");
  const [github, setGithub] = useState("johndoe");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load from localStorage if exists
    const saved = localStorage.getItem("dao_user_profile");
    if (saved) {
      const parsed = JSON.parse(saved);
      setNombre(parsed.nombre || "John Doe");
      setEmail(parsed.email || "john.doe@example.com");
      setBio(parsed.bio || "");
      setGithub(parsed.github || "johndoe");
    }
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    localStorage.setItem("dao_user_profile", JSON.stringify({ nombre, email, bio, github }));
    setSaving(false);
    setEditing(false);
  };

  if (!mounted) return null;

  return (
    <div className="space-y-8 pb-24">
      <div className="flex items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <User className="w-8 h-8 text-[#00F5FF]" />
          <div>
            <h2 className="text-3xl font-black text-white">Perfil y Ajustes</h2>
            <p className="text-gray-400">Gestiona tus conexiones de identidad y preferencias de la cuenta.</p>
          </div>
        </div>
        <button
          onClick={() => editing ? handleSave() : setEditing(true)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${
            editing
              ? 'bg-gradient-to-r from-[#00F5FF] to-[#9B5DE5] text-black'
              : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
          }`}
        >
          {saving ? <><Save className="w-3.5 h-3.5" /> Guardando...</> :
           editing ? <><Save className="w-3.5 h-3.5" /> Guardar Cambios</> :
           <><Edit3 className="w-3.5 h-3.5" /> Editar Perfil</>}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Identity & Profile Info */}
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 shadow-xl space-y-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4">Datos de Identidad</h3>

          {/* Avatar + Name */}
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00F5FF]/20 to-[#9B5DE5]/20 border border-[#00F5FF]/30 flex items-center justify-center text-2xl font-black text-white shrink-0">
              {nombre.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase()}
            </div>
            <div className="flex-1">
              {editing ? (
                <input
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  className="w-full bg-black/50 border border-[#00F5FF]/30 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-[#00F5FF]/60"
                  placeholder="Tu nombre completo"
                />
              ) : (
                <h4 className="text-lg font-bold text-white">{nombre}</h4>
              )}
              <p className="text-xs text-gray-500 mt-1">Perfil verificado · Base L2</p>
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Descripción / Bio</label>
            {editing ? (
              <textarea
                value={bio}
                onChange={e => setBio(e.target.value)}
                className="w-full bg-black/50 border border-[#00F5FF]/30 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00F5FF]/60 resize-none h-20"
                placeholder="Describe tu expertise..."
              />
            ) : (
              <p className="text-sm text-gray-300 italic">{bio || "—"}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-white text-sm">Email Principal</h4>
                {editing ? (
                  <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-black/50 border border-[#00F5FF]/30 rounded-lg px-2 py-1 text-xs text-white focus:outline-none mt-1"
                  />
                ) : (
                  <p className="text-xs text-gray-500 mt-1">{email}</p>
                )}
              </div>
            </div>
            <span className="flex items-center gap-1 text-[10px] text-green-400 font-bold uppercase bg-green-500/10 px-2 py-1 rounded shrink-0">
              <CheckCircle2 className="w-3 h-3" /> Verificado
            </span>
          </div>

          {/* GitHub */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center">
                <GitBranch className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-white text-sm">GitHub</h4>
                {editing ? (
                  <input
                    value={github}
                    onChange={e => setGithub(e.target.value)}
                    className="w-full bg-black/50 border border-[#00F5FF]/30 rounded-lg px-2 py-1 text-xs text-white focus:outline-none mt-1"
                    placeholder="usuario-github"
                  />
                ) : (
                  <p className="text-xs text-gray-500 mt-1">@{github}</p>
                )}
              </div>
            </div>
            <span className="flex items-center gap-1 text-[10px] text-green-400 font-bold uppercase bg-green-500/10 px-2 py-1 rounded shrink-0">
              <CheckCircle2 className="w-3 h-3" /> Conectado
            </span>
          </div>

          {/* Wallet */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-gray-300" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Web3 Wallet</h4>
                <p className="text-xs text-gray-500 font-mono mt-1">
                  {address ? `${address.slice(0, 8)}...${address.slice(-6)}` : 'No conectada'}
                </p>
              </div>
            </div>
            {isConnected ? (
              <span className="flex items-center gap-1 text-[10px] text-green-400 font-bold uppercase bg-green-500/10 px-2 py-1 rounded">
                <CheckCircle2 className="w-3 h-3" /> Conectada
              </span>
            ) : (
              <button
                onClick={open}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#00F5FF]/20 to-[#9B5DE5]/20 border border-[#00F5FF]/30 text-xs font-bold text-[#00F5FF] hover:bg-[#00F5FF]/20 transition-all"
              >
                Conectar Wallet
              </button>
            )}
          </div>
        </div>

        {/* KYC & Notifications */}
        <div className="space-y-6">
          {/* KYC Card */}
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 shadow-xl">
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4">Verificación (KYC)</h3>

            <div className="p-6 rounded-2xl bg-green-500/5 border border-green-500/20 text-center">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8 text-green-400" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Identidad On-Chain Verificada</h4>
              <p className="text-sm text-gray-400 mb-4">Eres elegible para firmar contratos Escrow B2B en la plataforma.</p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/40 border border-white/5 rounded-lg text-xs font-mono text-gray-400">
                DID: did:ethr:{address ? address.slice(0, 14) : '0x8E192f...'}...
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 shadow-xl">
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
              <Bell className="w-4 h-4" /> Notificaciones
            </h3>
            <div className="space-y-3">
              {[
                { label: "Alertas de nuevas misiones (Bounties)", id: "notif-missions" },
                { label: "Actualizaciones de Staking / Tribunal", id: "notif-staking" },
                { label: "Nuevas ofertas de B2B que coinciden con tu SBT", id: "notif-match" },
                { label: "Resumen semanal de ganancias TAL", id: "notif-earnings" },
              ].map(({ label, id }) => (
                <label key={id} className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5 cursor-pointer hover:bg-white/5 transition-all">
                  <span className="text-sm font-medium text-gray-300">{label}</span>
                  <input type="checkbox" id={id} className="accent-[#00F5FF] w-4 h-4" defaultChecked />
                </label>
              ))}
            </div>
          </div>

          {/* Danger Zone - Reset Demo */}
          <div className="p-6 rounded-3xl bg-red-500/5 border border-red-500/20">
            <h3 className="text-sm font-black uppercase tracking-widest text-red-400 mb-3">Zona de Desarrollo</h3>
            <p className="text-xs text-gray-500 mb-4">Reinicia el estado de la demo para volver a probar todos los flujos desde cero.</p>
            <button
              onClick={() => {
                if (confirm("¿Reiniciar todos los datos de la demo? Esto borrará saldos, contratos y misiones.")) {
                  const keys = [
                    'dao_talent_list','dao_escrow_list','dao_airdrop_state','dao_b2b_balance',
                    'dao_missions_list','dao_talent_sbts','dao_active_stakes','dao_user_tal_balance',
                    'dao_user_vetal_balance','dao_cross_chain_balances','dao_smart_wallet_state',
                    'dao_disputes_list'
                  ];
                  keys.forEach(k => localStorage.removeItem(k));
                  alert("Demo reiniciada. Recarga la página para ver los datos frescos.");
                  window.location.reload();
                }
              }}
              className="w-full py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 font-bold text-xs uppercase tracking-widest hover:bg-red-500/20 transition-all"
            >
              Reiniciar Demo Completa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
