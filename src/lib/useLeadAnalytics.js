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
        utm_term: params.get('utm_term') || ''
    };
}

export function useLeadAnalytics() {
    const sessionRef = useRef(null);

    useEffect(() => {
        // Only run once per session
        if (!sessionRef.current) {
            sessionRef.current = {
                sessionId: generateSessionId(),
                startTime: new Date().toISOString(),
                referrer: document.referrer || 'Direct',
                userAgent: navigator.userAgent,
                isMobile: /Mobi|Android/i.test(navigator.userAgent),
                ...getUTMs(),
                maxScrollDepth: 0,
                clicks: [],
                lastActiveTime: new Date().toISOString()
            };
        }

        const sessionId = sessionRef.current.sessionId;

        const syncToFirebase = async () => {
            if (!sessionRef.current) return;
            sessionRef.current.lastActiveTime = new Date().toISOString();
            
            try {
                // Calculate time on page in seconds
                const start = new Date(sessionRef.current.startTime).getTime();
                const last = new Date(sessionRef.current.lastActiveTime).getTime();
                sessionRef.current.timeOnPageSeconds = Math.floor((last - start) / 1000);

                await setDoc(doc(db, 'lead_interactions', sessionId), sessionRef.current, { merge: true });
            } catch (err) {
                console.error("Error syncing analytics:", err);
            }
        };

        // Initial Sync
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

        // 2. Track Clicks (global listener for [data-track])
        const handleClick = (e) => {
            const trackElement = e.target.closest('[data-track]');
            if (trackElement) {
                const trackAction = trackElement.getAttribute('data-track');
                sessionRef.current.clicks.push({
                    action: trackAction,
                    time: new Date().toISOString(),
                });
                syncToFirebase(); // Force sync on click
            }
        };

        document.addEventListener('click', handleClick);

        // 3. Periodic Sync (every 5 seconds)
        const syncInterval = setInterval(syncToFirebase, 5000);

        // 4. Sync on leave
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                syncToFirebase();
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('click', handleClick);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            clearInterval(syncInterval);
            syncToFirebase(); // Final sync
        };
    }, []);
}
