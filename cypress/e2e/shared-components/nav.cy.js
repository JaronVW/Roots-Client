import {login} from "../../support/login.helper";


describe('testing the navbar', () => {
  beforeEach(() => {
    login()
  })

  it('displays two navbar items by default', () => {
    cy.get('.navbar-nav li').should('have.length', 3)

    cy.get('.navbar-nav li').first().should('have.text', 'Events')
    cy.get('.navbar-nav li').find("#dropdownBasic1").should('contain.text', 'CompletleyFake@iSwear.com')

  })

  it('displays the dropdown menu when clicking on the logged in email. Press log out should return you to login page', () => {
    cy.get('.navbar-nav li').find("#dropdownBasic1").click()
    cy.get('.dropdown-menu').should('be.visible')
    cy.get('.dropdown-item').get('button').get('span').contains('Uitloggen').click().wait(100)
    cy.url().should('include', 'http://localhost:4200/login')
  })



})
