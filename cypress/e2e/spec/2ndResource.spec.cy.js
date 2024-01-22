///<reference types='cypress' />

import main from "../../fixtures/main.json"

describe('2nd resource', () => {

    it('Automate drag and drop action: simple', () => {
        cy.visit(main.url2)
        cy.get('#droppable').should('have.text', 'Drop here');
        cy.get('#draggable')
          .trigger('mousedown', {which : 1, pageX : 0, pageY : 0})
          .trigger('mousemove', {which : 1, pageX : 350, pageY : 0})
          .trigger('mouseup');
        cy.get('#droppable').should('have.text', 'Dropped!');
    })


    it('Automate drag and drop action: accept', () => {
        cy.visit(main.url2);
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