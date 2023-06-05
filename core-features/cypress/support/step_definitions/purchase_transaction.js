import { Given, When, And, Then } from "@badeball/cypress-cucumber-preprocessor"
import 'cypress-iframe';

let docId = '';

When ('User goes to new material request page', () => {
    cy.get('#navbar-search').type("New Material Request")
    cy.get('#awesomplete_list_1 li').eq(1).click()
});

Then ('User fills up required material request purchase details', (datatable) => {
    cy.get('input[data-fieldname="schedule_date"]').click()
    cy.get('.datepickers-container').find('.datepicker').eq('1').find('.datepicker--button').click()

    datatable.hashes().forEach((data) => {
        cy.get('input[data-fieldname="set_warehouse"]').click().type(data.target_warehouse)
    })
})

Then ('User saves an MR using scanning of item', (datatable) => {

    datatable.hashes().forEach((data) => {
        cy.get('input[data-fieldname="scan_barcode"]').click().type(data.barcode)
        cy.get('body').click()

        cy.wait(3000).then(() => {
            cy.get('div[data-name="new-material-request-item-1"]').find('div[data-fieldname="qty"]').click()
        
            cy.get('input[data-fieldname="qty"]').click().clear().type(data.qty)
            cy.get('button[data-label="Save"]').click()
        })

        // Wait to load page before clicking Submit button
        cy.wait(4000).then(() => {
            cy.get('button[data-label="Submit"]').click()
        })

        // Wait till Iframe loads before clicking Yes button
        cy.wait(4000).then(() => {
            cy.get('.modal .standard-actions').find('button').contains('Yes').click({force: true})
        })

        cy.wait(2000).then(() => {
            cy.get('#navbar-breadcrumbs li.disabled').then($el => {
                docId = [...$el].map(el => el.innerText)
                cy.log(docId[0])
            })
        })
    })
})


When ('User goes to new purchase order page', () => {
    cy.get('#navbar-search').type("New Purchase Order")
    cy.wait(2000).then(() => {
        cy.get('#awesomplete_list_1 li').eq(1).click({force: true})
    })
});

Then ('User creates a Purchase Order from Material Request', (datatable) => {
    datatable.hashes().forEach((data) => {

        cy.get('input[data-fieldname="supplier"]').click()

        cy.wait(2000).then(() => {
            cy.get('input[data-fieldname="supplier"]').type(data.supplier)

            cy.get('button').contains('Get Items From').click()

        })

        cy.wait(2000).then(() => {
            cy.get('a.dropdown-item[data-label="Material%20Request"]').click({force: true})
        })

        cy.wait(4000).then(() => {
            cy.get('.modal input[data-fieldname="search_term"]').click().type(docId[0])
        })

        cy.wait(3000).then(() => {
            cy.get('input.list-row-check[data-item-name="'+docId[0]+'"').click()
        })

        cy.wait(2000).then(() => {

            cy.get('.standard-actions button.btn-modal-primary').contains('Get Items').click({force: true})
        })
    })

})

