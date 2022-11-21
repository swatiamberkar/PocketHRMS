

describe('11_Approval Matrix Import', function() {
	

    beforeEach(function(){
     cy.getCookies()
     })
     
 
 it('Login to Cloud & select Company', function() {
     cy.login()
     cy.changeCompany();		
 
 })

 
 it('Set Professional tax', function() {
 cy.visit('https://pockethrmsnext.azurewebsites.net/Settings/Employee/Index?module=incometax&submodule=ProfessionalTax');
cy.get('#formProfessionalTax > .text-center').click();
cy.get('tr:nth-child(5) .normalLabel').click();
cy.get('#GRATUITY-click').click({force: true});
cy.get('#btnPTaxSave').click({force: true});


 })

 
 
 })
 