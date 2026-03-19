import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { Activity, Users, MousePointer2, Clock, Globe, Smartphone, Monitor, ChevronDown, ChevronUp, Link as LinkIcon, Info, Fingerprint } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLeads() {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedLead, setExpandedLead] = useState(null);
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
                    limit(100)
                );
                const querySnapshot = await getDocs(q);
                const fetched = [];
                let mobileCount = 0;
                let scrollSum = 0;
                let timeSum = 0;
                let clickersCount = 0;

                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    fetched.push({ id: doc.id, ...data });
                    
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

    const formatTimeDuration = (seconds) => {
        if (!seconds) return '0s';
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return m > 0 ? `${m}m ${s}s` : `${s}s`;
    };

    const formatDate = (isoString) => {
        if (!isoString) return '-';
        const date = new Date(isoString);
        return date.toLocaleString('pt-BR', {
            day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'
        });
    };

    const toggleExpand = (id) => {
        if (expandedLead === id) setExpandedLead(null);
        else setExpandedLead(id);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#030308] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin"></div>
                    <p className="text-emerald-500 font-medium tracking-widest uppercase text-xs animate-pulse">Carregando Dados...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#030308] text-slate-300 p-4 md:p-8 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-3">
                            <Activity className="w-8 h-8 text-emerald-500" />
                            Raio-X de Leads
                        </h1>
                        <p className="text-slate-500 mt-2 text-sm max-w-xl">
                            Acompanhe extaamente de onde os leads vieram, até onde rolaram a página e o que fizeram.
                        </p>
                    </div>
                    {/* Alerta sobre as Permissões */}
                    {stats.total === 0 && (
                        <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl flex items-start gap-3 max-w-md">
                            <Info className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                            <div className="text-sm">
                                <strong className="text-amber-500 block mb-1">Painel Zerado?</strong>
                                <span className="text-amber-500/80">Lembre-se de alterar as <strong className="text-amber-400">Regras do Firestore</strong> para permitir a gravação dos rastros (allow write: if true; para a coleção lead_interactions). Explicarei como no chat!</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 mb-8">
                    <div className="bg-[#0a0f18] border border-white/5 p-5 rounded-2xl relative overflow-hidden group">
                        <Users className="w-5 h-5 text-emerald-500 mb-2" />
                        <div className="text-2xl font-bold text-white mb-1">{stats.total}</div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Leads Rastreados</div>
                    </div>
                    
                    <div className="bg-[#0a0f18] border border-white/5 p-5 rounded-2xl relative overflow-hidden group">
                        <MousePointer2 className="w-5 h-5 text-teal-500 mb-2" />
                        <div className="text-2xl font-bold text-white mb-1">{stats.clickers} <span className="text-sm font-normal text-slate-500">({Math.round((stats.clickers/(stats.total||1))*100)}%)</span></div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Clicaram em CTA</div>
                    </div>

                    <div className="bg-[#0a0f18] border border-white/5 p-5 rounded-2xl relative overflow-hidden group">
                        <Activity className="w-5 h-5 text-amber-500 mb-2" />
                        <div className="flex items-end gap-2 mb-1">
                            <div className="text-2xl font-bold text-white leading-none">{stats.avgScroll}%</div>
                        </div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Scroll Médio</div>
                    </div>

                    <div className="bg-[#0a0f18] border border-white/5 p-5 rounded-2xl relative overflow-hidden group">
                        <Clock className="w-5 h-5 text-blue-500 mb-2" />
                        <div className="text-2xl font-bold text-white mb-1">{formatTimeDuration(stats.avgTime)}</div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Tempo de Atenção</div>
                    </div>

                    <div className="bg-[#0a0f18] border border-white/5 p-5 rounded-2xl relative overflow-hidden group col-span-2 lg:col-span-1">
                        <Smartphone className="w-5 h-5 text-purple-500 mb-2" />
                        <div className="text-2xl font-bold text-white mb-1">{stats.mobilePerc}%</div>
                        <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Tráfego Mobile</div>
                    </div>
                </div>

                {/* Tabela Interativa */}
                <div className="bg-[#0a0f18] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                    <div className="p-5 border-b border-white/5 flex items-center gap-3">
                        <Fingerprint className="w-5 h-5 text-slate-400" />
                        <h2 className="text-white font-semibold flex-1">Registro Detalhado de Leads</h2>
                        <span className="text-xs text-slate-500">Mostrando os últimos 100 leads</span>
                    </div>

                    <div className="divide-y divide-white/5">
                        {leads.map((lead, idx) => {
                            const isExpanded = expandedLead === lead.id;
                            const hasUTM = lead.utm_source || lead.utm_medium || lead.utm_campaign;
                            const utmSourceLabel = lead.utm_source || 'Tráfego Orgânico/Direto';

                            return (
                                <div key={lead.id} className="flex flex-col transition-colors hover:bg-white/[0.02]">
                                    {/* Linha Resumo (Clicável) */}
                                    <div 
                                        onClick={() => toggleExpand(lead.id)}
                                        className="flex items-center justify-between p-4 md:px-6 cursor-pointer"
                                    >
                                        <div className="flex items-center gap-4 md:gap-8 flex-1">
                                            {/* Data e Dispositivo */}
                                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 w-1/3 min-w-[140px]">
                                                <div className="font-medium text-slate-300 text-sm">
                                                    {formatDate(lead.startTime).split(' ')[0]} <span className="text-slate-500">{formatDate(lead.startTime).split(' ')[1]}</span>
                                                </div>
                                                <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500 bg-slate-800/50 px-2 py-1 rounded">
                                                    {lead.isMobile ? <Smartphone className="w-3.5 h-3.5"/> : <Monitor className="w-3.5 h-3.5"/>}
                                                    {lead.isMobile ? 'Mobile' : 'Desktop'}
                                                </div>
                                            </div>

                                            {/* Origem */}
                                            <div className="flex flex-col w-1/3 min-w-[150px]">
                                                <span className="text-emerald-400 font-medium text-sm truncate">{utmSourceLabel}</span>
                                                <span className="text-xs text-slate-500 truncate">{lead.utm_campaign || lead.referrer || 'Sem campanha'}</span>
                                            </div>

                                            {/* Scroll Preview */}
                                            <div className="hidden md:flex items-center gap-3 w-1/3">
                                                <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                                    <div className={`h-full ${lead.maxScrollDepth > 80 ? 'bg-emerald-500' : lead.maxScrollDepth > 40 ? 'bg-amber-500' : 'bg-slate-500'}`} style={{ width: `${lead.maxScrollDepth}%`}}></div>
                                                </div>
                                                <span className="text-xs font-bold text-slate-400 w-8">{lead.maxScrollDepth}%</span>
                                            </div>
                                        </div>

                                        {/* Status Rápido & Toggle */}
                                        <div className="flex items-center gap-4">
                                            {lead.clicks && lead.clicks.length > 0 && (
                                                <div className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] uppercase font-bold tracking-wider">
                                                    Interagiu ({lead.clicks.length})
                                                </div>
                                            )}
                                            <div className="text-slate-500">
                                                {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Área Expandida (Detalhes Completos) */}
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                className="overflow-hidden bg-[#0d1520] border-t border-white/5"
                                            >
                                                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                                                    
                                                    {/* Coluna 1: Origem e Dispositivo */}
                                                    <div className="space-y-6">
                                                        <div>
                                                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                                <LinkIcon className="w-3.5 h-3.5" /> De onde o lead veio
                                                            </h3>
                                                            {hasUTM ? (
                                                                <div className="space-y-2 bg-[#0a0f18] p-4 rounded-xl border border-white/5">
                                                                    <div className="grid grid-cols-3 gap-2 text-sm">
                                                                        <span className="text-slate-500 font-medium">Source:</span>
                                                                        <span className="col-span-2 text-emerald-400 font-semibold">{lead.utm_source || '-'}</span>
                                                                        
                                                                        <span className="text-slate-500 font-medium">Medium:</span>
                                                                        <span className="col-span-2 text-white">{lead.utm_medium || '-'}</span>
                                                                        
                                                                        <span className="text-slate-500 font-medium">Campaign:</span>
                                                                        <span className="col-span-2 text-white">{lead.utm_campaign || '-'}</span>
                                                                        
                                                                        <span className="text-slate-500 font-medium">Content:</span>
                                                                        <span className="col-span-2 text-slate-400 text-xs">{lead.utm_content || '-'}</span>
                                                                        
                                                                        <span className="text-slate-500 font-medium">Term:</span>
                                                                        <span className="col-span-2 text-slate-400 text-xs">{lead.utm_term || '-'}</span>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="text-sm text-slate-400 bg-[#0a0f18] p-4 rounded-xl border border-white/5">
                                                                    <p className="mb-2"><strong className="text-white">Acesso Direto / Sem UTMs</strong></p>
                                                                    <p className="text-xs text-slate-500">Referrer: {lead.referrer || 'Nenhum'}</p>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div>
                                                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                                <Monitor className="w-3.5 h-3.5" /> Contexto Técnico
                                                            </h3>
                                                            <div className="bg-[#0a0f18] p-4 rounded-xl border border-white/5 space-y-2">
                                                                <p className="text-sm"><span className="text-slate-500">ID da Sessão:</span> <span className="font-mono text-xs text-slate-400 ml-2">{lead.id}</span></p>
                                                                <p className="text-sm text-slate-400 mt-2 text-xs leading-relaxed">{lead.userAgent}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Coluna 2: Ações e Comportamento */}
                                                    <div className="space-y-6">
                                                        <div>
                                                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                                <Activity className="w-3.5 h-3.5" /> Timeline de Comportamento
                                                            </h3>
                                                            <div className="relative pl-4 border-l-2 border-slate-800 space-y-5">
                                                                
                                                                {/* Evento de Chegada */}
                                                                <div className="relative">
                                                                    <div className="absolute -left-[23px] top-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0d1520]"></div>
                                                                    <p className="text-sm font-semibold text-emerald-400">Entrou na Landing Page</p>
                                                                    <p className="text-xs text-slate-500 mt-0.5">{formatDate(lead.startTime)}</p>
                                                                </div>

                                                                {/* Evento de Scroll Máximo */}
                                                                <div className="relative">
                                                                    <div className="absolute -left-[23px] top-1 w-3 h-3 bg-slate-600 rounded-full border-2 border-[#0d1520]"></div>
                                                                    <p className="text-sm text-slate-300">Rolou a página até <strong className="text-white">{lead.maxScrollDepth}%</strong></p>
                                                                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-2">
                                                                        <div className="h-full bg-slate-500" style={{ width: `${lead.maxScrollDepth}%`}}></div>
                                                                    </div>
                                                                </div>

                                                                {/* Eventos de Clique (Dinâmicos) */}
                                                                {lead.clicks && lead.clicks.map((click, i) => (
                                                                    <div key={i} className="relative">
                                                                        <div className="absolute -left-[23px] top-1 w-3 h-3 bg-teal-500 rounded-full border-2 border-[#0d1520]"></div>
                                                                        <p className="text-sm text-white">
                                                                            Clicou no CTA: <span className="text-teal-400 font-mono font-medium text-xs bg-teal-500/10 px-1.5 py-0.5 rounded">{click.action}</span>
                                                                        </p>
                                                                        <p className="text-xs text-slate-500 mt-0.5">{formatDate(click.time)}</p>
                                                                    </div>
                                                                ))}

                                                                {/* Evento Final de Saída / Inatividade */}
                                                                <div className="relative">
                                                                    <div className="absolute -left-[23px] top-1 w-3 h-3 bg-amber-500/50 rounded-full border-2 border-[#0d1520]"></div>
                                                                    <p className="text-sm text-slate-400">Última atividade / Saída</p>
                                                                    <p className="text-xs text-slate-500 mt-0.5">Ficou na página por {formatTimeDuration(lead.timeOnPageSeconds)}</p>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}

                        {leads.length === 0 && (
                            <div className="p-12 text-center flex flex-col items-center">
                                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                                    <Activity className="w-8 h-8 text-slate-600" />
                                </div>
                                <h3 className="text-white text-lg font-bold mb-2">Aguardando os primeiros leads</h3>
                                <p className="text-slate-500 max-w-sm">
                                    Seus leads aparecerão aqui em tempo real. Se você já acessou a página e não apareceu, verifique as regras do Firebase.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
