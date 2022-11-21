describe('11_Approval Matrix Import', function() {
	

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


it('Financial Year Setting', function() {
    //click on finical year tab
    cy.get('#IncomeTax_FinancialYear').click({force: true})
    
    cy.wait(3000)
    cy.get('span').then(($sp) => {
    if ($sp.hasClass('mb-1')) {
    cy.xpath("//span[@class='btn buttons-bg-color btn-facebook mb-1']").click();
    } else {
    cy.xpath("//div[@id='itaxContentTitle']//i[@class='fas fa-plus']").click();
    }
    })
    
    //cy.get('[title="Add new financial year"]').eq(0).click({force: true})
    cy.wait(2000)
    cy.get('#txtSDate').then(input => {
        input.val('01/04/'+Cypress.env('FinancialYear_From'));
   })
    cy.wait(2000)
    cy.get('#txtEDate').click().then(input => {
        input[0].dispatchEvent(new Event('input', { bubbles: true }))
        input.val('31/03/'+Cypress.env('FinancialYear_To'))
   })
   
   cy.get('#txtTanNo').click({force: true})
   cy.get('#txtTanNo').clear()
   cy.get('#txtTanNo').type('1234567');
    
    cy.get('#txtTDSCircle').click({force: true})
    cy.get('#txtTDSCircle').clear()
    cy.get('#txtTDSCircle').type('Mumbai');
    
    cy.get('#txtPanNo').click({force: true})
    cy.get('#txtPanNo').clear()
    cy.get('#txtPanNo').type('ARMFJ34H');
    
    cy.get('#txtTDSAccNo').click({force: true})
    cy.get('#txtTDSAccNo').clear()
    cy.get('#txtTDSAccNo').type('5485346788');
    
    //cy.get('#select2-multiEmp-container').click({force: true})
    //cy.wait(2000)
    //cy.get('input[type="search"]').click({force: true})
    //cy.get('input[type="search"]').type(employeeCode)
    //cy.get('input[type="search"]').type('ARMFJ34H')
    //cy.wait(2000)
    //cy.get('.select2-results__option--highlighted').click({force: true})
    
    
    cy.get('#txtPlace').click({force: true})
    cy.get('#txtPlace').type('Ulhasnagar');
    
    cy.get('#txtEduCess').click({force: true})
    cy.get('#txtEduCess').type('4');
    
    cy.get('#txtHRARent').click({force: true})
    cy.get('#txtHRARent').clear()
    cy.get('#txtHRARent').type('10');
    
    cy.get('#txtMetroPercent').click({force: true})
    cy.get('#txtMetroPercent').clear()
    cy.get('#txtMetroPercent').type('50');
    
    cy.get('#txtNonMetroPercent').click({force: true})
    cy.get('#txtNonMetroPercent').clear()
    cy.get('#txtNonMetroPercent').type('40');
    
    //cy.get('[type="checkbox"]').check('EB',{force: true})
    cy.wait(1000)
    cy.get('#chkDefault').check({force: true})
    
    cy.wait(2000)
    cy.get('#btnSaveFinSet').click({force: true})
    cy.wait(5000)
})


})
