import { Context } from 'mocha';
import Leave from './Pages/Leave/Leave';

describe('(C)- System \'should/should\' not consider intervening holidays as leave.', function () {
	const leave = new Leave()
	const { softAssert, softExpect , softTrue} = chai;

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


	
	var downloadPath = 'cypress\\downloads\\'
	var teamReport = 'ReportDetailedManager'
	var myReport = 'ReportDetailed'
	
	var employeeID = 'SA1'
	var EmployeeFirstName = 'Intervening'
	var EmployeeLastName = 'Holidays'
	var employeeJoiningDate = '01/01/2018'	
	var Designation = ''
	var Department = ''	
	var balance  = 10

	var managerID = 'CY2'
	var ManagerFirstName = 'Increment '
	var ManagerLastName = 'test'

	var HolidayDate = '22/10/2022'

	var admin = 'CY1'


	var leaveType = 'Paid Leave'
	var leaveTypeValue = 'PL'

	var leaveFromDate = '21/10/2022'
	//var leaveFromDate = '13/10/2022'
	var leaveToDate = '23/10/2022'
	//var leaveToDate = '13/10/2022'

	var leaveFromDayType = 'FULL DAY'
	var leaveToDayType = 'FULL DAY'
	var leaveDay = 3

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


/*context('Cloud Part',function(){

	it('Login to Cloud',function(){
		cy.login()
		cy.changeCompany();
	})

	it('Set Self Service Role',function(){
		leave.SetSelfServiceRole(employeeID, 'User')
	})

	it('Set Password',function(){
		leave.SetPassword(employeeID)
	})

	it('Set Manager',function(){
		leave.SetManager(employeeID, managerID)
	})

	it('Add Leave Opening',function(){
		leave.AddLeaveOpening(employeeID, leaveType)
	})

})

*/
	
context('ESS Part - Without any setting -',function(){
/*
	it('Apply Leave',function(){

		cy.EssLogin(employeeID, employeeID)
        leave.applyLeave(employeeID,EmployeeFirstName,EmployeeLastName, managerID,
		ManagerFirstName, ManagerLastName, leaveType, leaveTypeValue, leaveFromDate, leaveToDate, todayDate, employeeJoiningDate, 
		 leaveFromDayType, leaveToDayType, Reason, LeaveStation,VacationAddress, ContactNumber, ReliverCode, ReliverName,
		 APPROVERS, STATUS, MANAGERREMARKS, ReliverSetting, leaveDay)	
	})
*/

it('Verify Leave Details',function(){
	cy.EssLogin(employeeID, employeeID)
	leave.verifyLeaveDetailsAtLeaveRequest(employeeID,EmployeeFirstName,EmployeeLastName, managerID,
	ManagerFirstName, ManagerLastName, leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, todayDate, Designation, Department, employeeJoiningDate, 
	 leaveFromDayType, leaveToDayType, Reason, LeaveStation,VacationAddress, ContactNumber, ReliverCode, ReliverName,
	 APPROVERS, STATUS, MANAGERREMARKS, ReliverSetting, leaveDay)	
})

/*
	it('Verify Notification at Manager ', function() {
			cy.EssLogin(managerID, managerID)
			cy.wait(5000)
			leave.verifyNotificationAtManager(employeeID)
		   
		})	

	
		it('Verify Requsted Leave Details At Manager', function () {
			cy.EssLogin(managerID, managerID)
			leave.verifyRequstedLeaveDetailsAtManager(employeeID,EmployeeFirstName,EmployeeLastName, managerID,
				ManagerFirstName, ManagerLastName, leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, todayDate, Designation, Department, employeeJoiningDate, 
				 leaveFromDayType, leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
				 APPROVERS, STATUS, MANAGERREMARKS, ReliverSetting, leaveDay)  
		})


		it('Approve Leave at Manager', function () {
			cy.EssLogin(managerID, managerID)
			leave.approveLeave(employeeID, leaveType, leaveTypeValue, leaveFromDate)
		})

		

		it('Verify Leave in Team Report', function () {
			var todayDate = yasterdayDate
			var STATUS = 'Approved'
			cy.wait(5000)
			cy.EssLogin(managerID, managerID)
			leave.verifyLeaveInTeamReport(employeeID, leaveFromDate, leaveToDate)
			leave.verifyLeaveDetailsAtTeamReport(employeeID,EmployeeFirstName,EmployeeLastName, managerID,
				ManagerFirstName, ManagerLastName, leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, todayDate, Designation, Department, employeeJoiningDate, 
				 leaveFromDayType, leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
				 APPROVERS, STATUS, MANAGERREMARKS, ReliverSetting, leaveDay)
		})

		
		it('Verify Notification at Employee', function () {
			cy.EssLogin(employeeID, employeeID)
			leave.verifyNotificationAtEmployee(employeeID )
		})
	
		it('Verify Status at Employee', function () {
			var todayDate = yasterdayDate
			var STATUS = 'Approved'
			 balance = balance - leaveDay
			cy.EssLogin(employeeID, employeeID)
			leave.verifyStatusAtEmployee(leaveFromDate )
			leave.verifyLeaveDetailsAtLeaveRequest(employeeID,EmployeeFirstName,EmployeeLastName, managerID,
				ManagerFirstName, ManagerLastName, leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, todayDate, Designation, Department, employeeJoiningDate, 
				 leaveFromDayType, leaveToDayType, Reason, LeaveStation,VacationAddress, ContactNumber, ReliverCode, ReliverName,
				 APPROVERS, STATUS, MANAGERREMARKS, ReliverSetting, leaveDay)	
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
*/
/*
context('Cloud Part',function(){

	it('Login to Cloud',function(){
		cy.login()
		cy.changeCompany();
	})

	it('Set System \'should not\' consider intervening holidays as leave.',function(){
		leave.DeleteLeaveConfiguration(leaveType)
		cy.get('#Leave_LeaveConfiguration').click({force:true})
		cy.wait(2000)
		cy.get('#ddLeavType').select(leaveType)
		cy.wait(2000)
		cy.get('#ddInterHolidays').select('should not',{force:true})
		cy.get('#btnSave').click()	
		cy.wait(3000)
		cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
		expect(text.trim()).equal('Data saved successfully.!')		
		})

	})	

})


context('ESS Part',function(){

	it('With Setting \'Should not \' - Verify Validation - From Date is holiday.',function(){
        cy.EssLogin(employeeID, employeeID)

		const { softAssert, softExpect , softTrue} = chai;
        cy.visit(Cypress.env('essUrl')+'Leave/Transaction/LeaveRequest?Menu=leave')

		cy.wait(3000)	
		cy.get('#drpLeaveType').select(leaveType,{force: true}).focused()
		cy.wait(500)

		if(ReliverSetting == 'Yes')
		{
		cy.get('#select2-multiEmp-container').click({ force: true })
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(ReliverCode)
		cy.contains('li', '['+ReliverCode+']').click({ force: true })
		}

		cy.get('#txtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(leaveFromDate)
		})

        cy.get('#txtReason').click({force: true})
		
		cy.get('#txtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(leaveToDate)
		})
			
		cy.get('#btnAdd').click({force: true})

			cy.get('.noty_body').invoke('text').then((text) => {
            softExpect(text.trim()).to.eq('From Date is holiday.');
            })
    })
})


context('Cloud Part',function(){

	it('Login to Cloud',function(){
		cy.login()
		cy.changeCompany();
	})

	it('Set System \'should \' consider intervening holidays as leave.',function(){
	
		cy.wait(1000)
		cy.visit(Cypress.env('url')+'Settings/Employee/Index?module=organization&submodule=smtpsettings')
		cy.get('#leave_detail_tab').click({force:true})
		cy.get('#leave_detail_tab').click()
		cy.get('#leave_detail_tab').click({force:true})
		cy.wait(3000)

		cy.get('#Leave_LeaveConfiguration').click({force:true})
		cy.wait(2000)
		cy.get('#ddLeavType').select(leaveType)
		cy.wait(2000)
		cy.get('#ddInterHolidays').select('should',{force:true})
		cy.get('#btnSave').click()	
		cy.wait(3000)
		cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
		expect(text.trim()).equal('Data saved successfully.!')		
		})

	})	

})

*/

})
})