
describe('Approval Matrix- Employee Details', function() {
	
	var url = Cypress.env('url')
	
	// Appraisal Configuration
	var appraisalMode = 'Annual'
	var appraisalMode1 = 'Quarterly'
	var appraisalMode2 = 'Monthly'
	var appraisalMode3 = 'HalfYearly'
	var fromYear = '2020'
	var toYear = '2021'
	var completedMonth = '2'
	var setDefaultFinancialYear = 'Yes'
	var setDefaultFinancialYear1 = 'No'
	var rating ='0'
	
	// Appraisal Configuration
	var fromYear1 = '2021'
	var toYear1 = '2022'
	var completedMonth1 = '10'
	var rating1 ='Weightage'
	
	
	//Grading Matrix
	var GradingFrom = '11'
	var GradingTo = '20'
	var Status = 'Average'
	var Details= 'Average' 
	var Percentage = '50'
	
	var GradingFrom1 = '12'
	var GradingTo1 = '18'
	var Status1 = 'Good'
	var Details1 = 'Good' 
	var Percentage1 = '80'
		
	// Appraisal Parameter
	var BusinessUnit = 'Category'
	var Value = 'Staff'
	var Name = 'Test'
	var Marks = '20'
	var Name1 = 'Test1'
	var Marks1 = '30'
	var Name2 = 'Test2'
	var Marks2 = '50'
	
	//Appraisal Questions
	var AppraisalParameter = 'Test'
	var Weightage = '10'
	var Question = 'Who is responsible for Appraisal Task?'
	var EmployeeGoals = 'Team Leader'
	var AnswerType = 'StarRating'
	
	var Weightage1 = '20'
	var Question1 = 'Who is responsible for Approval Matrix Task?'
	var EmployeeGoals1 = 'Developer'
	var AnswerType1 = 'Scale'
	
	
	
	beforeEach(function(){
		cy.getCookies()
		})
		
	
	it('Login to Cloud & select Company', function() {
		cy.login()
		cy.changeCompany();		
	})
	


	
	it('Navigate Appraisal Configuration Page', function() {	
		//cy.visit(url+'/Settings/Employee/Index?module=Appraisal&submodule=AppraisalConfiguration')
		cy.visit('https://pockethrmsnext.azurewebsites.net/Settings/Employee/Index?module=Appraisal&submodule=AppraisalConfiguration')
		cy.wait(2000)
		cy.xpath("//div[@id='AppraisalContentTitle']//i[@class='fas fa-plus']").click({force:true})
		cy.wait(2000)
		})
	
	it('Verify Validation Massage - Select appriasal mode', function() {	
		const { softAssert, softExpect } = chai;
		 cy.get('#createBtn').click({force: true})
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Select appriasal mode');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
	})
	
	it('Verify Validation Massage - Select period', function() {	
		const { softAssert, softExpect } = chai;
		cy.get('#appmode').select(appraisalMode1,{force: true})
		cy.wait(1000)
		 cy.get('#createBtn').click({force: true})
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Select period');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
	})
	
	it('Verify Validation Massage - Select Month', function() {	
		const { softAssert, softExpect } = chai;
		cy.get('#appmode').select(appraisalMode2,{force: true})
		cy.wait(1000)
		 cy.get('#createBtn').click({force: true})
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Select Month');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
	})
	
	it('Verify Validation Massage - Enter from year', function() {	
		const { softAssert, softExpect } = chai;	
		cy.get('#appmode').select(appraisalMode,{force: true})
		cy.wait(1000)
		cy.get('#createBtn').click({force: true})
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Enter from year');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
	})
	
	it('Verify Validation Massage - Enter to Year', function() {	
		const { softAssert, softExpect } = chai;	
		cy.get('#fromdate').click({force: true})
		cy.get('#fromdate').type(fromYear)
		
		cy.wait(1000)
		cy.get('#createBtn').click({force: true})
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Enter to Year');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
	})
		
	it('Verify Validation Massage - Enter Month', function() {	
		const { softAssert, softExpect } = chai;	
		cy.get('#todate').click({force: true})
		cy.get('#todate').type(toYear)
		
		cy.wait(1000)
		cy.get('#createBtn').click({force: true})
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Enter Month');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
	})
	
	it('Verify Validation Massage - Select fianancial year', function() {	
		const { softAssert, softExpect } = chai;	
		cy.get('#Month').click({force: true})
		cy.get('#Month').type(completedMonth)
		
		cy.wait(1000)
		cy.get('#createBtn').click({force: true})
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Select fianancial year');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
	})
	
	it('Verify Validation Massage - Configuration Done Successfully.!', function() {	
		const { softAssert, softExpect } = chai;	
		cy.get('#drpDefault').select(setDefaultFinancialYear,{force: true})
		
		cy.wait(1000)
		cy.get('#createBtn').click({force: true})
			cy.get(".alert").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Configuration Done Successfully.!');
			cy.wait(3000)
			})
			
		cy.wait(2000)
		cy.get('#formAppraisalConfiguration')
        .find('.card')
        .then(listing => {
        const listingCount = Cypress.$(listing).length;
    	cy.log(listingCount)
	    var lastField = listingCount-1
	
		cy.xpath("//form[@id='formAppraisalConfiguration']//div[@class='media']//h5").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('From '+fromYear+' - To '+toYear);	
		})
			
		cy.xpath("//form[@id='formAppraisalConfiguration']//div[@class='media']//span[@title='Appraisal Mode']").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('Appraisal Mode - '+appraisalMode);	
		})	
		
		cy.xpath("//form[@id='formAppraisalConfiguration']//div[@class='media']//span[@title='Rating']").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('Rating - '+rating);	
		})
		
		cy.xpath("//form[@id='formAppraisalConfiguration']//div[@class='media']//span[@title='Default']").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('Default - '+setDefaultFinancialYear);	
		})
		
	//	cy.xpath("//form[@id='formAppraisalConfiguration']//div[@class='media']//span[@title='Default']").eq(lastField-1).invoke('text').then((text) => {
	//	cy.log(text.trim())
	//	softExpect(text.trim()).to.eq('Default - '+setDefaultFinancialYear1);	
	//	})
		
   
  })
			
	})
		
	it('Appraisal Configuration With all field ', function() {
		var appraisalMode = 'Annual'
	var appraisalMode1 = 'Quarterly'
	var appraisalMode2 = 'Monthly'
	var appraisalMode3 = 'HalfYearly'
	var fromYear = '2020'
	var toYear = '2021'
	var completedMonth = '2'
	var setDefaultFinancialYear = 'Yes'
	var setDefaultFinancialYear1 = 'No'
	var rating ='Weightage'
	
	const { softAssert, softExpect } = chai;	
			cy.visit(url+'Settings/Employee/Index?module=Appraisal&submodule=AppraisalConfiguration');
			cy.get('#AppraisalContentTitle .fas').click({force: true});
			cy.get('#appmode').select(appraisalMode1, {force: true});
			cy.get('#period').select('Q1', {force: true});
	cy.get('#fromdate').click({force: true});
	cy.get('#fromdate').type(fromYear);
cy.get('#todate').click({force: true});
cy.get('#todate').type('2021');

cy.get('#drpDefault').select(setDefaultFinancialYear1, {force: true});
cy.get('#Month').click({force: true});
cy.get('#Month').type('10');
cy.get('#drpRating').select(rating,{force: true});
cy.get('.col-sm-9:nth-child(1) .normalLabel').click({force: true});
cy.get('#AvgManagerEmployee').click({force: true});
cy.get('#AvgManagerEmployee').click({force: true});
cy.get('.col-sm-3 > .normalLabel').click({force: true});
cy.get('#yes').click({force: true});
cy.get('#createBtn').click({force: true});
cy.get(".alert").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Configuration Done Successfully.!');
			cy.wait(3000)
			})
			
		//cy.visit(url+'Settings/Employee/Index?module=Appraisal&submodule=AppraisalConfiguration')
		cy.wait(2000)
		cy.get('#formAppraisalConfiguration')
  .find('.card')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1
	
		cy.xpath("//form[@id='formAppraisalConfiguration']//div[@class='media']//h5").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('From '+fromYear+' - To '+toYear);	
		})
			
		cy.xpath("//form[@id='formAppraisalConfiguration']//div[@class='media']//span[@title='Appraisal Mode']").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('Appraisal Mode - '+appraisalMode1);	
		})	
		
		cy.xpath("//form[@id='formAppraisalConfiguration']//div[@class='media']//span[@title='Rating']").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('Rating - '+rating);	
		})
		
		cy.xpath("//form[@id='formAppraisalConfiguration']//div[@class='media']//span[@title='Default']").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('Default - '+setDefaultFinancialYear1);	
		})
		
		
   
  })
	})

	
	it('Update Appraisal Configuration ', function() {
		const { softAssert, softExpect } = chai;	
			cy.visit(url+'Settings/Employee/Index?module=Appraisal&submodule=AppraisalConfiguration');
			
			cy.wait(2000)
		cy.get('#formAppraisalConfiguration')
  .find('.card')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1
	
			cy.get('.fa-edit').eq(lastField).click({force: true});
			cy.get('#appmode').select(appraisalMode3, {force: true});
			cy.get('#monthmode').select('1', {force: true});
	cy.get('#fromdate').click({force: true});
	cy.get('#fromdate').clear().type(fromYear1);
cy.get('#todate').click({force: true});
cy.get('#todate').clear().type(toYear1);

cy.get('#drpDefault').select(setDefaultFinancialYear, {force: true});
cy.get('#Month').click({force: true});
cy.get('#Month').clear().type(completedMonth1);
cy.get('#drpRating').select(rating1,{force: true});
cy.get('.col-sm-9:nth-child(1) .normalLabel').click({force: true});
cy.get('#AvgManagerEmployee').click({force: true});
cy.get('#AvgManagerEmployee').click({force: true});
cy.get('.col-sm-3 > .normalLabel').click({force: true});
cy.get('#yes').click({force: true});
cy.get('#createBtn').click({force: true});
cy.get(".alert").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Configuration Done Successfully.!');
			cy.wait(3000)
			})
			
		//cy.visit(url+'Settings/Employee/Index?module=Appraisal&submodule=AppraisalConfiguration')
		
	
		cy.xpath("//form[@id='formAppraisalConfiguration']//div[@class='media']//h5").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('From '+fromYear1+' - To '+toYear1);	
		})
			
		cy.xpath("//form[@id='formAppraisalConfiguration']//div[@class='media']//span[@title='Appraisal Mode']").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('Appraisal Mode - '+appraisalMode3);	
		})	
		
		cy.xpath("//form[@id='formAppraisalConfiguration']//div[@class='media']//span[@title='Rating']").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('Rating - '+rating1);	
		})
		
		cy.xpath("//form[@id='formAppraisalConfiguration']//div[@class='media']//span[@title='Default']").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('Default - '+setDefaultFinancialYear);	
		})
		
		
   
  })
	})



	it('Appraisal Process', function() {
		
		cy.visit(url+'Settings/Employee/Index?module=Appraisal&submodule=AppraisalProcess')
		cy.wait(2000)
		cy.get('#A_90').click({force:true})
		cy.get('#createBtn').click({force:true})
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
		expect(text.trim()).equal('Setting updated successfully')
		})
		
		})
	
	
	
	it('Navigate Grading Matrix Page', function() {	
	cy.visit(url+'Settings/Employee/Index?module=Appraisal&submodule=GradingMatrix');
	cy.wait(2000)
	cy.get('#AppraisalContentTitle .fas').click();
	cy.wait(2000)
		})
	
	it('Verify Validation Massage - Enter from range.', function() {	
		const { softAssert, softExpect } = chai;
		 cy.get('#createBtn').click();
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Enter from range.');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
	})
	
	it('Verify Validation Massage - Please Enter to range.', function() {	
		const { softAssert, softExpect } = chai;	
	cy.get('#from').click();
	cy.get('#from').type('1');
		cy.wait(1000)
		cy.get('#createBtn').click({force: true})
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Please Enter to range.');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
	})
	
	it('Verify Validation Massage - Please Enter status.', function() {	
		const { softAssert, softExpect } = chai;	
		cy.get('#to').click();
		cy.get('#to').type('10');
		
		cy.wait(1000)
		cy.get('#createBtn').click({force: true})
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Please Enter status.');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
	})
		
	it('Verify Validation Massage - Please Enter details.', function() {	
		const { softAssert, softExpect } = chai;	
		cy.get('#status').click();
		cy.get('#status').type('Good');
		cy.wait(1000)
		cy.get('#createBtn').click({force: true})
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Please Enter details.');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
	})
	
	it('Verify Validation Massage - Record Added Successfully', function() {	
		const { softAssert, softExpect } = chai;	
		cy.get('#details').click();
		cy.get('#details').type('Test');
		
		cy.wait(1000)
		cy.get('#createBtn').click({force: true})
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Record Added Successfully');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
			
			cy.get('#partialPlaceHolder')
  .find('.col-sm-9')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
    //expect(listing).to.have.length(listingCount);
  })
})

	
	it('Add Grading Matrix', function() {	
	const { softAssert, softExpect } = chai;	
	cy.visit(url+'Settings/Employee/Index?module=Appraisal&submodule=GradingMatrix');
	cy.wait(2000)
	cy.get('#AppraisalContentTitle .fas').click();
	cy.wait(2000)
	
	cy.get('#from').click();
	cy.get('#from').clear().type(GradingFrom);
	
	cy.get('#to').click();
		cy.get('#to').clear().type(GradingTo);
		
		cy.get('#status').click();
		cy.get('#status').clear().type(Status);
		
		cy.get('#details').click();
		cy.get('#details').clear().type(Details);
		
		cy.get('#percent').click();
		cy.get('#percent').clear().type(Percentage);
		
		cy.wait(1000)
		cy.get('#createBtn').click({force: true})
		cy.wait(3000)
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Record Added Successfully');
			cy.wait(3000)
			})
			
  cy.wait(2000)
		cy.get('#partialPlaceHolder')
  .find('.col-sm-4')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1
	
		cy.xpath("//h5").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('From '+GradingFrom+' - To '+GradingTo);	
		})
		
		cy.xpath("//div[@class='media-body align-self-center']/span[1]").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('Status - '+Status);	
		})
		
		cy.xpath("//div[@class='media-body align-self-center']/span[2]").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('Details - '+Details);	
		})
		
		cy.xpath("//div[@class='media-body align-self-center']/span[3]").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('Percentage - '+Percentage);
		})
		})
	})
	
	it('Update Grading Matrix', function() {	
	const { softAssert, softExpect } = chai;
	
	cy.visit(url+'Settings/Employee/Index?module=Appraisal&submodule=GradingMatrix');
	cy.wait(2000)
	
		cy.get('#partialPlaceHolder')
  .find('.col-sm-4')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1
	
	cy.get('.fa-edit').eq(lastField).click({force: true});
	cy.wait(2000)
	
	cy.get('#from').click();
	cy.get('#from').clear().type(GradingFrom1);
	
	cy.get('#to').click();
		cy.get('#to').clear().type(GradingTo1);
		
		cy.get('#status').click();
		cy.get('#status').clear().type(Status1);
		
		cy.get('#details').click();
		cy.get('#details').clear().type(Details1);
		
		cy.get('#percent').click();
		cy.get('#percent').clear().type(Percentage1);
		
		cy.wait(1000)
		cy.get('#upBtn').click({force: true})
		cy.wait(3000)
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Record Updated Successfully');
			cy.wait(3000)
			})
				
		cy.xpath("//h5").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('From '+GradingFrom1+' - To '+GradingTo1);	
		})
		
		cy.xpath("//div[@class='media-body align-self-center']/span[1]").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('Status - '+Status1);	
		})
		
		cy.xpath("//div[@class='media-body align-self-center']/span[2]").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('Details - '+Details1);	
		})
		
		cy.xpath("//div[@class='media-body align-self-center']/span[3]").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('Percentage - '+Percentage1);
		})
		})
	})
	
	it('Delete Grading Matrix', function() {	
	const { softAssert, softExpect } = chai;
	
	cy.visit(url+'Settings/Employee/Index?module=Appraisal&submodule=GradingMatrix');
	cy.wait(2000)
	
		cy.get('#partialPlaceHolder')
  .find('.col-sm-4')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1
	
	cy.xpath("//i[@class='fas fa-trash-alt text-danger font-16']").eq(lastField).click();
	cy.wait(2000)

			
 
  cy.get('#partialPlaceHolder')
  .find('.col-sm-4')
  .then(listing => {
    const listingCount1 = Cypress.$(listing).length;
	cy.log(listingCount1)
	var lastField1 = listingCount1-1
	softExpect(lastField1).to.eq(lastField-1);	
  })
  })
	})
	
	
	it('Navigate  Appraisal Parameter Page', function() {	
	cy.visit(url+'Settings/Employee/Index?module=Appraisal&submodule=AppriasalParameter');
	cy.wait(2000)
		})
		
	it('Verify Validation Massage - Please select value', function() {	
		const { softAssert, softExpect } = chai;
		
		
		cy.get('#drpParameter').select(BusinessUnit);
		cy.wait(1000)
		cy.get('#crtbtn').click();
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Please select value');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
	})
	
	it('Verify Validation Massage - Enter Parameter name', function() {	
		const { softAssert, softExpect } = chai;
		
		cy.get('#drpValue').select(Value,{force: true});
		cy.wait(1000)
		cy.get('#crtbtn').click();
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Enter Parameter name');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
	})
	
	it('Verify Validation Massage - Enter marks.', function() {	
		const { softAssert, softExpect } = chai;
		
		cy.get('#names').click({force: true});
		cy.get('#names').type(Name);
		cy.wait(1000)
		cy.get('#crtbtn').click({force: true});
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Enter marks.');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
	})
	
	it('Verify Validation Massage - Record Added Successfully', function() {	
		const { softAssert, softExpect } = chai;
		cy.get('#marks').click({force: true});
		cy.get('#marks').type(Marks);
		cy.wait(1000)
		cy.get('#crtbtn').click({force: true});
			//cy.get(".toast-message").invoke('text').then((text) => {
			//softExpect(text.trim()).to.eq('Record Added Successfully');
			cy.wait(3000)
		//	cy.get(".toast-message").click({force: true})
		//	})
			
			cy.get('#drpValue').select(Value, {force: true});
		cy.wait(1000)
		
		
		cy.wait(2000)
		cy.xpath("//table[@id='tableSorter']//tbody")
	.find('tr')
	.then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1
	
		cy.xpath("//table[@id='tableSorter']//tbody//tr//td[1]").eq(0).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq(Name);	
		})
			
		cy.xpath("//table[@id='tableSorter']//tbody//tr//td[2]").eq(0).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq(Marks);	
		})
			
	})
	})
	
	it('Verify Total Marks', function() {	
		const { softAssert, softExpect } = chai;
		cy.visit(url+'Settings/Employee/Index?module=Appraisal&submodule=AppriasalParameter');
		
		cy.get('#drpValue').select(Value);
		cy.get('#names').click();
		cy.get('#names').type(Name1);
		
		cy.get('#marks').click();
		cy.get('#marks').type(Marks1);
		
		cy.wait(1000)
		cy.get('#crtbtn').click({force: true});
		//	cy.get(".toast-message").invoke('text').then((text) => {
		//	softExpect(text.trim()).to.eq('Record Added Successfully');
		//	cy.wait(3000)
			//cy.get(".toast-message").click({force: true})
			//})
			cy.wait(10000)
			cy.get('#drpValue').select(Value);
		cy.wait(1000)
		
		
		cy.wait(2000)
		cy.xpath("//table[@id='tableSorter']//tbody")
	.find('tr')
	.then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1
	
		cy.xpath("//table[@id='tableSorter']//tbody//tr//td[1]").eq(1).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq(Name1);	
		})
			
		cy.xpath("//table[@id='tableSorter']//tbody//tr//td[2]").eq(1).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq(Marks1);	
		})
		
		 cy.xpath("//table[@id='tableSorter']//tbody//tr//td[2]").eq(0).invoke('text').then((m1) => {
		cy.log("m1: "+ m1)
		
		 cy.xpath("//table[@id='tableSorter']//tbody//tr//td[2]").eq(1).invoke('text').then((m2) => {
			cy.log("m2: "+ m2)
			
			var totalMark = parseInt(m1) + parseInt(m2);
			cy.log("totalMark: "+ totalMark)
			
			cy.xpath("//table[@id='tableSorter']//b").invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(parseInt(text.trim())).to.eq(totalMark);	
		})
			
			})
		})
		
	})		
	
	})
	
	it('Edit Appraisal Parameter', function() {	
		const { softAssert, softExpect } = chai;
		cy.visit(url+'Settings/Employee/Index?module=Appraisal&submodule=AppriasalParameter');
		
		cy.get('#drpValue').select(Value, {force: true});
		
		cy.wait(2000)
	cy.xpath("//table[@id='tableSorter']//tbody")
	.find('tr')
	.then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1
	
		
		
		
	cy.xpath("//table[@id='tableSorter']//tbody//tr//td[3]/button[1]").eq(1).click()
	
		cy.get('#names').click({force: true});
		cy.get('#names').clear().type(Name2);
		
		cy.get('#marks').click({force: true});
		cy.get('#marks').clear().type(Marks2);
		
		cy.wait(1000)
		cy.get('#updbtn').click({force:true});
		//	cy.get(".toast-message").invoke('text').then((text) => {
			//softExpect(text.trim()).to.eq('Record Added Successfully');
			cy.wait(3000)
			//cy.get(".toast-message").click({force: true})
			//})
			cy.wait(5000)
			cy.get('#drpValue').select(Value, {force: true});
		cy.wait(1000)
		
		
		
		cy.xpath("//table[@id='tableSorter']//tbody//tr//td[1]").eq(1).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq(Name2);	
		})
			
		cy.xpath("//table[@id='tableSorter']//tbody//tr//td[2]").eq(1).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq(Marks2);	
		})		
		
	})		
	
	})
	
	it('Delete Appraisal Parameter', function() {	
		const { softAssert, softExpect } = chai;
		cy.visit(url+'Settings/Employee/Index?module=Appraisal&submodule=AppriasalParameter');
		
			cy.get('#drpValue').select(Value, {force: true});
		cy.wait(2000)
	cy.xpath("//table[@id='tableSorter']//tbody")
	.find('tr')
	.then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1
	
		
		cy.xpath("//table[@id='tableSorter']//tbody//tr//td[3]/button[2]").eq(1).click({force: true})
		
			//cy.get(".toast-message").invoke('text').then((text) => {
			//softExpect(text.trim()).to.eq('Record Deleted Successfully');
			//cy.wait(3000)
			//cy.get(".toast-message").click({force: true})
			//})
		cy.wait(10000)
		cy.get('#drpValue').select(Value, {force: true});
		cy.wait(2000)
		cy.xpath("//table[@id='tableSorter']//tbody")
	.find('tr')
	.then(listing => {
    const listingCount1 = Cypress.$(listing).length;
	cy.log(listingCount1)
	softExpect(listingCount).to.eq(listingCount1+1);
	})
		
	})
	})
	
	
	it('Navigate Appriasal Question Page', function() {	
	cy.visit(url+'Settings/Employee/Index?module=Appraisal&submodule=AppriasalQuestion');
		})
	
	it('Verify Validation Massage - Select Value', function() {	
		const { softAssert, softExpect } = chai;
		
		
			cy.get('#addquestn').click();
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Select Value. !');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
	})
	
	it('Verify Validation Massage - Select appraisal parameter', function() {	
		const { softAssert, softExpect } = chai;
		
		cy.get('#drpValue').select(Value,{force: true});
		cy.wait(1000)
		cy.get('#addquestn').click();
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Select appraisal parameter');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
	})
	
	it('Verify Validation Massage - Entre marks.', function() {	
		const { softAssert, softExpect } = chai;
		
		cy.get('#para').select(AppraisalParameter);
		cy.wait(1000)
		cy.get('#addquestn').click({force: true});
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Entre marks.');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
	})
	
	it('Verify Validation Massage - Enter question.', function() {	
		const { softAssert, softExpect } = chai;
		
		cy.get('#marks').click();
		cy.get('#marks').type(Weightage);

		cy.wait(1000)
		cy.get('#addquestn').click({force: true});
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Enter question.');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
	})

	it('Verify Validation Massage - Record Added Successfully', function() {	
		const { softAssert, softExpect } = chai;
		cy.get('#para').select(AppraisalParameter);
		
		cy.get('#questn').click();
		cy.get('#questn').type(Question);
		
		cy.get('#Description').click();
		cy.get('#Description').type(EmployeeGoals);
		
		cy.get('#answertype').select(AnswerType);
		
		cy.wait(1000)
		cy.get('#addquestn').click({force: true});
		cy.wait(1000)
		cy.get('#savebtn').click({force: true});
		cy.wait(1000)
			//cy.get(".toast-message").invoke('text').then((text) => {
			//softExpect(text.trim()).to.eq('Record Added Successfully');
			cy.wait(3000)
		//	cy.get(".toast-message").click({force: true})
		//	})
			
			cy.get('#drpValue').select(Value, {force: true});
		cy.wait(1000)
		
		
		cy.wait(2000)
		cy.xpath("//table[@id='tableSorter']//tbody")
	.find('tr')
	.then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1
	
		cy.xpath("//table[@id='tableSorter']//tbody//tr//td[1]").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq(AppraisalParameter);	
		})
			
		cy.xpath("//table[@id='tableSorter']//tbody//tr//td[2]").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq(Question);	
		})
		
		cy.xpath("//table[@id='tableSorter']//tbody//tr//td[3]").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq(Weightage);	
		})
			
		cy.xpath("//table[@id='tableSorter']//tbody//tr//td[4]").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq(EmployeeGoals);	
		})
		
			
		cy.xpath("//table[@id='tableSorter']//tbody//tr//td[5]").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq(AnswerType);	
		})
			
	})
	})
	
	
	it('Verify Validation By Deleting Appraisal Parameter', function() {	
		const { softAssert, softExpect } = chai;
		cy.visit(url+'Settings/Employee/Index?module=Appraisal&submodule=AppriasalParameter');
		
			cy.get('#drpValue').select(Value, {force: true});
		cy.wait(2000)
	cy.xpath("//table[@id='tableSorter']//tbody")
	.find('tr')
	.then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1
	
		
		cy.xpath("//table[@id='tableSorter']//tbody//tr//td[3]/button[2]").eq(0).click({force: true})
		
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Questions are defined for this parameter, hence it cannot be deleted');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
	
	})

	})
	
	it('Edit Appraisal Question', function() {	
		const { softAssert, softExpect } = chai;
		cy.visit(url+'Settings/Employee/Index?module=Appraisal&submodule=AppriasalQuestion');
		
		cy.get('#drpValue').select(Value, {force: true});
		
		cy.wait(2000)
	cy.xpath("//table[@id='tableSorter']//tbody")
	.find('tr')
	.then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1
	
		
		
		
	cy.xpath("//table[@id='tableSorter']//tbody//tr//td[6]/button[1]").eq(lastField).click()
	
		
		cy.get('#para').select(AppraisalParameter);
		
		cy.get('#marks').click();
		cy.get('#marks').clear().type(Weightage1);
		
		cy.get('#questn').click();
		cy.get('#questn').clear().type(Question1);
		
		cy.get('#Description').click();
		cy.get('#Description').clear().type(EmployeeGoals1);
		
		cy.get('#answertype').select(AnswerType1);
		
		cy.wait(1000)
		cy.get('#updtqstn').click({force: true});
			//cy.get(".toast-message").invoke('text').then((text) => {
			//softExpect(text.trim()).to.eq('Record Added Successfully');
			cy.wait(3000)
		//	cy.get(".toast-message").click({force: true})
		//	})
			
			cy.get('#drpValue').select(Value, {force: true});
		cy.wait(1000)
		
		
		cy.wait(2000)
		cy.xpath("//table[@id='tableSorter']//tbody")
	.find('tr')
	.then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1
	
		cy.xpath("//table[@id='tableSorter']//tbody//tr//td[1]").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq(AppraisalParameter);	
		})
			
		cy.xpath("//table[@id='tableSorter']//tbody//tr//td[2]").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq(Question1);	
		})
		
		cy.xpath("//table[@id='tableSorter']//tbody//tr//td[3]").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq(Weightage1);	
		})
			
		cy.xpath("//table[@id='tableSorter']//tbody//tr//td[4]").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq(EmployeeGoals1);	
		})
		
			
		cy.xpath("//table[@id='tableSorter']//tbody//tr//td[5]").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq(AnswerType1);	
		})
			
	})
		
	})		
	
	})
	
	it('Delete Appraisal Question', function() {	
		const { softAssert, softExpect } = chai;
		cy.visit(url+'Settings/Employee/Index?module=Appraisal&submodule=AppriasalQuestion');
		
			cy.get('#drpValue').select(Value, {force: true});
		cy.wait(2000)
	cy.xpath("//table[@id='tableSorter']//tbody")
	.find('tr')
	.then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1
	
		
		cy.xpath("//table[@id='tableSorter']//tbody//tr//td[6]/button[2]").eq(lastField).click({force: true})
		
			//cy.get(".toast-message").invoke('text').then((text) => {
			//softExpect(text.trim()).to.eq('Record Deleted Successfully');
			//cy.wait(3000)
			//cy.get(".toast-message").click({force: true})
			//})
	})
	})
	
	it('Navigate Year End Transfer', function() {	
	cy.visit(url+'Settings/Employee/Index?module=Appraisal&submodule=YearEndTransfer');
	})
	
	it('Verify Validation Massage - Please enter Password.', function() {	
		const { softAssert, softExpect } = chai;
		
		
			cy.get("[value= 'Yearly Transfer']").click();
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Please enter Password.');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
	})
	
	it('Verify Validation Massage - Year End Transfer Done Successfully.!', function() {	
		const { softAssert, softExpect } = chai;
		cy.get("#txtPass").click({force: true})
			cy.get("#txtPass").type('123456');
			
			cy.get("[value= 'Yearly Transfer']").click();
			cy.wait(3000)
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Year End Transfer Done Successfully.!');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
	})
	
		
	
	
	})