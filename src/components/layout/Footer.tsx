import React from "react";
import Link from "next/link";
import { Twitter, Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#020408] border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 cursor-pointer mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00F5FF] to-[#9B5DE5] flex items-center justify-center">
                <span className="text-white font-black text-xs">V5</span>
              </div>
              <span className="text-white font-bold text-xl tracking-tight">DAO Talent</span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              Revolucionando la contratación global mediante riesgo cero para empresas y 100% de ganancias para el talento.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white/40 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-white/40 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
              <a href="#" className="text-white/40 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="#" className="text-white/40 hover:text-white transition-colors"><Mail className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6">Plataforma</h4>
            <ul className="space-y-4">
              <li><Link href="/#empresas" className="text-white/40 hover:text-[#00F5FF] text-sm transition-colors">Para Empresas</Link></li>
              <li><Link href="/#talento" className="text-white/40 hover:text-[#00F5FF] text-sm transition-colors">Para Talento</Link></li>
              <li><Link href="/pricing" className="text-white/40 hover:text-[#00F5FF] text-sm transition-colors">Precios y Cashback</Link></li>
              <li><Link href="/how-it-works" className="text-white/40 hover:text-[#00F5FF] text-sm transition-colors">Garantías de Pago</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6">Ecosistema</h4>
            <ul className="space-y-4">
              <li><Link href="/academy" className="text-white/40 hover:text-[#9B5DE5] text-sm transition-colors">Academia IA</Link></li>
              <li><Link href="/early-pass" className="text-white/40 hover:text-[#9B5DE5] text-sm transition-colors">Membresía Fundador</Link></li>
              <li><Link href="/data-room" className="text-[#00F5FF]/60 hover:text-[#00F5FF] text-sm transition-colors">Data Room (VCs)</Link></li>
              <li><Link href="/whitepaper" className="text-white/40 hover:text-[#9B5DE5] text-sm transition-colors">Manifiesto V5</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-white/40 hover:text-white text-sm transition-colors">Términos y Condiciones</Link></li>
              <li><Link href="#" className="text-white/40 hover:text-white text-sm transition-colors">Privacidad</Link></li>
              <li><Link href="#" className="text-white/40 hover:text-white text-sm transition-colors">Política de Cookies</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">© 2026 DAO Talent Hub. Todos los derechos reservados.</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-white/30 text-xs font-mono">Sistemas Operativos</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
