describe('joining documents page', () =>{


/*
beforeEach(() => {
      
        window.console.log('Enter the beforeEach function')
        Cypress.on('uncaught:exception', (err,runnable) => {
                return false;   
        });

        //Cloud
        Cypress.Cookies.preserveOnce('.AspNetCore.Antiforgery.w5W7x28NAIs','1P_JAR','ARRAffinity','XName','XUserId','ai_session')

        //ESS
        Cypress.Cookies.preserveOnce('ASP.NET_SessionId', 'AvtarUrl', 'Category',
        'CompanyId', 'EmployeeId', 'EncryptedMenus', 'SchemaName', 'SelfServiceRole','__RequestVerificationToken',
        '__tawkuuid', '_gcl_au')

        //Asure
        Cypress.Cookies.preserveOnce( 'ARRAffinity', '.AspNetCore.Session','.AspNetCore.Antiforgery.w5W7x28NAIs')

        //New ESS
        Cypress.Cookies.preserveOnce('EnterPriseCompanies', '.AspNetCore.Antiforgery.9fXoN5jHCXs', 'IsEnterPrise','cloudUsername','.AspNetCore.Mvc.CookieTempDataProvider','XUserXpROLE','XUserXp','_ga_68GNHT5CK9','.AspNetCore.Antiforgery.w5W7x28NAIs','_gat_gtag_UA_159993745_1','XUserXpEmail','.AspNetCore.Antiforgery.mEZFPqlrlZ8','GetLicenseData','AI_buffer','dataWizardtblData','module','.AspNetCore.Antiforgery.mEZFPqlrlZ8','.AspNetCore.Antiforgery.mEZFPqlrlZ8','__cypress.initial','1P_JAR','ARRAffinity','FavouriteMenus','XCategory','XCompanyId','XSchemaName','XUserName','_ga','_gid','ai_user','new_username','GetLicenseData')

})
it('can visit login page', () => {    
    cy.visit('https://pockethrmsnext.azurewebsites.net/')
    //cy.visit('https://cloud.pockethrms.com/')   
})
it('can add username and password', () => {
    //enter email id
    cy.get('#Email').type('nileshgajare@live.com')
    //enter password
    cy.get('#Password').type('123456')
    //click on submit button
    cy.get('[type="submit"]').click()
})
it ('can select company',() =>{
    //click on right side to select company 
    cy.get('.breadcrumb-item').click()
    //click on company name radio button
    cy.xpath ("//label[contains(text(),'Akash Testing Company')]") .click()
    //click on select button
    cy.get('#defaultCompanySave').click()
    cy.wait(2000)
})*/
beforeEach(function(){
    cy.getCookies()
})

function DeleteRecord () {

    cy.get('.text-danger').eq(0).click();
    
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Record Deleted Successfully.')
    })	
     //click on message to close message box
     cy.get(".toast-message").click()
     cy.wait(1000) 
}

it('Login to Cloud & select Company', function() {
    cy.login()
    cy.changeCompany();
})

it ('can select settings',() => {
    //click on left upper side 3 lines to open all tabs
    cy.get('.dripicons-menu').click()
    cy.wait(2000)
    //click on setting tab
    cy.get('[src="/assets/images/icons/4.png"]').eq(0).click()
    //cy.contains('Settings').click({force:true})
    //cy.xpath('//body[1]/div[2]/div[1]/div[1]/nav[1]/a[8]/table[1]/tbody[1]/tr[1]/td[1]/img[1]').click()

    cy.get('[class="col-md-5"]').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('Settings')
    })
    cy.wait(1000)
    //cick on HR tab
    cy.get('[class="top-nav hr"]').click()

    cy.get('[class="col-3 text-left xheader-title"]').invoke('text').then((text) => {
        expect(text.trim()).equal('HR')
    }) 
})
context ('Verify joining document tab',() => {
it ('can verify joining document tab is working or not',() => { 
        //click on joining document tab
        cy.get('#HR_JoiningDocument').click()
        
        cy.get('[class="col-4 text-left xheader-title"]').eq(0).invoke('text').then((text) => {
            expect(text.trim()).equal('Joining Documents')
        })  
})   
it ('can verify add joining document button is working or not',() => { 
        //click on add joining document
        cy.get('[class="fas fa-plus"]').eq(0).click()
    
        cy.contains('Enter Joining Document').invoke('text').then((text) => {
            expect(text.trim()).equal('Enter Joining Document')
        }) 
        
})
})


context ('Verify validation message ',() => {
it('verify validation message for duplicate records',() => {
        //click on add joining document
        cy.get('[class="fas fa-plus"]').eq(0).click({force:true})
        cy.get('#documentName').type('joining test document')
        cy.contains('Yes').click()
       //click on save button
      cy.get('#btnSaveJoiningDoc').click()
      //verify success message
      cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Joining Document Saved Successfully.')
      //click on message to close message box
      cy.get(".toast-message").click()
      cy.wait(1000)  
      })

      //click on add joining document
      cy.get('[class="fas fa-plus"]').eq(0).click({force:true})
      cy.get('#documentName').type('joining test document')
      cy.contains('Yes').click()
     //click on save button
    cy.get('#btnSaveJoiningDoc').click()
    //verify success message
    cy.get(".toast-message").invoke('text').then((text) => {
      expect(text.trim()).equal('Joining Document already exists.!')
    //click on message to close message box
    cy.get(".toast-message").click()
    cy.wait(1000)  
    })
})
})


context ('Verify add funcationality ',() => {
it('can add data for requierd document',() => {
    cy.get('#documentName').clear()
        cy.get('#documentName').type('pan card')
        cy.contains('Yes').click()

       //click on save button
      cy.get('#btnSaveJoiningDoc').click()
      //verify success message
      cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Joining Document Saved Successfully.')
      //click on message to close message box
      cy.get(".toast-message").click()
      cy.wait(1000)  
    }) 
})
it('verify added data for requierd document', () => {
    //
   cy.contains("pan card").invoke('text').then((text) => {
       expect(text.trim()).to.contain('pan card')
      })     
})
it('can add data for non requierd document',() => {
    cy.get('[class="fas fa-plus"]').eq(0).click()
    cy.wait(1000)
        cy.get('#documentName').type('voting card')
        cy.contains('No').click({force:true})

       //click on save button
      cy.get('#btnSaveJoiningDoc').click({force:true})
      //verify success message
      cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Joining Document Saved Successfully.')
      //click on message to close message box
      cy.get(".toast-message").click()
      cy.wait(2000)  
      })    
})
it('verify added data for non requierd document', () => {
    //
   cy.contains("voting card").invoke('text').then((text) => {
       expect(text.trim()).to.contain('voting card')
      })      
})
})


context ('Verify edit funcationality',() => {
it('update previous data with the new data', () => {
    
       cy.get('[class="fas fa-edit text-info font-16"]').eq(2).click()
       cy.get('#documentName').clear()
       cy.get('#documentName').type('driving license')
       cy.contains('Yes').click()

        //click on save button
      cy.get('#btnSaveJoiningDoc').click()
      //verify success message
      cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Joining Document Saved Successfully.')
      //click on message to close message box
      cy.get(".toast-message").click()
      cy.wait(2000)  
    })
}) 
it('verify updated data', () => {
         //
        cy.contains("driving license").invoke('text').then((text) => {
            expect(text.trim()).to.contain('driving license')
           })
            
 })
})


context ('can delete record',() => {
it('can delete record', () => { 
    DeleteRecord('joining test document') 
    cy.wait(1000)
    DeleteRecord('pan card')  
    cy.wait(1000) 
    DeleteRecord('driving license') 
    cy.wait(1000)

})     
})

context ('Joining document - Flow ',() => {
it('can add data for requierd document',() => {
    //click on add joining document
    cy.get('[class="fas fa-plus"]').eq(0).click({force:true})
        cy.get('#documentName').clear()
            cy.get('#documentName').type('Adhaar card')
            cy.contains('Yes').click()
    
           //click on save button
          cy.get('#btnSaveJoiningDoc').click()
          //verify success message
          cy.get(".toast-message").invoke('text').then((text) => {
            expect(text.trim()).equal('Joining Document Saved Successfully.')
          //click on message to close message box
          cy.get(".toast-message").click()
          cy.wait(1000)  
        }) 
})
})

})