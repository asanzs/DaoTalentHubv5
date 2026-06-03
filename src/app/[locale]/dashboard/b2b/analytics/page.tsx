"use client";
import { useTranslations } from 'next-intl';

import React, { useState, useEffect, useCallback } from "react";
import { 
  BarChart3, TrendingUp, TrendingDown, DollarSign, Users, 
  FileText, ArrowUpRight, CheckCircle2, Clock, AlertCircle, Filter
} from "lucide-react";
import { fetchEscrowList, fetchMissionsList, fetchUserBalances, EscrowContract, Mission, UserBalances } from "@/lib/mocks/service";

interface AnalyticsData {
  totalSpent: number;
  activeContracts: number;
  completedContracts: number;
  disputedContracts: number;
  avgAuditScore: number;
  talSaved: number;
  payments: PaymentRecord[];
}

interface PaymentRecord {
  id: string;
  type: 'Escrow' | 'Mission';
  title: string;
  talent: string;
  amount: number;
  currency: string;
  status: string;
  date: string;
  auditScore?: number;
}

export default function B2bAnalyticsPage() {
  const tApp = useTranslations('app');
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [filter, setFilter] = useState<'all' | 'completed' | 'active' | 'disputed'>('all');

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [escrows, missions, balances] = await Promise.all([
        fetchEscrowList(),
        fetchMissionsList(),
        fetchUserBalances()
      ]);

      const payments: PaymentRecord[] = [
        ...escrows.map((e: EscrowContract) => ({
          id: e.id,
          type: 'Escrow' as const,
          title: e.title,
          talent: e.talentName,
          amount: e.amount,
          currency: e.currency,
          status: e.status,
          date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('es-ES'),
          auditScore: e.status === 'Disbursed' || e.status === 'Delivered' ? 96 : undefined
        })),
        ...missions
          .filter((m: Mission) => m.status === 'Disbursed' || m.status === 'Delivered')
          .map((m: Mission) => ({
            id: m.id,
            type: 'Mission' as const,
            title: m.title,
            talent: m.b2bName,
            amount: m.rewardUsd,
            currency: 'USD',
            status: m.status,
            date: new Date(Date.now() - Math.random() * 20 * 24 * 60 * 60 * 1000).toLocaleDateString('es-ES'),
            auditScore: m.auditScore
          }))
      ];

      const totalSpent = escrows.reduce((acc: number, e: EscrowContract) => 
        e.status === 'Disbursed' ? acc + e.amount : acc, 0);
      const activeContracts = escrows.filter((e: EscrowContract) => e.status === 'Funded' || e.status === 'Delivered').length;
      const completedContracts = escrows.filter((e: EscrowContract) => e.status === 'Disbursed').length;

      setAnalytics({
        totalSpent,
        activeContracts,
        completedContracts,
        disputedContracts: 0,
        avgAuditScore: 96,
        talSaved: balances.tal * 0.08,
        payments: payments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    loadData();
  }, [loadData]);

  if (!mounted) return null;

  const filteredPayments = analytics?.payments.filter(p => {
    if (filter === 'all') return true;
    if (filter === 'completed') return p.status === 'Disbursed';
    if (filter === 'active') return p.status === 'Funded' || p.status === 'Delivered';
    if (filter === 'disputed') return p.status === 'Disputed';
    return true;
  }) || [];

  const statusConfig: Record<string, { label: string; color: string }> = {
    Funded:    { label: 'Activo',     color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
    Delivered: { label: 'Auditado',   color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
    Disbursed: { label: 'Pagado',     color: 'bg-green-500/10 text-green-400 border-green-500/20' },
    Pending:   { label: 'Pendiente',  color: 'bg-gray-500/10 text-gray-400 border-gray-500/20' },
    Disputed:  { label: 'En disputa', color: 'bg-red-500/10 text-red-400 border-red-500/20' },
  };

  return (
    <div className="space-y-10 pb-24">
      {/* Header */}
      <div className="flex items-center gap-3">
        <BarChart3 className="w-8 h-8 text-[#9B5DE5]" />
        <div>
          <h2 className="text-3xl font-black text-white">Analytics & Historial de Pagos</h2>
          <p className="text-gray-400">Analiza el rendimiento de tus contratos, escrow y misiones publicadas.</p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <div key={i} className="h-28 bg-white/5 rounded-3xl animate-pulse" />)}
        </div>
      ) : analytics ? (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Invertido", value: `$${analytics.totalSpent.toLocaleString()}`, sub: "en contratos cerrados", icon: DollarSign, color: "#9B5DE5", trend: "+12% vs mes anterior" },
              { label: "Contratos Activos", value: analytics.activeContracts.toString(), sub: "escrow en curso", icon: FileText, color: "#00F5FF", trend: `${analytics.activeContracts} proyectos abiertos` },
              { label: "Contratos Cerrados", value: analytics.completedContracts.toString(), sub: "pagados correctamente", icon: CheckCircle2, color: "#22C55E", trend: "Tasa de éxito 100%" },
              { label: "Score Auditoría IA", value: `${analytics.avgAuditScore}%`, sub: "media de entregas", icon: TrendingUp, color: "#F59E0B", trend: "Excelente calidad" },
            ].map(({ label, value, sub, icon: Icon, color, trend }) => (
              <div key={label} className="p-6 rounded-3xl bg-white/5 border border-white/10 relative overflow-hidden group hover:border-white/20 transition-all">
                <div className="absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl opacity-20" style={{ background: color }} />
                <div className="flex items-center justify-between mb-4">
                  <Icon className="w-5 h-5" style={{ color }} />
                  <span className="text-[9px] text-gray-600 uppercase font-bold tracking-widest">{trend}</span>
                </div>
                <p className="text-2xl font-black text-white font-mono">{value}</p>
                <p className="text-xs text-gray-500 mt-1">{label}</p>
                <p className="text-[10px] text-gray-600 mt-0.5">{sub}</p>
              </div>
            ))}
          </div>

          {/* Monthly chart (visual mock) */}
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">{tApp('contractVol6m')}</h3>
              <span className="text-xs text-green-400 font-bold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> +24% crecimiento
              </span>
            </div>
            <div className="flex items-end gap-3 h-32">
              {[
                { month: "Dic", val: 45, usd: 8200 },
                { month: "Ene", val: 60, usd: 11500 },
                { month: "Feb", val: 50, usd: 9800 },
                { month: "Mar", val: 75, usd: 14200 },
                { month: "Abr", val: 85, usd: 16800 },
                { month: "May", val: 100, usd: 20400 },
              ].map(({ month, val, usd }) => (
                <div key={month} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] text-gray-600 group-hover:text-gray-300 transition-colors font-mono">${(usd/1000).toFixed(1)}k</span>
                  <div 
                    className="w-full rounded-t-lg bg-gradient-to-t from-[#9B5DE5] to-[#9B5DE5]/50 group-hover:from-[#00F5FF] group-hover:to-[#00F5FF]/50 transition-all"
                    style={{ height: `${val}%` }}
                  />
                  <span className="text-[10px] text-gray-500 font-bold uppercase">{month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment History */}
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <Clock className="w-4 h-4" /> Historial de Transacciones
              </h3>
              <div className="flex gap-2 flex-wrap">
                {(['all', 'completed', 'active'] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all border ${
                      filter === f ? 'bg-[#9B5DE5] text-white border-[#9B5DE5]' : 'bg-white/5 text-gray-500 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {{ all: 'Todos', completed: 'Pagados', active: 'Activos' }[f]}
                  </button>
                ))}
              </div>
            </div>

            {filteredPayments.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500">{tApp('noTxFilter')}</p>
                <p className="text-xs text-gray-600 mt-2">{tApp('postFirstMission')}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Table header */}
                <div className="grid grid-cols-12 gap-4 px-4 pb-2 border-b border-white/5 text-[9px] uppercase tracking-widest text-gray-600 font-bold">
                  <div className="col-span-4">{tApp('contractMission')}</div>
                  <div className="col-span-2">Tipo</div>
                  <div className="col-span-2 text-right">Importe</div>
                  <div className="col-span-2 text-center">Score IA</div>
                  <div className="col-span-2 text-right">Estado</div>
                </div>
                {filteredPayments.map(p => {
                  const sc = statusConfig[p.status] || { label: p.status, color: 'bg-gray-500/10 text-gray-400 border-gray-500/20' };
                  return (
                    <div key={p.id} className="grid grid-cols-12 gap-4 p-4 rounded-xl bg-black/30 border border-white/5 hover:border-white/10 transition-all items-center group">
                      <div className="col-span-4">
                        <p className="font-bold text-white text-sm truncate">{p.title}</p>
                        <p className="text-[10px] text-gray-500 flex items-center gap-1 mt-0.5">
                          <Users className="w-3 h-3" /> {p.talent}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <span className={`text-[9px] px-2 py-1 rounded font-bold uppercase tracking-widest border ${
                          p.type === 'Escrow' ? 'bg-[#9B5DE5]/10 text-[#9B5DE5] border-[#9B5DE5]/20' : 'bg-[#00F5FF]/10 text-[#00F5FF] border-[#00F5FF]/20'
                        }`}>{p.type}</span>
                      </div>
                      <div className="col-span-2 text-right">
                        <span className="font-mono font-bold text-white text-sm">${p.amount.toLocaleString()}</span>
                        <span className="text-[10px] text-gray-600 block">{p.currency}</span>
                      </div>
                      <div className="col-span-2 text-center">
                        {p.auditScore ? (
                          <span className="text-sm font-black font-mono text-green-400">{p.auditScore}%</span>
                        ) : (
                          <span className="text-gray-600 text-xs">—</span>
                        )}
                      </div>
                      <div className="col-span-2 text-right">
                        <span className={`text-[9px] px-2.5 py-1 rounded-full border font-bold ${sc.color}`}>{sc.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
}
