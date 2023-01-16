describe('Testing the register page functionalities.', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/login')

  })


  it('Enters valid account information. Should log in, and redirect to the next page', () => {
    cy.intercept('POST', 'http://localhost:3000/auth/login', ( res) => {
      res.reply({
        statusCode: 201,
        body: {
          "access_token":"fakeTokenYayyy3123assadas.eyJ1c2VybmFtZSI6InRob21hc0Bqam10dGwubmwiLCJzdWIiOjYsIm9yZ2FuaXNhdGlvbklkIjpudWxsLCJpYXQiOjE2NzM2Mjk3MDksImV4cCI6MTY3MzcxNjEwOX0.ahS-CBkO2jRJlba1811SL_m9TChm9E9zQKs4Bb1CbEg",
        }
      })
    }).as('login')



    cy.get('#emailInput').type('CompletleyFake@iSwear.com')
    cy.get('#passwordInput').type('IfYouReadThisYouAreAwesome!')
    cy.get('.btn').contains('Inloggen').click()
    cy.wait('@login')

    cy.get('@login').then((interception) => {
      expect(interception.response.statusCode).to.equal(201)
    }).wait(300)

    // cy.url().should('include', 'http://localhost:4200/events')

    cy.window()
      .then(win => {
        expect(win.localStorage.getItem('token')).to.exist
      })
  })

  it('Search for a text input field for email and password and writes in it.', () => {
    cy.get('#emailInput').type('JohnDoe@Chicken.com')
    cy.get('#passwordInput').type('nQK46(+C\\C\'Q')
  })

  it('The hyperlink that shows "Registreren" redirects the user to the register page', () => {
    cy.get('a').contains('Registreren').click()
    cy.wait(100)
    cy.url().should('include', 'http://localhost:4200/register')
  })

  it('The hyperlink that shows "Wachtwoord vergeten?" redirects the user to the forgot password page', () => {
    cy.get('a').contains('hier').click()
    cy.wait(100)
    cy.url().should('include', 'http://localhost:4200/accountrecovery')
  })



  it('writes an fake email and password that does not exist. Should return an error.', () => {
    cy.get('#emailInput').type('CompletleyFake@iSwear.com')
    cy.get('#passwordInput').type('IfYouReadThisYouAreAwesome!')
    cy.get('.btn').contains('Inloggen').click().wait(100)
    cy.contains('Email of wachtwoord incorrect.').should('have.length', 1).should('be.visible')

  })


  it('writes an invalid email. Should return an error.', () => {
    cy.get('#emailInput').type('CompletleyFake@.com')
    cy.get('#passwordInput').type('IfYouReadThisYouAreAwesome!')
    cy.get('.btn').contains('Inloggen').click().wait(100)
    cy.contains('Email moet valide zijn.').should('have.length', 1).should('be.visible')

    cy.get('#emailInput').clear().type('CompletleyFake@')
    cy.get('.btn').contains('Inloggen').click().wait(100)
    cy.contains('Email moet valide zijn.').should('have.length', 1).should('be.visible')


    cy.get('#emailInput').clear().type('CompletleyFake.com')
    cy.get('.btn').contains('Inloggen').click().wait(100)
    cy.contains('Email moet valide zijn.').should('have.length', 1).should('be.visible')

    cy.get('#emailInput').clear().type('CompletleyFake')
    cy.get('.btn').contains('Inloggen').click().wait(100)
    cy.contains('Email moet valide zijn.').should('have.length', 1).should('be.visible')
  })




})
