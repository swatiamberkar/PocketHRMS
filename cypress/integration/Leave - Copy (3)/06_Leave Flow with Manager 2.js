import Leave from './Pages/Leave/Leave';

describe('Leave Flow with Manager 2', function () {
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




	var employeeID = 'SA12'
	var EmployeeFirstName = 'User'
	var EmployeeLastName = 'Priyanka'
	var employeeJoiningDate = '01/01/2018'
	var department = 'IT'
	var designation = 'HR'
	var balance = 10

		var managerID = 'SA3'
		var ManagerFirstName = 'Manager '
		var ManagerLastName = 'Prajakta'
	
		var managerID_2 = 'SA4'
		var ManagerFirstName_2 = 'Manager '
		var ManagerLastName_2 = 'Pankaj'
	
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
	var STATUS = 'Approved'
	//var MANAGERREMARKS = ''
	var LeaveStatus = 'Approved'
	var ManagerStatus_1 = 'Approved'
	var ManagerStatus_2 = 'Approved'
	var ManagerLevel = 2
	var ManagerRemark_1 = 'Approved by Manager 1'
	var ManagerRemark_2 = 'Approved by Manager 2'



	// var employeeID = 'Z1'
	// var employeeJoiningDate = '01/01/2018'
	// var managerID = 'SA5'
	// var ManagerFirstName = 'Manager '
	// var ManagerLastName = 'Ritesh'
	// var managerID_2 = 'SA6'
	// var ManagerFirstName_2 = 'Manager '
	// var ManagerLastName_2 = 'Jaymala'



	beforeEach(function () {
		cy.getCookies()
	})
/*
	it('Apply Leave', function () {
		var STATUS = 'Pending'
		var MANAGERREMARKS = ''


		cy.EssLogin(employeeID, employeeID)

		leave.applyLeave(admin, employeeID, EmployeeFirstName, EmployeeLastName, managerID,
			ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
			leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
			leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
			APPROVERS, STATUS, ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
			ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2)


	})


	it('Verify Notification at Manager ', function () {
		cy.EssLogin(managerID, managerID)
		cy.wait(5000)
		leave.verifyNotificationAtManager(employeeID)

	})

	it('Verify Requsted Leave Details At Manager', function () {
		var MANAGERREMARKS = ''
		cy.EssLogin(managerID, managerID)

		leave.verifyRequstedLeaveDetailsAtManager(admin, employeeID, EmployeeFirstName, EmployeeLastName, managerID,
			ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
			leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
			leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
			APPROVERS, STATUS, ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
			ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2)
	})


	it('Approve Leave at Manager 1', function () {
		cy.EssLogin(managerID, managerID)
		leave.approveLeave(employeeID, EmployeeFirstName, EmployeeLastName, managerID,
			ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate, leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate,
			leaveFromDayType, leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
			APPROVERS, STATUS, MANAGERREMARKS, ReliverSetting, leaveDay)
	})


	it('Verify Leave in Team Report', function () {
		var STATUS = 'Pending'
		var balance = balance - leaveDay
		cy.wait(5000)
		cy.EssLogin(managerID, managerID)
		leave.verifyLeaveInTeamReport(admin, employeeID, EmployeeFirstName, EmployeeLastName, managerID,
			ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
			leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
			leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
			APPROVERS, STATUS, ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
			ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2)
	})

	it('Verify Notification at Employee', function () {
		cy.EssLogin(employeeID, employeeID)
		leave.verifyNotificationAtEmployee(employeeID)
	})

	it('Verify Status at Employee', function () {
		var LeaveStatus = 'Pending'
		var ManagerStatus_1 = 'Approved'
		var ManagerStatus_2 = 'Pending'
		cy.EssLogin(employeeID, employeeID)
		leave.verifyStatusAtEmployee(admin, employeeID, EmployeeFirstName, EmployeeLastName, managerID,
			ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
			leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
			leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
			APPROVERS, STATUS, ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
			ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2)
	})

	it('Verify Leave in My Report', function () {
		var LeaveStatus = 'Pending'
		var ManagerStatus_1 = 'Approved'
		var ManagerStatus_2 = 'Pending'
		cy.EssLogin(employeeID, employeeID)
		leave.verifyLeaveInMyReport(admin, employeeID, EmployeeFirstName, EmployeeLastName, managerID,
			ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
			leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
			leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
			APPROVERS, STATUS, ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
			ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2)
	})


	it('Verify Leave in Employee Report', function () {
		var LeaveStatus = 'Pending'
		var ManagerStatus_1 = 'Approved'
		var ManagerStatus_2 = 'Pending'

		cy.EssLogin(admin, admin)
		leave.verifyLeaveInEmployeeReport(admin, employeeID, EmployeeFirstName, EmployeeLastName, managerID,
			ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
			leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
			leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
			APPROVERS, STATUS, ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
			ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2)


	})


	it('Verify Notification at Manager ', function () {
		cy.EssLogin(managerID_2, managerID_2)
		cy.wait(5000)
		leave.verifyNotificationAtManager(employeeID)

	})

	it('Verify Requsted Leave Details At Manager', function () {
		var LeaveStatus = 'Pending'
		var ManagerStatus_1 = 'Approved'
		var ManagerStatus_2 = 'Pending'
		cy.EssLogin(managerID_2, managerID_2)

		leave.verifyRequstedLeaveDetailsAtManager(admin, employeeID, EmployeeFirstName, EmployeeLastName, managerID,
			ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
			leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
			leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
			APPROVERS, STATUS, ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
			ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2)
	})



	it('Approve Leave at Manager 1', function () {
		cy.EssLogin(managerID_2, managerID_2)
		leave.approveLeave(admin, employeeID, EmployeeFirstName, EmployeeLastName, managerID,
			ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
			leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
			leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
			APPROVERS, STATUS, ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
			ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2)
	})


	it('Verify Leave in Team Report', function () {

		var LeaveBalance = parseInt(balance - leaveDay)
		balance = LeaveBalance

		cy.wait(5000)
		cy.EssLogin(managerID_2, managerID_2)
		leave.verifyLeaveInTeamReport(admin, employeeID, EmployeeFirstName, EmployeeLastName, managerID,
			ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
			leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
			leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
			APPROVERS, STATUS, ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
			ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2)
	})

	it('Verify Notification at Employee', function () {
		cy.EssLogin(employeeID, employeeID)
		leave.verifyNotificationAtEmployee(employeeID)
	})

	it('Verify Status at Employee', function () {
		balance = LeaveBalance

		cy.EssLogin(employeeID, employeeID)
		leave.verifyStatusAtEmployee(admin, employeeID, EmployeeFirstName, EmployeeLastName, managerID,
			ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
			leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
			leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
			APPROVERS, STATUS, ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
			ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2)
	})


	it('Verify Leave in My Report', function () {
		balance = LeaveBalance

		cy.EssLogin(employeeID, employeeID)
		leave.verifyLeaveInMyReport(admin, employeeID, EmployeeFirstName, EmployeeLastName, managerID,
			ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
			leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
			leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
			APPROVERS, STATUS, ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
			ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2)
	})
*/

	it('Verify Leave in Employee Report', function () {
		var LeaveBalance = parseInt(balance - leaveDay)
		balance = LeaveBalance

		cy.EssLogin(admin, admin)
		leave.verifyLeaveInEmployeeReport(employeeID, EmployeeFirstName, EmployeeLastName, managerID,
			ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
			leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
			leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
			APPROVERS, STATUS, ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
			ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2)


	})

})