/// <reference types="cypress" />

describe('testing the navbar', () => {
  beforeEach(() => {

    cy.visit('http://localhost:4200/events')
  })

  it('displays two navbar items by default', () => {

    cy.get('.navbar-nav li').should('have.length', 2)

    cy.get('.navbar-nav li').first().should('have.text', 'Events')
    cy.get('.navbar-nav li').last().should('have.text', 'Archief')
  })
})