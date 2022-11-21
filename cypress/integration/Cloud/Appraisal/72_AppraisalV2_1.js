
describe('Approval V2', function() {
	
	var url = Cypress.env('url')
	
	// Appraisal Configuration
	var BusinessUnit = 'Category'
	var StartDate = '01/06/2020'
	var EndDate = '30/06/2020'
	var completedMonth = '2'
	var setDefaultFinancialYear = 'No'
	var rating ='Scale'
	
	var StartDate1 = '01/01/2020'
	var EndDate1 = '31/12/2020'
	var setDefaultFinancialYear1 = 'Yes'
	var rating1 ='Weightage'
	
	// Grading Matrix
	 var Value = 'Staff'
	 var GradingTo = '5'
	 var Status = 'Good'
	 var Details ='Test'
	 var Percentage = '50'
	
	 var Value1 = 'Admin'
	 var Value2 = 'Manager'
	 var GradingTo1 = '10'
	 var Status1 = 'Average'
	 var Details1 ='Currenty Testing'
	 var Percentage1 = '80'
	 
	 // Appraisal Stage
	 var StageName = 'S1'
	 var StartDateStage = '01/01/2020'
	 var EndDateStage = '31/12/2020'
	 var OrderNumber = '1'
	 var IsActive = 'No'
	 
	 var StageName1 = 'S1'
	 var StartDateStage1 = '11/06/2020'
	 var EndDateStage1 = '20/06/2020'
	 var OrderNumber1 = '2'
	 var IsActive1 = 'Yes'
	 
	 //Appraisal Stage Settings
	 var FieldName = 'Target'
	 var FieldType = 'Text'
	 var FieldSize = '10'
	 var LabelName = 'Targets_1'
	 var Validate = 'Yes'
	 var Order = '2'
	 var Level = 'Stage'
	 var ManagerScreenDisplay = 'No'
	 var EmployeeScreenDisplay = 'No'
	 
	  var ManagerFieldName = 'ACHIEVEMENT'
	  var ManagerFieldName1 = 'ACHIEVEMENT_1'
	 
	 
	 

	beforeEach(function(){
	cy.getCookies()
	})
	

it('Login to Cloud & select Company', function() {
	cy.login()
	cy.changeCompany();		
})



	it('Navigate Appraisal Configuration Page', function() {
			cy.wait(5000)
		cy.visit(url +'Settings/Employee/Index?module=AppraisalV2&submodule=AppraisalConfigurationV2');
		cy.wait(2000)
		})
	
	it('Verify Validation Massage - Select Buisness Unit', function() {	
		
		cy.get('#AppraisalV2ContentTitle .fas').click({force:true})
		cy.wait(2000)
		cy.get('#createBtn').click({force:true})
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
		expect(text.trim()).equal('Select Buisness Unit')
		cy.wait(3000)
		cy.get(".toast-message").click({force: true})
		})
		
		})
		
	it('Verify Validation Massage - Enter Start Date', function() {	
		const { softAssert, softExpect } = chai;	
		cy.get('#drpParameter').select(BusinessUnit, {force: true});
		cy.wait(1000)
		cy.get('#createBtn').click({force: true})
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Enter Start Date');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
	})
	
	it('Verify Validation Massage - Enter To Date', function() {	
		const { softAssert, softExpect } = chai;	
		cy.get('#fromdate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(StartDate)
				})
		
		cy.wait(1000)
		cy.get('#createBtn').click({force: true})
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Enter To Date');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
	})
		
	it('Verify Validation Massage - Enter Month', function() {	
		const { softAssert, softExpect } = chai;	
		cy.get('#todate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(EndDate)
				})
		
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
	
	it('Verify Validation Massage - Select Rating Type', function() {	
		const { softAssert, softExpect } = chai;	
		cy.get('#drpDefault').select(setDefaultFinancialYear,{force: true})
		
		
		cy.wait(1000)
		cy.get('#createBtn').click({force: true})
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Select Rating Type');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
	})
	
	it('Verify Validation Massage - Enter Scale Rating Value', function() {	
		const { softAssert, softExpect } = chai;	
		cy.get('#drpRating').select(rating, {force: true});
		
		cy.wait(1000)
		cy.get('#createBtn').click({force: true})
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Enter Scale Rating Value');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
	})

	it('Verify Validation Massage - Configuration Done Successfully.!', function() {	
		const { softAssert, softExpect } = chai;
		cy.get('#txtEndScale').click({force: true})		
		cy.get('#txtEndScale').type('5');
		
		cy.wait(1000)
		cy.get('#createBtn').click({force: true})
			cy.get(".alert").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Configuration Done Successfully.!');
			cy.wait(3000)
			})
			
			cy.wait(2000)
		cy.get('#AppraisalV2body')
  .find('.media-body')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1
	
		cy.xpath("//div[@class='card']//div[@class='media-body align-self-center ']/label").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq(StartDate+' - '+EndDate);	
		})
			
		cy.xpath("//div[@class='card']//div[@class='media-body align-self-center ']//span[@title='Rating']").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('Rating - '+rating);	
		})
		
		cy.xpath("//div[@class='card']//div[@class='media-body align-self-center ']//span[@class='text-muted text-truncate row font-12']").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.contains(setDefaultFinancialYear);	
		})
  })
			
	})	

	it('Update Appraisal Configuration', function() {	
		const { softAssert, softExpect } = chai;
		
		cy.wait(2000)
		cy.get('#AppraisalV2body')
  .find('.media-body')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1
	
	cy.xpath("//i[@class='fas fa-edit text-info font-16']").eq(lastField).click({force: true})
	
	cy.get('#fromdate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(StartDate1)
				})
				
				cy.get('#todate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(EndDate1)
				})
				
				cy.get('#drpDefault').select(setDefaultFinancialYear1,{force: true})
				
				cy.get('#drpRating').select(rating1, {force: true});
				
	
		
		cy.wait(1000)
		cy.get('#upBtn').click({force: true})
			cy.get(".alert").invoke('text').then((text) => {
			softExpect(text.trim()).to.contains('Configuration Done Successfully.!');
			cy.wait(3000)
			})
			
			
	
		cy.xpath("//div[@class='card']//div[@class='media-body align-self-center ']/label").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq(StartDate1+' - '+EndDate1);	
		})
			
		cy.xpath("//div[@class='card']//div[@class='media-body align-self-center ']//span[@title='Rating']").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('Rating - '+rating1);	
		})
		
		cy.xpath("//div[@class='card']//div[@class='media-body align-self-center ']//span[@class='text-muted text-truncate row font-12']").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.contains(setDefaultFinancialYear1);	
		})
  })
			
	})	


	it('Navigate Appraisal Process Page', function() {	
		cy.visit(url+'Settings/Employee/Index?module=AppraisalV2&submodule=AppraisalProcessV2')
		cy.wait(2000)
		})
	
	it('Appraisal Process', function() {
		cy.get('#A_90').click({force:true})
		cy.get('#createBtn').click({force:true})
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
		expect(text.trim()).equal('Setting Saved successfully')
		})
		
	})
	
	
	it('Navigate Grading Matrix', function() {	
cy.visit(url +'Settings/Employee/Index?module=AppraisalV2&submodule=GradingMatrixV2');
cy.wait(2000)
})

	it('Verify Validation Massage - Please select Business Unit value', function() {	
		cy.get('#viewBtn').click();
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
		expect(text.trim()).equal('Please select Business Unit value')
		cy.wait(3000)
		})
		
	})

	
		
	it('Verify Validation Massage - No Records Found.', function() {	
		cy.get('#drpValue').select(Value, {force: true});
		//cy.get('#drpValue').select(Value, {force: true});
		cy.get('#viewBtn').click();
		cy.wait(2000)
		cy.get(".alert-warning").invoke('text').then((text) => {
		expect(text.trim()).equal('No Records Found.')
		cy.wait(3000)
		})
   /*
	cy.get('#drpValue').select(Value1, {force: true});
		cy.get('#viewBtn').click();
		cy.wait(2000)
		cy.get(".alert-warning").invoke('text').then((text) => {
		expect(text.trim()).equal('No Records Found.')
		cy.wait(3000)
		})	

	cy.get('#drpValue').select(Value2, {force: true});
		cy.get('#viewBtn').click();
		cy.wait(2000)
		cy.get(".alert-warning").invoke('text').then((text) => {
		expect(text.trim()).equal('No Records Found.')
		cy.wait(3000)
		})	

	cy.get('#drpValue').select(Value, {force: true});
		cy.get('#viewBtn').click();
		cy.wait(2000)
		cy.get(".alert-warning").invoke('text').then((text) => {
		expect(text.trim()).equal('No Records Found.')
		cy.wait(3000)
		})	*/	
	})
	
	it('Verify Validation Massage - Please Enter to range.', function() {	
		cy.get('#AppraisalV2ContentTitle .fas').click();
		cy.wait(2000)
		cy.get('#createBtn').click();
		cy.get(".toast-message").invoke('text').then((text) => {
		expect(text.trim()).equal('Please Enter to range.')
		cy.wait(3000)
		cy.get(".toast-message").click({force: true});
		})	
	})
	
	it('Verify Validation Massage - Please Enter status.', function() {	
		cy.get('#to').click();
		cy.get('#to').type(GradingTo);
		cy.wait(2000)
		cy.get('#createBtn').click();
		cy.get(".toast-message").invoke('text').then((text) => {
		expect(text.trim()).equal('Please Enter status.')
		cy.wait(3000)
		cy.get(".toast-message").click({force: true});
		})	
	})
	
	it('Verify Validation Massage - Please Enter details.', function() {	
		cy.get('#status').click();
		cy.get('#status').type(Status);
		cy.wait(2000)
		cy.get('#createBtn').click();
		cy.get(".toast-message").invoke('text').then((text) => {
		expect(text.trim()).equal('Please Enter details.')
		cy.wait(3000)
		cy.get(".toast-message").click({force: true});
		})	
	})
	
	it('Verify Validation Massage - Please Enter Percentage.', function() {	
		cy.get('#details').click();
		cy.get('#details').type(Details);
		cy.wait(2000)
		cy.get('#createBtn').click({force: true});
		cy.get(".toast-message").invoke('text').then((text) => {
		expect(text.trim()).equal('Please Enter Percentage.')
		cy.wait(3000)
		cy.get(".toast-message").click({force: true});
		})	
	})
	
	it('Verify Validation Massage - Data Saved Successfully', function() {	
	const { softAssert, softExpect } = chai;
		cy.get('#percent').click();
		cy.get('#percent').type(Percentage);
		cy.wait(2000)
		cy.get('#createBtn').click({force: true});
		//cy.get(".toast-message").invoke('text').then((text) => {
		//expect(text.trim()).equal('Please Enter Percentage.')
		cy.wait(3000)
		//})	
		
		cy.get('#drpValue').select(Value, {force: true});
		cy.get('#viewBtn').click();
		
		cy.wait(2000)
		cy.get('#partialPlaceHolder')
  .find('.media-body')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1
	
		cy.xpath("//div[@class='media-body align-self-center']/h5").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('From 1 To '+GradingTo);	
		})
			
		cy.xpath("//div[@class='media-body align-self-center']//span[@title='Status']").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('Status - '+Status);	
		})
		
		cy.xpath("//div[@class='media-body align-self-center']//span[@title='Details']").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('Details - '+Details);	
		})
		
		cy.xpath("//div[@class='media-body align-self-center']//span[@title='Percentage']").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('Percentage - '+Percentage);	
		})
		
	})
	/*
	cy.get('#drpValue').select(Value1, {force: true});
		cy.get('#viewBtn').click();
		cy.wait(2000)
		cy.get(".alert-warning").invoke('text').then((text) => {
		expect(text.trim()).equal('No Records Found.')
		cy.wait(3000)
		})
		
		cy.get('#drpValue').select(Value2, {force: true});
		cy.get('#viewBtn').click();
		cy.wait(2000)
		cy.get(".alert-warning").invoke('text').then((text) => {
		expect(text.trim()).equal('No Records Found.')
		cy.wait(3000)
		})*/
	})
/*
	it('Copy to all - Grading Matrix', function() {
		const { softAssert, softExpect } = chai;
		cy.get('#drpValue').select(Value, {force: true});
		cy.get('#viewBtn').click();
		
		cy.get("div[class='control-label col-sm-2 text-right'] >[onclick='return CopyRecord()']").click({force: true});
		
		cy.wait(2000)
	cy.get('#drpValue').select(Value1);
		cy.get('#viewBtn').click({force: true});
		
		cy.wait(2000)
	cy.get('#drpValue').select(Value1, {force: true});
		cy.get('#viewBtn').click({force: true});
		
		cy.wait(2000)
	cy.get('#drpValue').select(Value1);
		cy.get('#viewBtn').click({force: true});
		
		cy.wait(2000)
	cy.get('#drpValue').select(Value1, {force: true});
		cy.get('#viewBtn').click({force: true});
		cy.wait(2000)
		cy.get('#partialPlaceHolder')
  .find('.media-body')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1
	
		cy.xpath("//div[@class='media-body align-self-center']/h5").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('From 1 To '+GradingTo);	
		})
			
		cy.xpath("//div[@class='media-body align-self-center']//span[@title='Status']").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('Status - '+Status);	
		})
		
		cy.xpath("//div[@class='media-body align-self-center']//span[@title='Details']").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('Details - '+Details);	
		})
		
		cy.xpath("//div[@class='media-body align-self-center']//span[@title='Percentage']").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('Percentage - '+Percentage);	
		})
		
	})
	
		cy.wait(2000)
	cy.get('#drpValue').select(Value2);
		cy.get('#viewBtn').click({force: true});
		
		cy.wait(2000)
	cy.get('#drpValue').select(Value2, {force: true});
		cy.get('#viewBtn').click({force: true});
		
		cy.wait(2000)
	cy.get('#drpValue').select(Value2);
		cy.get('#viewBtn').click({force: true});
		
		cy.wait(2000)
	cy.get('#drpValue').select(Value2, {force: true});
		cy.get('#viewBtn').click({force: true});
		
		cy.wait(2000)
		cy.get('#partialPlaceHolder')
  .find('.media-body')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1
	
		cy.xpath("//div[@class='media-body align-self-center']/h5").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('From 1 To '+GradingTo);	
		})
			
		cy.xpath("//div[@class='media-body align-self-center']//span[@title='Status']").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('Status - '+Status);	
		})
		
		cy.xpath("//div[@class='media-body align-self-center']//span[@title='Details']").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('Details - '+Details);	
		})
		
		cy.xpath("//div[@class='media-body align-self-center']//span[@title='Percentage']").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('Percentage - '+Percentage);	
		})
		
	})
	
	
	
		
})*/
	
	it('Update Grading Matrix', function() {	
const { softAssert, softExpect } = chai;
cy.get('#drpValue').select(Value, {force: true});
		cy.get('#viewBtn').click();
		
cy.wait(2000)
		cy.get('#partialPlaceHolder')
  .find('.media-body')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1
	
	cy.xpath("//i[@class='fas fa-edit text-info font-16']").eq(lastField).click();
	cy.wait(2000)
	
	cy.get('#to').click();
		cy.get('#to').clear().type(GradingTo1);
		
		cy.get('#status').click();
		cy.get('#status').clear().type(Status1);
		
		cy.get('#details').click();
		cy.get('#details').clear().type(Details1);
		
		cy.get('#percent').click();
		cy.get('#percent').clear().type(Percentage1);
		cy.wait(2000)
		cy.get('#upBtn').click({force: true});
		//cy.get(".toast-message").invoke('text').then((text) => {
		//expect(text.trim()).equal('Please Enter Percentage.')
		cy.wait(3000)
		//})	
		
		cy.get('#drpValue').select(Value,{force: true});
		cy.get('#viewBtn').click();
		
		cy.wait(2000)
		cy.get('#partialPlaceHolder')
  .find('.media-body')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1
	
		cy.xpath("//div[@class='media-body align-self-center']/h5").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('From 1 To '+GradingTo1);	
		})
			
		cy.xpath("//div[@class='media-body align-self-center']//span[@title='Status']").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('Status - '+Status1);	
		})
		
		cy.xpath("//div[@class='media-body align-self-center']//span[@title='Details']").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('Details - '+Details1);	
		})
		
		cy.xpath("//div[@class='media-body align-self-center']//span[@title='Percentage']").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('Percentage - '+Percentage1);	
		})
		
	})
	})
	/*
	cy.wait(2000)
	cy.get('#drpValue').select(Value1);
		cy.get('#viewBtn').click({force: true});
		
		cy.wait(2000)
	cy.get('#drpValue').select(Value1, {force: true});
		cy.get('#viewBtn').click({force: true});
		
		cy.wait(2000)
	cy.get('#drpValue').select(Value1);
		cy.get('#viewBtn').click({force: true});
		
		cy.wait(2000)
	cy.get('#drpValue').select(Value1, {force: true});
		cy.get('#viewBtn').click({force: true});
		
		cy.xpath("//div[@class='media-body align-self-center']/h5").eq(0).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('From 1 To '+GradingTo);	
		})
			
		cy.xpath("//div[@class='media-body align-self-center']//span[@title='Status']").eq(0).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('Status - '+Status);	
		})
		
		cy.xpath("//div[@class='media-body align-self-center']//span[@title='Details']").eq(0).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('Details - '+Details);	
		})
		
		cy.xpath("//div[@class='media-body align-self-center']//span[@title='Percentage']").eq(0).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('Percentage - '+Percentage);	
		})
		
		cy.wait(2000)
	cy.get('#drpValue').select(Value2);
		cy.get('#viewBtn').click({force: true});
		
		cy.wait(2000)
	cy.get('#drpValue').select(Value2, {force: true});
		cy.get('#viewBtn').click({force: true});
		
		cy.wait(2000)
	cy.get('#drpValue').select(Value2);
		cy.get('#viewBtn').click({force: true});
		
		cy.wait(2000)
	cy.get('#drpValue').select(Value2, {force: true});
		cy.get('#viewBtn').click({force: true});
		
		cy.xpath("//div[@class='media-body align-self-center']/h5").eq(0).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('From 1 To '+GradingTo);	
		})
			
		cy.xpath("//div[@class='media-body align-self-center']//span[@title='Status']").eq(0).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('Status - '+Status);	
		})
		
		cy.xpath("//div[@class='media-body align-self-center']//span[@title='Details']").eq(0).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('Details - '+Details);	
		})
		
		cy.xpath("//div[@class='media-body align-self-center']//span[@title='Percentage']").eq(0).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('Percentage - '+Percentage);	
		})*/
		
	
	})
	
	
	
	it('Delete Grading Matrix', function() {	
const { softAssert, softExpect } = chai;
cy.visit(url +'Settings/Employee/Index?module=AppraisalV2&submodule=GradingMatrixV2');
cy.wait(2000)
cy.get('#drpValue').select(Value);
		cy.get('#viewBtn').click({force: true});
		cy.get('#drpValue').select(Value);
		cy.get('#viewBtn').click({force: true});
		cy.get('#drpValue').select(Value);
		cy.get('#viewBtn').click({force: true});
		
cy.wait(2000)
		cy.get('#partialPlaceHolder')
  .find('.media-body')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1
	
	cy.xpath("//i[@class='fas fa-trash-alt text-danger font-16']").eq(lastField).click();
	cy.wait(2000)
	
	cy.get('#drpValue').select(Value);
		cy.get('#viewBtn').click();
		
		cy.get(".alert-warning").invoke('text').then((text) => {
		expect(text.trim()).equal('No Records Found.')
		cy.wait(3000)
		})	
  })
  
  cy.wait(2000)
  /*
	cy.get('#drpValue').select(Value1);
		cy.get('#viewBtn').click({force: true});
		
		cy.wait(2000)
	cy.get('#drpValue').select(Value1, {force: true});
		cy.get('#viewBtn').click({force: true});
		
		cy.xpath("//div[@class='media-body align-self-center']/h5").eq(0).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('From 1 To '+GradingTo);	
		})
			
		cy.xpath("//div[@class='media-body align-self-center']//span[@title='Status']").eq(0).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('Status - '+Status);	
		})
		
		cy.xpath("//div[@class='media-body align-self-center']//span[@title='Details']").eq(0).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('Details - '+Details);	
		})
		
		cy.xpath("//div[@class='media-body align-self-center']//span[@title='Percentage']").eq(0).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('Percentage - '+Percentage);	
		})
		cy.wait(2000)
		cy.get('#drpValue').select(Value2);
		cy.get('#viewBtn').click({force: true});
		
		cy.wait(2000)
		cy.get('#drpValue').select(Value2, {force: true});
		cy.get('#viewBtn').click({force: true});
		
		cy.xpath("//div[@class='media-body align-self-center']/h5").eq(0).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('From 1 To '+GradingTo);	
		})
			
		cy.xpath("//div[@class='media-body align-self-center']//span[@title='Status']").eq(0).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('Status - '+Status);	
		})
		
		cy.xpath("//div[@class='media-body align-self-center']//span[@title='Details']").eq(0).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('Details - '+Details);	
		})
		
		cy.xpath("//div[@class='media-body align-self-center']//span[@title='Percentage']").eq(0).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('Percentage - '+Percentage);	
		})*/
		
	})
	
	
	 
	

	})