///<reference types='cypress' />

import main from "../fixtures/main.json"

describe('3rd resource', () => {

    before(() => {
        cy.visit(main.url3)
        cy.getIFrame('#mce_0_ifr')
          .find('#tinymce')
          .clear()
    })
    
    it('Automate fill text into iframe', () => {
        cy.getIFrame('#mce_0_ifr')
          .find('#tinymce')
          .type(`${main.text50}{selectAll}`)
          .should('have.text', main.text50)
        cy.get('button.tox-mbtn:nth-child(4)')
          .click()
        cy.get('div[title="Background color"]')
          .click()
        cy.get('div[title="Light Yellow"]')
          .click()
        cy.get('button[title="Italic"]')
          .click()
        cy.getIFrame('#mce_0_ifr')
          .find('#tinymce span')
          .click('bottomRight')
          .should('have.css', 'background-color', 'rgb(251, 238, 184)')
    })

})