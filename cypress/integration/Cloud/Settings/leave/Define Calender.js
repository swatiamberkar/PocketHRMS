describe(' Definecalendar page', () =>{
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
    cy.get('.dripicons-menu').click()
    cy.wait(2000)
    //click on setting tab
    //cy.get('[src="/assets/images/icons/4.png"]').eq(0).click()
    //cy.contains('Settings').click({force:true})
    cy.xpath('//body[1]/div[2]/div[1]/div[1]/nav[1]/a[8]/table[1]/tbody[1]/tr[1]/td[1]/img[1]').click()

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

context ('Verify Define Calendar tab',() => {
it ('verify Define Calendar tab is working or not',() => { 
    //click on Define Calendar tab
    cy.get('#Leave_DefineCalendar').click()
                
    cy.contains('General Setting').invoke('text').then((text) => {
    expect(text.trim()).equal('General Setting')
    })  
})
it ('verify Add new leave setting button is working or not',() => { 
    
    cy.get('[class="fas fa-plus"]').eq(0).click()
    //verify asset list pop-up will open or not
    cy.contains('Leave Financial Year').invoke('text').then((text) => {
    expect(text.trim()).equal('Leave Financial Year')
    })  
})    
})

context ('Verify validation message',() => {
it('can verify validation message', () => {
    //click on save buttton
    cy.get('#btnSaveFinSet').click()
    //verify validation message
    cy.get(".toast-message").invoke('text').then((text) => {
    expect(text.trim()).equal('Select Financial Starting Date')
    //click on message to close message box
    cy.get(".toast-message").click()
    cy.wait(2000)   
    })  
   
})
it('can verify validation message', () => {
    //select date
    cy.get('#txtStartDt').click().then(input =>
        { input[0].dispatchEvent(new Event('input', {
        bubbles: true }))
        input.val('04/09/2022')
        }) 
    //click on save buttton
    cy.get('#btnSaveFinSet').click()
    //cy.get('#btnSaveFinSet').click({force:true})
    cy.wait(1000)
    

})
})
})