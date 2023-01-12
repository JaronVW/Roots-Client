describe('Testing the register page functionalities.', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/login')

  })



  it('Search for a text input field for email and password and writes in it.', () => {
    cy.get('#emailInput').type('JohnDoe@Chicken.com')
    cy.get('#passwordInput').type('123456')
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


})
