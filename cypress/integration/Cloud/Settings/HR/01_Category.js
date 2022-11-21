describe('02_Category', function() {

	
	var Category = 'Staff'

	beforeEach(function(){
        cy.getCookies()
	})
	function AddCategory(Category) {
		cy.server()
		cy.route('GET', Cypress.env('url')+'Payroll/Settings/getCategoryWiseEmployeeCount').as('addCategory')

		cy.visit(Cypress.env('url')+'Settings/Employee/Index?module=hr&submodule=category')

	//	cy.get('#HR_Category').click()
		cy.get('[title="Add Category"]').eq(0).click({force: true})

		cy.get("#categoryModalLabel").then(($span) => {
             var catagoryheadertex = $span.text();
			expect(catagoryheadertex).to.have.string('New Category')
		})
		cy.get('#categoryName').should('be.visible').should('not.disabled')
		cy.get('#categoryName').should('exist')
		
		cy.get('#description').should('be.visible').should('not.disabled')
		cy.get('#description').should('exist')

		cy.get('#displayOrder').should('be.visible').should('not.disabled')
		cy.get('#displayOrder').should('exist')
		
		cy.get('#categoryName').click()
		cy.get('#categoryName').type(Category)
		
		cy.get('#description').click()
		cy.get('#description').type(Category)
		
		
		cy.get('#displayOrder').click()
		cy.get('#displayOrder').type('1')

		cy.get('#createBtn').click()
		cy.wait(1000)

		cy.wait('@addCategory').its('status').should('eq', 200) 
              
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Category added successfully.!')	
		})
	
		cy.get(".toast-message").click()

		cy.get('.accordion > .card > .card-body').contains(Category)

	}
	function DeleteCategory () {

		cy.get('.text-danger').eq(0).click();
		
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Category deleted successfully.!')
		})	
	}

	it('Login to Cloud & select Company', function() {
        cy.login()
        cy.changeCompany();
    })
	
	it('Add Category - Demo', function() {
		AddCategory('Demo')
	})	

	it('Verify added Category ', function() {
			cy.xpath("//h5[contains(@id, 'CategoryName')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain('Demo')
			})

			cy.xpath("//span[contains(@id, 'Description')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain('Demo')
			})

			cy.xpath("//span[contains(@id, 'DisplayOrder')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain('1')
			})
	})	
	/*
	it('can add all fields',() => {
		//click on add button
		cy.get('[title="Add Category"]').eq(0).click({force: true})

		cy.get("#categoryModalLabel").then(($span) => {
             var catagoryheadertex = $span.text();
			expect(catagoryheadertex).to.have.string('New Category')
		})
		//click on category field
	  cy.get('#categoryName').type('house keeping')
	   //click on display order
	   cy.get('#displayOrder').type('2')
	   //click on description field
	   cy.get('#description').type('how are you')
	   //click on save button
	  cy.get('#createBtn').click()
	  //verify success message
	  cy.get(".toast-message").invoke('text').then((text) => {
		expect(text.trim()).equal('Category added successfully.!')
	  //click on message to close message box
	  cy.get(".toast-message").click()
	  cy.wait(2000)  
	   })
    })
	it('verify  all added fields',() => {
		//
		cy.xpath("//span[contains(text(),'how are you')]").invoke('text').then((text) => {
			expect(text.trim()).equal('how are you')
			}) 
	})*/

	it('Edit Category - Demo', function() {	
		cy.wait(1000)
		cy.get('.fa-edit').eq(0).click({force: true})
		cy.wait(1000)
		cy.get('#description').click({force: true})
		cy.get('#description').clear()
		cy.get('#description').type('Staff Category update')
		
		cy.get('#updateBtn').should('be.visible').should('not.disabled')
		cy.get('#updateBtn').should('exist')
		cy.get('#updateBtn').click({force: true})
		cy.wait(1000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Category updated successfully.!')
		})
		cy.get(".toast-message").click({force: true})
		cy.wait(2000)
	})	
	
	it('Verify edited Category details', function() {

		cy.xpath("//span[contains(@id, 'Description')]").invoke('text').then((text) => {
		expect(text.trim()).to.contain('Staff Category update')
		})
	})	
	
	it('Delete Category - Demo', function() {
		DeleteCategory('demo')
    })


	context('02_Category - flow', function() {

	
	it('add Category - staff', function() {
		AddCategory('Staff')
    })
    /*
	it('Delete Category - Demo', function() {
		DeleteCategory('demo')
	})
    
	it('Delete Category - house keeping', function() {
		DeleteCategory('house keeping')
	})*/
})
})