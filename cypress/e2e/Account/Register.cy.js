describe('Testing the register page functionalities.', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/register')

  })

  it('Search for a text input field for first,last,email password and confirm password and writes in it.', () => {
    cy.get('#firstNameInput').type('John')
    cy.get('#lastNameInput').type('Doe')
    cy.get('#emailInput').type('JohnDoe@Chicken.com')
    cy.get('#passwordInput').type('123456')
    cy.get('#confirmPasswordInput').type('123456')
  })

  it('Search for the Create organisation button. Should open a dialog. Type in a emial adress, check if the domain name will be given', () => {
    cy.get('#emailInput').type('JohnDoe@Chicken.com')
    cy.get('.btn').contains('Een organisatie toevoegen? ').click().wait(100)
    cy.contains('Het domein voor deze organisatie wordt: Chicken.com').should('have.length', 1).should('be.visible')
  })

  it('The hyperlink that shows "inloggen" redirects the user to the login page', () => {
    cy.get('a').click()
    cy.wait(100)
    cy.url().should('include', 'http://localhost:4200/login')
  })

})


describe('Testing the error handling responses on incorrect input.', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/register')

  })

  it('Type nothing inside the organisation input and press enter. Should return an error.', () => {
    cy.get('#firstNameInput').type('John')
    cy.get('#lastNameInput').type('Doe')
    cy.get('#emailInput').type('JohnDoe@Chicken.com')
    cy.get('#passwordInput').type('123456')
    cy.get('#confirmPasswordInput').type('123456')
    cy.get('.btn').contains('Een organisatie toevoegen? ').click().wait(100)
    cy.get('#organisationNameInput').type('a{backspace}').type('{enter}')
    cy.contains('Organisatienaam kan niet leeg zijn.').should('have.length', 1).should('be.visible')
  })

  it('Type nothing inside the organisation input and press the button Aanmaken. Should return an error.', () => {
    cy.get('#firstNameInput').type('John')
    cy.get('#lastNameInput').type('Doe')
    cy.get('#emailInput').type('JohnDoe@Chicken.com')
    cy.get('#passwordInput').type('123456')
    cy.get('#confirmPasswordInput').type('123456')
    cy.get('.btn').contains('Een organisatie toevoegen? ').click().wait(100)
    cy.get('#organisationNameInput').type('a{backspace}')
    cy.get('.btn').contains('Aanmaken').click()
    cy.contains('Organisatienaam kan niet leeg zijn.').should('have.length', 1).should('be.visible')
  })

  it('Enter a domain name, but email input value is empty. Should return a error', () => {
    cy.get('.btn').contains('Een organisatie toevoegen? ').click().wait(100)
    cy.get('#organisationNameInput').type('aOrganisation')
    cy.get('.btn').contains('Aanmaken').click()
    cy.contains('Domein kan niet leeg zijn; voer uw email in.').should('have.length', 1).should('be.visible')
  })


  it('Enter all input fiels but first name. Should return a error', () => {
    cy.get('#lastNameInput').type('Doe')
    cy.get('#emailInput').type('JohnDoe@Chicken.com')
    cy.get('#passwordInput').type('123456')
    cy.get('#confirmPasswordInput').type('123456')

    cy.get('.btn').contains('Registreren').click()
    cy.contains('Voornaam kan niet leeg zijn.').should('have.length', 1).should('be.visible')

  })

  it('Enter all input fiels but last name. Should return a error', () => {
    cy.get('#firstNameInput').type('John')
    cy.get('#emailInput').type('JohnDoe@Chicken.com')
    cy.get('#passwordInput').type('123456')
    cy.get('#confirmPasswordInput').type('123456')

    cy.get('.btn').contains('Registreren').click()
    cy.contains('Achternaam kan niet leeg zijn.').should('have.length', 1).should('be.visible')

  })

  it('Enter all input fiels but email. Should return a error', () => {
    cy.get('#firstNameInput').type('John')
    cy.get('#lastNameInput').type('Doe')
    // cy.get('#emailInput').type('JohnDoe@Chicken.com')
    cy.get('#passwordInput').type('123456')
    cy.get('#confirmPasswordInput').type('123456')

    cy.get('.btn').contains('Registreren').click()
    cy.contains('Email moet valide zijn.').should('have.length', 1).should('be.visible')

  })

  it('Enter all input fiels but an unvalid email. Should return a error', () => {
    cy.get('#firstNameInput').type('John')
    cy.get('#lastNameInput').type('Doe')
    cy.get('#emailInput').type('JohnDoe')
    cy.get('#passwordInput').type('123456')
    cy.get('#confirmPasswordInput').type('123456')

    cy.get('.btn').contains('Registreren').click()
    cy.contains('Email moet valide zijn.').should('have.length', 1).should('be.visible')

    cy.get('#emailInput').clear().type('JohnDoe@')
    cy.get('.btn').contains('Registreren').click()
    cy.contains('Email moet valide zijn.').should('have.length', 1).should('be.visible')

    cy.get('#emailInput').clear().type('JohnDoe@Chicken')
    cy.get('.btn').contains('Registreren').click()
    cy.contains('Email moet valide zijn.').should('have.length', 1).should('be.visible')

    cy.get('#emailInput').clear().type('JohnDoe@Chicken.')
    cy.get('.btn').contains('Registreren').click()
    cy.contains('Email moet valide zijn.').should('have.length', 1).should('be.visible')

    cy.get('#emailInput').clear().type('@Chicken.com')
    cy.get('.btn').contains('Registreren').click()
    cy.contains('Email moet valide zijn.').should('have.length', 1).should('be.visible')


  })

  it('Enter all input fiels but password. Should return a error', () => {
    cy.get('#firstNameInput').type('John')
    cy.get('#lastNameInput').type('Doe')
    cy.get('#emailInput').type('JohnDoe@Chicken.com')
    // cy.get('#passwordInput').type('123456')
    cy.get('#confirmPasswordInput').type('123456')

    cy.get('.btn').contains('Registreren').click()
    cy.contains('Wachtwoord kan niet leeg zijn.').should('have.length', 1).should('be.visible')

  })

  it('Enter all input fiels but the passwords do not match. Should return a error', () => {
    cy.get('#firstNameInput').type('John')
    cy.get('#lastNameInput').type('Doe')
    cy.get('#emailInput').type('JohnDoe@Chicken.com')
    cy.get('#passwordInput').type('12345678910')
    cy.get('#confirmPasswordInput').type('1234567891011')

    cy.get('.btn').contains('Registreren').click()
    cy.contains('Wachtwoorden komen niet overeen.').should('have.length', 1).should('be.visible')
  })




})
