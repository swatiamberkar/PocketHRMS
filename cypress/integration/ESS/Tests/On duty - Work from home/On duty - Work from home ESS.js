

describe('On duty - Work from home ESS setting part ', function() {
    var Admin = 'L1'
	var managerID = 'L2'
	var employeeID = 'L6'

	var leaveFromDate = '14/11/2022'
	//var leaveToDate = currentDate
	var leaveToDate = '14/11/2022'

	var leave = 'Paid Leave'

	beforeEach(function () {
		cy.getCookies()
		cy.getCookies_ESS()

	})

    it(' ESS login page',function(){

        cy.EssLogin(employeeID, employeeID)
		cy.visit(Cypress.env('essUrl')+'Leave/Transaction/LeaveRequest?Menu=leave')
        cy.wait(2000)
    })

    it(' Nevigate On duty - Work from home page',function(){
        //click on On duty - Work from home  tab
        cy.get('#OnDutyDetail').click()
        cy.wait(2000)
        
    })

    it(' Verify validation message - Please Select Start On Duty Date.',function(){

        //click on save button 
        cy.get('#btnSave').click()
        //verify validation message 
        cy.get(".noty_body").invoke('text').then((text) => {
			expect(text.trim()).equal('Please Select Start On Duty Date.')
		})
		cy.wait(1000)
		//click on message to close message box
		cy.get(".noty_body").click()
        cy.wait(3000)

    })

    it(' Verify validation message - Please Select End On Duty Date.',function(){
        //Enter start date
        cy.get('#dtStartEntry').click().then(input =>
            { input[0].dispatchEvent(new Event('input', {
            bubbles: true }))
            input.val('16/11/2022')
        })
        cy.wait(2000)
        cy.xpath("//div[contains(text(),'In Time')]").click()
         //click on save button 
         cy.get('#btnSave').click()
         //verify validation message 
         cy.get(".noty_body").invoke('text').then((text) => {
             expect(text.trim()).equal('Please Select End On Duty Date.')
         })
         cy.wait(1000)
         //click on message to close message box
         cy.get(".noty_body").click()
         cy.wait(3000)

    })

    it(' Verify validation message - Please Select Type',function(){
        //Enter start date
        cy.get('#dtEndEntry').click().then(input =>
            { input[0].dispatchEvent(new Event('input', {
            bubbles: true }))
            input.val('17/11/2022')
        })
        cy.wait(2000)
        cy.xpath("//div[contains(text(),'In Time')]").click()
         //click on save button 
         cy.get('#btnSave').click()
         //verify validation message 
         cy.get(".noty_body").invoke('text').then((text) => {
             expect(text.trim()).equal('Please Select Type.')
         })
         cy.wait(1000)
         //click on message to close message box
         cy.get(".noty_body").click()
         cy.wait(3000)

    })

    it(' Verify validation message - Please Select End On Duty Date.',function(){
        //select day type
        cy.get('#ddType').select('FULLDAY ONDUTY')
           //click on save button 
           cy.get('#btnSave').click()
           //verify validation message 
           cy.get(".noty_body").invoke('text').then((text) => {
               expect(text.trim()).equal('Please Select End On Duty Date.')
           })
           cy.wait(1000)
           //click on message to close message box
           cy.get(".noty_body").click()
           cy.wait(3000)
  

    })

    it(' Verify validation message - End Date can not be less than Start Date.',function(){
        //Enter start date
        cy.get('#dtEndEntry').click().then(input =>
            { input[0].dispatchEvent(new Event('input', {
            bubbles: true }))
            input.val('14/11/2022')
        })
        cy.wait(2000)
        cy.xpath("//div[contains(text(),'In Time')]").click()
         //click on save button 
         cy.get('#btnSave').click()
         //verify validation message 
         cy.get(".noty_body").invoke('text').then((text) => {
             expect(text.trim()).equal('End Date cannot be less than Start Date.')
         })
         cy.wait(1000)
         //click on message to close message box
         cy.get(".noty_body").click()
         cy.wait(3000)

    })

    it(' Verify validation message - Out Hours Should be less than or equal to 24',function(){
        //Enter End date
        cy.get('#dtEndEntry').click().then(input =>
            { input[0].dispatchEvent(new Event('input', {
            bubbles: true }))
            input.val('16/11/2022')
        })
        cy.wait(2000)
        cy.xpath("//div[contains(text(),'In Time')]").click()

        //enter out time 
        cy.get('#tmOutTimeHour').clear()
        cy.get('#tmOutTimeHour').type(25)

         //click on save button 
         cy.get('#btnSave').click()
         //verify validation message 
         cy.get(".noty_body").invoke('text').then((text) => {
             expect(text.trim()).equal('Out Hours Should be less than or equal to 24')
         })
         cy.wait(1000)
         //click on message to close message box
         cy.get(".noty_body").click()
         cy.wait(3000)

        
    })

    it(' Verify validation message - Out Time annot be less than In Time.',function(){

        //enter out time 
        cy.get('#tmOutTimeHour').clear()
        cy.get('#tmOutTimeHour').type(20)

        //enter In time 
        cy.get('#tmInTimeHour').clear()
        cy.get('#tmInTimeHour').type(23)

          //click on save button 
          cy.get('#btnSave').click()
          //verify validation message 
          cy.get(".noty_body").invoke('text').then((text) => {
              expect(text.trim()).equal('Out Time Cannot be less than In Time.')
          })
          cy.wait(1000)
          //click on message to close message box
          cy.get(".noty_body").click()
          cy.wait(3000)
    })

    it(' Verify Success message',function(){
        //enter out time 
        cy.get('#tmOutTimeHour').clear()
        cy.get('#tmOutTimeHour').type(17)

        //enter In time 
        cy.get('#tmInTimeHour').clear()
        cy.get('#tmInTimeHour').type(11)

         //click on save button 
         cy.get('#btnSave').click()
         //verify validation message 
         cy.get(".noty_body").invoke('text').then((text) => {
             expect(text.trim()).equal('Data Saved Successfully.! But there was some problem in sending the Mail to the Manager.')
         })
         cy.wait(1000)
         //click on message to close message box
         cy.get(".noty_body").click()
         cy.wait(3000)
    })
    
    it('verify validation message for duplicate record  ',function(){
        cy.reload()
        cy.wait(1000)
        //Enter start date
        cy.get('#dtStartEntry').click().then(input =>
            { input[0].dispatchEvent(new Event('input', {
            bubbles: true }))
            input.val('16/11/2022')
        })
        cy.xpath("//div[contains(text(),'In Time')]").click()

        //select day type
        cy.get('#ddType').select('FULLDAY ONDUTY')

        //Enter end Date
        cy.get('#dtEndEntry').click().then(input =>
            { input[0].dispatchEvent(new Event('input', {
            bubbles: true }))
            input.val('16/11/2022')
        })
        cy.xpath("//div[contains(text(),'In Time')]").click() 

         //click on save button 
         cy.get('#btnSave').click()
         //verify validation message 
         cy.get(".noty_body").invoke('text').then((text) => {
             expect(text.trim()).equal('Entry Date (16/11/2022) \nOn Duty is already applied for this date.!')
         })
         cy.wait(1000)
         //click on message to close message box
         cy.get(".noty_body").click()
         cy.wait(3000)

    })

    it('Add data in all fields',function(){
        cy.reload()
        cy.wait(1000)
        //Enter start date
        cy.get('#dtStartEntry').click().then(input =>
            { input[0].dispatchEvent(new Event('input', {
            bubbles: true }))
            input.val('18/11/2022')
        })
        cy.xpath("//div[contains(text(),'In Time')]").click()

        //select day type
        cy.get('#ddType').select('FULLDAY ONDUTY')

        //Enter end Date
        cy.get('#dtEndEntry').click().then(input =>
            { input[0].dispatchEvent(new Event('input', {
            bubbles: true }))
            input.val('18/11/2022')
        })
        cy.xpath("//div[contains(text(),'In Time')]").click() 

         //click on save button 
         cy.get('#btnSave').click()
         //verify validation message 
         cy.get(".noty_body").invoke('text').then((text) => {
             expect(text.trim()).equal('Data Saved Successfully.! But there was some problem in sending the Mail to the Manager.')
         })
         cy.wait(1000)
         //click on message to close message box
         cy.get(".noty_body").click()
         cy.wait(3000)

    })

    it('Verify added data',function(){
        //
        cy.get("#entryDate-").invoke('text').then((text) => {
            expect(text.trim()).to.contain('16/11/2022')
        })
        //
        cy.xpath("//td[contains(text(),'9:00')]").invoke('text').then((text) => {
            expect(text.trim()).to.contain('9:00')
        })
        //
        cy.xpath("//td[contains(text(),'17:00')]").invoke('text').then((text) => {
            expect(text.trim()).to.contain('17:00')
        })
         //
         cy.xpath("//span[contains(text(),'Full Day')]").invoke('text').then((text) => {
            expect(text.trim()).to.contain('Full Day')
        })

    })
/*
    it('Verify delete funcationality',function(){
        //delete record
        cy.xpath("//button[contains(text(),'Delete')]").eq(0).click({force:true})
        //cy.xpath("//button[contains(text(),'Delete')]").eq(0).click({force:true})

        //verify validation message 
        cy.get(".noty_body").invoke('text').then((text) => {
            expect(text.trim()).equal('Record deleted successfully.')
        })
        cy.wait(1000)
        //click on message to close message box
        cy.get(".noty_body").click()
        cy.wait(3000)


    })

    it('Verify delete funcationality',function(){
        //delete record
        cy.xpath("//button[contains(text(),'Delete')]").eq(0).click({force:true})

        //verify validation message 
        cy.get(".noty_body").invoke('text').then((text) => {
            expect(text.trim()).equal('Record deleted successfully.')
        })
        cy.wait(1000)
        //click on message to close message box
        cy.get(".noty_body").click()
        cy.wait(3000)


    })
*/
})