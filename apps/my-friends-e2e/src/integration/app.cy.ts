import { getGreeting } from '../support/app.po';

describe('my-friends', () => {
  describe('Invalid pages', () => {
    it('should display 404 page', () => {
      cy.visit('/invalid-route');
      cy.get('h1').contains('404: page missing');
    });
  });

  describe('Valid pages', () => {
    before(() => cy.visit('/'));

    it('should land on the proper url', () => {
      cy.url().should('eq', 'http://localhost:4200/');
    });

    it('should include proper components before adding a user', () => {
      // Function helper example, see `../support/app.po.ts` file
      getGreeting().contains('My Friends');
      cy.get('wyn-user-form').should('exist');
      cy.get('wyn-force-directed-graph-card').should('not.exist');
      cy.get('wyn-bubble-chart-card').should('not.exist');
      cy.get('wyn-horizontal-bar-chart-card').should('not.exist');
    });

    it('should show empty user form', () => {
      cy.get('input[formcontrolname="name"]').should('have.value', '');
      cy.get('input[formcontrolname="age"]').should('have.value', '');
      cy.get('input[formcontrolname="weight"]').should('have.value', '');
      cy.get('input[formcontrolname="friendNameInput"]').should(
        'have.value',
        ''
      );
      cy.get('input[formcontrolname="friendNameInput"]').should('be.disabled');

      cy.get('mat-chip').should('not.exist');

      cy.get('mat-card-actions button').contains('Add User').should('exist');
      cy.get('mat-card-actions button')
        .contains('Add User')
        .parent('button')
        .should('be.disabled');
      cy.get('mat-card-actions button')
        .contains('Populate Random Data')
        .should('exist');
      cy.get('mat-card-actions button').contains('Reset').should('exist');
    });

    it('should enter user details one-by-one, add the user, and show the chart cards', () => {
      cy.get('input[formcontrolname="name"]').type('John');
      cy.get('input[formcontrolname="name"]').should('have.value', 'John');

      cy.get('input[formcontrolname="age"]').type('38');
      cy.get('input[formcontrolname="age"]').should('have.value', '38');

      cy.get('input[formcontrolname="weight"]').type('180');
      cy.get('input[formcontrolname="weight"]').should('have.value', '180');

      cy.get('mat-card-actions button').contains('Add User').click();

      cy.get('mat-progress-bar').should('exist');
      cy.get('input[formcontrolname="name"]')
        .should('be.disabled')
        .should('have.value', 'John');
      cy.get('input[formcontrolname="age"]')
        .should('be.disabled')
        .should('have.value', '38');
      cy.get('input[formcontrolname="weight"]')
        .should('be.disabled')
        .should('have.value', '180');
      cy.get('input[formcontrolname="friendNameInput"]').should('be.disabled');

      cy.get('mat-progress-bar').should('not.exist');
      cy.get('input[formcontrolname="name"]')
        .should('be.enabled')
        .should('have.value', '');
      cy.get('input[formcontrolname="age"]')
        .should('be.enabled')
        .should('have.value', '');
      cy.get('input[formcontrolname="weight"]')
        .should('be.enabled')
        .should('have.value', '');
      cy.get('input[formcontrolname="friendNameInput"]')
        .should('be.enabled')
        .should('have.value', '');
      cy.get('wyn-force-directed-graph-card').should('exist');
      cy.get('wyn-bubble-chart-card').should('exist');
      cy.get('wyn-horizontal-bar-chart-card').should('exist');
    });

    it('should add second user manually and be friends with John', () => {
      cy.get('wyn-force-directed-graph-card').should('exist');
      cy.get('wyn-bubble-chart-card').should('exist');
      cy.get('wyn-horizontal-bar-chart-card').should('exist');

      cy.get('input[formcontrolname="name"]').type('Chris');
      cy.get('input[formcontrolname="name"]').should('have.value', 'Chris');

      cy.get('input[formcontrolname="age"]').type('37');
      cy.get('input[formcontrolname="age"]').should('have.value', '37');

      cy.get('input[formcontrolname="weight"]').type('188');
      cy.should('have.value', '188');

      cy.get('input[formcontrolname="friendNameInput"]').type('John');
      cy.get('input[formcontrolname="friendNameInput"]').should(
        'have.value',
        'John'
      );

      cy.get('mat-option span').contains('John').click(); // select auto-complete option
      cy.get('input[formcontrolname="friendNameInput"]').should(
        'have.value',
        ''
      ); // should clear input

      cy.get('mat-chip').eq(0).should('contain', 'John');

      cy.get('mat-card-actions button').contains('Add User').click();

      cy.get('mat-progress-bar').should('not.exist');
      cy.get('input[formcontrolname="name"]')
        .should('be.enabled')
        .should('have.value', '');
      cy.get('input[formcontrolname="age"]')
        .should('be.enabled')
        .should('have.value', '');
      cy.get('input[formcontrolname="weight"]')
        .should('be.enabled')
        .should('have.value', '');
      cy.get('input[formcontrolname="friendNameInput"]')
        .should('be.enabled')
        .should('have.value', '');
      cy.get('wyn-force-directed-graph-card').should('exist');
      cy.get('wyn-bubble-chart-card').should('exist');
      cy.get('wyn-horizontal-bar-chart-card').should('exist');
    });

    it('should enter third random user details, add the user, and show the chart cards', () => {
      cy.get('mat-card-actions button')
        .contains('Populate Random Data')
        .click();

      cy.get('mat-card-actions button').contains('Add User').click();
      cy.get('mat-progress-bar').should('exist');

      cy.get('mat-progress-bar').should('not.exist');
      cy.get('wyn-force-directed-graph-card').should('exist');
      cy.get('wyn-bubble-chart-card').should('exist');
      cy.get('wyn-horizontal-bar-chart-card').should('exist');
    });
  });
});
