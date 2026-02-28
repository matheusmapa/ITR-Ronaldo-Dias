import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import {
    Brain, Star, CheckCircle, Diamond, MessageCircle, PlayCircle, Lock, Trophy,
    Sparkles, ChevronDown, Rocket, Target, Users, Shield, Award, Zap, ArrowRight,
    Plane, ArrowUpRight, Clock, BookOpen, Globe, Play, ChevronUp, Bot, Gift,
    MonitorPlay, Smartphone, ArrowRightCircle
} from 'lucide-react';
import './index.css';

// =====================================
// Componentes Utilitários 3D / Premium
// =====================================

// Botão com efeito "Glow" e Hover Magnético
const MagneticButton = ({ children, onClick, className = '' }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const xPos = e.clientX - rect.left - rect.width / 2;
        const yPos = e.clientY - rect.top - rect.height / 2;
        x.set(xPos * 0.2); // Fator de atração
        y.set(yPos * 0.2);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ x, y }}
            onClick={onClick}
            className={`relative group ${className} outline-none border-none`}
        >
            {/* Brilho de fundo rotativo - sem overflow hidden no pai para evitar artefatos */}
            <div className="absolute inset-[-4px] bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl rounded-full"></div>

            {/* Corpo do botão */}
            <div className="relative z-10 flex items-center justify-center bg-emerald-500 text-slate-950 px-8 py-4 rounded-full font-extrabold text-lg shadow-[0_4px_20px_rgba(16,185,129,0.4)] group-hover:shadow-[0_8px_30px_rgba(16,185,129,0.6)] transition-shadow">
                {children}
            </div>
        </motion.button>
    );
};

// Card 3D que rotaciona conforme o mouse (Tilt Effect)
const TiltCard = ({ children, className = '' }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useTransform(x, [-100, 100], [-10, 10]);
    const mouseYSpring = useTransform(y, [-100, 100], [10, -10]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Distância do centro
        x.set(e.clientX - rect.left - centerX);
        y.set(e.clientY - rect.top - centerY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX: mouseYSpring,
                rotateY: mouseXSpring,
                perspective: 1000
            }}
            className={`relative rounded-3xl border border-slate-800/50 bg-slate-900/40 backdrop-blur-xl shrink-0 overflow-hidden ${className}`}
        >
            {/* Reflexo sutil acompanhando o mouse */}
            <motion.div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useTransform(
                        [x, y],
                        ([latestX, latestY]) => `radial-gradient(600px circle at ${latestX + 150}px ${latestY + 150}px, rgba(16,185,129,0.1), transparent 40%)`
                    )
                }}
            />
            {children}
        </motion.div>
    );
};

const HolographicBrain = () => {
    return (
        <div className="relative w-full aspect-square max-w-[500px] flex items-center justify-center">
            {/* Glows and Auras */}
            <div className="absolute w-[120%] h-[120%] bg-emerald-500/10 rounded-full blur-[80px] animate-pulse"></div>
            <div className="absolute w-[80%] h-[80%] bg-teal-400/20 rounded-full blur-[60px]"></div>

            {/* Rotating 3D Container */}
            <motion.div
                animate={{ rotateY: 360 }}
                transition={{ duration: 25, ease: "linear", repeat: Infinity }}
                className="relative w-full h-full flex items-center justify-center preserve-3d"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Core Brain Icon (Front) */}
                <div className="absolute flex items-center justify-center transform translate-z-12 drop-shadow-[0_0_25px_rgba(16,185,129,0.8)]">
                    <Brain className="w-64 h-64 text-emerald-400 stroke-[1] -ml-4" />
                </div>

                {/* Wireframe Layer 1 (Back/Depth) */}
                <div className="absolute flex items-center justify-center transform -translate-z-12 opacity-40 scale-90 blur-[1px]">
                    <Brain className="w-64 h-64 text-teal-500 stroke-[1.5] -ml-4" />
                </div>

                {/* Vertical Scanning Plane */}
                <motion.div
                    animate={{ y: ["-100%", "100%", "-100%"] }}
                    transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                    className="absolute w-[80%] h-2 bg-gradient-to-r from-transparent via-emerald-300 to-transparent blur-[2px] opacity-60 z-10"
                />

                {/* Data Points / Nodes */}
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-emerald-300 rounded-full shadow-[0_0_10px_#34d399]"
                        style={{
                            top: `${Math.random() * 60 + 20}%`,
                            left: `${Math.random() * 60 + 20}%`,
                            transform: `translateZ(${Math.random() * 40 - 20}px)`,
                        }}
                        animate={{
                            opacity: [0.2, 1, 0.2],
                            scale: [0.8, 1.2, 0.8],
                        }}
                        transition={{
                            duration: Math.random() * 2 + 1,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </motion.div>
        </div>
    );
};

const HeroSection = () => {
    return (
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#050510] pt-12 pb-6">
            {/* Background Gradients (Apple Style) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-600/20 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-teal-600/10 blur-[100px] rounded-full pointer-events-none"></div>

            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUscDAuMDUpIi8+PC9zdmc+')] opacity-20"></div>

            <div className="relative z-10 max-w-7xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

                {/* Left Column: Copy & CTA */}
                <div className="text-left flex flex-col items-start pt-8 md:pt-0">
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-3 backdrop-blur-md"
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>ITR | Inglês em Tempo Recorde</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-4 tracking-tight"
                    >
                        O Fim da <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500 text-glow">
                            Tradução Mental
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-base md:text-lg text-emerald-400 mb-3 max-w-xl leading-relaxed font-bold uppercase tracking-widest"
                    >
                        Destrave sua Fluência e Fale Inglês com Naturalidade.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.25 }}
                        className="text-sm md:text-base text-slate-400 mb-10 max-w-xl leading-relaxed font-light"
                    >
                        Descubra o método exato de memorização que desbloqueia a sua mente para aprender dezenas de palavras por dia, eliminando os "brancos" na hora de conversar — mesmo que você já tenha tentado de tudo.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.35 }}
                        className="flex flex-col items-start gap-5 w-full md:w-auto"
                    >
                        <div className="flex flex-col items-center md:items-start gap-2 w-full md:w-auto">
                            <MagneticButton className="w-full md:w-auto text-center" onClick={() => document.getElementById('oferta').scrollIntoView({ behavior: 'smooth' })}>
                                QUERO ACELERAR MEU INGLÊS AGORA
                            </MagneticButton>
                            <p className="text-[10px] text-slate-500 font-medium tracking-wide w-full text-center md:text-left">
                                Acesso Imediato • 7 Dias de Garantia
                            </p>
                        </div>

                        <div className="flex items-center gap-4 bg-slate-900/40 p-2.5 rounded-xl border border-slate-800/50 w-full md:w-auto justify-center md:justify-start">
                            <div className="flex -space-x-3">
                                <img src="https://i.pravatar.cc/100?img=1" className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover" alt="Student" />
                                <img src="https://i.pravatar.cc/100?img=2" className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover" alt="Student" />
                                <img src="https://i.pravatar.cc/100?img=3" className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover" alt="Student" />
                            </div>
                            <div className="flex flex-col text-left">
                                <div className="flex text-yellow-500 gap-0.5">
                                    <Star className="w-3 h-3 fill-current" />
                                    <Star className="w-3 h-3 fill-current" />
                                    <Star className="w-3 h-3 fill-current" />
                                    <Star className="w-3 h-3 fill-current" />
                                    <Star className="w-3 h-3 fill-current" />
                                </div>
                                <span className="text-[10px] text-slate-400 font-bold tracking-tight whitespace-nowrap">+1.200 alunos satisfeitos</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right Column: Holographic Brain (Visível apenas em desktop) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="hidden lg:flex items-center justify-center"
                >
                    <HolographicBrain />
                </motion.div>

            </div>
        </section>
    );
};

const BeneficiosTransition = () => {
    return (
        <section className="bg-[#050510] py-6 px-6 relative z-20 -mt-10 mb-10">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                    {[
                        { title: "Destrua o bloqueio da fala", desc: "Forme frases instantaneamente, sem traduzir palavra por palavra." },
                        { title: "Absorção em Tempo Recorde", desc: "Memorize o vocabulário estratégico de alta frequência que os nativos realmente usam." },
                        { title: "Método Validado", desc: "A aplicação prática para você sair da teoria e ter segurança na comunicação hoje mesmo." }
                    ].map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 bg-[#0a0f18]/80 backdrop-blur-sm p-5 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
                            <div className="mt-1 bg-emerald-500/10 p-1.5 rounded-full shrink-0 border border-emerald-500/20">
                                <CheckCircle className="w-4 h-4 text-emerald-400" />
                            </div>
                            <p className="text-slate-300 text-[12px] md:text-sm leading-relaxed">
                                <strong className="text-white font-bold block mb-1 tracking-wide">{item.title}</strong> {item.desc}
                            </p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

const BentoBento = () => {
    return (
        <section className="py-32 px-6 bg-[#030308] relative">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                        O que você vai <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">conquistar</span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Abandone os métodos antigos. O ITR é desenhado para acelerar o seu cérebro, construir vocabulário e destravar a sua língua.
                    </p>
                </div>

                {/* Bento Grid layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 max-w-5xl mx-auto">

                    {/* Card 1 - Grande */}
                    <TiltCard className="md:col-span-2 md:row-span-1 p-8 group">
                        <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                            <MessageCircle className="text-emerald-400 w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Confiança na Conversão</h3>
                        <p className="text-slate-400 leading-relaxed font-light text-lg">
                            Domine a conversação e a escuta com extrema naturalidade. Sem travar na hora de responder, apenas a fala fluindo.
                        </p>
                    </TiltCard>

                    {/* Card 2 */}
                    <TiltCard className="p-8 group">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                            <Clock className="text-blue-400 w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Tempo Recorde</h3>
                        <p className="text-slate-400 leading-relaxed font-light">
                            Memorize centenas de palavras novas de forma permanente, otimizando o seu tempo de estudos.
                        </p>
                    </TiltCard>

                    {/* Card 3 */}
                    <TiltCard className="p-8 group">
                        <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/20 group-hover:bg-purple-500/20 transition-colors">
                            <Shield className="text-purple-400 w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Método Validado</h3>
                        <p className="text-slate-400 leading-relaxed font-light">
                            Testado e aprovado por pessoas reais que saíram do zero à fluência sem complicações.
                        </p>
                    </TiltCard>

                    {/* Card 4 - Grande */}
                    <TiltCard className="md:col-span-2 md:row-span-1 p-8 group overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Brain className="w-32 h-32" />
                        </div>
                        <div className="w-12 h-12 bg-teal-500/10 rounded-2xl flex items-center justify-center mb-6 border border-teal-500/20 group-hover:bg-teal-500/20 transition-colors">
                            <Sparkles className="text-teal-400 w-6 h-6" />
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">O Fim da Tradução Mental</h3>
                        <p className="text-slate-400 leading-relaxed font-light text-lg max-w-md relative z-10">
                            Desenvolva o mecanismo interno para <strong className="text-white">pensar diretamente em inglês</strong>, como um nativo faria.
                        </p>
                    </TiltCard>

                </div>
            </div>
        </section>
    );
};

const ProvasSociais = () => {
    return (
        <section className="py-24 px-6 bg-[#050510] relative overflow-hidden border-t border-slate-900">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-emerald-900/10 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        O que dizem os <span className="text-emerald-400">Grandes Nomes</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Bill Gates */}
                    <TiltCard className="p-8 bg-slate-900/60 border-slate-800 relative group">
                        <div className="absolute -top-4 -left-4 w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-4xl text-emerald-400 font-serif leading-none mt-2">"</span>
                        </div>
                        <div className="flex flex-col h-full justify-between">
                            <p className="text-lg text-slate-300 italic leading-relaxed mb-8 relative z-10">
                                “Em um mundo que está cada vez mais conectado, quem domina o inglês sai na frente.”
                            </p>
                            <div>
                                <h4 className="text-white font-bold text-lg">Bill Gates</h4>
                                <p className="text-emerald-400 text-sm">Fundador da Microsoft</p>
                            </div>
                        </div>
                    </TiltCard>

                    {/* Warren Buffett */}
                    <TiltCard className="p-8 bg-slate-900/60 border-slate-800 relative group">
                        <div className="absolute -top-4 -left-4 w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-4xl text-emerald-400 font-serif leading-none mt-2">"</span>
                        </div>
                        <div className="flex flex-col h-full justify-between">
                            <p className="text-lg text-slate-300 italic leading-relaxed mb-8 relative z-10">
                                “O melhor investimento que você pode fazer é em si mesmo. Quanto mais você aprende, mais você ganha.”
                            </p>
                            <div>
                                <h4 className="text-white font-bold text-lg">Warren Buffett</h4>
                                <p className="text-emerald-400 text-sm text-balance">Considerado o mais bem sucedido investidor do século XX</p>
                            </div>
                        </div>
                    </TiltCard>

                    {/* Gustavo Kuerten */}
                    <TiltCard className="p-8 bg-slate-900/60 border-slate-800 relative group">
                        <div className="absolute -top-4 -left-4 w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-4xl text-emerald-400 font-serif leading-none mt-2">"</span>
                        </div>
                        <div className="flex flex-col h-full justify-between">
                            <p className="text-lg text-slate-300 italic leading-relaxed mb-8 relative z-10">
                                "O inglês abriu portas na minha carreira internacional. Se eu não falasse, ia perder metade das oportunidades."
                            </p>
                            <div>
                                <h4 className="text-white font-bold text-lg">Gustavo Kuerten</h4>
                                <p className="text-emerald-400 text-sm">Maior tenista do Brasil</p>
                            </div>
                        </div>
                    </TiltCard>
                </div>
            </div>
        </section>
    );
}

const FormationList = () => {
    return (
        <section className="py-24 px-6 bg-[#030308] border-t border-slate-900">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
                <div className="w-full md:w-1/2">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Tudo que você precisa para <span className="text-teal-400">destravar</span>
                    </h2>
                    <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                        O Método ITR não é apenas um punhado de aulas gravadas. É uma experiência imersiva com começo, meio e fluência.
                    </p>
                    <MagneticButton onClick={() => document.getElementById('oferta').scrollIntoView({ behavior: 'smooth' })}>
                        QUERO ACESSAR AGORA
                    </MagneticButton>
                </div>

                <div className="w-full md:w-1/2">
                    <div className="space-y-4">
                        {[
                            "Módulos direcionados para o seu nível",
                            "Acesso imediato ao curso completo",
                            "Aulas curtas e práticas",
                            "Material de apoio exclusivo",
                            "Suporte direto com o criador do método",
                            "Diversos Bônus de aceleração"
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-center p-4 bg-slate-900/50 rounded-xl border border-slate-800/80 hover:border-teal-500/50 transition-colors"
                            >
                                <div className="w-8 h-8 rounded-full bg-teal-500/10 flex items-center justify-center mr-4 shrink-0">
                                    <CheckCircle className="w-4 h-4 text-teal-400" />
                                </div>
                                <span className="text-slate-200 font-medium">{item}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const Modulos = () => {
    const modulos = [
        { num: "0", title: "Comece por aqui", desc: "Apresentação detalhada da metodologia." },
        { num: "1", title: "A Base do Método", desc: "Técnicas iniciais para preparar sua mente." },
        { num: "2", title: "Inglês Zero e Básico", desc: "Direcionamento p/ quem está começando do zero." },
        { num: "3", title: "Inglês Intermediário", desc: "Focado em quem entende algo, mas trava ao evoluir." },
        { num: "4", title: "Inglês Avançado", desc: "Destrave dificuldades em níveis profundos." },
        { num: "5", title: "O Próximo Nível", desc: "Kit prático para manter sua evolução eterna." }
    ];

    return (
        <section className="py-32 px-6 bg-[#030308] border-t border-slate-900">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-20 text-white">
                    Estrutura <span className="text-teal-400 font-black">Completa</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {modulos.map((mod, i) => (
                        <TiltCard key={i} className="bg-slate-900/40 p-8 border-slate-800/80 hover:border-teal-500/30">
                            <span className="text-teal-400/20 text-6xl font-black absolute top-4 right-4 pointer-events-none">{mod.num}</span>
                            <h3 className="text-xl font-bold text-white mb-3 mt-4 relative z-10">Módulo {mod.num} <br /> <span className="text-teal-400">{mod.title}</span></h3>
                            <p className="text-slate-400 font-light relative z-10">{mod.desc}</p>
                        </TiltCard>
                    ))}
                </div>
            </div>
        </section>
    )
}

const ParaVoceSection = () => {
    return (
        <section className="py-24 px-6 bg-[#050510]">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-white">
                    Esse curso é <span className="text-emerald-400 font-black">para você</span>
                </h2>

                <div className="space-y-4">
                    {[
                        { text: "Já fez curso de inglês e desistiu no meio do caminho", delay: 0 },
                        { text: "Está fazendo inglês e quer acelerar brutalmente seus resultados", delay: 0.1 },
                        { text: "Terminou um curso, mas sente que empacou na conversação", delay: 0.2 },
                        { text: "Nunca aprendeu inglês até hoje por causa de métodos travados", delay: 0.3 },
                        { text: "Quer atingir a fluência em tempo recorde de uma vez por todas", delay: 0.4 }
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: item.delay, duration: 0.5 }}
                            className="group flex items-center bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800 transition-all cursor-default"
                        >
                            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center mr-6 shrink-0 group-hover:scale-110 transition-transform">
                                <CheckCircle className="w-5 h-5 text-emerald-400" />
                            </div>
                            <p className="text-slate-300 font-medium md:text-lg">{item.text}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

const Exclusivo = () => {
    return (
        <section className="py-24 px-6 bg-[#050510] relative overflow-hidden">
            {/* Glow Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[120px]"></div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Garantindo hoje, você leva <span className="text-yellow-400 font-black">Bônus</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-20">
                    <TiltCard className="bg-gradient-to-br from-slate-900 to-[#0A0D14] p-8 border-slate-800 hover:border-yellow-500/30">
                        <Brain className="w-10 h-10 text-yellow-500 mb-6" />
                        <h3 className="text-xl font-bold text-white mb-3">Módulo Expansão</h3>
                        <p className="text-slate-400 font-light">Técnicas de memorização testadas em outras áreas.</p>
                    </TiltCard>

                    <TiltCard className="bg-gradient-to-br from-slate-900 to-[#0A0D14] p-8 border-slate-800 hover:border-yellow-500/30">
                        <Bot className="w-10 h-10 text-yellow-500 mb-6" />
                        <h3 className="text-xl font-bold text-white mb-3">IA Personalizada</h3>
                        <p className="text-slate-400 font-light">Inteligência Artificial programada para te treinar 24/7.</p>
                    </TiltCard>

                    <TiltCard className="bg-gradient-to-br from-slate-900 to-[#0A0D14] p-8 border-slate-800 hover:border-yellow-500/30">
                        <Users className="w-10 h-10 text-yellow-500 mb-6" />
                        <h3 className="text-xl font-bold text-white mb-3">Comunidade VIP</h3>
                        <p className="text-slate-400 font-light">Acesso no WhatsApp para suporte e desafios diários.</p>
                    </TiltCard>
                </div>

                <div className="bg-slate-900/60 border border-slate-800 p-10 md:p-16 rounded-3xl backdrop-blur-md relative overflow-hidden group">
                    <div className="absolute top-0 right-0 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Plane className="w-64 h-64 text-emerald-400 -translate-y-10 translate-x-10" />
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 relative z-10 italic">"Feche os olhos e imagine..."</h3>
                    <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-3xl relative z-10 italic border-l-4 border-emerald-500 pl-6">
                        Você fazendo a viagem dos sonhos, assistindo filmes sem legenda e dominando o mundo ao seu redor. Tudo por uma escolha hoje.
                    </p>
                </div>
            </div>
        </section>
    );
}

const Oferta = () => {
    return (
        <section id="oferta" className="py-32 px-6 bg-[#030308] flex justify-center items-center">
            <div className="w-full max-w-4xl">
                <TiltCard className="bg-gradient-to-b from-slate-900 to-[#0A0D14] border-t-4 border-t-emerald-500 border-x-slate-800 border-b-slate-800 overflow-hidden relative">

                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMTYsMTg1LDEyOSwwLjA1KSIvPjwvc3ZnPg==')] opacity-40"></div>

                    <div className="p-10 md:p-16 text-center relative z-10 flex flex-col items-center">
                        <p className="text-base md:text-lg text-emerald-400/90 mb-6 max-w-2xl mx-auto leading-relaxed font-medium italic border-l-2 border-r-2 border-emerald-500/30 px-6">
                            "Você não precisa de mais anos pagando mensalidades para aprender gramática na teoria. Você precisa da ordem certa para construir a sua fluência."
                        </p>

                        <h2 className="text-3xl md:text-5xl font-black text-white mb-4">A hora de agir é <span className="text-emerald-400">agora</span></h2>
                        <p className="text-slate-400 text-lg mb-10 max-w-xl">
                            Tenha acesso imediato a todo o método ITR, todos os módulos e todos os bônus exclusivos.
                        </p>

                        <div className="mb-10 flex flex-col items-center">
                            <span className="text-slate-500 font-medium line-through mb-2 text-xl">De R$ 399,00</span>
                            <div className="flex items-start justify-center gap-3">
                                <span className="text-2xl font-bold text-slate-400 mt-2">por</span>
                                <span className="text-7xl md:text-8xl font-black text-emerald-400 tracking-tighter drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">R$ 200</span>
                            </div>
                            <span className="bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-full font-medium text-sm mt-6 border border-emerald-500/20">Acesso Vitalício</span>
                        </div>

                        <MagneticButton className="w-full md:w-auto shadow-2xl! shadow-emerald-500/50!">
                            GARANTIR MINHA VAGA AGORA
                        </MagneticButton>

                        <div className="flex gap-6 mt-8 opacity-60">
                            <div className="flex items-center gap-2 text-sm text-slate-300 font-medium"><Shield className="w-4 h-4 text-emerald-400" /> Compra Segura</div>
                            <div className="flex items-center gap-2 text-sm text-slate-300 font-medium"><Award className="w-4 h-4 text-emerald-400" /> 7 Dias de Garantia</div>
                        </div>
                    </div>
                </TiltCard>
            </div>
        </section>
    )
}

const FaqItem = ({ q, a }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={`border ${isOpen ? 'border-emerald-500/50 bg-slate-800/80' : 'border-slate-800 bg-slate-900/40'} rounded-2xl overflow-hidden transition-all duration-300 backdrop-blur-sm`}>
            <button
                className="w-full px-6 py-6 text-left flex justify-between items-center focus:outline-none group"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={`font-bold pr-4 transition-colors ${isOpen ? 'text-emerald-400' : 'text-slate-200 group-hover:text-white'}`}>{q}</span>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                    <ChevronDown className={`w-5 h-5 shrink-0 ${isOpen ? 'text-emerald-400' : 'text-slate-500'}`} />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="px-6 pb-6 text-slate-400 leading-relaxed font-light">
                            {a}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

const Faq = () => {
    const faqs = [
        { q: "Minha rotina é corrida, consigo acompanhar?", a: "O acesso é vitalício e o conhecimento que passarei pode ser adaptado para diferentes rotinas. Perfeito pra quem tem pouco tempo." },
        { q: "Tenho zero conhecimento, serve para mim?", a: "Sim, ele vai te ajudar muito! Esse curso foi projetado para pessoas que já tem certo contato com a língua, mas todas as técnicas de memorização garantem que iniciantes aprendam em tempo recorde." },
        { q: "Tem certificado aprovado pelo MEC?", a: "Seu certificado será seu resultado assustador que você terá em pouco tempo quando abrir a boca para conversar." },
        { q: "Quando vou receber o acesso ao meu curso?", a: "Logo após o pagamento você será redirecionado e receberá seu acesso imediato e garantido por e-mail." },
        { q: "A compra é segura?", a: "Sim, o pagamento é feito de forma 100% segura, com todas as suas informações protegidas e criptografadas." },
        { q: "Não tenho dinheiro, o que eu faço?", a: "Imagina que esse curso vai acelerar seu aprendizado em um nível absurdo. Você vai economizar MUITO dinheiro com anos de aulas tradicionais. Lembre-se: TEMPO não tem preço." },
        { q: "E se eu não tiver resultado com o método?", a: "Eu garanto que você terá. Mas se você for a primeira pessoa a não ter, eu faço questão de sentar com você e conversar sobre o que aconteceu. Meu objetivo é que todos tenham sucesso, sem ninguém ficar para trás." },
        { q: "Caso eu mude de ideia, posso realizar estorno?", a: "Sim! Você tem 7 dias para alinhar seus pensamentos e iniciar nesse novo mundo. Caso decida que não é para você, reembolsaremos o valor integral do seu investimento, sem burocracia." }
    ];

    return (
        <section className="py-24 px-6 bg-[#050510]">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-white">
                    Perguntas <span className="text-emerald-400">Frequentes</span>
                </h2>
                <div className="space-y-4">
                    {faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
                </div>
            </div>
        </section>
    )
}

const Mentor = () => {
    return (
        <section className="py-32 px-6 bg-[#030308] border-t border-slate-900 border-b relative overflow-hidden">
            {/* Abstract background shape */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
                <div className="w-full md:w-5/12">
                    <TiltCard className="aspect-[4/5] bg-slate-800 rounded-[2rem] overflow-hidden flex items-center justify-center p-0 border-4 border-slate-800 shadow-2xl relative">
                        {/* FOTO AQUI */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#030308] via-transparent to-transparent z-10"></div>
                        <div className="text-slate-600 flex flex-col items-center">
                            <Users className="w-16 h-16 mb-4 opacity-50" />
                            <span>Foto Ronaldo Dias</span>
                        </div>
                    </TiltCard>
                </div>
                <div className="w-full md:w-7/12 text-slate-300">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tight">O mentor que estará com você</h2>
                    <div className="space-y-6 text-lg font-light leading-relaxed">
                        <p>Passei por quatro escolas, fiz aulas tradicionais, e a sensação sempre foi de frustração.</p>
                        <p className="border-l-4 border-emerald-500 pl-4 py-2 bg-emerald-500/5 font-medium text-emerald-400 italic rounded-r-lg">
                            "Descobri que o problema nunca foi comigo — e sim com o método arcaico."
                        </p>
                        <p>Mergulhei na memorização, destravei meu cérebro e decidi transformar isso num método prático que vai te poupar anos de batida de cabeça.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

const FloatingCTA = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 800) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 md:hidden pointer-events-none"
                >
                    <button
                        onClick={() => document.getElementById('oferta').scrollIntoView({ behavior: 'smooth' })}
                        className="pointer-events-auto w-full max-w-sm bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-lg py-4 rounded-full shadow-[0_10px_40px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2 border border-emerald-400/50 active:scale-95 transition-transform"
                    >
                        <span>QUERO ACELERAR MEU INGLÊS AGORA</span>
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// =====================================
// Montagem Principal
// =====================================
const LandingPageRonaldoDias = () => {
    useEffect(() => {
        document.title = "ITR | Inglês em Tempo Recorde";
    }, []);

    return (
        <div className="min-h-screen bg-[#030308] font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
            <HeroSection />
            <BeneficiosTransition />
            <BentoBento />
            <ProvasSociais />
            <FormationList />
            <Modulos />
            <ParaVoceSection />
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
