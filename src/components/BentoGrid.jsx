import React from 'react';
import { MessageCircle, Clock, Shield, Sparkles, Brain } from 'lucide-react';
import { TiltCard } from './Common';

export default function BentoGrid() {
    return (
        <section className="pt-16 pb-24 px-6 bg-[#030308] relative">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                        O que você vai <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">conquistar</span>
                    </h2>
                    <p className="text-[#E2E2E2] text-lg max-w-2xl mx-auto">
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
                        <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Confiança na Conversação</h3>
                        <p className="text-[#E2E2E2] leading-relaxed font-light text-lg">
                            Domine a conversação e a escuta com extrema naturalidade. Sem travar na hora de responder, apenas a fala fluindo.
                        </p>
                    </TiltCard>

                    {/* Card 2 */}
                    <TiltCard className="p-8 group">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                            <Clock className="text-blue-400 w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Tempo Recorde</h3>
                        <p className="text-[#E2E2E2] leading-relaxed font-light">
                            Memorize centenas de palavras novas de forma permanente, otimizando o seu tempo de estudos.
                        </p>
                    </TiltCard>

                    {/* Card 3 */}
                    <TiltCard className="p-8 group">
                        <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/20 group-hover:bg-purple-500/20 transition-colors">
                            <Shield className="text-purple-400 w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">Método Validado</h3>
                        <p className="text-[#E2E2E2] leading-relaxed font-light">
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
                        <p className="text-[#E2E2E2] leading-relaxed font-light text-lg max-w-md relative z-10">
                            Desenvolva o mecanismo interno para <strong className="text-white">pensar diretamente em inglês</strong>, como um nativo faria.
                        </p>
                    </TiltCard>

                </div>
            </div>
        </section>
    );
}
