describe('01_Company Profile', function() {

	function Randomcomapnyname(length) {
	   var result           = '';
	   var characters       = '0123456789';
	   var charactersLength = characters.length;
	   for (var i = 0; i < length; i++ ) {
		  result += characters.charAt(Math.floor(Math.random() * charactersLength));
	   }
	   return  'Test_'+result;
	}
	
	function companycode(length) { 
		   var result  = '';
		   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		   var charactersLength = characters.length;
		   for ( var i = 0; i < length; i++ ) {
			  result += characters.charAt(Math.floor(Math.random() * charactersLength));
		   }
		   return result;
	}
	
	beforeEach(function(){
        cy.getCookies()
	})

	it('Login to Cloud', function() {
		cy.login()
	})
	
	it('Add Company', function() {
		cy.server()
		  
		cy.route('POST', Cypress.env('url')+'Admin/Company/Index').as('companycreate')
		  
		cy.visit(Cypress.env('url')+'Settings/Employee/Index?module=organization&submodule=companyprofile')
		
		cy.get('[title="Add New Company"]').eq(0).click({force: true})
		  
		var companyText=Randomcomapnyname(5);
		var SelfservicecodeText=companycode(5);
		cy.writeFile('cypress/fixtures/Company.json', [{"comapnayname":companyText,"comapnaycode":SelfservicecodeText}])
			  
		cy.get('#txtname').type(companyText) 
		cy.get('#txtcompanycode').type(SelfservicecodeText)
		
		cy.get('#txtaddress').type('Turbhe Navi mumbai')
		cy.get('#txttelephone').type('022-247171')
		cy.get('#txtcity').type('Turbhe')
		cy.get('#txtstate').select('Maharashtra')
		cy.get('#txtpincode').type('421501')
		 
		cy.get('#SubmitBtn').click({force:true})
		cy.wait('@companycreate').its('status').should('eq', 200) 
		cy.wait(5000)


	}) 
		
	it('Verify added Company details', function() {
		cy.readFile('cypress/fixtures/Company.json').then((text) =>{
			//D:/CypressPocketHRMS/cypress/fixtures
		text.forEach(function(entry) {	
		var company = entry.comapnayname	
		var companyCode = entry.comapnaycode	
		cy.server()
		  
		cy.route('POST', Cypress.env('url')+'Admin/Company/Index').as('companycreate')
		  
		cy.visit(Cypress.env('url')+'Settings/Employee/Index?module=organization&submodule=companyprofile')
		
			cy.xpath("//h5[contains(@id, 'Name')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain(company)
			})

			cy.xpath("//p[contains(@title, 'Company Code')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain(companyCode)
			})

			cy.xpath("//span[contains(@id, 'Address')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain('Turbhe Navi mumbai')
			})

			cy.xpath("//span[contains(@id, 'City')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain('Turbhe - 421501')
			})
			
			cy.xpath("//span[contains(@id, 'State')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain('Maharashtra')
			})

			cy.xpath("//span[contains(@id, 'Telephone')]").invoke('text').then((text) => {
			expect(text.trim()).to.contain('022-247171')

			})

		})
	}) 
	})


})