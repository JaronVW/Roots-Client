describe('Testing the recommended tags.', () => {
  beforeEach(() => {


    cy.visit('http://localhost:4200/events/create')

  })


  it('Finds the title input field and can write a title in it.', () => {





  })

  it('finds a single event. Checks if it has a title and some tags', () => {
    cy.get('#accordion-header-0').should('have.length' , 1)
      .find('h1')

    cy.get('#accordion-header-0').should('have.length' , 1)
      .find('.info')
      .find('.tags')
      .find('span')
  })

  it('can open a event, go to options, delete the event, and result should be the previous array minus 1', () => {
    cy.get('#accordion-header-0').should('have.length' , 1)
      .find('.expand-item').click()

    cy.get('#accordion-header-0').should('have.length' , 1)
      .find('.more-options').click()

    cy.get('#cdk-overlay-0')
      .find('.mat-menu-content')
      .find('.mat-ripple')
      .get('.mat-focus-indicator').contains('Archiveren').click()

    // cy.get('.example-accordion-item').should('have.length', 2)

    // to do: fix new list after deletion

  })

  it('can open a event, go to options, edit the event, gets send to a new page with the correct routing', () => {
    cy.get('#accordion-header-0').should('have.length' , 1)
      .find('.expand-item').click()

    cy.get('#accordion-header-0').should('have.length' , 1)
      .find('.more-options').click()

    cy.get('#cdk-overlay-0')
      .find('.mat-menu-content')
      .find('.mat-ripple')
      .get('.mat-focus-indicator').contains('Wijzigen').click()

    cy.url().should('include', 'http://localhost:4200/events/edit/12')

    // cy.get('.example-accordion-item').should('have.length', 2) fix de bug!!

    // to do: fix new list after deletion
  })

  it('can open a event, go to options, checks if there are 2 options.', () => {
    cy.get('#accordion-header-0').should('have.length' , 1)
      .find('.expand-item').click()

    cy.get('#accordion-header-0').should('have.length' , 1)
      .find('.more-options').click()

    cy.get('#cdk-overlay-0')
      .find('.mat-menu-content')
      .find('.mat-ripple')
      .get('.mat-focus-indicator').should('have.length', 2)
  })


  it('can open a event, check for both buttons to undo expansion of the accordion to be available and works.', () => {
    cy.get('#accordion-header-0').should('have.length' , 1)
      .find('.expand-item').click()
      .find('.ng-star-inserted').click()

    cy.get('#accordion-header-0').should('have.length' , 1)
      .find('.expand-item').click()

    cy.get('#accordion-header-0').should('have.length' , 1)
      .find('.small-expand-item').click()
  })

  it('find the create event button, and gets directed to a new page with the correct routing.', () => {
      cy.get('.btn').contains('Aanmaken').should('have.length', 1).click()
      cy.url().should('include', 'http://localhost:4200/events/create')

      // Double check if the page is loaded by checking if the title is there
      cy.get('.text-center').contains('h1', 'Aanmaken event')
  });

  it ('finds the search bar, And check if you can write something in it.', () => {
    cy.get('.input').should('have.length', 1).type('Testing the input. Yay! it works!')
  });

  it ('finds the search bar, Search for a specific event based on the title, press the button to search', () => {
    cy.get('.input').should('have.length', 1).type('story');

    cy.intercept(
      {
        method: 'GET',
        url: 'http://localhost:3000/events?searchQuery=story\n',
      },
      [
        {
          "id": 1,
          "title": " Dit is een nice event. true story",
          "description": "dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text ",
          "dateOfEvent": "Thu Dec 22 2022",
          "userId": null,
          "tags": [
            {
              "id": 14,
              "subject": "Blue"
            },
            {
              "id": 1,
              "subject": "Finances"
            },
            {
              "id": 8,
              "subject": "Moving"
            },
            {
              "id": 13,
              "subject": "no tag"
            },
            {
              "id": 15,
              "subject": "Red"
            }
          ]
        }
      ],
    ).as('getQueryResult')
    cy.wait(300);

    cy.get('.btn').contains('Zoeken').should('have.length', 1).click()

    cy.get('.example-accordion-item').should('have.length', 1)
  });


  it ('finds the search bar, Search for a specific event based on the title, press enter to search', () => {
    cy.intercept(
      {
        method: 'GET',
        url: 'http://localhost:3000/events?searchQuery=story\n',
      },
      [
        {
          "id": 1,
          "title": " Dit is een nice event. true story",
          "description": "dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text ",
          "dateOfEvent": "Thu Dec 22 2022",
          "userId": null,
          "tags": [
            {
              "id": 14,
              "subject": "Blue"
            },
            {
              "id": 1,
              "subject": "Finances"
            },
            {
              "id": 8,
              "subject": "Moving"
            },
            {
              "id": 13,
              "subject": "no tag"
            },
            {
              "id": 15,
              "subject": "Red"
            }
          ]
        }
      ],
    ).as('getQueryResult')
    cy.wait(300);

    cy.get('.input').should('have.length', 1).type('story').trigger('keydown', {
      key: 'Enter',
    });

    cy.get('.example-accordion-item').should('have.length', 1)
  });

})
