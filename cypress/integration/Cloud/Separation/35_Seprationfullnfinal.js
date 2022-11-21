describe('Sepration FullnFinal', function() {
	
	
	var employeeId = 'CY15';
	var monthlyinputcount=''
	
	
	var moment = require('moment');
	const Day = moment().format('DD')
	const Day1 = parseInt(Day)+1
	const Month = moment().format('MM')
	const year = moment().format('YYYY')
	const currentDate = Day+'/'+Month+'/'+year
	const tomorrowDate = Day1+'/'+Month+'/'+year
	
	
		Cypress.Commands.add('navigate_EmployeeProfile',()=>{
			cy.wait(1000)
			cy.get('#globalSearch').click({force: true})		
			cy.get('#globalSearch').clear()
			cy.get('#globalSearch').type(employeeId)
			cy.wait(2000)
			cy.contains('li', employeeId).click({force: true})
			cy.wait(3000)
		})
		
		Cypress.Commands.add('SaveEarningDeductionfields',()=>{
					cy.wait(2000)
					cy.server()   
					cy.get('#salary_detail_tab').click({force: true})
					cy.wait(2000)
					cy.get('#Salary_EarningDetails').click({force: true})
					cy.route('POST', Cypress.env('url')+'Employee/Employee/SaveEarningDetails').as('SaveEarningDetails')
					cy.wait(2000)
					
					cy.get('input[name=FB]').click({force: true})
					cy.get('input[name=FB]').clear()                
					cy.get('input[name=FB]').type('40000') 
					
					cy.get('input[name=FPROJ]').click({force: true})        
					cy.get('input[name=FPROJ]').clear()                
					cy.get('input[name=FPROJ]').type('10000')
			
					
					cy.get('input[name=FFIELD]').click({force: true})        
					cy.get('input[name=FFIELD]').clear()                        
				cy.get('input[name=FFIELD]').type('5000')
							
					cy.wait(1000)
					 cy.get('#btnSaveEarningDetails').click({force: true})
					cy.wait('@SaveEarningDetails').its('status').should('eq', 200)
					cy.get(".toast-message").invoke('text').then((earningtext) => {
					 cy.log(earningtext.trim())
					})
					
					cy.get('#Salary_DeductionDetails').click({force: true})
					cy.wait(1000)
					cy.route('POST', Cypress.env('url')+'Employee/Employee/SaveDeductionDetails').as('SaveDeductionDetails')
					cy.get('input[name=TDS]').click({force: true})
			cy.get('input[name=TDS]').clear()                
					cy.get('input[name=TDS]').type('200')
					
					 cy.get('#btnSaveDeductionDetails').click({force: true})
					cy.wait('@SaveDeductionDetails').its('status').should('eq', 200)
					cy.get(".toast-message").invoke('text').then((earningtext) => {
					 cy.log(earningtext.trim())
					})
					
			})
			
		
			
	it('Pocket HRMS Login', function() {
		cy.login()
	})

	beforeEach(function(){
        cy.getCookies()
	})
	
	it('Change Company', function() {		 
		cy.changeCompany(); 
	
	}) 

/*		it('Save Salary Details of EMp',function(){
			cy.navigate_EmployeeProfile();
			cy.wait(2000)
			cy.SaveEarningDeductionfields();
		
		 })
		 
/*	it('Delete payroll parocess jan to april',function(){
		  cy.wait(3000)
		cy.get('#payroll_detail_tab').click({force: true})
		cy.wait(3000)
		cy.get('#Utilities_PayrollProcess').click({force: true})
		cy.wait(2000)
		cy.get('#month').select('January',{force: true})
		cy.wait(1000)
		cy.get('#year').click({force: true})
		cy.get('#year').clear()
		cy.get('#year').type('2022')
		cy.wait(2000)
		cy.get("#btnProcessDelete").click({force: true})
		cy.wait(6000)
		
		cy.get('#month').select('February',{force: true})
		cy.wait(1000)
		cy.get('#year').click({force: true})
		cy.get('#year').clear()
		cy.get('#year').type('2022')
		cy.wait(2000)
		cy.get("#btnProcessDelete").click({force: true})
		
		
		//march
		cy.wait(6000)
		cy.get('#month').select('March',{force: true})
		cy.wait(1000)
		cy.get('#year').click({force: true})
		cy.get('#year').clear()
		cy.get('#year').type('2022')
		cy.wait(2000)
		cy.get("#btnProcessDelete").click({force: true})
		
		//april
		
		cy.wait(6000)
		
		cy.get('#month').select('April',{force: true})
		cy.wait(1000)
		cy.get('#year').click({force: true})
		cy.get('#year').clear()
		cy.get('#year').type('2022')
		cy.wait(2000)
		cy.get("#btnProcessDelete").click({force: true})
	})
	
	it('Delete monthly input && Save monthly input',function(){
		cy.wait(2000)
		cy.get('#Transaction_MonthlyInput').click({force: true})
		cy.wait(4000)
		//delete monthlyinput
		cy.get('#inputMonth').select('January',{force: true})
		cy.wait(1000)
		cy.get('#year').click({force: true})
		cy.get('#year').clear()
		cy.get('#year').type('2022')
		cy.wait(1000)
		cy.get("#btnDelete").click({force: true})
		
		cy.wait(5000)
		//feb
		cy.get('#inputMonth').select('February',{force: true})
		cy.wait(1000)
		cy.get('#year').click({force: true})
		cy.get('#year').clear()
		cy.get('#year').type('2022')
		cy.wait(1000)
		cy.get("#btnDelete").click({force: true})
		
		cy.wait(5000)
		//march
		cy.get('#inputMonth').select('March',{force: true})
		cy.wait(1000)
		cy.get('#year').click({force: true})
		cy.get('#year').clear()
		cy.get('#year').type('2022')
		cy.wait(1000)
		cy.get("#btnDelete").click({force: true})
		
		cy.wait(5000)
		//april
		cy.get('#inputMonth').select('April',{force: true})
		cy.wait(1000)
		cy.get('#year').click({force: true})
		cy.get('#year').clear()
		cy.get('#year').type('2022')
		cy.wait(1000)
		cy.get("#btnDelete").click({force: true})
		
		
		cy.wait(6000)
		cy.get('#inputMonth').select('February',{force: true})
		cy.wait(1000)
		cy.get('#year').click({force: true})
		cy.get('#year').clear()
		cy.get('#year').type('2022')
		cy.wait(2000)
		cy.get('#viewdata').click({force: true})
		cy.wait(2000)
		cy.xpath("//button[@class='btn btn-xs btn-success']").click({force: true})
		cy.wait(2000)
		cy.get('#inputMonth').select('February',{force: true})
		cy.wait(1000)
		cy.get('#editdata').click({force: true})
		cy.wait(2000)
		cy.xpath("//button[@class='btn btn-xs btn-success']").click({force: true})
	})	
		
	it('Payroll process on pervious month',function(){
		var PayrollProcessMonth='February';
		cy.server()      
		cy.route('POST', Cypress.env('url')+'Payroll/Transaction/PayrollProcessing?prcButton=Process&json=1').as('postComment')
		cy.get('#globalSearch').type(employeeId)
		cy.wait(4000)
		cy.contains('li', 'SeprationFullnFinal test(CY15)').click({force: true})
		cy.wait(3000)
		cy.get('#payroll_detail_tab').click({force: true})
		cy.wait(1000)
		cy.get('#Utilities_PayrollProcess').click({force: true})
		cy.wait(2000)	
		cy.get("select[id='month']").select(PayrollProcessMonth,{force: true})	
		cy.wait(1000)
		cy.get('#year').click({force: true})
		cy.get('#year').clear()
		cy.get('#year').type(Cypress.env('FinancialYear_To'))
		cy.wait(1000)		
		cy.get('#btnProcess').click({force: true})
		cy.wait('@postComment').its('status').should('eq', 200)
		cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
				
		if(text.trim()=='Already Payroll Processed For This Employee')	{
		expect(text.trim()).equal('Already Payroll Processed For This Employee')
		cy.wait(1000)
		cy.get(".toast-message").click({force: true})
		cy.wait(2000)
		cy.get('#btnProcessDelete').click({force: true})
		cy.wait(1000)
		cy.get(".toast-message").invoke('text').then((text) => {
			cy.log(text.trim())
				expect(text.trim()).equal('Payroll Process Deleted Successfully')
		})
		cy.wait(1000)
		cy.get(".toast-message").click({force: true})
		cy.wait(1000)
		cy.get('#btnProcess').click({force: true})
		cy.wait('@postComment').its('status').should('eq', 200)
		cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
		expect(text.trim()).equal('Payroll Process Completed Successfully')
		})
	}
		
	
		})
		
	
	
	})
*/	
	it('Employee Separation for FullnFinal',function(){
		cy.wait(2000)
		cy.server()
		cy.visit(Cypress.env('url')+'payroll/transaction/separation')
		cy.route('POST', Cypress.env('url')+'Payroll/Transaction/SaveSeparation').as('SaveSeparation')
		cy.wait(1000)
		cy.get('#select2-multiEmp-container').click({force: true})
		cy.wait(2000)
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type(employeeId)
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		
		cy.wait(1000)
		
		cy.get('#DateofJoining').then($input => {
			expect($input.val()).to.contain('02/02/2019')
		})	
		cy.get('#SeparationType').select('Separation',{force: true})
		
		cy.get('#LastWorkingDate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('30/03/'+Cypress.env('FinancialYear_To'))
		})
		
		cy.get('#ResignationDate').click({force: true}).then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('13/01/'+Cypress.env('FinancialYear_To'))
		})
		
		cy.get('#SeparationReason').select('Others',{force: true})
		cy.get('#Reason').click({force:true})
		cy.get('#Reason').type('Test Separation for Full n final!!!')
		
		
		cy.wait(1000)
		cy.get('button[onclick="return Validation();"]').click({force: true})
		cy.wait('@SaveSeparation').its('status').should('eq', 200) 
		cy.get(".toast-message").invoke('text').then((text) => {
				expect(text.trim()).equal('Seperation entry saved successfully!')
		})
		
	})	
	
	
	it('Full & Final Settlement',function(){
		cy.visit(Cypress.env('url')+'payroll/transaction/FullandFinal')
		cy.wait(1000)
		cy.get('#CategoryId').select('Staff',{force: true})
		cy.wait(1000)
		
		cy.get('#select2-multiEmp-container').click({force: true})
		cy.wait(2000)
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type(employeeId)
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		cy.wait(2000)
		
		
		//Apply month validation
		//cy.get('#monthlyinput').click({force: true})
		//cy.get(".toast-message").invoke('text').then((text) => {
			//if(expect(text.trim()).equal('Please Select Apply Month')){
				//cy.get(".toast-message").click({force: true})
				//cy.wait(1000)
				//cy.get('#month').select('March',{force: true})
			//}        
		//})
		
		
		
		cy.get('#month').select('March',{force: true})
		cy.wait(5000)
		cy.get('#resignationDate').then($input => {
			expect($input.val()).to.contain('13/01/'+Cypress.env('FinancialYear_To'))
		})
		
		cy.get('#relievingDate').then($input => {
			expect($input.val()).to.contain('30/03/'+Cypress.env('FinancialYear_To'))
		})
		
		cy.get('#settlementDate').then($input => {
			expect($input.val()).to.contain(currentDate)
		})
		
		
		cy.wait(1000)
		cy.get('#noticeperiod').click({force: true})
		cy.get('#noticeperiod').clear()
		cy.get('#noticeperiod').type('30')
		
		
		cy.get('#reportname').click({force: true})
		cy.get('#reportname').clear()
		cy.get('#reportname').type('test report')
		
		cy.get('#notes').click({force: true})
		cy.get('#notes').clear()
		cy.get('#notes').type('test fillnfinal')
		
		
		
		cy.get('[onclick="return validate()"]').click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
			if(expect(text.trim()).equal('Please Select Monthly Input')){
				cy.get(".toast-message").click({force: true})
				cy.wait(1000)
				cy.get('#monthlyinput').click({force: true})
			}        
		})
		cy.wait(2000)
		
		cy.get('input[name=WEEKOFF_DAYS]').click({force: true})
		cy.get('input[name=WEEKOFF_DAYS]').clear()
		 cy.get('input[name=WEEKOFF_DAYS]').type('6')
		 
		 
		 cy.get('input[name=NOTICE_PERIOD]').click({force: true})
		cy.get('input[name=NOTICE_PERIOD]').clear()		 
		 cy.get('input[name=NOTICE_PERIOD]').type('45')
		 
		 
		 cy.get('input[name=LEV_ENCASHDAY]').click({force: true})
		cy.get('input[name=LEV_ENCASHDAY]').clear()
		 cy.get('input[name=LEV_ENCASHDAY]').type('3')

			
		 cy.wait(1000)
		 cy.get('#Label1').click({force: true})
		cy.get('#Label1').clear()
		cy.get('#Label1').type('FullandFinal Remarks1')
		
		cy.get('#remarks1').click({force: true})
		cy.get('#remarks1').clear()
		cy.get('#remarks1').type('FullandFinal Remarks2')
		
		cy.get('#Label2').click({force: true})
		cy.get('#Label2').clear()
		cy.get('#Label2').type('FullandFinal Remarks3')
		
		cy.get('#remarks2').click({force: true})
		cy.get('#remarks2').clear()
		cy.get('#remarks2').type('FullandFinal Remarks4')
		
		cy.wait(2000)
		cy.get('[onclick="return validate()"]').click({force: true})
		cy.wait(3000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('F&F Processed Successfully')
		})	
	})	
	

	it('Release Emp after the fullnFinal Settlement',function(){
		cy.wait(2000)
		cy.visit(Cypress.env('url')+'Payroll/Transaction/separationRelease')
		cy.wait(2000)
		cy.get('#select2-multiEmp-container').click({force: true})
		cy.wait(2000)
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type(employeeId)
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		
		cy.wait(1000)
		cy.get('#ReleaseDate').click({force: true}).then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val('22/04/'+Cypress.env('FinancialYear_To'))
		})
		
		cy.get('[onclick="submitForm()"]').click({force: true})
		cy.wait(1000)
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Full & Final already done!')
		})
		
	})	
	
	
})
	
	
	