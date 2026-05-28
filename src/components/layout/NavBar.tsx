"use client";

import React from "react";
import Link from "next/link";
import { useWalletModal } from "@/context/Web3Provider";

export default function NavBar() {
  const { open } = useWalletModal();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0B0C10]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00F5FF] to-[#9B5DE5] flex items-center justify-center">
            <span className="text-white font-black text-xs">V5</span>
          </div>
          <span className="text-white font-bold text-xl tracking-tight">DAO Talent Hub</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/#empresas" className="text-white/70 hover:text-white transition-colors">Para Empresas</Link>
          <Link href="/#talento" className="text-white/70 hover:text-white transition-colors">Para Talento</Link>
          <Link href="/academy" className="text-white/70 hover:text-white transition-colors">Academia</Link>
          <Link href="/early-pass" className="text-[#00F5FF]/80 hover:text-[#00F5FF] transition-colors">Membresía Fundador</Link>
          <Link href="/data-room" className="text-white/70 hover:text-white transition-colors">Inversores</Link>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={open} className="text-sm font-medium text-white/70 hover:text-white hidden md:block">
            Login
          </button>
          <button onClick={open} className="h-10 px-6 rounded-full bg-white text-black font-semibold text-sm hover:scale-105 transition-transform">
            Empezar Gratis
          </button>
        </div>
      </div>
    </nav>
  );
}
