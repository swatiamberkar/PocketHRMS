describe('03_Academic Details Import', function() {
	
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
    //var sheetName='AcademicDetails'
    var sheetName='EducationalQualification'
    var Category = 'Staff'
    var settingName= 'MedicalAcademicDetails'
    var filePath1 = 'sample file.pdf'
    var updatedFilePath = 'Employee/light bill.pdf'
    
 
    beforeEach(function(){
     cy.getCookies()
     })
     
 
 it('Login to Cloud & select Company', function() {
     cy.login()
     cy.changeCompany();		
 })
 
 it('Navigate to Academic Details Import', function() {
 
     cy.visit(Cypress.env('url')+'Employee/Employee/EmployeeImport?import=1')
     cy.wait(2000)
     cy.get('#ddlEmployeeImportNameList').select('Education /  Qualification Details Import',{force: true})
     cy.wait(2000)
     
 })
 context ('Verify all validation messages',() => {
 it('Verify validation message for select setting',function() {
	cy.server()	
	cy.wait(1000)
	cy.route('POST', Cypress.env('url')+'Employee/Employee/SaveEmployeeImport').as('Academicdetails')
	cy.wait(2000)
	//click on save setting button
	cy.get('#savesetting').click({force: true})
     //verify validation message 
     cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Please Select Setting')
    })
    //click on message to close message box
    cy.get(".toast-message").click()
 })
 it('Verify validation message for start and end rows',function() {
    cy.get('[onclick="showNewSetting()"]').click({force: true})
		  
    cy.wait(2000)
    cy.get('#SettingNameNew').click({force: true})
    cy.get('#SettingNameNew').clear()
    cy.get('#SettingNameNew').type(settingName)
    cy.wait(1000)
	cy.get('[onclick="addNewSetting()"]').click({force: true})
    //click on save setting button
    cy.get('#savesetting').click({force: true})
	cy.wait(2000)
    //verify validation message 
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Select Start And End Row')
    })
    //click on message to close message box
    cy.get(".toast-message").click()

 })
 it('Verify validation message for Employee Code Column',function() {
    cy.get('#StartingRow').click({force: true})
    cy.get('#StartingRow').clear()
    cy.get('#StartingRow').type('2')
    
    cy.get('#EndingRow').click({force: true})
    cy.get('#EndingRow').clear()
    cy.get('#EndingRow').type('2')
    //click on save setting button
    cy.wait(1000)
	cy.get('#savesetting').click({force: true})
	cy.wait(2000)
    //verify validation message 
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Select Employee Code Column')
    })
    //click on message to close message box
    cy.get(".toast-message").click()
 })
 it('Verify validation message for start and end rows',function() {
    cy.get('#EmployeeCodeRow').select('A',{force: true}) 
    //click on save setting button
    cy.wait(1000) 
	cy.get('#savesetting').click({force: true})
	cy.wait(2000)
    //verify validation message 
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Select Component Value')
    })
    //click on message to close message box
    cy.get(".toast-message").click()
 })
 it('Verify success message ',function() {
    cy.get('#DegreeName').select('B',{force: true})
    cy.get('#Stream').select('C',{force: true})
	cy.get('#BoardUniversityName').select('D',{force: true})
    cy.get('#FromDate').select('E',{force: true})
	cy.get('#ToDate').select('F',{force: true})
	cy.get('#Grade').select('G',{force: true})
	cy.get('#Percentage').select('H',{force: true})
    cy.get('#HighQualification').select('I',{force: true})
    cy.get('#Specialization').select('J',{force: true})
    cy.get('#Remarks').select('K',{force: true})
     //click on save setting button
     cy.wait(1000) 
     cy.get('#savesetting').click({force: true})
     cy.wait(2000)
     //verify validation message 
     cy.get(".toast-message").invoke('text').then((text) => {
         expect(text.trim()).equal('Setting Saved Successfully')
     })
     //click on message to close message box
     cy.get(".toast-message").click()

 })
})
context ('Verify add funcationality',() => {
it('Add data insid eall fields ', () =>  {

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
	cy.wait(3000)
	
	cy.get(".alert-success").invoke('text').then((text) => {
		cy.log(text.trim())	
		expect(text.trim()).contains('Excel uploaded successfully, it will get processed in background.')
		//cy.get(".toast-message").click()
	})
	cy.wait(20000)
	cy.wait('@GetBackGroundProcess').its('status').should('eq', 200)

	//
	//cy.reload()
	cy.wait(2000)
	cy.get('.dripicons-bell').click()

	cy.get(".notification-listmenu a p").eq(0).invoke('text').then((text) => {
		cy.log(text.trim())	
		expect(text.trim()).contains('Academic Details Import Sucess')
		//cy.get(".toast-message").click()
	})
})
})

})