describe('Attendence Process ', function() {
	
	var url = Cypress.env('url')
	var username= 'nileshgajare@live.com'
	var userPass = '123456'
	var company= 'BBTest_25';
	var employeeCode = 'CY4'
	
	var FinancialYear_From = Cypress.env('FinancialYear_From')
	var deviceMachineNo = 1
	var machineName = 'Machine_'+deviceMachineNo
	
	var startDate=  '01/10/'+FinancialYear_From
	var endDate ='13/10/'+FinancialYear_From
	var onDutyMonth= 'October';
	
	var filePath= 'machineLogImport.xlsx'
	var sheetName='MachineLog'
	var startingRow ='2'
	var endingRow ='19'
	
	var machineNo ='A'
	var deviceEnrollNo ='B'
	var inOutDate ='C'
	var inTime ='D'
	var outTime ='E'

	

	beforeEach(function(){
		cy.getCookies()
		})
		
	
	Cypress.Commands.add('navigate_EmployeeProfile',()=>{
     cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeCode)
		cy.wait(2000)
		cy.contains('li', employeeCode).click({force: true})
		cy.wait(3000)
	})
	
	Cypress.Commands.add('navigate_EmployeeAttendanceInOutDetails',()=>{
		cy.wait(1000)
		cy.get('#attendance_detail_tab').click({force: true})
		cy.wait(2000)
		cy.xpath("//div[@id='attendance_detail']//li[2]").click({force: true})
		cy.wait(10000)
	})
	
	Cypress.Commands.add('apply_InOutCoreDetailsFilter',()=>{
		cy.get('#attendanceContentTitle a:nth-child(2)').click({force: true})
		cy.wait(2000)
	
		cy.get('#StartDate').click({force: true}).then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(startDate)
		})	
	   
		cy.wait(5000)
	   	cy.get('#EndDate').click({force: true}).then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(endDate)
	   })
	    
	   cy.get('#btnFilterEarningDeduction').click({force: true})
	   cy.wait(5000)
	})

	it('Pocket HRMS Login', function() {
		cy.login()
	})
	
	it('Change Company', function() {		 
		cy.changeCompany();	 
	
	})
	
	it('Navigate to Employee profile', function() {
		cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeCode)
		cy.wait(2000)
		cy.contains('li', employeeCode).click({force: true})
		cy.wait(3000)
	})
	
	
	it('Machine Log Import', function() {
		
		var setting = ["In_Time", "Out_Time"];
		for(let time = 0; time < setting.length; time++) {
			
		var settingName = setting[time]
		cy.log("settingName: "+settingName)
		if(settingName =='In_Time')
		{
			var inOutTime =inTime
		}
		else
		{
			var inOutTime =outTime
		}
		 
		cy.visit(Cypress.env('url')+'Attendance/Settings/AttendanceImport#')
		cy.wait(2000)	
		cy.get('#excelImport').select('Machine Log Import',{force: true})
		cy.wait(2000)

		cy.get('#SettingName').find('option').then(listing => {
            var len = Cypress.$(listing).length; 
			cy.log(len)			
            if (len == 1 ) {
				cy.get('a[onclick="showNewSetting()"]').click({force: true})
				
				cy.get('#SettingNameNew').click({force: true})
				cy.get('#SettingNameNew').clear()
				cy.get('#SettingNameNew').type(setting[time])
				
				cy.get("input[name='name']").click({force: true})
			}
			else if (len == 2 ) {
				cy.get('a[onclick="showNewSetting()"]').click({force: true})
				
				cy.get('#SettingNameNew').click({force: true})
				cy.get('#SettingNameNew').clear()
				cy.get('#SettingNameNew').type(setting[time])
				
				cy.get("input[name='name']").click({force: true})
			}
			else{
				
			}
		})
		
		
		cy.wait(2000)
		cy.get('#SettingName').select(settingName, {force: true})
	

		cy.wait(2000)	
		cy.get('#StartingRow').click({force: true})		
		cy.get('#StartingRow').clear()
		cy.get('#StartingRow').type(startingRow)
		
		cy.get('#EndingRow').click({force: true})		
		cy.get('#EndingRow').clear()
		cy.get('#EndingRow').type(endingRow)
		
		cy.get('#MachineNo').select(machineNo, {force: true})
		cy.get('#DeviceEnrollNo').select(deviceEnrollNo, {force: true})
		cy.get('#InOutDate').select(inOutDate, {force: true})
		cy.get('#InOutTime').select(inOutTime, {force: true})
		
		

		cy.get('#savesetting').click()
		cy.wait(3000)		
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Record Saved successfully.!')
			//cy.get(".toast-message").click()
		})
		cy.get('.dripicons-menu').click()
		cy.reload()
		cy.visit(Cypress.env('url')+'Attendance/Settings/AttendanceImport#')
		cy.wait(2000)	
		cy.get('#excelImport').select('Machine Log Import',{force: true})
		cy.wait(2000)
		cy.get('#SettingName').select(settingName, {force: true})
		cy.wait(5000)
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
		cy.wait(3000)
		cy.get('#ExcelSheetName').select(sheetName, {force: true})
		cy.wait(3000)
		cy.get('#uploadsetting').click({force: true})
		cy.wait(10000)
		
		cy.get(".alert-success").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).contains('Excel uploaded successfully, it will get processed in background.')
			//cy.get(".toast-message").click()
		})
		cy.wait(20000)
		}


	})

	
})