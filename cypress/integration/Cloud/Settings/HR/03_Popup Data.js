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
it ('can select settings',() => {
    //click on left upper side 3 lines to open all tabs
    cy.get('.dripicons-menu').click()
    cy.wait(2000)
    //click on setting tab
    cy.get('[src="/assets/images/icons/4.png"]').eq(0).click()
    //cy.contains('Settings').click({force:true})
    //cy.xpath('//body[1]/div[2]/div[1]/div[1]/nav[1]/a[8]/table[1]/tbody[1]/tr[1]/td[1]/img[1]').click()

    cy.get('[class="col-md-5"]').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('Settings')
    })
    cy.wait(1000)
    //cick on HR tab
    cy.get('[class="top-nav hr"]').click()

    cy.get('[class="col-3 text-left xheader-title"]').invoke('text').then((text) => {
        expect(text.trim()).equal('HR')
    }) 
})

context ('Verify  Pop Up Data tab',() => {
it ('can verify  Pop Up Data  tab is working or not',() => { 
        //click on  Pop Up Data tab
        cy.get('#HR_PopUpData').click()
        
        cy.get('[class="col-4 text-left xheader-title"]').eq(0).invoke('text').then((text) => {
            expect(text.trim()).equal('Pop-Up Detail')
        })  
})   
it ('can verify validation message for Select Component ',() => { 
        //click on add category
        cy.get('[class="fas fa-plus"]').eq(0).click()
        cy.get('.toast-message').invoke('text').then((text) => {
            expect(text.trim()).equal('Please Select Component')
        })
        //click on message to close message box
        cy.get(".toast-message").click() 
})
it ('can selct component ',() => { 
        cy.get('#metadatatable').select('Location')
        //cy.get('[value="LOCATION"]').click()
})
it ('can verify add pop- up data button is working or not',() => { 
        //click on add pop-up data
        cy.get('[class="fas fa-plus"]').eq(0).click()
        cy.get('#categoryModalLabel').invoke('text').then((text) => {
            expect(text.trim()).equal('PopUp Value For Location')
        }) 
})
})
context ('Verify validation message',() => {
it ('can verify validstion message for all text field',() => { 
        cy.get('#sbtBtn').click()
        cy.get('.toast-message').invoke('text').then((text) => {
            expect(text.trim()).equal('Please enter all fields.')
        }) 
        //click on message to close message box
        cy.get(".toast-message").click() 
        cy.wait(2000)
		//add value in text field
		cy.get('#popupvalue').type('delhi')
		 //click on save button
		 cy.get('#sbtBtn').click() 
         //verify success message  
        cy.get(".toast-message").invoke('text').then((text) => {
            expect(text.trim()).equal('Data Saved Successfully')
        })
        //click on message to close message box
        cy.get(".toast-message").click() 
        cy.wait(1000)
})
it ('can verify validstion message for providing invalid information',() => { 
	//
	cy.get('[class="fas fa-plus"]').eq(0).click({force:true})

	cy.get('#popupvalue').type('kd*&%$($)')
	cy.get('#sbtBtn').click()

	cy.get(".toast-message").invoke('text').then((text) => {
		expect(text.trim()).equal('Special  Character Not Allowed.')
	})
	 //click on message to close message box
	 cy.get(".toast-message").click() 
	 cy.wait(1000)

	 //click on cose button
	 cy.get('.btn-danger').click()

})
it ('can verify validtion message for dupicate record',() => { 
	//
	cy.get('[class="fas fa-plus"]').eq(0).click()

	cy.get('#popupvalue').type('delhi')
	cy.get('#sbtBtn').click()

	cy.get(".toast-message").invoke('text').then((text) => {
		expect(text.trim()).equal('Value Already Exists for the Selected Component.!')
	})
	 //click on message to close message box
	 cy.get(".toast-message").click() 
	 cy.wait(1000)

	 //click on cose button
	 cy.get('.btn-danger').click()
})
})
context ('Verify edit funcationality',() => {
it('update previous data with new data',() => {    
		//click on edit button
		cy.get('.fa-edit').eq(0).click({force:true})
		//edit value text field
		cy.get('#popupvalue').clear()
		cy.get('#popupvalue').type('Gujrat')
		//click on save button
		cy.get('[value="Update"]').click({force:true}) 
		 //verify success message  
		 cy.get(".toast-message").invoke('text').then((text) => {
			expect(text.trim()).equal('Data Saved Successfully')
		})
		//click on message to close message box
		cy.get(".toast-message").click() 
		cy.wait(1000)
})
it('can verify edited data',() => {
	
		cy.contains("Gujrat").invoke('text').then((text) => {
			expect(text.trim()).to.contain('Gujrat')
		   })
	
})
})
context ('can delete record',() => {
it('can delete record', () => { 

		DeleteRecord('location-Gujrat') 
		cy.wait(1000)
	
})     
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
    /*
	for (let i = 0; i < branch.length; i++) { 
		AddPopupdata('branch', branch[i])
	}*/
	//Add branch
	cy.get('#metadatatable').select('BRANCH')
	cy.get('.fa-plus').eq(0).click()
	cy.wait(1000)
	cy.get('#popupvalue').type('Thane')
	cy.get('#sbtBtn').click()
	cy.wait(1000)
	
})
it('Add  branch', function() {
    /*
	for (let i = 0; i < branch.length; i++) { 
		AddPopupdata('branch', branch[i])
	}*/
	//Add branch
	cy.get('#metadatatable').select('BRANCH')
	cy.get('.fa-plus').eq(0).click()
	cy.wait(1000)
	cy.get('#popupvalue').type('Panvel')
	cy.get('#sbtBtn').click()
	cy.wait(1000)
	
})
})
	
})