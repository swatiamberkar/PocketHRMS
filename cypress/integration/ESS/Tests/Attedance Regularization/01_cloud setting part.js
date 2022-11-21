
describe('Attendance regularisation cloud setting part ', function() {

context('employee mapping  Process ', function() {    
	
	var url = Cypress.env('url')
	var username= 'nileshgajare@live.com'
	var userPass = '123456'
	var company= 'BBTest_25';
	//var employeeCode = 'CY4'
    var empcode = 'L6'
	
	var FinancialYear_From = Cypress.env('FinancialYear_From')
	var deviceMachineNo = 1
	var machineName = deviceMachineNo
	
	var startDate=  '01/04/'+FinancialYear_From
	var endDate ='13/04/'+FinancialYear_From
	var onDutyMonth= 'April';
	
	
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
		cy.contains('li', empcode).click({force: true})
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

	it('Navigate to Attendance Setting', function() {
		cy.visit(Cypress.env('url')+'Settings/Employee/Index?module=organization&submodule=smtpsettings')
		cy.wait(1000)
		cy.get('#attendance_detail_tab').click({force: true})
		cy.wait(1000)			
	})

	it('Employee Mapping', function() {
		
		cy.get("#Attendance_EmployeeMapping").click({force: true})
		cy.wait(2000)
			
		cy.get('#loadMachineNo').select(machineName)
		
		cy.wait(1000)
	//	cy.get('#allCheck').click()
		cy.wait(3000)
	//	cy.get('#btnDeleteEmpMapping').click({force: true})
		cy.wait(3000)
	//	cy.get(".toast-message").click()
		
		
		cy.get('#UnMapped').click({force: true})
		cy.wait(5000)
		
			cy.get('.well > #tablesorter > tbody').find('tr').each(function(row, i){
			 var num1 = parseFloat(i)+1
			 cy.get('.well > #tablesorter > tbody > tr:nth-child('+num1+') > td:nth-child(2)').invoke('text').then((text) => 
				{
					cy.log(text.trim())
					if(text.trim()==empcode)
					{
						cy.get('.well > #tablesorter > tbody > tr:nth-child('+num1+') > td:nth-child(4)').click({force: true})
			            cy.get('.well > #tablesorter > tbody > tr:nth-child('+num1+') > td:nth-child(4)').type(empcode)			
			           cy.get('.well > #tablesorter > tbody > tr:nth-child('+num1+') > td:nth-child(1)>span>.chkEmp').click({force: true})
					}
				})
			})	
			
		cy.wait(2000)
			cy.get('#btnSaveEmpMapping').click({force: true})
			cy.wait(2000)		
			cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())	
			   expect(text.trim()).equal('Records Saved Successfully.!')	
		   })
	})

	
})

context('shift detail Process ', function() {
	
	var url = Cypress.env('url')
	var username= 'nileshgajare@live.com'
	var userPass = '123456'
	var company= 'BBTest_25';
	var employeeCode = 'L6'
	
	var FinancialYear_From = Cypress.env('FinancialYear_From')
	var deviceMachineNo = 1
	var machineName = 'Machine_'+deviceMachineNo
	
	var startDate=  '01/04/'+FinancialYear_From
	var endDate ='13/04/'+FinancialYear_From
	var onDutyMonth= 'April';
	
	
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
	
    it('Navigate to Employee profile', function() {
		cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeCode)
		cy.wait(2000)
		cy.contains('li', employeeCode).click({force: true})
		cy.wait(3000)
	})


    it('Add Shift Schedule', function() {
		const { softAssert, softExpect } = chai;
		cy.wait(1000)
		cy.get('#attendance_detail_tab').click({force: true})
		cy.wait(2000)
		cy.get('#Attendance_ShiftDetails').click({force: true})
		cy.wait(5000)
		cy.xpath("//div[@id='attendanceContentTitle']//i[@class='fas fa-plus']").click()
		cy.wait(3000)
		cy.get('#ShiftName').select('General')		
		cy.wait(1000)
		
			cy.get('#dateRange').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('01/04/'+FinancialYear_From +' to 30/06/'+FinancialYear_From)
			})
			
			
			cy.wait(1000)
			cy.xpath("//button[@id='btnSave']//span[@id='btnSaveText']").click({force:true})
			cy.wait(5000)
		
			cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			softExpect(text.trim()).to.eq('Records Saved Successfully!!!');
		})
		
		cy.wait(10000)
		cy.xpath("//div[@id='attendanceContentTitle']//i[@class='fas fa-plus']").click({force: true})
		cy.wait(3000)
		cy.get('#ShiftName').select('General')		
		cy.wait(1000)
		
			cy.get('#dateRange').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('01/07/'+FinancialYear_From +' to 30/09/'+FinancialYear_From)
			})
			
			
			cy.wait(1000)
			cy.xpath("//button[@id='btnSave']//span[@id='btnSaveText']").click({force:true})
			cy.wait(5000)
		
			cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			softExpect(text.trim()).to.eq('Records Saved Successfully!!!');
		})
		
		cy.wait(10000)
		cy.xpath("//div[@id='attendanceContentTitle']//i[@class='fas fa-plus']").click({force: true})
		cy.wait(3000)
		cy.get('#ShiftName').select('General')		
		cy.wait(1000)
		
			cy.get('#dateRange').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('01/10/'+FinancialYear_From +' to 31/12/'+FinancialYear_From)
			})
			
			cy.wait(1000)
			cy.xpath("//button[@id='btnSave']//span[@id='btnSaveText']").click({force:true})
			cy.wait(5000)
		
			cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			softExpect(text.trim()).to.eq('Records Saved Successfully!!!');
		})
		
		cy.wait(10000)
		cy.xpath("//div[@id='attendanceContentTitle']//i[@class='fas fa-plus']").click({force: true})
		cy.wait(3000)
		cy.get('#ShiftName').select('General')		
		cy.wait(1000)
		
			cy.get('#dateRange').click().then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('01/01/'+FinancialYear_From +' to 31/03/'+FinancialYear_From)
			})
			
			
			cy.wait(1000)
			cy.xpath("//button[@id='btnSave']//span[@id='btnSaveText']").click({force:true})
			cy.wait(5000)
		
			cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
			softExpect(text.trim()).to.eq('Records Saved Successfully!!!');
		})
		cy.wait(5000)
	})
		
	
})

context('Machine log import Process ', function() {
	
	var url = Cypress.env('url')
	var username= 'nileshgajare@live.com'
	var userPass = '123456'
	var company= 'BBTest_25';
	var employeeCode = 'L6'
	
	var FinancialYear_From = Cypress.env('FinancialYear_From')
	var deviceMachineNo = 1
	var machineName = 'Machine_'+deviceMachineNo
	
	var startDate=  '01/10/'+FinancialYear_From
	var endDate ='13/10/'+FinancialYear_From
	var onDutyMonth= 'October';
	
	var filePath= 'machineLogImport.xlsx'
	var sheetName='MachineLogESS'
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
		
		var setting = ["In_Time"];
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

context('in out import Process ', function() {
    var url = Cypress.env('url')
	var username= 'nileshgajare@live.com'
	var userPass = '123456'
	var company= 'BBTest_25';
	var employeeCode = 'L6'
	
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

	it('In Out Import', function() {
		cy.visit(Cypress.env('url')+'Attendance/Entry/InOutImport')
		cy.wait(15000)

		cy.get('#dtDateFrom').click({force: true}).then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(startDate)
	   })	
	   
	   cy.wait(5000)
	   cy.get('#dtDateTo').click({force: true}).then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(endDate)
	   })
	   
	   cy.get('#chkWrongEntries').click({force: true})
		cy.wait(1000)
		
	   cy.get('#btnImport').click({force: true})
		cy.wait(3000)
	   
	   cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).contains('It will get processed in background.')
			//cy.get(".toast-message").click()
		})
		cy.wait(30000)
	}) 

})

context('In out details Process ', function() {
	
	var url = Cypress.env('url')
	var username= 'nileshgajare@live.com'
	var userPass = '123456'
	var company= 'BBTest_25';
	var employeeCode = 'L6'
	
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
	
	
	it('Verify imported Attendance', function() {
		 cy.wait(20000)
		const { softAssert, softExpect } = chai;
		cy.navigate_EmployeeProfile();
		cy.navigate_EmployeeAttendanceInOutDetails()
		cy.apply_InOutCoreDetailsFilter()
		
		cy.xpath("//div[@class='page-wrapper']//tr[1]//td[4]").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('09:16');
		 cy.wait(1000)
		})
		  
		cy.xpath("//div[@class='page-wrapper']//tr[2]//td[4]").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('09:00');
		 cy.wait(1000)
		})
		
		cy.xpath("//div[@class='page-wrapper']//tr[3]//td[4]").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('08:50');
		 cy.wait(1000)
		})

        cy.xpath("//div[@class='page-wrapper']//tr[9]//td[4]").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('11:30');
		 cy.wait(1000)
		})

        cy.xpath("//div[@class='page-wrapper']//tr[10]//td[4]").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('13:00');
		 cy.wait(1000)
		})

        cy.xpath("//div[@class='page-wrapper']//tr[13]//td[4]").invoke('text').then((text) => {
            softExpect(text.trim()).to.eq('12:00');
            cy.wait(1000)
           })
		  
	
	})
	
	
})

})