

describe('Self service role', function () {

	var Admin = 'CY1'
	var managerID = 'CY2'
	var employeeID = 'CY3'

	var leave = 'Paid Leave'
	var leave = 'Paid Leave'

	beforeEach(function () {
		cy.getCookies()
	})
	it('Login to Cloud & select Company', function() {
		cy.login()
		cy.changeCompany();
	})

	
it('Apply self service role for CY1',function(){
	cy.navigate_EmployeeProfile(Admin)	
		cy.wait(2000)
		cy.get('#profile_detail_tab').click()
		cy.wait(1000)
		cy.get('#Profile_SelfServiceRole').click()
		cy.wait(1000)
		cy.get('[name="SelfServiceRole"]').select('Admin')
		cy.get('[value="Save"]').click()
		cy.wait(2000)
})
it('Apply self service role for CY2',function(){
	cy.navigate_EmployeeProfile(managerID)
	cy.wait(2000)
	cy.get('#profile_detail_tab').click()
	cy.wait(1000)
	cy.get('#Profile_SelfServiceRole').click()
	cy.wait(1000)
	cy.get('[name="SelfServiceRole"]').select('Manager')
	cy.get('[value="Save"]').click()
	cy.wait(2000)
})
it('Apply self service role for CY3',function(){
	cy.navigate_EmployeeProfile(employeeID)
	 cy.wait(2000)
	 cy.get('#profile_detail_tab').click()
	 cy.wait(1000)
	 cy.get('#Profile_SelfServiceRole').click()
	 cy.wait(1000)
	 cy.get('[name="SelfServiceRole"]').select('User')
	 cy.get('[value="Save"]').click()
	 cy.wait(2000)
})

    
it (' Set generate password settings for all employee',() => {
    cy.visit(Cypress.env('url')+'Settings/Employee/Index?module=hr&submodule=GeneratePassword') 
    cy.xpath("//label[contains(text(),'Category')]").click()
    cy.wait(2000)
    cy.get('#OverWriteRad').click({force:true})
    cy.wait(2000)
    cy.get('[name="PayslipPassword"]').eq(2).click({force:true})
    cy.wait(2000)
    cy.get('#savesetting').click()
    cy.wait(2000)
    cy.get(".alert-warning").invoke('text').then((text) => {
    cy.log(text.trim())	
    expect(text.trim()).contains('Generate Password will get processed in background.')
	cy.wait(2000)             
    })
	cy.wait(50000)
	//cy.wait('@GetBackGroundProcess').its('status').should('eq', 200)

	//
	cy.reload()
	cy.wait(2000)
	cy.get('.dripicons-bell').click()

	cy.get(".notification-listmenu a p").eq(0).invoke('text').then((text) => {
		cy.log(text.trim())	
		expect(text.trim()).contains('Generate Password done successfully.')
		//cy.get(".toast-message").click()
	})
	
})  


it ('can add role alocation for leave - Manager ',() => {
	cy.get('#globalSearch').type('role allocation')
	cy.xpath("//li[contains(text(),'Role Allocation')]").click()
	cy.wait(2000)
	cy.get('#drpModule').select('Leave')
	cy.wait(1000)
	cy.get('#drpRole').select('Manager')
	cy.wait(1000)
	cy.xpath("//button[contains(text(),'Search')]").click()
	cy.wait(1000)
	cy.get('[class="chk menu"]').eq(0).click()
	cy.get('[class="chk menu"]').eq(1).click()
	cy.get('[class="chk menu"]').eq(2).click()
	cy.get('[class="chk menu"]').eq(3).click()
	cy.get('[class="chk menu"]').eq(4).click()
	cy.wait(1000)
	//click on save button
    cy.get('#savedata').click()
	//verify success message 
    cy.get(".toast-message").invoke('text').then((text) => {
		expect(text.trim()).equal('Setting Save successfully')
		})
		//click on message to close message box
		cy.get(".toast-message").click()
		cy.wait(1000)
})
it ('can add role alocation for leave - user ',() => {
	//cy.get('#globalSearch').type('role allocation')
	//cy.xpath("//li[contains(text(),'Role Allocation')]").click()
	cy.wait(2000)
	cy.get('#drpModule').select('Leave')
	cy.wait(1000)
	cy.get('#drpRole').select('User')
	cy.wait(1000)
	cy.xpath("//button[contains(text(),'Search')]").click()
	cy.wait(1000)
	cy.get('[class="chk menu"]').eq(0).click()
	cy.get('[class="chk menu"]').eq(1).click()
	cy.get('[class="chk menu"]').eq(2).click()
	cy.get('[class="chk menu"]').eq(3).click()
	cy.get('[class="chk menu"]').eq(4).click()
	cy.wait(1000)
	//click on save button
    cy.get('#savedata').click()
	//verify success message 
    cy.get(".toast-message").invoke('text').then((text) => {
		expect(text.trim()).equal('Setting Save successfully')
		})
		//click on message to close message box
		cy.get(".toast-message").click()
		cy.wait(1000)
})
it ('can add role alocation for Profile - user ',() => {
	//cy.get('#globalSearch').type('role allocation')
	//cy.xpath("//li[contains(text(),'Role Allocation')]").click()
	cy.wait(2000)
	cy.get('#drpModule').select('Profile')
	cy.get('#drpRole').select('User')
	cy.wait(1000)
	cy.xpath("//button[contains(text(),'Search')]").click()
	cy.wait(1000)
	cy.get('[class="chk menu"]').eq(0).click()
	cy.get('[class="chk menu"]').eq(1).click()
	cy.get('[class="chk menu"]').eq(2).click()
	cy.get('[class="chk menu"]').eq(3).click()
	cy.get('[class="chk menu"]').eq(4).click()
	cy.wait(1000)
	//click on save button
    cy.get('#savedata').click()
	//verify success message 
    cy.get(".toast-message").invoke('text').then((text) => {
		expect(text.trim()).equal('Setting Save successfully')
		})
		//click on message to close message box
		cy.get(".toast-message").click()
		cy.wait(1000)
})
it ('can add role alocation for Profile - Manager ',() => {
	//cy.get('#globalSearch').type('role allocation')
	//cy.xpath("//li[contains(text(),'Role Allocation')]").click()
	cy.wait(2000)
	cy.get('#drpModule').select('Profile')
	cy.get('#drpRole').select('Manager')
	cy.wait(1000)
	cy.xpath("//button[contains(text(),'Search')]").click()
	cy.wait(1000)
	cy.get('[class="chk menu"]').eq(0).click()
	cy.get('[class="chk menu"]').eq(1).click()
	cy.get('[class="chk menu"]').eq(2).click()
	cy.get('[class="chk menu"]').eq(3).click()
	cy.get('[class="chk menu"]').eq(4).click()
	cy.wait(1000)
	//click on save button
    cy.get('#savedata').click()
	//verify success message 
    cy.get(".toast-message").invoke('text').then((text) => {
		expect(text.trim()).equal('Setting Save successfully')
		})
		//click on message to close message box
		cy.get(".toast-message").click()
		cy.wait(1000)
})


it ('Set Manager Eligibility details ',() => {
	cy.get('#globalSearch').type('manager eligibility')
	cy.xpath("//li[contains(text(),'Manager Eligibility')]").click()
	cy.wait(2000)
	cy.get('[value="Manager"]').click()
	cy.get('[value="User"]').click()
	cy.get('#btnSave').click()
})

it ('Assign Manager from Approval Matrix ',() => {

	cy.navigate_EmployeeProfile(employeeID)	
	cy.wait(2000)
	cy.get('#approval_matrix_tab').click({force:true})
	cy.wait(2000)
	cy.get('[title="Add Approval Matrix Manager"]').eq(0).click({force: true})
	cy.wait(2000)
		cy.get('#select2-approvalManager-container').click({force: true})
		cy.wait(2000)
		cy.get('input[type="search"]').click({force: true})
		cy.get('input[type="search"]').type(managerID)
		cy.wait(2000)
		cy.get('.select2-results__option--highlighted').click({force: true})
		cy.wait(2000)
	cy.get('#approvalmust').select('Yes')
	cy.get('#cancelrights').select('Yes')
	//cy.xpath("//label[contains(text(),'Daily Working Hours')]").click()
	cy.get('#Leave').click({force: true})
	//cy.xpath("//label[contains(text(),'On Duty')]").click()
	cy.get('#btnSaveText').click()
	cy.wait(2000)

})


it ('Add Leave Balance ',() => {

	//cy.navigate_EmployeeProfile(employeeID)	
	cy.wait(2000)
	cy.get('#leave_detail_tab').click({force:true});
		cy.wait(2000)
		
		cy.get('#Leave_LeaveEntry').click({force:true})
		cy.wait(3000)

		const { softAssert, softExpect } = chai;
		
	//cy.navigate_EmployeeLeave()	
	

		cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").each(function(row, i){	
		var num = parseFloat(i+1)
		cy.log("num: "+num)
		
		cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").eq(i).invoke('text').then((text) => {	
		cy.log("text: "+text)
			if(text.trim()==leave){
				expect(text).to.eq(leave)
		
	
		cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[5]/th[2]").eq(i).invoke('text').then((availableLeave) => {	
		cy.log("availableLeave: "+availableLeave)
		
		cy.log("i: "+i)
			if(availableLeave.trim() =='0'){
			cy.get(':nth-child(2) > .card > .card-body > .float-right > a > .fas').click()

			//cy.get('.fa-ellipsis-v').eq(i-1).click()
			
			cy.get('#LeaveOpen').click({force: true})
			cy.get('#LeaveOpen').clear()
			cy.get('#LeaveOpen').type('10');
			
			cy.get('#saveloader').click({force: true})
			cy.wait(8000)	
			}

		})
	}
	})
})

})

})