import { Given, When, And, Then } from "@badeball/cypress-cucumber-preprocessor"

When ('User checks new item form', () => {
    cy.get('#navbar-search').type("New Item")
    cy.get('#awesomplete_list_1 li').eq(1).click()
});

Then ('Item code field should not be reflected',()=>{
    cy.get('input[data-fieldname="item_code"]').should('not.exist')
});

Then ('Naming series field should not be reflected',()=>{
    cy.get('input[data-fieldname="naming_series"]').should('not.exist')
});

When ('User create a new item', (datable) => {
    datable.hashes().forEach((data) => {
        cy.get('input[data-fieldname="item_name"]').clear().type(data.item_name)
        cy.get('input[data-fieldname="item_group"]').clear().type(data.item_group)
        cy.get('input[data-fieldname="stock_uom"]').clear().type(data.default_uom) 
        
        cy.get('button[data-label="Save"]').click()
        cy.wait(6000)
    });
});

Then ('System should auto-generate SKU', () => {
    cy.get('#navbar-breadcrumbs').find('li').eq(2).should((str) => {
        expect(str).to.contain('SKU')
    })
});

Then ('User should not be able to rename an item code',() => {
    cy.get('.title-text').should('not.be.enabled')
});

Then('Has Batch field should be disabled', ()=> {
    cy.get('input[data-fieldname="has_batch_no"]').should('not.exist')
});

Then('Serial Number field should be disabled', ()=> {
    cy.get('input[data-fieldname="has_serial_no"]').should('not.exist')
});


Then ('Defined default UOM should be added to UOMs table', () => {
    cy.get('input[data-fieldname="stock_uom"]')
    .invoke('val')
    .then(val => {
     
        cy.get('div[data-fieldname="uoms"]').find('div[data-fieldname="uom"] a').then($el => {
            const values = [...$el].map(el => el.innerText.replace(/\s/g, ''))
            
            expect(val).to.be.oneOf(values)

        })
    })
})

Then ('Default UOM conversion factor should be equal to 1', () => {
    cy.get('div[data-fieldname="uoms"]').find('div[data-fieldname="conversion_factor"]').then($el => {
        const values = [...$el].map(el => el.innerText.replace(/\s/g, ''))
        
        expect('1').to.be.oneOf(values)

    })
})

When ('User change default UOM conversion factor', (datable) => {

    cy.get('.section-head').contains(' Units of Measure ').click({force: true})

    datable.hashes().forEach((data) => {
        cy.get('div[data-fieldname="uoms"]').find('div[data-fieldname="conversion_factor"] .static-area').invoke('show').find('div').click({force:true})
        

        cy.get('input[data-fieldname="conversion_factor"]').click().clear().type(data.conversion_factor)
    })
})

Then ('System should prompt an error', (datatable)=> {
    cy.get('button[data-label="Save"]').click()

    let msg;
    cy.on('uncaught:exception', (err, runnable) => {
        msg = err.message
        return false
    })

    cy.wait(3000).then(() => {
        datatable.hashes().forEach((data) => {
            expect(msg).contains(data.error_message)
        })
    })

})

Then ('New defined default stock UOM should be reflected', (datable)=> {
    let uom;
    datable.hashes().forEach((data) => {
        uom = data.default_uom
        cy.get('input[data-fieldname="stock_uom"]').clear().type(data.default_uom) 
    })
   
    cy.get('button[data-label="Save"]').click()
    cy.wait(3000)

    cy.get ('input[data-fieldname="stock_uom"]').should('have.value', uom)
})

When ('User adds another UOM in UOMs table', (datatable) =>{
    
    cy.get('.section-head').contains(' Units of Measure ').click({force: true})

    cy.get('.section-head').contains(' Units of Measure ').parent().find('.grid-add-row').click()

    datatable.hashes().forEach((data) => {
        cy.get('div[data-fieldname="uoms"] .grid-body .grid-row').eq(1).find('div[data-fieldname="uom"]').find('.static-area').invoke('show').click({force: true})
    
        cy.get('input[data-fieldname="uom"]').click().clear().type(data.uom)

        cy.get('div[data-fieldname="uoms"] .grid-body .grid-row').eq(1).find('div[data-fieldname="conversion_factor"]').find('.static-area').invoke('show').click({force: true})

        cy.get('input[data-fieldname="conversion_factor"]').click().clear().type(data.conversion_factor)

        cy.get('button[data-label="Save"]').click()
    })
})

When ('User modify non-stock UOM conversion factor to 1', ()=>{

    cy.get('.section-head').contains(' Units of Measure ').click({force: true})

    cy.get('div[data-fieldname="uoms"] .grid-body .grid-row').eq(1).find('div[data-fieldname="conversion_factor"]').find('.static-area').invoke('show').click({force: true})

    cy.get('div[data-fieldname="uoms"] .grid-body .grid-row').eq(1).find('input[data-fieldname="conversion_factor"]').dblclick({force: true}).type('1')

    let msg;
    cy.on('uncaught:exception', (err, runnable) => {
        msg = err.message
        return false
    })

    cy.wait(2000).then(() => {
        cy.log(msg)
    })
    // cy.get('input[data-fieldname="conversion_factor"]').dblclick({force: true}).type('1')

    // cy.get('div[data-fieldname="uoms"] .grid-body .grid-row').eq(1).find('div[data-fieldname="conversion_factor"]').find('.static-area').invoke('show').click({force: true})

    // cy.get('input[data-fieldname="conversion_factor"]').click().clear().type('1')

    // cy.get('button[data-label="Save"]').click()
})


Then ('UOM list should be reflected in Sales UOM options', (datatable) => {
    cy.get('.section-head').contains(' Prices ').parent().find('div[data-fieldname="selling_prices"] .grid-add-row').click()

    cy.wait(2000)
    cy.get('div[data-name="new-item-selling-price-1"]').find('input[data-fieldname="uom"]').click({force: true})

    cy.wait(2000).then(() => {
        let values = []
        cy.get('div[data-name="new-item-selling-price-1"]').find('input[data-fieldname="uom"]').parent().find('ul li').each(($el, index, $list) => {
            values.push($el.text())
        })
        
        cy.wait(2000).then(() => {
            datatable.hashes().forEach((data) => {
                expect(data.default_uom).to.be.oneOf(values)
            })
        })
    })

})

When ('User creates new item without saving', (datatable)=> {
    datatable.hashes().forEach((data) => {
        cy.get('input[data-fieldname="item_name"]').clear().type(data.item_name)
        cy.get('input[data-fieldname="item_group"]').clear().type(data.item_group)
        cy.get('input[data-fieldname="stock_uom"]').clear().type(data.default_uom) 
        
    });
})

When ('User adds another UOM in UOMs table without saving', (datatable) => {

    cy.get('.section-head').contains(' Units of Measure ').click({force: true})

    cy.get('.section-head').contains(' Units of Measure ').parent().find('.grid-add-row').click()

    datatable.hashes().forEach((data) => {
        cy.get('div[data-fieldname="uoms"] .grid-body .grid-row').find('div[data-fieldname="uom"]').find('.static-area').invoke('show').click({force: true})
    
        cy.get('input[data-fieldname="uom"]').click().clear().type(data.uom)

        cy.get('div[data-fieldname="uoms"] .grid-body .grid-row').find('div[data-fieldname="conversion_factor"]').find('.static-area').invoke('show').click({force: true})

        cy.get('input[data-fieldname="conversion_factor"]').click({force: true}).clear().type(data.conversion_factor)
    })
})

Then ('UOM list should be reflected in Purchase UOM options', (datatable) => {
    cy.get('.section-head').contains(' Prices ').parent().find('div[data-fieldname="buying_prices"] .grid-add-row').click()

    cy.wait(2000)
    cy.get('div[data-name="new-item-buying-price-1"]').find('input[data-fieldname="uom"]').click({force: true})

    cy.wait(2000).then(() => {
        let values = []
        cy.get('div[data-name="new-item-buying-price-1"]').find('input[data-fieldname="uom"]').parent().find('ul li').each(($el, index, $list) => {
            values.push($el.text())
        })
        
        cy.wait(2000).then(() => {
            datatable.hashes().forEach((data) => {
                expect(data.uom).to.be.oneOf(values)
            })
        })
    })

})

When ('User removes a UOM from UOM list', () => {
    cy.get('.section-head').contains(' Units of Measure ').parent().find('.grid-body .grid-row').eq(1).find('input[type="checkbox"]').click({force: true})

    cy.get('.section-head').contains(' Units of Measure ').parent().find('.grid-remove-rows').should('be.visible').then(() => {
        cy.get('.section-head').contains(' Units of Measure ').parent().find('.grid-remove-rows').click()
    })
})

Then ('Removed UOM should not be visible', (datatable) => {
    datatable.hashes().forEach((data) => {
        cy.get('.section-head').contains(' Units of Measure ').parent().should('not.contain.text', data.default_uom)
    })
})

When ('User modify a UOM from UOM list', () => {
    cy.get('.section-head').contains(' Units of Measure ').parent().find('.grid-body .grid-row').eq(1).find('input[type="checkbox"]').click({force: true})
})




