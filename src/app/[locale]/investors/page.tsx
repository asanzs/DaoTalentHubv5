"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { 
  Mail, MessageSquare, Send, Sparkles, Shield, User, Building, ExternalLink, CheckCircle2 
} from "lucide-react";

export default function InvestorsPage() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'es';
  const t = useTranslations("investors");

  // Contact Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    investmentRange: "$50,000 - $150,000",
    message: "",
    termsAccepted: false
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call without backend
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        investmentRange: "$50,000 - $150,000",
        message: "",
        termsAccepted: false
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 bg-[#020408] relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#9B5DE5]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-[#00F5FF]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#fca311]/30 bg-[#fca311]/10 text-[#fca311] text-xs font-black uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" /> {t('hub')}
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-[1.1]">
            {t('title1')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fca311] to-[#00F5FF]">
              {t('title2')}
            </span>
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            {t('desc')}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start mt-12">
          {/* Left Column: Quick Docs and VC Pitch Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md">
              <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
                <Shield className="w-6 h-6 text-[#fca311]" /> {t('docs')}
              </h2>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                {t('docsDesc')}
              </p>
              
              <div className="space-y-4">
                <a 
                  href={`/${locale}/whitepaper`} 
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00F5FF]/30 hover:bg-white/10 transition-all group"
                >
                  <div>
                    <h4 className="font-bold text-white text-sm">{t('wpTitle')}</h4>
                    <p className="text-xs text-gray-500 mt-1">{t('wpDesc')}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#00F5FF] transition-colors" />
                </a>

                <a 
                  href={`/${locale}/data-room`} 
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#9B5DE5]/30 hover:bg-white/10 transition-all group"
                >
                  <div>
                    <h4 className="font-bold text-white text-sm">{t('drTitle')}</h4>
                    <p className="text-xs text-gray-500 mt-1">{t('drDesc')}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#9B5DE5] transition-colors" />
                </a>

                <a 
                  href={`/${locale}/early-pass`} 
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#fca311]/30 hover:bg-white/10 transition-all group"
                >
                  <div>
                    <h4 className="font-bold text-white text-sm">{t('epTitle')}</h4>
                    <p className="text-xs text-gray-500 mt-1">{t('epDesc')}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#fca311] transition-colors" />
                </a>
              </div>
            </div>

            <div className="p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md space-y-4">
              <h3 className="font-bold text-white">{t('seed')}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">{t('target')}</span>
                  <span className="text-xl font-bold text-white font-mono">$1.8M USD</span>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">{t('vesting')}</span>
                  <span className="text-xl font-bold text-[#fca311] font-mono">12m / 36m</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Ronda orientada a escalar nuestro motor de Smart Match AI y expandir el ecosistema a más de 500 agencias de desarrollo Web3 en Europa y Latinoamérica.
              </p>
            </div>
          </div>

          {/* Right Column: Contact/Investment Form */}
          <div className="lg:col-span-7">
            <div className="p-8 md:p-10 rounded-[32px] border border-white/10 bg-white/[0.02] backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#fca311]/50 to-transparent" />
              
              <h2 className="text-2xl font-black text-white mb-2 flex items-center gap-2">
                <Mail className="w-6 h-6 text-[#fca311]" /> {t('contact')}
              </h2>
              <p className="text-gray-400 text-sm mb-8">
                Completa el formulario para solicitar una llamada de presentación con J. Alfonso Sanz (CEO) o solicitar acceso premium de auditoría.
              </p>

              {submitted ? (
                <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{t('success')}</h3>
                  <p className="text-gray-400 text-sm max-w-md mx-auto">
                    Tu mensaje ha sido remitido directamente a nuestro equipo de Relaciones con Inversores. Nos pondremos en contacto contigo en un plazo máximo de 24 horas laborables.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs hover:bg-white/10 transition-colors"
                  >
                    {t('btnAnother')}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">{t('name')}</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm font-medium text-white focus:outline-none focus:border-[#fca311] focus:ring-1 focus:ring-[#fca311] transition-all"
                          placeholder={t("namePlaceholder")}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">{t('email')}</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm font-medium text-white focus:outline-none focus:border-[#fca311] focus:ring-1 focus:ring-[#fca311] transition-all"
                          placeholder={t("emailPlaceholder")}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">{t('company')}</label>
                      <div className="relative">
                        <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                          type="text"
                          required
                          value={formData.company}
                          onChange={e => setFormData({ ...formData, company: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm font-medium text-white focus:outline-none focus:border-[#fca311] focus:ring-1 focus:ring-[#fca311] transition-all"
                          placeholder={t("companyPlaceholder")}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">{t('ticket')}</label>
                      <select
                        value={formData.investmentRange}
                        onChange={e => setFormData({ ...formData, investmentRange: e.target.value })}
                        className="w-full bg-[#0d1117] border border-white/10 rounded-xl px-4 py-3.5 text-sm font-medium text-white focus:outline-none focus:border-[#fca311] focus:ring-1 focus:ring-[#fca311] transition-all"
                      >
                        <option value="$50,000 - $150,000">{t('opt1')}</option>
                        <option value="$150,000 - $500,000">{t('opt2')}</option>
                        <option value="$500,000 - $1.8M">{t('opt3')}</option>
                        <option value="Socio Estratégico B2B">{t('opt4')}</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block">{t('message')}</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-gray-500" />
                      <textarea
                        required
                        rows={4}
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3.5 text-sm font-medium text-white focus:outline-none focus:border-[#fca311] focus:ring-1 focus:ring-[#fca311] transition-all resize-none"
                        placeholder={t("msgPlaceholder")}
                      />
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      required
                      id="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={e => setFormData({ ...formData, termsAccepted: e.target.checked })}
                      className="mt-1 rounded bg-[#0d1117] border-white/10 text-[#fca311] focus:ring-0"
                    />
                    <label htmlFor="termsAccepted" className="text-xs text-gray-500 leading-normal cursor-pointer select-none">
                      Acepto que mi información sea procesada con fines de comunicación sobre la ronda Seed de DAO Talent Hub de conformidad con la Política de Privacidad de la plataforma.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !formData.termsAccepted}
                    className="w-full min-h-[50px] py-4 rounded-xl font-bold text-sm uppercase tracking-wider text-black bg-gradient-to-r from-[#fca311] to-[#e65c00] hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="animate-pulse">{t('btnSending')}</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> {t('btnSend')}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
