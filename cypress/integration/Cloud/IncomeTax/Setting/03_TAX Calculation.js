

describe('11_Approval Matrix Import', function() {
	

beforeEach(function(){
     cy.getCookies()
     })
     
 
 it('Login to Cloud & select Company', function() {
     cy.login()
     cy.changeCompany();		
 
 })
 
 it('Set Tax Calculation', function() {
     cy.visit('https://pockethrmsnext.azurewebsites.net/Settings/Employee/Index?module=incometax&submodule=taxcalculation');

     cy.get(':nth-child(1) > :nth-child(2) > #pfComp').select('Auto');
     cy.get('#btnSaveTaxCalculation').click();
     cy.get('#btnSaveTaxCalculation').click();
     cy.get('.toast-message').should('have.text', 'Record Saved Successfully !');
     /* ==== End Cypress Studio ==== */
 })

 
 
 })
 