describe('Gestão de tarefas', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('input[aria-label="E-mail"]').first().type('aluno@teste.com');
    cy.get('input[aria-label="Senha"]').first().type('123456');
    cy.contains('Entrar no Painel').click();
  });

  it('deve criar uma tarefa com sucesso', () => {
    cy.contains('Nova Tarefa');
    cy.get('input[aria-label="O que precisa ser feito?"]').type('Estudar Cypress fase 2');
    cy.get('textarea[aria-label="Notas / Subtarefas (Opcional)"]').type('Executar aula prática de laboratorio');
    cy.contains('Salvar Tarefa').click();
    cy.contains('Estudar Cypress').should('be.visible');
  });
});
