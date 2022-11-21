describe('03_Popup Data', function() {

	var esiLocation=	['Pune', 'Mumbai']
	var esiDispensary=	['Pune', 'Mumbai']
	var department=	['IT', 'HR']
	var designation=	['Manager', 'HR']
	var grade=	['A', 'B']
	var costCentre=	['Pune', 'Mumbai']
	var bankName=	['Axis', 'BOI']
	var location=	['Pune', 'Mumbai']
	var branch=	['Thane', 'Panvel']
	var designation_with_specialCharacter = ['Admin & HR']
	var digit = ['10']

	function navigatePopupData(Component, Data) {
		cy.server()
		cy.route('GET', '/Payroll/Settings/getPopUpData?tableName=').as('loadPopupComponant')

		cy.visit(Cypress.env('url')+'Settings/Employee/Index?module=hr&submodule=popup')
		cy.get('#HR_PopUpData').click()

		cy.wait('@loadPopupComponant').its('status').should('eq', 200) 

	}
	function AddPopupdata(Component, Data) {
	
		navigatePopupData()
		cy.wait(2000)
		//var comp = Component.replaceAll(' ', '')
		//cy.server()
		//cy.route('POST', '/Payroll/Settings/SavePopupData?fieldname='+comp.toUpperCase()+'&popupValue='+Data.toUpperCase()+'&Id=').as('getPopupdata')

		cy.get('#metadatatable').select(Component)
		cy.get('[title="Add Popup"]').eq(0).click()

		cy.get('#popupvalue').click()
		cy.get('#popupvalue').type(Data)
		cy.get('[onclick="submitData()"]').click()
		//cy.wait(1000)
		//cy.wait('@getPopupdata').its('status').should('eq', 200) 

		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Data Saved Successfully')
		})
		cy.get(".toast-message").click()
		cy.wait(2000)
		cy.get('#metadatatable').select(Component)
		cy.get('#popUpDataForm').contains(Data)
		cy.wait(1000)
		 
	}
	function DeleteRecord () {

		cy.get('.text-danger').eq(0).click({force:true});
		
		cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Record Deleted Successfully.')
		})	
		//click on message to close message box
		cy.get(".toast-message").click()
		cy.wait(1000)
	}

beforeEach(function(){
        cy.getCookies()
})
				
it('Login to Cloud & select Company', function() {
	cy.login()
	cy.changeCompany();	
	navigatePopupData();
})

context ('Pop-up data - Flow',() => {
	
it('Add ESI Location', function() {

	for (let i = 0; i < esiLocation.length; i++) { 
	AddPopupdata('ESI Location', esiLocation[i])
	}

})
it('Add ESI Dispensary', function() {

	for (let i = 0; i < esiDispensary.length; i++) { 
	AddPopupdata('ESI Dispensary', esiDispensary[i])
	}

})
it('Add Department', function() {

	for (let i = 0; i < department.length; i++) { 
	AddPopupdata('Department', department[i])
	}

})
it('Add Designation', function() {

		for (let i = 0; i < designation.length; i++) { 
		AddPopupdata('Designation', designation[i])
		}
	
})

/*
it('Add Grade', function() {

		for (let i = 0; i < grade.length; i++) { 
			AddPopupdata('Grade', grade[i])
		}	
})


it('Add Bank Name', function() {

		for (let i = 0; i < bankName.length; i++) { 
			AddPopupdata('Bank Name', bankName[i])
		}	
})
it('Add Location', function() {

		for (let i = 0; i < location.length; i++) { 
			AddPopupdata('Location', location[i])
		}
})
it('Add Cost Centre', function() {

		for (let i = 0; i < costCentre.length; i++) { 
			AddPopupdata('Cost Centre', costCentre[i])
		}
})
it('Add  branch', function() {
    
	// for (let i = 0; i < branch.length; i++) { 
	// 	AddPopupdata('branch', branch[i])
	// }
	//Add branch
	cy.get('#metadatatable').select('BRANCH')
	cy.get('.fa-plus').eq(0).click()
	cy.wait(1000)
	cy.get('#popupvalue').type('Thane')
	cy.get('#sbtBtn').click()
	cy.wait(1000)
	
})
it('Add  branch', function() {
  
	//Add branch
	cy.get('#metadatatable').select('BRANCH')
	cy.get('.fa-plus').eq(0).click()
	cy.wait(1000)
	cy.get('#popupvalue').type('Panvel')
	cy.get('#sbtBtn').click()
	cy.wait(1000)
	
})
*/
})
	
})