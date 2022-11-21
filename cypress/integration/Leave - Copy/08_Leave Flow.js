import Leave from './Pages/Leave/Leave';

describe('Leave - Normal Flow', function () {
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

	
	var employeeID = 'CY3'
	var EmployeeFirstName = 'Leave'
	var EmployeeLastName = 'test'
	var employeeJoiningDate = '02/02/2015'
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
	var ReliverSetting = 'No'
	var ReliverCode = ''
	var ReliverName = ''

	var APPROVERS = 'level  1'
	var STATUS = 'Pending'
	var MANAGERREMARKS = ''


	beforeEach(function () {
		cy.getCookies()
	})
	
	it('Apply Leave',function(){
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

	

	it('Verify Requsted Leave Details At Manager', function () {
        cy.EssLogin(managerID, managerID)
        leave.verifyRequstedLeaveDetailsAtManager(employeeID,EmployeeFirstName,EmployeeLastName, managerID,
			ManagerFirstName, ManagerLastName, leaveType, leaveTypeValue, leaveFromDate, leaveToDate, todayDate, employeeJoiningDate, 
			 leaveFromDayType, leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
			 APPROVERS, STATUS, MANAGERREMARKS)  
    })

	
	
	it('Approve Leave at Manager', function () {
		cy.EssLogin(managerID, managerID)
		leave.approveLeave(employeeID, leaveType, leaveTypeValue, leaveFromDate)
	})

	it('Verify Leave in Team Report', function () {
		cy.wait(5000)
		cy.EssLogin(managerID, managerID)
		leave.verifyLeaveInTeamReport(employeeID, leaveFromDate)
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