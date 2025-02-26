
describe('Central de Atendimento ao Cliente TAT', ()=> {
  // Função antes de cada teste
  beforeEach( ()=> {
    cy.visit('./src/index.html')
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('Preenche os campos obrigatórios e envia o formulário', ()=> {
    cy.get('#firstName').type('Marcelo')
    cy.get('#lastName').type('Teste')
    cy.get('#email').type('teste@teste.com.br')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

  })

    // Exercício Extra 1 - Delay do .type() igual a zero
    it('Delay do .type() igual a zero', ()=> {
    const longText = 'Lorem ipsum dolor sit amet. Et voluptatem cupiditate sed error internos nam excepturi quod vel doloribus fuga et eligendi facere qui aspernatur rerum. Ut quidem deserunt eos consequatur impedit eum inventore laborum rem voluptas architecto et voluptatem quidem et veritatis laudantium At dolorem nesciunt. Qui sint consequatur est quia dignissimos ut asperiores delectus ea soluta quis non fugiat eveniet. In ullam voluptatem ut galisum ipsa aut officiis officia.'

    cy.get('#firstName').type('Marcelo')
    cy.get('#lastName').type('Teste')
    cy.get('#email').type('teste@teste.com.br')
    cy.get('#open-text-area').type(longText, {delay : 0})
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')

  })

  it('Deletar a caixa de texto usando comando para as teclas Del, SelectAll', ()=> {
    const longText = 'Lorem ipsum dolor sit amet. Et voluptatem cupiditate sed error internos nam excepturi quod vel doloribus fuga et eligendi facere qui aspernatur rerum. Ut quidem deserunt eos consequatur impedit eum inventore laborum rem voluptas architecto et voluptatem quidem et veritatis laudantium At dolorem nesciunt. Qui sint consequatur est quia dignissimos ut asperiores delectus ea soluta quis non fugiat eveniet. In ullam voluptatem ut galisum ipsa aut officiis officia.'

    cy.get('#firstName').type('Marcelo')
    cy.get('#lastName').type('Teste')
    cy.get('#email').type('teste@teste.com.br')
    cy.get('#open-text-area').type('12345')
    .type('{selectAll}{del}')  

  })

  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', ()=> {
    cy.get('#firstName').type('Marcelo')
    cy.get('#lastName').type('Teste')
    cy.get('#email').type('teste@teste,com.br')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible').and('not.contain', 'Teste')
    .and('have.css', 'font-family').and('match', /sans-serif/)
  })

  // Exercício Extra 3 - Verifica o campo de telefone se retorna vazio
  it('Campo telefone continua vazio quando preenchido com um valor não numérico', ()=> {
    cy.get('#firstName').type('Marcelo')
    cy.get('#lastName').type('Teste')
    cy.get('#email').type('teste@teste.com.br')
    cy.get('#phone-checkbox').click()
    cy.get('#phone').type('asdffghj')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()
  
    .should('have.value', '')

    cy.get('.error').should('be.visible')
  })  
  
  
  // Exercício Extra 4 - exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário
  it('Campo telefone continua vazio quando preenchido com um valor não numérico', ()=> {
    cy.get('#firstName').type('Marcelo')
    cy.get('#lastName').type('Teste')
    cy.get('#email').type('teste@teste.com.br')
    cy.get('#phone-checkbox').click()
    cy.get('#phone').type('asdffghj')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()
   
    cy.get('.error').should('be.visible')
  })
  
  // Exercício Extra 5 - Preenche e limpa os campos nome, sobrenome, email e telefone
    it('Preenche e limpa os campos nome, sobrenome, email e telefone', ()=> {
      cy.get('#firstName').type('Marcelo')
      .should('have.value', 'Marcelo')
      .clear()
      .should('have.value','')
       cy.get('#lastName').type('Teste')
       .clear()
       .should('have.value','')

       cy.get('#email').type('teste@teste.com.br')
       .clear()
       .should('have.value','')

       cy.get('#phone-checkbox').click()
       cy.get('#phone').type('asdffghj')
       .clear()
       .should('have.value','')

       cy.get('#open-text-area').type('Teste')
       cy.get('button[type="submit"]').click()
   
       cy.get('.error').should('be.visible')
    })

            // Exercício Extra 6 - Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios
    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', ()=> {
      cy.get('button[type="submit"]').click()
  
      cy.get('.error').should('be.visible')
    })

    // Exercício Extra 7 - Envia um formulário de sucesso usando comando customizado 
    it('Envia um formulário de sucesso usando comando customizado', ()=> {

      cy.fillMandatoryFieldsAndSubmit()

      cy.get('.success').should('be.visible')
    })

    // Exercício Extra 8 - Uso do cy.contains
    it('Uso do cy.conntains para localizar elementos', ()=> {
      cy.contains('label', 'Feedback')
      cy.contains('button', 'Enviar').click()

      cy.get('.error').should('be.visible')

    })
    
    //Seção 4 Aula 20 - Selecionando opções em um campo de múltipla escolha
    it('seleciona um produto (YouTube) por seu texto', ()=> {
      cy.get('#product').select('YouTube')
      .should('have.value', 'youtube')

    })

    //Seção 4 Aula 21 - seleciona um produto (Mentoria) por seu valor (value)
    it('Seleciona um produto (Mentoria) por seu valor (value)', ()=> {
      cy.get('#product').select('mentoria')
      .should('have.value', 'mentoria')

    })

    //Seção 4 Aula 22 - seleciona um produto (Mentoria) por seu valor (value)
    it('Seleciona um produto (Blog) por seu índice', ()=> {
      cy.get('#product').select(1)
      .should('have.value', 'blog')

    })
    // Marcando inputs do tipo radio
    it('Marca o tipo de atendimento "Feedback" ', ()=> {
      cy.get('input[type="radio"][value="feedback"]').check()
      .should('be.checked')

    })

    // Marcando vários elementos em uma checkbox
    it('Marca cada tipo de atendimento', function marcaCheckBoxes(){
      cy.get('input[type="radio"]')
      .each( typeOfService => {
        cy.wrap(typeOfService)
        .check()
        .should('be.checked')


      })
    })

      // Seção 6 - Aula 27 - Marcando e desmarcando campos do tipo caixa de seleção
  it('Marca ambos checkboxes, depois desmarca o último', ()=> {
      //   // cy.get('input[type="checkbox"]')
      //   // .as('checkboxes')
      //   // .check()

      //   // cy.get('@checkboxes')
      //   // .each(checkbox => {
      //   // expect(checkbox[0].checked).to.equal(true)

      //   // cy.get('@checkboxes').last().uncheck()
      //   // .should('not.be.checked')
    
      // })

    //   cy.get('input[type="checkbox"]').check()

    //   .should('be.checked')

    //   .last()
    //   .uncheck()
    //   .should('not.be.checked')

    cy.get('input[type="checkbox"]')
    .each( checkboxes => {
      cy.wrap(checkboxes)
      .check()
      .should('be.checked')

      .last()
      .uncheck()
      .should('not.be.checked')
    })

  })

 //Revise o teste e utilize o .check() ao invés do .click()
    it('Campo telefone continua vazio quando preenchido com um valor não numérico', ()=> {
      cy.get('#firstName').type('Marcelo')
      cy.get('#lastName').type('Teste')
      cy.get('#email').type('teste@teste.com.br')
      cy.get('#phone-checkbox').check()
      cy.get('#phone').type('asdffghj')
      cy.get('#open-text-area').type('Teste')
      cy.get('button[type="submit"]').click()
 
      cy.get('.error').should('be.visible')
    })

    //seleciona um arquivo da pasta fixtures
    it('Seleciona um arquivo da pasta fixtures', () => {
      cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json')

      .should( input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
    })
    // Exercício extra 1
    it('Seleciona um arquivo simulando um drag-and-drop', () => {
      cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })

      .should( input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
    })

    // Exercício extra 2 - Seleciona uma fixture para qual foi dado um alias

      it('Seleciona um arquivo simulando um drag-and-drop', () => {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
        .selectFile('@sampleFile', { action: 'drag-drop' })

        .should( input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
    })

    it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
      cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr','target', '_blank')
  })

  it('Acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
    .should('have.attr', 'href', 'privacy.html').invoke('removeAttr', 'target')
    .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')

  })



})



 