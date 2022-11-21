import Leave from './Pages/Leave/Leave';

describe('04_Leave Validation', function () {
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


	var leaveFromDate = '14/11/2022'
	//var leaveToDate = currentDate
	var leaveToDate = '14/11/2022'


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


	beforeEach(function () {
		cy.getCookies()
		cy.getCookies_ESS()

	})

	it('Verify Validation Message - Manager is not assigned for the employee.', function () {
		cy.EssLogin(employeeID, employeeID)
		cy.visit(Cypress.env('essUrl') + 'Leave/Transaction/LeaveRequest?Menu=leave')
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

	it('Assign Manager from Approval Matrix ', () => {
		cy.login()
		cy.changeCompany();
		leave.SetManager(employeeID, managerID)
	})

	it('Verify Validation Message - Leave Opening is 0 ', function () {

		cy.EssLogin(employeeID, employeeID)
		cy.visit(Cypress.env('essUrl') + 'Leave/Transaction/LeaveRequest?Menu=leave')

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

	it('Add Leave Opening', function () {
		cy.login()
		cy.changeCompany();
		leave.AddLeaveOpening(employeeID, leaveType)
	})

	it('ESS login page', function () {
		cy.EssLogin(employeeID, employeeID)
		cy.visit(Cypress.env('essUrl') + 'Leave/Transaction/LeaveRequest?Menu=leave')
	})

	it('Verify Manager Details', function () {

		cy.get(".mb-0").eq(1).invoke('text').then((text) => {
			expect(text.trim()).contains(managerID)
			expect(text.trim()).contains(firstname)
			expect(text.trim()).contains(lastname)	
		})

	})

	it('Verify Date of Joining', function () {
		cy.xpath("//p[contains(text(),'01/07/2019')]").invoke('text').then((text) => {
			expect(text.trim()).equal(dateofjoining)
		})

	})

	it('Verify Validation Message - Select Type Of Leave', function () {
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

	it('Verify Validation Message - Enter From date', function () {

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

	it('Verify Validation Message - Enter To date', function () {

		cy.get('#txtFromDate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(leaveFromDate)
		})
		//click on add button
		cy.get('#btnAdd').click({ force: true })
		//verify validation message
		cy.get(".noty_body").invoke('text').then((text) => {
			expect(text.trim()).equal('Enter To date')
		})
		cy.wait(1000)
		//click on message to close message box
		cy.get(".noty_body").click()
	})

	it('Verify Validation Message - To date is less than from date ', function () {
		// cy.get('#txtReason').click()
		cy.wait(1000)

		cy.get('#txtToDate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('12/10/2022')
		})
		cy.get('#txtReason').click()
		cy.wait(1000)
		//click on add button
		cy.get('#btnAdd').click({ force: true })
		//verify validation message
		cy.get(".noty_body").invoke('text').then((text) => {
			expect(text.trim()).equal('To date is less than from date')
		})
		cy.wait(1000)
		//click on message to close message box
		cy.get(".noty_body").click()
	})


	it('Verify Validation Message - select full day in to date insted of second half', function () {
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
		cy.get('#btnAdd').click({ force: true })
		//verify validation message
		cy.get(".noty_body").invoke('text').then((text) => {
			expect(text.trim()).equal('Select full day in to date instead of second half')
		})
		cy.wait(1000)
		//click on message to close message box
		cy.get(".noty_body").click()
	})

	it('Verify Validation Message - select full day in from date insted of first half', function () {
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
		cy.get('#btnAdd').click({ force: true })
		//verify validation message
		cy.get(".noty_body").invoke('text').then((text) => {
			expect(text.trim()).equal('Select full day in from date instead of first half')
		})
		cy.wait(1000)
		//click on message to close message box
		cy.get(".noty_body").click()
	})

	it('Verify Validation Message - Day type should be same.', function () {
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
		cy.get('#btnAdd').click({ force: true })
		//verify validation message
		cy.get(".noty_body").invoke('text').then((text) => {
			expect(text.trim()).equal('Day type should be same.')
		})
		cy.wait(1000)
		//click on message to close message box
		cy.get(".noty_body").click()
	})


	it('Verify Success Message - Leave Applied Successfully!!! ', function () {
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
		cy.get('#btnAdd').click({ force: true })
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

	it('Verify Validation Message - Leave already applied for this date ', function () {
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


})



