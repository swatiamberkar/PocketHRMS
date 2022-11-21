describe('Attendence Process ', function() {
	
	var url = Cypress.env('url')
	var username= 'nileshgajare@live.com'
	var userPass = '123456'
	var company= 'BBTest_25';
	var employeeCode = 'CY4'
	
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

	it('Add Device in Device Master', function() {
		
		cy.get('#Attendance_DeviceMaster').click({force: true})
		cy.wait(2000)
		
		cy.get('button').then(($sp) => {
		if ($sp.hasClass('mb-1')) {
		cy.xpath("//button[@class='btn buttons-bg-color btn-facebook mb-1']").click({force: true});
		} else {
		cy.xpath("//div[@id='attendanceContentTitle']//i[@class='fas fa-plus']").click({force: true});
		}
		})
		
		cy.wait(3000)
		cy.get('#MachineNo').click({force: true})
		cy.get('#MachineNo').clear()
		cy.get('#MachineNo').type(deviceMachineNo)
		
		cy.get('#MachineName').click({force: true})
		cy.get('#MachineName').clear()
		cy.get('#MachineName').type(machineName)
		
		cy.get('#Location').click({force: true})
		cy.get('#Location').clear()
		cy.get('#Location').type('Mumbai')
		
		cy.get('#btnSaveDeviceMaster').click({force: true})
		cy.wait(5000)		
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())	
			expect(text.trim()).equal('Machine Details Saved Successfully.!')
		})
	})

	
	
})