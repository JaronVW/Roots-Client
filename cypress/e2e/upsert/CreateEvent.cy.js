describe('Testing the recommended tags.', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/events/create')

  })


  it('Finds the title input field and can write a title in it. Receives 2 recommended tags based on the title given.', () => {
    cy.get('#title').type('teams meeting for the win').should('have.value', 'teams meeting for the win')

    cy.get('.dropdown').should('have.length', 1)

    cy.get('.dropdown').find('.dropdown-item').should('have.length', 2)

  })


  it('Writes 2 letters and backspaces 2 times, and the result of the result should have 0 recommendations.', () => {

    cy.get('#title').type(`AB{backspace}{backspace}`).should('have.value', '')

    cy.get('.dropdown').should('have.length', 1)

    cy.get('.dropdown').find('.dropdown-item').should('have.length', 0)

  })

  it('Writes a title, stops typing and selects a tag. Tag should be added to the list. Continues typing and selects another new tag that is recommended. Deletes the other tag.', () => {
    cy.get('#title').type('All teams are getting').should('have.value', 'All teams are getting')

    cy.get('.dropdown').should('have.length', 1)

    cy.get('.dropdown').find('.dropdown-item').should('have.length', 2)

    cy.get('#title').type('{downarrow}').type('{enter}')

    cy.get('.dropdown').find('.dropdown-item').should('have.length', 1)

    cy.get('#title').type(' improvement on their Finances').wait(400).type('{downarrow}').type('{enter}')

    cy.get('.dropdown').find('.dropdown-item').should('have.length', 4)
  })




})


describe('Testing the tags selector.', () => {
  beforeEach(() => {

    cy.intercept(
      {
        method: 'GET',
        url: 'http://localhost:3000/tags',
      },
      [{"id":6,"subject":"Changing team sizes","organisationId":null,"_count":{"Events":3}},{"id":1,"subject":"Finances","organisationId":null,"_count":{"Events":2}},{"id":8,"subject":"Smaller teams","organisationId":null,"_count":{"Events":2}},{"id":7,"subject":"Work environment","organisationId":null,"_count":{"Events":2}},{"id":9,"subject":"Splitting teams","organisationId":null,"_count":{"Events":1}},{"id":11,"subject":"New office","organisationId":null,"_count":{"Events":0}},{"id":10,"subject":"Moving","organisationId":null,"_count":{"Events":0}},{"id":5,"subject":"Relocation","organisationId":null,"_count":{"Events":0}},{"id":4,"subject":"Infrastructure","organisationId":null,"_count":{"Events":0}},{"id":3,"subject":"Adminstration","organisationId":null,"_count":{"Events":0}},{"id":2,"subject":"Work culture","organisationId":null,"_count":{"Events":0}}],

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
})



describe('Testing the add tag dialog.', () => {
  beforeEach(() => {

    cy.intercept(
      {
        method: 'GET',
        url: 'http://localhost:3000/tags',
      },
      [{"id":6,"subject":"Changing team sizes","organisationId":null,"_count":{"Events":3}},{"id":1,"subject":"Finances","organisationId":null,"_count":{"Events":2}},{"id":8,"subject":"Smaller teams","organisationId":null,"_count":{"Events":2}},{"id":7,"subject":"Work environment","organisationId":null,"_count":{"Events":2}},{"id":9,"subject":"Splitting teams","organisationId":null,"_count":{"Events":1}},{"id":11,"subject":"New office","organisationId":null,"_count":{"Events":0}},{"id":10,"subject":"Moving","organisationId":null,"_count":{"Events":0}},{"id":5,"subject":"Relocation","organisationId":null,"_count":{"Events":0}},{"id":4,"subject":"Infrastructure","organisationId":null,"_count":{"Events":0}},{"id":3,"subject":"Adminstration","organisationId":null,"_count":{"Events":0}},{"id":2,"subject":"Work culture","organisationId":null,"_count":{"Events":0}}],

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


describe('Creating an event.', () => {
  beforeEach(() => {

    cy.intercept(
      {
        method: 'GET',
        url: 'http://localhost:3000/tags',
      },
      [{"id":6,"subject":"Changing team sizes","organisationId":null,"_count":{"Events":3}},{"id":1,"subject":"Finances","organisationId":null,"_count":{"Events":2}},{"id":8,"subject":"Smaller teams","organisationId":null,"_count":{"Events":2}},{"id":7,"subject":"Work environment","organisationId":null,"_count":{"Events":2}},{"id":9,"subject":"Splitting teams","organisationId":null,"_count":{"Events":1}},{"id":11,"subject":"New office","organisationId":null,"_count":{"Events":0}},{"id":10,"subject":"Moving","organisationId":null,"_count":{"Events":0}},{"id":5,"subject":"Relocation","organisationId":null,"_count":{"Events":0}},{"id":4,"subject":"Infrastructure","organisationId":null,"_count":{"Events":0}},{"id":3,"subject":"Adminstration","organisationId":null,"_count":{"Events":0}},{"id":2,"subject":"Work culture","organisationId":null,"_count":{"Events":0}}],

    ).as('getEvents')

    cy.wait(500);

    cy.visit('http://localhost:4200/events/create')
  })

  it('Pressing "Aanmaken" will return an error when not all required information is given.', () => {
    cy.get('.btn').contains('Aanmaken').click()
    cy.get('.alert').should('have.length', 1)

    cy.get('#description').type('This is a description').should('have.value', 'This is a description')
    cy.get('#title').type('All teams are getting').should('have.value', 'All teams are getting')
    cy.get('.dropdown').should('have.length', 1)
    cy.get('.dropdown').find('.dropdown-item').should('have.length', 2)
    cy.get('#title').type('{downarrow}').type('{enter}')

    cy.get('.btn').contains('Aanmaken').click()
    cy.get('.alert').should('have.length', 1)

  })

  it('Pressing "Aanmaken" with all required information, will return the user to the event page. Search for this event, and returns that specific event.', () => {

  })




  it('Pressing "Terug" will return the user back to the event page', () => {
    cy.get('.btn').contains('Terug');
    // cy.url().should('include', 'http://localhost:4200/events')

    })

})

describe('Testing the date tag.', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/events/create')
  })

  it('When pressing the date tag, the date should be on the current day by default.', () => {
    cy.get('#dateOfEvent').click()
    const date = new Date()
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
    cy.get('#dateOfEvent').should('have.value', formattedDate)
  })

  it('Typing in a correct date will return the same date', () => {
    cy.get('#dateOfEvent').click()
    cy.get('#dateOfEvent').type('2021-01-01')
    cy.get('#dateOfEvent').should('have.value', '2021-01-01')

    cy.get('#dateOfEvent').click()
    cy.get('#dateOfEvent').type('1999-12-01')
    cy.get('#dateOfEvent').should('have.value', '1999-12-01')
  })


})


describe('Testing both descriptions .', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/events/create')
  })


  it('Typing in a description will return the same description', () => {
    cy.get('#description').type('This is a description').should('have.value', 'This is a description')

    cy.get('#content').type('This is the content').should('have.value', 'This is the content')

  })

})
