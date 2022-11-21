describe('01_Employee Master Import', function() {
	
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
   var sheetName='Employee'
   var Category = 'Staff'
   var settingName= 'EmployeeMasterimport'
   


   beforeEach(function(){
	cy.getCookies()
	})
	

it('Login to Cloud & select Company', function() {
	cy.login()
	cy.changeCompany();		
})

it('Navigate to Employee Master Import', function() {

	cy.visit(Cypress.env('url')+'Employee/Employee/EmployeeImport?import=1')
	cy.wait(2000)
	cy.get('#ddlEmployeeImportNameList').select('Employee Master Import',{force:true})
	cy.wait(2000)
	
})

it('Save Employee Master setting', function() {

	var startingRow ='2'
	var endingRow ='2'
	var EmpCode='A'
	var EmpName ='B'
	var DOB ='C'
	var  DOJ='D'
	var  ESIDispensary ='E'
	var ESILocation='F'
	var Gender='G'
	var ITAXRegime='O'
	var LastName ='H'
	var Metro ='I'
	var PTLocation='J'
	var FIXEDBASIC ='K'
	var MasterProjectAllowance='L'
	
	var sheetName='Employee'
	
	cy.wait(2000)
	cy.get('#categoryMaster').select(Category,{force: true})
	cy.get('#categoryMaster').select(Category)
	cy.get('#categoryMaster').select(Category,{force: true})

	
	cy.wait(2000)
	cy.get('button[onclick="showNewMasterSetting()"]').click({force: true})
	cy.wait(2000)
	cy.get('#MasterSettingNameNew').type(settingName)
	cy.wait(1000)
	cy.get("input[name='name']").click({force: true})
	
	
	cy.wait(2000)
	cy.get('#MStartingRow').clear() 
	cy.get('#MStartingRow').type(startingRow)
	cy.get('#MEndingRow').clear() 
	cy.get('#MEndingRow').type(endingRow)
	cy.get('#MEmployeeCodeRow').select(EmpCode)
	cy.get('#EmployeeNameRow').select(EmpName)
	cy.get('#DATEOFBIRTH').select(DOB)
	cy.get('#DATEOFJOINING').select(DOJ)
	cy.get('#ESIDISPENSARY').select(ESIDispensary)
	cy.get('#ESILOCATION').select(ESILocation)
	cy.get('#GENDER').select(Gender)
	cy.get('#LNAME').select(LastName)
	cy.get('#METRO').select(Metro)
	cy.get('#PTLOCATION').select(PTLocation)
	cy.get('#REGIMETYPE').select(ITAXRegime)
	cy.wait(2000)
	
	cy.get('#savesettingMaster').click()
	cy.wait(3000)
	cy.get(".toast-message").invoke('text').then((text) => {
	cy.log(text.trim())
	expect(text.trim()).equal('Setting Saved Successfully')
	cy.get(".toast-message").click()
	})
})	
	
it('Import Employee Master Excel', function() {
	cy.get('#ddlEmployeeImportNameList').select('Employee Master Import',{force:true})
	cy.wait(2000)
	
	cy.get('#categoryMaster').select(Category,{force: true})
	
	cy.wait(2000)
	cy.get('#MasterSettingName').select(settingName,{force:true})
	cy.wait(2000)
	
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
	
	cy.get('#ExcelSheetName').select(sheetName)
	
	cy.get('#uploadsetting').click()
	cy.wait(3000)
	cy.get(".alert-success").invoke('text').then((text) => {
		cy.log(text.trim())	
		expect(text.trim()).contains('Excel uploaded successfully, it will get processed in background.')
		//cy.get(".toast-message").click()
	})
	
	cy.wait(50000)
	/*
	cy.reload()
	cy.get('.dripicons-bell').click()

	cy.get(".notification-listmenu a p").eq(0).invoke('text').then((text) => {
		cy.log(text.trim())	
		expect(text.trim()).contains('Employee Details Import Sucess')
		//cy.get(".toast-message").click()
	})*/
})

it('Verify imported Employee Master data', function() {

		cy.task('readXlsx', { file: 'cypress/fixtures/Employee/EmployeeMasterImport.xlsx', sheet: "Employee" }).then((rows) => {
			var rowsLength = rows.length;
			cy.writeFile("cypress/fixtures/Employee/EmployeeMasterImport.json", {rows})
		  }) 

		  cy.fixture('/Employee/EmployeeMasterImport').then((data) => {

		cy.navigate_EmployeeProfile(data.rows[0].EmpCode)	

		cy.get('#FNAME').invoke('val').should('contain', data.rows[0].Name)
		cy.get('#LNAME').invoke('val').should('contain', data.rows[0].LastName)
		cy.get('#'+data.rows[0].Gender)
			.parent()
			   .find('input')
			.should('be.checked')
		cy.get('#PTLOCATION').find(':selected').contains(data.rows[0].ProfTaxLocation)
		cy.get('#DATEOFBIRTH').invoke('val').should('contain', data.rows[0].DOB)
		cy.get('#DATEOFJOINING').invoke('val').should('contain', data.rows[0].DOJ)
		cy.get('#ESILOCATION').find(':selected').contains(data.rows[0].ESILocation)
		cy.get('#ESIDISPENSARY').find(':selected').contains(data.rows[0].ESIDispensary)
		cy.get('#METRO').find(':selected').contains(data.rows[0].MetroTDS)
		
		  })
})
	

}) 