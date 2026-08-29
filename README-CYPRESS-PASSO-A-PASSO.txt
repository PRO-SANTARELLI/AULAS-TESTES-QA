PASSO A PASSO PARA EXECUTAR O CYPRESS NO PROJETO CONTROLTASK

IMPORTANTE:
Este arquivo inclui os códigos exatos dos arquivos que devem ser criados no projeto para que os alunos possam copiar e colar sem depender do código do professor.

------------------------------------------------------------
1) ABRIR O TERMINAL NA RAIZ DO PROJETO
------------------------------------------------------------
   cd /workspaces/AULAS-TESTES-QA

------------------------------------------------------------
2) ATIVAR O AMBIENTE VIRTUAL
------------------------------------------------------------
   source .venv/bin/activate

------------------------------------------------------------
3) INSTALAR DEPENDENCIAS DO PROJETO (SE NECESSARIO)
------------------------------------------------------------
   npm install

------------------------------------------------------------
4) VERIFICAR SE O CYPRESS FOI INSTALADO CORRETAMENTE
------------------------------------------------------------
   npx cypress verify

------------------------------------------------------------
5) SE O AMBIENTE FOR O CODESPACE/CONTAINER, INSTALAR DEPENDENCIAS GRAFICAS DO UBUNTU
------------------------------------------------------------
   sudo apt-get update
   sudo DEBIAN_FRONTEND=noninteractive apt-get install -y \
     libgtk-3-0t64 \
     libatk1.0-0t64 \
     libatk-bridge2.0-0t64 \
     libgbm1 \
     libnss3 \
     libxss1 \
     libasound2t64 \
     libdrm2 \
     libxcomposite1 \
     libxrandr2 \
     libxdamage1 \
     libxfixes3 \
     libxshmfence1 \
     libglu1-mesa \
     libpango-1.0-0 \
     libcups2t64 \
     xvfb

------------------------------------------------------------
6) CRIAR O ARQUIVO package.json (SE AINDA NAO EXISTIR)
------------------------------------------------------------
Conteudo:
{
  "scripts": {
    "cypress:open": "cypress open",
    "cypress:run": "cypress run"
  },
  "devDependencies": {
    "cypress": "^15.21.1"
  }
}

------------------------------------------------------------
7) CRIAR O ARQUIVO cypress.config.js
------------------------------------------------------------
Conteudo:
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8501',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      return config;
    },
  },
});

------------------------------------------------------------
8) CRIAR A PASTA cypress/support
------------------------------------------------------------
Dentro de cypress/support, criar o arquivo e2e.js:

Conteudo:
// Arquivo de suporte do Cypress
import './commands';

E criar o arquivo commands.js:

Conteudo:
// Comandos globais podem ser adicionados aqui

------------------------------------------------------------
9) CRIAR A PASTA cypress/e2e
------------------------------------------------------------
Arquivo: cypress/e2e/login.cy.js

Conteudo:
describe('Fluxo de login do ControlTask', () => {
  it('deve renderizar a tela de login', () => {
    cy.visit('/');
    cy.contains('ControlTask');
    cy.contains('Acessar Conta');
    cy.contains('Novo Cadastro');
  });

  it('deve permitir entrar no painel com e-mail e senha válidos', () => {
    cy.visit('/');

    cy.get('input[aria-label="E-mail"]').first().type('aluno@teste.com');
    cy.get('input[aria-label="Senha"]').first().type('123456');
    cy.contains('Entrar no Painel').click();

    cy.contains('Olá');
  });
});

------------------------------------------------------------
Arquivo: cypress/e2e/tarefas.cy.js

Conteudo:
describe('Gestão de tarefas', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('input[aria-label="E-mail"]').first().type('aluno@teste.com');
    cy.get('input[aria-label="Senha"]').first().type('123456');
    cy.contains('Entrar no Painel').click();
  });

  it('deve criar uma tarefa com sucesso', () => {
    cy.contains('Nova Tarefa');
    cy.get('input[aria-label="O que precisa ser feito?"]').type('Estudar Cypress');
    cy.get('textarea[aria-label="Notas / Subtarefas (Opcional)"]').type('Executar aula prática');
    cy.contains('Salvar Tarefa').click();
    cy.contains('Tarefa adicionada com sucesso!');
  });
});

------------------------------------------------------------
Arquivo: cypress/e2e/cadastro.cy.js

Conteudo:
describe('Cadastro de usuário no ControlTask', () => {
  it('deve cadastrar um novo usuário e realizar login com sucesso', () => {
    const timestamp = Date.now();
    const name = `Aluno Teste ${timestamp}`;
    const email = `aluno${timestamp}@teste.com`;
    const password = 'Senha@123';

    cy.visit('/');
    cy.contains('Novo Cadastro').click();

    cy.get('input[aria-label="Nome Completo"]').type(name);
    cy.get('input[aria-label="E-mail"]').last().type(email);
    cy.get('input[aria-label="Senha Segura"]').type(password);

    cy.contains('Concluir Cadastro').click();
    cy.contains('Conta criada com sucesso!');

    cy.contains('Acessar Conta').click();
    cy.get('input[aria-label="E-mail"]').first().clear().type(email);
    cy.get('input[aria-label="Senha"]').first().clear().type(password);
    cy.contains('Entrar no Painel').click();

    cy.contains('Olá');
    cy.contains('Aqui está o panorama da sua produtividade para hoje.');
  });
});

------------------------------------------------------------
10) SUBIR O BACKEND
------------------------------------------------------------
   cd /workspaces/AULAS-TESTES-QA
   source .venv/bin/activate
   uvicorn backend.main:app --reload

   A API fica em:
   http://localhost:8000
   Swagger: http://localhost:8000/docs

------------------------------------------------------------
11) SUBIR O FRONTEND
------------------------------------------------------------
   cd /workspaces/AULAS-TESTES-QA
   source .venv/bin/activate
   streamlit run frontend/app.py

   O aplicativo fica em:
   http://localhost:8501

------------------------------------------------------------
12) EXECUTAR O CYPRESS EM MODO HEADLESS NO CODESPACE
------------------------------------------------------------
   cd /workspaces/AULAS-TESTES-QA
   xvfb-run -a npx cypress run

------------------------------------------------------------
13) EXECUTAR UM TESTE ESPECIFICO
------------------------------------------------------------
   cd /workspaces/AULAS-TESTES-QA
   xvfb-run -a npx cypress run --spec cypress/e2e/login.cy.js

   ou

   xvfb-run -a npx cypress run --spec cypress/e2e/tarefas.cy.js

   ou

   xvfb-run -a npx cypress run --spec cypress/e2e/cadastro.cy.js

------------------------------------------------------------
14) FLUXO MANUAL PARA VALIDAR O APLICATIVO
------------------------------------------------------------
   - Acesse http://localhost:8501
   - Clique em Acessar Conta
   - Use e-mail: aluno@teste.com
   - Use senha: 123456
   - Clique em Entrar no Painel
   - Verifique o dashboard
   - Preencha "O que precisa ser feito?"
   - Preencha "Notas / Subtarefas"
   - Selecione a prioridade
   - Clique em Salvar Tarefa
   - Confirme que aparece "Tarefa adicionada com sucesso!"

------------------------------------------------------------
15) RESULTADO ESPERADO DOS TESTES
------------------------------------------------------------
   login.cy.js -> 2 testes passando
   tarefas.cy.js -> teste de criação de tarefa passando
   cadastro.cy.js -> teste de cadastro e login passando

------------------------------------------------------------
16) DICA FINAL
------------------------------------------------------------
   Em ambientes como CodeSpace, prefira sempre:
   xvfb-run -a npx cypress run
   em vez de npx cypress open

------------------------------------------------------------
17) COMANDO RESUMO PARA EXECUTAR TODOS OS TESTES
------------------------------------------------------------
   cd /workspaces/AULAS-TESTES-QA
   xvfb-run -a npx cypress run
