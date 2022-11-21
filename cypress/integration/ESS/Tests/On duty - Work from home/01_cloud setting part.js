describe('On duty - cloud setting part', function() {
	

	var EmpID ='L6'
	
	var filePath= 'AapprovalMatrix.xlsx'
	var settingName='ApprovalMatrix'
	var settingName2 ='Overwrite'
	var sheetName='OnDuty _ESS'
	var sheetName2='Sheet2'
	var startingRow ='2'
	var endingRow ='2'
	
	var employeeCode ='A'
	var leaderCode ='B'
	var priority ='C'
	var moduleName ='D'
	var approvalMust ='E'
	var approvalCancelRights ='F'
	var ViewOnly ='G'
   

   beforeEach(function(){
	cy.getCookies()
	})
	

it('Login to Cloud & select Company', function() {
	cy.login()
	cy.changeCompany();		
	cy.wait(2000)
	cy.navigate_EmployeeProfile(EmpID)
	cy.wait(2000)
	//cy.get('#approval_matrix_tab').click({force:true})
	cy.wait(5000)
	//cy.get('.text-danger').click({ multiple: true, force: true })
	//cy.get('.text-danger').click()
})


it('Navigate to aproval matrix Import', function() {

	cy.visit(Cypress.env('url')+'Employee/Employee/EmployeeImport?import=1')
	cy.wait(2000)
	cy.get('#ddlEmployeeImportNameList').select('Approval Matrix Manager Import',{force: true})
	cy.wait(2000)	
})


it('Verify Validation Massges - Select Setting Name', function() {	
	const { softAssert, softExpect } = chai;

cy.get('#categoryMasterAI').select('All',{force: true})
cy.wait(2000)
	 cy.get('#savesettingAmmendment').click({force: true})
	 cy.get(".toast-message").invoke('text').then((text) => {
	 softExpect(text.trim()).to.eq('Select Setting Name');
	 cy.wait(3000)
		cy.get(".toast-message").click({force: true})
	  })
})

it('Verify Validation Massges - Please Add Setting Name!', function() {	
	const { softAssert, softExpect } = chai;
cy.wait(3000)
cy.get('[onclick="showNewSettingAI()"]').click({force: true})

cy.xpath("//input[@name='name']").click({force: true})
cy.wait(2000)
	// cy.get('#savesettingAmmendment').click({force: true})
	 
	 cy.get(".toast-message").invoke('text').then((text) => {
	 softExpect(text.trim()).to.eq('Please Add Setting Name!');
	 cy.wait(3000)
		cy.get(".toast-message").click({force: true})
	  })
})

it('Verify Validation Massges - Select Start And End Row', function() {	
	const { softAssert, softExpect } = chai;
cy.wait(2000)
cy.get('#SettingNameNewAI').click({force: true})
cy.wait(2000)
cy.get('#SettingNameNewAI').clear().type(settingName)
cy.wait(1000)
cy.xpath("//input[@name='name']").click({force: true})
cy.wait(2000)

cy.get('#savesettingAmmendment').click({force: true})

	 cy.get(".toast-message").invoke('text').then((text) => {
	 softExpect(text.trim()).to.eq('Select Start And End Row');
	 cy.wait(3000)
		cy.get(".toast-message").click({force: true})
	  })
})


it('Save Setting for Employee Import', function() {	
	const { softAssert, softExpect } = chai;
	
	cy.get('#StartingRowAI').click({force: true})
cy.get('#StartingRowAI').clear().type(startingRow)

cy.get('#EndingRowAI').click({force: true})
cy.get('#EndingRowAI').clear().type(endingRow)
			 cy.wait(2000)
	// cy.get('#savesettingAmmendment').click({force: true})
	
	cy.fixture(filePath, 'binary')
	.then(Cypress.Blob.binaryStringToBlob)
	.then(fileContent => {
	cy.get('#fileAI').upload({
	fileContent,
	fileName: filePath,
	mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	encoding: 'utf8'
	})
	})
	cy.wait(2000)
	
	cy.get('#ExcelSheetNameAI').select(sheetName,{force: true})
	cy.get('#EmployeeCodeRowAI').select(employeeCode,{force: true})
	cy.get('#LeaderCode').select(leaderCode,{force: true})
	cy.get('#Priority').select(priority,{force: true})
	cy.get('#ModuleName').select(moduleName,{force: true})
    cy.get('#ApprovalMust').select(approvalMust,{force: true})
	cy.get('#AppCancelRights').select(approvalCancelRights,{force: true})
	cy.get('#ViewOnly').select(ViewOnly,{force: true})
	
	// cy.get('#checkOverWrite').click({force: true})
cy.wait(2000)
 cy.get('#savesettingAmmendment').click({force: true})
 cy.wait(2000)
	 cy.get(".toast-message").invoke('text').then((text) => {
	 softExpect(text.trim()).to.eq('Setting Saved Successfully');
	 cy.wait(3000)
		cy.get(".toast-message").click({force: true})
	  })
})

it('Upload File of Employee Import', function() {	
	const { softAssert, softExpect } = chai;
		cy.wait(2000)
	cy.get('#uploadsetting').click({force: true})
		cy.wait(2000)
	cy.get(".alert-success").invoke('text').then((text) => {
		cy.log(text.trim())	
		expect(text.trim()).contains('Excel uploaded successfully, it will get processed in background.')
		//cy.get(".toast-message").click()
	})
	 cy.wait(50000)
	 
})
})