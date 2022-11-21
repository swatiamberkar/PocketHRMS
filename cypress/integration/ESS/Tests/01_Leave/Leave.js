import Leave from '../../../ESS/Pages/Leave/Leave_Flow (1)';
describe('Manager is not assigned for the employee.', function () {
	const leave = new Leave()

	var managerID = 'L2'
	var employeeID = 'L6'
	var leaveType = 'Paid Leave'
	var leaveType1 = 'Sick Leave'
	
	var moment = require('moment');
	const Day = moment().format('DD')
	const Day1 = parseInt(Day) + 1
	const Day2 = parseInt(Day) - 1
	const Month = moment().format('MM')
	const year = moment().format('YYYY')
	const yasterdayDate = moment().subtract(1, "days").format("DD/MM/YYYY");
	const currentDate = Day + '/' + Month + '/' + year
	const tomorrowDate = Day1 + '/' + Month + '/' + year

	beforeEach(function () {
		cy.getCookies()
		cy.getCookies_ESS()

	})
/*	
context('Assign self service role and change password', function () {

	it('Login to Cloud & select Company', function() {
			cy.login()
			cy.changeCompany();		
	})

	it('Apply self service role for L2',function(){
		cy.navigate_EmployeeProfile(managerID)
		cy.wait(2000)
		cy.get('#profile_detail_tab').click()
		cy.wait(1000)
		cy.get('#Profile_SelfServiceRole').click()
		cy.wait(1000)
		cy.get('[name="SelfServiceRole"]').select('Manager')
		cy.get('[value="Save"]').click()
		cy.wait(2000)
	})
	it('Apply self service role for L6',function(){
		cy.navigate_EmployeeProfile(employeeID)
		 cy.wait(2000)
		 cy.get('#profile_detail_tab').click()
		 cy.wait(1000)
		 cy.get('#Profile_SelfServiceRole').click()
		 cy.wait(1000)
		 cy.get('[name="SelfServiceRole"]').select('User')
		 cy.get('[value="Save"]').click()
		 cy.wait(2000)
	})
	it (' Set generate password settings for all employee',() => {
		cy.visit(Cypress.env('url')+'Settings/Employee/Index?module=hr&submodule=GeneratePassword') 
		cy.xpath("//label[contains(text(),'Category')]").click()
		cy.wait(2000)
		cy.get('#OverWriteRad').click({force:true})
		cy.wait(2000)
		cy.get('[name="PayslipPassword"]').eq(2).click({force:true})
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
})*/

context('verify validation mesasage for manager is not set', function () {

	it(' ESS login page',function(){

        cy.EssLogin(employeeID, employeeID)
		cy.visit(Cypress.env('essUrl')+'Leave/Transaction/LeaveRequest?Menu=leave')
    })
	it(' verify validation message for Manager is not assigned for the employee.',function(){
		//cy.get('#Layer_1').click()
		cy.wait(2000)
		//cy.get('[data-menu="Request"]').click()
        cy.wait(1000)
		//verify validation message
		cy.get(".alert-warning").invoke('text').then((text) => {
			expect(text.trim()).equal('Manager is not assigned for the employee.')
		})
		cy.wait(1000)
	})
	
})

context('Set maager - Cloud Setting', function () {
		
	it('Login to Cloud & select Company', function() {
		cy.login()
		cy.changeCompany();		
	})
    
	it ('Assign Manager from Approval Matrix ',() => {

		leave.SetManager(employeeID, managerID)
	})
})

context('check leave opening - ESS', function () {

	var leaveFromDate = '14/11/2022'
	//var leaveToDate = currentDate
	var leaveToDate = '14/11/2022'

	var leave = 'Paid Leave'

	beforeEach(function () {
		cy.getCookies()
		cy.getCookies_ESS()

	})

	it('Login to ESS and visit leave reques page',function(){

        cy.EssLogin(employeeID, employeeID)
		cy.visit(Cypress.env('essUrl')+'Leave/Transaction/LeaveRequest?Menu=leave')
    })

	it('verify validation message - Leave Opening is 0 ',function(){
		//
		cy.get('#drpLeaveType').select('Paid Leave')
		//
		cy.get('#txtFromDate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(leaveFromDate)
	    })
		//
		cy.get('#txtToDate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(leaveToDate)
	    })
		//click on add button
		cy.get('#btnAdd').click()
		//verify validation message
		cy.get(".noty_body").invoke('text').then((text) => {
			expect(text.trim()).equal('Leave Opening is 0')
		})
		cy.wait(1000)
		//click on message to close message box
		cy.get(".noty_body").click()
	})

})

context('Set leave opening- cloud', function () {

	it('Login to Cloud & select Company', function() {
		cy.login()
		cy.changeCompany();		
	})

	it('Add Leave Opening',function(){
		leave.AddLeaveOpening(employeeID, leaveType)
	})
	it('Add Leave Opening',function(){
		leave.AddLeaveOpening(employeeID, leaveType1)
	})
   
})

context('verify all validation message - ESS', function () {

	var moment = require('moment');
	const Day = moment().format('DD')
	const Day1 = parseInt(Day) + 1
	const Day2 = parseInt(Day) - 1
	const Month = moment().format('MM')
	const year = moment().format('YYYY')
	const yasterdayDate = moment().subtract(1, "days").format("DD/MM/YYYY");
	const currentDate = Day + '/' + Month + '/' + year
	const tomorrowDate = Day1 + '/' + Month + '/' + year

	var admin = ''
	var managerID = ''
	var managerName = 'Timesheet'

    var empcode = 'L2'
	var lastname = 'MGR1'
	var firstname = 'Leave'
	
    var manager = 'L2 - Leave   MGR1'
	var dateofjoining = '01/07/2019'
	var employeeID = 'L6'
	var managerID = 'L2'
	var leaveType = 'Paid Leave'
	var leaveTypeValue = 'PL'
	//var leaveFromDate = currentDate
	var leaveFromDate = '14/11/2022'
	//var leaveToDate = currentDate
	var leaveToDate = '14/11/2022'
	var fromdate = '15/11/2022'
	var todate = '16/11/2022'
	var leaveFromDayType = 'FULL DAY'
	var leaveToDayType = 'FULL DAY'
	var leaveDay = '1'

	before(function () {

		//cy.fixture('TestData/OnDuty').then(function (data) {
			//this.data = data
			//console.log(this.data)
			//admin = data.admin
			//managerID = data.managerID
			//employeeID = data.employeeID
		//})
	})

	beforeEach(function () {
		cy.getCookies()
		cy.getCookies_ESS()

	})

	it(' ESS login page',function(){

        cy.EssLogin(employeeID, employeeID)
		cy.visit(Cypress.env('essUrl')+'Leave/Transaction/LeaveRequest?Menu=leave')
    })
	
    it('verify manager and date of joining',function(){

		cy.xpath("//p[contains(text(),'01/07/2019')]").invoke('text').then((text) => {
			expect(text.trim()).equal(dateofjoining)
		})
		/*

		cy.get(".mb-0").eq(1).invoke('text').then((text) => {
			expect(text.trim()).contains(empcode)
			expect(text.trim()).contains(firstname)
			expect(text.trim()).contains(lastname)

		
		})*/

	})
	
	it('verify validation message - Select Type Of Leave',function(){
        //click on add button
		cy.get('#btnAdd').click()
		//verify validation message
		cy.get(".noty_body").invoke('text').then((text) => {
			expect(text.trim()).equal('Select Type Of Leave')
		})
		cy.wait(1000)
		//click on message to close message box
		cy.get(".noty_body").click()	
	})
	it('verify validation message - Enter From date',function(){

		cy.get('#drpLeaveType').select('Paid Leave')
         //click on add button
		cy.get('#btnAdd').click()
		//verify validation message
		cy.get(".noty_body").invoke('text').then((text) => {
			expect(text.trim()).equal('Enter From date')
		})
		cy.wait(1000)
		//click on message to close message box
		cy.get(".noty_body").click()
		cy.wait(1000)

	})
	
	it('verify validation message - Enter To date',function(){

		cy.get('#txtFromDate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(leaveFromDate)
	    })
         //click on add button
		cy.get('#btnAdd').click({force:true})
		//verify validation message
		cy.get(".noty_body").invoke('text').then((text) => {
			expect(text.trim()).equal('Enter To date')
		})
		cy.wait(1000)
		//click on message to close message box
		cy.get(".noty_body").click()
	})
	it('verify validation message - To date is less than from date ',function(){
       // cy.get('#txtReason').click()
		cy.wait(1000)

		cy.get('#txtToDate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('12/10/2022')
	         })
			 cy.get('#txtReason').click()
			 cy.wait(1000)
         //click on add button
		 cy.get('#btnAdd').click({force:true})
		//verify validation message
		cy.get(".noty_body").invoke('text').then((text) => {
			expect(text.trim()).equal('To date is less than from date')
		})
		cy.wait(1000)
		//click on message to close message box
		cy.get(".noty_body").click()
	})


	it('verify validation message - select full day in to date insted of second half',function(){
		// cy.get('#txtReason').click()
		 cy.wait(1000)
		 cy.get('#txtFromDate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(fromdate)
	    })
 
		 cy.get('#txtToDate').click().then(input => {
			 input[0].dispatchEvent(new Event('input', { bubbles: true }))
			 input.val(todate)
		})
        //
		cy.get('#drpFromLeaveTyp').select('FULL DAY')
		//
		cy.get('#drpToLeaveTyp').select('SECOND HALF DAY')

			  cy.get('#txtReason').click()
			  cy.wait(1000)
		  //click on add button
		  cy.get('#btnAdd').click({force:true})
		 //verify validation message
		 cy.get(".noty_body").invoke('text').then((text) => {
			 expect(text.trim()).equal('Select full day in to date instead of second half')
		 })
		 cy.wait(1000)
		 //click on message to close message box
		 cy.get(".noty_body").click()
	 })
	 it('verify validation message - select full day in from date insted of first half',function(){
		// cy.get('#txtReason').click()
		 cy.wait(1000)
		 cy.get('#txtFromDate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(fromdate)
	    })
 
		 cy.get('#txtToDate').click().then(input => {
			 input[0].dispatchEvent(new Event('input', { bubbles: true }))
			 input.val(todate)
		})
        //
		cy.get('#drpFromLeaveTyp').select('FIRST HALF DAY')
		//
		cy.get('#drpToLeaveTyp').select('FULL DAY')

			  cy.get('#txtReason').click()
			  cy.wait(1000)
		  //click on add button
		  cy.get('#btnAdd').click({force:true})
		 //verify validation message
		 cy.get(".noty_body").invoke('text').then((text) => {
			 expect(text.trim()).equal('Select full day in from date instead of first half')
		 })
		 cy.wait(1000)
		 //click on message to close message box
		 cy.get(".noty_body").click()
	 })
	 it('verify validation message - Day type should be same.',function(){
		// cy.get('#txtReason').click()
		 cy.wait(1000)
		 cy.get('#txtFromDate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(fromdate)
	    })
 
		 cy.get('#txtToDate').click().then(input => {
			 input[0].dispatchEvent(new Event('input', { bubbles: true }))
			 input.val(fromdate)
		})
        //
		cy.get('#drpFromLeaveTyp').select('FIRST HALF DAY')
		//
		cy.get('#drpToLeaveTyp').select('SECOND HALF DAY')

			  cy.get('#txtReason').click()
			  cy.wait(1000)
		  //click on add button
		  cy.get('#btnAdd').click({force:true})
		 //verify validation message
		 cy.get(".noty_body").invoke('text').then((text) => {
			 expect(text.trim()).equal('Day type should be same.')
		 })
		 cy.wait(1000)
		 //click on message to close message box
		 cy.get(".noty_body").click()
	 })


	it('verify success mssage - Leave Applied Successfully!!! ',function(){
       // cy.get('#txtReason').click()
		cy.wait(1000)

		cy.get('#txtFromDate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(leaveFromDate)
	    })

		cy.get('#txtToDate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(leaveToDate)
	         })
			 cy.wait(1000)
			 cy.get('#txtReason').click()
			 cy.wait(1000)

			 //
		cy.get('#drpFromLeaveTyp').select('FULL DAY')
		//
		cy.get('#drpToLeaveTyp').select('FULL DAY')

         //click on add button
		 cy.get('#btnAdd').click({force:true})
		cy.wait(5000)
		cy.get('#btnConfirm').click()
		//cy.get('[onclick="return FillData()"]').click({force:true})
		cy.wait(3000)
		//verify validation message
		cy.get(".noty_body").invoke('text').then((text) => {
			expect(text.trim()).equal('Leave Applied Successfully!!!')
		})
		cy.wait(1000)
		//click on message to close message box
		//cy.get(".noty_body").click()
	})
	it('verify validation message - Leave already applied for this date ',function(){
		//
		cy.get('#drpLeaveType').select('Paid Leave')
		//
		cy.get('#txtFromDate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(leaveFromDate)
	    })
		//
		cy.get('#txtToDate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(leaveToDate)
	    })
		//click on add button
		cy.get('#btnAdd').click()
		//verify validation message
		cy.get(".noty_body").invoke('text').then((text) => {
			expect(text.trim()).equal('Leave already applied for this date')
		})
		cy.wait(1000)
		//click on message to close message box
		cy.get(".noty_body").click()
	})

	it('verify validation message - Select Reliver ',function(){
		//
		cy.get('#drpLeaveType').select('Sick Leave')
		cy.wait(1000)
		//
		cy.get('#txtFromDate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('04/10/2022')
	    })
		//
		cy.get('#txtToDate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('08/10/2022')
	   })
	   cy.get('#btnAdd').click({force:true})
	   //verify validation message
	   cy.get(".noty_body").invoke('text').then((text) => {
		   expect(text.trim()).equal('Select Reliver')
	   })
	   cy.wait(1000)
	   //click on message to close message box
	   cy.get(".noty_body").click()
	   //
	   cy.get('#select2-multiEmp-container').click()
	   //
	   cy.get('.select2-search__field').type('L2')
	   cy.get('#select2-multiEmp-results').click()
	   //click on addbutton
	   cy.get('#btnAdd').click({force:true})
	   //
	   cy.get('#btnConfirm').click()
	   cy.wait(2000)
	})
	it('verify validation message - Selected Reliver is aleardy assign as a Reliver. ',function(){
		//
		cy.get('#drpLeaveType').select('Sick Leave')
		cy.wait(1000)
		//
		cy.get('#txtFromDate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('04/10/2022')
	    })
		//
		cy.get('#txtToDate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('08/10/2022')
	   })

	   //
	   cy.get('#select2-multiEmp-container').click()
	   //
	   cy.get('.select2-search__field').type('L2')
	   cy.get('#select2-multiEmp-results').click()
	   //click on add button
	   cy.get('#btnAdd').click({force:true})
	   //verify validation message
	   cy.get(".noty_body").invoke('text').then((text) => {
		   expect(text.trim()).equal('Selected Reliver is aleardy assign as a Reliver.')
	   })
	   cy.wait(1000)
	   //click on message to close message box
	   cy.get(".noty_body").click()
	})


	it('delete record',function(){

		cy.get('[value="Cancel"]').eq(0).click()
		//verify validation message
		cy.get(".noty_body").invoke('text').then((text) => {
			expect(text.trim()).equal('Leave Cancelled!')
		})
		cy.wait(1000)
		//click on message to close message box
		cy.get(".noty_body").click()

	})
	
	


	/*
	it('verify success mssage ',function(){
		cy.fixture(filePath, 'binary')
		.then(Cypress.Blob.binaryStringToBlob)
		.then(fileContent => {
		//cy.xpath("//input[@id='File']").upload({
		cy.get("#File").upload({
		fileContent,
		fileName: filePath,
		mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
		encoding: 'utf8'
		})
		})
		cy.wait(2000)
         //click on add button
		cy.get('#btnAdd').click()
		cy.get('#btnConfirm').click()
		//verify validation message
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Leave Aplied Successfully!!!')
		})
		//click on message to close message box
		cy.get(".toast-message").click()
	})*/

		


})

})


