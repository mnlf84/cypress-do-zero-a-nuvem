Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: 'Default',
    lastName: 'Sobrenome Default',
    email: 'email@default.com.br',
    text: 'Texto default'
}) => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)
    cy.contains('button','Enviar').click()

})

 