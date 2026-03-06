import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import './index.css';

// ── Componentes críticos (above-the-fold, carregam imediato) ──
import HeroPlus from './components/HeroPlus';
import { PromoBanner } from './components/CountdownTimer';

import ProblemSection from './components/ProblemSection';
import QuebraDeCrenca from './components/QuebraDeCrenca';
import ComoFunciona from './components/ComoFunciona';
import JornadaEvolucao from './components/JornadaEvolucao';
import ParaQuem from './components/ParaQuem';
import Depoimentos from './components/Depoimentos';
import HistoriaMetodo from './components/HistoriaMetodo';
import BonusExclusivos from './components/BonusExclusivos';
import OfertaFinal from './components/OfertaFinal';
import FaqNovo from './components/FaqNovo';
import DecisaoFinal from './components/DecisaoFinal';

// ============================================
// LP Plus — cópia da LP principal para testes
// ============================================
const LandingPagePlus = () => {
    const [showBanner, setShowBanner] = useState(false);
    const [ofertaInView, setOfertaInView] = useState(false);

    useEffect(() => {
        document.title = "ITR | Inglês em Tempo Recorde — Plus";

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

            {/* 7. Depoimentos Principais */}
            <Depoimentos />

            {/* 8. A História do Método */}
            <HistoriaMetodo />

            {/* 9. Bônus Exclusivos */}
            <BonusExclusivos />

            {/* 10. A Oferta + Garantia */}
            <OfertaFinal onInView={handleOfertaInView} />

            {/* 11. FAQ */}
            <FaqNovo />

            {/* 12. Decisão Final */}
            <DecisaoFinal />

            <footer className="bg-[#030308] py-8 text-center border-t border-slate-900 border-b-8 border-b-emerald-600 pb-8">
                <p className="text-slate-600 font-medium">© 2026 Ronaldo Durães | ITR. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
};

export default LandingPagePlus;
