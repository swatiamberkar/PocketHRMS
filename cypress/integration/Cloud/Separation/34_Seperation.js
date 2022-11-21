describe('Seperation Module ', function() {
	
	var employeeId = 'CY14';
	var Employeecatagorytype='';
	var monthlyinputcount='';

	Cypress.Commands.add('navigate_EmployeeProfile',()=>{
		cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeId)
		cy.wait(3000)
		cy.contains('li', employeeId).click({force: true})
		cy.wait(3000)
	})
	
	beforeEach(function(){
        cy.getCookies()
	})
	
	it('Pocket HRMS Login', function() {
		cy.login()
		
	})

	it('Change Company', function() {		 
		cy.changeCompany();
	}) 
	 
	 
/*	it('Release Paysheet Lock of January to April',function() {
		cy.visit(Cypress.env('url')+'payroll/transaction/PaysheetLock')
		cy.wait(3000)
		cy.get('#Month1').select('January',{force: true})
		cy.wait(1000)
		cy.get('#Year1').click({force: true})
		cy.get('#Year1').clear()
		cy.get('#Year1').type('2022')
		cy.wait(2000)
		cy.xpath("//button[contains(text(),'Next')]").click({force: true})
		cy.wait(2000)
		cy.get('[type="radio"]').check('all',{force: true})
		cy.wait(2000)
		cy.get('#AdminPass').click({force: true})
		 cy.get('#AdminPass').type('123123')
		cy.wait(2000)
		cy.get('#btnRelease').click({force: true})
		
		//feb
		cy.wait(3000)
		cy.visit(Cypress.env('url')+'payroll/transaction/PaysheetLock')
		cy.wait(3000)
		cy.get('#Month1').select('February',{force: true})
		cy.wait(1000)
		cy.get('#Year1').click({force: true})
		cy.get('#Year1').clear()
		cy.get('#Year1').type('2022')
		cy.wait(2000)
		cy.xpath("//button[contains(text(),'Next')]").click({force: true})
		cy.wait(2000)
		cy.get('[type="radio"]').check('all',{force: true})
		cy.wait(2000)
		cy.get('#AdminPass').click({force: true})
		 cy.get('#AdminPass').type('123123')
		cy.wait(2000)
		cy.get('#btnRelease').click({force: true})
		
		
		//march
		cy.wait(3000)
		cy.visit(Cypress.env('url')+'payroll/transaction/PaysheetLock')
		cy.wait(3000)
		cy.get('#Month1').select('March',{force: true})
		cy.wait(1000)
		cy.get('#Year1').click({force: true})
		cy.get('#Year1').clear()
		cy.get('#Year1').type('2022')
		cy.wait(2000)
		cy.xpath("//button[contains(text(),'Next')]").click({force: true})
		cy.wait(2000)
		cy.get('[type="radio"]').check('all',{force: true})
		cy.wait(2000)
		cy.get('#AdminPass').click({force: true})
		 cy.get('#AdminPass').type('123123')
		cy.wait(2000)
		cy.get('#btnRelease').click({force: true})
		
		//april
		cy.wait(3000)
		cy.visit(Cypress.env('url')+'payroll/transaction/PaysheetLock')
		cy.wait(3000)
		cy.get('#Month1').select('April',{force: true})
		cy.wait(1000)
		cy.get('#Year1').click({force: true})
		cy.get('#Year1').clear()
		cy.get('#Year1').type('2022')
		cy.wait(2000)
		cy.xpath("//button[contains(text(),'Next')]").click({force: true})
		cy.wait(2000)
		cy.get('[type="radio"]').check('all',{force: true})
		cy.wait(2000)
		cy.get('#AdminPass').click({force: true})
		 cy.get('#AdminPass').type('123123')
		cy.wait(2000)
		cy.get('#btnRelease').click({force: true})
	})
	
	it('Delete payroll parocess jan to april',function(){
		 cy.navigate_EmployeeProfile();
		  cy.wait(3000)
		cy.get('#payroll_detail_tab').click({force: true})
		cy.wait(3000)
		cy.get('#Utilities_PayrollProcess').click({force: true})
		cy.wait(2000)
		cy.get('#month').select('January',{force: true})
		cy.wait(1000)
		cy.get('#year').click({force: true})
		cy.get('#year').clear()
		cy.get('#year').type('2022')
		cy.wait(2000)
		cy.get("#btnProcessDelete").click({force: true})
		cy.wait(6000)
		
		cy.get('#month').select('February',{force: true})
		cy.wait(1000)
		cy.get('#year').click({force: true})
		cy.get('#year').clear()
		cy.get('#year').type('2022')
		cy.wait(2000)
		cy.get("#btnProcessDelete").click({force: true})
		
		
		//march
		cy.wait(6000)
		cy.get('#month').select('March',{force: true})
		cy.wait(1000)
		cy.get('#year').click({force: true})
		cy.get('#year').clear()
		cy.get('#year').type('2022')
		cy.wait(2000)
		cy.get("#btnProcessDelete").click({force: true})
		
		//april
		
		cy.wait(6000)
		
		cy.get('#month').select('April',{force: true})
		cy.wait(1000)
		cy.get('#year').click({force: true})
		cy.get('#year').clear()
		cy.get('#year').type('2022')
		cy.wait(2000)
		cy.get("#btnProcessDelete").click({force: true})
	}) 
	
	it('Delete monthly input && Save monthly input for August',function(){
		cy.wait(2000)
		cy.get('#Transaction_MonthlyInput').click({force: true})
		cy.wait(2000)
		cy.get('#inputMonth').select('January',{force: true})
		cy.wait(1000)
		cy.get('#year').click({force: true})
		cy.get('#year').clear()
		cy.get('#year').type('2022')
		cy.wait(1000)
		cy.get("#btnDelete").click({force: true})
		
		cy.wait(5000)
		//feb
		cy.get('#inputMonth').select('February',{force: true})
		cy.wait(1000)
		cy.get('#year').click({force: true})
		cy.get('#year').clear()
		cy.get('#year').type('2022')
		cy.wait(1000)
		cy.get("#btnDelete").click({force: true})
		
		cy.wait(5000)
		//march
		cy.get('#inputMonth').select('March',{force: true})
		cy.wait(1000)
		cy.get('#year').click({force: true})
		cy.get('#year').clear()
		cy.get('#year').type('2022')
		cy.wait(1000)
		cy.get("#btnDelete").click({force: true})
		
		cy.wait(5000)
		//april
		cy.get('#inputMonth').select('April',{force: true})
		cy.wait(1000)
		cy.get('#year').click({force: true})
		cy.get('#year').clear()
		cy.get('#year').type('2022')
		cy.wait(1000)
		cy.get("#btnDelete").click({force: true})
		
		
		cy.wait(6000)
		cy.get('#inputMonth').select('August',{force: true})
		cy.wait(1000)
		cy.get('#year').click({force: true})
		cy.get('#year').clear()
		cy.get('#year').type('2021')
		cy.wait(2000)
		cy.get('#viewdata').click({force: true})
		cy.wait(2000)
		cy.xpath("//button[@class='btn btn-xs btn-success']").click({force: true})
		cy.wait(2000)
		cy.get('#inputMonth').select('August',{force: true})
		cy.wait(1000)
		cy.get('#editdata').click({force: true})
		cy.wait(2000)
		cy.xpath("//button[@class='btn btn-xs btn-success']").click({force: true})
		cy.wait(2000)
		
		//september
		cy.wait(6000)
		cy.get('#inputMonth').select('September',{force: true})
		cy.wait(1000)
		cy.get('#year').click({force: true})
		cy.get('#year').clear()
		cy.get('#year').type('2021')
		cy.wait(2000)
		cy.get('#viewdata').click({force: true})
		cy.wait(2000)
		cy.xpath("//button[@class='btn btn-xs btn-success']").click({force: true})
		cy.wait(2000)
		cy.get('#inputMonth').select('September',{force: true})
		cy.wait(1000)
		cy.get('#editdata').click({force: true})
		cy.wait(2000)
		cy.xpath("//button[@class='btn btn-xs btn-success']").click({force: true})
		cy.wait(2000)
	})
*/	
	 it('Separation setting',function(){
		 
		 cy.visit(Cypress.env('url')+'Settings/Employee/Index?module=payroll&submodule=SeparationSetting')
		 cy.wait(2000)
		 cy.get('#EditMasterDetail').select('No',{force: true})
		 
		 cy.get('#NoOfMonths').click({force: true})
			cy.get('#NoOfMonths').clear()
		cy.get('#NoOfMonths').type('2')	
		 cy.get('#AllowPayroll').select('No',{force: true})
		 cy.wait(1000)
		 
		 //click on save button
		cy.xpath("//button[@value='Save']").click({force: true})
		 
		 
	 })
	
	it('Employee Separation without selecting employee',function(){
		cy.visit(Cypress.env('url')+'payroll/transaction/separation')
		cy.wait(2000)
		cy.get('button[onclick="return Validation();"]').click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
			if(expect(text.trim()).equal('Please select Employee')){
				cy.get(".toast-message").click({force: true})
				cy.wait(2000)
				cy.get('#select2-multiEmp-container').click({force: true})
				cy.wait(2000)
				cy.get('input[type="search"]').click({force: true})
				cy.get('input[type="search"]').type(employeeId)
				cy.wait(4000)
				cy.get('.select2-results__option--highlighted').click({force: true})	
			}        
		})
		cy.get('#DateofJoining').then($input => {
			expect($input.val()).to.contain('01/01/2019')
		})	
		//cy.get(".toast-message").click({force: true})
	})
	
	it('Employee Separation without selecting Type',function(){
		
		cy.get('button[onclick="return Validation();"]').click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
			if(expect(text.trim()).equal('Please select Separation Type.')){
				cy.get(".toast-message").click({force: true})
				cy.wait(1000)
				cy.get('#SeparationType').select('Separation',{force: true})	
			}        
		})
	})

	it('Employee Separation without Last Working Date',function(){	
		cy.get('button[onclick="return Validation();"]').click({force: true})
		
		cy.get(".toast-message").invoke('text').then((text) => {
			if(expect(text.trim()).equal('Please select Last Working Date.')){
				cy.get(".toast-message").click({force: true})
				
				cy.get('#LastWorkingDate').click().then(input => {
					input[0].dispatchEvent(new Event('input', { bubbles: true }))
					input.val('01/04/'+Cypress.env('FinancialYear_To'))
				})
			}        
		})
		
	})
	
	
/*	it('Employee Separation with Monthly input and Delete monthlyinput(September)',function(){
		cy.wait(2000)
		cy.server()
		cy.visit(Cypress.env('url')+'payroll/transaction/separation')
		
		cy.wait(1000)
		cy.get('#select2-multiEmp-container').click({force: true})
		cy.wait(2000)
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type(employeeId)
		cy.wait(4000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		
		cy.wait(1000)
		
		cy.get('#DateofJoining').then($input => {
			expect($input.val()).to.contain('01/01/2019')
		})	
		cy.get('#SeparationType').select('Separation',{force: true})
		
		cy.get('#LastWorkingDate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('20/08/'+Cypress.env('FinancialYear_From'))
		})
		
		cy.get('#ResignationDate').click({force: true}).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('13/01/'+Cypress.env('FinancialYear_From'))
		})
		
		cy.get('#SeparationReason').select('Others',{force: true})
		cy.get('#Reason').click({force:true})
		cy.get('#Reason').type('Test Separation!!!')
		
		cy.wait(1000)
		cy.get('button[onclick="return Validation();"]').click({force: true})
		cy.wait(2000) 
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Monthly Input is entered for September-2021')
		})
		
	})	
	*/
	
	

	it('Employee Separation with All input',function(){
		cy.wait(2000)
		cy.server()
		cy.visit(Cypress.env('url')+'payroll/transaction/separation')
		cy.route('POST', Cypress.env('url')+'Payroll/Transaction/SaveSeparation').as('SaveSeparation')
		cy.wait(1000)
		cy.get('#select2-multiEmp-container').click({force: true})
		cy.wait(2000)
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type(employeeId)
		cy.wait(6000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		
		cy.wait(1000)
		
		cy.get('#DateofJoining').then($input => {
			expect($input.val()).to.contain('01/01/2019')
		})	
		cy.get('#SeparationType').select('Separation',{force: true})
		
		cy.get('#LastWorkingDate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('20/03/'+Cypress.env('FinancialYear_To'))
		})
		
		cy.get('#ResignationDate').click({force: true}).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('13/01/'+Cypress.env('FinancialYear_To'))
		})
		
		cy.get('#SeparationReason').select('Others',{force: true})
		cy.get('#Reason').click({force:true})
		cy.get('#Reason').type('Test Separation!!!')
		
		cy.wait(1000)
		cy.get('button[onclick="return Validation();"]').click({force: true})
		cy.wait('@SaveSeparation').its('status').should('eq', 200) 
		cy.get(".toast-message").invoke('text').then((text) => {
				expect(text.trim()).equal('Seperation entry saved successfully!')
		})
		
	})	
	
	
	it('Check Emp Separation to click on Inactive Employees ',function(){
		
		cy.visit(Cypress.env('url')+'Employee/Employee/EmployeeList')
		cy.wait(3000)
		
		//cy.get('#withcard').click({force: true})
		
		cy.contains('div', 'Statistics').click({force: true})
		cy.wait(2000)
		cy.contains('div', 'Inactive Employees').click({force: true})
		
		cy.wait(8000)
		//cy.get('div[class="media mb-3 mb-lg-0 col-md-3"]>div[class="media-body align-self-center"]>p').invoke('text').then((text) => {
			//cy.log(text.trim())
		//});
			
			
		//cy.get('div[class="media mb-3 mb-lg-0 col-md-3"]>div[class="media-body align-self-center"]>p').contains('p', 'CY14').should('be.visible');
		
		
	})
	
	it('Check Seperated employee profile is disabled ',function(){
		cy.wait(2000)
		cy.get('#globalSearch').type('CY14')
		cy.wait(3000)
		cy.contains('li', 'Seprationrelease test(CY14)').click({force: true})
		cy.wait(4000)
		cy.get('#basicTab').click({force:true})
		cy.wait(2000)
		cy.get('#leave_detail_tab').click({force:true})
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
				expect(text.trim()).equal('This is separated Employee.!')
		})
		
	})
	it('Emp Separation Release with pervious Date',function(){
		cy.server()
		cy.wait(2000)
		cy.visit(Cypress.env('url')+'Payroll/Transaction/separationRelease')
		cy.route('POST', Cypress.env('url')+'Payroll/Transaction/SaveSeparationRelease').as('SaveSeparationRelease')
		cy.wait(1000)
		cy.get('#select2-multiEmp-container').click({force: true})
		cy.wait(2000)
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type(employeeId)
		cy.wait(4000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		
		//valiadtion on release date
		cy.wait(3000)
		
		cy.get('#ReleaseDate').click({force: true}).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('14/04/2021')
		})
		
		cy.get('[onclick="submitForm()"]').click({force: true})
		
		cy.wait(1000)
		cy.get(".toast-message").invoke('text').then((text) => {
			if(expect(text.trim()).equal('Release Date cannot be less than Separation Date!')){
				cy.get(".toast-message").click({force: true})
				
			cy.get('#ReleaseDate').click({force: true}).then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val('23/04/'+Cypress.env('FinancialYear_To'))
			})
			}        
		})
		
		
		cy.get('[onclick="submitForm()"]').click({force: true})
		cy.wait('@SaveSeparationRelease').its('status').should('eq', 200)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Seperation entry released successfully!')
		})
		
	})
	
	
	
})
	
		
	