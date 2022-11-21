import Leave from './Pages/Leave/Leave';
import GlobalVariable from './globalVariable';

describe('Leave - Normal Flow', function () {
	const leave = new Leave()
	const globalVariable = new GlobalVariable()

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

	//var employeeID = 'SA2'
	var employeeID = 'SA11'
	
	var EmployeeFirstName = 'User'
	var EmployeeLastName = 'Akash'
	var employeeJoiningDate = '01/01/2018'
	var department = 'IT'
	var designation = 'HR'
	var balance = 10

	//var managerID = 'SA3'
	var managerID = 'SA12'
	var ManagerFirstName = 'Manager '
	var ManagerLastName = 'Prajakta'
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
	var Reason = 'Office Metting'
	var LeaveStation = 'Yes'
	var VacationAddress = 'Pune'
	var ContactNumber = '9876543210'
	var ReliverSetting = 'No'
	var ReliverCode = ''
	var ReliverName = ''

	var APPROVERS = 'level  1'
	var MANAGERREMARKS = ''

	var LeaveStatus = 'Approved'
	var ManagerStatus_1 = 'Approved'
	var ManagerStatus_2 = 'Approved'
	var ManagerLevel = 1
	var ManagerRemark_1 = 'Approved by Manager 1'
	var ManagerRemark_2 = 'Approved by Manager 2'

	var managerID_2 = ''
	var ManagerFirstName_2 = ' '
	var ManagerLastName_2 = ''



	beforeEach(function () {
		cy.getCookies()
	})

	it('Apply Leave', function () {
		var ManagerStatus_1 = 'Pending'
		var ManagerRemark_1 = ''
		cy.EssLogin(employeeID, employeeID)

		leave.applyLeave(employeeID, EmployeeFirstName, EmployeeLastName, managerID,
			ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
			leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
			leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
			APPROVERS, ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
			ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2)

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
		leave.verifyNotificationAtManager(employeeID, EmployeeFirstName, EmployeeLastName, managerID,
			ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
			leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
			leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
			APPROVERS,  ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
			ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2)

	})


	it('Verify Requsted Leave Details At Manager', function () {
		var ManagerStatus_1 = 'Pending'
		var ManagerRemark_1 = ''

		cy.EssLogin(managerID, managerID)

		leave.verifyRequstedLeaveDetailsAtManager(employeeID, EmployeeFirstName, EmployeeLastName, managerID,
			ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
			leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
			leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
			APPROVERS, ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
			ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2)

			leave.verifyLeaveDetails(employeeID, EmployeeFirstName, EmployeeLastName, managerID,
				ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
				leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
				leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
				APPROVERS, ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
				ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2)
	})

	it('Approve Leave at Manager', function () {
		cy.EssLogin(managerID, managerID)
		leave.approveLeave(employeeID, EmployeeFirstName, EmployeeLastName, managerID,
			ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
			leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
			leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
			APPROVERS, ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
			ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2)
	})



	it('Verify Leave in Team Report', function () {
		var balance = balance - leaveDay
		cy.wait(5000)
		cy.EssLogin(managerID, managerID)
		leave.verifyLeaveInTeamReport(employeeID, EmployeeFirstName, EmployeeLastName, managerID,
			ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
			leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
			leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
			APPROVERS, ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
			ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2)

			leave.verifyLeaveDetails(employeeID, EmployeeFirstName, EmployeeLastName, managerID,
				ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
				leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
				leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
				APPROVERS, ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
				ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2)
	})


	it('Verify Notification at Employee', function () {
		cy.EssLogin(employeeID, employeeID)
		leave.verifyNotificationAtEmployee(employeeID, EmployeeFirstName, EmployeeLastName, managerID,
			ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
			leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
			leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
			APPROVERS,  ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
			ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2)

			leave.verifyLeaveDetails(employeeID, EmployeeFirstName, EmployeeLastName, managerID,
				ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
				leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
				leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
				APPROVERS, ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
				ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2)
	})

	

	it('Verify Status at Employee', function () {
		balance = balance - leaveDay
		cy.EssLogin(employeeID, employeeID)
		leave.verifyStatusAtEmployee(employeeID, EmployeeFirstName, EmployeeLastName, managerID,
			ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
			leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
			leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
			APPROVERS, ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
			ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2)

			leave.verifyLeaveDetails(employeeID, EmployeeFirstName, EmployeeLastName, managerID,
				ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
				leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
				leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
				APPROVERS, ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
				ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2)
	})


	it('Verify Leave in My Report', function () {
		balance = balance - leaveDay
		cy.EssLogin(employeeID, employeeID)
		leave.verifyLeaveInMyReport(employeeID, EmployeeFirstName, EmployeeLastName, managerID,
			ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
			leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
			leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
			APPROVERS, ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
			ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2)

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
		leave.verifyLeaveInEmployeeReport(employeeID, EmployeeFirstName, EmployeeLastName, managerID,
			ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
			leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
			leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
			APPROVERS, ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
			ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2)

			leave.verifyLeaveDetails(employeeID, EmployeeFirstName, EmployeeLastName, managerID,
				ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
				leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
				leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
				APPROVERS, ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
				ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2)
	})


})