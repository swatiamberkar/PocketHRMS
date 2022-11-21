import Leave from './Pages/Leave/Leave';

describe('08_Leave Approve by 1 Manager and Reject by 2 Manager', function () {
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

	var employeeID = 'SA9'
	var EmployeeFirstName = 'User'
	var EmployeeLastName = 'Leave'
	var employeeJoiningDate = '01/01/2018'
	var department = 'IT'
	var designation = 'HR'
	var balance = 10

	var managerID = 'SA10'
	var ManagerFirstName = 'User '
	var ManagerLastName = 'Leave'

	var managerID_2 = 'SA11'
	var ManagerFirstName_2 = 'User '
	var ManagerLastName_2 = 'Leave'

	var admin = 'SA1'
	var leaveType = 'Paid Leave'
	var leaveTypeValue = 'PL'
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
	var ReliverSetting = 'No'
	var ReliverCode = ''
	var ReliverName = ''

	var APPROVERS = 'level  1'

	var LeaveStatus = 'Rejected'
	var ManagerStatus_1 = 'Approved'
	var ManagerStatus_2 = 'Rejected'
	var ManagerLevel = 2
	var ManagerRemark_1 = 'Approved by Manager 1'
	var ManagerRemark_2 = 'Rejected by Manager 2'


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
		var ManagerStatus_2 = 'Pending'
		var ManagerRemark_2 = ''
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
		var ManagerStatus_2 = 'Pending'
		var ManagerRemark_2 = ''
		leave.verifyLeaveDetails(employeeID, EmployeeFirstName, EmployeeLastName, managerID,
			ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
			leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
			leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
			APPROVERS, ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
			ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2)
	})

	it('Approve Leave at Manager 1', function () {
		var LeaveStatus = 'Approved'
		//cy.EssLogin(managerID, managerID)
		leave.approveRejectLeave(employeeID, leaveType, leaveTypeValue, leaveFromDate, ManagerRemark_1, LeaveStatus)
	})


	it('Verify Leave in Team Report', function () {
		var LeaveStatus = 'Pending'
		
		cy.wait(5000)
		//cy.EssLogin(managerID, managerID)
		leave.verifyLeaveInTeamReport(employeeID, leaveFromDate, leaveToDate, LeaveStatus)

	})

	it('Verify Leave details in Leave popup of Team Report', function () {
		var LeaveStatus = 'Pending'
		var ManagerStatus_1 = 'Approved'
		var ManagerStatus_2 = 'Pending'
		 var ManagerRemark_2 = ''
		leave.verifyLeaveDetails(employeeID, EmployeeFirstName, EmployeeLastName, managerID,
			ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
			leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
			leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
			APPROVERS, ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
			ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2)
	})


	it('Verify Notification at Manager 2', function () {
		cy.EssLogin(managerID_2, managerID_2)
		cy.wait(5000)
		leave.verifyNotificationAtManager(employeeID)

	})

	it('Verify Requsted Leave Details At Manager 2', function () {
		//cy.EssLogin(managerID_2, managerID_2)
		leave.verifyRequstedLeaveDetailsAtManager(employeeID, EmployeeFirstName, EmployeeLastName,
			leaveTypeValue, leaveFromDate, leaveToDate)
	})

	it('Verify Leave details in Leave popup of Manager 2 Approval Page', function () {
		var LeaveStatus = 'Pending'
		var ManagerStatus_1 = 'Approved'
		var ManagerStatus_2 = 'Pending'
		 var ManagerRemark_2 = ''
		leave.verifyLeaveDetails(employeeID, EmployeeFirstName, EmployeeLastName, managerID,
			ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
			leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
			leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
			APPROVERS, ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
			ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2)
	})


	it('Reject Leave by Manager 2', function () {
		var ManagerRemark_1 = ManagerRemark_2
		//cy.EssLogin(managerID_2, managerID_2)
		leave.approveRejectLeave(employeeID, leaveType, leaveTypeValue, leaveFromDate, ManagerRemark_1, LeaveStatus)
	})


	it('Verify Leave in Team Report', function () {
		//balance = balance - leaveDay
		cy.wait(5000)
		//cy.EssLogin(managerID_2, managerID_2)
		leave.verifyLeaveInTeamReport(employeeID, leaveFromDate, leaveToDate, LeaveStatus)

	})

	it('Verify Leave details in Leave popup of Team Report', function () {

		//balance = balance - leaveDay
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
		//var balance = balance - leaveDay
		//cy.EssLogin(employeeID, employeeID)
		leave.verifyLeaveInMyReport(LeaveStatus, leaveFromDate, leaveFromDayType, leaveToDate, leaveToDayType, leaveDay, leaveTypeValue)
	})

	it('Verify Leave details in Leave popup of My Report', function () {
		//var balance = balance - leaveDay
		leave.verifyLeaveDetails(employeeID, EmployeeFirstName, EmployeeLastName, managerID,
			ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
			leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
			leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
			APPROVERS, ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
			ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2)
	})


	it('Verify Leave in Employee Report', function () {
		//var balance = balance - leaveDay
		cy.EssLogin(admin, admin)
		leave.verifyLeaveInEmployeeReport(employeeID, leaveFromDate, LeaveStatus)
	})


})