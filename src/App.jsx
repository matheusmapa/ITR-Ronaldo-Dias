import React, { useState, useEffect, useCallback } from 'react';
import './index.css';

// ── Componentes da LP (ordem do copywriter) ──
import Hero from './components/Hero';
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
import FloatingCTA from './components/FloatingCTA';
import { PromoBanner } from './components/CountdownTimer';

// =====================================
// Montagem Principal
// =====================================
const LandingPageRonaldoDias = () => {
    const [showBanner, setShowBanner] = useState(false);
    const [ofertaInView, setOfertaInView] = useState(false);

    useEffect(() => {
        document.title = "ITR | Inglês em Tempo Recorde";

        // Mostra o banner após o hero (scroll > 400px)
        const handleScroll = () => {
            setShowBanner(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
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
            <Hero />

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
            <OfertaFinal onInView={handleOfertaInView} />

            {/* 11. FAQ */}
            <FaqNovo />

            {/* 12. Decisão Final */}
            <DecisaoFinal />

            {/* Mobile CTA flutuante */}
            <FloatingCTA />

            <footer className="bg-[#030308] py-8 text-center border-t border-slate-900 border-b-8 border-b-emerald-600 pb-28 md:pb-8">
                <p className="text-slate-600 font-medium">© 2024 Ronaldo Dias | ITR. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
};

export default LandingPageRonaldoDias;
