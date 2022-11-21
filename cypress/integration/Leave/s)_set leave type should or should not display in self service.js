import Leave from './Pages/Leave/Leave';

describe('S)_set leave type should or should not display in self service', function () {

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

    var employeeID = 'CS21'
    //var employeeID = 'SA11'

    var EmployeeFirstName = 'User'
    var EmployeeLastName = 'Leave'
    var employeeJoiningDate = '01/01/2018'
    var department = 'IT'
    var designation = 'HR'
    var balance = 10

    var managerID = 'CS22'
    //var managerID = 'SA12'
    var ManagerFirstName = 'Manager '
    var ManagerLastName = 'LeaveData'
    var admin = 'SA1'
    var leaveType = 'Paid Leave'
    var leaveTypeValue = 'PL'

    var HolidayDate = '15/11/2022'
    var leaveFromDate = '08/11/2022'
    var leaveToDate = '08/11/2022'
    var leaveDay = '0'

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

    it('set leave type should display in self service ', function () {

        leave.DeleteLeaveConfiguration(leaveType)
        cy.wait(5000)

        cy.visit(Cypress.env('url') + 'Settings/Employee/Index?module=leave&submodule=leaveconfiguration')
        cy.wait(2000)
        cy.get('#ddLeavType').select(leaveType)
        cy.wait(2000)
        cy.get('#ddShowinSelfservice').select('should')


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

    it('login to ESS', function () {

        cy.EssLogin(employeeID, employeeID)
        cy.visit(Cypress.env('essUrl') + 'Leave/Transaction/LeaveRequest?Menu=leave')

    })
    it('verify leave type should display', function () {
        //
        cy.get('#drpLeaveType').select(leaveType)

        //verify leve type is displaying or not
        cy.get("#drpLeaveType").invoke('text').then((text) => {
            expect(text.trim()).to.contain(leaveType)
        })
    })

    it('Login to Cloud', function () {
        cy.login()
        cy.changeCompany();
    })
    it('set leave type should not display in self service ', function () {

        cy.visit(Cypress.env('url') + 'Settings/Employee/Index?module=leave&submodule=leaveconfiguration')
        cy.wait(2000)
        cy.get('#ddLeavType').select(leaveType)
        cy.wait(2000)
        cy.get('#ddShowinSelfservice').select('should not')


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

    it('login to ESS', function () {

        cy.EssLogin(employeeID, employeeID)
        cy.visit(Cypress.env('essUrl') + 'Leave/Transaction/LeaveRequest?Menu=leave')

    })

    it('verify leave type should not display', function () {

        cy.get("#drpLeaveType").invoke('text').then((text) => {
            expect(text.trim()).to.not.contain(leaveType)
        })

        // cy.get('#drpLeaveType').select(leaveType)
        cy.wait(1000)
    })
})