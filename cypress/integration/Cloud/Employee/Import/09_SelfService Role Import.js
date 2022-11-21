describe('09_Self Service Role Import', function() {
	
   var empid = 'CY1'
   var Staff = 'Staff'
   var firstName = 'Mohan'
   var middleName = 'Mithun'
   var lastName  = 'Mane'
   var gender = 'Female'
   var profTaxLocation  = 'Maharashtra'
   var dateOfBirth	= '01/12/1995' 
   var dateOfJoining = '02/04/2022'
   var esiLocation = 'Pune'
   var esiDispensary = 'Mumbai' 
   var metro = 'Metro'

   var filePath= 'Employee/EmployeeMasterImport.xlsx'
   var sheetName='SelfServiceRole'
   var Category = 'Staff'
   var settingName= 'SelfServiceRole'
   

   beforeEach(function(){
	cy.getCookies()
	})
	

it('Login to Cloud & select Company', function() {
	cy.login()
	cy.changeCompany();		
})

it('Navigate to SelfService Role Import', function() {

	cy.visit(Cypress.env('url')+'Employee/Employee/EmployeeImport?import=1')
	cy.wait(2000)
	cy.get('#ddlEmployeeImportNameList').select('SelfService Role Import',{force: true})
	cy.wait(2000)	
})

it('Save Setting for SelfService Role',function() {
	cy.server()	
	cy.wait(1000)
	
	cy.route('POST', Cypress.env('url')+'Employee/Employee/SaveEmployeeImport').as('SelfServiceRole')

	cy.wait(2000)
	cy.get('#savesetting').click({force: true})
	
	//setting name validation
	cy.wait(2000)
	 cy.get(".toast-message").invoke('text').then((text) => {
		if(text.trim()=='Please Select Setting')	{
		cy.wait(1000)
		cy.get(".toast-message").eq(0).click({force: true})
		  cy.get('[onclick="showNewSetting()"]').click({force: true})
		  
		  cy.wait(2000)
		  cy.get('#SettingNameNew').click({force: true})
		  cy.get('#SettingNameNew').clear()
		  cy.get('#SettingNameNew').type(settingName)
		}
	 })
	 
	 
	 cy.wait(1000)
	cy.get('[onclick="addNewSetting()"]').click({force: true})
	
	
	//start && end row  validation
	cy.get('#savesetting').click({force: true})
	cy.wait(2000)
	 cy.get(".toast-message").invoke('text').then((text) => {
		if(text.trim()=='Select Start And End Row')	{
		cy.wait(1000)
		cy.get(".toast-message").eq(0).click({force: true})
		 cy.wait(1000)
		 
		  cy.get('#StartingRow').click({force: true})
		  cy.get('#StartingRow').clear()
		  cy.get('#StartingRow').type('2')
		  
		  cy.get('#EndingRow').click({force: true})
		  cy.get('#EndingRow').clear()
		  cy.get('#EndingRow').type('11')
		}
	 })
	
	
	//Emp code validation
	cy.wait(1000)
	cy.get('#savesetting').click({force: true})
	cy.wait(2000)
	 cy.get(".toast-message").invoke('text').then((text) => {
		if(text.trim()=='Select Employee Code Column')	{
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
		if(text.trim()=='Select Component Value')	{
		cy.wait(1000)
		cy.get(".toast-message").eq(0).click({force: true})
		 cy.wait(1000)
		 cy.get('#SelfServiceRole').select('B',{force: true})
		}
	 })
	 
	 
	 cy.wait(1000)
	cy.get('#savesetting').click({force: true})
	cy.wait('@SelfServiceRole').its('status').should('eq', 200)
	 cy.get(".toast-message").invoke('text').then((text) => {
		expect(text.trim()).equal('Setting Saved Successfully')
		cy.get(".toast-message").eq(0).click({force: true})
		
	})
	
})

it('Upload SelfService Role excel file',function() {
	
	cy.get('#SettingName').select(settingName,{force: true})
	
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
	cy.get('#ExcelSheetName').select(sheetName,{force: true})
	cy.wait(1000)
	cy.get('#uploadsetting').click({force: true})
	cy.wait(10000)
	
	cy.get(".alert-success").invoke('text').then((text) => {
		cy.log(text.trim())	
		expect(text.trim()).contains('Excel uploaded successfully, it will get processed in background.')
		//cy.get(".toast-message").click()
	})
	cy.wait(50000)
	cy.get(".notification-listmenu a p").eq(0).invoke('text').then((text) => {

		if(text.trim()=='Excel Upload ProcessingSelfservice Role Excel is in uploading process, click here to download')	{
		
			cy.wait(20000)
			cy.get(".notification-listmenu a p").eq(0).invoke('text').then((text) => {

					expect(text.trim()).contains('Selfservice Role Import Sucess')		
			})
		}	
		else
			{
				expect(text.trim()).contains('Selfservice Role Import Sucess')
			}	

	})
})

it('Verify imported SelfService Role', function() {

		cy.task('readXlsx', { file: 'cypress/fixtures/Employee/EmployeeMasterImport.xlsx', sheet: sheetName }).then((rows) => {
			var rowsLength = rows.length;
			cy.writeFile("cypress/fixtures/Employee/"+sheetName+".json", {rows})
		  }) 

		cy.fixture('/Employee/'+sheetName).then((data) => {

		cy.navigate_EmployeeProfile(data.rows[0].EmpCode)	
		cy.get('#profile_detail_tab').click({force:true})
		cy.get('#Profile_SelfServiceRole').click({force: true})
		cy.get('#Profile_SelfServiceRole').click()
		cy.get('#Profile_SelfServiceRole').click({force: true})
		cy.wait(1000)

			//Verify 
			cy.get('[name="SelfServiceRole"]').find(':selected').contains(data.rows[0].Role)

			cy.navigate_EmployeeProfile(data.rows[3].EmpCode)	
			cy.get('#profile_detail_tab').click({force:true})
			cy.get('#Profile_SelfServiceRole').click({force: true})
			cy.get('#Profile_SelfServiceRole').click()
			cy.get('#Profile_SelfServiceRole').click({force: true})
			cy.wait(1000)
	
				//Verify 
				cy.get('[name="SelfServiceRole"]').find(':selected').contains(data.rows[3].Role)
				
		
	})

	
})
	
}) 