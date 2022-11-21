describe('06_Nominee Details Import', function() {
	
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
   var sheetName='NomineeDetails'
   var Category = 'Staff'
   var settingName= 'NomineeDetails'
   

   beforeEach(function(){
	cy.getCookies()
	})
	

it('Login to Cloud & select Company', function() {
	cy.login()
	cy.changeCompany();		
})


it('Navigate to Employee Nominee Import', function() {

	cy.visit(Cypress.env('url')+'Employee/Employee/EmployeeImport?import=1')
	cy.wait(2000)
	cy.get('#ddlEmployeeImportNameList').select('Employee Nominee Import',{force: true})
	cy.wait(2000)	
})


it('Save Setting for Nominee Details',function() {
	cy.server()	
	cy.route('POST', Cypress.env('url')+'Employee/Employee/SaveEmployeeImport').as('Academicdetails')
	cy.wait(2000)

	
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
		  cy.get('#SettingNameNew').type('NomineeDetailsImport')
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
		  cy.get('#EndingRow').type('2')
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
		 cy.get('#Name').select('B',{force: true})
		 cy.get('#Address').select('C',{force: true})
		 cy.get('#Relation').select('D',{force: true})
		 cy.get('#DOB').select('E',{force: true})
		 cy.get('#Age').select('H',{force: true})
		 cy.get('#AmountPaidToNominee').select('F',{force: true})
		 cy.get('#NameAddressGuardian').select('G',{force: true})
		  
		}
	 })
	 
	 
	 
	 cy.wait(1000)
	cy.get('#savesetting').click({force: true})
	cy.wait('@Academicdetails').its('status').should('eq', 200)
	 cy.get(".toast-message").invoke('text').then((text) => {
		expect(text.trim()).equal('Setting Saved Successfully')
		cy.get(".toast-message").eq(0).click({force: true})
		
	})
	
})

it('Upload Nominee Details excel file',function() {
	cy.server()
	cy.route('Get', '/Admin/Settings/GetBackGroundProcess').as('GetBackGroundProcess')

	cy.visit(Cypress.env('url')+'Employee/Employee/EmployeeImport?import=1')
	cy.wait(1000)
	cy.get('#ddlEmployeeImportNameList').select('Employee Nominee Import',{force: true})
	cy.wait(2000)
	cy.get('#SettingName').select('NomineeDetailsImport',{force: true})
	
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
	cy.get('#ExcelSheetName').select('NomineeDetails',{force: true})
	cy.wait(1000)
	cy.get('#uploadsetting').click({force: true})
	cy.wait(3000)
	
	cy.get(".alert-success").invoke('text').then((text) => {
		cy.log(text.trim())	
		expect(text.trim()).contains('Excel uploaded successfully, it will get processed in background.')
		//cy.get(".toast-message").click()
	})
	cy.wait(50000)
	cy.wait('@GetBackGroundProcess').its('status').should('eq', 200)

	cy.reload()
	cy.wait(2000)
	cy.get('.dripicons-bell').click()

	cy.get(".notification-listmenu a p").eq(0).invoke('text').then((text) => {
		cy.log(text.trim())	
		expect(text.trim()).contains('Nominee Details Import Sucess')
		//cy.get(".toast-message").click()
	})
})

it('Verify imported Nominee Details data', function() {

		cy.task('readXlsx', { file: 'cypress/fixtures/Employee/EmployeeMasterImport.xlsx', sheet: sheetName }).then((rows) => {
			var rowsLength = rows.length;
			cy.writeFile("cypress/fixtures/Employee/"+sheetName+".json", {rows})
		  }) 

		  cy.fixture('/Employee/'+sheetName).then((data) => {

		cy.navigate_EmployeeProfile(data.rows[0].EmpCode)	
		cy.get('#profile_detail_tab').click({force:true})
		cy.get('#Profile_NomineeDetails').click({force: true})
		cy.get('#Profile_NomineeDetails').click()
		cy.get('#Profile_NomineeDetails').click({force: true})
		cy.wait(1000)

				//Verify 
		cy.xpath("//h5[contains(@id, 'Name')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain(data.rows[0].Name)
		})
		//Verify 
		cy.xpath("//span[contains(@id, 'Address')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain(data.rows[0].Address)
		})
		//Verify 
		cy.xpath("//span[contains(@id, 'dob')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain(data.rows[0].DOB)
		})
		//Verify 
		cy.xpath("//span[contains(@id, 'Relation')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain(data.rows[0].NomineeRelationWithMember)
		})

			//Verify 
		cy.xpath("//span[contains(@id, 'AmountPaidToNominee')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain(data.rows[0].AmountPaidToNomineeInPercentage)
		})
		//Verify 
		cy.xpath("//span[contains(@id, 'Guardian')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain(data.rows[0].NameAndAddressOfGuardian)
		})

	})
})
	
}) 