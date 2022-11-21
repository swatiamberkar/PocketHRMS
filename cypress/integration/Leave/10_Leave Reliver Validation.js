import Leave from './Pages/Leave/Leave';


describe('10_Leave Reliver Validation', function () {
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

	var employeeID = 'SA15'
	var EmployeeFirstName = 'User'
	var EmployeeLastName = 'Priyanka'
	var employeeJoiningDate = '01/01/2018'
	var department = 'IT'
	var designation = 'HR'
	var balance = 10

	var ManagerLevel = 1

	var managerID = 'SA16'
	var ManagerFirstName = 'Manager '
	var ManagerLastName = 'Nilesh'

	var managerID_2 = ''
	var ManagerFirstName_2 = ''
	var ManagerLastName_2 = ''

	var ReliverSetting = 'Yes'
	var ReliverCode = 'SA17'
	var ReliverName = 'User Sneha'

	var admin = 'SA1'


	var leaveType = 'Sick Leave'
	var leaveTypeValue = 'SL'
	var leaveFromDate = todayDate
	//var leaveFromDate = '13/10/2022'
	var leaveToDate = todayDate
	//var leaveToDate = '13/10/2022'
	var leaveFromDayType = 'FULL DAY'
	var leaveToDayType = 'FULL DAY'
	var leaveDay = 1
	var LeaveBalance = balance - leaveDay

	var Reason = 'Office Metting'
	var LeaveStation = 'Yes'
	var VacationAddress = 'Pune'
	var ContactNumber = '9876543210'


	var APPROVERS = 'level  1'

	var LeaveStatus = 'Approved'
	var ManagerStatus_1 = 'Approved'
	var ManagerStatus_2 = ''


	var ManagerRemark_1 = 'Approved by Manager 1'
	var ManagerRemark_2 = 'Rejected by Manager 2'



	var APPROVERS = 'level  1'
	var STATUS = 'Pending'
	var MANAGERREMARKS = ''

	beforeEach(function () {
		cy.getCookies()
		cy.getCookies_ESS()
	})


	it('Verify validation message - Select Reliever ', function () {
		cy.EssLogin(employeeID, employeeID)
		cy.visit(Cypress.env('essUrl') + 'Leave/Transaction/LeaveRequest?Menu=leave')
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
		cy.get('#btnAdd').click({ force: true })
		//verify validation message
		cy.get(".noty_body").invoke('text').then((text) => {
			expect(text.trim()).equal('Select Reliever')
		})
		cy.wait(1000)
		//click on message to close message box
		cy.get(".noty_body").click()

		cy.get('.select2-selection__placeholder').click({ force: true })
		cy.wait(2000)
		cy.get('.select2-search__field').type(ReliverCode)
		cy.wait(5000)
		cy.get('.select2-results__option').click({ force: true })
		cy.wait(4000)

		//click on addbutton
		cy.get('#btnAdd').click({ force: true })
		//
		cy.get('#btnConfirm').click()
		cy.wait(2000)
	})

	it('verify validation message - Selected Reliever is aleardy assign as a Reliever. ', function () {
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

		cy.get('.select2-selection__placeholder').click({ force: true })
		cy.wait(2000)
		cy.get('.select2-search__field').type(ReliverCode)
		cy.wait(5000)
		cy.get('.select2-results__option').click({ force: true })
		cy.wait(4000)
		cy.get('#txtReason').click({ force: true })
		//click on add button
		cy.get('#btnAdd').click({ force: true })
		//verify validation message
		cy.get(".noty_body").invoke('text').then((text) => {
			expect(text.trim()).equal('Selected Reliever is aleardy assign as a Reliever.')
		})
		cy.wait(1000)
		//click on message to close message box
		cy.get(".noty_body").click()
		cy.get(':nth-child(9) > .btn').click({ force: true })

	})

	it('verify validation message (Leave Pending) - Reliever is already on Leave.', function () {
		var leaveType = 'Paid Leave'
		var leaveTypeValue = 'PL'

		cy.EssLogin(ReliverCode, ReliverCode)
		leave.applyLeave(leaveType, leaveFromDate, leaveToDate, leaveFromDayType,
			Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode,
			ReliverSetting, leaveDay)

		cy.EssLogin(employeeID, employeeID)
		cy.visit(Cypress.env('essUrl') + 'Leave/Transaction/LeaveRequest?Menu=leave')

		cy.get('#drpLeaveType').select('Sick Leave')
		cy.wait(1000)
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

		cy.get('.select2-selection__placeholder').click({ force: true })
		cy.wait(2000)
		cy.get('.select2-search__field').type(ReliverCode)
		cy.wait(5000)
		cy.get('.select2-results__option').click({ force: true })
		cy.wait(4000)
		cy.get('#txtReason').click({ force: true })
		//click on add button
		cy.get('#btnAdd').click({ force: true })
		//verify validation message
		cy.get(".noty_body").invoke('text').then((text) => {
			expect(text.trim()).equal('Reliever is already on Leave.')
		})
		cy.wait(1000)
		//click on message to close message box
		//cy.get(".noty_body").click()
		//cy.get(':nth-child(9) > .btn').click({ force: true })

	})

it('Reliever Leave request approved from Manager', function () {
	var leaveType = 'Paid Leave'
	var leaveTypeValue = 'PL'
	var employeeID = ReliverCode

	cy.EssLogin(managerID, managerID)
	leave.approveRejectLeave(employeeID, leaveType, leaveTypeValue, leaveFromDate, ManagerRemark_1, LeaveStatus)

})

	it('verify validation message (Leave Approved) - Reliever is already on Leave.', function () {
			

		cy.EssLogin(employeeID, employeeID)
		cy.visit(Cypress.env('essUrl') + 'Leave/Transaction/LeaveRequest?Menu=leave')

		cy.get('#drpLeaveType').select('Sick Leave')
		cy.wait(1000)
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

		cy.get('.select2-selection__placeholder').click({ force: true })
		cy.wait(2000)
		cy.get('.select2-search__field').type(ReliverCode)
		cy.wait(5000)
		cy.get('.select2-results__option').click({ force: true })
		cy.wait(4000)
		cy.get('#txtReason').click({ force: true })
		//click on add button
		cy.get('#btnAdd').click({ force: true })
		//verify validation message
		cy.get(".noty_body").invoke('text').then((text) => {
			expect(text.trim()).equal('Reliever is already on Leave.')
		})
		cy.wait(1000)
		//click on message to close message box
		//cy.get(".noty_body").click()
		//cy.get(':nth-child(9) > .btn').click({ force: true })

	})

})





