

describe('11_Approval Matrix Import', function() {
	

    beforeEach(function(){
         cy.getCookies()
         })
         
     
     it('Login to Cloud & select Company', function() {
         cy.login()
         cy.changeCompany();		
     
     })
     
     it('Set Tax Calculation', function() {
         cy.visit('https://pockethrmsnext.azurewebsites.net/Settings/Employee/Index?module=incometax&submodule=otherincomehead');

         cy.get('#itaxContentTitle > .row > .col-8 > #lnkAddNew > .fas').click();
         cy.get('#txtDesc').clear();
         cy.get('#txtDesc').type('Testing');
         cy.get('#drpIncType').select('Add Income');
         cy.get('#drpWebPost').select('true');
         cy.get('#txtFinLimit').clear();
         cy.get('#txtFinLimit').type('1000');
         cy.get('#btnSaveOtherIncomeHeads').click();
         cy.get('.toast-message').should('have.text', 'Save Successfully..!');
        
     })
    
     
     
     })
     