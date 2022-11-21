describe('Loan Details with payroll process', function() {
	
	var Employeecatagorytype='';
	var compnaylength;
	
	beforeEach(function(){
        cy.getCookies()
	})	
	it('Pocket HRMS Login', function() {
		cy.login()
	})
	
	
	
	it('Change Company', function() {		 
		cy.changeCompany(); 
	
	}) 

	
	it('Payroll Salary components navigate', function() {
		cy.visit(Cypress.env('url')+'Settings/Employee/Index?module=organization&submodule=smtpsettings')
		cy.get('#payroll_detail_tab').click({force: true})
		cy.wait(2000)
		cy.get('#payroll_detail_tab').click()
		cy.wait(2000)
		cy.get('#payroll_detail_tab').click({force: true})
		cy.wait(2000)
		cy.get('#Payroll_SalaryComponents').click({force: true})
		cy.wait(2000)
		cy.get('#Payroll_SalaryComponents').click()
		cy.wait(2000)
		cy.get('#Payroll_SalaryComponents').click({force: true})
		cy.wait(2000)
	})
	
	it('Add Deduction field for CarLoan', function() {
		cy.wait(5000)
		cy.get('#activeAddDeduction').click({force:true})
		cy.wait(2000)
		cy.xpath("//div[@id='payrollContentTitle']//a").click({force:true})
		cy.wait(2000)
		
		cy.get('#FieldName').click({force: true})
		cy.get('#FieldName').clear()
		cy.get('#FieldName').type('CL')
		
		cy.get('#LabelName').click({force: true})
		cy.get('#LabelName').clear()
		cy.get('#LabelName').type('Carloan')
		
		cy.get('#deductIncludeGrossPay').not('[disabled]').check({force: true}).should('be.checked')
		cy.get('#LoanId').not('[disabled]').check({force: true}).should('be.checked')
		
		cy.get('#btnSaveText').click({force:true})
		
	})
	
	
	it('Search Specific Emp code you want to loan entry', function() {
		cy.wait(2000)
		cy.get('#globalSearch').type('CY1')
		cy.wait(3000)
		cy.contains('li', 'Mohan Mane(CY1)').click({force: true})
		cy.wait(4000)
	})
	
	it('Loan Entry', function() {
		cy.server()
		cy.route('POST', Cypress.env('url')+'payroll/Transaction/Loan').as('postComment')
		cy.get('#payroll_detail_tab').click({force: true})
		cy.wait(3000)
		cy.get('#Transaction_Loan').click({force: true})
		cy.wait(1000)
		cy.get('[onclick="addNewLoanEntry()"]').eq(0).click({force: true})
		cy.wait(1000)
		cy.get('select[name=LoanCode]').select('CL',{force: true})
		cy.wait(1000)
		cy.get('#LoanDate').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('01/01/2020')
	   })
		cy.get('select[name=ApplyMonth]').select('January')
		cy.get('input[name=ApplyYear]').click({force: true})
		cy.get('input[name=ApplyYear]').clear()
		cy.get('input[name=ApplyYear]').type('2020')
		cy.get('input[name=LoanAmount]').click({force: true})
		cy.get('input[name=LoanAmount]').clear()
		cy.get('input[name=LoanAmount]').type('15000')
		cy.get('input[name=NoOfMonths]').type(3)
		cy.wait(1000)
		cy.get('#txtRemarks').click({force: true})
		cy.get('#txtRemarks').type('Car loan entry')
		cy.wait(2000)
		cy.get('#txtAmtPerMonth').then($input => {
			expect($input.val()).to.contain('5000')
		})
		cy.wait(1000)
		
		cy.get('[onclick="return validate(this)"]').click({force: true})
		
		cy.wait('@postComment').its('status').should('eq', 200)		
		cy.log('test wait sucessed!')
		//cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
		})
		cy.get(".toast-message").click({force:true})
		
	})
	
	it('Loan Deviation with low amount', function() {
		cy.wait(5000)
		cy.get('[data-toggle="dropdown"]').eq(4).click({force: true})
		cy.wait(1000)
	    cy.get('.card-body > div > .show > .dropdown-menu > .dropdown-item:nth-child(2)').click()
	    cy.wait(1000)
		cy.get('input[name=amount]').eq(2).click({force: true})
		cy.get('input[name=amount]').eq(2).clear()
		cy.get('input[name=amount]').eq(2).type('3000')
		cy.wait(1000)
		cy.get('#btnSave').click({force: true})
		cy.wait(1000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Repayment amount 13000 is not tallying with loan amount')
				
		})
		cy.get(".toast-message").click({force:true})
	})
	
	it('Loan Deviation with high amount', function() {
		cy.wait(1000)
		cy.get('input[name=amount]').eq(2).click({force: true})
		cy.get('input[name=amount]').eq(2).clear()
		cy.get('input[name=amount]').eq(2).type('7000')
		cy.wait(1000)
		cy.get('#btnSave').click({force: true})		
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			expect(text.trim()).equal('Repayment amount 17000 is not tallying with loan amount')	
		})
		//cy.wait(1000)
		//cy.get('[data-dismiss="modal"]').eq(1).click({force: true})
	})	
		
	it('Loan Deviation with same amount', function() {

		cy.get('input[name=amount]').eq(2).click({force: true})
		cy.get('input[name=amount]').eq(2).clear()
		cy.get('input[name=amount]').eq(2).type('3000')
		cy.get('#btnInsert').click({force: true})
		cy.wait(1000)
		cy.get('input[name=amount]').eq(3).click({force: true})
		cy.get('input[name=amount]').eq(3).clear()
		cy.get('input[name=amount]').eq(3).type('2000')
		cy.get('#btnInsert').click({force: true})
		cy.wait(2000)
		if(cy.get('#tblLoanDeviation').contains('td', '5'))
		{
			cy.get('#btnDelete').click({force: true})
			cy.wait(2000)
			cy.get('#btnSave').click({force: true})		
		}
		cy.wait(2000)
		cy.get(".toast-message").click({force:true})
		cy.wait(3000)
		cy.get('[data-dismiss="modal"]').eq(1).click({force: true})
		cy.wait(2000)
	})		
	
	
	
	

	
})