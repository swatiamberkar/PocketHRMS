import Leave from '../../integration/Leave/Pages/Leave/Leave_Flow ';


describe('Verify validation with Reliver', function () {
	const leave = new Leave()

	var moment = require('moment');
	const Day = moment().format('DD')
	const Day1 = parseInt(Day) + 1	
	const Day2 = parseInt(Day) - 1
	const Month = moment().format('MM')
	const year = moment().format('YYYY')
	const yasterdayDate = moment().subtract(1, "days").format("DD/MM/YYYY");
	const todayDate = Day + '/' + Month + '/' + year
	const tomorrowDate = Day1 + '/' + Month + '/' + year

	var employeeID = 'CY5'
	var EmployeeFirstName = 'Incometax'
	var EmployeeLastName = 'test'
	var employeeJoiningDate = '02/02/2019'
	var managerID = 'CY2'
	var ManagerFirstName = 'Increment '
	var ManagerLastName = 'test'
	var admin = 'CY1'
	var leaveType = 'Paid Leave'
	var leaveTypeValue = 'PL'
	var leaveFromDate = todayDate
	//var leaveFromDate = '13/10/2022'
	var leaveToDate = todayDate
	//var leaveToDate = '13/10/2022'
	var leaveFromDayType = 'FULL DAY'
	var leaveToDayType = 'FULL DAY'
	var leaveDay = '1'
	var Reason = 'Office Metting'
	var LeaveStation = 'Yes'
	var VacationAddress = 'Pune'
	var ContactNumber = '9876543210'
	var ReliverSetting = 'Yes'
	var ReliverCode = 'CY4'
	var ReliverName = 'Attendance test'

	var APPROVERS = 'level  1'
	var STATUS = 'Pending'
	var MANAGERREMARKS = ''


	beforeEach(function () {
		cy.getCookies()
	})
	
	
	context('Cloud Part',function(){

		it('Login to Cloud',function(){
			cy.login()
			cy.changeCompany();
		})
	
		// it('Set Self Service Role',function(){
		// 	leave.SetSelfServiceRole(employeeID, 'User')
		// })
	
		// it('Set Password',function(){
		// 	leave.SetPassword(employeeID)
		// })
	
		it('Set Manager',function(){
			leave.SetManager(employeeID, managerID)
		})
	
		// it('Add Leave Opening',function(){
		// 	leave.AddLeaveOpening(employeeID, leaveType)
		// })
	
	})

	
	context('ESS Part',function(){

	it('Verify validation message - Select Reliever ',function(){
		cy.EssLogin(employeeID, employeeID)
		cy.visit(Cypress.env('essUrl')+'Leave/Transaction/LeaveRequest?Menu=leave')
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
           expect(text.trim()).equal('Select Reliever')
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

    it('verify validation message - Selected Reliever is aleardy assign as a Reliever. ',function(){
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
	   cy.wait(4000)
       cy.get('#select2-multiEmp-results').click()
	   cy.wait(4000)
	   cy.get('#txtReason').click({force: true})
       //click on add button
       cy.get('#btnAdd').click({force:true})
       //verify validation message
       cy.get(".noty_body").invoke('text').then((text) => {
           expect(text.trim()).equal('Selected Reliever is aleardy assign as a Reliever.')
       })
       cy.wait(1000)
       //click on message to close message box
       cy.get(".noty_body").click()
	   cy.get(':nth-child(9) > .btn').click({force:true})

    })

	
})
})



describe('Leave Applied and Approved with Reliver', function () {
	const leave = new Leave()
	
	var moment = require('moment');
	const Day = moment().format('DD')
	const Day1 = parseInt(Day) + 1	
	const Day2 = parseInt(Day) - 1
	const Month = moment().format('MM')
	const year = moment().format('YYYY')
	const yasterdayDate = moment().subtract(1, "days").format("DD/MM/YYYY");
	const todayDate = Day + '/' + Month + '/' + year
	const tomorrowDate = Day1 + '/' + Month + '/' + year

	var employeeID = 'L9'
	var EmployeeFirstName = 'Leave'
	var EmployeeLastName = 'User 4'
	var employeeJoiningDate = '02/02/2019'
	var managerID = 'L2'
	var ManagerFirstName = 'Leave'
	var ManagerLastName = 'MGR1'
	var admin = 'CY1'
	var leaveType = 'Sick Leave'
	var leaveTypeValue = 'SL'
	var leaveFromDate = todayDate
	//var leaveFromDate = '13/10/2022'
	var leaveToDate = todayDate
	//var leaveToDate = '13/10/2022'
	var leaveFromDayType = 'FULL DAY'
	var leaveToDayType = 'FULL DAY'
	var leaveDay = '1'
	var Reason = 'Office Metting'
	var LeaveStation = 'Yes'
	var VacationAddress = 'Pune'
	var ContactNumber = '9876543210'
	var ReliverSetting = 'Yes'
	var ReliverCode = 'L3'
	var ReliverName = 'Leave MGR 2'

	var APPROVERS = 'level  1'
	var STATUS = 'Pending'
	var MANAGERREMARKS = ''

	
	beforeEach(function () {
		cy.getCookies()
	})
	
	context('Cloud Part',function(){

		it('Login to Cloud',function(){
			cy.login()
			cy.changeCompany();
		})
	
		// it('Set Self Service Role',function(){
		// 	leave.SetSelfServiceRole(employeeID, 'User')
		// })
	
		// it('Set Password',function(){
		// 	leave.SetPassword(employeeID)
		// })
	
		it('Set Manager',function(){
			leave.SetManager(employeeID, managerID)
		})
	
		 it('Add Leave Opening',function(){
		 	leave.AddLeaveOpening(employeeID, leaveType)
		 })
	
	})

	
	context('ESS Part',function(){


	it('Apply Leave with Reliver',function(){
        cy.EssLogin(employeeID, employeeID)
        leave.applyLeave(employeeID,EmployeeFirstName,EmployeeLastName, managerID,
			ManagerFirstName, ManagerLastName, leaveType, leaveTypeValue, leaveFromDate, leaveToDate, todayDate, employeeJoiningDate, 
			 leaveFromDayType, leaveToDayType, Reason, LeaveStation,VacationAddress, ContactNumber, ReliverCode, ReliverName,
			 APPROVERS, STATUS, MANAGERREMARKS, ReliverSetting, leaveDay)	
    })		

	it('Verify Notification at Manager ', function() {
        cy.EssLogin(managerID, managerID)
		cy.wait(5000)
        leave.verifyNotificationAtManager(employeeID)
       
    })	

	// it('Verify Requsted Leave Details At Manager', function () {
	// 	//cy.EssLogin(managerID, managerID)
	// 	leave.verifyRequstedLeaveDetailsAtManager(employeeID,EmployeeFirstName,EmployeeLastName, managerID,
	// 		ManagerFirstName, ManagerLastName, leaveType, leaveTypeValue, leaveFromDate, leaveToDate, todayDate, employeeJoiningDate, 
	// 		 leaveFromDayType, leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
	// 		 APPROVERS, STATUS, MANAGERREMARKS)
	// })
	

	it('Approve Leave at Manager', function () {
		//cy.EssLogin(managerID, managerID)
		leave.approveLeave(employeeID, leaveType, leaveTypeValue, leaveFromDate)
	})

	it('Verify Leave in Team Report', function () {
		cy.wait(5000)
		cy.EssLogin(managerID, managerID)
		leave.verifyLeaveInTeamReport(employeeID, leaveFromDate)
	})

	it('verify Notification At Reliver', function () {
		cy.wait(5000)
		cy.EssLogin(ReliverCode, ReliverCode)
		leave.verifyNotificationAtReliver(employeeID, EmployeeFirstName, EmployeeLastName, leaveFromDate, leaveToDate)
	})

	
	it('Verify Notification at Employee', function () {
		cy.EssLogin(employeeID, employeeID)
		leave.verifyNotificationAtEmployee(employeeID )
	})

	it('Verify Status at Employee', function () {
		cy.EssLogin(employeeID, employeeID)
		leave.verifyStatusAtEmployee(leaveFromDate )
	})

	it('Verify Leave in My Report', function () {
		cy.EssLogin(employeeID, employeeID)
		leave.verifyLeaveInMyReport(leaveFromDate)	
	})

	it('Verify Leave in Employee Report', function () {
		cy.EssLogin(admin, admin)
		leave.verifyLeaveInEmployeeReport(admin, employeeID, leaveFromDate )
	})

})
})



describe('Leave Applied with Reliver, but show validation Because Reliver is already on Leave (Leave pending)', function () {
	const leave = new Leave()

	var moment = require('moment');
	const Day = moment().format('DD')
	const Day1 = parseInt(Day) + 1	
	const Day2 = parseInt(Day) - 1
	const Month = moment().format('MM')
	const year = moment().format('YYYY')
	const yasterdayDate = moment().subtract(1, "days").format("DD/MM/YYYY");
	const todayDate = Day + '/' + Month + '/' + year
	const tomorrowDate = Day1 + '/' + Month + '/' + year



	beforeEach(function () {
		cy.getCookies()
	})
	
	context('Apply Leave by Reliver',function(){
	var employeeID = 'L8'
	var EmployeeFirstName = 'Leave'
	var EmployeeLastName = 'User 3'
	var employeeJoiningDate = '01/07/2021'
	var managerID = 'CY2'
	var ManagerFirstName = 'Increment '
	var ManagerLastName = 'test'
	var admin = 'CY1'
	var leaveType = 'Paid Leave'
	var leaveTypeValue = 'PL'
	var leaveFromDate = todayDate
	//var leaveFromDate = '27/10/2022'
	var leaveToDate = todayDate
	//var leaveToDate = '27/10/2022'
	var leaveFromDayType = 'FULL DAY'
	var leaveToDayType = 'FULL DAY'
	var leaveDay = '1'
	var Reason = 'Office Metting'
	var LeaveStation = 'Yes'
	var VacationAddress = 'Pune'
	var ContactNumber = '9876543210'
	var ReliverSetting = 'No'
	var ReliverCode = ''
	var ReliverName = ''

	var APPROVERS = 'level  1'
	var STATUS = 'Pending'
	var MANAGERREMARKS = ''


	context('Cloud Part',function(){

		it('Login to Cloud',function(){
			cy.login()
			cy.changeCompany();
		})
	
		// it('Set Self Service Role',function(){
		// 	leave.SetSelfServiceRole(employeeID, 'User')
		// })
	
		// it('Set Password',function(){
		// 	leave.SetPassword(employeeID)
		// })
	
		it('Set Manager',function(){
			leave.SetManager(employeeID, managerID)
		})
	
		 it('Add Leave Opening',function(){
		 	leave.AddLeaveOpening(employeeID, leaveType)
		 })
	
	})

	
	context('ESS Part',function(){


	it('Apply Leave by Reliver',function(){
        cy.EssLogin(employeeID, employeeID)
        leave.applyLeave(employeeID,EmployeeFirstName,EmployeeLastName, managerID,
			ManagerFirstName, ManagerLastName, leaveType, leaveTypeValue, leaveFromDate, leaveToDate, todayDate, employeeJoiningDate, 
			 leaveFromDayType, leaveToDayType, Reason, LeaveStation,VacationAddress, ContactNumber, ReliverCode, ReliverName,
			 APPROVERS, STATUS, MANAGERREMARKS, ReliverSetting, leaveDay)	
    })

	// it('Approve Leave at Manager', function () {
	// 	cy.EssLogin(managerID, managerID)
	// 	leave.approveLeave(employeeID, leaveType, leaveTypeValue, leaveFromDate)
	// })

	})

	context('Apply Leave by Employee with Reliver which is already on Leave (Leave Pending)', function () {
		
		var employeeID = 'L9'
		var EmployeeFirstName = 'Leave'
		var EmployeeLastName = 'User 4'
		var employeeJoiningDate = '02/02/2019'
		var managerID = 'CY2'
		var ManagerFirstName = 'Increment '
		var ManagerLastName = 'test'
		var admin = 'CY1'
		var leaveType = 'Sick Leave'
		var leaveTypeValue = 'SL'
		var leaveFromDate = todayDate
		//var leaveFromDate = '28/10/2022'
		var leaveToDate = todayDate
		//var leaveToDate = '28/10/2022'
		var leaveFromDayType = 'FULL DAY'
		var leaveToDayType = 'FULL DAY'
		var leaveDay = '1'
		var Reason = 'Office Metting'
		var LeaveStation = 'Yes'
		var VacationAddress = 'Pune'
		var ContactNumber = '9876543210'
		var ReliverSetting = 'Yes'
		var ReliverCode = 'L8'
		var ReliverName = 'Leave User 3'
	
		var APPROVERS = 'level  1'
		var STATUS = 'Pending'
		var MANAGERREMARKS = ''
	
		before(function () {
	
			cy.fixture('TestData/OnDuty').then(function (data) {
				//this.data = data
				console.log(this.data)
				//admin = data.admin
				//managerID = data.managerID
				//employeeID = data.employeeID
			})
		})
	
		beforeEach(function () {
			cy.getCookies()
		})
		
		it('Apply Leave',function(){
			cy.EssLogin(employeeID, employeeID)

			cy.visit(Cypress.env('essUrl')+'Leave/Transaction/LeaveRequest?Menu=leave')

			cy.wait(3000)	
			cy.get('#drpLeaveType').select(leaveType,{force: true}).focused()
			cy.wait(500)
	
			if(ReliverSetting == 'Yes')
			{
			cy.get('#select2-multiEmp-container').click({ force: true })
			cy.get('input[type="search"]').click({ force: true })
			cy.get('input[type="search"]').type(ReliverCode)
			cy.contains('li', '['+ReliverCode+']').click({ force: true })
			}
	
			cy.get('#txtFromDate').click().then(input => {
					input[0].dispatchEvent(new Event('input', { bubbles: true }))
					input.val(leaveFromDate)
			})
	
			cy.get('#txtReason').click({force: true})
			
			cy.get('#txtToDate').click().then(input => {
					input[0].dispatchEvent(new Event('input', { bubbles: true }))
					input.val(leaveToDate)
			})
				
			cy.get('#txtReason').click({force: true})
			cy.get('#txtReason').type(Reason)
	
			cy.get('#drpLeaveStation').select(LeaveStation,{force: true})
			
			cy.get('#txtAddress').click({force: true})
			cy.get('#txtAddress').type(VacationAddress)
			cy.get('#txtContact').click({force: true})
			cy.get('#txtContact').type(ContactNumber)
	
	
			cy.get('#btnAdd').click({force: true})
	
			cy.get('.noty_body').should('have.text', "Reliever is already on Leave.");


		})
			
	})

	})
})


describe('Leave Applied with Reliver, but show validation Because Reliver is already on Leave (Leave Approved)', function () {
	const leave = new Leave()


	var moment = require('moment');
	const Day = moment().format('DD')
	const Day1 = parseInt(Day) + 1	
	const Day2 = parseInt(Day) - 1
	const Month = moment().format('MM')
	const year = moment().format('YYYY')
	const yasterdayDate = moment().subtract(1, "days").format("DD/MM/YYYY");
	const todayDate = Day + '/' + Month + '/' + year
	const tomorrowDate = Day1 + '/' + Month + '/' + year

	
	beforeEach(function () {
		cy.getCookies()
	})
	
	context('Apply Leave by Reliver',function(){
	var employeeID = 'L8'
	var EmployeeFirstName = 'Leave'
	var EmployeeLastName = 'User 3'
	var employeeJoiningDate = '01/07/2021'
	var managerID = 'CY2'
	var ManagerFirstName = 'Increment '
	var ManagerLastName = 'test'
	var admin = 'CY1'
	var leaveType = 'Paid Leave'
	var leaveTypeValue = 'PL'
	var leaveFromDate = todayDate
	//var leaveFromDate = '27/10/2022'
	var leaveToDate = todayDate
	//var leaveToDate = '27/10/2022'
	var leaveFromDayType = 'FULL DAY'
	var leaveToDayType = 'FULL DAY'
	var leaveDay = '1'
	var Reason = 'Office Metting'
	var LeaveStation = 'Yes'
	var VacationAddress = 'Pune'
	var ContactNumber = '9876543210'
	var ReliverSetting = 'No'
	var ReliverCode = ''
	var ReliverName = ''

	var APPROVERS = 'level  1'
	var STATUS = 'Pending'
	var MANAGERREMARKS = ''


	// it('Apply Leave by Reliver',function(){
    //     cy.EssLogin(employeeID, employeeID)
    //     leave.applyLeave(employeeID,EmployeeFirstName,EmployeeLastName, managerID,
	// 		ManagerFirstName, ManagerLastName, leaveType, leaveTypeValue, leaveFromDate, leaveToDate, todayDate, employeeJoiningDate, 
	// 		 leaveFromDayType, leaveToDayType, Reason, LeaveStation,VacationAddress, ContactNumber, ReliverCode, ReliverName,
	// 		 APPROVERS, STATUS, MANAGERREMARKS, ReliverSetting, leaveDay)	
    // })

	it('Approve Leave at Manager', function () {
		cy.EssLogin(managerID, managerID)
		leave.approveLeave(employeeID, leaveType, leaveTypeValue, leaveFromDate)
	})

	})

	context('Apply Leave by Employee with Reliver which is already on Leave', function () {
		
		var employeeID = 'L9'
		var EmployeeFirstName = 'Leave'
		var EmployeeLastName = 'User 4'
		var employeeJoiningDate = '02/02/2019'
		var managerID = 'CY2'
		var ManagerFirstName = 'Increment '
		var ManagerLastName = 'test'
		var admin = 'CY1'
		var leaveType = 'Sick Leave'
		var leaveTypeValue = 'SL'
		//var leaveFromDate = todayDate
		var leaveFromDate = '28/10/2022'
		//var leaveToDate = todayDate
		var leaveToDate = '28/10/2022'
		var leaveFromDayType = 'FULL DAY'
		var leaveToDayType = 'FULL DAY'
		var leaveDay = '1'
		var Reason = 'Office Metting'
		var LeaveStation = 'Yes'
		var VacationAddress = 'Pune'
		var ContactNumber = '9876543210'
		var ReliverSetting = 'Yes'
		var ReliverCode = 'L8'
		var ReliverName = 'Leave User 3'
	
		var APPROVERS = 'level  1'
		var STATUS = 'Pending'
		var MANAGERREMARKS = ''
	
		before(function () {
	
			cy.fixture('TestData/OnDuty').then(function (data) {
				//this.data = data
				console.log(this.data)
				//admin = data.admin
				//managerID = data.managerID
				//employeeID = data.employeeID
			})
		})
	
		beforeEach(function () {
			cy.getCookies()
		})
		
		it('Apply Leave',function(){
			cy.EssLogin(employeeID, employeeID)

			cy.visit(Cypress.env('essUrl')+'Leave/Transaction/LeaveRequest?Menu=leave')

			cy.wait(3000)	
			cy.get('#drpLeaveType').select(leaveType,{force: true}).focused()
			cy.wait(500)
	
			if(ReliverSetting == 'Yes')
			{
			cy.get('#select2-multiEmp-container').click({ force: true })
			cy.get('input[type="search"]').click({ force: true })
			cy.get('input[type="search"]').type(ReliverCode)
			cy.contains('li', '['+ReliverCode+']').click({ force: true })
			}
	
			cy.get('#txtFromDate').click().then(input => {
					input[0].dispatchEvent(new Event('input', { bubbles: true }))
					input.val(leaveFromDate)
			})
	
			cy.get('#txtReason').click({force: true})
			
			cy.get('#txtToDate').click().then(input => {
					input[0].dispatchEvent(new Event('input', { bubbles: true }))
					input.val(leaveToDate)
			})
				
			cy.get('#txtReason').click({force: true})
			cy.get('#txtReason').type(Reason)
	
			cy.get('#drpLeaveStation').select(LeaveStation,{force: true})
			
			cy.get('#txtAddress').click({force: true})
			cy.get('#txtAddress').type(VacationAddress)
			cy.get('#txtContact').click({force: true})
			cy.get('#txtContact').type(ContactNumber)
	
	
			cy.get('#btnAdd').click({force: true})
	
			cy.get('.noty_body').should('have.text', "Reliver is already on Leave.");


		})
			
	})


})





