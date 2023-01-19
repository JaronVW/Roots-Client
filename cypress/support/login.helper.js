import { KJUR } from 'jsrsasign';

// login.helper.ts
export function login() {
  return new Promise((resolve) => {

    cy.visit('http://localhost:4200/login')
    // Header
    var oHeader = {alg: 'HS256', typ: 'JWT'};
    // Payload
    var oPayload = {};
    var tNow = KJUR.jws.IntDate.get('now');
    var tEnd = KJUR.jws.IntDate.get('now + 1day');
    oPayload.username = "CompletleyFake@iSwear.com";
    oPayload.nbf = tNow;
    oPayload.iat = tNow;
    oPayload.exp = tEnd;
    var sHeader = JSON.stringify(oHeader);
    var sPayload = JSON.stringify(oPayload);
    var sJWT = KJUR.jws.JWS.sign("HS256", sHeader, sPayload, "616161");

    cy.intercept('POST', 'http://localhost:3000/auth/login', (res) => {
      res.reply({
        statusCode: 201,
        body: JSON.stringify({
          "access_token": sJWT
        })
      });
    });

    cy.intercept('GET', 'http://localhost:3000/tags', (res) => {
      res.headers = {
        'Authorization': 'Bearer ' + sJWT
      }
      res.reply({
        body:
          [
            {
              "id": 7,
              "subject": "Werkomgeving",
              "count": 3
            },
            {
              "id": 6,
              "subject": "Wijziging teamgrootte",
              "count": 2
            },
            {
              "id": 8,
              "subject": "Kleinere teams",
              "count": 1
            },
            {
              "id": 10,
              "subject": "Nieuw kantoor",
              "count": 1
            },
            {
              "id": 9,
              "subject": "Teams splitten",
              "count": 1
            },
            {
              "id": 5,
              "subject": "Verhuizing",
              "count": 1
            },
            {
              "id": 3,
              "subject": "Administratie",
              "count": 0
            },
            {
              "id": 1,
              "subject": "Financiën",
              "count": 0
            },
            {
              "id": 4,
              "subject": "Infrastructuur",
              "count": 0
            },
            {
              "id": 2,
              "subject": "Werkcultuur",
              "count": 0
            }
          ]
      });
    });

    cy.intercept('GET', 'http://localhost:3000/events?max=2&', ( res, req) => {
      res.reply({
        statusCode: 200,
        body: [
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
      })
    }).as('getEvents')

    cy.get('#emailInput').type('CompletleyFake@iSwear.com')
    cy.get('#passwordInput').type('IfYouReadThisYouAreAwesome!')
    cy.get('.btn').contains('Inloggen').click().clock().tick(3000)
    cy.url().should('include', 'http://localhost:4200/events')
    cy.window()
      .then(win => {
        expect(win.localStorage.getItem('token')).to.exist
        resolve()

      })
  })
}


