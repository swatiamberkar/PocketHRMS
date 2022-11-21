describe('Mustered roll setting page', () =>{
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

context ('Verify Muster Roll Setting tab',() => {
it ('verify Muster Roll Setting tab is working or not',() => {
    //click on Muster Roll Setting tab  
    cy.get('#Leave_MusterRollSetting').click()

    cy.contains('Muster Roll Setting').invoke('text').then((text) => {
    expect(text.trim()).equal('Muster Roll Setting')
    })
})
})
context ('Verify  validation message',() => {
it ('verify validation message for blank fields',() => {
    //select category
    cy.get('#categoryMaster').select('Test category')
    cy.wait(1000)
    cy.get('#btnSave').click()
    //verify error message
    cy.contains('Something Went Wrong').invoke('text').then((text) => {
        expect(text.trim()).include("Something Went Wrong")
        })    

})
})
context ('Verify  Add funcatioality',() => {
it ('can add new field',() => {
    //click for come back
    cy.get('[class="topbar-left"]').click()

    //click on left upper side 3 lines to open all tabs
    cy.get('[class="dripicons-menu nav-icon"]').click({forc:true })

    cy.xpath('//body[1]/div[2]/div[1]/div[1]/nav[1]/a[8]/table[1]/tbody[1]/tr[1]/td[1]/img[1]').click()

    //cick on Leave tab
    cy.get('#leave_detail_tab').click()

    //click on Muster Roll Setting tab  
    cy.get('#Leave_MusterRollSetting').click()

    //select category
    cy.get('#categoryMaster').select('Test category')
    cy.wait(1000)
    //
    cy.get('#RateOfHRAD').select('ARREAR BASIC')
    //
    cy.get('#NormalWagesD').select('EARNED BASIC')
    //
    cy.get('#btnAddNew').eq(0).click()
    //
    cy.get('[name="MRCL_19"]').type('dsjkaf')
    //
    cy.get('[name="MRCD_19"]').select('PAID DAYS')
    //click on save button
    cy.get('#btnSave').click()
    //verify success message
    cy.contains(' Records Saved Successfully.!').invoke('text').then((text) => {
        expect(text.trim()).include(" Records Saved Successfully.!")
        })
        cy.wait(2000)
})
})
context ('Verify  delete funcatioality',() => {
it ('can delete added data',() => {
    //select category
    cy.get('#categoryMaster').select('Test category')
    cy.wait(1000)
    //click on delete button
    cy.get('#btnDelete').click({force:true})
    cy.wait(2000)
    //verify validation message
    cy.contains(' Records Delete Successfully.!').invoke('text').then((text) => {
        expect(text.trim()).include(" Records Delete Successfully.!")
        })

})

})
})