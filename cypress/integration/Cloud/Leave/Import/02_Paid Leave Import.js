describe('Leave Import', function() {
	
	var Paidleavefile='Leave/PaidLeaveImport.xlsx';
	
	var PaidleaveNegfile='Leave/PaidLeaveNegImport.xlsx';
	
    beforeEach(function(){
		cy.getCookies()
		})
		
	it('Login to Cloud & select Company', function() {
		cy.login()
		cy.changeCompany();		
	})
	
	it('Save Setting for PaidLeaveImport',function() {
		cy.server()	
		cy.visit(Cypress.env('url')+'Leave/Setting/LeaveImport')
		cy.route('POST', Cypress.env('url')+'Leave/Setting/SaveLeaveImport').as('SaveLeaveImport')
		cy.wait(2000)
		cy.get('#excelImport').select('Leave Opening Import',{force: true})
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
			  cy.get('#SettingNameNew').type('PaidLeaveImport')
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
			 cy.get('#LeaveOpeningValue').select('B',{force: true})
			 
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
	
	//https://github.com/GreyIP/pockethrms/issues/1508
	//Negative leave balance- Flaktgroup
	it('Upload Neg Leave opening for Paid Leaves',function() {
		cy.visit(Cypress.env('url')+'Leave/Setting/LeaveImport')
		cy.wait(1000)
		cy.get('#excelImport').select('Leave Opening Import',{force: true})
		cy.wait(2000)
		cy.get('#SettingName').select('PaidLeaveImport',{force: true})
		
		cy.wait(1000)
		cy.fixture(PaidleaveNegfile, 'binary')
		.then(Cypress.Blob.binaryStringToBlob)
		.then(fileContent => {
		cy.get('#file').upload({
		fileContent,
		fileName: PaidleaveNegfile,
		mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		encoding: 'utf8'
		})
		})
		
		cy.wait(2000)
		cy.get('#ExcelSheetName').select('LeaveOpening',{force: true})
		cy.get('#leavType').select('PL',{force: true})
		cy.wait(1000)
		cy.get('#btnSave').click({force: true})
		cy.wait(15000)
		
	})
	
	it('Upload Leave opening for Paid Leaves',function() {
		cy.visit(Cypress.env('url')+'Leave/Setting/LeaveImport')
		cy.wait(1000)
		cy.get('#excelImport').select('Leave Opening Import',{force: true})
		cy.wait(2000)
		cy.get('#SettingName').select('PaidLeaveImport',{force: true})
		
		cy.wait(1000)
		cy.fixture(Paidleavefile, 'binary')
		.then(Cypress.Blob.binaryStringToBlob)
		.then(fileContent => {
		cy.get('#file').upload({
		fileContent,
		fileName: Paidleavefile,
		mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		encoding: 'utf8'
		})
		})
		
		cy.wait(2000)
		cy.get('#ExcelSheetName').select('LeaveOpening',{force: true})
		cy.get('#leavType').select('PL',{force: true})
		cy.wait(1000)
		cy.get('#btnSave').click({force: true})
		cy.wait(4000)
		cy.get(".alert-success").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).contains('Excel uploaded successfully, it will get processed in background.')
			//cy.get(".toast-message").click()
		})
		
		cy.wait(15000)
	})
	
	it('Check Leave Opening After import',function() {
		cy.wait(7000)
		cy.visit(Cypress.env('url')+'Leave/Setting/LeaveOpening')
		cy.wait(3000)
		cy.get('#Category').select('Staff',{force: true})
		
		cy.get('.select2-selection--multiple').click({force: true})
		cy.wait(2000)
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type('CY27')
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		cy.wait(2000)
		
		
		cy.get('.select2-selection--multiple').click({force: true})
		cy.wait(2000)
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type('CY28')
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		cy.wait(2000)
		
		cy.get('.select2-selection--multiple').click({force: true})
		cy.wait(2000)
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type('CY29')
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		cy.wait(2000)
		
		cy.get('.select2-selection--multiple').click({force: true})
		cy.wait(2000)
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type('CY30')
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		cy.wait(2000)
		
		cy.get('.select2-selection--multiple').click({force: true})
		cy.wait(2000)
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type('CY31')
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		cy.wait(2000)
		
		
		cy.get('#leavType').select('PL',{force: true})
		cy.wait(2000)
		cy.get('#btnView').click({force: true})
		cy.wait(6000)
		cy.get('#tableSorter > tbody > tr > td > #lstEmployeeDetail_0__LeaveOpening').then($input => {
			expect($input.val()).to.contain('20')
		})
		
		cy.get('#tableSorter > tbody > tr > td > #lstEmployeeDetail_1__LeaveOpening').then($input => {
			expect($input.val()).to.contain('20')
		})
		
		cy.get('#tableSorter > tbody > tr > td > #lstEmployeeDetail_2__LeaveOpening').then($input => {
			expect($input.val()).to.contain('20')
		})
		
		cy.get('#tableSorter > tbody > tr > td > #lstEmployeeDetail_3__LeaveOpening').then($input => {
			expect($input.val()).to.contain('20')
		})
		
		cy.get('#tableSorter > tbody > tr > td > #lstEmployeeDetail_4__LeaveOpening').then($input => {
			expect($input.val()).to.contain('50')
		})
		
		
	})
	
	

})