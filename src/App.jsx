import React, { useEffect } from 'react';
import './index.css';

// Componentes Modulares
import Hero from './components/Hero';
import ProblemSection from './components/ProblemSection';
import QuebraDeCrenca from './components/QuebraDeCrenca';
import BentoGrid from './components/BentoGrid';
import ProvasSociais from './components/ProvasSociais';
import FormationList from './components/FormationList';
import Modulos from './components/Modulos';
import ParaVoce from './components/ParaVoce';
import Exclusivo from './components/Exclusivo';
import Oferta from './components/Oferta';
import Faq from './components/Faq';
import Mentor from './components/Mentor';
import FloatingCTA from './components/FloatingCTA';

// =====================================
// Montagem Principal
// =====================================
const LandingPageRonaldoDias = () => {
    useEffect(() => {
        document.title = "ITR | Inglês em Tempo Recorde";
    }, []);

    return (
        <div className="min-h-screen bg-[#030308] font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
            <Hero />
            <ProblemSection />
            <QuebraDeCrenca />
            <BentoGrid />
            <ProvasSociais />
            <FormationList />
            <Modulos />
            <ParaVoce />
            <Exclusivo />
            <Oferta />
            <Faq />
            <Mentor />
            <FloatingCTA />

            <footer className="bg-[#030308] py-8 text-center border-t border-slate-900 border-b-8 border-b-emerald-600 pb-28 md:pb-8">
                <p className="text-slate-600 font-medium">© 2024 Ronaldo Dias | ITR. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
};

export default LandingPageRonaldoDias;
