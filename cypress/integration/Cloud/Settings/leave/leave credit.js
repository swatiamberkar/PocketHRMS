describe('Mustered roll setting page', () =>{
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
})
it ('can select settings',() => {
        //click on left upper side 3 lines to open all tabs
        cy.get('[class="dripicons-menu nav-icon"]').click({forc:true })
        //click on setting tab
        //cy.xpath("//td[contains(text(),'Settings')]").eq(0).click({forc:true})
        cy.xpath('//body[1]/div[2]/div[1]/div[1]/nav[1]/a[8]/table[1]/tbody[1]/tr[1]/td[1]/img[1]').click()
        //cy.contains('Settings').click({force:true})
        
        cy.get('[class="col-md-5"]').eq(0).invoke('text').then((text) => {
            expect(text.trim()).equal('Settings')
        })
        cy.wait(1000)
        //cick on Leave tab
        cy.get('#leave_detail_tab').click()
    
        cy.get('[class="col-3 text-left xheader-title"]').invoke('text').then((text) => {
            expect(text.trim()).equal('Leave')
        }) 
})

context ('Verify leave credi tab',() => {
it ('can Verify leave credi tab is working properly or not',() => {
    //click on leave credit tab
    cy.get('#Leave_LeaveCredit').click();
    cy.wait(2000)
})
context ('Verify validation message',() => {
it ('can Verify validation message for valid date',() => {
    //select category
    cy.get('#catId').select('house keeping');
    //select leave
    cy.get('#leav').select('PL');
    //select leave credit based on
    cy.get('#leavCrBasedOn').select('DATEOFBIRTH');
    //click on save button
    cy.get('#btnAdd').click();
    //verify validation    
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Please Enter the Valid Date.')
    })
    //click on message to close message box
    cy.get(".toast-message").click()

})
it ('can Verify validation message for monthly credit days',() => {
     //Enter date
     cy.get('#crEffFrom').click().then(input =>
        { input[0].dispatchEvent(new Event('input', {
        bubbles: true }))
        input.val('24/09/2022')
        })
    //click on save button
    cy.get('#btnAdd').click();
    //verify validation    
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Please Enter Monthly Credit Days.')
    })
    //click on message to close message box
    cy.get(".toast-message").click()
    cy.wait(1000)
})
it ('can Verify validation message for midddle month credit ',() => {
    //
    cy.get('#monCrDays').type('10')
    //click on save button
    cy.get('#btnAdd').click();
    cy.wait(2000)
    //verify validation    
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Credit for employees joining in the middle of the month will be calculated after.')
    })
    //click on message to close message box
    cy.get(".toast-message").click()
})
})
})
})