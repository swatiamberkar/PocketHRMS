

describe('Self service role', function () {

	var filePath = 'EmployeeImportLeave.xlsx'

	var leave = 'Paid Leave'

	beforeEach(function () {
		cy.getCookies()
	})

	it('Login to Cloud & select Company', function () {
		cy.login()
		cy.changeCompany();
	})



	context('Set Self Service Role through Import', function () {

		var filePath = 'EmployeeImportLeave.xlsx'
		var sheetName = 'SelfServiceRole'
		var Category = 'Staff'
		var settingName = 'Leave'

		var startingRow = '2'
		var endingRow = '13'


		it('Navigate to SelfService Role Import', function () {

			cy.visit(Cypress.env('url') + 'Employee/Employee/EmployeeImport?import=1')
			cy.wait(2000)
			cy.get('#ddlEmployeeImportNameList').select('SelfService Role Import', { force: true })
			cy.wait(2000)
		})

		it('Save Setting for SelfService Role', function () {
			cy.server()
			cy.wait(1000)

			cy.route('POST', Cypress.env('url') + 'Employee/Employee/SaveEmployeeImport').as('SelfServiceRole')

			cy.wait(2000)
			cy.get('#savesetting').click({ force: true })

			//setting name validation
			cy.wait(2000)
			cy.get(".toast-message").invoke('text').then((text) => {
				if (text.trim() == 'Please Select Setting') {
					cy.wait(1000)
					cy.get(".toast-message").eq(0).click({ force: true })
					cy.get('[onclick="showNewSetting()"]').click({ force: true })

					cy.wait(2000)
					cy.get('#SettingNameNew').click({ force: true })
					cy.get('#SettingNameNew').clear()
					cy.get('#SettingNameNew').type(settingName)
				}
			})


			cy.wait(1000)
			cy.get('[onclick="addNewSetting()"]').click({ force: true })


			//start && end row  validation
			cy.get('#savesetting').click({ force: true })
			cy.wait(2000)
			cy.get(".toast-message").invoke('text').then((text) => {
				if (text.trim() == 'Select Start And End Row') {
					cy.wait(1000)
					cy.get(".toast-message").eq(0).click({ force: true })
					cy.wait(1000)

					cy.get('#StartingRow').click({ force: true })
					cy.get('#StartingRow').clear()
					cy.get('#StartingRow').type(startingRow)

					cy.get('#EndingRow').click({ force: true })
					cy.get('#EndingRow').clear()
					cy.get('#EndingRow').type(endingRow)
				}
			})


			//Emp code validation
			cy.wait(1000)
			cy.get('#savesetting').click({ force: true })
			cy.wait(2000)
			cy.get(".toast-message").invoke('text').then((text) => {
				if (text.trim() == 'Select Employee Code Column') {
					cy.wait(1000)
					cy.get(".toast-message").eq(0).click({ force: true })
					cy.wait(1000)
					cy.get('#EmployeeCodeRow').select('A', { force: true })

				}
			})


			cy.wait(2000)
			//Component validation
			cy.get('#savesetting').click({ force: true })
			cy.wait(1000)
			cy.get(".toast-message").invoke('text').then((text) => {
				if (text.trim() == 'Select Component Value') {
					cy.wait(1000)
					cy.get(".toast-message").eq(0).click({ force: true })
					cy.wait(1000)
					cy.get('#SelfServiceRole').select('B', { force: true })
				}
			})


			cy.wait(1000)
			cy.get('#savesetting').click({ force: true })
			cy.wait('@SelfServiceRole').its('status').should('eq', 200)
			cy.get(".toast-message").invoke('text').then((text) => {
				expect(text.trim()).equal('Setting Saved Successfully')
				cy.get(".toast-message").eq(0).click({ force: true })

			})

		})

		it('Upload SelfService Role excel file', function () {

			cy.get('#SettingName').select(settingName, { force: true })

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
			cy.get('#ExcelSheetName').select(sheetName, { force: true })
			cy.wait(1000)
			cy.get('#uploadsetting').click({ force: true })
			cy.wait(10000)

			cy.get(".alert-success").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).contains('Excel uploaded successfully, it will get processed in background.')
				//cy.get(".toast-message").click()
			})


			cy.wait(30000)

		})

	})

	context('Set others Settings', function () {
		it(' Set generate password settings for all employee', () => {
			cy.visit(Cypress.env('url') + 'Settings/Employee/Index?module=hr&submodule=GeneratePassword')
			cy.xpath("//label[contains(text(),'Category')]").click()
			cy.wait(2000)
			cy.get('#OverWriteRad').click({ force: true })
			cy.wait(2000)
			cy.get('[name="PayslipPassword"]').eq(2).click({ force: true })
			cy.wait(2000)
			cy.get('#savesetting').click()
			cy.wait(2000)
			cy.get(".alert-warning").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).contains('Generate Password will get processed in background.')
				cy.wait(2000)
			})
			cy.wait(50000)
			//cy.wait('@GetBackGroundProcess').its('status').should('eq', 200)

			//
			cy.reload()
			cy.wait(2000)
			cy.get('.dripicons-bell').click()

			cy.get(".notification-listmenu a p").eq(0).invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).contains('Generate Password done successfully.')
				//cy.get(".toast-message").click()
			})

		})

		it('can add role alocation for leave - Manager ', () => {
			cy.get('#globalSearch').type('role allocation')
			cy.xpath("//li[contains(text(),'Role Allocation')]").click()
			cy.wait(2000)
			cy.get('#drpModule').select('Leave')
			cy.wait(1000)
			cy.get('#drpRole').select('Manager')
			cy.wait(1000)
			cy.xpath("//button[contains(text(),'Search')]").click()
			cy.wait(1000)
			cy.get('[class="chk menu"]').eq(0).click()
			cy.get('[class="chk menu"]').eq(1).click()
			cy.get('[class="chk menu"]').eq(2).click()
			cy.get('[class="chk menu"]').eq(3).click()
			cy.get('[class="chk menu"]').eq(4).click()
			cy.wait(1000)
			//click on save button
			cy.get('#savedata').click()
			//verify success message 
			cy.get(".toast-message").invoke('text').then((text) => {
				expect(text.trim()).equal('Setting Save successfully')
			})
			//click on message to close message box
			cy.get(".toast-message").click()
			cy.wait(1000)
		})
		it('can add role alocation for leave - user ', () => {
			//cy.get('#globalSearch').type('role allocation')
			//cy.xpath("//li[contains(text(),'Role Allocation')]").click()
			cy.wait(2000)
			cy.get('#drpModule').select('Leave')
			cy.wait(1000)
			cy.get('#drpRole').select('User')
			cy.wait(1000)
			cy.xpath("//button[contains(text(),'Search')]").click()
			cy.wait(1000)
			cy.get('[class="chk menu"]').eq(0).click()
			cy.get('[class="chk menu"]').eq(1).click()
			cy.get('[class="chk menu"]').eq(2).click()
			cy.get('[class="chk menu"]').eq(3).click()
			cy.get('[class="chk menu"]').eq(4).click()
			cy.wait(1000)
			//click on save button
			cy.get('#savedata').click()
			//verify success message 
			cy.get(".toast-message").invoke('text').then((text) => {
				expect(text.trim()).equal('Setting Save successfully')
			})
			//click on message to close message box
			cy.get(".toast-message").click()
			cy.wait(1000)
		})
		it('can add role alocation for Profile - user ', () => {
			//cy.get('#globalSearch').type('role allocation')
			//cy.xpath("//li[contains(text(),'Role Allocation')]").click()
			cy.wait(2000)
			cy.get('#drpModule').select('Profile')
			cy.get('#drpRole').select('User')
			cy.wait(1000)
			cy.xpath("//button[contains(text(),'Search')]").click()
			cy.wait(1000)
			cy.get('[class="chk menu"]').eq(0).click()
			cy.get('[class="chk menu"]').eq(1).click()
			cy.get('[class="chk menu"]').eq(2).click()
			cy.get('[class="chk menu"]').eq(3).click()
			cy.get('[class="chk menu"]').eq(4).click()
			cy.wait(1000)
			//click on save button
			cy.get('#savedata').click()
			//verify success message 
			cy.get(".toast-message").invoke('text').then((text) => {
				expect(text.trim()).equal('Setting Save successfully')
			})
			//click on message to close message box
			cy.get(".toast-message").click()
			cy.wait(1000)
		})
		it('can add role alocation for Profile - Manager ', () => {
			//cy.get('#globalSearch').type('role allocation')
			//cy.xpath("//li[contains(text(),'Role Allocation')]").click()
			cy.wait(2000)
			cy.get('#drpModule').select('Profile')
			cy.get('#drpRole').select('Manager')
			cy.wait(1000)
			cy.xpath("//button[contains(text(),'Search')]").click()
			cy.wait(1000)
			cy.get('[class="chk menu"]').eq(0).click()
			cy.get('[class="chk menu"]').eq(1).click()
			cy.get('[class="chk menu"]').eq(2).click()
			cy.get('[class="chk menu"]').eq(3).click()
			cy.get('[class="chk menu"]').eq(4).click()
			cy.wait(1000)
			//click on save button
			cy.get('#savedata').click()
			//verify success message 
			cy.get(".toast-message").invoke('text').then((text) => {
				expect(text.trim()).equal('Setting Save successfully')
			})
			//click on message to close message box
			cy.get(".toast-message").click()
			cy.wait(1000)
		})

		it('Set Manager Eligibility details ', () => {
			cy.get('#globalSearch').type('manager eligibility')
			cy.xpath("//li[contains(text(),'Manager Eligibility')]").click()
			cy.wait(2000)
			cy.get('[value="Manager"]').click()
			cy.get('[value="User"]').click()
			cy.get('#btnSave').click()
		})

	})

	context('Approval Matrix Manager Import', function () {

		var filePath = 'AapprovalMatrix.xlsx'
		var settingName = 'ForESS_Leave'
		var sheetName = 'Leave'
		var startingRow = '6'
		var endingRow = '6'
		var employeeCode = 'A'
		var leaderCode = 'B'
		var priority = 'C'
		var moduleName = 'D'
		var approvalMust = 'E'
		var approvalCancelRights = 'F'
		var ViewOnly = 'G'

		//  it('Navigate to Approval Matrix Manager Import', function() {

		// 		cy.visit(Cypress.env('url')+'Employee/Employee/EmployeeImport?import=1')
		// 		cy.wait(2000)
		// 		cy.get('#ddlEmployeeImportNameList').select('Approval Matrix Manager Import',{force: true})
		// 		cy.wait(2000)	
		// })


		// 	it('Save Setting for Approval Matrix Manager Import', function() {	
		// 			const { softAssert, softExpect } = chai;
		// 			cy.get('#categoryMasterAI').select('All',{force: true})
		// 	cy.wait(2000)

		// 	cy.wait(3000)
		// 	cy.get('[onclick="showNewSettingAI()"]').click({force: true})

		// 	cy.xpath("//input[@name='name']").click({force: true})
		// 	cy.wait(2000)

		// 	cy.wait(2000)
		// 	cy.get('#SettingNameNewAI').click({force: true})
		// 	cy.wait(2000)
		// 	cy.get('#SettingNameNewAI').clear().type(settingName)
		// 	cy.wait(1000)
		// 	cy.xpath("//input[@name='name']").click({force: true})
		// 	cy.wait(2000)

		// 			cy.get('#StartingRowAI').click({force: true})
		// 		cy.get('#StartingRowAI').clear().type(startingRow)

		// 		cy.get('#EndingRowAI').click({force: true})
		// 		cy.get('#EndingRowAI').clear().type(endingRow)
		// 					 cy.wait(2000)
		// 			// cy.get('#savesettingAmmendment').click({force: true})

		// 			cy.fixture(filePath, 'binary')
		// 			.then(Cypress.Blob.binaryStringToBlob)
		// 			.then(fileContent => {
		// 			cy.get('#fileAI').upload({
		// 			fileContent,
		// 			fileName: filePath,
		// 			mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		// 			encoding: 'utf8'
		// 			})
		// 			})
		// 			cy.wait(2000)

		// 			cy.get('#ExcelSheetNameAI').select(sheetName,{force: true})
		// 			cy.get('#EmployeeCodeRowAI').select(employeeCode,{force: true})
		// 			cy.get('#LeaderCode').select(leaderCode,{force: true})
		// 			cy.get('#Priority').select(priority,{force: true})
		// 			cy.get('#ModuleName').select(moduleName,{force: true})
		// 			cy.get('#ApprovalMust').select(approvalMust,{force: true})
		// 			cy.get('#AppCancelRights').select(approvalCancelRights,{force: true})
		// 			cy.get('#ViewOnly').select(ViewOnly,{force: true})

		// 			// cy.get('#checkOverWrite').click({force: true})
		// 		cy.wait(2000)
		// 		 cy.get('#savesettingAmmendment').click({force: true})
		// 		 cy.wait(2000)
		// 			 cy.get(".toast-message").invoke('text').then((text) => {
		// 			 softExpect(text.trim()).to.eq('Setting Saved Successfully');
		// 			 cy.wait(3000)
		// 				cy.get(".toast-message").click({force: true})
		// 			  })
		// 	})

		// 	it('Upload File of Employee Import', function() {	
		// 			const { softAssert, softExpect } = chai;
		// 				cy.wait(2000)
		// 			cy.get('#uploadsetting').click({force: true})
		// 				cy.wait(2000)
		// 			cy.get(".alert-success").invoke('text').then((text) => {
		// 				cy.log(text.trim())	
		// 				expect(text.trim()).contains('Excel uploaded successfully, it will get processed in background.')
		// 				//cy.get(".toast-message").click()
		// 			})
		// 			 cy.wait(40000)



		// 	})


		// 	it('Verify Imported  Module', function() {	
		// 			const { softAssert, softExpect } = chai;
		// 			cy.task('readXlsx', { file: 'cypress/fixtures/'+filePath, sheet: sheetName }).then((rows) => {
		// 				var rowsLength = rows.length;
		// 				cy.writeFile("cypress/fixtures/"+sheetName+".json", {rows})
		// 			  }) 

		// 			  cy.fixture(sheetName).then((excelData) => {
		// 				excelData.rows.forEach((data, index) => {

		// 			cy.navigate_EmployeeProfile(data.EmployeeCode)	

		// 			cy.get('#approval_matrix_tab').click({force:true})
		// 			cy.wait(5000)
		// 			cy.xpath("//div[@id='approvalmatrixbody']").find('h4').should('have.length', 1)

		// 			cy.xpath("//div[@id='approvalmatrixbody']//h4").invoke('text').then((text) => {
		// 				softExpect(text.trim()).to.contain(data.LeaderCode.trim());
		// 				cy.log("*"+data.LeaderCode+"*")
		// 				cy.wait(2000) 
		// 			})

		// 			 cy.xpath("//div[@id='approvalmatrixbody']//ul").invoke('text').then((text) => {
		// 				 softExpect(text.trim()).to.contain(data.ModuleName);
		// 				 cy.wait(2000) 
		// 			 })

		// 			})
		// 		})
		// 	})


		// 	it('Assign Manager from Approval Matrix ', () => {
		// 		var sheetName = 'ApprovalMatrix'

		// 		cy.task('readXlsx', { file: 'cypress/fixtures/' + filePath, sheet: sheetName }).then((rows) => {
		// 			var rowsLength = rows.length;
		// 			cy.writeFile('cypress/fixtures/' + sheetName + ".json", { rows })
		// 		})


		// 		cy.fixture(sheetName).then((excelData) => {
		// 			excelData.rows.forEach((data, index) => {
		// 				cy.navigate_EmployeeProfile(data.EmployeeCode)

		// 				cy.wait(2000)
		// 				cy.get('#approval_matrix_tab').click({force:true})
		// 				cy.wait(2000)
		// 				cy.get('[title="Add Approval Matrix Manager"]').eq(0).click({force: true})
		// 				cy.wait(2000)
		// 					cy.get('#select2-approvalManager-container').click({force: true})
		// 					cy.wait(2000)
		// 					cy.get('input[type="search"]').click({force: true})
		// 					cy.get('input[type="search"]').type(data.LeaderCode)
		// 					cy.wait(2000)
		// 					cy.get('.select2-results__option--highlighted').click({force: true})
		// 					cy.wait(2000)

		// 					if (data.ApprovalMust!='')
		// 					{
		// 						cy.get('#approvalmust').select('Yes')
		// 					}

		// 				if (data.ApprovedCancelRights!='')
		// 					{
		// 				cy.get('#cancelrights').select('Yes')
		// 					}
		// 				//cy.xpath("//label[contains(text(),'Daily Working Hours')]").click()
		// 				cy.get('#'+data.ModuleName+'').click({force: true})
		// 				//cy.xpath("//label[contains(text(),'On Duty')]").click()
		// 				cy.get('#btnSaveText').click()
		// 				cy.wait(2000)


		// 			})
		// 		})


		// 	})


	})

	context('Add Leave Balance through Import For Paid Leave', function () {

		//var filePath = 'Leave/LeaveCredit.xlsx'
		var settingName = 'LeaveOpening'
		var sheetName = 'ForESS_PaidLeave'
		var startingRow = '2'
		var endingRow = '4'
		var employeeCode = 'A'
		var LeaveCreditValue = 'B'
		var LeaveType = 'Paid Leave'



		it('Save Setting', function () {
			cy.server()
			cy.visit(Cypress.env('url') + 'Leave/Setting/LeaveImport')
			cy.route('POST', Cypress.env('url') + 'Leave/Setting/SaveLeaveImport').as('SaveLeaveImport')
			cy.wait(2000)
			cy.get('#excelImport').select('Leave Credit Import', { force: true })

			cy.get('[onclick="showNewSetting()"]').click({ force: true })

			cy.wait(2000)
			cy.get('#SettingNameNew').click({ force: true })
			cy.get('#SettingNameNew').clear()
			cy.get('#SettingNameNew').type(settingName)



			cy.wait(1000)

			cy.get('[onclick="addNewSetting()"]').click({ force: true })
			cy.wait(2000)

			cy.get('#StartingRow').click({ force: true })
			cy.get('#StartingRow').clear()
			cy.get('#StartingRow').type(startingRow)

			cy.get('#EndingRow').click({ force: true })
			cy.get('#EndingRow').clear()
			cy.get('#EndingRow').type(endingRow)




			cy.get('#EmployeeCodeRow').select(employeeCode, { force: true })

			cy.get('#LeaveCreditValue').select(LeaveCreditValue, { force: true })
			cy.wait(1000)
			cy.get('#savesetting').click({ force: true })
			cy.wait('@SaveLeaveImport').its('status').should('eq', 200)
			cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).equal('Record Saved successfully.!')
				cy.get(".toast-message").eq(0).click({ force: true })

			})
		})

		it('Upload Leave opening', function () {
			cy.visit(Cypress.env('url') + 'Leave/Setting/LeaveImport')
			cy.wait(1000)
			cy.get('#excelImport').select('Leave Credit Import', { force: true })
			cy.wait(2000)
			cy.get('#SettingName').select(settingName, { force: true })

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
			cy.get('#ExcelSheetName').select(sheetName, { force: true })
			cy.get('#leavType').select(LeaveType, { force: true })
			cy.wait(1000)
			cy.get('#uploadsetting').click({ force: true })
			cy.wait(3000)
			cy.get(".alert-success").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).contains('Excel uploaded successfully, it will get processed in background.')
				//cy.get(".toast-message").click()
			})

			cy.wait(15000)
		})


		// it('Verify Leave opening',function() {
		// 		const { softAssert, softExpect } = chai;
		// 		cy.task('readXlsx', { file: 'cypress/fixtures/'+filePath, sheet: sheetName }).then((rows) => {
		// 			var rowsLength = rows.length;
		// 			cy.writeFile("cypress/fixtures/"+sheetName+".json", {rows})
		// 		  }) 

		// 		cy.fixture(sheetName).then((excelData) => {
		// 		excelData.rows.forEach((data, index) => {

		// 		cy.navigate_EmployeeProfile(data.EmployeeCode)	
		// 		cy.wait(3000)
		// 		cy.get('#leave_detail_tab').click({force:true});
		// 		cy.wait(2000)

		// 		cy.get('#Leave_LeaveEntry').click({force:true})

		// 		cy.wait(5000)
		// 		cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").each(function(row, i){	
		// 		var num = parseFloat(i+1)
		// 		cy.log("num: "+num)

		// 		cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").eq(i).invoke('text').then((text) => {	
		// 		cy.log("text: "+text)
		// 			if(text.trim()==LeaveType.trim()){
		// 				expect(text).to.eq(LeaveType.trim())


		// 		cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[5]/th[2]").eq(i).invoke('text').then((availableLeave) => {	
		// 		cy.log("availableLeave: "+availableLeave)
		// 		expect(parseInt(availableLeave.trim())).to.eq(data.LeaveCreditValue)

		// 		})
		// 	}
		// })
		// 		})
		// 			})
		// 		})
		// 	})

	})

	context('Add Leave Balance through Import For Sick Leave', function () {

		//var filePath = 'Leave/LeaveCredit.xlsx'
		var settingName = 'LeaveCredit_SickLeave'
		var sheetName = 'ForESS_SickLeave'
		var startingRow = '2'
		var endingRow = '3'
		var employeeCode = 'A'
		var LeaveCreditValue = 'B'
		var LeaveType = 'Sick Leave'


		it('Save Setting', function () {
			cy.server()
			cy.visit(Cypress.env('url') + 'Leave/Setting/LeaveImport')
			cy.route('POST', Cypress.env('url') + 'Leave/Setting/SaveLeaveImport').as('SaveLeaveImport')
			cy.wait(2000)
			cy.get('#excelImport').select('Leave Credit Import', { force: true })

			cy.get('[onclick="showNewSetting()"]').click({ force: true })

			cy.wait(2000)
			cy.get('#SettingNameNew').click({ force: true })
			cy.get('#SettingNameNew').clear()
			cy.get('#SettingNameNew').type(settingName)



			cy.wait(1000)

			cy.get('[onclick="addNewSetting()"]').click({ force: true })
			cy.wait(2000)

			cy.get('#StartingRow').click({ force: true })
			cy.get('#StartingRow').clear()
			cy.get('#StartingRow').type(startingRow)

			cy.get('#EndingRow').click({ force: true })
			cy.get('#EndingRow').clear()
			cy.get('#EndingRow').type(endingRow)




			cy.get('#EmployeeCodeRow').select(employeeCode, { force: true })

			cy.get('#LeaveCreditValue').select(LeaveCreditValue, { force: true })
			cy.wait(1000)
			cy.get('#savesetting').click({ force: true })
			cy.wait('@SaveLeaveImport').its('status').should('eq', 200)
			cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).equal('Record Saved successfully.!')
				cy.get(".toast-message").eq(0).click({ force: true })

			})
		})

		it('Upload Leave Credit', function () {
			cy.visit(Cypress.env('url') + 'Leave/Setting/LeaveImport')
			cy.wait(1000)
			cy.get('#excelImport').select('Leave Credit Import', { force: true })
			cy.wait(2000)
			cy.get('#SettingName').select(settingName, { force: true })

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
			cy.get('#ExcelSheetName').select(sheetName, { force: true })
			cy.get('#leavType').select(LeaveType, { force: true })
			cy.wait(1000)
			cy.get('#uploadsetting').click({ force: true })
			cy.wait(3000)
			cy.get(".alert-success").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).contains('Excel uploaded successfully, it will get processed in background.')
				//cy.get(".toast-message").click()
			})

			cy.wait(15000)
		})



		// it('Verify Leave Credit',function() {
		// 	const { softAssert, softExpect } = chai;
		// 	cy.task('readXlsx', { file: 'cypress/fixtures/'+filePath, sheet: sheetName }).then((rows) => {
		// 		var rowsLength = rows.length;
		// 		cy.writeFile("cypress/fixtures/"+sheetName+".json", {rows})
		// 	  }) 

		// 	cy.fixture(sheetName).then((excelData) => {
		// 	excelData.rows.forEach((data, index) => {

		// 	cy.navigate_EmployeeProfile(data.EmployeeCode)	
		// 	cy.wait(3000)
		// 	cy.get('#leave_detail_tab').click({force:true});
		// 	cy.wait(2000)

		// 	cy.get('#Leave_LeaveEntry').click({force:true})

		// 	cy.wait(5000)
		// 	cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").each(function(row, i){	
		// 	var num = parseFloat(i+1)
		// 	cy.log("num: "+num)

		// 	cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").eq(i).invoke('text').then((text) => {	
		// 	cy.log("text: "+text)
		// 		if(text.trim()==LeaveType.trim()){
		// 			expect(text).to.eq(LeaveType.trim())


		// 	cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[5]/th[2]").eq(i).invoke('text').then((availableLeave) => {	
		// 	cy.log("availableLeave: "+availableLeave)
		// 	expect(parseInt(availableLeave.trim())).to.eq(data.LeaveCreditValue)

		// 	})
		// }
		// })
		// 	})
		// 		})
		// 	})
		// })

	})




})