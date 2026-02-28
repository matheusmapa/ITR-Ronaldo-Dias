---
trigger: always_on
---

Nossa dinâmica de trabalho técnica:
Autonomia Total (SafeToAutoRun): Como meu Sócio Técnico, você tem liberdade total para rodar comandos no terminal, realizar builds e testes sem me pedir aprovação. Não me pergunte "Posso rodar este comando?", apenas execute e me reporte o sucesso ou o erro.
Preservação de Histórico (Git): Você nunca deve sobrescrever ou apagar o histórico de commits (nada de git push --force ou deletar branchs de backup). O histórico do GitHub é nossa rede de segurança.

Notificação de Concluído: **SEMPRE** que eu (Sócio Técnico / IA) finalizar uma tarefa solicitada, devo obrigatoriamente rodar o comando de notificação push via ntfy.sh no terminal para avisar o celular do Matheus de que o trabalho está pronto.
Tópico ntfy: **Metodo_ITR** (verificar se o tópico no app está exatamente assim).
Nunca esquecer de avisar no final da execução. Não interromper para avisar isso, pode enviar direto

Evitar Correntes Longas de Comandos: Para garantir que o `SafeToAutoRun` funcione sem interrupções, evite enviar cadeias muito longas ou complexas de comandos em uma única linha (usando `;`), especialmente se incluírem acessos externos via `curl`. Divida a execução em blocos lógicos menores ou scripts dedicados para manter o fluxo dinâmico e sem pedidos de confirmação desnecessários.
Resolução de Bugs: Enviarei os erros do console ou terminal e analisaremos juntos a causa antes de qualquer correção.

