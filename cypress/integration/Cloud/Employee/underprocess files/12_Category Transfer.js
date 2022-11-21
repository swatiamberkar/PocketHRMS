describe('12_Category Transfer', function() {
	const { softAssert, softExpect } = chai;

	var EmpID ;
	var TrainingName ;
	var DateOfCompletion;
	var CertificationNumber;
	var AmountPaidToNomineeInPercentage;
	var DOB;
	var NameAndAddressOfGuardian;
	var Age;

	var EmpID ;
	var TrainingName_1 ;
	var DateOfCompletion_1;
	var NomineeRelationWithMember_1;
	var AmountPaidToNomineeInPercentage_1;
	var DOB_1;
	var NameAndAddressOfGuardian_1;
	var Age_1;

	before(() => {
		//Convert Employee json from Employee excel -> EmployeeDetail sheet
		cy.task('readXlsx', { file: 'cypress/fixtures/Employee/Employee.xlsx', sheet: "EmployeeDetail" }).then((rows) => {
			var rowsLength = rows.length;
			cy.writeFile("cypress/fixtures/Employee/Employee.json", {rows})
		  }) 

		//Convert FamilyDetails json from Employee excel -> FamilyDetails sheet
		cy.task('readXlsx', { file: 'cypress/fixtures/Employee/Employee.xlsx', sheet: "TrainingDetails" }).then((rows) => {
		   var rowsLength = rows.length;
		   cy.writeFile("cypress/fixtures/Employee/TrainingDetails.json", {rows})
		}) 

		//Get data from Employee json
		  cy.fixture('/Employee/Employee').then((data) => { 
			 EmpID = data.rows[1].EmpID
		  })   
		  
		 //Get data from FamilyDetails json
		//  cy.fixture('/Employee/TrainingDetails').then((data) => { 

		// 	TrainingName = data.rows[0].TrainingName;
		// 	DateOfCompletion = data.rows[0].DateOfCompletion;
		// 	CertificationNumber = data.rows[0].CertificationNumber;
		// 	AmountPaidToNomineeInPercentage = data.rows[0].AmountPaidToNomineeInPercentage;
		// 	DOB = data.rows[0].DOB;
		// 	NameAndAddressOfGuardian = data.rows[0].NameAndAddressOfGuardian;
		// 	Age = data.rows[0].Age;
		
		// 	TrainingName_1 = data.rows[1].TrainingName;
		// 	DateOfCompletion_1 = data.rows[1].DateOfCompletion;
		// 	CertificationNumber_1 = data.rows[1].NomineeRelationWithMember;
		// 	AmountPaidToNomineeInPercentage_1 = data.rows[1].AmountPaidToNomineeInPercentage;
		// 	DOB_1 = data.rows[0].DOB;
		// 	NameAndAddressOfGuardian_1 = data.rows[0].NameAndAddressOfGuardian;
		// 	Age_1 = data.rows[0].Age;

		//  }) 

		 cy.getCookies()
	  })

	beforeEach(function(){
		cy.getCookies()
	})

	it('Login to Cloud and Select Company', function() {	
		cy.login()
		cy.changeCompany();		
	})

	it('Navigate to Employment History', function() {

		  cy.navigate_EmployeeProfile(EmpID)
		  cy.get('#profile_detail_tab').click({force:true})
		  cy.get('#categoryTransferTab').click({force: true})
		  cy.get('#categoryTransferTab').click()
		  cy.get('#categoryTransferTab').click({force: true})

	})

	it('Transfer Category',function() {
	
	cy.wait(2000)	
	
	cy.get('#catId').select('Staff',{force: true})
	
	cy.get('#transDate').click({force: true}).then(input => {
		    input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val('15/04/'+Cypress.env('FinancialYear_From'))
	    })
	
	cy.wait(2000)
	cy.get('#ToEsiLocation').select('Pune',{force: true})	
		
	cy.get('#Reason').click({force: true})
    cy.get('#Reason').type('test purpose')	
	
	cy.get('#btncategoryTransfer').click({force: true})
	
	cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())		
		
		if(text.trim()=='From Category & To Category should be different.')	{
		cy.wait(2000)
		cy.get(".toast-message").click({force: true})
		cy.get('#catId').select('Admin',{force: true})
	
		}
		
		})
		cy.get('#btncategoryTransfer').click({force: true})
		
	})	
		
	it('Verify Transfer Category', function() {
		//Verify 
		cy.get('[name="SelfServiceRole"]').find(':selected').contains('Manager')
	
})



	
	


})
