describe('05_Basic Details', function() {
	
    var leaveTypeValue = 'SL'

   beforeEach(function(){
	cy.getCookies()
	})
	
it('Login to Cloud & select Company', function() {
	cy.login()
	cy.changeCompany();		
})

it('Set financial year',function() {	
    cy.visit(Cypress.env('url')+'Settings/Employee/Index?module=organization&submodule=smtpsettings')
    cy.wait(1000)
    cy.get('#leave_detail_tab').click({force:true})
    cy.wait(1000)
    cy.get('#Leave_DefineCalendar').click({force:true})
    cy.wait(2000)
    cy.xpath("//div[@id='leaveContentTitle']//i[@class='fas fa-plus']").click({force: true})
    cy.wait(1000)
    cy.get('input[name="start"]').click().then(input => {
        input[0].dispatchEvent(new Event('input', { bubbles: true }))
        input.val('01/04/'+Cypress.env('FinancialYear_From'))
    })
    cy.get('input[name="end"]').click().then(input => {
        input[0].dispatchEvent(new Event('input', { bubbles: true }))
        input.val('31/03/'+Cypress.env('FinancialYear_To'))
    })
    cy.get('#drpDefault').select('Yes',{force: true})
    cy.get('#ddComponent').select('COMPCODE')
    cy.get('#ddHoli').select('COMPCODE')
    cy.get('#ddLeaveCredit').select('CATEGORY')
    cy.get('#ddWeekOff').select('COMPCODE')
    cy.get('#ddCompOff').select('COMPCODE')
    cy.get('#btnSaveFinSet').click( {force: true})
    cy.wait(3000)
    cy.get(".toast-message").invoke('text').then((text) => {
    cy.log(text.trim())		
        expect(text.trim()).equal('Records Saved Successfully!!!')			
    })
})

it('Add Leave - PL', function() {
    cy.visit(Cypress.env('url')+'Settings/Employee/Index?module=organization&submodule=smtpsettings')
    cy.wait(1000)
    cy.get('#leave_detail_tab').click({force:true})
    cy.wait(1000)
        
        cy.server()	
        cy.wait(2000)
        cy.get('#Leave_LeaveDefinition').click( {force: true})
        cy.wait(10000)
        cy.route('POST', Cypress.env('url')+'Leave/Setting/LeaveDefinitions').as('LeaveDefinitions')
        cy.wait(4000)
        cy.get('#leaveContentTitle > .row > .col-8 > [title="Add Leave Definition"] > .fas').click({force: true})
       //  cy.get('[title="Add Leave Defination"]').eq(0).click({force: true})
        cy.wait(3000)
        cy.get('#leavName').type('PL')
        cy.get('#leavDesc').type('Paid Leave')
        cy.get('#leavCategory').select('EL')
        cy.get('#leavOpen').select('REQUIRED',{force:true})
        cy.wait(2000)
        cy.get('#crRounding').select('NIL',{force:true})
        cy.wait(1000)
        cy.get('#leaveType').select('Day Wise',{force: true})
        cy.get('#catall').check({force:true})
        cy.get('#btnLeaveDefinationSave').click({force:true})
        cy.wait(1000)
        cy.wait('@LeaveDefinitions').its('status').should('eq', 200)
        cy.get(".toast-message").invoke('text').then((text) => {
            expect(text.trim()).equal('Records Saved Successfully!!!')		
        })
    cy.get(".toast-message").click({force:true})

})

it('Add Leave - Sick Leave', function() {
    cy.visit(Cypress.env('url')+'Settings/Employee/Index?module=organization&submodule=smtpsettings')
    cy.wait(1000)
    cy.get('#leave_detail_tab').click({force:true})
    cy.wait(1000)
    
        cy.server()	
        cy.wait(2000)
        cy.get('#Leave_LeaveDefinition').click( {force: true})
        cy.route('POST', Cypress.env('url')+'Leave/Setting/LeaveDefinitions').as('LeaveDefinitions')
        cy.wait(2000)
        cy.get('#leaveContentTitle > .row > .col-8 > [title="Add Leave Definition"] > .fas').click({force: true})
        //cy.get('[title="Add Leave Defination"]').eq(0).click({force: true})
        cy.wait(2000)
        cy.get('#leavName').type('SL')
        cy.get('#leavDesc').type('Sick Leave')
        cy.get('#leavCategory').select('SL')
        cy.get('#leavOpen').select('REQUIRED',{force:true})
        cy.wait(2000)
        //cy.get('#crRounding').select('NIL',{force:true})
        cy.wait(1000)
        cy.get('#reliverR').select('Y',{force:true})
        cy.get('#leaveType').select('Day Wise',{force: true})
        cy.get('#catall').check({force:true})
        cy.get('#btnLeaveDefinationSave').click({force:true})
        cy.wait(1000)
        cy.wait('@LeaveDefinitions').its('status').should('eq', 200)
        cy.get(".toast-message").invoke('text').then((text) => {
            expect(text.trim()).equal('Records Saved Successfully!!!')		
        })
    cy.get(".toast-message").click({force:true})

})

/*
it('Add releiver ', () => {
   
    cy.visit(Cypress.env('url')+'Settings/Employee/Index?module=organization&submodule=smtpsettings')
    cy.wait(1000)
    cy.get('#leave_detail_tab').click({force:true})
    cy.wait(1000)
        cy.server()
        cy.wait(2000)
        cy.get('#Leave_LeaveDefinition').click( {force: true})
        cy.wait(10000)
        cy.route('POST', Cypress.env('url')+'Leave/Setting/LeaveDefinitions').as('LeaveDefinitions')
        cy.wait(4000)
        cy.get('.media-body>u>h4').each(function(row, i){
            var num = parseFloat(i)
            cy.get('.media-body>u>h4').eq(num).invoke('text').then((text) => {
                if (text.trim() == leaveTypeValue)
                {
                    cy.get('.fa-edit').eq(num).click( {force: true})
                    cy.wait(2000)
                    cy.get('#reliverR').select('Y',{force:true})
                    cy.wait(2000)
                    cy.get('#btnLeaveDefinationUpdate').click({force:true})
        cy.wait(1000)
                    cy.wait('@LeaveDefinitions').its('status').should('eq', 200)
                    cy.get(".toast-message").invoke('text').then((text) => {
                        expect(text.trim()).equal('Records Saved Successfully!!!')
                    })
                cy.get(".toast-message").click({force:true})
                }
                })
            })


})
*/

}) 