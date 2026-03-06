import React from 'react';
import { Brain, Bot, Users, Plane } from 'lucide-react';
import { TiltCard } from './Common';

export default function Exclusivo() {
    return (
        <section className="py-24 px-6 bg-[#050510] relative overflow-hidden">
            {/* Glow Effects */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-yellow-500/10 rounded-full blur-[120px]"></div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tighter">
                        Ao garantir hoje, você leva <span className="text-yellow-400 font-black">Bônus</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-20">
                    <TiltCard className="bg-gradient-to-br from-slate-900 to-[#0A0D14] p-8 border-slate-800 hover:border-yellow-500/30">
                        <Brain className="w-10 h-10 text-yellow-500 mb-6" />
                        <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Módulo Expansão</h3>
                        <p className="text-[#E2E2E2] font-light">Técnicas de memorização testadas em outras áreas da vida.</p>
                    </TiltCard>

                    <TiltCard className="bg-gradient-to-br from-slate-900 to-[#0A0D14] p-8 border-slate-800 hover:border-yellow-500/30">
                        <Bot className="w-10 h-10 text-yellow-500 mb-6" />
                        <h3 className="text-xl font-bold text-white mb-3 tracking-tight">IA Personalizada</h3>
                        <p className="text-[#E2E2E2] font-light">Inteligência Artificial programada para te treinar 24/7 sem julgamento.</p>
                    </TiltCard>

                    <TiltCard className="bg-gradient-to-br from-slate-900 to-[#0A0D14] p-8 border-slate-800 hover:border-yellow-500/30">
                        <Users className="w-10 h-10 text-yellow-500 mb-6" />
                        <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Comunidade VIP</h3>
                        <p className="text-[#E2E2E2] font-light">Acesso no WhatsApp para suporte, troca de experiências e desafios.</p>
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
