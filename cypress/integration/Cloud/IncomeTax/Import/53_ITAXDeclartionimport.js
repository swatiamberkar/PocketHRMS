describe('ITAX Declartion  Import', function() {
	
	var DeclarationfilePath= 'DeclarationDetailsImport.xlsx';
	
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
	
	it('Save Setting for Declaration Details Import',function() {
		cy.server()	
		cy.wait(1000)
		cy.visit(Cypress.env('url')+'ITax/Utilities/IncomeTaxImport?import')
		cy.route('POST', Cypress.env('url')+'ITax/Utilities/SaveIncomeTaxImport').as('SaveIncomeTaxImport')
		cy.wait(2000)
		cy.get('#excelImport').select('Declaration Details Import',{force: true})
		
		
		cy.wait(2000)
		cy.get('#savesetting').click({force: true})
		
		//setting name validation
		cy.wait(2000)
		 cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Add Setting Name')	{
			cy.wait(1000)
			cy.get(".toast-message").eq(0).click({force: true})
			  cy.get('[onclick="showNewSetting()"]').click({force: true})
			  
			  cy.wait(2000)
			  cy.get('#SettingNameNew').click({force: true})
			  cy.get('#SettingNameNew').clear()
			  cy.get('#SettingNameNew').type('ITAXDeclaration')
			}
		 })
		 
		 
		 cy.wait(1000)
		cy.get('[onclick="addNewSetting()"]').click({force: true})
		
		
		//start && end row  validation
		cy.get('#savesetting').click({force: true})
		cy.wait(2000)
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
			  cy.get('#EndingRow').type('4')
			}
		 })
		 
		 //Empcode row  validation
		cy.get('#savesetting').click({force: true})
		cy.wait(2000)
		 cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Add Employee Code Row')	{
			cy.wait(1000)
			cy.get(".toast-message").eq(0).click({force: true})
			 cy.wait(1000)
				cy.get('#EmployeeCodeRow').select('A',{force: true})
			}
		 })
		
		cy.wait(2000)
		 //Component validation
		cy.get('#savesetting').click({force: true})
		cy.wait(1000)
		 cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Tax Section column mapping is missing !')	{
			cy.wait(1000)
			cy.get(".toast-message").eq(0).click({force: true})
			 cy.wait(1000)
			 cy.get('#House_Rent').select('B',{force: true})
			 cy.get('#Medical_Bill').select('C',{force: true})
			 cy.get('#NoOfChildren').select('D',{force: true})
			}
		 })
		 
		 
		 
		 cy.wait(1000)
		cy.get('#savesetting').click({force: true})
		cy.wait('@SaveIncomeTaxImport').its('status').should('eq', 200)
		 cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Record Saved successfully !')
			cy.get(".toast-message").eq(0).click({force: true})
			
		})
		
	})
	
	it('Upload Declaration Details Import excel file',function() {
		cy.visit(Cypress.env('url')+'ITax/Utilities/IncomeTaxImport?import')
		cy.wait(1000)
		cy.get('#excelImport').select('Declaration Details Import',{force: true})
		cy.wait(2000)
		cy.get('#SettingName').select('ITAXDeclaration',{force: true})
		
		cy.wait(1000)
		cy.fixture(DeclarationfilePath, 'binary')
		.then(Cypress.Blob.binaryStringToBlob)
		.then(fileContent => {
		cy.get('#file').upload({
		fileContent,
		fileName: DeclarationfilePath,
		mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		encoding: 'utf8'
		})
		})
		
		cy.wait(2000)
		cy.get('#ExcelSheetName').select('Declaration',{force: true})
		cy.wait(1000)
		cy.get('#effMonth').select('April',{force: true})
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