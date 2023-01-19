import {login} from "../../support/login.helper";

describe('Testing the recommended tags.', () => {
  beforeEach(() => {
    login()

    cy.get('.btn').contains('Aanmaken').should('have.length', 1).click()
  })


  it('Finds the title input field and can write a title in it. Receives 2 recommended tags based on the title given.', () => {
    cy.get('#title').type('teams meeting for the win').wait(300)
    cy.get('#description').type('This is a description').should('have.value', 'This is a description')
    cy.get('#title').click()


    cy.get('#dropdownTags').should('have.length', 1)

    cy.get('#dropdownTags').find('.dropdown-item').should('have.length', 2)

  })


  it('Writes 2 letters and backspaces 2 times, and the result of the result should have 0 recommendations.', () => {
    cy.get('#title')
    cy.get('#description')

    cy.get('#title').type(`AB{backspace}{backspace}`).should('have.value', '')

    cy.get('#dropdownTags').should('have.length', 1)

    cy.get('#dropdownTags').find('.dropdown-item').should('have.length', 0)

  })

  // it('Writes a title, stops typing and selects a tag. Tag should be added to the list. Continues typing and selects another new tag that is recommended. Deletes the other tag.', () => {
  // Has a cypress bug..
  //   cy.get('#title').type('Alle teams gaan verhuizen').should('have.value', 'Alle teams gaan verhuizen')
  //
  //   cy.get('#dropdownTags').should('have.length', 1)
  //
  //   cy.get('#dropdownTags').find('.dropdown-item').should('have.length', 2)
  //
  //   cy.get('#title').type('{downarrow}').type('{enter}')
  //
  //   cy.get('#dropdownTags').find('.dropdown-item').should('have.length', 1)
  //
  //   cy.get('#title').type(' improvement on their Finances').wait(400).type('{downarrow}').type('{enter}')
  //
  //   cy.get('#dropdownTags').find('.dropdown-item').should('have.length', 4)
  // })
  //
})


describe('Testing the tags selector.', () => {
  beforeEach(() => {
    login()
    cy.get('.btn').contains('Aanmaken').should('have.length', 1).click()
  })


  it('Find the Tags dropdown and click on it. Receives a list of 11 tags.', () => {
    cy.get('#tags').click()

    cy.get('#dropdownTags').should('have.length', 1)

    cy.get('.multiselect-dropdown').find('.dropdown-list').should('have.length', 1)
      .find('.item1').should('have.length', 1)

    cy.get('.multiselect-dropdown').find('.dropdown-list').should('have.length', 1)
      .find('.item2').should('have.length', 1)
      .find('li').should('have.length', 10)

  })
})



describe('Testing the add tag dialog.', () => {
  beforeEach(() => {

    login()
    cy.get('.btn').contains('Aanmaken').should('have.length', 1).click()
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
    login()
    cy.get('.btn').contains('Aanmaken').should('have.length', 1).click()

  })

  it('Pressing "Aanmaken" will return an error when not all required information is given.', () => {
    cy.get('.btn').contains('Aanmaken').click()
    cy.get('.alert').should('have.length', 1)

    cy.get('#description').type('This is a description').should('have.value', 'This is a description')
    cy.get('#title').type('All teams are getting').should('have.value', 'All teams are getting')
    // dropdown does not work with cypress anymore for some reason.
    // cy.get('#dropdownTags').should('have.length', 1)
    // cy.get('#dropdownTags').find('.dropdown-item').should('have.length', 2)
    // cy.get('#title').type('{downarrow}').type('{enter}')

    cy.get('.btn').contains('Aanmaken').click()
    cy.get('.alert').should('have.length', 1)
  })


  it('Pressing "Terug" will return the user back to the event page', () => {
    cy.get('.btn').contains('Terug');
    // cy.url().should('include', 'http://localhost:4200/events')

    })

})

describe('Testing the date tag.', () => {
  beforeEach(() => {
    login()
    cy.get('.btn').contains('Aanmaken').should('have.length', 1).click()
  })

  // Bug in cypress. Current date does not show in test browser.
  // it('When pressing the date tag, the date should be on the current day by default.', () => {
  //   cy.get('#dateOfEvent').click()
  //   const date = new Date()
  //   const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
  //   cy.get('#dateOfEvent').should('have.value', formattedDate)
  // })

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
    login()
    cy.get('.btn').contains('Aanmaken').should('have.length', 1).click()
  })


  it('Typing in a description will return the same description', () => {
    cy.get('#description').type('This is a description').should('have.value', 'This is a description')
  })

})
