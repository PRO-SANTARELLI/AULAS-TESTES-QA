REQUISITO:
O usuário deve conseguir concluir uma tarefa.

Pensando como BDD:

Dado --> que existe uma tarefa pendente
Quando --> o usuário marcar a tarefa como concluída
Então --> a tarefa deverá apresentar o estado "Concluída"

DADO    → situação inicial
QUANDO  → ação realizada
ENTÃO   → resultado esperado


Agora pense como TDD
Na tela, escreva:

Comportamento esperado: A tarefa pendente deve se tornar concluída.

Depois:
TDD
1. Criar o teste
2. Teste inicialmente falha
3. Desenvolver o necessário
4. Teste passa
5. Melhorar o código

RED
Teste falha

GREEN
Teste passa

REFACTOR
Melhorar o código
