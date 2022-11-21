describe('Payslip Setting', function() {
	 var imagfilePath= 'sagelogo.png';

	
   it('Pocket HRMS Login', function() {
		cy.login()
	})

	
	beforeEach(function(){
        cy.getCookies()
	})
	
	it('Change Company', function() {		 
		cy.changeCompany(); 
	})
	
	it('Read && Save Payslip Setting',function() {		
		cy.visit(Cypress.env('url')+'Settings/Employee/Index?module=payroll&submodule=Payslip')
		cy.wait(4000)
		cy.get('#btnSave').click({force: true})
		cy.wait(1000)
		 cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Please enter Configuration number')	{
			cy.wait(1000)
			cy.get(".toast-message").eq(0).click({force: true})
			 cy.wait(2000)
			   cy.get('#txtConNumber').click({force: true})
				cy.get('#txtConNumber').clear()
				cy.get('#txtConNumber').type('1')
			}
		 })
		 
		 
		 //Read Category wise
		 cy.wait(2000)
		 cy.get('.chkCategory').eq(0).not('[disabled]').should('be.checked')
		// cy.get('.chkCategory').eq(1).not('[disabled]').should('be.checked')
		// cy.get('.chkCategory').eq(1).not('[disabled]').should('be.checked')
		 
		 //Read Master Data
		  cy.wait(2000)
		 cy.xpath("//a[contains(text(),'Master')]").click({force: true})
		 cy.wait(2000)
		 cy.get('#trFieldMaster_CODE > :nth-child(5) > .form-control').then($input => {
			expect($input.val()).to.contain('1')
		})
	/*	 cy.xpath("//tr[@id='trField_CODE']//input[@class='form-control form-control-sm clsHeaderPrint']").then($input => {
			expect($input.val()).to.contain('1')
		})
		 cy.xpath("//tr[@id='trField_CODE']//input[@class='form-control form-control-sm clsFFPrint']").then($input => {
			expect($input.val()).to.contain('1')
		})
		 cy.xpath("//tr[@id='trField_FNAME']//input[@class='form-control form-control-sm clsHeaderPrint']").then($input => {
			expect($input.val()).to.contain('2')
		})
		 cy.xpath("//tr[@id='trField_FNAME']//input[@class='form-control form-control-sm clsFFPrint']").then($input => {
			expect($input.val()).to.contain('2')
		})
		
		 //Read Earnings 
		 cy.xpath("//a[contains(text(),'Earnings')]").click({force: true})
		 cy.wait(2000)
		 cy.xpath("//tr[@id='trField_AB']//input[@class='form-control clsPrint form-control-sm']").then($input => {
			expect($input.val()).to.contain('1')
		})
		 cy.xpath("//tr[@id='trField_AFIELD']//input[@class='form-control clsPrint form-control-sm']").then($input => {
			expect($input.val()).to.contain('2')
		})
		 cy.xpath("//tr[@id='trField_AHRA']//input[@class='form-control clsPrint form-control-sm']").then($input => {
			expect($input.val()).to.contain('3')
		})
		 cy.xpath("//tr[@id='trField_APROJ']//input[@class='form-control clsPrint form-control-sm']").then($input => {
			expect($input.val()).to.contain('4')
		})
		 cy.xpath("//tr[@id='trField_CLENCASH']//input[@class='form-control clsPrint form-control-sm']").then($input => {
			expect($input.val()).to.contain('5')
		})
		 cy.xpath("//tr[@id='trField_CONDITIONAL']//input[@class='form-control clsPrint form-control-sm']").then($input => {
			expect($input.val()).to.contain('6')
		})
		 cy.xpath("//tr[@id='trField_EB']//input[@class='form-control clsPrint form-control-sm']").then($input => {
			expect($input.val()).to.contain('7')
		})
		 cy.xpath("//tr[@id='trField_EHRA']//input[@class='form-control clsPrint form-control-sm']").then($input => {
			expect($input.val()).to.contain('8')
		})
		 cy.xpath("//tr[@id='trField_EFIELD']//input[@class='form-control clsPrint form-control-sm']").then($input => {
			expect($input.val()).to.contain('9')
		})
		 cy.xpath("//tr[@id='trField_GRATUITY']//input[@class='form-control clsPrint form-control-sm']").then($input => {
			expect($input.val()).to.contain('10')
		})
		 cy.xpath("//tr[@id='trField_LEV_ENCASHAMT']//input[@class='form-control clsPrint form-control-sm']").then($input => {
			expect($input.val()).to.contain('11')
		})
		 cy.xpath("//tr[@id='trField_LOP']//input[@class='form-control clsPrint form-control-sm']").then($input => {
			expect($input.val()).to.contain('12')
		}) 
		cy.xpath("//tr[@id='trField_PETRT']//input[@class='form-control clsPrint form-control-sm']").then($input => {
			expect($input.val()).to.contain('13')
		})
		 cy.xpath("//tr[@id='trField_EPROJ']//input[@class='form-control clsPrint form-control-sm']").then($input => {
			expect($input.val()).to.contain('14')
		})
		 cy.xpath("//tr[@id='trField_SB']//input[@class='form-control clsPrint form-control-sm']").then($input => {
			expect($input.val()).to.contain('15')
		}) 
		
		
		 //Read Deduction 
		  cy.wait(2000)
		 cy.xpath("//a[contains(text(),'Deductions')]").click({force: true})
		 cy.wait(2000)
		  cy.xpath("//tr[@id='trField_CL']//input[@class='form-control clsPrint form-control-sm']").then($input => {
			expect($input.val()).to.contain('1')
		}) 
		
		 cy.xpath("//tr[@id='trField_ESI']//input[@class='form-control clsPrint form-control-sm']").then($input => {
			expect($input.val()).to.contain('2')
		}) 
		
		 cy.xpath("//tr[@id='trField_TDS']//input[@class='form-control clsPrint form-control-sm']").then($input => {
			expect($input.val()).to.contain('3')
		}) 
		 cy.xpath("//tr[@id='trField_PFAMOUNT']//input[@class='form-control clsPrint form-control-sm']").then($input => {
			expect($input.val()).to.contain('4')
		}) 
		 cy.xpath("//tr[@id='trField_PTAX']//input[@class='form-control clsPrint form-control-sm']").then($input => {
			expect($input.val()).to.contain('5')
		}) 
		 cy.xpath("//tr[@id='trField_VPFAMOUNT']//input[@class='form-control clsPrint form-control-sm']").then($input => {
			expect($input.val()).to.contain('6')
		}) 
		
		 
		 */
		 cy.wait(2000)
		 cy.xpath("//a[contains(text(),'F & F Logo')]").click({force: true})
		 cy.wait(2000)
		 cy.fixture(imagfilePath, 'binary')
		.then(Cypress.Blob.binaryStringToBlob)
		.then(fileContent => {
		cy.get('#LogoFileId').upload({
		fileContent,
		fileName: imagfilePath,
		mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		encoding: 'utf8'
		})
		})
		cy.wait(2000)
		cy.get('#btnSave').click({force: true})
	})
	
	
	it('Payslip configuration number already exist',function() {		
		cy.visit(Cypress.env('url')+'Settings/Employee/Index?module=payroll&submodule=Payslip')
		cy.wait(4000)
		
	   cy.get('#txtConNumber').click({force: true})
		cy.get('#txtConNumber').clear()
		cy.get('#txtConNumber').type('1')
		cy.wait(2000)
		 cy.get('#btnSave').click({force: true})
		 cy.wait(2000)
		  cy.get(".toast-message").invoke('text').then((dedutext) => {
				expect(dedutext.trim()).equal('Payslip configuration number already exist')
				
			})  
	})	 
		 
})