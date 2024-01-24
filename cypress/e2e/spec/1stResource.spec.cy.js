///<reference types='cypress' />

import resourcesData from "../../fixtures/resourcesData.json"

describe('1st resource', () => {

    it('Pressing on button with dynamic ID', () => {
        cy.visit(`${resourcesData.url1}/dynamicid`)
        cy.get('.btn-primary').click()
    })

    it('Automate validation for client side delay before performing an action', () => {
        cy.visit(`${resourcesData.url1}/clientdelay`)
        cy.get('.btn-primary').click()
        cy.get('.fa-spinner').should('be.visible')
        cy.get('.bg-success', {timeout: 25000}).should('be.visible')
        cy.get('.fa-spinner').should('not.be.visible')
    })

    it('Automate actions on progress bar', () => {
        cy.visit(`${resourcesData.url1}/progressbar`)
        cy.get('#startButton')
          .click()
        cy.get('#progressBar', {timeout: 25000})
          .should('have.text', '75%')
        cy.get('#stopButton')
          .click()
    })


    it('Automate Shadow DOM scenario', () => {
        let guid;

        cy.visit(`${resourcesData.url1}/shadowdom`)
        cy.get('.container guid-generator')
            .shadow()
            .find('#buttonGenerate')
            .click()
        cy.get('.container guid-generator')
            .shadow()
            .find('.edit-field')
            .invoke('val')
            .then(text => {
                guid = text
            })
        cy.get('.container guid-generator')
            .shadow()
            .find('#buttonCopy')
            .click()
        cy.window().then(win => {
            win.navigator.clipboard.readText().then(clipboardText => {
                expect(clipboardText).to.eql(guid)
            })
        })

        // ==== OR ====

        // cy.visit(`${main.url1}/shadowdom`)
        // cy.get('#buttonGenerate', {includeShadowDom: true})
        //   .click()
        // cy.get('.edit-field', {includeShadowDom: true})
        //   .then($el => {
        //     guid = $el.val()
        //   })
        // cy.get('#buttonCopy', {includeShadowDom: true})
        //   .click()
        // cy.window().then(win => {
        //     win.navigator.clipboard.readText().then(clipboardText => {
        //         expect(clipboardText).to.eql(guid)
        //     })
        // })

    })

})