it('testa a página da política de privacidade de forma independente', function() {
    
    cy.visit('./src/privacy.html')

    cy.get('h1[id="title"]').should('exist')

    cy.contains('h1[id="title"]', 'CAC TAT - Política de privacidade').should('be.visible')
})