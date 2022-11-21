describe('11_Self Service Role', function() {
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
		  cy.get('#Profile_SelfServiceRole').click({force: true})
		  cy.get('#Profile_SelfServiceRole').click()
		  cy.get('#Profile_SelfServiceRole').click({force: true})

	})

	it('Set Self Service Role',function() {
		cy.server()
		cy.get('#Profile_SelfServiceRole').click({force: true})
		cy.wait(2000)
		
		//cy.route('POST', Cypress.env('url')+'Employee/Employee/SelfServiceRole').as('selfservicerole')
		 cy.get('select[name=SelfServiceRole]').select('Manager',{force: true})
		 cy.wait(2000)
		// cy.get('[onclick="saveSelfServiceRole(this)"]').click({force: true})
		cy.get('[value="Save"]').click({force:true})
		//cy.wait('@selfservicerole').its('status').should('eq', 200) 
		
	})
	
	it('Verify imported SelfService Role', function() {
			//Verify 
			cy.get('[name="SelfServiceRole"]').find(':selected').contains('Manager')
		
	})



	
	


})
