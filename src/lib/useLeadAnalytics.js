import { useEffect, useRef } from 'react';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

function generateSessionId() {
    return 'sess_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
}

function getUTMs() {
    const params = new URLSearchParams(window.location.search);
    return {
        utm_source: params.get('utm_source') || '',
        utm_medium: params.get('utm_medium') || '',
        utm_campaign: params.get('utm_campaign') || '',
        utm_content: params.get('utm_content') || '',
        utm_term: params.get('utm_term') || '',
        contact_email: params.get('email') || params.get('e') || params.get('mail') || '',
        contact_name: params.get('nome') || params.get('name') || params.get('n') || '',
        contact_phone: params.get('telefone') || params.get('phone') || params.get('wpp') || params.get('whatsapp') || ''
    };
}

export function useLeadAnalytics() {
    const sessionRef = useRef(null);

    useEffect(() => {
        // Bloqueio de Bots e Scrapers (Vercel, Lighthouse, Googlebot, Headless)
        const ua = navigator.userAgent.toLowerCase();
        if (/bot|crawler|spider|crawling|lighthouse|vercel|headless/i.test(ua) || window.navigator.webdriver) {
            console.log("[Analytics] Bot/Crawler detectado. Rastreador desativado.");
            return;
        }

        // Bloqueio de Admin: Se este visitante já abriu a página /admin, 
        // nós desativamos o rastreador silenciosamente para não sujar as métricas do cliente.
        if (localStorage.getItem('itr_admin_mode') === 'true') {
            console.log("[Analytics] Acesso administrativo detectado. Rastreador desativado.");
            return;
        }

        // Bloqueio de Afiliado: Leads que chegam pela rota /acelerar não pertencem ao funil principal.
        // O rastreio é desativado para não poluir as métricas do Dashboard.
        if (window.location.pathname.toLowerCase().startsWith('/acelerar')) {
            console.log("[Analytics] Rota de Afiliado detectada. Rastreador desativado.");
            return;
        }

        // Identificação de Visitante Recorrente
        let visitorId = localStorage.getItem('itr_visitor_id');
        let isReturning = true;
        if (!visitorId) {
            visitorId = `vis_${Math.random().toString(36).substring(2, 15)}`;
            localStorage.setItem('itr_visitor_id', visitorId);
            isReturning = false;
        }

        // Initialize Session Object
        if (!sessionRef.current) {
            sessionRef.current = {
                sessionId: generateSessionId(),
                visitorId: visitorId,
                isReturningVisitor: isReturning,
                startTime: new Date().toISOString(),
                referrer: document.referrer || 'Direct',
                userAgent: navigator.userAgent,
                isMobile: /Mobi|Android/i.test(navigator.userAgent),
                ...getUTMs(),
                location: 'Buscando...',
                maxScrollDepth: 0,
                journey: [{ type: 'page_enter', label: 'Entrou na Landing Page', time: new Date().toISOString() }],
                lastActiveTime: new Date().toISOString()
            };

            // Fetch Geolocation asynchronously
            fetch('https://ipapi.co/json/')
                .then(res => res.json())
                .then(data => {
                    if (data.city) {
                        const loc = `${data.city}, ${data.region}`;
                        // Bloqueio extra para bots de deploy da Vercel/AWS que rodam nestes locais
                        if (loc.includes('Santa Clara') || loc.includes('Ashburn') || loc.includes('Council Bluffs')) {
                            console.log("[Analytics] IP de Datacenter/Bot detectado. Abortando rastreio.");
                            sessionRef.current.isBot = true;
                            return;
                        }
                        sessionRef.current.location = loc;
                        syncToFirebase();
                    }
                })
                .catch(() => {
                    sessionRef.current.location = 'Desconhecida';
                });
        }

        const sessionId = sessionRef.current.sessionId;

        const syncToFirebase = async () => {
            if (!sessionRef.current || sessionRef.current.isBot) return;
            sessionRef.current.lastActiveTime = new Date().toISOString();
            
            try {
                // Calculate time on page in seconds
                const start = new Date(sessionRef.current.startTime).getTime();
                const last = new Date(sessionRef.current.lastActiveTime).getTime();
                sessionRef.current.timeOnPageSeconds = Math.floor((last - start) / 1000);

                await setDoc(doc(db, 'lead_interactions', sessionId), sessionRef.current, { merge: true });
                console.log(`[Analytics] Saved session ${sessionId} to Firebase`, sessionRef.current);
            } catch (err) {
                console.error("[Analytics] Error syncing analytics to Firebase. Rules or config might be invalid:", err);
            }
        };

        // Initial Sync
        console.log("[Analytics] Initializing hook...");
        syncToFirebase();

        // 1. Track Scroll
        let scrollTimeout;
        const handleScroll = () => {
            if (scrollTimeout) return;
            scrollTimeout = setTimeout(() => {
                const scrollTop = window.scrollY;
                const docHeight = document.documentElement.scrollHeight;
                const winHeight = window.innerHeight;
                const scrollPercent = Math.min(100, Math.round(((scrollTop + winHeight) / docHeight) * 100));
                
                if (scrollPercent > sessionRef.current.maxScrollDepth) {
                    sessionRef.current.maxScrollDepth = scrollPercent;
                }
                scrollTimeout = null;
            }, 500); // Throttle
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        // 2. Track Section Views (Intersection Observer)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionName = entry.target.getAttribute('data-section');
                    if (sectionName) {
                        const alreadyViewed = sessionRef.current.journey.some(e => e.type === 'section_view' && e.label === sectionName);
                        if (!alreadyViewed) {
                            sessionRef.current.journey.push({
                                type: 'section_view',
                                label: sectionName,
                                time: new Date().toISOString(),
                            });
                            syncToFirebase();
                        }
                    }
                }
            });
        }, { threshold: 0.2 });

        setTimeout(() => {
            document.querySelectorAll('[data-section]').forEach(el => observer.observe(el));
        }, 1000);

        // 3. Track Clicks (global listener for [data-track])
        const handleClick = (e) => {
            const trackElement = e.target.closest('[data-track]');
            if (trackElement) {
                const trackAction = trackElement.getAttribute('data-track');
                console.log(`[Analytics] Click detected on CTA: ${trackAction}`);
                sessionRef.current.journey.push({
                    type: 'click',
                    label: trackAction,
                    time: new Date().toISOString(),
                });
                syncToFirebase(); // Force sync on click
            }
        };

        document.addEventListener('click', handleClick);

        // 4. Periodic Sync (every 5 seconds)
        const syncInterval = setInterval(syncToFirebase, 5000);

        // 5. Sync and Track Exit on leave
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                sessionRef.current.journey.push({
                    type: 'page_leave',
                    label: 'Saiu ou Mudou de Aba',
                    time: new Date().toISOString()
                });
                syncToFirebase();
            } else if (document.visibilityState === 'visible') {
                sessionRef.current.journey.push({
                    type: 'page_return',
                    label: 'Retornou para a Página',
                    time: new Date().toISOString()
                });
                syncToFirebase();
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('click', handleClick);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            observer.disconnect();
            clearInterval(syncInterval);
            syncToFirebase(); // Final sync
        };
    }, []);
}
