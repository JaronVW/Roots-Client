describe('Testing the event cards results and search function', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: 'http://localhost:3000/events?',
      },
      [
        {
          "id": 1,
          "title": " HALLO DIT IS EEN TEST",
          "description": "dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text ",
          "content": "dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text ",
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
        },
        {
          "id": 2,
          "title": "Just a crazy ass title yo! true story! But this is title.. NGL coolcool super cool",
          "description": "The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph,",
          "content": "dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text ",
          "dateOfEvent": "Wed Dec 21 2022",
          "userId": null,
          "tags": [
            {
              "id": 3,
              "subject": "Adminstration"
            },
            {
              "id": 14,
              "subject": "Blue"
            },
            {
              "id": 10,
              "subject": "Changing team sizes"
            }
          ]
        },
        {
          "id": 3,
          "title": " Dit is een nice event. true story",
          "description": "dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text ",
          "content": "dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text ",

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

    ).as('getEvents')


    cy.intercept(
      {
        method: 'GET',
        url: 'http://localhost:3000/events/1',
      },
      {
        "id": 1,
        "title": " HALLO DIT IS EEN TEST",
        "description": "dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text ",
        "content": "dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text dummy text ",
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
      ).as('getEventsEmpty')
    cy.wait(500);

    cy.visit('http://localhost:4200/events')

  })


  it('checks if there is events available', () => {
    cy.get('.example-accordion').should('have.length', 1)
    cy.get('.example-accordion-item').should('have.length', 3)

  })

  it('finds a single event. Checks if it has a title and some tags', () => {
    cy.get('#accordion-header-0').should('have.length' , 1)
      .find('h1')

    cy.get('#accordion-header-0').should('have.length' , 1)
      .find('.info')
      .find('.tags')
      .find('span')
  })

  it('can open a event, go to options, Archive the event, and result should be the previous array minus 1', () => {
    cy.get('#accordion-header-0').should('have.length' , 1)
      .find('.expand-item').click()

    cy.get('#accordion-header-0').should('have.length' , 1)
      .find('.more-options').click()

    cy.get('.example-accordion-item').should('have.length', 3)

    cy.get('#cdk-overlay-0')
      .find('.mat-menu-content')
      .find('.mat-ripple')
      .get('.mat-focus-indicator').contains('Archiveren').click();

//     cy.wait('@getEvents').then(xhr => {
//       xhr.response.body = xhr.response.body.filter(event => event.id !== 1);
//     });
//
//     cy.wait('@getEvents').its('response.body').should('have.length', 2);
//
// // Wait for the DOM to be updated with the new data
//     cy.wait(500);

    // cy.get('.example-accordion-item').should('have.length', 2);


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

    cy.url().should('include', 'http://localhost:4200/events/edit/1')

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
    cy.get('.search-input').should('have.length', 1).type('Testing the input. Yay! it works!')
  });

  it ('finds the search bar, Search for a specific event based on the title, press enter to search', () => {
    cy.intercept(
      {
        method: 'GET',
        url: 'http://localhost:3000/events?searchQuery=story&',
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
    cy.wait(700);

    cy.get('.search-input').should('have.length', 1).type('story').type('{enter}')

    cy.get('.example-accordion-item').should('have.length', 1)

    cy.get('.btn').contains('Zoekopdracht wissen').should('have.length', 1).click()

    cy.get('.search-input').should('have.length', 1).type('story');

    cy.get('.btn').contains('Zoeken').should('have.length', 1).click()

    cy.get('.example-accordion-item').should('have.length', 1)

  });



  it('press the checkbox for show archived items without a search value, Should return all archived items.', () => {
    cy.intercept(
      {
        method: 'GET',
        url: 'http://localhost:3000/events?getArchivedItems=true',
      },
      [
        {
          "id": 8,
          "title": "teams and finances testEvent",
          "description": "ajaskjnasf",
          "content": null,
          "dateOfEvent": "2022-12-28T04:43:08.569Z",
          "userId": null,
          "isArchived": true,
          "organisationId": null,
          "tags": [
            {
              "id": 1,
              "subject": "Finances",
              "organisationId": null
            },
            {
              "id": 8,
              "subject": "Smaller teams",
              "organisationId": null
            }
          ]
        },
        {
          "id": 1,
          "title": "Max 12 people per team in a BV testEvent",
          "description": "We are going to limit the amount of people in a team in a BV to 12.",
          "content": "asdasdas",
          "dateOfEvent": "2013-09-09T00:00:00.000Z",
          "userId": 2,
          "isArchived": true,
          "organisationId": null,
          "tags": [
            {
              "id": 6,
              "subject": "Changing team sizes",
              "organisationId": null
            },
            {
              "id": 7,
              "subject": "Work environment",
              "organisationId": null
            }
          ]
        }
      ]
    ).as('getArchivedItems')
    cy.wait(300);

    cy.get('#flexCheckDefault').click().should('be.checked')
    cy.get('.btn').contains('Zoeken').should('have.length', 1).click()
    cy.get('.example-accordion-item').should('have.length', 2)

  });

})
