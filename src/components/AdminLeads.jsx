import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { Activity, Users, MousePointer2, Clock, Smartphone, Monitor, ChevronDown, ChevronUp, Link as LinkIcon, Fingerprint, MapPin, Compass, Globe, Map, Download, Printer } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLeads() {
    const [isAuthenticated, setIsAuthenticated] = useState(
        localStorage.getItem('itr_admin_auth') === 'true'
    );
    const [passInput, setPassInput] = useState('');
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
        // Marca este navegador específico como Admin permanentemente.
        // Assim, quando o admin visitar a Landing Page, os scripts de rastreamento serão desativados
        // para não poluir os dados e as métricas.
        localStorage.setItem('itr_admin_mode', 'true');

        const q = query(
            collection(db, 'lead_interactions'),
            orderBy('startTime', 'desc'),
            limit(100)
        );

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
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
                
                // Count if there are clicks in the new journey format
                const hasClickEvent = data.journey && data.journey.some(e => e.type === 'click');
                // Support legacy format for old leads
                const hasLegacyClick = data.clicks && data.clicks.length > 0;
                
                if (hasClickEvent || hasLegacyClick) clickersCount++;
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
            } else {
                setStats({ total: 0, mobilePerc: 0, avgScroll: 0, avgTime: 0, clickers: 0 });
            }
            setLoading(false);
        }, (error) => {
            console.error("Error fetching leads:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const formatTimeDuration = (seconds) => {
        if (!seconds) return '0s';
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return m > 0 ? `${m} min ${s} seg` : `${s} segundos`;
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

    const getSourceStyle = (source) => {
        const s = (source || '').toLowerCase();
        if (s.includes('instagram') || s.includes('ig')) return "bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/20";
        if (s.includes('facebook') || s.includes('fb')) return "bg-[#1877F2] text-white shadow-lg shadow-blue-500/20";
        if (s.includes('google')) return "bg-white text-slate-800 font-semibold shadow-lg shadow-white/10";
        if (s.includes('tiktok')) return "bg-black text-white shadow-lg shadow-black/50 border border-slate-800";
        if (s.includes('youtube') || s.includes('yt')) return "bg-[#FF0000] text-white shadow-lg shadow-red-500/20";
        return "bg-slate-800 text-slate-300";
    };

    const getSourceLabel = (source) => {
        const s = (source || '').toLowerCase();
        if (s.includes('instagram') || s.includes('ig')) return "Instagram";
        if (s.includes('facebook') || s.includes('fb')) return "Facebook";
        if (s.includes('google')) return "Google Ads";
        if (s.includes('tiktok')) return "TikTok";
        if (s.includes('youtube') || s.includes('yt')) return "YouTube";
        return source || "Orgânico / Direto";
    };

    const handleAuth = (e) => {
        e.preventDefault();
        if (passInput === 'SocioITR') {
            localStorage.setItem('itr_admin_auth', 'true');
            setIsAuthenticated(true);
        } else {
            alert('Acesso Restrito: Código Incorreto.');
        }
    };

    const exportCSV = () => {
        const headers = ["Data", "Hora", "Nome", "Email", "Telefone", "Origem", "Campanha", "Scroll %", "Tempo (s)", "Dispositivo", "Localização", "ID do Lead"];
        const rows = leads.map(l => [
            formatDate(l.startTime).split(' ')[0],
            formatDate(l.startTime).split(' ')[1],
            l.contact_name || '-',
            l.contact_email || '-',
            l.contact_phone || '-',
            l.utm_source || 'Orgânico',
            l.utm_campaign || '-',
            l.maxScrollDepth || 0,
            l.timeOnPageSeconds || 0,
            l.isMobile ? 'Mobile' : 'Desktop',
            `"${l.location || 'Desconhecida'}"`,
            l.visitorId || l.id
        ]);
        const csvContent = "data:text/csv;charset=utf-8," 
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `itr_leads_export_${new Date().getTime()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handlePrintPDF = () => {
        window.print();
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#030308] flex items-center justify-center p-4 font-sans">
                <div className="bg-gradient-to-br from-[#0a0f18] to-slate-900/40 border border-white/5 p-8 rounded-3xl w-full max-w-sm shadow-2xl backdrop-blur-sm">
                    <div className="flex justify-center mb-6">
                        <Activity className="w-12 h-12 text-emerald-500/80" />
                    </div>
                    <h2 className="text-white text-xl font-bold mb-2 text-center tracking-tight">Tráfego Inteligente ITR</h2>
                    <p className="text-slate-500 text-xs text-center mb-8">Digite o código do Sócio para acessar as métricas.</p>
                    <form onSubmit={handleAuth} className="flex flex-col gap-4">
                        <input
                            type="password"
                            placeholder="*************"
                            value={passInput}
                            onChange={(e) => setPassInput(e.target.value)}
                            className="bg-[#030308]/50 border border-white/10 text-emerald-400 px-4 py-3 rounded-xl focus:outline-none focus:border-emerald-500 w-full text-center tracking-[0.3em] font-mono text-lg transition-colors placeholder:tracking-normal placeholder:font-sans placeholder:text-sm placeholder:text-slate-700"
                        />
                        <button type="submit" className="bg-emerald-500 hover:bg-emerald-400 text-[#030308] uppercase tracking-wider text-sm font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/20 active:scale-95">
                            Destrancar Painel
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-[#030308] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin"></div>
                    <p className="text-emerald-500 font-medium tracking-widest uppercase text-xs animate-pulse">Buscando Leads...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#030308] text-slate-300 p-4 md:p-8 font-sans selection:bg-emerald-500/30 selection:text-emerald-200 print:bg-white print:text-black print:p-0">
            <style>{`
                @media print {
                    .print-hide { display: none !important; }
                    body { background: white !important; color: black !important; }
                    * { border-color: #ddd !important; }
                    .bg-[#0a0f18] { background: #f8f9fa !important; }
                    .text-white { color: black !important; }
                    .text-slate-400 { color: #444 !important; }
                }
            `}</style>
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-white print:text-black tracking-tight flex items-center gap-3 mb-2">
                            <Activity className="w-8 h-8 text-emerald-500 print:text-black" />
                            Tráfego Inteligente ITR
                        </h1>
                        <p className="text-slate-400 print:text-gray-600 text-sm max-w-2xl">
                            Acompanhe em tempo real quem são as pessoas na sua página de vendas, de qual canal estão vindo e como estão se comportando.
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-3 print-hide">
                        <button onClick={exportCSV} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2.5 rounded-xl font-medium text-sm transition-colors border border-white/5">
                            <Download className="w-4 h-4" /> Exportar Planilha (CSV)
                        </button>
                        <button onClick={handlePrintPDF} className="flex items-center gap-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 px-4 py-2.5 rounded-xl font-medium text-sm transition-colors border border-emerald-500/20">
                            <Printer className="w-4 h-4" /> Salvar PDF
                        </button>
                    </div>
                </div>

                {/* Linha de Estatísticas Visuais */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 mb-8">
                    <div className="bg-gradient-to-br from-[#0a0f18] to-slate-900/40 border border-white/5 p-5 rounded-2xl relative overflow-hidden group">
                        <Users className="w-5 h-5 text-emerald-500 mb-2" />
                        <div className="text-2xl font-bold text-white mb-1">{stats.total}</div>
                        <div className="text-xs text-slate-400 font-medium">Visitantes na Página</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-[#0a0f18] to-slate-900/40 border border-white/5 p-5 rounded-2xl relative overflow-hidden group">
                        <MousePointer2 className="w-5 h-5 text-teal-500 mb-2" />
                        <div className="text-2xl font-bold text-white mb-1">{stats.clickers} <span className="text-sm font-normal text-slate-500">({Math.round((stats.clickers/(stats.total||1))*100)}%)</span></div>
                        <div className="text-xs text-slate-400 font-medium">Clicaram nos Botões Verdes</div>
                    </div>

                    <div className="bg-gradient-to-br from-[#0a0f18] to-slate-900/40 border border-white/5 p-5 rounded-2xl relative overflow-hidden group">
                        <Activity className="w-5 h-5 text-amber-500 mb-2" />
                        <div className="text-2xl font-bold text-white mb-1">{stats.avgScroll}%</div>
                        <div className="text-xs text-slate-400 font-medium">Evolução do Scroll</div>
                    </div>

                    <div className="bg-gradient-to-br from-[#0a0f18] to-slate-900/40 border border-white/5 p-5 rounded-2xl relative overflow-hidden group">
                        <Clock className="w-5 h-5 text-blue-500 mb-2" />
                        <div className="text-2xl font-bold text-white mb-1">{formatTimeDuration(stats.avgTime)}</div>
                        <div className="text-xs text-slate-400 font-medium">Tempo Médio Lendo</div>
                    </div>

                    <div className="bg-gradient-to-br from-[#0a0f18] to-slate-900/40 border border-white/5 p-5 rounded-2xl relative overflow-hidden group col-span-2 lg:col-span-1">
                        <Smartphone className="w-5 h-5 text-purple-500 mb-2" />
                        <div className="text-2xl font-bold text-white mb-1">{stats.mobilePerc}%</div>
                        <div className="text-xs text-slate-400 font-medium">Acesso via Celular</div>
                    </div>
                </div>

                {/* Tabela Interativa de Leads */}
                <div className="bg-[#0a0f18]/80 border border-white/5 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm">
                    <div className="p-5 border-b border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Compass className="w-5 h-5 text-slate-400" />
                            <h2 className="text-white font-semibold">Visitantes Recentes</h2>
                        </div>
                        <span className="text-xs text-slate-500">Últimos 100 acessos, atualiza sozinho 🟢</span>
                    </div>

                    <div className="divide-y divide-white/5">
                        {leads.map((lead, idx) => {
                            const isExpanded = expandedLead === lead.id;
                            const hasUTM = lead.utm_source || lead.utm_medium || lead.utm_campaign;
                            const sourceLabel = getSourceLabel(lead.utm_source);
                            const sourceBadgeStyle = getSourceStyle(lead.utm_source);

                            return (
                                <div key={lead.id} className="flex flex-col transition-colors hover:bg-white/[0.02]">
                                    {/* Linha Resumo (Mais limpa e focada no Marketing) */}
                                    <div 
                                        onClick={() => toggleExpand(lead.id)}
                                        className="flex flex-col md:flex-row md:items-center justify-between p-4 md:px-6 cursor-pointer gap-4 md:gap-0"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-8 flex-1">
                                            {/* Hora de Chegada e Categoria */}
                                            <div className="w-32 text-sm flex flex-col gap-1">
                                                <span>
                                                    <span className="text-white font-medium">{formatDate(lead.startTime).split(' ')[1]}</span>
                                                    <span className="text-slate-500 text-xs ml-2">{formatDate(lead.startTime).split(' ')[0]}</span>
                                                </span>
                                                {lead.isReturningVisitor ? (
                                                    <span className="text-[10px] w-fit bg-purple-500/10 text-purple-400 border border-purple-500/20 px-1.5 rounded uppercase font-bold tracking-wider">RETORNOU</span>
                                                ) : (
                                                    <span className="text-[10px] w-fit bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 rounded uppercase font-bold tracking-wider">NOVO LEAD</span>
                                                )}
                                            </div>

                                            {/* Mini Badge Visuais da Origem */}
                                            <div className="flex flex-col gap-1.5 min-w-[160px]">
                                                <div className="flex items-center gap-3">
                                                    <div className={`px-3 py-1 text-xs font-bold rounded-full ${sourceBadgeStyle}`}>
                                                        {sourceLabel}
                                                    </div>
                                                    {lead.isMobile ? (
                                                        <Smartphone className="w-4 h-4 text-slate-500" />
                                                    ) : (
                                                        <Monitor className="w-4 h-4 text-slate-500" />
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-1 text-xs text-slate-400 font-medium truncate max-w-[150px]">
                                                    <MapPin className="w-3 h-3 text-emerald-500/70" /> {lead.location || 'Localizando...'}
                                                </div>
                                            </div>

                                            {/* Nome da Campanha Rápidinho ou Contato */}
                                            <div className="hidden md:flex flex-col flex-1 text-sm text-slate-400 space-y-1">
                                                <span className="truncate max-w-[200px] font-medium text-white">{lead.utm_campaign || lead.referrer || 'Acesso Orgânico'}</span>
                                                {(lead.contact_email || lead.contact_name) && (
                                                    <span className="text-xs text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 w-fit truncate max-w-[200px]">
                                                        📧 {lead.contact_email || lead.contact_name}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Resumo de Ações: Scroll e Cliques */}
                                            <div className="flex items-center gap-6 w-48 justify-end mr-4">
                                                <div className="flex flex-col items-end">
                                                    <span className="text-[10px] text-slate-500 font-medium mb-1">Leu a Página</span>
                                                    <span className={`text-sm font-bold ${lead.maxScrollDepth > 80 ? 'text-emerald-400' : 'text-slate-300'}`}>{lead.maxScrollDepth}%</span>
                                                </div>
                                                <div className="flex flex-col items-end">
                                                    <span className="text-[10px] text-slate-500 font-medium mb-1">Ação de Compra</span>
                                                    {((lead.journey && lead.journey.some(e => e.type === 'click')) || (lead.clicks && lead.clicks.length > 0)) ? (
                                                        <span className="text-teal-400 font-bold text-sm">Sim 🔥</span>
                                                    ) : (
                                                        <span className="text-slate-600 font-medium text-sm">Não</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Setinha para expandir */}
                                        <div className="hidden md:flex items-center text-slate-500 pl-4 border-l border-slate-800">
                                            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                        </div>
                                    </div>

                                    {/* Detalhes Marketing (Fácil de entender sem termos difíceis) */}
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                                className="overflow-hidden bg-[#0d1520] border-y border-emerald-500/10 shadow-inner"
                                            >
                                                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
                                                    
                                                    {/* Coluna 1: Relatório do Anúncio (Tradução dos UTMs) */}
                                                    <div>
                                                        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                                            <MapPin className="w-4 h-4 text-emerald-500" /> Descoberta: Onde encontramos esse Lead?
                                                        </h3>
                                                        
                                                        <div className="bg-[#0a0f18] rounded-2xl border border-white/5 p-5">
                                                            {hasUTM ? (
                                                                <div className="flex flex-col gap-4">
                                                                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                                                                        <span className="text-slate-500 text-sm">Qual Canal de Origem?</span>
                                                                        <span className="text-emerald-400 font-bold">{lead.utm_source || 'Não definido'}</span>
                                                                    </div>
                                                                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                                                                        <span className="text-slate-500 text-sm">Formato (Stories, Feed, Ads)</span>
                                                                        <span className="text-white font-medium">{lead.utm_medium || 'Não definido'}</span>
                                                                    </div>
                                                                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                                                                        <span className="text-slate-500 text-sm">Nome da Campanha</span>
                                                                        <span className="text-amber-400 font-bold">{lead.utm_campaign || 'Não definido'}</span>
                                                                    </div>
                                                                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                                                                        <span className="text-slate-500 text-sm">Qual Criativo/Vídeo?</span>
                                                                        <span className="text-white font-medium">{lead.utm_content || 'Não definido'}</span>
                                                                    </div>
                                                                    <div className="flex justify-between items-center">
                                                                        <span className="text-slate-500 text-sm">Palavra/Público Chave</span>
                                                                        <span className="text-slate-400 font-medium text-sm">{lead.utm_term || 'Não definido'}</span>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="text-center p-6 bg-slate-900/50 rounded-xl">
                                                                    <Globe className="w-8 h-8 text-slate-600 mx-auto mb-3" />
                                                                    <p className="text-white font-medium mb-1">Tráfego Orgânico</p>
                                                                    <p className="text-sm text-slate-500">Este lead chegou diretamente pelo link ou por outro site sem parâmetros de anúncios (UTM).</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Coluna 2: Jornada Visual na LP */}
                                                    <div>
                                                        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                                                            <Activity className="w-4 h-4 text-emerald-500" /> Raio-X da Rota do Lead
                                                        </h3>
                                                        
                                                        <div className="bg-[#0a0f18] border border-white/5 rounded-2xl p-6">
                                                            <div className="relative pl-6 border-l-2 border-slate-800 space-y-6">
                                                                
                                                                {/* Renderização da Linha do Tempo Refinada */}
                                                                {lead.journey ? (
                                                                    lead.journey.map((event, i) => {
                                                                        let evtIconColor = 'bg-slate-600';
                                                                        let evtRingColor = 'border-[#0a0f18]';
                                                                        let textCss = 'text-slate-300';
                                                                        let labelValue = event.label;
                                                                        let extraStyle = '';

                                                                        if (event.type === 'page_enter') {
                                                                            evtIconColor = 'bg-emerald-500';
                                                                            textCss = 'text-white font-medium';
                                                                        }
                                                                        if (event.type === 'section_view') {
                                                                            evtIconColor = 'bg-slate-400';
                                                                            textCss = 'text-slate-400';
                                                                            extraStyle = 'text-xs uppercase font-bold tracking-wider';
                                                                        }
                                                                        if (event.type === 'click') {
                                                                            evtIconColor = 'bg-teal-500';
                                                                            evtRingColor = 'border-[#0a0f18] ring-2 ring-teal-500/30';
                                                                            textCss = 'text-teal-400 font-bold bg-teal-500/10 px-2.5 py-1 rounded inline-block';
                                                                            
                                                                            if (labelValue.includes('cta-hero')) labelValue = '🔥 Clicou: Botão Verde do Topo';
                                                                            else if (labelValue.includes('cta-checkout')) labelValue = '💳 Clicou: Botão Ir Para Pagamento';
                                                                            else if (labelValue.includes('cta-decisao')) labelValue = '🚀 Clicou: Botão Acelerar Inglês (Rodapé)';
                                                                            else labelValue = `🔥 Clicou: ${event.label.replace('Clicou no botão:', '')}`;
                                                                        }

                                                                        return (
                                                                            <div key={i} className="relative">
                                                                                <div className={`absolute -left-[31px] top-0 w-3.5 h-3.5 rounded-full border-[3px] ${evtIconColor} ${evtRingColor}`}></div>
                                                                                <p className={`text-sm ${textCss} ${extraStyle}`}>{labelValue}</p>
                                                                                <p className="text-xs text-slate-500 mt-1">{formatDate(event.time).split(' ')[1]}</p>
                                                                            </div>
                                                                        );
                                                                    })
                                                                ) : (
                                                                    // Compatibilidade retroativa para leads velhos 
                                                                    <>
                                                                        <div className="relative">
                                                                            <div className="absolute -left-[31px] top-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-[3px] border-[#0a0f18]"></div>
                                                                            <p className="text-white font-medium text-sm">Entrou na Landing Page</p>
                                                                            <p className="text-xs text-slate-500 mt-1">Às {formatDate(lead.startTime).split(' ')[1]}</p>
                                                                        </div>
                                                                        {lead.clicks && lead.clicks.map((click, i) => (
                                                                            <div key={`old-${i}`} className="relative">
                                                                                <div className="absolute -left-[31px] top-0 w-3.5 h-3.5 bg-teal-500 rounded-full border-[3px] border-[#0a0f18] ring-2 ring-teal-500/30"></div>
                                                                                <p className="text-teal-400 font-bold bg-teal-500/10 inline-block px-2 py-0.5 rounded-md text-sm">Clicou em Comprar</p>
                                                                                <p className="text-xs text-slate-500 mt-1">{formatDate(click.time).split(' ')[1]}</p>
                                                                            </div>
                                                                        ))}
                                                                    </>
                                                                )}

                                                                {/* Evento Final */}
                                                                <div className="relative pt-2">
                                                                    <div className="absolute -left-[31px] top-2 w-3.5 h-3.5 bg-slate-700/80 rounded-full border-[3px] border-[#0a0f18] animate-pulse"></div>
                                                                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest pl-1 mt-1">Sessão / Retenção</p>
                                                                    <div className="mt-2 text-xs text-slate-400 bg-black/20 p-3 rounded-xl border border-white/5">
                                                                        O Lead desceu até <strong className="text-emerald-400">{lead.maxScrollDepth}% da página</strong> <br/>e prestou atenção durante <strong className="text-emerald-400">{formatTimeDuration(lead.timeOnPageSeconds)}</strong>.
                                                                    </div>
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
                            <div className="p-16 text-center flex flex-col items-center">
                                <div className="w-20 h-20 bg-emerald-500/5 border border-emerald-500/20 rounded-full flex items-center justify-center mb-5">
                                    <Activity className="w-10 h-10 text-emerald-500/50" />
                                </div>
                                <h3 className="text-white text-xl font-bold mb-3 tracking-tight">Estamos Escutando...</h3>
                                <p className="text-slate-400 max-w-md text-sm leading-relaxed">
                                    O seu novo painel de inteligência de rastreamento está online. Os perfis dos visitantes orgânicos e leads de anúncios aparecerão magicamente aqui, ao vivo.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
