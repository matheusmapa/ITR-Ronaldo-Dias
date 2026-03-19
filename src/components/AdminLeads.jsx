import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { Activity, Users, MousePointer2, Clock, Globe, Smartphone, Monitor, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminLeads() {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        total: 0,
        mobilePerc: 0,
        avgScroll: 0,
        avgTime: 0,
        clickers: 0
    });

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                const q = query(
                    collection(db, 'lead_interactions'),
                    orderBy('startTime', 'desc'),
                    limit(100) // limit for performance in MVP
                );
                const querySnapshot = await getDocs(q);
                const fetched = [];
                let mobileCount = 0;
                let scrollSum = 0;
                let timeSum = 0;
                let clickersCount = 0;

                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    fetched.push(data);
                    
                    if (data.isMobile) mobileCount++;
                    scrollSum += (data.maxScrollDepth || 0);
                    timeSum += (data.timeOnPageSeconds || 0);
                    if (data.clicks && data.clicks.length > 0) clickersCount++;
                });

                setLeads(fetched);
                
                const total = fetched.length;
                if(total > 0) {
                    setStats({
                        total,
                        mobilePerc: Math.round((mobileCount / total) * 100),
                        avgScroll: Math.round(scrollSum / total),
                        avgTime: Math.round(timeSum / total),
                        clickers: clickersCount
                    });
                }
            } catch (error) {
                console.error("Error fetching leads:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeads();
    }, []);

    const formatTime = (seconds) => {
        if (!seconds) return '0s';
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return m > 0 ? `${m}m ${s}s` : `${s}s`;
    };

    const formatDate = (isoString) => {
        if (!isoString) return '-';
        const date = new Date(isoString);
        return date.toLocaleString('pt-BR', {
            day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#030308] flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#030308] text-slate-300 p-6 md:p-10 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                            <Activity className="w-8 h-8 text-emerald-500" />
                            Raio-X de Leads
                        </h1>
                        <p className="text-slate-500 mt-1">Análise em tempo real de comportamento na Landing Page</p>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                    <div className="bg-[#0a0f18] border border-white/5 p-4 rounded-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <Users className="w-5 h-5 text-emerald-500 mb-2" />
                        <div className="text-2xl font-bold text-white leading-none mb-1">{stats.total}</div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Sessões Recentes</div>
                    </div>
                    
                    <div className="bg-[#0a0f18] border border-white/5 p-4 rounded-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <MousePointer2 className="w-5 h-5 text-teal-500 mb-2" />
                        <div className="text-2xl font-bold text-white leading-none mb-1">{stats.clickers} <span className="text-sm font-normal text-slate-500">({Math.round((stats.clickers/stats.total)*100 || 0)}%)</span></div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Clicaram em CTA</div>
                    </div>

                    <div className="bg-[#0a0f18] border border-white/5 p-4 rounded-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <Activity className="w-5 h-5 text-amber-500 mb-2" />
                        <div className="text-2xl font-bold text-white leading-none mb-1">{stats.avgScroll}%</div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Scroll Médio</div>
                    </div>

                    <div className="bg-[#0a0f18] border border-white/5 p-4 rounded-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <Clock className="w-5 h-5 text-blue-500 mb-2" />
                        <div className="text-2xl font-bold text-white leading-none mb-1">{formatTime(stats.avgTime)}</div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Tempo Médio</div>
                    </div>

                    <div className="bg-[#0a0f18] border border-white/5 p-4 rounded-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <Smartphone className="w-5 h-5 text-purple-500 mb-2" />
                        <div className="text-2xl font-bold text-white leading-none mb-1">{stats.mobilePerc}%</div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Tráfego Mobile</div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-[#0a0f18] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead>
                                <tr className="border-b border-white/5 text-slate-500 bg-white/[0.02]">
                                    <th className="px-6 py-4 font-semibold">Data/Hora</th>
                                    <th className="px-6 py-4 font-semibold">Origem (UTM)</th>
                                    <th className="px-6 py-4 font-semibold">Dispositivo</th>
                                    <th className="px-6 py-4 font-semibold">Comportamento</th>
                                    <th className="px-6 py-4 font-semibold">Ações (Clicks)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {leads.map((lead, idx) => (
                                    <motion.tr 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.02 }}
                                        key={idx} 
                                        className="hover:bg-white/[0.02] transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-300">{formatDate(lead.startTime)}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-emerald-400 font-medium">{lead.utm_source || 'Orgânico/Direto'}</span>
                                                {(lead.utm_medium || lead.utm_campaign) && (
                                                    <span className="text-xs text-slate-500 mt-0.5">{lead.utm_medium} {lead.utm_campaign ? `| ${lead.utm_campaign}` : ''}</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {lead.isMobile ? (
                                                <div className="flex items-center gap-1.5 text-slate-400"><Smartphone className="w-4 h-4"/> Mobile</div>
                                            ) : (
                                                <div className="flex items-center gap-1.5 text-slate-400"><Monitor className="w-4 h-4"/> Desktop</div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-1.5" title="Scroll Depth">
                                                    <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                                        <div className={`h-full ${lead.maxScrollDepth > 80 ? 'bg-emerald-500' : lead.maxScrollDepth > 40 ? 'bg-amber-500' : 'bg-slate-500'}`} style={{ width: `${lead.maxScrollDepth}%`}}></div>
                                                    </div>
                                                    <span className="text-xs font-bold text-slate-400 w-8">{lead.maxScrollDepth}%</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-slate-400 text-xs">
                                                    <Clock className="w-3.5 h-3.5"/>
                                                    {formatTime(lead.timeOnPageSeconds)}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {lead.clicks && lead.clicks.length > 0 ? (
                                                <div className="flex flex-col gap-1">
                                                    {lead.clicks.map((click, i) => (
                                                        <div key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs w-max">
                                                            <MousePointer2 className="w-3 h-3" />
                                                            {click.action}
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <span className="text-slate-600 text-xs">-</span>
                                            )}
                                        </td>
                                    </motion.tr>
                                ))}
                                {leads.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                                            Nenhum lead registrado ainda. O tracking está ativo.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
