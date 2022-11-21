import Leave from './Pages/Leave/Leave';

describe('q) Multiple leaves should or should not be allowed on consecutive days.', function () {

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

    var employeeID = 'L6'
    var employeeIDFemale= 'L9'

    //var employeeID = 'SA11'

    var EmployeeFirstName = 'Leave'
    var EmployeeLastName = 'User 1'
    var employeeJoiningDate = '01/07/2019'
    var department = 'IT'
    var designation = 'HR'
    var balance = 10


    var managerID = 'L2'
    //var managerID = 'SA12'
    var ManagerFirstName = 'Leave '
    var ManagerLastName = 'MGR1'
    var admin = 'L1'
    var leaveType = 'Paid Leave'
    var leaveType4 = 'Marriage leave'

    var HolidayDate = '15/11/2022'
   
    var leaveFromDate= '10/11/2022'
    var leaveToDate= '15/11/2022'

    var leaveDay = '6'
    var leaveDay2= '0.5'

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

    it('Login to Cloud',function(){
		cy.login()
		cy.changeCompany();
	})
    
    it('Revert changes',function(){
    
        leave.DeleteLeaveConfiguration(leaveType)
    })
    
    it('Set Multiple leaves should not be allowed on consecutive days',function(){
    
        cy.visit(Cypress.env('url')+'Settings/Employee/Index?module=leave&submodule=leaveconfiguration')
        cy.wait(2000)
        cy.get('#ddLeavType').select(leaveType)
        cy.wait(2000)
        cy.xpath("//select[@id='ddMultipleLeaves']").select('should not')
        cy.wait(1000)
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

    it('login to ESS',function(){

        cy.EssLogin(employeeID, employeeID)
        cy.visit(Cypress.env('essUrl')+'Leave/Transaction/LeaveRequest?Menu=leave')
    
    })

    it('verify validation message - consecutive leave should not allowed',function(){
            
        cy.get('#drpLeaveType').select(leaveType)
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

        //clck on add butoon
        cy.get('#btnAdd').click()
        cy.wait(3000)

        //verify validation message
        cy.get(".noty_body").invoke('text').then((text) => {
            expect(text.trim()).equal('consecutive leave should not allowed')
        })
        cy.wait(1000)
        //click on message to close message box
        cy.get(".noty_body").click()
        cy.wait(2000)

    })

    it('Login to Cloud',function(){
		cy.login()
		cy.changeCompany();
	})
    
    it('Revert changes',function(){
        leave.DeleteLeaveConfiguration(leaveType)
    })

    it('set Multiple leaves should be allowed on consecutive days ',function(){
    
        cy.visit(Cypress.env('url')+'Settings/Employee/Index?module=leave&submodule=leaveconfiguration')
        cy.wait(2000)
        cy.get('#ddLeavType').select(leaveType)
        cy.wait(2000)
        cy.xpath("//select[@id='ddMultipleLeaves']").select('should')
        cy.wait(1000)
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
    it('Verify success message - leave applied successfully',function(){
    cy.EssLogin(employeeID, employeeID)
        leave.applyLeave(leaveType, leaveFromDate, leaveToDate, leaveFromDayType,leaveToDayType,
            Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode,
            ReliverSetting, leaveDay)   
    })

})