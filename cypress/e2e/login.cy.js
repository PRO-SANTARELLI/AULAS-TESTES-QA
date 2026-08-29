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
