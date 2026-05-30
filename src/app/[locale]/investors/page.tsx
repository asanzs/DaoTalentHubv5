import React from "react";
import Link from "next/link";
import { ArrowRight, FileText, Database, ShieldAlert } from "lucide-react";

export default function InvestorsPage() {
  return (
    <div className="min-h-screen pt-40 pb-24 px-6 bg-[#020408]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-black text-white mb-6">Investor Hub</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Exclusive access to DAO Talent Hub technical architecture, cap table, and tokenomics.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Link href="/whitepaper" className="p-8 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all group">
            <FileText className="w-10 h-10 text-[#00F5FF] mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">Whitepaper</h3>
            <p className="text-gray-400 mb-6">Deep dive into the Smart Match architecture, AI logic, and Escrow mechanics.</p>
            <span className="text-[#00F5FF] font-bold group-hover:underline flex items-center gap-2">Read Doc <ArrowRight className="w-4 h-4" /></span>
          </Link>
          
          <Link href="/data-room" className="p-8 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all group">
            <Database className="w-10 h-10 text-[#9B5DE5] mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">Data Room</h3>
            <p className="text-gray-400 mb-6">Access the Cap Table, Tokenomics, Financial Projections, and VC Deck.</p>
            <span className="text-[#9B5DE5] font-bold group-hover:underline flex items-center gap-2">Enter Room <ArrowRight className="w-4 h-4" /></span>
          </Link>
          
          <Link href="/early-pass" className="p-8 rounded-3xl border border-[#fca311]/30 bg-[#fca311]/5 hover:bg-[#fca311]/10 transition-all group">
            <ShieldAlert className="w-10 h-10 text-[#fca311] mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">Founder Pass</h3>
            <p className="text-gray-400 mb-6">Secure your early backer node and gain exclusive equity/token allocations.</p>
            <span className="text-[#fca311] font-bold group-hover:underline flex items-center gap-2">Acquire Pass <ArrowRight className="w-4 h-4" /></span>
          </Link>
        </div>
      </div>
    </div>
  );
}
