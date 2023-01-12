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


  it('Type nothing inside the organisation input and press enter. Should return an error.', () => {
    cy.get('.btn').contains('Een organisatie toevoegen? ').click().wait(100)
    cy.get('#organisationNameInput').type('a{backspace}').type('{enter}')
    cy.contains('Organisatienaam kan niet leeg zijn.').should('have.length', 1).should('be.visible')
  })

  it('Type nothing inside the organisation input and press the button Aanmaken. Should return an error.', () => {
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

  it('The hyperlink that shows "inloggen" redirects the user to the login page', () => {
    cy.get('a').click()
    cy.wait(100)
    cy.url().should('include', 'http://localhost:4200/login')
  })




})
