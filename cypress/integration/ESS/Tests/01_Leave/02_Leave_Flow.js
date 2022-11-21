
//import Leave from '../../../ESS/Pages/Leave/Leave_Flow ';
import Leave from '../../../Leave/Pages/Leave/Leave_Flow ';


describe('Leave - Normal Flow', function () {
	const leave = new Leave()

	var moment = require('moment');
	const Day = moment().format('DD')
	const Day1 = parseInt(Day) + 1
	const Day2 = parseInt(Day) - 1
	const Month = moment().format('MM')
	const year = moment().format('YYYY')
	const yasterdayDate = moment().subtract(1, "days").format("DD/MM/YYYY");
	const currentDate = Day + '/' + Month + '/' + year
	const tomorrowDate = Day1 + '/' + Month + '/' + year

	var managerName = 'Timesheet'


	var downloadPath = 'cypress\\downloads\\'
	var teamReport = 'ReportDetailedManager'
	var myReport = 'ReportDetailed'


	var employeeID = 'CY3'
	var managerID = 'CY2'
	var admin = 'CY1'
	var leaveType = 'Paid Leave'
	var leaveTypeValue = 'PL'
	//var leaveFromDate = currentDate
	var leaveFromDate = '13/10/2022'
	//var leaveToDate = currentDate
	var leaveToDate = '13/10/2022'
	var leaveFromDayType = 'FULL DAY'
	var leaveToDayType = 'FULL DAY'
	var leaveDay = '1'

	before(function () {

		//cy.fixture('TestData/OnDuty').then(function (data) {
			//this.data = data
			console.log(this.data)
			//admin = data.admin
			//managerID = data.managerID
			//employeeID = data.employeeID
		//})
	})

	beforeEach(function () {
		cy.getCookies()

	})
	
	it('Apply Leave',function(){

        cy.EssLogin(employeeID, employeeID)
        leave.applyLeave(leaveType, leaveFromDate, leaveFromDayType, leaveToDate , leaveToDayType, leaveDay)	
    })
		
	
	it('Verify Notification at Manager ', function() {
        cy.EssLogin(managerID, managerID)
		cy.wait(5000)
        leave.verifyNotificationAtManager(employeeID)
       
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