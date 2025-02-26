it('Testa a página da política de privacidade de forma independente', () => {
    cy.visit('./src/privacy.html')
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT - Política de Privacidade')

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
    cy.get('#white-background')
    .should('have.css', 'font-family', 'sans-serif')
    .and('have.css', 'font-size', '16px')

    cy.contains('p', 'Talking About Testing').should('be.visible')
    
})