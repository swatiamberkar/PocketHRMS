describe(' Weekly off page', () =>{
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

context ('Verify WeeklyOff tab',() => {
it ('verify WeeklyOff tab is working or not',() => {
    //click on WeeklyOff tab  
    cy.get('#Leave_WeeklyOff').click()
    
    cy.contains('Weekly Off Setting').invoke('text').then((text) => {
    expect(text.trim()).equal('Weekly Off Setting')
    })
})
})
context ('Verify Add Funcationality',() => {
it ('Add data in respective text field',() => {
    //click on check box
    cy.get('#listWeekDays_0__DayChecked').click()
    cy.get('#listWeekDays_6__DayChecked').click()
    //click on process button
    cy.get('#btnProcess').click()
    cy.wait(3000)
    //click on save button
    cy.get('#btnSave').click()
     //verify success message
     cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Data saved successfully.!')
        })
        //click on message to close message box
        cy.get(".toast-message").click()
        cy.wait(1000)
})
context ('Verify delete Funcationality',() => {
it('can delete added record', () => {
    //click on delete button
    cy.get('#btnDelete').click()
    //verify success message
    cy.get(".toast-message").invoke('text').then((text) => {
        cy.log(text.trim())
        expect(text.trim()).to.contain('Data saved successfully.!')
        })
        //click on message to close message box
        cy.get(".toast-message").click()

})

})
})
})