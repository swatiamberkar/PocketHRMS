describe('Attendence Import ', function() {

    var url = 'http://next.pockethrms.com'
    var username= 'nileshgajare@live.com'
    var userPass = '123456'
    
    //var employeeID ='c013'
    
    //var company='NNTest_25'
    var Category = 'Staff'
    //var employeeCode = 'TEST-6'
    
    var filePath= 'Employee/EmployeeImport.xlsx'

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
		
	it('Login to Cloud & select Company', function() {
		cy.login()
		cy.changeCompany();		
	})
    
    
 /*   it('Navigate to Employee Import', function() {
    
    var settingName= 'Employeeimport'
 //   var filePath= 'Employee/EmployeeImport.xlsx'
    var startingRow ='2'
    var endingRow ='35'
    var EmpCode='A'
    var EmpName ='B'
    var DOB ='C'
    var  DOJ='D'
    var  ESIDispensary ='E'
    var ESILocation='F'
    var Gender='G'
    var LastName ='H'
    var Metro ='I'
    var PTLocation='J'
    var REGIMETYPE='O'
    var FIXEDBASIC ='K'
    var MasterProjectAllowance='L'
    var MasterFieldAllowance='M'
    var deduction='N' 
    
    var sheetName='Employee'
    
    cy.visit(Cypress.env('url')+'Employee/Employee/EmployeeImport?import=1')
    cy.wait(2000)
    //cy.get('#excelImport').select('EmployeeImport Import',{force: true})
    cy.wait(2000)
    cy.get('#categoryMaster').select('Staff',{force: true})
    
    cy.wait(2000)
    cy.get('button[onclick="showNewMasterSetting()"]').click({force: true})
    cy.wait(2000)
    cy.get('#MasterSettingNameNew').type('Employeeimport')
    cy.wait(1000)
    cy.get("input[name='name']").click({force: true})
    //cy.get('#MasterSettingName').select('Test',{force:true})
 
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
    cy.get('#REGIMETYPE').select(REGIMETYPE)
    cy.wait(2000)

    
    cy.get('#savesettingMaster').click()
    cy.wait(3000)
    cy.get(".toast-message").invoke('text').then((text) => {
    cy.log(text.trim())
    expect(text.trim()).equal('Setting Saved Successfully')
    cy.get(".toast-message").click()
    })
    })
    */
    
    it('Excel Upload', function() {
       // var filePath= 'EmployeeImport.xlsx'
     var sheetName='Employee'
        cy.visit(Cypress.env('url')+'Employee/Employee/EmployeeImport?import=1')
        cy.wait(2000)
    cy.get('#ddlEmployeeImportNameList').select('Employee Master Import',{force:true})
    cy.wait(2000)
    cy.get('#categoryMaster').select('Staff',{force: true})
    
    cy.wait(2000)
    cy.get('#MasterSettingName').select('Employeeimport',{force:true})
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
    
    cy.get(".alert-text").invoke('text').then((text) => {
    cy.log(text.trim())
    expect(text.trim()).equal('Excel uploaded successfully, it will get processed in background..')
    
    //cy.get(".toast-message").click()
    }) 
    /*cy.wait(6000)
    cy.get(".toast-message").invoke('text').then((text) => {
    cy.log(text.trim())
    expect(text.trim()).equal('Data Imported Successfully')
    cy.get(".toast-message").click()
    })*/
    
    cy.wait(15000)
    })
    })