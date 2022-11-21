describe('Attendance regularisation ESS setting part ', function() {
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
    it(' Nevigate attendance regularisation page',function(){
        //click on attendance regularisation tab
        cy.get('#AttendanceRegularizationDetail').click()
        cy.wait(2000)

        //select start date
        cy.get('#StartDate').click().then(input =>
            { input[0].dispatchEvent(new Event('input', {
            bubbles: true }))
            input.val('01/10/2022')
            })

        //select end date
        cy.get('#EndDate').click().then(input =>
            { input[0].dispatchEvent(new Event('input', {
            bubbles: true }))
            input.val('30/10/2022')
            })

        //click on search button
        cy.get('#searchbtnAttRegu').click()
        
        cy.wait(3000)
        //click on update button
        cy.xpath('//tbody/tr[1]/td[8]/button[1]').eq(0).click()
        cy.wait(1000)
        //
        cy.xpath("//h4[contains(text(),'Attendance Regularization Update')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain('Attendance Regularization Update')
		})
    })

    it('verify validation message - Please enter Out time.!',function(){
        //click on save buton
        cy.get('#btnsv').click()

        //verify validation message 
		cy.get(".noty_body").invoke('text').then((text) => {
			expect(text.trim()).equal('Please enter Out time.!')
		})
		cy.wait(1000)
		//click on message to close message box
		cy.get(".noty_body").click()
        cy.wait(3000)

    })

    it('verify validation message - Out time must be greater than in time',function(){
        
        cy.get('#txtOutTimeHour').clear()    
        cy.get('#txtOutTimeHour').type('06') 
        
        //
        cy.get('#txtOutTimeMin').clear()
        cy.get('#txtOutTimeMin').type('25')
        

        //click on save buton
        cy.get('#btnsv').click()

        //verify validation message 
		cy.get(".noty_body").invoke('text').then((text) => {
			expect(text.trim()).equal('Out time must be greater than In time')
		})
		cy.wait(1000)
		//click on message to close message box
		cy.get(".noty_body").click()

    })
    it('verify validation message - Please Enter In Date less than Out Date',function(){
         //Enter date
         cy.get('#Out_Date').click().then(input =>
            { input[0].dispatchEvent(new Event('input', {
            bubbles: true }))
            input.val('28/09/2022')
            })
            cy.wait(3000)
            //click on save buton
        cy.get('#btnsv').click()

        //verify validation message 
		cy.get(".noty_body").invoke('text').then((text) => {
			expect(text.trim()).equal('Please Enter In Date less than Out Date')
		})
		cy.wait(1000)
		//click on message to close message box
		cy.get(".noty_body").click()


         //Enter date
         cy.get('#Out_Date').click().then(input =>
            { input[0].dispatchEvent(new Event('input', {
            bubbles: true }))
            input.val('01/10/2022')
            })
        cy.xpath("//td[contains(text(),'In Date')]").click()

    })

    it('verify validation message - Please Enter Remarks',function(){

        cy.get('#txtOutTimeHour').clear()    
        cy.get('#txtOutTimeHour').type('16') 
        //
        cy.get('#txtInTimeMin').clear()
        cy.get('#txtInTimeMin').type('25')

        //click on save buton
        cy.get('#btnsv').click()

        //verify validation message 
		cy.get(".noty_body").invoke('text').then((text) => {
			expect(text.trim()).equal('Please Enter Remarks')
		})
		cy.wait(1000)
		//click on message to close message box
		cy.get(".noty_body").click()

    })
    it('verify Success message ',function(){
        //
        cy.get('#remarks').clear()
        cy.get('#remarks').type('Approved')
        //click on save buton
        cy.get('#btnsv').click()

        //verify validation message 
		cy.get(".noty_body").invoke('text').then((text) => {
			expect(text.trim()).equal('Records Saved Successfully')
		})
		cy.wait(1000)
		//click on message to close message box
		cy.get(".noty_body").click()


    })
})