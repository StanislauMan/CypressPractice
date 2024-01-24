///<reference types='cypress' />

import resourcesData from "../../fixtures/resourcesData.json"

describe('2nd resource', () => {

    it('Automate drag and drop action: simple', () => {
        cy.visit(resourcesData.url2)
        cy.get('.card:nth-child(5)').click()
        cy.get('.element-group:nth-child(5) > .element-list > .menu-list > .btn:nth-child(4)').click()
        cy.get('#droppable').should('have.text', 'Drop here');
        cy.get('#draggable')
          .trigger('mousedown', {which : 1, pageX : 0, pageY : 0})
          .trigger('mousemove', {which : 1, pageX : 350, pageY : 0})
          .trigger('mouseup');
        cy.get('#droppable').should('have.text', 'Dropped!');
    })


    it('Automate drag and drop action: accept', () => {
        cy.visit(resourcesData.url2);
        cy.get('.card:nth-child(5)').click()
        cy.get('.element-group:nth-child(5) > .element-list > .menu-list > .btn:nth-child(4)').click()
        cy.get('#droppable').should('have.text', 'Drop here');
        cy.get('#droppableExample-tab-accept')
          .click()
        cy.get('#acceptable')
          .trigger('mousedown', {which : 1, pageX : 0, pageY : 0})
          .trigger('mousemove', {which : 1, pageX : 340, pageY : 0}).then(() => {
            cy.get('.ui-droppable-hover')
              .should('have.css', 'background-color', 'rgb(60, 179, 113)')
          })
          .trigger('mouseup')
        cy.get('.ui-state-highlight')
          .should('have.css', 'background-color', 'rgb(70, 130, 180)')
          .and('have.text', 'Dropped!')
    })
})