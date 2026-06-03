"use client";

import React, { ReactNode, createContext, useContext, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ShieldCheck, Mail, Wallet } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';
import { WagmiProvider, useConnect, useAccount as useWagmiAccount, useDisconnect } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from '@/utils/wagmi';
import { syncWalletToProfile } from '@/app/actions/web3';

const queryClient = new QueryClient();

// ─── Combined Account Context ──────────────────────────────────────────────────────
interface AccountContextType {
  address: string | undefined;
  isConnected: boolean;
  connect: (name: string) => Promise<void>;
  disconnect: () => Promise<void>;
}

const AccountContext = createContext<AccountContextType>({
  address: undefined,
  isConnected: false,
  connect: async () => {},
  disconnect: async () => {},
});

export const useAccount = () => useContext(AccountContext);

// ─── Wallet Modal Context ──────────────────────────────────────────────────────
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

// ─── Wallet Modal UI ───────────────────────────────────────────────────────────
function WalletModal({ onClose }: { onClose: () => void }) {
  const { connect, address, isConnected, disconnect } = useAccount();
  const t = useTranslations('b2cV2.authModal');
  const [isPending, setIsPending] = useState(false);
  const [connectingType, setConnectingType] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleConnect = async (type: string) => {
    setIsPending(true);
    setConnectingType(type);
    
    try {
      await connect(type);
      if (type !== 'GitHub' && type !== 'Google/Email') {
        setIsPending(false);
        setConnectingType(null);
        onClose();
        const currentLocale = window.location.pathname.split('/')[1] || 'en';
        router.push(`/${currentLocale}/dashboard`);
      }
    } catch (e) {
      console.error(e);
      setIsPending(false);
      setConnectingType(null);
    }
  };

  const GithubIcon = () => (
    <svg xmlns="http://www.w3.org/-2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
    </svg>
  );

  if (!mounted) return null;

  let content;

  if (isConnected && address) {
    content = (
      <div
        className="fixed inset-0 z-[99999] flex items-center justify-center p-4 animate-fade-in"
        style={{ background: 'rgba(2,4,8,0.85)', backdropFilter: 'blur(12px)' }}
        onClick={onClose}
      >
        <div
          className="w-full max-w-sm rounded-3xl border border-white/10 p-8 relative"
          style={{ background: 'linear-gradient(135deg,rgba(0,245,255,0.05),rgba(155,93,229,0.05))', boxShadow: '0 0 60px rgba(0,245,255,0.1)' }}
          onClick={e => e.stopPropagation()}
        >
          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-[#00F5FF]"
              style={{ background: 'linear-gradient(135deg,rgba(0,245,255,0.1),rgba(155,93,229,0.1))' }}>
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-black text-white mb-1">{t('loggedIn')}</h2>
            <p className="text-[#00F5FF] font-mono text-sm">{address.slice(0, 8)}...{address.slice(-6)}</p>
          </div>
          <button
            onClick={() => {
              const currentLocale = window.location.pathname.split('/')[1] || 'en';
              router.push(`/${currentLocale}/dashboard`);
              onClose();
            }}
            className="w-full py-3 rounded-2xl font-bold text-sm bg-gradient-to-r from-[#00F5FF] to-[#00BFFF] text-black hover:opacity-90 transition-all duration-300 mb-3"
          >
            {t('goToDash')}
          </button>
          <button
            onClick={async () => { await disconnect(); onClose(); }}
            className="w-full py-3 rounded-2xl font-bold text-sm border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-300 mb-3"
          >
            {t('disconnect')}
          </button>
        </div>
      </div>
    );
  } else {
    content = (
      <div
        className="fixed inset-0 z-[99999] flex items-center justify-center p-4 animate-fade-in"
        style={{ background: 'rgba(2,4,8,0.85)', backdropFilter: 'blur(12px)' }}
        onClick={onClose}
      >
        <div
          className="w-full max-w-sm rounded-3xl border border-white/10 p-8 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg,rgba(0,245,255,0.02),rgba(155,93,229,0.02))', boxShadow: '0 0 60px rgba(155,93,229,0.1)' }}
          onClick={e => e.stopPropagation()}
        >
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-xl bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all">✕</button>
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#00F5FF20,#9B5DE520)', border: '1px solid rgba(155,93,229,0.3)' }}>
              <Wallet className="w-6 h-6 text-[#9B5DE5]" />
            </div>
            <h2 className="text-xl font-black text-white mb-1">{t('title')}</h2>
            <p className="text-gray-500 text-xs">{t('subtitle')}</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => handleConnect("Google/Email")}
              disabled={isPending}
              className="w-full flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group disabled:opacity-50"
            >
              <span className="text-xl w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-white">
                <Mail className="w-5 h-5" />
              </span>
              <div className="flex-1 text-left">
                <span className="block text-sm font-bold text-white group-hover:text-gray-300 transition-colors">{t('btnEmail')}</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider">{connectingType === "Google/Email" ? t('btnConnecting') : t('btnEmailDesc')}</span>
              </div>
            </button>

            <button
              onClick={() => handleConnect("GitHub")}
              disabled={isPending}
              className="w-full flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group disabled:opacity-50"
            >
              <span className="text-xl w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-white">
                <GithubIcon />
              </span>
              <div className="flex-1 text-left">
                <span className="block text-sm font-bold text-white group-hover:text-gray-300 transition-colors">{t('btnGithub')}</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-wider">{connectingType === "GitHub" ? t('btnConnecting') : t('btnGithubDesc')}</span>
              </div>
            </button>

            <div className="flex items-center gap-4 py-2">
              <div className="h-px bg-white/5 flex-1"></div>
              <span className="text-xs text-white/30 font-medium">{t('orWallet')}</span>
              <div className="h-px bg-white/5 flex-1"></div>
            </div>

            {['MetaMask', 'Coinbase Wallet'].map(name => (
              <button
                key={name}
                onClick={() => handleConnect(name)}
                disabled={isPending}
                className="w-full flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-[#9B5DE5]/30 transition-all duration-300 group disabled:opacity-50 disabled:cursor-wait"
              >
                <span className="text-2xl w-10 h-10 flex items-center justify-center rounded-xl bg-white/5">
                  {name === 'MetaMask' ? '🦊' : '🔵'}
                </span>
                <div className="flex-1 text-left">
                  <span className="block text-sm font-bold text-white group-hover:text-[#9B5DE5] transition-colors">{name}</span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider">{connectingType === name ? t('btnConnecting') : t('walletDesc')}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return createPortal(content, document.body);
}

// ─── Provider Wrappers ───────────────────────────────────────────────
function AccountProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [isConnected, setIsConnected] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Wagmi hooks
  const { address: wagmiAddress, isConnected: isWagmiConnected } = useWagmiAccount();
  const { connect: wagmiConnect, connectors } = useConnect();
  const { disconnect: wagmiDisconnect } = useDisconnect();

  useEffect(() => {
    setMounted(true);
    
    // Check Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user && !isWagmiConnected) {
        setAddress(session.user.id);
        setIsConnected(true);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user && !isWagmiConnected) {
        setAddress(session.user.id);
        setIsConnected(true);
      } else if (!isWagmiConnected) {
        setAddress(undefined);
        setIsConnected(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [isWagmiConnected]);

  // Sync Wagmi State
  useEffect(() => {
    if (isWagmiConnected && wagmiAddress) {
      setAddress(wagmiAddress);
      setIsConnected(true);
      
      // Attempt to link wallet to Supabase profile in the background
      supabase.auth.getSession().then(({ data: { session } }) => {
        syncWalletToProfile(wagmiAddress, session?.user?.id).catch(console.error);
      });
      
    } else if (mounted) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (!session?.user) {
          setAddress(undefined);
          setIsConnected(false);
        }
      });
    }
  }, [isWagmiConnected, wagmiAddress, mounted]);

  const connect = async (name: string) => { 
    if (name === 'GitHub') {
      await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}${window.location.pathname}`
        }
      });
    } else if (name === 'Google/Email') {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}${window.location.pathname}`
        }
      });
    } else {
      // Connect with Wagmi (Web3)
      const connectorName = name === 'MetaMask' ? 'MetaMask' : 'Coinbase Wallet';
      const connector = connectors.find(c => c.name === connectorName || c.id.includes(connectorName.toLowerCase().replace(' ', '')));
      if (connector) {
        wagmiConnect({ connector });
      } else {
        console.error('Connector not found:', name);
        alert('Extensión de billetera no encontrada. Instala MetaMask o Coinbase Wallet.');
      }
    }
  };

  const disconnect = async () => {
    if (isWagmiConnected) {
      wagmiDisconnect();
    }
    await supabase.auth.signOut();
    setAddress(undefined);
    setIsConnected(false);
  };

  return (
    <AccountContext.Provider value={{ address, isConnected, connect, disconnect }}>
      {children}
    </AccountContext.Provider>
  );
}

export default function Web3Provider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <>{children}</>;

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <AccountProvider>
          <WalletModalContext.Provider value={{ open: () => setIsOpen(true), close: () => setIsOpen(false), isOpen }}>
            {children}
            {isOpen && <WalletModal onClose={() => setIsOpen(false)} />}
          </WalletModalContext.Provider>
        </AccountProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
