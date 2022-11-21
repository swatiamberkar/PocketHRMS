describe('Monthly Input', function() {
	var employeeID='CY38';
	var month ='October'
	
	beforeEach(function(){
        cy.getCookies()
	})	
	it('Pocket HRMS Login', function() {
		cy.login()
	})
	
	it('Change Company', function() {		 
		cy.changeCompany(); 
	
	}) 
	//var company ='GreyTest'
	//var employeeID ='TEST-6'
	var PayrollProcessMonth=''
	
//	var company='Test_25'
//	var employeeID = 'CY3'


	it('N-TC Verify alert without selection of Single Employee', function() {	
		cy.visit(Cypress.env('url')+'payroll/transaction/payrollprocessing')
		cy.waitUntil(() => cy.server().should((server) => {expect(server.status).to.eq(200)}))
		
		cy.get("select[id='month']").then($input => {
                                 PayrollProcessMonth=  $input.val();
                                 
                                 cy.log("PayrollProcessMonth: "+PayrollProcessMonth);
                        })
						
		cy.contains('button', 'Single Employee').click({force: true})	
		cy.get('#processPayroll').click({force: true})
		
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).equal('Select Employee !')
		})	
		cy.wait(1000)
		cy.get(".toast-message").click({force: true})
		cy.wait(1000)
		cy.get('#deletePayroll').click({force: true})
		
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).equal('Select Employee !')
		})	
		cy.wait(1000)
		cy.get(".toast-message").click({force: true})
		cy.wait(1000)
	})
	
	it('N-TC Verify alert without selection of Selective Employees', function() {	
		cy.contains('button', 'Selective Employees').click({force: true})	
		cy.get('#processPayroll').click({force: true})
		
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).equal('Please Select any option from selective box')
		})	
		cy.wait(1000)
		cy.get(".toast-message").click({force: true})
		cy.wait(1000)
		cy.get('#deletePayroll').click({force: true})
		
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).equal('Please Select any option from selective box')
		})	
		cy.wait(1000)
		cy.get(".toast-message").click({force: true})
		cy.wait(1000)		
	}) 
		
	it('P-TC Verify alert with selection of Single Employee', function() {	
		
		cy.contains('button', 'Single Employee').click({force: true})	
		//cy.xpath('//button[@class="empPanel"]').click({force: true})
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type(employeeID)
		cy.wait(1000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		cy.get("select[id='month']").then($input => {
                                 PayrollProcessMonth=  $input.val();
                                 
                                 cy.log("PayrollProcessMonth: "+PayrollProcessMonth);
                        })
						
		cy.get('#processPayroll').click({force: true})
		cy.get(".alert-text").invoke('text').then((text) => {
				cy.log(text.trim())
				
		if(text.trim()=='Oh snap! Sorry Monthly Input Is Not Entered For This Month')
		{
			expect(text.trim()).equal('Oh snap! Sorry Monthly Input Is Not Entered For This Month')
			cy.visit(Cypress.env('url')+'payroll/transaction/monthlyinput')	
			cy.wait(2000)
			cy.get('[value="View"]').click({force: true})
			cy.wait(1000)
				cy.get('#categoryId').select("Staff",{force: true})
			cy.wait(1000)
			cy.get('[value="View"]').click({force: true})	
			cy.get('#inputMonth').select(PayrollProcessMonth,{force: true})
			cy.wait(1000)
			cy.get('[value="View"]').click({force: true})
		
			cy.get('#example').find('tr').then(listing => {
				var monthlyinputcount = Cypress.$(listing).length;
				if(monthlyinputcount==1)
				{
					cy.get('[value="Edit"]').click({force: true})
					
				}
			})
		
		 cy.wait(1000)	
			cy.get('#example> tbody').find('tr').each(function(row, i){
			 var num1 = parseFloat(i)+1
			 cy.get('#example > tbody > tr:nth-child('+num1+') > .th').invoke('text').then((text) => 
				{
					cy.log(text.trim())
					if(text.trim()==employeeID)
					{					
						cy.get('#example > tbody > tr:nth-child('+num1+') > td > .chked').check({force: true})
					}
					
					
				})
			})
		
		
			cy.get('[value="Save"]').click({force: true})
			cy.wait(1000)
			cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Record Save Successfully !')
			cy.log(text.trim())	
			})
	
	cy.visit(Cypress.env('url')+'payroll/transaction/payrollprocessing')
	
	cy.contains('button', 'Single Employee').click({force: true})	
		//cy.xpath('//button[@class="empPanel"]').click({force: true})
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type(employeeID)
		cy.wait(1000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		cy.get("select[id='month']").then($input => {
                                 PayrollProcessMonth=  $input.val();
                                 
                                 cy.log("PayrollProcessMonth: "+PayrollProcessMonth);
                        })
						
		cy.get('#processPayroll').click({force: true})
		cy.get(".alert-text").invoke('text').then((text) => {
				cy.log(text.trim())
			expect(text.trim()).equal('Payroll Process Completed')
		})			
				
		}
	else if(text.trim()=='Oh snap! Payroll is Locked for this month')		
	{
		expect(text.trim()).equal('Oh snap! Payroll is Locked for this month')
		cy.visit(Cypress.env('url')+'payroll/transaction/PaysheetLock')	
			cy.wait(2000)
			cy.get('#Month1').select(PayrollProcessMonth,{force: true})
			cy.xpath("//button[contains(text(),'Next')]").click({force: true})
			
			
			cy.wait(2000)
			cy.xpath("//label[contains(text(),'All Categories')]/input").click({force: true})
			cy.xpath("//button[@id='btnRelease']").click({force: true})
			
			
			/*cy.get('.categorytable > tbody').find('tr').each(function(row, i){
			var num1 = parseFloat(i)+1
			cy.get('.categorytable > tbody > tr:nth-child('+num1+') > td:nth-child(1)> label').invoke('text').then((text) => 
				{
					cy.log(text.trim())
					if(text.trim()==Employeecatagorytype.trim())
					{					
						cy.get('.categorytable > tbody > tr:nth-child('+num1+') > td:nth-child(1)>label>input').click()
						cy.get('.categorytable > tbody > tr:nth-child('+num1+') > td:nth-child(3)>button').click()
						cy.wait(2000)
					}
				})
			})
			*/
			
		cy.visit(Cypress.env('url')+'payroll/transaction/payrollprocessing')
		cy.wait(1000)
		
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type(employeeID)
		cy.wait(1000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		cy.get('#processPayroll').click({force: true})
		cy.get(".alert-text").invoke('text').then((text) => {
		
		if(text.trim()=='Oh snap! Already Payroll Processed For This Employee')	{
		expect(text.trim()).equal('Oh snap! Already Payroll Processed For This Employee')
		cy.wait(1000)
		
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type(employeeID)
		cy.wait(1000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		cy.get('#deletePayroll').click({force: true})
		
		cy.get(".alert-text").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).equal('Payroll Process Deleted Successfully')
		})
		cy.wait(1000)
		
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type(employeeID)
		cy.wait(1000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		cy.get('#processPayroll').click({force: true})
		cy.get(".alert-text").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).equal('Payroll Process Completed')
		})
		}
		else{
		expect(text.trim()).equal('Payroll Process Completed')
		}			
		})					
	}
	else if(text.trim()=='Oh snap! Already Payroll Processed For This Employee')	{
		expect(text.trim()).equal('Oh snap! Already Payroll Processed For This Employee')
		cy.wait(1000)
		
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type(employeeID)
		cy.wait(1000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		cy.get('#deletePayroll').click({force: true})
		
		cy.get(".alert-text").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).equal('Payroll Process Deleted Successfully')
		})
		cy.wait(1000)
		
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type(employeeID)
		cy.wait(1000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		cy.get('#processPayroll').click({force: true})
		cy.get(".alert-text").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).equal('Payroll Process Completed')
		})
	}
	else{
		
				expect(text.trim()).equal('Payroll Process Completed')
	
	}
	
	})
		
		
		
	})
	
	it('Payroll process(Single Employee) with out Emp selection', function() {
		
		cy.contains('button','Single Employee').click({force: true})
		
		cy.get('#processPayroll').click({force: true})
		
		cy.get(".toast-message").invoke('text').then((text) => {
				cy.log(text.trim())
				
				if(expect(text.trim()).equal('Select Employee !')){
					
					cy.get('.select2-search__field').click({force: true})
					cy.wait(2000)
					cy.get('input[type="search"]').click({force: true})
					cy.get('input[type="search"]').type(employeeID)
					cy.wait(2000)
					cy.get('.select2-results__option--highlighted').click({force: true})
					
				}
        })
		
		
		
	})
	
	it('Payroll process(Single Employee) with out Month', function() {
		
		cy.get('#month').select('')
		cy.get('#processPayroll').click({force: true})
		cy.get('#month').then(($input) => {
			expect($input[0].validationMessage).to.eq('Please select an item in the list.')
		})	
	})
	
	it('Payroll process(Single Employee) with out Year', function() {
		cy.get('#month').select('January',{force: true})
		
		cy.get('#year').click({force: true})
		cy.get('#year').clear()
		
		cy.get('#processPayroll').click({force: true})
		
		cy.wait(4000)
		cy.get('#year').then(($input) => {
			expect($input[0].validationMessage).to.eq('Please fill out this field.')
		})
		
		
	})
	
	/* it('Delete MonthlyInput of specific month for specific Emp ', function() {
		cy.visit('https://pockethrmsnext.azurewebsites.net/payroll/transaction/monthlyinput')	
		cy.wait(1000)
		cy.get('#inputMonth').select('October',{force: true})
		
		cy.get('[value="Edit"]').click({force: true})
		cy.wait(2000)
		
		 cy.wait(1000)	
			cy.get('#example> tbody').find('tr').each(function(row, i){
			 var num1 = parseFloat(i)+1
			 cy.get('#example > tbody > tr:nth-child('+num1+') > .th').invoke('text').then((text) => 
				{
					cy.log(text.trim())
					if(text.trim()==employeeID)
					{					
						cy.get('#example > tbody > tr:nth-child('+num1+') > td > .chked').check({force: true})
					}
					
				})
			})
		cy.wait(1000)
		cy.get('#btnDelete').click({force: true})
	}) */
	
	
/*	it('Payroll process(Single Employee) with no monthlyinput and save monthlyinput  && Payrollprocess', function() {
		cy.visit('https://pockethrmsnext.azurewebsites.net/payroll/transaction/payrollprocessing')
		cy.wait(1000)
		cy.get('.select2-search__field').click({force: true})
		cy.wait(2000)
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type(employeeID)
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		
		
		cy.get('#month').select('October',{force: true})
		cy.get('#processPayroll').click({force: true})
		
		cy.wait(4000)
		cy.get("#errMsg").invoke('text').then((text) => {
			cy.log(text.trim())
		
			if(expect(text.trim()).equal('Oh snap! Sorry Monthly Input Is Not Entered For This Month')){
				
				cy.visit('https://pockethrmsnext.azurewebsites.net/payroll/transaction/monthlyinput')	
				cy.wait(2000)
				cy.get('[value="View"]').click({force: true})
				cy.wait(1000)	
				cy.get('#inputMonth').select('October',{force: true})
				cy.wait(1000)
				cy.get('[value="View"]').click({force: true})
			
				cy.wait(2000)
				cy.get('.theme_dataTable > .table').find('tr').each(function(row, i){
					if(i!=0){
					//console.log(i)
					var num1 = parseFloat(i)
					 cy.get('.theme_dataTable > .table > tbody > tr:nth-child('+num1+') > .th').invoke('text').then((text) => {
						cy.log(text.trim())
						if(text.trim()==employeeID){					
							 cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(3) > .form-control').click()
							 cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(3) > .form-control').clear()
							 cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(3) > .form-control').type('0')
							  
							cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(4) > .form-control').click()	
							cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(4) > .form-control').clear()	
							cy.get('.table > tbody > tr:nth-child('+num1+') > td:nth-child(4) > .form-control').type('0')
							
							 cy.get('.table > tbody > tr:nth-child('+num1+') > td > .chked').check({force: true})
						}
					})
				
					}
					
				})
			
				cy.get('[value="Save"]').click({force: true})
				cy.wait(1000)
				cy.get(".toast-message").invoke('text').then((text) => {
					cy.log(text.trim())	
				})
				
				cy.wait(2000)
				cy.visit('https://pockethrmsnext.azurewebsites.net/payroll/transaction/payrollprocessing')
				cy.wait(1000)
				cy.contains('button', 'Single Employee').click({force: true})
				
				cy.get('.select2-search__field').click({force: true})
				cy.wait(2000)
				cy.get('input[type="search"]').click({force: true})
				cy.get('input[type="search"]').type(employeeID)
				cy.wait(2000)
				cy.get('.select2-results__option--highlighted').click({force: true})
				cy.get('#month').select('October',{force: true})
				cy.get('#processPayroll').click({force: true})
					
				cy.wait(6000)	
				cy.get("#succMsg").invoke('text').then((text) => {
					cy.log(text.trim())
				})
				
				}

		})

	})	
		
	*/	
		
	it('Delete  Payroll process(Single Employee) ', function() {
		
		cy.get('.select2-search__field').click({force: true})
		cy.wait(2000)
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type(employeeID)
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		
		cy.get('#month').select(PayrollProcessMonth,{force: true})
		cy.get('#year').type(2020)
		cy.get('#deletePayroll').click({force: true})
		cy.wait(1000)
		cy.get(".alert-text").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).equal('Payroll Process Deleted Successfully')
		})
		cy.wait(1000)
	})	
		
		
		
	
	it('Save MonthlyInput for All Employee for Perticular  month', function() {
		cy.visit(Cypress.env('url')+'payroll/transaction/monthlyinput')	
		cy.wait(2000)
		cy.get('#inputMonth').select(PayrollProcessMonth,{force: true})
		cy.wait(1000)
		cy.get('[value="View"]').click({force: true})
		cy.wait(2000)
		
		//cy.get('#chkAll').click({force: true})
		cy.wait(1000)
		cy.get('[value="Save"]').click({force: true})
		
	})
	
	
	
/*	it('Payroll process(Selective Employees) ', function() {
		cy.wait(2000)
		cy.visit(Cypress.env('url')+'payroll/transaction/payrollprocessing')
		cy.wait(2000)
		cy.contains('button', 'Selective Employees').click({force: true})
		
		
		cy.wait(1000)
		cy.get('#typeSelect1').check('all',{force: true})
		cy.get('[type="checkbox"]').eq(0).should('be.checked')
		//cy.get('[type="checkbox"]').eq(1).should('be.checked')
		
		
		//uncheck Admin and Manager catagory
		//cy.get('[type="checkbox"]').eq(1).uncheck({force: true})
		cy.contains('label', 'Admin').click({force: true})
		cy.contains('label', 'Manager').click({force: true})
		
		cy.get('#month').select(PayrollProcessMonth,{force: true})
		
		cy.get('#processPayroll').click({force: true})
		
		cy.wait(6000)
		
			cy.get("#succMsg").invoke('text').then((text) => {
			cy.log(text.trim())
		
			if(expect(text.trim()).equal('Payroll Process has been successfully validated and it will run in background process')){
				
				cy.visit(Cypress.env('url')+'payroll/transaction/monthlyinput')	
				
				cy.wait(2000)
				cy.get('#categoryId').select('Staff',{force: true})
				cy.get('#inputMonth').select(PayrollProcessMonth,{force: true})
				cy.wait(1000)
				cy.get('[value="View"]').click({force: true})
			
				cy.wait(2000)
				cy.get('[value="Save"]').click({force: true})
				cy.wait(1000)
				cy.get(".toast-message").invoke('text').then((text) => {
					cy.log(text.trim())	
				})
				cy.wait(2000)
				cy.get('#categoryId').select('Admin',{force: true})
				cy.get('#inputMonth').select(PayrollProcessMonth,{force: true})
				cy.wait(1000)
				cy.get('[value="View"]').click({force: true})
			
				cy.wait(2000)
				cy.get('[value="Save"]').click({force: true})
				cy.wait(1000)
				cy.get(".toast-message").invoke('text').then((text) => {
					cy.log(text.trim())	
				})
				cy.wait(2000)
				cy.visit(Cypress.env('url')+'payroll/transaction/payrollprocessing')
				cy.wait(2000)
				cy.contains('button', 'Selective Employees').click({force: true})
				cy.wait(1000)
				cy.get('#typeSelect1').check('all',{force: true})
				cy.get('[type="checkbox"]').eq(0).should('be.checked')
				cy.get('[type="checkbox"]').eq(1).should('be.checked')
		
				//uncheck Admin and Manager catagory
				//cy.get('[type="checkbox"]').eq(1).uncheck({force: true})
				cy.contains('label', 'Admin').click({force: true})
				cy.contains('label', 'Manager').click({force: true})
				
				cy.get('#month').select(PayrollProcessMonth,{force: true})
				
				cy.get('#processPayroll').click({force: true})
					
				cy.wait(6000)	
				cy.get("#succMsg").invoke('text').then((text) => {
					cy.log(text.trim())
				})
				
				}

		})

	})
*/	
/*	it('Delete  Payroll process(All Employee) ', function() {
		cy.wait(2000)
		cy.visit(Cypress.env('url')+'payroll/transaction/payrollprocessing')
		cy.wait(1000)
		cy.contains('button', 'All Employees').click({force: true})
		cy.get('#month').select(PayrollProcessMonth,{force: true})
		
		cy.get('#deletePayroll').click({force: true})
		cy.wait(1000)
		cy.get(".alert-text").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).equal('Payroll Process Deleted Successfully')
		})
		cy.wait(1000)
	})	
		
	
		
	it('Payroll process(All Employees)', function() {
		cy.visit(Cypress.env('url')+'payroll/transaction/payrollprocessing')
		cy.wait(2000)
		cy.contains('button', 'All Employees').click({force: true})
		cy.get('#month').select(PayrollProcessMonth,{force: true})
		
		cy.get('#processPayroll').click({force: true})
		
		cy.wait(6000)	
		cy.get("#succMsg").invoke('text').then((text) => {
			cy.log(text.trim())
		})	
		
	})

it('Delete  Payroll process(All Employee) ', function() {
		
		cy.wait(1000)
		cy.contains('button', 'All Employees').click({force: true})
		cy.get('#month').select(PayrollProcessMonth,{force: true})
		
		cy.get('#deletePayroll').click({force: true})
		cy.wait(1000)
		cy.get(".alert-text").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).equal('Payroll Process Deleted Successfully')
		})
		cy.wait(1000)
	})		
it('Payroll process(All Employees) with income tax', function() {
		cy.visit(Cypress.env('url')+'payroll/transaction/payrollprocessing')
		cy.wait(2000)
		cy.contains('button', 'All Employees').click({force: true})
		cy.get('#ItaxProcess').click({force: true})
		cy.get('#month').select(PayrollProcessMonth,{force: true})
		
		cy.get('#processPayroll').click({force: true})
		
		cy.wait(6000)	
		cy.get("#succMsg").invoke('text').then((text) => {
			cy.log(text.trim())
		})	
		
	})
it('Delete  Payroll process(All Employee) ', function() {
		
		cy.wait(1000)
		cy.contains('button', 'All Employees').click({force: true})
		cy.get('#month').select(PayrollProcessMonth,{force: true})
		
		cy.get('#deletePayroll').click({force: true})
		cy.wait(1000)
		cy.get(".alert-text").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).equal('Payroll Process Deleted Successfully')
		})
		cy.wait(1000)
	})		
it('Payroll process(All Employees) with income tax', function() {
		cy.visit(Cypress.env('url')+'payroll/transaction/payrollprocessing')
		cy.wait(2000)
		cy.contains('button', 'All Employees').click({force: true})
		cy.get('#ItaxProcess').click({force: true})
		cy.get('#month').select(PayrollProcessMonth,{force: true})
		
		cy.get('#processPayroll').click({force: true})
		
		cy.wait(6000)	
		cy.get("#succMsg").invoke('text').then((text) => {
			cy.log(text.trim())
		})	
		
	})	
it('Delete  Payroll process(All Employee) ', function() {
		
		cy.wait(1000)
		cy.contains('button', 'All Employees').click({force: true})
		cy.get('#month').select(PayrollProcessMonth,{force: true})
		
		cy.get('#deletePayroll').click({force: true})
		cy.wait(1000)
		cy.get(".alert-text").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).equal('Payroll Process Deleted Successfully')
		})
		cy.wait(1000)
	})		
it('Payroll process(All Employees) with Proof wise', function() {
		cy.visit(Cypress.env('url')+'payroll/transaction/payrollprocessing')
		cy.wait(2000)
		cy.contains('button', 'All Employees').click({force: true})
		cy.get('#ItaxProcessProofWise').click({force: true})
		cy.get('#month').select(PayrollProcessMonth,{force: true})
		
		cy.get('#processPayroll').click({force: true})
		
		cy.wait(6000)	
		cy.get("#succMsg").invoke('text').then((text) => {
			cy.log(text.trim())
		})	
		
	})	
it('Delete  Payroll process(All Employee) ', function() {
		
		cy.wait(1000)
		cy.contains('button', 'All Employees').click({force: true})
		cy.get('#month').select(PayrollProcessMonth,{force: true})
		
		cy.get('#deletePayroll').click({force: true})
		cy.wait(1000)
		cy.get(".alert-text").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).equal('Payroll Process Deleted Successfully')
		})
		cy.wait(1000)
	})		
it('Payroll process(All Employees) with Separated employees', function() {
		cy.visit(Cypress.env('url')+'payroll/transaction/payrollprocessing')
		cy.wait(2000)
		cy.contains('button', 'All Employees').click({force: true})
		cy.get('#withSeparated').click({force: true})
		cy.get('#month').select(PayrollProcessMonth,{force: true})
		
		cy.get('#processPayroll').click({force: true})
		
		cy.wait(6000)	
		cy.get("#succMsg").invoke('text').then((text) => {
			cy.log(text.trim())
		})	
		
	})
it('Delete  Payroll process(All Employee) ', function() {
		
		cy.wait(1000)
		cy.contains('button', 'All Employees').click({force: true})
		cy.get('#month').select(PayrollProcessMonth,{force: true})
		
		cy.get('#deletePayroll').click({force: true})
		cy.wait(1000)
		cy.get(".alert-text").invoke('text').then((text) => {
				cy.log(text.trim())
				expect(text.trim()).equal('Payroll Process Deleted Successfully')
		})
		cy.wait(1000)
	})		
it('Payroll process(All Employees) with Pending Leaves', function() {
		cy.visit(Cypress.env('url')+'payroll/transaction/payrollprocessing')
		cy.wait(2000)
		cy.contains('button', 'All Employees').click({force: true})
		cy.get('#pendingLeaves').click({force: true})
		cy.get('#month').select(PayrollProcessMonth,{force: true})
		
		cy.get('#processPayroll').click({force: true})
		
		cy.wait(6000)	
		cy.get("#succMsg").invoke('text').then((text) => {
			cy.log(text.trim())
		})	
		
	})		
		*/	
 })