
describe('Favouit Menu', function() {
	
	
	
	Cypress.Commands.add('navigate_EmployeeProfile',()=>{
		cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeID)
		cy.wait(2000)
		cy.contains('li', employeeID).click({force: true})
		cy.wait(3000)
	})

	Cypress.Commands.add('delete_ManagerDetails',()=>{
		cy.wait(2000)
	cy.get('.fa-trash-alt').eq(0).click({force: true})
	cy.wait(2000)
	})
	

	it('successfully page  loads', function() {
		 cy.clearLocalStorage() ;
		cy.window().then((win) => {
				win.sessionStorage.clear()
		})
        cy.clearCookies();
		cy.visit(Cypress.env('url')) 
	})
	beforeEach(function(){
        cy.getCookies()
	})
	
	it('Pocket HRMS Login', function() {
		cy.login()
	})
		
	it('Change Company', function() {	
	
		cy.changeCompany()	 
	})

/*	it('Add & Verify Favouit Menu of Analytics', function() {
		const { softAssert, softExpect } = chai;
		cy.xpath("//i[@class='dripicons-menu nav-icon']").click({force:true})
		
		cy.xpath("//span[contains(text(),'Analytics')]").click({force:true})
		cy.wait(2000)
		cy.get('[data-submenu="Dashboard"]>i').click({force:true})
		cy.wait(2000)
		cy.get('[data-submenu="Data Wizard"]>i').click({force:true})
		cy.wait(2000)
		cy.get('[data-submenu="Reports"]>i').click({force:true})
		cy.wait(2000)
		cy.reload()	
		cy.wait(2000)
		cy.xpath("//body/div[@id='topbar']/nav[@class='navbar-custom rightnav']/ol[@class='list-unstyled topbar-nav float-right mb-0']/li[2]/a[1]").click({force:true})
		cy.wait(2000)
		cy.get("#menu>tr>th").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Analytics');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Dashboard');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Data Wizard');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Data Wizard');
			})
		
	})
	
	*/
	it('Add & Verify Favouit Menu of Employee', function() {
		const { softAssert, softExpect } = chai;
		cy.xpath("//i[@class='dripicons-menu nav-icon']").click({force:true})
		
		cy.xpath("//span[@class='menu-name'][contains(text(),'Employee')]").click({force:true})
		cy.wait(2000)
		cy.get('[data-submenu="Documents"]>i').click({force:true})
		cy.wait(2000)
		cy.get('[data-submenu="Employee List"]>i').click({force:true})
		cy.wait(2000)
		cy.get('[data-submenu="Import"]>i').click({force:true})
		cy.wait(2000)
		cy.reload()	
		cy.wait(2000)
		cy.xpath("//body/div[@id='topbar']/nav[@class='navbar-custom rightnav']/ol[@class='list-unstyled topbar-nav float-right mb-0']/li[2]/a[1]").click({force:true})
		cy.wait(2000)
			cy.get("#menu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Employee');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Documents');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Employee List');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Import');
			})
		
	})
	
/*	it('Add & Verify Favouit Menu of Import of Payroll', function() {
		const { softAssert, softExpect } = chai;
		cy.xpath("//i[@class='dripicons-menu nav-icon']").click({force:true})
		
		cy.xpath("//span[@class='menu-name'][contains(text(),'Payroll')]").click({force:true})
		cy.xpath("//div[@id='MetricaProject']//h6[@class='menu-title'][contains(text(),'Import')]").click({force:true})
		cy.wait(1000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Employee Separation']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Increment']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Loan']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Monthly Input']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Past Data']//i").click({force:true})
		cy.wait(2000)
		
		
		cy.reload()	
		cy.wait(2000)
		cy.xpath("//body/div[@id='topbar']/nav[@class='navbar-custom rightnav']/ol[@class='list-unstyled topbar-nav float-right mb-0']/li[2]/a[1]").click({force:true})
		cy.wait(2000)
			cy.get("#menu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Import');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Employee Separation');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Increment');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Loan');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Monthly Input');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Past Data');
			})
		
	})
*/	
/*	it('Add & Verify Favouit Menu of Transaction of Payroll', function() {
		const { softAssert, softExpect } = chai;
		cy.xpath("//i[@class='dripicons-menu nav-icon']").click({force:true})
		
		cy.xpath("//span[@class='menu-name'][contains(text(),'Payroll')]").click({force:true})
		cy.xpath("//div[@id='MetricaProject']//h6[@class='menu-title'][contains(text(),'Transaction')]").click({force:true})
		cy.wait(1000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Arrear View']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Increment']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Loan']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='LOP Credit']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Monthly Input']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Release Employee']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Separation']//i").click({force:true})
		cy.wait(2000)
		
		cy.reload()	
		cy.wait(2000)
		cy.xpath("//body/div[@id='topbar']/nav[@class='navbar-custom rightnav']/ol[@class='list-unstyled topbar-nav float-right mb-0']/li[2]/a[1]").click({force:true})
		cy.wait(2000)
			cy.get("#menu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Transaction');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Arrear View');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Increment');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Loan');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('LOP Credit');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Monthly Input');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Release Employee');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Separation');
			})
		
	})
	
	
	it('Add & Verify Favouit Menu of Utilities of Payroll', function() {
		const { softAssert, softExpect } = chai;
		cy.xpath("//i[@class='dripicons-menu nav-icon']").click({force:true})
		
		cy.xpath("//span[@class='menu-name'][contains(text(),'Payroll')]").click({force:true})
		cy.xpath("//div[@id='MetricaProject']//h6[@class='menu-title'][contains(text(),'Utilities')]").click({force:true})
		cy.wait(1000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Full and Final Settlement']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Payroll Process']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Paysheet Lock']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Self Service Post']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Stop Payment']//i").click({force:true})
		cy.wait(2000)
		
		cy.reload()	
		cy.wait(2000)
		cy.xpath("//body/div[@id='topbar']/nav[@class='navbar-custom rightnav']/ol[@class='list-unstyled topbar-nav float-right mb-0']/li[2]/a[1]").click({force:true})
		cy.wait(2000)
			cy.get("#menu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Utilities');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Full and Final Settlement');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Payroll Process');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Paysheet Lock');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Self Service Post');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Stop Payment');
			})	
	})



	it('Add & Verify Favouit Menu of Import of Income Tax', function() {
		const { softAssert, softExpect } = chai;
		cy.xpath("//i[@class='dripicons-menu nav-icon']").click({force:true})
		
		cy.xpath("//span[contains(text(),'Income Tax')]").click({force:true})
		cy.xpath("//div[@id='MetricaEcommerce']//h6[@class='menu-title'][contains(text(),'Import')]").click({force:true})
		cy.wait(1000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Declaration']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='House Rent Paid']//i").click({force:true})
		cy.wait(2000)
		//cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Offline TDS Details']//i").click({force:true})
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Other Income Details']//i").click({force:true})
		cy.wait(2000)
		
		cy.reload()	
		cy.wait(2000)
		cy.xpath("//body/div[@id='topbar']/nav[@class='navbar-custom rightnav']/ol[@class='list-unstyled topbar-nav float-right mb-0']/li[2]/a[1]").click({force:true})
		cy.wait(2000)
			cy.get("#menu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Import');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Declaration');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('House Rent Paid');
			})
			
		//	cy.get("#submenu").invoke('text').then((text) => {
		//	softExpect(text.trim()).to.contains('Offline TDS Details');
		//	})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Other Income Details');
			})
			
		
	})
	
	
	it('Add & Verify Favouit Menu of Transaction of Income Tax', function() {
		const { softAssert, softExpect } = chai;
		cy.xpath("//i[@class='dripicons-menu nav-icon']").click({force:true})
		
		cy.xpath("//span[contains(text(),'Income Tax')]").click({force:true})
		cy.xpath("//div[@id='MetricaEcommerce']//h6[@class='menu-title'][contains(text(),'Transaction')]").click({force:true})
		cy.wait(1000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Bank Details']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Challan Entry']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Declaration Entry']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='House Rent Paid']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Other Income Entry']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Previous Employers Tax']//i").click({force:true})
		cy.wait(2000)
		
		cy.reload()	
		cy.wait(2000)
		cy.xpath("//body/div[@id='topbar']/nav[@class='navbar-custom rightnav']/ol[@class='list-unstyled topbar-nav float-right mb-0']/li[2]/a[1]").click({force:true})
		cy.wait(2000)
			cy.get("#menu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Transaction');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Bank Details');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Challan Entry');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Declaration Entry');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('House Rent Paid');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Other Income Entry');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Previous Employers Tax');
			})
		
	})
	
	
	
	it('Add & Verify Favouit Menu of Utilities of Income Tax', function() {
		const { softAssert, softExpect } = chai;
		cy.xpath("//i[@class='dripicons-menu nav-icon']").click({force:true})
		
		cy.xpath("//span[contains(text(),'Income Tax')]").click({force:true})
		cy.xpath("//div[@id='MetricaEcommerce']//h6[@class='menu-title'][contains(text(),'Utilities')]").click({force:true})
		cy.wait(1000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Income Tax Process']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Web Post ']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Year End Transfer']//i").click({force:true})
		cy.wait(2000)
	
		cy.reload()	
		cy.wait(2000)
		cy.xpath("//body/div[@id='topbar']/nav[@class='navbar-custom rightnav']/ol[@class='list-unstyled topbar-nav float-right mb-0']/li[2]/a[1]").click({force:true})
		cy.wait(2000)
			cy.get("#menu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Utilities');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Income Tax Process');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Web Post');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Year End Transfer');
			})
		
	})



	it('Add & Verify Favouit Menu of Import of Leave', function() {
		const { softAssert, softExpect } = chai;
		cy.xpath("//i[@class='dripicons-menu nav-icon']").click({force:true})
		
		cy.xpath("//span[@class='menu-name'][contains(text(),'Leave')]").click({force:true})
		cy.xpath("//div[@id='MetricaCRM']//h6[@class='menu-title'][contains(text(),'Import')]").click({force:true})
		cy.wait(1000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Leave Credit']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Leave Debit']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Leave Opening']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Leave Used']//i").click({force:true})
		cy.wait(2000)
		
		
		cy.reload()	
		cy.wait(2000)
		cy.xpath("//body/div[@id='topbar']/nav[@class='navbar-custom rightnav']/ol[@class='list-unstyled topbar-nav float-right mb-0']/li[2]/a[1]").click({force:true})
		cy.wait(2000)
			cy.get("#menu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Import');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Leave Credit');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Leave Debit');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Leave Opening');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Leave Used');
			})
			
		
	})
	
	
	
	it('Add & Verify Favouit Menu of Transaction of Leave', function() {
		const { softAssert, softExpect } = chai;
		cy.xpath("//i[@class='dripicons-menu nav-icon']").click({force:true})
		
		cy.xpath("//span[@class='menu-name'][contains(text(),'Leave')]").click({force:true})
		cy.xpath("//div[@id='MetricaCRM']//h6[@class='menu-title'][contains(text(),'Transaction')]").click({force:true})
		cy.wait(1000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Leave Debit']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Leave Entry']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Leave Opening']//i").click({force:true})
		cy.wait(2000)
		
		cy.reload()	
		cy.wait(2000)
		cy.xpath("//body/div[@id='topbar']/nav[@class='navbar-custom rightnav']/ol[@class='list-unstyled topbar-nav float-right mb-0']/li[2]/a[1]").click({force:true})
		cy.wait(2000)
			cy.get("#menu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Transaction');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Leave Debit');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Leave Entry');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Leave Opening');
			})
			
		
	})
	
	
	
	it('Add & Verify Favouit Menu of Utilities of Leave', function() {
		const { softAssert, softExpect } = chai;
		cy.xpath("//i[@class='dripicons-menu nav-icon']").click({force:true})
		
		cy.xpath("//span[@class='menu-name'][contains(text(),'Leave')]").click({force:true})
		cy.xpath("//div[@id='MetricaCRM']//h6[@class='menu-title'][contains(text(),'Utilities')]").click({force:true})
		cy.wait(1000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Comp off Credit']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Comp Off Process']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Leave Credit Process']//i").click({force:true})
		cy.wait(2000)
	
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Posting to Payroll']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Sandwich Leave Process']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Yearly Transfer']//i").click({force:true})
		cy.wait(2000)
		
		cy.reload()	
		cy.wait(2000)
		cy.xpath("//body/div[@id='topbar']/nav[@class='navbar-custom rightnav']/ol[@class='list-unstyled topbar-nav float-right mb-0']/li[2]/a[1]").click({force:true})
		cy.wait(2000)
			cy.get("#menu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Utilities');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Comp off Credit');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Comp Off Process');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Leave Credit Process');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Posting to Payroll');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Sandwich Leave Process');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Yearly Transfer');
			})
		
	})




	it('Add & Verify Favouit Menu of Import of Attendance', function() {
		const { softAssert, softExpect } = chai;
		cy.xpath("//i[@class='dripicons-menu nav-icon']").click({force:true})
		
		cy.xpath("//span[@class='menu-name'][contains(text(),'Attendance')]").click({force:true})
		cy.xpath("//div[@id='MetricaOthers']//h6[@class='menu-title'][contains(text(),'Import')]").click({force:true})
		cy.wait(1000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Auto Shift Upload']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Employee Mapping Import']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Holiday Upload']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Invalid Punches Import']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Machine Log Import']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Onduty Import']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Roster Import']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Shift Schdule Date Wise Import']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Shift Schdule Import']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Unpunches Import']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Weekly Off Upload']//i").click({force:true})
		cy.wait(2000)
		
		cy.reload()	
		cy.wait(2000)
		cy.xpath("//body/div[@id='topbar']/nav[@class='navbar-custom rightnav']/ol[@class='list-unstyled topbar-nav float-right mb-0']/li[2]/a[1]").click({force:true})
		cy.wait(2000)
			cy.get("#menu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Import');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Auto Shift Upload');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Employee Mapping Import');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Holiday Upload');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Invalid Punches Import');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Machine Log Import');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Onduty Import');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Roster Import');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Shift Schdule Date Wise Import');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Shift Schdule Import');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Unpunches Import');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Weekly Off Upload');
			})
		
			
		
	})
	
	

	
	it('Add & Verify Favouit Menu of Transaction of Attendance', function() {
		const { softAssert, softExpect } = chai;
		cy.xpath("//i[@class='dripicons-menu nav-icon']").click({force:true})
		
		cy.xpath("//span[@class='menu-name'][contains(text(),'Attendance')]").click({force:true})
		cy.xpath("//div[@id='MetricaOthers']//h6[@class='menu-title'][contains(text(),'Transaction')]").click({force:true})
		cy.wait(1000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Auto Shift']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Early Going Authorization']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Employee Mapping']//i").click({force:true})
		cy.wait(2000)
		
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Employee Roster']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Invalid Punches Entry']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Late Authorization']//i").click({force:true})
		cy.wait(2000)
		
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Manual OT Entry']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='OT Entry Multi']//i").click({force:true})
		cy.wait(2000)
		
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Shift Schdule Multi']//i").click({force:true})
		cy.wait(2000)
		
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Shift Schdule Single']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Time Consolidation All']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='UnPunches Entry']//i").click({force:true})
		cy.wait(2000)
		
		cy.reload()	
		cy.wait(2000)
		cy.xpath("//body/div[@id='topbar']/nav[@class='navbar-custom rightnav']/ol[@class='list-unstyled topbar-nav float-right mb-0']/li[2]/a[1]").click({force:true})
		cy.wait(2000)
			cy.get("#menu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Transaction');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Auto Shift');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Early Going Authorization');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Employee Mapping');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Employee Roster');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Invalid Punches Entry');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Late Authorization');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Manual OT Entry');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('OT Entry Multi');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Shift Schdule Multi');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Shift Schdule Single');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Time Consolidation All');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('UnPunches Entry');
			})
			
		
	})
	
	
	
	
	it('Add & Verify Favouit Menu of Utilities of Attendance', function() {
		const { softAssert, softExpect } = chai;
		cy.xpath("//i[@class='dripicons-menu nav-icon']").click({force:true})
		
		cy.xpath("//span[@class='menu-name'][contains(text(),'Attendance')]").click({force:true})
		cy.xpath("//div[@id='MetricaOthers']//h6[@class='menu-title'][contains(text(),'Utilities')]").click({force:true})
		cy.wait(1000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Error Report']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='In Out Import']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Invalid Correction process']//i").click({force:true})
		cy.wait(2000)
	
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Payroll Posting']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Release All Locks']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Roaster Process']//i").click({force:true})
		cy.wait(2000)
		
		cy.reload()	
		cy.wait(2000)
		cy.xpath("//body/div[@id='topbar']/nav[@class='navbar-custom rightnav']/ol[@class='list-unstyled topbar-nav float-right mb-0']/li[2]/a[1]").click({force:true})
		cy.wait(2000)
			cy.get("#menu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Utilities');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Error Report');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('In Out Import');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Invalid Correction process');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Payroll Posting');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Release All Locks');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Roaster Process');
			})
		
	})


	it('Add & Verify Favouit Menu of Import of Benefit', function() {
		const { softAssert, softExpect } = chai;
		cy.xpath("//i[@class='dripicons-menu nav-icon']").click({force:true})
		
		cy.xpath("//span[@class='menu-name'][contains(text(),'Benefit')]").click({force:true})
		cy.xpath("//div[@id='BenefitProject']//h6[@class='menu-title'][contains(text(),'Import')]").click({force:true})
		cy.wait(1000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Claim Entry']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Increment']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Opening Balance']//i").click({force:true})
		cy.wait(2000)
		cy.reload()	
		cy.wait(2000)
		cy.xpath("//body/div[@id='topbar']/nav[@class='navbar-custom rightnav']/ol[@class='list-unstyled topbar-nav float-right mb-0']/li[2]/a[1]").click({force:true})
		cy.wait(2000)
			cy.get("#menu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Import');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Claim Entry');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Increment');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Opening Balance');
			})		
		
	})
	
	

	
	it('Add & Verify Favouit Menu of Transaction of Benefit', function() {
		const { softAssert, softExpect } = chai;
		cy.xpath("//i[@class='dripicons-menu nav-icon']").click({force:true})
		
		cy.xpath("//span[@class='menu-name'][contains(text(),'Benefit')]").click({force:true})
		cy.xpath("//div[@id='BenefitProject']//h6[@class='menu-title'][contains(text(),'Transaction')]").click({force:true})
		cy.wait(1000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Benefit Increment']//i").click({force:true})
		cy.wait(2000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Claim Entry']//i").click({force:true})
		
		cy.reload()	
		cy.wait(2000)
		cy.xpath("//body/div[@id='topbar']/nav[@class='navbar-custom rightnav']/ol[@class='list-unstyled topbar-nav float-right mb-0']/li[2]/a[1]").click({force:true})
		cy.wait(2000)
			cy.get("#menu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Transaction');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Benefit Increment');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Claim Entry');
			})
			
			
		
	})
	
	
	
	
	it('Add & Verify Favouit Menu of Utilities of Benefit', function() {
		const { softAssert, softExpect } = chai;
		cy.xpath("//i[@class='dripicons-menu nav-icon']").click({force:true})
		
		cy.xpath("//span[@class='menu-name'][contains(text(),'Benefit')]").click({force:true})
		cy.xpath("//div[@id='BenefitProject']//h6[@class='menu-title'][contains(text(),'Utilities')]").click({force:true})
		cy.wait(1000)
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='F&F Process']//i").click({force:true})
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Monthly Payout']//i").click({force:true})
		cy.xpath("//li[@class='nav-item mm-active']//a[@data-submenu='Year End Process']//i").click({force:true})
		
		cy.reload()	
		cy.wait(2000)
		cy.xpath("//body/div[@id='topbar']/nav[@class='navbar-custom rightnav']/ol[@class='list-unstyled topbar-nav float-right mb-0']/li[2]/a[1]").click({force:true})
		cy.wait(2000)
			cy.get("#menu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Utilities');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('F&F Process');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Monthly Payout');
			})
			
			cy.get("#submenu").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Year End Process');
			})
			
		
	})

*/

	})