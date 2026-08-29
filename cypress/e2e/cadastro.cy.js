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
