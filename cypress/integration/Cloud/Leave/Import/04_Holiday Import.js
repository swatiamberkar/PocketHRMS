describe('Holiday Import', function() {
	
	var Holidayfile='Leave/HolidayImport.xlsx';
	var sheetName = 'Holiday'
	var employeeId = 'CY1'
	
    it('successfully page  loads', function() {
		cy.clearLocalStorage() ;
		cy.window().then((win) => {
			win.sessionStorage.clear()
		})
		cy.clearCookies();
		cy.visit(Cypress.env('url')) 
	})
	
	before(function()
	{
		cy.task('readXlsx', { file: 'cypress/fixtures/'+Holidayfile, sheet: sheetName }).then((rows) => {
			var rowsLength = rows.length;
			cy.writeFile("cypress/fixtures/Leave/"+sheetName+".json", {rows})
		  })
	})
	beforeEach(function(){
        cy.getCookies()
	})

	it('Login to Cloud & select Company', function() {
		cy.login()
		cy.changeCompany();		
	})
	
	 

	
	it('Save Setting for Holiday',function() {
		cy.server()	
		cy.visit(Cypress.env('url')+'Leave/Setting/LeaveImport')
		cy.route('POST', Cypress.env('url')+'Leave/Setting/SaveLeaveImport').as('SaveLeaveImport')
		cy.wait(2000)
		cy.get('#excelImport').select('Holiday Import',{force: true})
		cy.wait(3000)
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
			  cy.get('#SettingNameNew').type('HolidayImport')
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
		 //Leave opening column   validation
		cy.get('#savesetting').click({force: true})
		cy.wait(1000)
		 cy.get(".toast-message").invoke('text').then((text) => {
			if(text.trim()=='Please Set All Excel Matching Column')	{
			cy.wait(1000)
			cy.get(".toast-message").eq(0).click({force: true})
			 cy.wait(1000)
			 cy.get('#HolidayDate').select('A',{force: true})
			 cy.wait(2000)
			 cy.get('#ReasonHoliday').select('B',{force: true})
			 cy.get('#OptionalHoliday').select('C',{force: true})
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
	 	
	
	it('Upload Holiday',function() {
		cy.visit(Cypress.env('url')+'Leave/Setting/LeaveImport')
		cy.wait(2000)
		cy.get('#excelImport').select('Holiday Import',{force: true})
		cy.wait(2000)
		cy.get('#SettingName').select('HolidayImport',{force: true})
		
		cy.wait(1000)
		cy.fixture(Holidayfile, 'binary')
		.then(Cypress.Blob.binaryStringToBlob)
		.then(fileContent => {
		cy.get('#file').upload({
		fileContent,
		fileName: Holidayfile,
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
	})

it('Verify imported Holiday in Holiday Setting', function() {
	cy.visit(Cypress.env('url')+'Settings/Employee/Index?module=leave&submodule=holiday')
	cy.wait(2000)
	cy.fixture("Leave/"+sheetName+".json",).then((excelData) => {
	  excelData.rows.forEach((data, index) => {
		cy.get(".media-body>h4").eq(index).invoke('text').then((text) => {
			expect(text.trim()).to.equal(data.HolidayDate)
		})
		cy.get(".media-body > .list-inline > .list-inline-item").eq(index).invoke('text').then((text) => {
			expect(text.trim()).eq(data.ReasonForHoliday)
		})
		if(data.OptionalHoliday == '1')
		{
			cy.get('body').find('#showicon_Y').its('length').then(res=>{
				expect(res).eq(1)
			})
		}
	  });
	})
})
it('Verify imported Holiday in Employee profile', function() {
	cy.navigate_EmployeeProfile(employeeId)
	cy.get('#leave_detail_tab').click();
	cy.wait(2000)
	cy.get('#Leave_HolidayList').click();
	cy.wait(2000)
	cy.fixture("Leave/"+sheetName+".json",).then((excelData) => {
	  excelData.rows.forEach((data, index) => {
		cy.get(".media-body>h4").eq(index).invoke('text').then((text) => {
			expect(text.trim()).to.equal(data.HolidayDate)
		})
		cy.get(".media-body > .list-inline > .list-inline-item").eq(index).invoke('text').then((text) => {
			expect(text.trim()).eq(data.ReasonForHoliday)
		})
		cy.log(data.OptionalHoliday)
		if(data.OptionalHoliday == '1')
		{
			cy.get('body').find('#showicon_Y').its('length').then(res=>{
				expect(res).eq(1)
			})
		}
	  });
	})
})

})