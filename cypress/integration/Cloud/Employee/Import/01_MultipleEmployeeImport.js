describe('Attendence Import ', function() {

var url = 'http://next.pockethrms.com'
var username= 'nileshgajare@live.com'
var userPass = '123456'

//var employeeID ='c013'

//var company='NNTest_25'
var Category = 'Staff'
//var employeeCode = 'TEST-6'
var settingName= 'Employeeimport'
var filePath= 'EmployeeImport.xlsx'


function randomInteger(length) {
  var result           = '';
  var characters       = '0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
 result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

before(function() {
    cy.clearCookie('.AspNetCore.Antiforgery.IT8a6MuPYuY', '.AspNetCore.Session','.AspNetCore.Mvc.CookieTempDataProvider','new_username','FavouriteMenus')
cy.getCookie('.AspNetCore.Antiforgery.IT8a6MuPYuY').should('be.null')
cy.getCookie('.AspNetCore.Session').should('be.null')
cy.getCookie('new_username').should('be.null')
cy.getCookie('FavouriteMenus').should('be.null')
cy.getCookie('.AspNetCore.Antiforgery.IT8a6MuPYuY').should('be.null')
})

	beforeEach(function(){
        cy.getCookies()
	})
	
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

it('Change Company', function() {
cy.changeCompany();
})



it('Navigate to Employee Import', function() {

var settingName= 'Employeeimport'
var filePath= 'EmployeeImport.xlsx'
var startingRow ='3'
var endingRow ='48'
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

cy.visit(Cypress.env('url')+'Employee/Employee/EmployeeImport?import=1')
cy.wait(2000)
//cy.get('#excelImport').select('EmployeeImport Import',{force: true})
cy.wait(2000)
cy.get('#categoryMaster').select('Staff',{force: true})

cy.wait(2000)
cy.get('button[onclick="showNewMasterSetting()"]').click({force: true})
cy.wait(2000)
cy.get('#MasterSettingNameNew').type(settingName)
cy.wait(1000)
cy.get("input[name='name']").click({force: true})
//cy.get('#MasterSettingName').select('Test',{force:true})
/*
cy.fixture('EmployeeImport.xlsx', 'binary')
.then(Cypress.Blob.binaryStringToBlob)
.then(fileContent => {
cy.get('#file').upload({
fileContent,
fileName: 'EmployeeImport.xlsx',
mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
encoding: 'utf8'
})
}) */

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
/*cy.get('#j1_67_anchor').click({force:true})
//cy.xpath("//a[contains(text(),'Employee Earning')]").click({force:true})
cy.wait(500)
cy.xpath("//a[@id='j1_73_anchor']//span[@id='E|10|FB']").click({force:true})
cy.get('#FB').select(FIXEDBASIC)
cy.xpath("//a[@id='j1_76_anchor']//span[@id='E|10|FPROJ']").click({force:true})
cy.get('#FPROJ').select(MasterProjectAllowance)
cy.xpath("//a[@id='j1_74_anchor']//span[@id='E|10|FFIELD']").click({force:true})
cy.get('#FFIELD').select(MasterFieldAllowance)
cy.wait(1000)
/*cy.get('#j1_82_anchor').click({force:true})
cy.wait(1000)
cy.xpath("//a[@id='j1_82_anchor']//span[@id='D|10|PTAX']").click({force:true})
cy.get('#PTAX').select(deduction)*/

cy.get('#savesettingMaster').click()
cy.wait(3000)
cy.get(".toast-message").invoke('text').then((text) => {
cy.log(text.trim())
expect(text.trim()).equal('Setting Saved Successfully')
cy.get(".toast-message").click()
})
})


it('Excel Upload', function() {
	var filePath= 'Employee/EmployeeImport.xlsx'
	var sheetName='Employee'
	cy.visit(Cypress.env('url')+'Employee/Employee/EmployeeImport?import=1')
	cy.wait(2000)
cy.get('#ddlEmployeeImportNameList').select('Employee Master Import',{force:true})
cy.wait(2000)
cy.get('#categoryMaster').select('Staff',{force: true})

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

/*cy.wait(6000)
cy.get(".toast-message").invoke('text').then((text) => {
cy.log(text.trim())
expect(text.trim()).equal('Data Imported Successfully')
cy.get(".toast-message").click()
})*/

cy.wait(50000)
})

it('verify uploaded data', function() {

	cy.visit(Cypress.env('url')+'identity/Home/Dashboard')
	cy.wait(2000)

	/*Verify Name
	cy.get(".getTotalActiveEmployees").invoke('text').then((DrillDownTotal) => {
		 
		softExpect(DrillDownTotal.trim()).to.contains(46);
	})*/

	cy.get(".getTotalActiveEmployees").invoke('text').then((text) => {
			expect(text.trim()).to.contain('48')
		})
})

})