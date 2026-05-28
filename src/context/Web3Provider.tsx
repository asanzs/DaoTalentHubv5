"use client";

import React, { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { createConfig, WagmiProvider, useConnect, useAccount, useDisconnect } from 'wagmi';
import { mainnet, arbitrum, base, baseSepolia } from 'wagmi/chains';
import { injected, metaMask, coinbaseWallet } from 'wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http } from 'viem';
import { ShieldCheck, Mail, Wallet } from 'lucide-react';

export const wagmiConfig = createConfig({
  chains: [mainnet, base, baseSepolia, arbitrum],
  connectors: [
    injected(),
    metaMask(),
    coinbaseWallet({ appName: 'DAO Talent Hub' }),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [baseSepolia.id]: http(),
    [arbitrum.id]: http(),
  },
});

const queryClient = new QueryClient();

interface WalletModalContextType {
  open: () => void;
  close: () => void;
  isOpen: boolean;
}

const WalletModalContext = createContext<WalletModalContextType>({
  open: () => {},
  close: () => {},
  isOpen: false,
});

export const useWalletModal = () => useContext(WalletModalContext);

function WalletModal({ onClose }: { onClose: () => void }) {
  const { connectors, connect, isPending } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const [simulatedGoogle, setSimulatedGoogle] = useState(false);

  const getWalletIcon = (name: string) => {
    if (name.toLowerCase().includes('metamask')) return '🦊';
    if (name.toLowerCase().includes('coinbase')) return '🔵';
    return '🌐';
  };

  const handleSimulatedGoogleLogin = () => {
    setSimulatedGoogle(true);
    setTimeout(() => {
      onClose();
      // En una app real de NextAuth o Web3Auth, aquí se refrescaría la sesión.
      window.location.href = "/dashboard";
    }, 1500);
  };

  if (isConnected && address) {
    return (
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        style={{ background: 'rgba(2,4,8,0.85)', backdropFilter: 'blur(12px)' }}
        onClick={onClose}
      >
        <div
          className="w-full max-w-sm rounded-3xl border border-white/10 p-8 relative"
          style={{ background: 'linear-gradient(135deg,rgba(0,245,255,0.05),rgba(155,93,229,0.05))', boxShadow: '0 0 60px rgba(0,245,255,0.1)' }}
          onClick={e => e.stopPropagation()}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00F5FF]/40 to-transparent rounded-t-3xl" />
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-[#00F5FF]"
              style={{ background: 'linear-gradient(135deg,rgba(0,245,255,0.1),rgba(155,93,229,0.1))' }}>
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-black text-white mb-1">Sesión Iniciada</h2>
            <p className="text-[#00F5FF] font-mono text-sm">{address.slice(0, 8)}...{address.slice(-6)}</p>
          </div>
          <button
            onClick={() => { window.location.href = "/dashboard"; }}
            className="w-full py-3 rounded-2xl font-bold text-sm bg-gradient-to-r from-[#00F5FF] to-[#00BFFF] text-black hover:opacity-90 transition-all duration-300 mb-3"
          >
            Ir al Dashboard
          </button>
          <button
            onClick={() => { disconnect(); onClose(); }}
            className="w-full py-3 rounded-2xl font-bold text-sm border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-300 mb-3"
          >
            Desconectar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 animate-fade-in"
      style={{ background: 'rgba(2,4,8,0.85)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-3xl border border-white/10 p-8 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg,rgba(0,245,255,0.02),rgba(155,93,229,0.02))', boxShadow: '0 0 60px rgba(155,93,229,0.1)' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#9B5DE5]/60 to-transparent rounded-t-3xl" />
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-xl bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all"
        >
          ✕
        </button>

        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,#00F5FF20,#9B5DE520)', border: '1px solid rgba(155,93,229,0.3)' }}>
            <Wallet className="w-6 h-6 text-[#9B5DE5]" />
          </div>
          <h2 className="text-xl font-black text-white mb-1">Iniciar Sesión</h2>
          <p className="text-gray-500 text-xs">Accede a tu plataforma B2B/B2C</p>
        </div>

        <div className="space-y-3">
          {/* Opción Web2 Simulada (Web3Auth/Google) */}
          <button
            onClick={handleSimulatedGoogleLogin}
            disabled={simulatedGoogle}
            className="w-full flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group disabled:opacity-50"
          >
            <span className="text-xl w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-white">
              <Mail className="w-5 h-5" />
            </span>
            <div className="flex-1 text-left">
              <span className="block text-sm font-bold text-white group-hover:text-gray-300 transition-colors">
                Email / Google
              </span>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider">
                {simulatedGoogle ? 'Verificando...' : 'Recomendado para B2C'}
              </span>
            </div>
          </button>

          <div className="flex items-center gap-4 py-2">
            <div className="h-px bg-white/5 flex-1"></div>
            <span className="text-xs text-white/30 font-medium">O usa tu Wallet B2B</span>
            <div className="h-px bg-white/5 flex-1"></div>
          </div>

          {/* Opciones Wagmi */}
          {connectors.map(connector => (
            <button
              key={connector.uid}
              onClick={() => connect({ connector })}
              disabled={isPending}
              className="w-full flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-[#9B5DE5]/30 transition-all duration-300 group disabled:opacity-50 disabled:cursor-wait"
            >
              <span className="text-2xl w-10 h-10 flex items-center justify-center rounded-xl bg-white/5">
                {getWalletIcon(connector.name)}
              </span>
              <div className="flex-1 text-left">
                <span className="block text-sm font-bold text-white group-hover:text-[#9B5DE5] transition-colors">
                  {connector.name}
                </span>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider">
                  {isPending ? 'Conectando...' : 'Wallet Descentralizada'}
                </span>
              </div>
            </button>
          ))}
        </div>

        <p className="mt-6 text-center text-[10px] text-gray-600 font-bold tracking-wider uppercase">
          Infraestructura Segura • 0% Riesgo
        </p>
      </div>
    </div>
  );
}

function WalletModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <WalletModalContext.Provider value={{ open: () => setIsOpen(true), close: () => setIsOpen(false), isOpen }}>
      {children}
      {isOpen && <WalletModal onClose={() => setIsOpen(false)} />}
    </WalletModalContext.Provider>
  );
}

export default function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
