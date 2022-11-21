describe('Imcome Matching', function() {
	

    beforeEach(function(){
     cy.getCookies()
     })
     
 
 it('Login to Cloud & select Company', function() {
     cy.login()
     cy.changeCompany();		
 
 })
 

 it('Tax Settings CIT Address', function() {
    cy.visit('https://pockethrmsnext.azurewebsites.net/Settings/Employee/Index?module=incometax&submodule=citaddress')
    //click on CIT Address
    cy.get('#citAddress').click({force: true})
    cy.wait(2000)
    
    cy.get('#CITAddress').click({force: true})
    cy.get('#CITAddress').clear()
    cy.get('#CITAddress').type('mumbai');
        
    cy.get('#Address').click({force: true})
    cy.get('#Address').clear()
    cy.get('#Address').type('mumbai');
    
    cy.get('#City').click({force: true})
    cy.get('#City').clear()
    cy.get('#City').type('mumbai');
    
    cy.get('#PinCode').click({force: true})
    cy.get('#PinCode').clear()
    cy.get('#PinCode').type('761012');
    
    cy.wait(1000)
    cy.get('#btnSaveCITAddress').click({force: true})
    cy.wait(2000)
    cy.get(".toast-message").invoke('text').then((text) => {
            expect(text.trim()).equal('Record Save Successfully')
            cy.log(text.trim())
            cy.get(".toast-message").click({force: true})
    })
    
    cy.xpath("//div[@id='itaxContentTitle']//div[@class='col-4 text-left xheader-title']")
    .should('contain', 'CIT Address');		
})

it('Tax Settings Gratuity & Leave Encash', function() {
    //click on CIT Address
    cy.wait(1000)
    cy.get('#GratuityLeaveEncash').click({force: true})
    cy.wait(2000)
    
    cy.get('#AvgSal').click({force: true})
    cy.get('#AvgSal').clear()
    cy.get('#AvgSal').type('12');
        
    cy.get('#GratuityMax').click({force: true})
    cy.get('#GratuityMax').clear()
    cy.get('#GratuityMax').type('12');
    
    cy.get('#LeaveMax').click({force: true})
    cy.get('#LeaveMax').clear()
    cy.get('#LeaveMax').type('12');
    cy.wait(1000)
    cy.get('#btnSaveGratuityAndLeaveEncash').click({force: true})
    
    cy.wait(2000)
    cy.get(".toast-message").invoke('text').then((text) => {
            expect(text.trim()).equal('Record Saved Successfully !')
            cy.log(text.trim())
            cy.get(".toast-message").click({force: true})
    })
    
    cy.xpath("//div[@id='itaxContentTitle']//div[@class='col-4 text-left xheader-title']")
    .should('contain', 'Gratuity & Leave Encash');		
    
})	


 
 })
 