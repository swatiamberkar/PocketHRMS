import Leave from './Pages/Leave/Leave';

describe('h) This Leave will be applied based on DOJ and calculated after 1 months.', function () {

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

    var employeeID = 'CS19'
    var EmployeeFirstName = 'User'
    var EmployeeLastName = 'Leave'

    var employeeJoiningDate = '15/10/2022'
    var leaveFromDate = '01/11/2022'
    var leaveToDate = '02/11/2022'
    var leaveDay = 2

    var department = 'IT'
    var designation = 'HR'
    var balance = 10

    var managerID = 'CS20'
    //var managerID = 'SA12'
    var ManagerFirstName = 'Manager '
    var ManagerLastName = 'LeaveData'
    var admin = 'SA1'
    var leaveType = 'Paid Leave'
    var leaveTypeValue = 'PL'

  

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
       
    it('set leave applied base on DOJ - "H" ',function(){

        leave.DeleteLeaveConfiguration(leaveType)
        cy.wait(5000)

        //cy.visit(Cypress.env('url')+'Settings/Employee/Index?module=leave&submodule=leaveconfiguration')
        cy.wait(2000)
        cy.get('#ddLeavType').select(leaveType)
        cy.wait(2000)
        cy.get('#leavCrBasedOn').select('Date of Joining')
        cy.get('#leavCrCalAfter').clear()
        cy.get('#leavCrCalAfter').type(1)
        
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

    
    it('Verify Validation Message - You are not eligible for PL',function(){
        var leaveFromDate = '01/11/2022'
        var leaveToDate = '01/11/2022'
    
        cy.navigate_EmployeeProfile(employeeID)
    
        cy.get('#leave_detail_tab').click({force:true});
        cy.wait(2000)
        
        cy.get('#Leave_LeaveEntry').click({force:true})
    
        cy.wait(5000)
        cy.xpath("//div[@id='leaveContentTitle']//i[@class='fas fa-plus']").click({ force: true })
        cy.wait(2000)
    
        cy.get('#leaveType').select(leaveType, { force: true })
    
        cy.get('#remarks').click({ force: true })
        cy.get('#remarks').clear()
        cy.get('#remarks').type(Reason);
    
        cy.get('#fromdate').click().then(input => {
            input[0].dispatchEvent(new Event('input', { bubbles: true }))
            input.val(leaveFromDate)
        })
    
        cy.wait(1000)
        cy.get('#todate').click().then(input => {
            input[0].dispatchEvent(new Event('input', { bubbles: true }))
            input.val(leaveToDate)
        })
    
        cy.wait(1000)
        cy.get('#drpFromDayType').select(leaveFromDayType, { force: true })
        cy.get('#drpToDayType').select(leaveToDayType, { force: true })
        //cy.get('#drpFromDayType').select(leaveDateRange[j].FromDateDay)
        //cy.get('#drpToDayType').select(leaveDateRange[j].ToDateDay)
    
    
        cy.wait(3000)
        cy.get('#btnAddLeave').click({ force: true })
        cy.wait(3000)
    
    
    
        cy.get(".toast-message").invoke('text').then((text) => {
            cy.log(text.trim())
            softExpect(text.trim()).to.eq('You are not eligible for PL');
        })
    
        cy.get('#btnclose').click({ force: true })
        cy.wait(2000)
    
    })
    
     it('Verify Leave by adding Leave From Cloud', function () {
       // cy.navigate_EmployeeProfile(employeeID)
        leave.addLeaveFromCloud(leaveType, leaveTypeValue, leaveFromDate, leaveFromDayType, leaveToDate, leaveToDayType, leaveDay, Reason)
        leave.deleteEmployeesAllLeaves()
    })
   

  it('login to ESS',function(){

        cy.EssLogin(employeeID, employeeID)
        cy.visit(Cypress.env('essUrl')+'Leave/Transaction/LeaveRequest?Menu=leave')
    
    })
    
    it('verify validation message - You are not eligible for PL',function(){
    
        var leaveFromDate = '01/11/2022'
        var leaveToDate = '01/11/2022'

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
        cy.wait(1000)
        //verify validation message
        cy.get(".noty_body").invoke('text').then((text) => {
            expect(text.trim()).equal('You are not eligible for PL')
        })
        cy.wait(1000)
        //click on message to close message box
        cy.get(".noty_body").click()
        cy.wait(2000)
    })
    
    it('Apply Leave', function () {
		//cy.EssLogin(employeeID, employeeID)
		leave.applyLeave(leaveType, leaveFromDate, leaveToDate, leaveFromDayType,
			Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode,
			ReliverSetting, leaveDay)
	})


})