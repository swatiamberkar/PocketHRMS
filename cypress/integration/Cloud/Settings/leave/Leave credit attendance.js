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

context ('Verify Leave credit attendance tab',() => {
it ('verify Leave credit attendance tab is working or not',() => {
    //click on Leave credit attendance Setting tab  
    cy.get('#Leave_LeaveCreditAttendance').click()
        
    cy.contains('Leave Credit Attendance Setting').invoke('text').then((text) => {
    expect(text.trim()).equal('Leave Credit Attendance Setting')
    })
})
})
context ('Verify all validation message',() => {
it ('verify validation message for seleect category',() => {
    //click on save button ,submit blank form
    cy.get('#btnSave').click()
    //vrify validation for blank form
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Please select Category.')
    })
    //click on message to close message box
    cy.get(".toast-message").click()
})
it ('verify validation message for seleect parameter',() => {
    //select category and click on submit button
    cy.get('#LCACategory').select('Staff')
    //clcik on submit button
    cy.get('#btnSave').click()
    //vrify validation for blank form
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Please select Parameter.')
    })
    //click on message to close message box
    cy.get(".toast-message").click()
})
it ('verify validation message for date field',() => {
    //select category
    cy.get('#ddDynamic').select('Staff')
    //select leave
    cy.get('#leav').select('PL')
    //clcik on save button
    cy.get('#btnAdd').click()
    //vrify validation for blank form
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Please Enter the Valid Date.')
    })
    //click on message to close message box
    cy.get(".toast-message").click()
})
it ('verify validation message for leave credit days field',() => {
    //Enter date
    cy.get('#crEffFrom').click().then(input =>
    { input[0].dispatchEvent(new Event('input', {
    bubbles: true }))
    input.val('05/09/2022')
    })
    //clcik on save button
    cy.get('#btnAdd').click()
    //vrify validation for blank form
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Please Enter Monthly Credit Days.')
    })
    //click on message to close message box
    cy.get(".toast-message").click()

})
it ('verify validation message for Attendance working days field',() => {
    //
    cy.get('#LeaveCrDays').type('05')
    //clcik on save button
    cy.get('#btnAdd').click()
    //vrify validation for blank form
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Please Enter Attendance Working Days.')
    })
    //click on message to close message box
    cy.get(".toast-message").click()
})
it ('verify validation message for eligible days ',() => {
    //
    cy.get('#AttWrkDy').type('06')
    //clcik on save button
    cy.get('#btnAdd').click()
    //vrify validation for blank form
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Please Enter Eligible Days.')
    })
    //click on message to close message box
    cy.get(".toast-message").click()
})
it ('verify validation message for invalid date ',() => {
    //
    cy.get('#ElgDy').type('02')
    //clcik on save button
    cy.get('#btnAdd').click()
    //vrify validation for blank form
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Credit Effective Date should be between Financial Year.')
    })
    //click on message to close message box
    cy.get(".toast-message").click()
})
})

context ('Verify Add Funcationality',() => {
it ('Can add daa inside all fields ',() => {
     //select category
    cy.get('#LCACategory').select('Staff category')
    //select month format
    cy.get('#ddpara').select('Calendar Month')
    //click on submit button
    cy.get('#btnSave').click()
    //verify success message
    cy.contains("Records Saved Successfully.!").invoke('text').then((text) => {
    expect(text.trim()).to.contain('Records Saved Successfully.!')
    })
})
it ('Can add daa inside all fields ',() => {
    //select category
    cy.get('#catId').select('Staff ')
    //select leave
    cy.get('#leav').select('PL')
     //Enter date
     cy.get('#crEffFrom').click().then(input =>
        { input[0].dispatchEvent(new Event('input', {
        bubbles: true }))
        input.val('25/09/2022')
        })
    //
    cy.get('#LeaveCrDays').type('05',{force:true})
    //
    cy.get('#AttWrkDy').type('06')
    //
    cy.get('#ElgDy').type('02')
    //click on save button
    cy.get('#btnAdd').click()
    //verify success message
    cy.contains("Records Saved Successfully.!").invoke('text').then((text) => {
        expect(text.trim()).to.contain('Records Saved Successfully.!')
        })

})
})
})