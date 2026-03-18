import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import './index.css';

// ── Componentes críticos (above-the-fold, carregam imediato) ──
import HeroPlus from './components/HeroPlus';
import { PromoBanner } from './components/CountdownTimer';

const ProblemSection = lazy(() => import('./components/ProblemSection'));
const QuebraDeCrenca = lazy(() => import('./components/QuebraDeCrenca'));
const ComoFunciona = lazy(() => import('./components/ComoFunciona'));
const JornadaEvolucao = lazy(() => import('./components/JornadaEvolucao'));
const ParaQuem = lazy(() => import('./components/ParaQuem'));
const Depoimentos = lazy(() => import('./components/Depoimentos'));
const HistoriaMetodo = lazy(() => import('./components/HistoriaMetodo'));
const BonusExclusivos = lazy(() => import('./components/BonusExclusivos'));
const OfertaFinal = lazy(() => import('./components/OfertaFinal'));
const FaqNovo = lazy(() => import('./components/FaqNovo'));
const DecisaoFinal = lazy(() => import('./components/DecisaoFinal'));

// =====================================
// Montagem Principal
// =====================================
const AFFILIATE_ROUTES = {
    '/acelerar': '?affiliate=YRwE3aKT',
};

const LandingPageRonaldoDias = () => {
    const [showBanner, setShowBanner] = useState(false);
    const [ofertaInView, setOfertaInView] = useState(false);

    const basePaymentUrl = import.meta.env.VITE_PAYMENT_URL || 'https://pay.cakto.com.br/36u8zua_785324';
    const affiliateSuffix = AFFILIATE_ROUTES[window.location.pathname] || '';
    const paymentUrl = basePaymentUrl + affiliateSuffix;

    useEffect(() => {
        document.title = "ITR | Inglês em Tempo Recorde";

        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    setShowBanner(window.scrollY > 400);
                    ticking = false;
                });
                ticking = true;
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleOfertaInView = useCallback((inView) => {
        setOfertaInView(inView);
    }, []);

    return (
        <div className="min-h-screen bg-[#030308] font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
            {/* Banner de promoção — some quando a oferta está na tela */}
            <PromoBanner visible={showBanner && !ofertaInView} />

            {/* 1. A Primeira Impressão */}
            <HeroPlus />

            <Suspense fallback={<div className="min-h-screen bg-[#030308] flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin"></div></div>}>
                {/* 2. Agitação da Dor */}
                <ProblemSection />

                {/* 3. A Solução Lógica */}
                <QuebraDeCrenca />

                {/* 4. Como o Método Funciona */}
                <ComoFunciona />

                {/* 5. Jornada de Evolução */}
                <JornadaEvolucao />

                {/* 6. Para Quem É */}
                <ParaQuem />

                {/* 7. Feedbacks dos alunos */}
                <Depoimentos />

                {/* 8. A História do Método */}
                <HistoriaMetodo />

                {/* 9. Bônus Exclusivos */}
                <BonusExclusivos />

                {/* 10. A Oferta + Garantia */}
                <OfertaFinal onInView={handleOfertaInView} paymentUrl={paymentUrl} />

                {/* 11. FAQ */}
                <FaqNovo />

                {/* 12. Decisão Final */}
                <DecisaoFinal />
            </Suspense>

            <footer className="bg-[#030308] py-8 text-center border-t border-slate-900 border-b-8 border-b-emerald-600 pb-8">
                <img src="/logo-itr.png" alt="ITR Logo" className="h-8 mx-auto mb-3 opacity-60" />
                <p className="text-slate-600 font-medium">© 2026 Ronaldo Durães | ITR. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
};

export default LandingPageRonaldoDias;
