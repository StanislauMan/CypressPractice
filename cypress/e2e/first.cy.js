///<reference types='cypress' />

import first from "../fixtures/first.json"

describe('First resource', () => {
    
    it('Pressing on button with dynamic ID', () => {
        cy.visit(`${first.url}/dynamicid`)
        cy.get('.btn-primary').click()
    })

    it('Automate validation for client side delay before performing an action', () => {
        cy.visit(`${first.url}/clientdelay`)
        cy.get('.btn-primary').click()
        cy.get('.fa-spinner').should('be.visible')
        cy.get('.bg-success', {timeout: 15000}).should('be.visible')
        cy.get('.fa-spinner').should('not.be.visible')
    })

    it('Automate actions on progress bar', () => {
        cy.visit(`${first.url}/progressbar`)
        cy.get('#startButton').click()
        cy.get('#progressBar').then($el => {

        //console.log($el.text())
            if($el.text() === '75%') {
                cy.get('#stopButton').click()
            }
        })

    })


    it('Automate Shadow DOM scenario', () => {
        let guid;

        cy.visit('https://uitestingplayground.com/shadowdom')
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

        // cy.visit('https://uitestingplayground.com/shadowdom')
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