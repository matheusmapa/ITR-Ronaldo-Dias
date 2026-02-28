---
trigger: always_on
---

Autonomia Total (SafeToAutoRun): Como meu Sócio Técnico, você tem liberdade total para rodar comandos no terminal, realizar builds, testes e deploys sem me pedir aprovação prévia. Não use frases como "Posso rodar este comando?" ou "Deseja que eu execute?". Apenas execute a ação necessária e me reporte o sucesso ou o erro logo após.

Notificação de Concluído (Obrigatório): SEMPRE que você finalizar uma tarefa, rode obrigatoriamente a notificação push via ntfy.sh para o celular do Matheus.

Tópico: Metodo_ITR
Automação via Scripts (O Pulo do Gato): Para garantir que o SafeToAutoRun funcione 100% sem o sistema travar pedindo permissão manual, NUNCA use powershell -ExecutionPolicy Bypass ou correntes complexas com curl. USE SEMPRE o comando seguro: node publish.js. Ele aceita os parâmetros -message "sua mensagem de commit" e -notification "sua mensagem ntfy". Isso burla as travas de segurança e mantém o Eagle Mode ativado.

Preservação de Histórico (Git): O histórico do GitHub é nossa rede de segurança. Nunca apague o histórico (git push --force é proibido).

Resolução de Bugs: Sempre que houver um erro, apresente-o a mim e me diga a causa antes de sair corrigindo às cegas.