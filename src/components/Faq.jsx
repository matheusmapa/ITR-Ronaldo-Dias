import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

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
                    <ChevronDown className={`w-5 h-5 shrink-0 ${isOpen ? 'text-emerald-400' : 'text-[#CCCCCC]'}`} />
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
                        <div className="px-6 pb-6 text-[#E2E2E2] leading-relaxed font-light">
                            {a}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function Faq() {
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
    );
}
