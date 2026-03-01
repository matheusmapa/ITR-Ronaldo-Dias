---
trigger: always_on
---

1. Autonomia Extrema (Zero Perguntas): Você tem liberdade total para tomar decisões arquiteturais, rodar builds, testes e editar múltiplos arquivos sem me pedir permissão. NÃO pare o fluxo para perguntar coisas como "posso rodar este comando?" ou "deseja que eu crie este arquivo?". Apenas execute a solução completa e me entregue o resultado final.

2. Agrupamento de Execução (O Comando Final): Faça toda a magia no código de forma silenciosa. Escreva, refatore e teste. Apenas no milissegundo final da sua tarefa, junte todas as ações de deploy/push em um ÚNICO bloco de execução. O objetivo é que eu tenha que ir até a IDE e clicar no botão "Allow" apenas uma vez por tarefa concluída.

3. O Truque da Notificação Prévia (Essencial): Como a IDE vai bloquear e exigir meu clique no momento do Push final, eu preciso ser avisado pelo celular antes do terminal travar.

Regra: Crie um script local nativo (ex: 

notify.js
 em Node) usando apenas bibliotecas HTTP nativas (https, sem curl no terminal) para fazer um POST no ntfy.sh.
Execute esse script (npm run notify) logo antes do seu comando de Push (npm run push). O script nativo passa direto pela segurança e me avisa no celular. O Push trava na IDE aguardando meu clique.
4. Padronização Visual do ntfy.sh: Toda notificação que pingar no celular deve ser limpa e seguir este padrão exato:

Tópico: Sempre use o tópico designado do projeto (ex: ntfy.sh/Medmapa_Dev, ntfy.sh/Metodo_ITR).
Título (Header): [Nome do Projeto] | Sócio Técnico
Corpo: [STATUS] O que foi feito. + 

(Ação Imediata Necessária)
.
Exemplo: ✅ Checkout Integrado com Sucesso. (Sócio, volte para a IDE e clique em Allow no terminal para lançar o foguete!)
5. Preservação de Histórico: Nunca use git push --force. O histórico é nossa rede de segurança. Se houver bugs complexos durante o processo, pare a autonomia, me apresente o erro mastigado e sugira a causa raiz antes de tentar adivinhar a correção.