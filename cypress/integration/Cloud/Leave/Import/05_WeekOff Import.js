describe('WeekOFF Import', function() {
	
	var Weekofffile='Leave/WeekoffImport.xlsx';
	
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
	
	
	it('Save Setting for WeekOFF',function() {
		cy.server()	
		cy.visit(Cypress.env('url')+'Leave/Setting/LeaveImport')
		cy.route('POST', Cypress.env('url')+'Leave/Setting/SaveLeaveImport').as('SaveLeaveImport')
		cy.wait(2000)
		cy.get('#excelImport').select('Week Off Import',{force: true})
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
			  cy.get('#SettingNameNew').type('WeekOffCredit')
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
		 //Leave opening column   validation
		cy.get('#savesetting').click({force: true})
		cy.wait(1000)
		 cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Please Set All Excel Matching Column')	{
			cy.wait(1000)
			cy.get(".toast-message").eq(0).click({force: true})
			 cy.wait(1000)
			 cy.get('#WeekOffDate').select('A',{force: true})
			 cy.wait(2000)
			 cy.get('#WeekOffDay').select('B',{force: true})
			 cy.get('#HalfDayType').select('C',{force: true})
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
	 	
	
	it('Upload WeekOFF',function() {
		cy.visit(Cypress.env('url')+'Leave/Setting/LeaveImport')
		cy.wait(1000)
		cy.get('#excelImport').select('Week Off Import',{force: true})
		cy.wait(2000)
		cy.get('#SettingName').select('WeekOffCredit',{force: true})
		
		cy.wait(1000)
		cy.fixture(Weekofffile, 'binary')
		.then(Cypress.Blob.binaryStringToBlob)
		.then(fileContent => {
		cy.get('#file').upload({
		fileContent,
		fileName: Weekofffile,
		mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		encoding: 'utf8'
		})
		})
		
		cy.wait(2000)
		cy.get('#ExcelSheetName').select('WeekOff',{force: true})
		
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
	
	

})