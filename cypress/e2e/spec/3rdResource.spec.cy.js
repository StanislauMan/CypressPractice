///<reference types='cypress' />

import resourcesData from "../../fixtures/resourcesData.json"

describe('3rd resource', () => {

    before(() => {
        cy.visit(resourcesData.url3)
        cy.getIFrame('#mce_0_ifr')
          .find('#tinymce')
          .should('have.text', 'Your content goes here.')
          .clear()
    })
    
    it('Automate fill text into iframe', () => {
        cy.getIFrame('#mce_0_ifr')
          .find('#tinymce')
          .type(`${resourcesData.text50}{selectAll}`)
          .should('have.text', resourcesData.text50)
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