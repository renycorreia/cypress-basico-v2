
/// <reference types="Cypress" />



describe('Central de Atendimento ao Cliente TAT', function () {

    beforeEach(function () {
        cy.visit('./src/index.html') //caminho do arquivo em relação ao arquivo de configuração cypress.json
    })

    it('verifica o título da aplicação', function () {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
    })

    //it -> executa apenas o teste
    it('preenche os campos obrigatórios e envia o formulário', function () {
        cy.get('input[id="firstName"]').type('Reny')
        cy.get('input[id="lastName"]').type('Correia')
        cy.get('input[id="email"]').type('reny.correia@exemplo.com')
        cy.get('textarea[id="open-text-area"]').type('bla-bla-bla')
        //cy.get('textarea[id="open-text-area"]').type('bla-bla-bla-bla-bla-bla-bla-bla-bla-bla-bla-bla-bla-bla-bla-bla-bla-bla-bla-bla-bla-bla-bla-bla-bla-bla-bla-bla-bla-bla-bla-bla-bla-bla-bla-bla-bla-bla-bla-bla-bla-bla-bla-bla-bla', { delay: 0 })
        //cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()

        cy.get('[class="success"]').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('input[id="firstName"]').type('Reny')
        cy.get('input[id="lastName"]').type('Correia')
        cy.get('input[id="email"]').type('reny.correia@exemplocom')
        cy.get('textarea[id="open-text-area"]').type('bla-bla-bla')
        //cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()

        cy.get('[class="error"]').should('be.visible')
    })

    it('campo telefone continua vazio ao ser preenchido com valor não numérico', function () {
        cy.get('input[id="phone"]').type('abcd-')
        cy.get('input[id="phone"]').should('have.value', '')
        //cy.get('input[id="phone"]')
        //   .type('abcd')
        //   .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('input[id="firstName"]').type('Reny')
        cy.get('input[id="lastName"]').type('Correia')
        cy.get('input[id="email"]').type('reny.correia@exemplo.com')
        cy.get('#phone-checkbox').check()
        cy.get('textarea[id="open-text-area"]').type('bla-bla-bla')
        //cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()

        cy.get('[class="error"]').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('input[id="firstName"]')
            .type('Reny')
            .should('have.value', 'Reny')
            .clear()
            .should('have.value', '')
        cy.get('input[id="lastName"]')
            .type('Correia')
            .should('have.value', 'Correia')
            .clear()
            .should('have.value', '')
        cy.get('input[id="email"]')
            .type('reny.correia@exemplo.com')
            .should('have.value', 'reny.correia@exemplo.com')
            .clear()
            .should('have.value', '')
        cy.get('input[id="phone"]')
            .type('1234567890')
            .should('have.value', '1234567890')
            .clear()
            .should('have.value', '')
        cy.get('textarea[id="open-text-area"]')
            .type('bla-bla-bla')
            .should('have.value', 'bla-bla-bla')
            .clear()
            .should('have.value', '')            
        //cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()

        cy.get('[class="error"]').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        //cy.get('button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()

        cy.get('[class="error"]').should('be.visible')
    })

    it('envia o formulário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('[class="success"]').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function () {
        cy.get('select[id="product"]')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function () {
        cy.get('select[id="product"]')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function () {
        cy.get('select[id="product"]')
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function () {
        cy.get('input[type="radio"][name="atendimento-tat"]')
            .check('feedback')
            .should('be.checked')
            .should('have.value', 'feedback')
    })

    it('marca cada  tipo de atendimento', function () {
        cy.get('input[type="radio"][name="atendimento-tat"]')
            .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio)
                    .should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', function () {
        cy.get('[id="check"]').get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last().uncheck()
            .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function () {
        cy.get('input[type="file"][id="file-upload"]')
            .selectFile('cypress/fixtures/example.json')
            .then(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function () {
        cy.get('input[type="file"][id="file-upload"]')
            .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
            .then(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('example.json', { encoding: null }).as('exampleFile')
        cy.get('input[type="file"]')
            .selectFile('@exampleFile')
            .then(input => {
            expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', function () {
        cy.get('#privacy a').invoke('removeAttr', 'target').click()

        cy.get('h1[id="title"]').should('exist')

        cy.contains('h1[id="title"]', 'CAC TAT - Política de privacidade').should('be.visible')
    })
})

