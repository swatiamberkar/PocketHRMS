describe('Auto-number setting page', () =>{
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
context ('Verify Auto-number setting tab',() => {
it ('can verify auto number setting tab is working or not',() => { 
        //click on category tab
        cy.get('#HR_AutoNumberSetting').click()
        
        cy.get('[class="col-11 text-left xheader-title"]').eq(0).invoke('text').then((text) => {
            expect(text.trim()).equal('Auto Number Setting')
        })  
})
})


context ('Verify for validation message',() => {
it('can verify validation message for starting number(blank fields)', () => {
    //blank all fields
    cy.get('#char').clear()
    cy.get('#TrailingZero').clear()
    cy.get('#StartingNumber').clear()
    //click on save button
    cy.get('#btnSaveAutoNumber').click()

    cy.get('.toast-message').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('Enter Starting Number.!')
    })  
    //click on message to close message box
    cy.get(".toast-message").click() 
    cy.wait(1000)
})
it('can verify validation message for starting number', () => {
    //put alphabates inside starting number field
    cy.get('#StartingNumber').type('dfdf')
    //verify validation message
    cy.contains('Allow Number Only.!').invoke('text').then((text) => {
        expect(text.trim()).equal("Allow Number Only.!")
    })  
})
it('can verify validation message for trailing zero', () => {
    //put alphabates inside starting number field
    cy.get('#TrailingZero').type('121')
    //verify validation message
    cy.contains('Allowed 0 only.!').invoke('text').then((text) => {
        expect(text.trim()).equal("Allowed 0 only.!")
    })  
})
})


context ('Verify add fucationality',() => {
it('can add data', () => {
   cy.get('#char').type('abs')
   cy.get('#StartingNumber').type(1)
   cy.get('#TrailingZero').type('00')
   //click on save button
   cy.get('#btnSaveAutoNumber').click()
    //verify success message  
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Settings saved successfully.!')
    })
     //click on message to close message box
     cy.get(".toast-message").click()
     cy.wait(1000)
})
it('can verify added data',() => {
    //
    cy.contains("abs").invoke('text').then((text) => {
        expect(text.trim()).to.contain("abs")
       })
    //
    cy.contains('00').invoke('text').then((text) => {
        expect(text.trim()).to.contain('00')
       })
    //
    cy.contains("1").invoke('text').then((text) => {
        expect(text.trim()).to.contain("1")
       })     
})
})


context ('Verify edit fucationality',() => {
it('can update previous data with new data',() => {
    //edit character text field
    cy.get('#char').clear()
    cy.get('#char').type('ATC')
    //edit trailing zero text field
    cy.get('#TrailingZero').clear()
    cy.get('#TrailingZero').type('00')
    //edit starting number text field
    cy.get('#StartingNumber').clear()
    cy.get('#StartingNumber').type('01')

    //click on save button
   cy.get('#btnSaveAutoNumber').click()
   //verify success message  
   cy.get(".toast-message").invoke('text').then((text) => {
       expect(text.trim()).equal('Settings saved successfully.!')
   })
    //click on message to close message box
    cy.get(".toast-message").click()
    cy.wait(1000)
})
it('can verify updated data',() => {
    //
    cy.contains("ATC").invoke('text').then((text) => {
        expect(text.trim()).to.contain("ATC")
       })
    //
    cy.contains('00').invoke('text').then((text) => {
        expect(text.trim()).to.contain('00')
       })
    //
    cy.contains("01").invoke('text').then((text) => {
        expect(text.trim()).to.contain("01")
       })     
})
})

})