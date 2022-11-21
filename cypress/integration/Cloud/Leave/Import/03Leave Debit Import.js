describe('Leave Debit Import', function() {
	var empcode = 'CY27'
	var Leavedebitfile='Leave/LeaveDebitImport.xlsx';
	
    it('successfully page  loads', function() {
		cy.clearLocalStorage() ;
		cy.window().then((win) => {
			win.sessionStorage.clear()
		})
		cy.clearCookies();
		cy.visit(Cypress.env('url')) 
	})
	
	it('Pocket HRMS Login', function() {
		cy.login()
	})
	
beforeEach(function(){
        cy.getCookies()
	})
	
	it('Change Company', function() {		 
		cy.changeCompany(); 
	}) 
	
	
	it('Save Setting for Leave Debit',function() {
		cy.server()	
		cy.visit(Cypress.env('url')+'Leave/Setting/LeaveImport')
		cy.route('POST', Cypress.env('url')+'Leave/Setting/SaveLeaveImport').as('SaveLeaveImport')
		cy.wait(2000)
		cy.get('#excelImport').select('Leave Debit Import',{force: true})
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
			  cy.get('#SettingNameNew').type('LeaveDebitImport')
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
			  cy.get('#EndingRow').type('6')
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
			 cy.get('#LeaveName').select('B',{force: true})
			 cy.wait(2000)
			 cy.get('#FromDate').select('C',{force: true})
			 cy.get('#ToDate').select('D',{force: true})
			 cy.get('#Remarks').select('E',{force: true})
             cy.get('#FromDayType').select('F',{force: true})
             cy.get('#ToDayType').select('G',{force: true})
			 
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
	 	
	
	it('Upload Leave Debit file',function() {
		cy.visit(Cypress.env('url')+'Leave/Setting/LeaveImport')
		cy.wait(2000)
		cy.get('#excelImport').select('Leave Debit Import',{force: true})
		cy.wait(2000)
		cy.get('#SettingName').select('LeaveDebitImport',{force: true})
		
		cy.wait(1000)
		cy.fixture(Leavedebitfile, 'binary')
		.then(Cypress.Blob.binaryStringToBlob)
		.then(fileContent => {
		cy.get('#file').upload({
		fileContent,
		fileName: Leavedebitfile,
		mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		encoding: 'utf8'
		})
		})
		
		cy.wait(2000)
		cy.get('#ExcelSheetName').select('LeaveDebit',{force: true})
		
		cy.wait(1000)
		cy.get('#Month').select('February',{force: true})
		
		cy.wait(1000)
		cy.get('#uploadsetting').click({force: true})
		cy.wait(3000)
		cy.get(".alert-success").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).contains('Excel uploaded successfully, it will get processed in background.')
			//cy.get(".toast-message").click()
		})
		
		cy.wait(15000)
	})
	
	it('verify uploaded data',function() {
		cy.navigate_EmployeeProfile(empcode)	

		cy.get('#leave_detail_tab').click()
		cy.wait(1000)
		cy.get('[title="Add Leave Details"]').eq(0).click()
		cy.wait(1000)
		cy.xpath("//a[contains(text(),'Debit Leave')]").click()
		cy.wait(1000)

		//Verify 
		cy.xpath("//td[contains(text(),'14')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain('14')
		})
		//Verify 
		cy.get('[data-title="Debit Leave Date"]').invoke('text').then((text) => {
			expect(text.trim()).to.contain('15/02/2021')
		})
		//Verify 
		cy.get('[data-title="Employee Code"]').invoke('text').then((text) => {
			expect(text.trim()).to.contain('CY27')
		})




	})
	

})