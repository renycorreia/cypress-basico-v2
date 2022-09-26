Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('input[id="firstName"]').type('Reny')
    cy.get('input[id="lastName"]').type('Correia')
    cy.get('input[id="email"]').type('reny.correia@exemplo.com')
    cy.get('textarea[id="open-text-area"]').type('bla-bla-bla')
    cy.contains('button', 'Enviar').click()
  })
