describe('Approval Matrix', function() {
    
	var url = Cypress.env('url')
	var employeeID ='CY8'
	var settingName_Test='Test'
	var filePath= 'Question_Import_custom.xlsx'
	var settingName='AppraisalQuestions'
	
	var startingRow ='2'
	var endingRow ='13'
	
	var BusinessValue ='A'
	var Stage ='B'
	var Parameter ='C'
	var Question ='D'
	var Weightage ='E'
	var AnswerType ='F'
	
	var filePath_system= 'Questions_Import_system.xlsx'
	var settingName_system='AppraisalQuestions_System'
	
	// Appraisal Configuration
	var BusinessUnit = 'Category'
	var StartDate = '01/01/2020'
	var EndDate = '31/12/2020'
	var completedMonth = '2'
	var setDefaultFinancialYear1 = 'Yes'
	var rating ='Scale'
	
		// Grading Matrix
	 var Value1 = 'Staff'
	 var Value2 = 'Admin'
	 
	 var GradingTo1 = '40'
	 var Status1 = 'Poor'
	 var Details1 ='Poor'
	 var Percentage1 = '40'
	 
	  
	 // Appraisal Stage
	 
	 var StageName1 = 'Mid Year'
	 var StartDateStage1 = '01/04/2020'
	 var EndDateStage1 = '30/09/2020'
	 var OrderNumber1 = '1'
	 var IsActive1 = 'Yes'
	 
	 var StageName2 = 'Final'
	 var StartDateStage2 = '01/10/2020'
	 var EndDateStage2 = '31/12/2020'
	 var OrderNumber2 = '2'
	 var IsActive2 = 'No'
	 
	 
	 //Appraisal Stage Settings
	 var EmpFieldName1 = 'Target' 
	 var EmpFieldType1 = 'Text'
	 var EmpFieldSize1 = '0'
	 var EmpLabelName1 = 'Targets'
	 var EmpLevel1 = 'Question'
	
	 var MgrFieldName1 = 'ACHIEVEMENT' 
	 var MgrFieldType1 = 'Text'
	 var MgrFieldSize1 = '100'
	 var MgrLabelName1 = 'ACHIEVEMENTs'
	 var MgrLevel1 = 'Question'
	 
	 var EmpFieldName2 = 'HISTORY' 
	 var EmpFieldType2 = 'Text'
	 var EmpFieldSize2 = '0'
	 var EmpLabelName2 = 'History'
	 var EmpLevel2 = 'Stage'
	
	 var MgrFieldName2 = 'PERFORMANCE' 
	 var MgrFieldType2 = 'Text'
	 var MgrFieldSize2 = '100'
	 var MgrLabelName2 = 'Performance'
	 var MgrLevel2 = 'Stage'
	
	  
	 //Appraisal Parameter
	 var Name1 = 'Round1'
	 var Marks1 = '20'
	 
	 var Name2 = 'Round2'
	 var Marks2 = '20'
	
	Cypress.Commands.add('navigate_EmployeeProfile',()=>{
		cy.wait(1000)
		cy.get('#globalSearch').click({force: true})		
		cy.get('#globalSearch').clear()
		cy.get('#globalSearch').type(employeeID)
		cy.wait(2000)
		cy.contains('li', employeeID).click({force: true})
		cy.wait(3000)
	})
	
	beforeEach(function(){
		cy.getCookies()
		})
		
	
	it('Login to Cloud & select Company', function() {
		cy.login()
		cy.changeCompany();		
	
	})

	it('Set Appraisal Configuration', function() {	
		const { softAssert, softExpect } = chai;
		cy.visit(url+'Settings/Employee/Index?module=AppraisalV2&submodule=AppraisalConfigurationV2')
		
		cy.get('#AppraisalV2ContentTitle .fas').click({force:true})
		cy.wait(2000)
		cy.get('#drpParameter').select(BusinessUnit, {force: true});
		cy.wait(1000)
		
		cy.get('#fromdate').click({force: true}).then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(StartDate)
				})
				
		cy.get('#todate').click({force: true}).then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(EndDate)
				})	
		cy.get('#Month').click({force: true})
		cy.get('#Month').type(completedMonth)
		
		cy.get('#drpDefault').select(setDefaultFinancialYear1,{force: true})
		
		cy.get('#drpRating').select(rating, {force: true});
		cy.get('#txtEndScale').click({force: true})		
		cy.get('#txtEndScale').type('5');
		cy.get('#AvgAllManager').click({force: true})	
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
		softExpect(text.trim()).to.contains(setDefaultFinancialYear1);	
		})
		
		
   
  })
			
	})	
    
	it('Set Appraisal Process', function() {
		
		cy.visit(url+'Settings/Employee/Index?module=AppraisalV2&submodule=AppraisalProcessV2')
		cy.wait(2000)
		cy.get('#A_180').click({force:true})
		cy.get('#createBtn').click({force:true})
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
		expect(text.trim()).equal('Setting Saved successfully')
		})
		
	})
	
	
	it('Set Grading Matrix 1', function() {	
	const { softAssert, softExpect } = chai;
	cy.visit(url +'Settings/Employee/Index?module=AppraisalV2&submodule=GradingMatrixV2');
	cy.wait(2000)
	cy.get('#drpValue').select(Value1, {force: true});
	cy.get('#viewBtn').click({force: true});
		cy.wait(2000)
	cy.get('#AppraisalV2ContentTitle .fas').click({force: true});
	
	cy.get('#to').click({force: true});
		cy.get('#to').type(GradingTo1);
		
		cy.get('#status').click({force: true});
		cy.get('#status').type(Status1);
		cy.wait(2000)
		cy.get('#details').click({force: true});
		cy.get('#details').type(Details1);
		
		cy.get('#percent').click({force: true});
		cy.get('#percent').type(Percentage1);
		cy.wait(2000)
		cy.get('#createBtn').click({force: true});
		//cy.get(".toast-message").invoke('text').then((text) => {
		//expect(text.trim()).equal('Data Saved Successfully.!')
		cy.wait(3000)
		//})	
	
	})
	
	it('Set Grading Matrix - Copy to All', function() {	
	const { softAssert, softExpect } = chai;
	cy.visit(url +'Settings/Employee/Index?module=AppraisalV2&submodule=GradingMatrixV2');
	cy.wait(2000)
	cy.get('#drpValue').select(Value1, {force: true});
	cy.get('#viewBtn').click({force: true});
		cy.wait(5000)
		
		cy.xpath("//div[@class='control-label col-sm-2 text-right']//button[@class='btn btn-xs btn-primary waves-effect'][contains(text(),'Copy To All')]").click({force: true});
		cy.wait(5000)	
	
	})
		
	it('Set Appraisal Stages 1', function() {	
	cy.visit(url +'Settings/Employee/Index?module=AppraisalV2&submodule=AppraisalStagesV2');
cy.wait(2000)
	cy.get('#drpValue').select(Value1);
	cy.get('#AppraisalV2ContentTitle .fas').click({force: true});
	cy.get('#stageNames').click({force: true});
		cy.get('#stageNames').type(StageName1);
		cy.get('#startDate').click({force: true}).then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(StartDateStage1)
				})
				
				cy.get('#endDate').click({force: true}).then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(EndDateStage1)
				})
				
		cy.get('#order').click({force: true});
		cy.get('#order').type(OrderNumber1);
		cy.get('#IsActive').select(IsActive1, {force: true});
		cy.wait(2000)
		cy.get('#crtbtn').click({force: true});
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
		expect(text.trim()).equal('Appriasal Stages Added Successfully.')
		cy.wait(3000)
		})	
		
		
		
	})
	 
	it('Set Appraisal Stages 1', function() {	
	cy.visit(url +'Settings/Employee/Index?module=AppraisalV2&submodule=AppraisalStagesV2');
cy.wait(2000)
	cy.get('#drpValue').select(Value1);
	cy.get('#AppraisalV2ContentTitle .fas').click({force: true});
	cy.get('#stageNames').click({force: true});
		cy.get('#stageNames').type(StageName2);
		cy.get('#startDate').click({force: true}).then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(StartDateStage2)
				})
				
				cy.get('#endDate').click({force: true}).then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(EndDateStage2)
				})
				
		cy.get('#order').click({force: true});
		cy.get('#order').type(OrderNumber2);
		cy.get('#IsActive').select(IsActive2, {force: true});
		cy.wait(2000)
		cy.get('#crtbtn').click({force: true});
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
		expect(text.trim()).equal('Appriasal Stages Added Successfully.')
		cy.wait(3000)
		})		
		
	})
	 
	it('Set Appraisal Stages - Copy To All Category', function() {	
	cy.visit(url +'Settings/Employee/Index?module=AppraisalV2&submodule=AppraisalStagesV2');
	cy.wait(2000)
	cy.get('#drpValue').select(Value1);
	cy.wait(2000)
	cy.xpath("//div[@id='ParaData']//button[contains(text(),'Copy To All Category')]").eq(0).click({force: true});
	cy.wait(5000)
	cy.get('#drpValue').select(Value1);
	cy.wait(2000)
	cy.xpath("//div[@id='ParaData']//button[contains(text(),'Copy To All Category')]").eq(1).click({force: true});
	cy.wait(5000)
	cy.get('#drpValue').select(Value1);
	cy.wait(2000)
	cy.xpath("//div[@id='ParaData']//button[contains(text(),'Active in All BU')]").click({force: true});
	cy.wait(5000)	
		
	})
	 
	it('Appraisal Stage Settings', function() {
cy.visit(url +'Settings/Employee/Index?module=AppraisalV2&submodule=AppraisalStageSettingsV2');
cy.wait(2000)		
		
	})

	it('Add Employee Fields Details 1', function() {		
	const { softAssert, softExpect } = chai;
		cy.get("#drpValue").select(Value1)
		cy.get("#StageId").select(StageName1)
		cy.get('#btnEmp').click({force: true});
		cy.wait(2000)
		cy.get("#FieldName").click({force: true})
		cy.get("#FieldName").type(EmpFieldName1)
		
		cy.get("#FieldType").select(EmpFieldType1)
		
		cy.get("#FieldSize").click({force: true})
		cy.get("#FieldSize").clear().type(EmpFieldSize1)
		
		cy.get("#HeaderName").click({force: true})
		cy.get("#HeaderName").clear().type(EmpLabelName1)
		
		cy.get("#Level").select(EmpLevel1)
		
		cy.get('#empbtnSave').click({force: true});
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
		softExpect(text.trim()).to.eq('Data saved successfully.!');
		cy.wait(3000)
		//cy.get(".toast-message").click({force: true})
		})		
})

	it('Add Employee Fields Details 2', function() {		
	const { softAssert, softExpect } = chai;
		cy.get("#drpValue").select(Value1)
		cy.get("#StageId").select(StageName1)
		cy.get('#btnEmp').click({force: true});
		cy.wait(2000)
		cy.get("#FieldName").click({force: true})
		cy.get("#FieldName").type(EmpFieldName2)
		
		cy.get("#FieldType").select(EmpFieldType2)
		
		cy.get("#FieldSize").click({force: true})
		cy.get("#FieldSize").clear().type(EmpFieldSize2)
		
		cy.get("#HeaderName").click({force: true})
		cy.get("#HeaderName").clear().type(EmpLabelName2)
		
		cy.get("#Level").select(EmpLevel2)
		
		cy.get('#empbtnSave').click({force: true});
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
		softExpect(text.trim()).to.eq('Data saved successfully.!');
		cy.wait(3000)
		//cy.get(".toast-message").click({force: true})
		})		
})
	 
	it('Add Manager Fields Details 1', function() {	
		const { softAssert, softExpect } = chai;
		cy.get("#drpValue").select(Value1)
		cy.get("#StageId").select(StageName1)
		cy.get('#btnMan').click({force: true});
		cy.wait(2000)
		cy.get("#FieldName").click({force: true})
		cy.get("#FieldName").type(MgrFieldName1)
		
		cy.get("#FieldType").select(MgrFieldType1)
		
		cy.get("#FieldSize").click({force: true})
		cy.get("#FieldSize").clear().type(MgrFieldSize1)
		
		cy.get("#HeaderName").click({force: true})
		cy.get("#HeaderName").clear().type(MgrLabelName1)
		
		cy.get("#Level").select(MgrLevel1)
		
		cy.get('#manbtnSave').click({force: true});
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
		softExpect(text.trim()).to.eq('Data saved successfully.!');
		cy.wait(3000)
		//cy.get(".toast-message").click({force: true})
		})		
})

	
it('Add Manager Fields Details 1', function() {	
		const { softAssert, softExpect } = chai;
		cy.get("#drpValue").select(Value1)
		cy.get("#StageId").select(StageName1)
		cy.get('#btnMan').click({force: true});
		cy.wait(2000)
		cy.get("#FieldName").click({force: true})
		cy.get("#FieldName").type(MgrFieldName2)
		
		cy.get("#FieldType").select(MgrFieldType2)
		
		cy.get("#FieldSize").click({force: true})
		cy.get("#FieldSize").clear().type(MgrFieldSize2)
		
		cy.get("#HeaderName").click({force: true})
		cy.get("#HeaderName").clear().type(MgrLabelName2)
		
		cy.get("#Level").select(MgrLevel2)
		
		cy.get('#manbtnSave').click({force: true});
		cy.wait(2000)
		cy.get(".toast-message").invoke('text').then((text) => {
		softExpect(text.trim()).to.eq('Data saved successfully.!');
		cy.wait(3000)
		//cy.get(".toast-message").click({force: true})
		})		
})

	it('Add Employee & Manager Fields - Copy To All', function() {	
		const { softAssert, softExpect } = chai;
		cy.get("#drpValue").select(Value1)
		cy.get("#StageId").select(StageName1)
		cy.get("#ddOverRt").click({force: true});
		cy.xpath("//button[contains(text(),'Copy To All')]").click({force: true});
		cy.wait(5000)		
})
	
	it('Add Appriasal Parameter 1 for Mid Year', function() {
	const { softAssert, softExpect } = chai;
	cy.visit(url +'Settings/Employee/Index?module=AppraisalV2&submodule=AppriasalParameterV2');
	cy.wait(2000)		
		
		cy.get("#drpValue").select(Value1)
		cy.get("#SatgedrpValue").select(StageName1)
		cy.get('#names').click({force: true});
cy.get('#names').type(Name1);
cy.get('#marks').click({force: true});
cy.get('#marks').type(Marks1);
cy.get('#crtbtn').click({force: true});
cy.wait(2000)
		//cy.get(".toast-message").invoke('text').then((text) => {
		//softExpect(text.trim()).to.eq('Data Saved Successfully.!');
		cy.wait(3000)
		//cy.get(".toast-message").click({force: true})
		//})	
	})

	it('Add Appriasal Parameter 2 for Mid Year', function() {
	const { softAssert, softExpect } = chai;
	cy.visit(url +'Settings/Employee/Index?module=AppraisalV2&submodule=AppriasalParameterV2');
	cy.wait(2000)		
		
		cy.get("#drpValue").select(Value1)
		cy.get("#SatgedrpValue").select(StageName1)
		cy.get('#names').click({force: true});
cy.get('#names').type(Name2);
cy.get('#marks').click({force: true});
cy.get('#marks').type(Marks2);
cy.get('#crtbtn').click({force: true});
cy.wait(2000)
		//cy.get(".toast-message").invoke('text').then((text) => {
		//softExpect(text.trim()).to.eq('Data Saved Successfully.!');
		cy.wait(3000)
		//cy.get(".toast-message").click({force: true})
		//})	
	})

	it('Add Appriasal Parameter - Copy To All', function() {
	const { softAssert, softExpect } = chai;
	cy.visit(url +'Settings/Employee/Index?module=AppraisalV2&submodule=AppriasalParameterV2');
	cy.wait(2000)		
		
		cy.get("#drpValue").select(Value1)
		cy.get("#SatgedrpValue").select(StageName1)
		
		
		cy.xpath("//button[@class='btn btn-xs btn-primary waves-effect']").click({force: true});
		cy.wait(2000)
		
	
	cy.wait(2000)
		//cy.get(".toast-message").invoke('text').then((text) => {
		//softExpect(text.trim()).to.eq('Data Saved Successfully.!');
		cy.wait(3000)
		//cy.get(".toast-message").click({force: true})
		//})	
	})

	it('Add Appriasal Parameter 1 for Final', function() {
	const { softAssert, softExpect } = chai;
	cy.visit(url +'Settings/Employee/Index?module=AppraisalV2&submodule=AppriasalParameterV2');
	cy.wait(2000)		
		
		cy.get("#drpValue").select(Value1)
		cy.get("#SatgedrpValue").select(StageName2)
		cy.get('#names').click({force: true});
cy.get('#names').type(Name1);
cy.get('#marks').click({force: true});
cy.get('#marks').type(Marks1);
cy.get('#crtbtn').click({force: true});
cy.wait(2000)
		//cy.get(".toast-message").invoke('text').then((text) => {
		//softExpect(text.trim()).to.eq('Data Saved Successfully.!');
		cy.wait(3000)
		//cy.get(".toast-message").click({force: true})
		//})	
	})

	it('Add Appriasal Parameter 2 for Final', function() {
	const { softAssert, softExpect } = chai;
	cy.visit(url +'Settings/Employee/Index?module=AppraisalV2&submodule=AppriasalParameterV2');
	cy.wait(2000)		
		
		cy.get("#drpValue").select(Value1)
		cy.get("#SatgedrpValue").select(StageName2)
		cy.get('#names').click({force: true});
cy.get('#names').type(Name2);
cy.get('#marks').click({force: true});
cy.get('#marks').type(Marks2);
cy.get('#crtbtn').click({force: true});
cy.wait(2000)
		//cy.get(".toast-message").invoke('text').then((text) => {
		//softExpect(text.trim()).to.eq('Data Saved Successfully.!');
		cy.wait(3000)
		//cy.get(".toast-message").click({force: true})
		//})	
	})

	it('Add Appriasal Parameter - Copy To All', function() {
	const { softAssert, softExpect } = chai;
	cy.visit(url +'Settings/Employee/Index?module=AppraisalV2&submodule=AppriasalParameterV2');
	cy.wait(2000)		
		
		cy.get("#drpValue").select(Value1)
		cy.get("#SatgedrpValue").select(StageName2)
		
		
		cy.xpath("//button[@class='btn btn-xs btn-primary waves-effect']").click({force: true});
		cy.wait(2000)
		
	
	cy.wait(2000)
		//cy.get(".toast-message").invoke('text').then((text) => {
		//softExpect(text.trim()).to.eq('Data Saved Successfully.!');
		cy.wait(3000)
		//cy.get(".toast-message").click({force: true})
		//})	
	})

	it('Navigate Appraisal Question Import Page', function() {
		
		cy.visit(Cypress.env('url')+'Settings/Employee/Index?module=AppraisalV2&submodule=AppraisalImportQuestionV2')
		cy.wait(2000)
		
	})
		
	it('Verify Validation Massges - Please Select Setting', function() {	
		const { softAssert, softExpect } = chai;

		cy.wait(2000)
		 cy.get('#savesetting').click({force: true})
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Please Select Setting');
		 cy.wait(3000)
			cy.get(".toast-message").click({force: true})
		  })
	})
	
	it('Verify Validation Massges - Enter Starting row Number.!', function() {	
		const { softAssert, softExpect } = chai;
		cy.xpath("//a[@class='btn btn-xs btn-primary waves-effect']").click({force: true})
	cy.wait(2000)
	cy.get('#SettingNameNew').click({force: true})
	cy.get('#SettingNameNew').clear().type(settingName_system)
	
	cy.xpath("//input[@name='name']").click({force: true})
    cy.wait(2000)
	
	cy.get('#savesetting').click({force: true})
	
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Enter Starting row Number.!');
		 cy.wait(3000)
			cy.get(".toast-message").click({force: true})
		  })
	})
	
	it('Verify Validation Massges - Enter Ending row Number.!', function() {	
		const { softAssert, softExpect } = chai;
	cy.get('#StartingRow').click({force: true})
	cy.get('#StartingRow').clear().type(startingRow)
	
    cy.wait(2000)
	
	cy.get('#savesetting').click({force: true})
	
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Enter Ending row Number.!');
		 cy.wait(3000)
			cy.get(".toast-message").click({force: true})
		  })
	})
	
	it('Verify Validation Massges - Select Component Value', function() {	
		const { softAssert, softExpect } = chai;
	
    cy.wait(2000)
	cy.get('#EndingRow').click({force: true})
	cy.get('#EndingRow').clear().type(endingRow)
	cy.get('#savesetting').click({force: true})
	
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Select Component Value');
		 cy.wait(3000)
			cy.get(".toast-message").click({force: true})
		  })
	})

	it('Save Setting for Appraisal Question Import', function() {	
		const { softAssert, softExpect } = chai;
		
	

		cy.get('#FieldValue').select(BusinessValue,{force: true})
		cy.get('#StageId').select(Stage,{force: true})
		cy.get('#ParameterId').select(Parameter,{force: true})
		cy.get('#Question').select(Question,{force: true})
		cy.get('#Weightage').select(Weightage,{force: true})
		cy.get('#AnswerType').select(AnswerType,{force: true})
		
		
		
                 cy.wait(2000)
		// cy.get('#savesettingAmmendment').click({force: true})
		
		cy.fixture(filePath_system, 'binary')
		.then(Cypress.Blob.binaryStringToBlob)
		.then(fileContent => {
		cy.get('#file').upload({
		fileContent,
		fileName: filePath_system,
		mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		encoding: 'utf8'
		})
		})
		cy.wait(5000)
	
		cy.get('#SettType').select('SYSTEM',{force: true})
		
		// cy.get('#checkOverWrite').click({force: true})
    cy.wait(2000)
	 cy.get('#savesetting').click({force: true})
		 
		 cy.get(".toast-message").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Setting Saved Successfully');
		 cy.wait(3000)
			cy.get(".toast-message").click({force: true})
		  })
	})

	it('Upload File of Appraisal Question Import', function() {	
		const { softAssert, softExpect } = chai;
		cy.get('#SettingName').select(settingName_system)
		cy.wait(2000)
		cy.get('#SettingName').select(settingName_system)
		cy.wait(2000)
		cy.get('#SettingName').select(settingName_system)
		cy.wait(2000)
		cy.get('#SettingName').select(settingName_system,{force: true})
		    cy.wait(5000)
			
			cy.fixture(filePath_system, 'binary')
		.then(Cypress.Blob.binaryStringToBlob)
		.then(fileContent => {
		cy.get('#file').upload({
		fileContent,
		fileName: filePath_system,
		mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		encoding: 'utf8'
		})
		})
		cy.wait(5000)
	
		cy.get('#SettType').select('SYSTEM',{force: true})
			cy.wait(5000)
		cy.get('#uploadsetting').click({force: true})
		  cy.wait(5000)
		 cy.xpath("//div[@class='alert-text']").invoke('text').then((text) => {
		 softExpect(text.trim()).to.eq('Excel uploaded successfully, it will get processed in background.');
		 cy.wait(30000)
		
			
		  })
})

	it('Verify Imported Appraisal Question', function() {	
		const { softAssert, softExpect } = chai;
		cy.visit(Cypress.env('url')+'Settings/Employee/Index?module=AppraisalV2&submodule=AppraisalKpiV2')
		cy.get('#drpValue').select('Staff',{force: true})
		cy.get('#SatgedrpValue').select('Mid Year',{force: true})
		
		cy.get("#tableSorter").invoke('text').then((text) => {
			cy.wait(5000) 
			softExpect(text.trim()).to.contain('Role clarity New New12312  Question set3');
			softExpect(text.trim()).to.contain('Critical knowledge in asp.net New123New12312 v');
			softExpect(text.trim()).to.contain('what is your view on the best approach to New1Question set32312performance management? New123');
			cy.wait(2000) 
			})
		
})

	

	})