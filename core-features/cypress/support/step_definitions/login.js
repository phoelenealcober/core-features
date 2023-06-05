import { Given, When, And, Then } from "@badeball/cypress-cucumber-preprocessor"

Given ('I am on on the Login page', () => {
    cy.viewport(1440, 705)
    cy.visit('/')
});

When('I login an invalid credentials', (datable) => {
    datable.hashes().forEach((el) => {
        cy.get('#login_email').clear();
        cy.get('#login_email').type(el.email);
        cy.get('#login_password').clear();
        cy.get('#login_password').type(el.password);
        cy.get('.btn-login').click();
    })
});

Then('I should see an error', () => {
    cy.wait(2000)
    cy.get('.btn-login').should('have.html', 'Invalid Login. Try again.')
});

When('I login a valid credentials', (datable) => {
    datable.hashes().forEach((el) => {
        cy.get('#login_email').clear();
        cy.get('#login_email').type(el.email);
        cy.get('#login_password').clear();
        cy.get('#login_password').type(el.password);
        cy.get('.btn-login').click();
    })
});

Then('I should redirect to home page', () => {
    cy.wait(5000)
    cy.url().should('include', '/app')
    cy.get('.page-title').contains('Home')
});


