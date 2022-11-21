import Leave from './Pages/Leave/Leave';


describe('06_Leave Reject Flow', function () {
	const leave = new Leave()
	
	var moment = require('moment');
	const Day = moment().format('DD')
	const Day1 = parseInt(Day) + 1
	const Day2 = parseInt(Day) - 1
	const Month = moment().format('MM')
	const year = moment().format('YYYY')
	const yasterdayDate = moment().subtract(1, "days").format("DD/MM/YYYY");
	const todayDate = Day + '/' + Month + '/' + year
	//const todayDate = '19/10/2022'
	const tomorrowDate = Day1 + '/' + Month + '/' + year

	var employeeID = 'SA4'
	//var employeeID = 'SA11'
	
	var EmployeeFirstName = 'User'
	var EmployeeLastName = 'Pankaj'
	var employeeJoiningDate = '01/01/2018'
	var department = 'IT'
	var designation = 'HR'
	var balance = 10

	var managerID = 'SA5'
	//var managerID = 'SA12'
	var ManagerFirstName = 'Manager '	
	var ManagerLastName = 'Ritesh'
	var admin = 'SA1'
	var leaveType = 'Paid Leave'
	var leaveTypeValue = 'PL'
	var leaveFromDate = todayDate
	var leaveToDate = todayDate
	var leaveFromDayType = 'FULL DAY'
	var leaveToDayType = 'FULL DAY'
	var leaveDay = 1
	var Reason = 'Office Metting'
	var LeaveStation = 'Yes'
	var VacationAddress = 'Pune'
	var ContactNumber = '9876543210'
	var ReliverSetting = 'No'
	var ReliverCode = ''
	var ReliverName = ''

	var APPROVERS = 'level  1'

	var LeaveStatus = 'Rejected'
	var ManagerStatus_1 = 'Rejected'
	var ManagerStatus_2 = 'Rejected'
	var ManagerLevel = 1
	var ManagerRemark_1 = 'Rejected by Manager 1'
	var ManagerRemark_2 = 'Rejected by Manager 2'

	var managerID_2 = ''
	var ManagerFirstName_2 = ' '
	var ManagerLastName_2 = ''



	beforeEach(function () {
		cy.getCookies()
		cy.getCookies_ESS()
	})

	it('Apply Leave', function () {
		cy.EssLogin(employeeID, employeeID)

		leave.applyLeave(leaveType, leaveFromDate, leaveToDate, leaveFromDayType,
			Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, 
			 ReliverSetting, leaveDay)
	})

	it('Verify Leave details in Leave popup of Previous Leave', function () {
		var ManagerStatus_1 = 'Pending'
		var ManagerRemark_1 = ''
		//cy.EssLogin(employeeID, employeeID)
		//cy.visit(Cypress.env('essUrl') + 'Leave/Transaction/LeaveRequest?Menu=leave')
		leave.verifyLeaveDetails(employeeID, EmployeeFirstName, EmployeeLastName, managerID,
			ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
			leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
			leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
			APPROVERS, ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
			ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2)
	})

	it('Verify Notification at Manager ', function () {
		cy.EssLogin(managerID, managerID)
		cy.wait(5000)
		leave.verifyNotificationAtManager(employeeID)

	})

	it('Verify Requsted Leave Details At Manager', function () {
		leave.verifyRequstedLeaveDetailsAtManager(employeeID, EmployeeFirstName, EmployeeLastName,
			leaveTypeValue, leaveFromDate, leaveToDate)
	})

	it('Verify Leave details in Leave popup of Manager Approval Page', function () {
		var ManagerStatus_1 = 'Pending'
		var ManagerRemark_1 = ''

		leave.verifyLeaveDetails(employeeID, EmployeeFirstName, EmployeeLastName, managerID,
			ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
			leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
			leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
			APPROVERS, ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
			ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2)
	})

	it('Reject Leave at Manager', function () {
		//cy.EssLogin(managerID, managerID)
		leave.approveRejectLeave(employeeID, leaveType, leaveTypeValue, leaveFromDate,ManagerRemark_1,LeaveStatus)
	})

	it('Verify Leave in Team Report', function () {
		var balance = balance - leaveDay
		cy.wait(5000)
		//cy.EssLogin(managerID, managerID)
		leave.verifyLeaveInTeamReport(employeeID,leaveFromDate, leaveToDate,  LeaveStatus)
			
	})

	it('Verify Leave details in Leave popup of Team Report', function () {

		leave.verifyLeaveDetails(employeeID, EmployeeFirstName, EmployeeLastName, managerID,
			ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
			leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
			leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
			APPROVERS, ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
			ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2)
	})

	it('Verify Notification at Employee', function () {
		cy.EssLogin(employeeID, employeeID)
		leave.verifyNotificationAtEmployee(employeeID, LeaveStatus)		
	})	

	it('Verify Leave in My Report', function () {
		balance = balance - leaveDay
		//cy.EssLogin(employeeID, employeeID)
		leave.	verifyLeaveInMyReport(leaveFromDate, LeaveStatus)
	})

	it('Verify Leave details in Leave popup of My Report', function () {

		leave.verifyLeaveDetails(employeeID, EmployeeFirstName, EmployeeLastName, managerID,
			ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
			leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
			leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
			APPROVERS, ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
			ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2)
	})

	it('Verify Leave in Employee Report', function () {
		balance = balance - leaveDay
		cy.EssLogin(admin, admin)
		leave.verifyLeaveInEmployeeReport(employeeID, leaveFromDate, LeaveStatus)

		
	})

	it('Verify Leave details in Leave popup of Employee Report', function () {
		leave.verifyLeaveDetails(employeeID, EmployeeFirstName, EmployeeLastName, managerID,
			ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
			leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
			leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
			APPROVERS, ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
			ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2)
	})

})