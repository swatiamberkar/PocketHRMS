
describe('Approval Matrix- Employee Details', function() {
	
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
	

	 
	it('Navigate Appraisal Stages', function() {	
cy.visit(url +'Settings/Employee/Index?module=AppraisalV2&submodule=AppraisalStagesV2');
cy.wait(2000)
cy.reload()
cy.visit(url +'Settings/Employee/Index?module=AppraisalV2&submodule=AppraisalStagesV2');
cy.wait(2000)
})

	
	
	it('Verify Validation Massage - No Records Found.', function() {	
		
		//cy.xpath("//button[@class='btn btn-xs btn-danger waves-effect']").click();
		cy.get('#drpValue').select(Value);
		//cy.get('#viewBtn').click();
		cy.wait(2000)
		cy.get(".alert-warning").invoke('text').then((text) => {
		expect(text.trim()).equal('No Records Found.')
		cy.wait(3000)
		})	
	})
	
	it('Verify Validation Massage - Enter Stage Names', function() {	
	
		cy.get('#AppraisalV2ContentTitle .fas').click();
		cy.wait(2000)
		cy.get('#crtbtn').click();
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
		expect(text.trim()).equal('Enter Stage Names')
		cy.wait(3000)
		})	
	})
	
	it('Verify Validation Massage - Please Fill Start Date', function() {	
	
		cy.get('#stageNames').click();
		cy.get('#stageNames').type(StageName);
		cy.wait(2000)
		cy.get('#crtbtn').click();
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
		expect(text.trim()).equal('Please Fill Start Date')
		cy.wait(3000)
		})	
	})
	
	it('Verify Validation Massage - Please Fill End Date', function() {	
		const { softAssert, softExpect } = chai;	
		cy.get('#startDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(StartDateStage)
				})
		
		cy.wait(1000)
		cy.get('#crtbtn').click({force: true})
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Please Fill End Date');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
	})
		
	it('Verify Validation Massage - Priority No cannot be Blank or 0.', function() {	
		const { softAssert, softExpect } = chai;	
		cy.get('#endDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(EndDateStage)
				})
		
		cy.wait(1000)
		cy.get('#crtbtn').click({force: true})
			cy.get(".toast-message").invoke('text').then((text) => {
			softExpect(text.trim()).to.eq('Priority No cannot be Blank or 0.');
			cy.wait(3000)
			cy.get(".toast-message").click({force: true})
			})
	})

	it('Verify Validation Massage - Appriasal Stages Added Successfully.', function() {	
	const { softAssert, softExpect } = chai;
		cy.get('#order').click();
		cy.get('#order').type(OrderNumber);
		cy.get('#IsActive').type(IsActive);
		cy.wait(2000)
		cy.get('#crtbtn').click();
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
		expect(text.trim()).equal('Appriasal Stages Added Successfully.')
		cy.wait(3000)
		})	
		
		cy.wait(2000)
		cy.get('#ParaData')
  .find('.media-body')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1
	
		cy.xpath("//div[@class='media-body align-self-center']/h5").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq(StageName);	
		})
			
		cy.xpath("//div[@class='media-body align-self-center']//span[@title='Start Date']").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.contains(StartDateStage);	
		})
		
		cy.xpath("//div[@class='media-body align-self-center']//span[@title='End Date']").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.contains(EndDateStage);	
		})
		
		cy.xpath("//div[@class='media-body align-self-center']//span[@title='Order No.']").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.contains(OrderNumber);	
		})
		
		cy.xpath("//div[@class='media-body align-self-center']//span[@title='Is Active']").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.contains(IsActive);	
		})
		
	})
	
	cy.visit(url +'Settings/Employee/Index?module=AppraisalV2&submodule=AppraisalStagesV2');
cy.wait(2000)
//cy.reload()
cy.visit(url +'Settings/Employee/Index?module=AppraisalV2&submodule=AppraisalStagesV2');
cy.wait(2000)
         /*
		cy.get('#drpValue').select(Value1, {force:true});
		cy.get('#drpValue').select(Value1);
		cy.get('#drpValue').select(Value1, {force:true});
		//cy.get('#viewBtn').click();
		
		cy.get(".alert-warning").invoke('text').then((text) => {
		expect(text.trim()).equal('No Records Found.')
		cy.wait(3000)
		})	
		
		cy.get('#drpValue').select(Value2, {force:true});
		cy.get('#drpValue').select(Value2);
		cy.get('#drpValue').select(Value2, {force:true});
		//cy.get('#crtbtn').click();
		
		cy.get(".alert-warning").invoke('text').then((text) => {
		expect(text.trim()).equal('No Records Found.')
		cy.wait(3000)
		})	
		*/
	})
	
	/*
	it('Copy to all - Appriasal Stages', function() {
		cy.visit(url+ 'Settings/Employee/Index?module=AppraisalV2&submodule=AppraisalStagesV2')
		cy.wait(3000)
		//cy.reload()
		cy.visit(url+ 'Settings/Employee/Index?module=AppraisalV2&submodule=AppraisalStagesV2')
		cy.wait(3000)
		const { softAssert, softExpect } = chai;
	cy.get('#drpValue').select(Value, {force: true});
	cy.get('#drpValue').select(Value);
	cy.get('#drpValue').select(Value, {force: true});
		cy.get('#drpValue').select(Value);
	cy.wait(3000)
		cy.xpath("//button[@class='btn btn-xs btn-primary']").click();
		cy.wait(3000)
		cy.get('#drpValue').select(Value1, {force: true});
	cy.get('#drpValue').select(Value1);
	cy.get('#drpValue').select(Value1, {force: true});
		cy.get('#drpValue').select(Value1);
	
		cy.get('#ParaData')
  .find('.media-body')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1
	
		cy.xpath("//div[@class='media-body align-self-center']/h5").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq(StageName);	
		})
			
		cy.xpath("//div[@class='media-body align-self-center']//span[@title='Start Date']").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.contains(StartDateStage);	
		})
		
		cy.xpath("//div[@class='media-body align-self-center']//span[@title='End Date']").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.contains(EndDateStage);	
		})
		
		cy.xpath("//div[@class='media-body align-self-center']//span[@title='Order No.']").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.contains(OrderNumber);	
		})
		
		cy.xpath("//div[@class='media-body align-self-center']//span[@title='Is Active']").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.contains(IsActive);	
		})
		
	})
	
	cy.get('#drpValue').select(Value2, {force: true});
	cy.get('#drpValue').select(Value2, {force: true});
	cy.get('#drpValue').select(Value2, {force: true});
	
		//cy.get('#viewBtn').click();
		
		cy.get('#ParaData')
  .find('.media-body')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1
	
		cy.xpath("//div[@class='media-body align-self-center']/h5").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq(StageName);	
		})
			
		cy.xpath("//div[@class='media-body align-self-center']//span[@title='Start Date']").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.contains(StartDateStage);	
		})
		
		cy.xpath("//div[@class='media-body align-self-center']//span[@title='End Date']").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.contains(EndDateStage);	
		})
		
		cy.xpath("//div[@class='media-body align-self-center']//span[@title='Order No.']").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.contains(OrderNumber);	
		})
		
		cy.xpath("//div[@class='media-body align-self-center']//span[@title='Is Active']").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.contains(IsActive);	
		})
		
	})	
})*/
	
	it('Update Appriasal Stages ', function() {	
	cy.visit(url+ 'Settings/Employee/Index?module=AppraisalV2&submodule=AppraisalStagesV2')
		cy.wait(3000)
		cy.visit(url +'Settings/Employee/Index?module=AppraisalV2&submodule=AppraisalStagesV2');
cy.wait(2000)
//cy.reload()
cy.visit(url +'Settings/Employee/Index?module=AppraisalV2&submodule=AppraisalStagesV2');
cy.wait(2000)
	const { softAssert, softExpect } = chai;
	cy.get('#drpValue').select(Value, {force: true});
	cy.get('#drpValue').select(Value, {force: true});
	cy.get('#drpValue').select(Value, {force: true});
	cy.wait(3000)
	cy.get('#ParaData')
  .find('.media-body')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1
	
	cy.xpath("//i[@class='fas fa-edit text-info font-16']").eq(lastField).click();
	cy.wait(2000)
	
	cy.get('#stageNames').click();
		cy.get('#stageNames').clear().type(StageName1);
		
			cy.get('#startDate').click({force: true}).then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(StartDateStage1)
				})
				
			cy.get('#endDate').click({force: true}).then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(EndDateStage1)
				})
				
		
		cy.get('#order').click({force: true});
		cy.get('#order').clear().type(OrderNumber1);
		cy.get('#IsActive').select(IsActive1, {force: true});
		cy.wait(2000)
		cy.get('#updbtn').click({force: true});
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
		expect(text.trim()).equal('Appraisal Stage Updated successfully.')
		cy.wait(3000)
		})	
		
		cy.wait(2000)
		cy.get('#ParaData')
  .find('.media-body')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	var lastField = listingCount-1
	
		cy.xpath("//div[@class='media-body align-self-center']/h5").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq(StageName1);	
		})
			
		cy.xpath("//div[@class='media-body align-self-center']//span[@title='Start Date']").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.contains(StartDateStage1);	
		})
		
		cy.xpath("//div[@class='media-body align-self-center']//span[@title='End Date']").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.contains(EndDateStage1);	
		})
		
		cy.xpath("//div[@class='media-body align-self-center']//span[@title='Order No.']").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.contains(OrderNumber1);	
		})
		
		cy.xpath("//div[@class='media-body align-self-center']//span[@title='Is Active']").eq(lastField).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.contains(IsActive1);	
		})
		
	})
		
  })
	})
	/*
	it('Delete Appriasal Stages', function() {	
	const { softAssert, softExpect } = chai;
cy.visit(url +'Settings/Employee/Index?module=AppraisalV2&submodule=AppraisalStagesV2');
cy.wait(2000)
//cy.reload()
cy.visit(url +'Settings/Employee/Index?module=AppraisalV2&submodule=AppraisalStagesV2');
cy.wait(2000)
	cy.get('#drpValue').select(Value2);
	cy.get('#drpValue').select(Value2);
	cy.get('#drpValue').select(Value2);
		//cy.get('#viewBtn').click();
		
	cy.wait(2000)
	
	cy.xpath("//i[@class='fas fa-trash-alt text-danger font-16']").eq(0).click();
	cy.wait(2000)
	
	//cy.get('#drpValue').select(Value);
		//cy.get('#viewBtn').click();
		
		cy.get('#drpValue').select(Value2);
	cy.get('#drpValue').select(Value2);
	cy.get('#drpValue').select(Value2);
	
		cy.get(".alert-warning").invoke('text').then((text) => {
		expect(text.trim()).equal('No Records Found.')
		cy.wait(3000)
		})	
  
	})*/
	
	
	it('Navigate Appraisal Stage Settings', function() {	
cy.visit(url +'Settings/Employee/Index?module=AppraisalV2&submodule=AppraisalStageSettingsV2');
cy.wait(2000)
})

	it('Verify Validation Massage - Please select Value', function() {	
		const { softAssert, softExpect } = chai;
	
		cy.xpath("//button[contains(text(),'Copy To All')]").click();
		//cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
		softExpect(text.trim()).to.eq('Please select Value');
		//cy.wait(3000)
		//cy.get(".toast-message").click()
		})	
		cy.wait(10000)
		cy.get('#btnEmp').click();
		//cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
		softExpect(text.trim()).to.eq('Please select Value');
		//cy.wait(3000)
		//cy.get(".toast-message").click()
		})	
		cy.wait(10000)
		//cy.get('#btnMan').click();
		//cy.wait(2000)
		//cy.get(".toast-message").invoke('text').then((text) => {
		//softExpect(text.trim()).to.eq('Please select Value');
		//cy.wait(3000)
		//cy.get(".toast-message").click()
		//})
		//cy.wait(10000)
		cy.get('#btnSave').click();
		//cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
		softExpect(text.trim()).to.eq('Please select Value');
		cy.wait(10000)
		//cy.get(".toast-message").click()
		})
		
	})
	
	it('Verify Validation Massage - Please select Stage Name', function() {	
		const { softAssert, softExpect } = chai;
		
		cy.get("#drpValue").select(Value)
		cy.xpath("//button[contains(text(),'Copy To All')]").click();
		//cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
		softExpect(text.trim()).to.eq('Please select Stage Name');
		//cy.wait(3000)
		cy.get(".toast-message").click()
		})	
		cy.wait(5000)
		cy.get('#btnEmp').click();
		//cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
		softExpect(text.trim()).to.eq('Please select Stage Name');
		//cy.wait(3000)
		cy.get(".toast-message").click()
		})	
		cy.wait(5000)
		//cy.get('#btnMan').click();
		//cy.wait(2000)
		//cy.get(".toast-message").invoke('text').then((text) => {
		//softExpect(text.trim()).to.eq('Please select Stage Name');
		//cy.wait(3000)
		//cy.get(".toast-message").click()
		//})
		cy.wait(5000)
		cy.get('#btnSave').click();
		//cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
		softExpect(text.trim()).to.eq('Please select Stage Name');
		//cy.wait(3000)
		cy.get(".toast-message").click()
		})	
	})



	 
	it('Verify Validation Massage - Data Saved Successfully.!', function() {	
		const { softAssert, softExpect } = chai;
		cy.get("#drpValue").select(Value)
		cy.get("#drpValue").select(Value, {force: true})
		cy.get("#drpValue").select(Value)
		cy.get("#drpValue").select(Value, {force: true})
		cy.get("#StageId").select(StageName1)
		cy.get("#StageId").select(StageName1, {force: true})
		cy.get("#StageId").select(StageName1)
		cy.get("#StageId").select(StageName1, {force: true})
		cy.get('#btnEmp').click();
		cy.wait(2000)
		
		cy.get("#FieldName").click()
		cy.get("#FieldName").type(FieldName)
		cy.get("#DisplayEmployee").select('Yes')
		cy.wait(2000)
		cy.get('#empbtnSave').click()
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
		softExpect(text.trim()).to.eq('Data saved successfully.!');
		//cy.wait(3000)
		cy.get(".toast-message").click()
		})	
		cy.wait(10000)
		cy.get("#drpValue").select(Value)
		cy.get("#drpValue").select(Value, {force: true})
		cy.get("#drpValue").select(Value)
		cy.get("#drpValue").select(Value, {force: true})
		cy.get("#StageId").select(StageName1)
		cy.get("#StageId").select(StageName1, {force: true})
		cy.get("#StageId").select(StageName1)
		cy.get("#StageId").select(StageName1, {force: true})
		cy.get("#tableBodyEmpSorter>tr>td:nth-child(4)").eq(0).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq('TARGET');	
		})		
})


	it('Update Employee Fields Details', function() {	
		const { softAssert, softExpect } = chai;
		cy.visit(url +'Settings/Employee/Index?module=AppraisalV2&submodule=AppraisalStageSettingsV2');
	cy.wait(2000)
		cy.get("#drpValue").select(Value)
		cy.get("#drpValue").select(Value, {force: true})
		cy.get("#drpValue").select(Value)
		cy.get("#drpValue").select(Value, {force: true})
		cy.get("#StageId").select(StageName1)
		cy.get("#StageId").select(StageName1, {force: true})
		cy.get("#StageId").select(StageName1)
		cy.get("#StageId").select(StageName1, {force: true})
		
		cy.get("#tableBodyEmpSorter>tr>td:nth-child(13)>input:nth-child(1)").click({force: true})
		
		cy.get("#FieldSize").click()
		cy.get("#FieldSize").clear().type(FieldSize)
		
		cy.get("#HeaderName").click()
		cy.get("#HeaderName").clear().type(LabelName)
		
		cy.get("#Validate").select(Validate)
		
		cy.get("#Order").click()
		cy.get("#Order").clear().type(Order)
		
		cy.get("#Level").select(Level)
		cy.get("#Display").select(ManagerScreenDisplay)
		cy.get("#DisplayEmployee").select(EmployeeScreenDisplay)
		
		cy.get('#empbtnUpdate').click();
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
		softExpect(text.trim()).to.eq('Data Updated Successfully.!');
		cy.wait(3000)
		cy.get(".toast-message").click()
		})	
		
		cy.get("#tableBodyEmpSorter>tr>td:nth-child(6)").eq(0).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq(FieldSize);	
		})

		cy.get("#tableBodyEmpSorter>tr>td:nth-child(7)").eq(0).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq(LabelName);	
		})
		
		cy.get("#tableBodyEmpSorter>tr>td:nth-child(8)").eq(0).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq(Validate);	
		})
		
		cy.get("#tableBodyEmpSorter>tr>td:nth-child(9)").eq(0).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq(Order);	
		})
		
		cy.get("#tableBodyEmpSorter>tr>td:nth-child(10)").eq(0).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq(Level);	
		})
		
		cy.get("#tableBodyEmpSorter>tr>td:nth-child(11)").eq(0).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq(ManagerScreenDisplay);	
		})
		
		cy.get("#tableBodyEmpSorter>tr>td:nth-child(12)").eq(0).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq(EmployeeScreenDisplay);	
		})
})

	it('Delete Employee Fields Details', function() {
		const { softAssert, softExpect } = chai;
		cy.wait(5000)
		
	cy.get("#drpValue").select(Value)
		cy.get("#StageId").select(StageName1)
		
		cy.get("#tableBodyEmpSorter>tr>td:nth-child(13)>input:nth-child(2)").click()
		cy.get(".toast-message").invoke('text').then((text) => {
		softExpect(text.trim()).to.eq('Data Deleted successfully.!');
		cy.wait(3000)
		//cy.get(".toast-message").click()
		})
		
})

	it('Verify Validation Massage - Please Enter Field Name', function() {	
		const { softAssert, softExpect } = chai;
		cy.visit(url +'Settings/Employee/Index?module=AppraisalV2&submodule=AppraisalStageSettingsV2');
		cy.get("#drpValue").select(Value)
		cy.get("#StageId").select(StageName1)
		cy.get('#btnMan').click();
		cy.wait(2000)
		cy.get('#manbtnSave').click();
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
		softExpect(text.trim()).to.eq('Please Enter Field Name');
		cy.wait(3000)
		cy.get(".toast-message").click()
		})			
})


	it('Verify Validation Massage - Data Saved Successfully.!', function() {	
			const { softAssert, softExpect } = chai;
		cy.get("#FieldName").click()
		cy.get("#FieldName").type(ManagerFieldName)
		cy.get("#DisplayEmployee").select('Yes')
		cy.wait(2000)
		
		cy.get('#manbtnSave').click({force: true});
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
		softExpect(text.trim()).to.eq('Data saved successfully.!');
		cy.wait(5000)
		//cy.get(".toast-message").click()
		})	
		cy.get("#drpValue").select(Value)
		cy.get("#drpValue").select(Value, {force: true})
		cy.get("#drpValue").select(Value)
		cy.get("#drpValue").select(Value, {force: true})
		cy.get("#StageId").select(StageName1)
		cy.get("#StageId").select(StageName1, {force: true})
		cy.get("#StageId").select(StageName1)
		cy.get("#StageId").select(StageName1, {force: true})
		cy.get("#tableBodyManSorter>tr>td:nth-child(4)").invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq(ManagerFieldName);	
		})		
})


	it('Update Manager Fields Details', function() {	
		const { softAssert, softExpect } = chai;
		cy.visit(url +'Settings/Employee/Index?module=AppraisalV2&submodule=AppraisalStageSettingsV2');
		cy.wait(5000)
		cy.get("#drpValue").select(Value)
		cy.get("#StageId").select(StageName1)
		
		cy.get("#tableBodyManSorter>tr>td:nth-child(13)>input:nth-child(1)").click({force: true})
		
		cy.get("#FieldSize").click()
		cy.get("#FieldSize").clear().type(FieldSize)
		
		cy.get("#HeaderName").click()
		cy.get("#HeaderName").clear().type(ManagerFieldName1)
		
		cy.get("#Validate").select(Validate)
		
		cy.get("#Order").click()
		cy.get("#Order").clear().type(Order)
		
		cy.get("#Level").select(Level)
		cy.get("#Display").select(ManagerScreenDisplay)
		cy.get("#DisplayEmployee").select(EmployeeScreenDisplay)
		
		
		cy.get('#manbtnUpdate').click({force: true});
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
		softExpect(text.trim()).to.eq('Data Updated Successfully.!');
		cy.wait(3000)
		cy.get(".toast-message").click()
		})	
		
		cy.get("#tableBodyManSorter>tr>td:nth-child(6)").eq(0).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq(FieldSize);	
		})

		cy.get("#tableBodyManSorter>tr>td:nth-child(7)").eq(0).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq(ManagerFieldName1);	
		})
	//	
		cy.get("#tableBodyManSorter>tr>td:nth-child(8)").eq(0).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq(Validate);	
		})
		
		cy.get("#tableBodyManSorter>tr>td:nth-child(9)").eq(0).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq(Order);	
		})
		
		cy.get("#tableBodyManSorter>tr>td:nth-child(10)").eq(0).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq(Level);	
		})
		
		cy.get("#tableBodyManSorter>tr>td:nth-child(11)").eq(0).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq(ManagerScreenDisplay);	
		})
		
		cy.get("#tableBodyManSorter>tr>td:nth-child(12)").eq(0).invoke('text').then((text) => {
		cy.log(text.trim())
		softExpect(text.trim()).to.eq(EmployeeScreenDisplay);	
		})
		//
})

/*	it('Delete Employee Fields Details', function() {
		const { softAssert, softExpect } = chai;
		cy.wait(5000)
	cy.get("#drpValue").select(Value)
		cy.get("#StageId").select(StageName1)
		
		cy.get("#tableBodyManSorter>tr>td:nth-child(13)>input:nth-child(2)").click({force: true})
		cy.get(".toast-message").invoke('text').then((text) => {
		softExpect(text.trim()).to.eq('Data Deleted successfully.!');
		cy.wait(3000)
		//cy.get(".toast-message").click()
		})
		
})

*/
	})