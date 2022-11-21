describe('Imcome Matching', function() {
	

    beforeEach(function(){
     cy.getCookies()
     })
     
 
 it('Login to Cloud & select Company', function() {
     cy.login()
     cy.changeCompany();		
 
 })
 
 it('Navigate to Income Tax Setting', function() {
     cy.wait(1000)
     cy.server()
     cy.route('GET', '*').as('getComment')
     cy.route('POST', '*').as('postComment')		
     //cy.xpath("//span[@class='menu-name'][contains(text(),'Settings')]").click({force: true})	
     cy.visit(Cypress.env('url')+'Settings/Employee/Index?module=organization&submodule=smtpsettings')		
     cy.wait('@getComment').its('status').should('eq', 200)
     cy.wait('@postComment')
     cy.get('#incometax_detail_tab').click({force: true})	
     cy.get('#incometax_detail_tab').click({force: true})		
     cy.wait(1000)		
 })
 
 
 it('Income Matching for Earnings fields', function() {
    //click on Income Matching tab
    cy.xpath("//ul[@class='xactivity list-group list-group-flush']/li[5]/label[1]/span[1]").click({force: true})
    cy.wait(2000);
    //click on sub menu
    cy.get('#incomeMatch').click({force: true})
    
    cy.wait(2000)
    
     cy.readFile('cypress/fixtures/IncomeTax/ITAX.json').then((text) =>{
             text.forEach(function(entry) {	
             
    var field = entry.Earnings
    cy.log('field '+ field)		
    cy.wait(500)	
    
    
    cy.get('#tableSorter > tbody').find('tr').each(function(row, i){
        //if(i!=0){
        console.log(i)
        var num1 = parseFloat(i)+1
    
         cy.get('.table-responsive > #tableSorter > tbody > .trData:nth-child('+num1+') > td:nth-child(2)').invoke('text').then((text) => {
            cy.log(text.trim())
            
            if(text.trim()==field){
                cy.get('#tableSorter > tbody > .trData:nth-child('+num1+') > td > .btn').click({force: true})
                cy.wait(2000)
            
            cy.get('#drpMatching').select(entry.MatchingComponent,{force: true})
            cy.get('#drpExemption').select(entry.ExemptionComponent,{force: true})
            cy.get('#drpProjection').select(entry.Projection,{force: true})
            cy.get('#drpGrossSection').select(entry.GrossSection,{force: true})
        
            cy.get('#txtFormula').click({force: true})
            cy.get('#txtFormula').clear()
            cy.get('#txtFormula').type(entry.OtherComponents);
            
            cy.get('#txtOrder').click({force: true})
            cy.get('#txtOrder').clear()
            cy.get('#txtOrder').type(entry.OrderNo);
            
            cy.get('#drpOperator').select(entry.Operator,{force: true})
            
            cy.wait(1000)
            
            cy.get('#btnSaveIncomeMatching').click({force: true})
            cy.wait(2000)
            cy.get(".toast-message").invoke('text').then((text) => {
            cy.log(text.trim())
            expect(text.trim()).equal('Record Saved successfully !')
            
    })
                
            }
        })
    
        //}
        
    })
             })
     })

})	

 
 })
 