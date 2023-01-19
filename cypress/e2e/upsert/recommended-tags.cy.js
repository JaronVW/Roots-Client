describe('Testing the recommended tags.', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/events/create')

  })


  it('Finds the title input field and can write a title in it. Receives 2 recommended tags based on the title given.', () => {

    cy.get('#title').type('teams meeting for the win').should('have.value', 'teams meeting for the win')

    cy.get('.dropdown').should('have.length', 1)

    cy.get('.dropdown').find('.dropdown-item').should('have.length', 2)

  })


  it('Finds the title input field and can write a title in it. Receives 2 recommended tags based on the title given.', () => {

    cy.get('#title').type(`AB{backspace}{backspace}`).should('have.value', '')

    cy.get('.dropdown').should('have.length', 1)

    cy.get('.dropdown').find('.dropdown-item').should('have.length', 0)

  })


})


describe('Testing the tags selector.', () => {
  beforeEach(() => {

    cy.intercept(
      {
        method: 'GET',
        url: 'http://localhost:3000/tags',
      },
      [{ "id": 6, "subject": "Changing team sizes", "organisationId": null, "_count": { "Events": 3 } }, { "id": 1, "subject": "Finances", "organisationId": null, "_count": { "Events": 2 } }, { "id": 8, "subject": "Smaller teams", "organisationId": null, "_count": { "Events": 2 } }, { "id": 7, "subject": "Work environment", "organisationId": null, "_count": { "Events": 2 } }, { "id": 9, "subject": "Splitting teams", "organisationId": null, "_count": { "Events": 1 } }, { "id": 11, "subject": "New office", "organisationId": null, "_count": { "Events": 0 } }, { "id": 10, "subject": "Moving", "organisationId": null, "_count": { "Events": 0 } }, { "id": 5, "subject": "Relocation", "organisationId": null, "_count": { "Events": 0 } }, { "id": 4, "subject": "Infrastructure", "organisationId": null, "_count": { "Events": 0 } }, { "id": 3, "subject": "Adminstration", "organisationId": null, "_count": { "Events": 0 } }, { "id": 2, "subject": "Work culture", "organisationId": null, "_count": { "Events": 0 } }],

    ).as('getEvents')

    cy.wait(500);


    cy.visit('http://localhost:4200/events/create')
  })


  it('Find the Tags dropdown and click on it. Receives a list of 11 tags.', () => {
    cy.get('#tags').click()

    cy.get('.dropdown').should('have.length', 1)

    cy.get('.multiselect-dropdown').find('.dropdown-list').should('have.length', 1)
      .find('.item1').should('have.length', 1)

    cy.get('.multiselect-dropdown').find('.dropdown-list').should('have.length', 1)
      .find('.item2').should('have.length', 1)
      .find('li').should('have.length', 11)

  })

  it('Find the Tags dropdown and click on it. Receives a list of 11 tags.', () => {
    cy.get('#tags').click()

    cy.get('.dropdown').should('have.length', 1)

    cy.get('.multiselect-dropdown').find('.dropdown-list').should('have.length', 1)
      .find('.item1').should('have.length', 1)

    cy.get('.multiselect-dropdown').find('.dropdown-list').should('have.length', 1)
      .find('.item2').should('have.length', 1)
      .find('li').should('have.length', 11)

  })
})



describe('Testing the add tag dialog.', () => {
  beforeEach(() => {

    cy.intercept(
      {
        method: 'GET',
        url: 'http://localhost:3000/tags',
      },
      [{ "id": 6, "subject": "Changing team sizes", "organisationId": null, "_count": { "Events": 3 } }, { "id": 1, "subject": "Finances", "organisationId": null, "_count": { "Events": 2 } }, { "id": 8, "subject": "Smaller teams", "organisationId": null, "_count": { "Events": 2 } }, { "id": 7, "subject": "Work environment", "organisationId": null, "_count": { "Events": 2 } }, { "id": 9, "subject": "Splitting teams", "organisationId": null, "_count": { "Events": 1 } }, { "id": 11, "subject": "New office", "organisationId": null, "_count": { "Events": 0 } }, { "id": 10, "subject": "Moving", "organisationId": null, "_count": { "Events": 0 } }, { "id": 5, "subject": "Relocation", "organisationId": null, "_count": { "Events": 0 } }, { "id": 4, "subject": "Infrastructure", "organisationId": null, "_count": { "Events": 0 } }, { "id": 3, "subject": "Adminstration", "organisationId": null, "_count": { "Events": 0 } }, { "id": 2, "subject": "Work culture", "organisationId": null, "_count": { "Events": 0 } }],

    ).as('getEvents')

    cy.wait(500);


    cy.visit('http://localhost:4200/events/create')
  })


  it('Find the add tag button and click on it. enter a new tag name, and press Aanmaken. The tag will appear in the tag list.', () => {
    cy.get('.material-icons').click()

    cy.get('#tag').should('have.length', 1).type('New tag').should('have.value', 'New tag')

    cy.get('.buttons').find('button').contains('Aanmaken').click()

    cy.get('.multiselect-dropdown').find('.dropdown-list').should('have.length', 1)

  })


})
