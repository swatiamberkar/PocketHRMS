describe('Leave Credit Import', function() {
    
	var filePath= 'Leave/LeaveCredit.xlsx';
	var employeeID ='CY2';

			 
	beforeEach(function(){
		cy.getCookies()
		})
		
	it('Login to Cloud & select Company', function() {
		cy.login()
		cy.changeCompany();		
	})
	
	Cypress.Commands.add('navigate_EmployeeProfile',()=>{
		cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		//cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeID)
		cy.wait(4000)
		cy.contains('li', employeeID).click({force: true})
		cy.wait(3000)
	})
	
	Cypress.Commands.add('navigate_EmployeeLeave',()=>{
     cy.wait(1000)
		cy.navigate_EmployeeProfile()
		
		cy.get('#leave_detail_tab').click({force:true});
		cy.wait(2000)
		
		cy.get('#Leave_LeaveEntry').click({force:true})
		cy.wait(3000)
	})
	
	Cypress.Commands.add('LeaveopenigforPL',()=>{
			cy.wait(2000)
			cy.navigate_EmployeeLeave()
			cy.wait(2000)
			//cy.get('.col-lg-3:nth-child(2) > .card > .card-body > .float-right > a > .fas').click({force:true})
			//cy.get('.float-right > a > .fas').click()
			//cy.get('[title="Add Leave Details"]').eq(0).click({force: true})
			cy.get(':nth-child(1) > .card > .card-body > .float-right > a > .fas').click()
			cy.wait(1000)
			cy.get('#LeaveOpen').click({force: true})
			//cy.get('#LeaveOpen').clear()		
			cy.get('#LeaveOpen').type('1')
			cy.get('#CrApp').check({force: true})
			cy.wait(2000)
			cy.get('#saveloader').click({force: true})
		})
	
	
	it('Leave opening for PL',function() {
		cy.LeaveopenigforPL();
		cy.wait(1000)
	})
	
	it('Save Setting',function() {
		cy.server()	
		cy.visit(Cypress.env('url')+'Leave/Setting/LeaveImport')
		cy.route('POST', Cypress.env('url')+'Leave/Setting/SaveLeaveImport').as('SaveLeaveImport')
		cy.wait(2000)
		cy.get('#excelImport').select('Leave Credit Import',{force: true})
		cy.get('#savesetting').click({force: true})
		
		//setting name validation
		cy.wait(1000)
		 cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Add Setting Name')	{
			cy.wait(1000)
			cy.get(".toast-message").eq(0).click({force: true})
			  cy.get('[onclick="showNewSetting()"]').click({force: true})
			  
			  cy.wait(2000)
			  cy.get('#SettingNameNew').click({force: true})
			  cy.get('#SettingNameNew').clear()
			  cy.get('#SettingNameNew').type('Leave Credit import test')
			}
		 })
		
		cy.wait(1000)
		
		cy.get('[onclick="addNewSetting()"]').click({force: true})
		cy.wait(2000)
		//start && end row  validation
		cy.get('#savesetting').click({force: true})
		cy.wait(1000)
		 cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Add Starting Row')	{
			cy.wait(1000)
			cy.get(".toast-message").eq(0).click({force: true})
			 cy.wait(1000)
			 
			  cy.get('#StartingRow').click({force: true})
			  cy.get('#StartingRow').clear()
			  cy.get('#StartingRow').type('2')
			  
			  cy.get('#EndingRow').click({force: true})
			  cy.get('#EndingRow').clear()
			  cy.get('#EndingRow').type('2')
			}
		 })
		 
		 
		 cy.wait(2000)
		 //Empcode row  validation
		cy.get('#savesetting').click({force: true})
		cy.wait(1000)
		 cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Add Employee Code Row')	{
			cy.wait(1000)
			cy.get(".toast-message").eq(0).click({force: true})
			 cy.wait(1000)
			 cy.get('#EmployeeCodeRow').select('A',{force: true})
			 
			}
		 })
		
		
		 cy.wait(2000)
		 //Leave opening column   validation
		cy.get('#savesetting').click({force: true})
		cy.wait(1000)
		 cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Please Set All Excel Matching Column')	{
			cy.wait(1000)
			cy.get(".toast-message").eq(0).click({force: true})
			 cy.wait(1000)
			 cy.get('#LeaveCreditValue').select('B',{force: true})
			 
			}
		 })
		
		cy.wait(1000)
		cy.get('#savesetting').click({force: true})
		cy.wait('@SaveLeaveImport').its('status').should('eq', 200)
		 cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Record Saved successfully.!')
			cy.get(".toast-message").eq(0).click({force: true})
			
		})
	}) 	
	
	it('Upload Leave opening excel file(3 Days)',function() {
		cy.visit(Cypress.env('url')+'Leave/Setting/LeaveImport')
		cy.wait(1000)
		cy.get('#excelImport').select('Leave Credit Import',{force: true})
		cy.wait(2000)
		cy.get('#SettingName').select('Leave Credit import test',{force: true})
		
		cy.wait(1000)
		cy.fixture(filePath, 'binary')
		.then(Cypress.Blob.binaryStringToBlob)
		.then(fileContent => {
		cy.get('#file').upload({
		fileContent,
		fileName: filePath,
		mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		encoding: 'utf8'
		})
		})
		
		cy.wait(2000)
		cy.get('#ExcelSheetName').select('LeaveOpeningthree',{force: true})
		cy.get('#leavType').select('PL',{force: true})
		cy.wait(1000)
		cy.get('#uploadsetting').click({force: true})
		cy.wait(3000)
		cy.get(".alert-success").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).contains('Excel uploaded successfully, it will get processed in background.')
			//cy.get(".toast-message").click()
		})
		
		cy.wait(50000)
	})
	
	it('Apply Leave of PL for four Days',function() {
		cy.navigate_EmployeeLeave()
		
		cy.wait(1000)
		cy.get('[title="Add Leave Details"]').eq(0).click({force: true})
		cy.wait(2000)
		 cy.get('#leaveType').select('PL',{force: true})
		 cy.get('#remarks').type('Leave Credit import Test')
		 cy.wait(1000)
		 
		 cy.get('#fromdate').click().then(input => {
		   input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('26/04/'+Cypress.env('FinancialYear_From'))
	   })
	   
	    cy.get('#todate').click().then(input => {
		   input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('29/04/'+Cypress.env('FinancialYear_From'))
	   })
		
		 cy.wait(1000)
	   cy.get('#drpFromDayType').select('FULL DAY',{force: true})
	   cy.get('#drpToDayType').select('FULL DAY',{force: true})
	   
	    cy.wait(2000)
	   cy.get('#btnAddLeave').click({force: true})
	   cy.wait(2000)
	   cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Leave Updated Successfully')
			cy.log(text.trim())
		}) 
		
		cy.wait(1000)
		cy.get('#btnclose').click({force: true})
		cy.wait(1000)
	})	
	
	it('Upload Leave opening excel file(1 Days)',function() {
		cy.visit(Cypress.env('url')+'Leave/Setting/LeaveImport')
		cy.wait(1000)
		cy.get('#excelImport').select('Leave Credit Import',{force: true})
		cy.wait(2000)
		cy.get('#SettingName').select('Leave Credit import test',{force: true})
		
		cy.wait(1000)
		cy.fixture(filePath, 'binary')
		.then(Cypress.Blob.binaryStringToBlob)
		.then(fileContent => {
		cy.get('#file').upload({
		fileContent,
		fileName: filePath,
		mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		encoding: 'utf8'
		})
		})
		
		cy.wait(2000)
		cy.get('#ExcelSheetName').select('LeaveOpeningone',{force: true})
		cy.get('#leavType').select('PL',{force: true})
		cy.wait(1000)
		cy.get('#uploadsetting').click({force: true})
		cy.wait(3000)
		cy.get(".alert-success").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).contains('Excel uploaded successfully, it will get processed in background.')
			//cy.get(".toast-message").click()
		})
		
		cy.wait(40000)
	})
})	