describe('11_Approval Matrix Import', function() {
	

	var EmpID ='CY2'
	
	var filePath= 'AapprovalMatrix.xlsx'
	var settingName='ApprovalMatrix'
	var settingName2 ='Overwrite'
	var sheetName='Sheet1'
	var sheetName2='Sheet2'
	var startingRow ='2'
	var endingRow ='29'
	
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

it('Verify Imported  Module', function() {	
	const { softAssert, softExpect } = chai;
	//cy.visit(Cypress.env('url')+'Settings/Employee/Index?module=organization&submodule=smtpsetting')
	cy.wait(2000)
	cy.navigate_EmployeeProfile(EmpID)

	//cy.navigate_EmployeeProfile()
	cy.wait(2000)
	cy.get('#approval_matrix_tab').click({force:true})
	cy.wait(5000)
	cy.xpath("//div[@id='approvalmatrixbody']").find('h4').should('have.length', 27)
	
	cy.xpath("//div[@id='approvalmatrixbody']//h4").invoke('text').then((text) => {
		softExpect(text.trim()).to.not.contain('CY2');
		cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//h4").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('CY1');
		cy.wait(2000) 
	})
	
	 cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
	 	softExpect(text.trim()).to.contain('Increment');
	 	cy.wait(2000) 
	 })
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('EmployeeDetails');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('OTEntry');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('Loan');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('IncomeTaxDeclaration');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('IncomeTaxProof');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('EmployeeInOutDetails');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('SelfServiceTdsEntry');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('SelfServiceTdsProofEntry');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('Selfservice_Permission');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('Selfservice_PermissionFromTo');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('OnDuty');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('EarningDeduction');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('New Employee');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('Shift Schedule Entry');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('Attendance Regularization');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('OT Entry All');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('Separation');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('Payroll Loan');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('Selfservice Separation');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('Timesheet Entry');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('Expense');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('Confirmation');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('Transfer');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('Job Manager');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('Travel');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('Expense');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('Leave');
		//cy.wait(2000) 
	})
	
	
	
	
})	

it('Save Setting with Overwrite Previous Manager', function() {	
	const { softAssert, softExpect } = chai;
	cy.visit(Cypress.env('url')+'Employee/Employee/EmployeeImport?import=1')
	cy.wait(2000)
	cy.get('#ddlEmployeeImportNameList').select('Approval Matrix Manager Import',{force: true})
	cy.wait(2000)

	//cy.wait(20000)
	//cy.xpath("//div[@id='approvalComponentTitle']//i[@class='fas fa-upload']").click({force: true})
	//cy.wait(2000)
	
	cy.get('#categoryMasterAI').select('All',{force: true})
			 cy.wait(2000)
			 
	cy.get('[onclick="showNewSettingAI()"]').click({force: true})
	cy.wait(2000)
cy.get('#SettingNameNewAI').click({force: true})
cy.get('#SettingNameNewAI').clear().type(settingName2)

cy.xpath("//input[@name='name']").click({force: true})
cy.wait(2000)
	
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
	
	cy.get('#ExcelSheetNameAI').select(sheetName2,{force: true})
	
				cy.get('#StartingRowAI').click({force: true})
cy.get('#StartingRowAI').clear().type(startingRow)

cy.get('#EndingRowAI').click({force: true})
cy.get('#EndingRowAI').clear().type(endingRow)
			 cy.wait(2000)
			 
	cy.get('#EmployeeCodeRowAI').select(employeeCode,{force: true})
	cy.get('#LeaderCode').select(leaderCode,{force: true})
	cy.get('#Priority').select(priority,{force: true})
	cy.get('#ModuleName').select(moduleName,{force: true})
	cy.get('#ApprovalMust').select(approvalMust,{force: true})
	cy.get('#AppCancelRights').select(approvalCancelRights,{force: true})
	cy.get('#ViewOnly').select(ViewOnly,{force: true})
	
	 cy.get('#checkOverWrite').click({force: true})
cy.wait(2000)
 cy.get('#savesettingAmmendment').click({force: true})
 cy.wait(2000)
	 cy.get(".toast-message").invoke('text').then((text) => {
	 softExpect(text.trim()).to.eq('Setting Saved Successfully');
	 cy.wait(3000)
		cy.get(".toast-message").click({force: true})
	  })	
})

it('Upload Setting with Overwrite Previous Manager', function() {	
	const { softAssert, softExpect } = chai;
	cy.get('#checkOverWrite').click({force: true})
	cy.wait(2000)
	cy.get('#uploadsetting').click({force: true})
	 cy.wait(2000)
	cy.get(".alert-success").invoke('text').then((text) => {
		cy.log(text.trim())	
		expect(text.trim()).contains('Excel uploaded successfully, it will get processed in background.')
		//cy.get(".toast-message").click()
	})
	 cy.wait(15000)
	
})

/*
it('Verify Imported Overwrite Module', function() {	
	const { softAssert, softExpect } = chai;
	//cy.visit(Cypress.env('url')+'Settings/Employee/Index?module=organization&submodule=smtpsetting')
	cy.wait(2000)
	cy.navigate_EmployeeProfile(EmpID)
	cy.wait(2000)
	cy.get('#approval_matrix_tab').click({force:true})
	cy.wait(5000)
	cy.xpath("//div[@id='approvalmatrixbody']").find('h4').should('have.length', 27)
	
	//cy.xpath("//div[@id='approvalmatrixbody']//h4").invoke('text').then((text) => {
	//	softExpect(text.trim()).to.contain('CY2');
		//cy.wait(2000) 
	//})
	
	cy.xpath("//div[@id='approvalmatrixbody']//h4").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('CY3');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('Increment');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('EmployeeDetails');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('OTEntry');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('Loan');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('IncomeTaxDeclaration');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('IncomeTaxProof');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('EmployeeInOutDetails');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('SelfServiceTdsEntry');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('SelfServiceTdsProofEntry');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('Selfservice_Permission');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('Selfservice_PermissionFromTo');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('OnDuty');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('EarningDeduction');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('New Employee');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('Shift Schedule Entry');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('Attendance Regularization');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('OT Entry All');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('Separation');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('Payroll Loan');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('Selfservice Separation');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('Timesheet Entry');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('Expense');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('Confirmation');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('Transfer');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('Job Manager');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('Travel');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('Expense');
		//cy.wait(2000) 
	})
	
	cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		softExpect(text.trim()).to.contain('Leave');
		//cy.wait(2000) 
	})
	
	// cy.get('.text-danger').click({ multiple: true, force: true })
	//cy.get('.text-danger').click()
	
})*/


it('Delete Setting of Employee Import', function() {	
	const { softAssert, softExpect } = chai;
	cy.visit(Cypress.env('url')+'Employee/Employee/EmployeeImport?import=1')
	cy.wait(2000)
	cy.get('#ddlEmployeeImportNameList').select('Approval Matrix Manager Import',{force: true})
	cy.wait(2000)	
	
	//cy.xpath("//div[@id='approvalComponentTitle']//i[@class='fas fa-upload']").click({force: true})
	cy.wait(2000)
	
	cy.get('#categoryMasterAI').select('All',{force: true})
			 cy.wait(2000)
	 cy.xpath("//select[@id='SettingNameAI']").find('option').should('have.length', 3)
	 
	 cy.get('#SettingNameAI').select(settingName2,{force: true})
			 cy.wait(2000)
	 
	cy.get('#btnDeleteSetting').click({force: true})
	 
	 cy.get(".toast-message").invoke('text').then((text) => {
	 softExpect(text.trim()).to.eq('Settings deleted successfully.!');
	 cy.wait(3000)
	  })
	  
	  cy.get('#categoryMasterAI').select('All',{force: true})
			 cy.wait(2000)
	 cy.xpath("//select[@id='SettingNameAI']").find('option').should('have.length', 2)
	// cy.get('#categoryMasterAI').select('All',{force: true})
	 cy.wait(2000)
//cy.xpath("//select[@id='SettingNameAI']").find('option').should('have.length', 2)

cy.get('#SettingNameAI').select(settingName,{force: true})
	 cy.wait(2000)

cy.get('#btnDeleteSetting').click({force: true})

cy.get(".toast-message").invoke('text').then((text) => {
softExpect(text.trim()).to.eq('Settings deleted successfully.!');
cy.wait(3000)
})

cy.get('#categoryMasterAI').select('All',{force: true})
	 cy.wait(2000)
cy.xpath("//select[@id='SettingNameAI']").find('option').should('have.length', 1)

})


})

