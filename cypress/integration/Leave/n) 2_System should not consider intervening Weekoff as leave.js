import Leave from './Pages/Leave/Leave';

describe('n) 2_System should not consider intervening Weekoff as leave', function () {
    const leave = new Leave()

    const { softAssert, softExpect, softTrue } = chai;
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


    var employeeID = 'CS17'
    var EmployeeFirstName = 'User'
    var EmployeeLastName = 'Leave'
    var employeeJoiningDate = '01/01/2018'
    var department = 'IT'
    var designation = 'HR'
    var balance = 10

    var managerID = 'CS18'
    //var managerID = 'SA12'
    var ManagerFirstName = 'Manager '
    var ManagerLastName = 'LeaveData'
    var admin = 'SA1'
    var leaveType = 'Paid Leave'
    var leaveTypeValue = 'PL'

    var HolidayDate = '13/11/2022'
    var leaveFromDate = '12/11/2022'
    var leaveToDate = '14/11/2022'
    var leaveDay = 2

    var leaveFromDayType = 'FULL DAY'
    var leaveToDayType = 'FULL DAY'

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
        cy.getCookies_ESS()
    })

    it('Login to Cloud', function () {
        cy.login()
        cy.changeCompany();
    })


    it('Setting for System should not consider intervening Weekoff as leave.', function () {

        leave.DeleteLeaveConfiguration(leaveType)
        cy.wait(5000)
        //cy.visit(Cypress.env('url')+'Settings/Employee/Index?module=leave&submodule=leaveconfiguration')
        cy.wait(2000)
        cy.get('#ddLeavType').select(leaveType)
        cy.wait(2000)
        cy.get('#ddInterWeekOff').select('should not')
        //click on save button
        cy.get('#btnSave').click()
        cy.wait(5000)
        //verify success message
        cy.get(".toast-message").invoke('text').then((text) => {
            expect(text.trim()).equal('Data saved successfully.!')
        })
        //click on message to close message box
        cy.get(".toast-message").click()
    })

    it('Verify added Leave From Cloud', function () {
        cy.navigate_EmployeeProfile(employeeID)
        leave.addLeaveFromCloud(leaveType, leaveTypeValue, leaveFromDate, leaveFromDayType, leaveToDate, leaveToDayType, leaveDay, Reason)
        leave.deleteEmployeesAllLeaves()
    })

    it('Verify added Leave From ESS', function () {
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

		//cy.EssLogin(managerID, managerID)

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

	it('Approve Leave at Manager', function () {
		
		//cy.EssLogin(managerID, managerID)
		leave.approveRejectLeave(employeeID, leaveType, leaveTypeValue, leaveFromDate, ManagerRemark_1, LeaveStatus)
	})

	it('Verify Leave in Team Report', function () {
		var balance = balance - leaveDay
		cy.wait(5000)
		//cy.EssLogin(managerID, managerID)
		leave.verifyLeaveInTeamReport(employeeID, leaveFromDate, leaveToDate, LeaveStatus)

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

	it('Verify Status at Employee after Approved Leave', function () {
		balance = balance - leaveDay
		//cy.EssLogin(employeeID, employeeID)
		leave.verifyStatusAtEmployee(leaveFromDate, LeaveStatus)

	})

	it('Verify Leave details in Leave popup of Previous Leave After Approved Leave', function () {


		leave.verifyLeaveDetails(employeeID, EmployeeFirstName, EmployeeLastName, managerID,
			ManagerFirstName, ManagerLastName, department, designation, employeeJoiningDate, todayDate,
			leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, leaveFromDayType,
			leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
			APPROVERS, ManagerRemark_1, ReliverSetting, leaveDay, ManagerLevel, managerID_2, ManagerFirstName_2,
			ManagerLastName_2, ManagerRemark_2, LeaveStatus, ManagerStatus_1, ManagerStatus_2)
	})

	it('Verify Leave in My Report', function () {
		balance = balance - leaveDay
		//cy.EssLogin(employeeID, employeeID)
		leave.verifyLeaveInMyReport(leaveFromDate, LeaveStatus)

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

   
/*
    it('Login to Cloud', function () {
        cy.login()
        cy.changeCompany();
    })

    it('Setting for System should not consider intervening holidays as leave.', function () {

        leave.DeleteLeaveConfiguration(leaveType)

        //cy.visit(Cypress.env('url')+'Settings/Employee/Index?module=leave&submodule=leaveconfiguration')
        cy.wait(2000)
        cy.get('#ddLeavType').select(leaveType)
        cy.wait(2000)
        cy.get('#ddInterHolidays').select('should not')
        //click on save button
        cy.get('#btnSave').click()
        cy.wait(5000)
        //verify success message
        cy.get(".toast-message").invoke('text').then((text) => {
            expect(text.trim()).equal('Data saved successfully.!')
        })
        //click on message to close message box
        cy.get(".toast-message").click()
    })

    it('Verify added Leave From Cloud', function () {
        cy.navigate_EmployeeProfile(employeeID)
        leave.addLeaveFromCloud(leaveType, leaveTypeValue, leaveFromDate, leaveFromDayType, leaveToDate, leaveToDayType, leaveDay, Reason)
        leave.deleteEmployeesAllLeaves()
    })

    it('Verify added Leave From ESS', function () {
        cy.EssLogin(employeeID, employeeID)
        leave.applyLeave(leaveType, leaveFromDate, leaveToDate, leaveFromDayType,
            Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode,
            ReliverSetting, leaveDay)
    })

    */
})




