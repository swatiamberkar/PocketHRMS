describe('Generate password page', () =>{
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
context ('Verify generate password tab',() => {
it ('can verify generate password tab is working or not',() => { 
    //click on category tab
    cy.get('#HR_GeneratePassword').click()
        
    cy.get('[class="col-11 text-left xheader-title"]').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('Generate Password')
        })  
})    
})
context ('Verify add uncationality',() => {
it ('can add data in alll field ',() => {

        cy.get('#select2-multiEmp-container').click()
        cy.get(' [class="select2-search__field"]').type('[ATC003] SANKET JAGDALE (MGR)')
        cy.get('#OverWriteRad').click({force:true})
       cy.contains('Employee Code').click()
        cy.get('#savesetting').click()
})
it ('verify added data in all field ',() => {
        cy.get('#globalSearch').type('password reset')
        cy.contains('Password Reset').click()
        cy.wait(1000)
        cy.get('[class="select2-selection__rendered"]').type('03')
        cy.contains('[ATC003] SANKET JAGDALE (MGR)').click()
        cy.get('#btnView').click()
        cy.contains('Preview').click()

        cy.contains('ATC003').invoke('text').then((text) => {
            expect(text.trim()).include("ATC003")
        })  
})
})
context ('Verify edit uncationality',() => {
    it ('can replace old data with new data',() => {
        cy.get('#globalSearch').clear()
        cy.get('#globalSearch').type('password reset')
        cy.wait(1000)
        cy.contains('Generate Password').click({force:true})
        cy.wait(1000)
        cy.get('#select2-multiEmp-container').click({force:true})
        cy.get(' [class="select2-search__field"]').type('[ATC003] SANKET JAGDALE (MGR)')
        cy.get('#OverWriteRad').click({force:true})
       cy.contains('DOB (DDMMYYYY)').click()
        cy.get('#savesetting').click()
})
it ('verify edited data in all field ',() => {
        cy.get('#globalSearch').clear()
        cy.get('#globalSearch').type('password reset')
        cy.contains('Password Reset').click()
        cy.wait(1000)
        cy.get('[class="select2-selection__rendered"]').type('03')
        cy.contains('[ATC003] SANKET JAGDALE (MGR)').click()
        cy.get('#btnView').click()
        cy.contains('Preview').click()

        cy.contains('11081995').invoke('text').then((text) => {
            expect(text.trim()).include("11081995")
        })  
})

})    
})