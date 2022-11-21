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
	

	context('02_Category - flow', function() {

	
	it('add Category - staff', function() {
		AddCategory('Staff')
    })
    
})
})