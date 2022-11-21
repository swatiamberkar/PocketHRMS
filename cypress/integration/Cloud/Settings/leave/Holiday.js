describe(' Holiday page', () =>{
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
})
*/
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
    //cick on Leave tab
    cy.get('#leave_detail_tab').click()

    cy.get('[class="col-3 text-left xheader-title"]').invoke('text').then((text) => {
        expect(text.trim()).equal('Leave')
    }) 
})

context ('Verify Holiday tab',() => {
it ('verify Holiday tab is working or not',() => {
    //click on holiday tab  
    cy.get('#Leave_Holiday').click()
     
    cy.contains('Holiday Setting').invoke('text').then((text) => {
    expect(text.trim()).equal('Holiday Setting')
    })
})
it ('verify Add new Holiday button is working or not',() => { 
    //click on add new holiday button
    cy.get('[class="fa fa-plus"]').eq(0).click()
    cy.wait(1000)
    /*
    cy.get('.alert-warning').invoke('text').then((text) => {
    expect(text.trim()).equal('Please set holiday entry component!')
    }) 
    cy.wait(1000) */
})
it ('can make settings in define calendar page ',() => {
    //click on Define Calendar tab
    cy.get('#Leave_DefineCalendar').click({force:true})
                
    cy.contains('General Setting').invoke('text').then((text) => {
    expect(text.trim()).equal('General Setting')
    })  
    //click on edit button
    cy.get('.fa-edit').click()
    //verify Leave financial year pop-up will open or not
    cy.contains('Leave Financial Year').invoke('text').then((text) => {
    expect(text.trim()).equal('Leave Financial Year')
    }) 
    //select holiday setting entry
    cy.get('#ddHoli').select('Company')
    //click on save button
    cy.get('#btnSaveFinSet').click()
    //verify success message
    cy.get(".toast-message").invoke('text').then((text) => {
    expect(text.trim()).equal('Records Saved Successfully!!!')
    })
    //click on message to close message box
    cy.get(".toast-message").click()
    cy.wait(1000)

     //click on holiday tab  
     cy.get('#Leave_Holiday').click()

     cy.contains('Leave Definition').invoke('text').then((text) => {
     expect(text.trim()).equal('Leave Definition')
     })

    //click on add new holiday button
    cy.get('[class="fa fa-plus"]').eq(0).click({force:true})
    cy.wait(1000)
    //verify asset list pop-up will open or not
    cy.contains('Holiday List').invoke('text').then((text) => {
    expect(text.trim()).equal('Holiday List')
    }) 
    cy.wait(1000)
})
})

context ('Verify all validatio message ',() => {
it ('verify validation message for date text field',() => {
    //click on save button
    cy.get('#btnSaveFinSet').click({force:true})
    //verify success message
    cy.get(".toast-message").invoke('text').then((text) => {
    expect(text.trim()).equal('Please select Holiday Date!')
    })
    //click on message to close message box
    cy.get(".toast-message").click()
    cy.wait(1000)
})
it ('verify validation message for ivalid date',() => {
    //select date
    cy.get('#HolidayDate').click().then(input =>
    { input[0].dispatchEvent(new Event('input', {
    bubbles: true }))
    input.val('04/09/2021')
    }) 
     //click on save button
     cy.get('#btnSaveFinSet').click({force:true})
     //verify validation message
     cy.get(".toast-message").invoke('text').then((text) => {
     expect(text.trim()).equal('Holiday Date should be inside Leave Financial year')
     })
     //click on message to close message box
     cy.get(".toast-message").click()
     cy.wait(1000)
     //close holiday list pop-up
     cy.get('[class="close"]').eq(0).click({force:true})
})
it ('verify success message',() => {
    //click on add new holiday button
    cy.get('[class="fa fa-plus"]').eq(0).click({force:true})
    cy.wait(1000)

    //select date
    cy.get('#HolidayDate').click().then(input =>
    { input[0].dispatchEvent(new Event('input', {
    bubbles: true }))
    input.val('04/10/2022')
    }) 
     //give description
     cy.get('#HolidayReason').type('Ganesh chaturthi',{force:true})
     //click on save button
    cy.get('#btnSaveFinSet').click({force:true})
    //verify success message
    cy.get(".toast-message").invoke('text').then((text) => {
    expect(text.trim()).equal('Records Saved Successfully!!!')
    })
    //click on message to close message box
    cy.get(".toast-message").click()
    cy.wait(1000)
})
it ('verify validation message for duplicate record',() => {
    //click on add new holiday button
    cy.get('[class="fa fa-plus"]').eq(0).click({force:true})
    cy.wait(1000)

    //select date
    cy.get('#HolidayDate').click().then(input =>
    { input[0].dispatchEvent(new Event('input', {
    bubbles: true }))
    input.val('04/10/2022')
    }) 
     //give description
     cy.get('#HolidayReason').type('Ganesh chaturthi',{force:true})
     //click on save button
    cy.get('#btnSaveFinSet').click({force:true})
    //verify validation message
    cy.get(".toast-message").invoke('text').then((text) => {
    expect(text.trim()).equal('Duplicate Holiday Date Found!')
    })
    //click on message to close message box
    cy.get(".toast-message").click()
    cy.wait(1000)

    //close holiday list pop-up
    cy.get('[class="close"]').eq(0).click({force:true})
})
})

context ('Verify add funcationality',() => {
it ('Add data in all text fields',() => {
    //click on add new holiday button
    cy.get('[class="fa fa-plus"]').eq(0).click({force:true})
    cy.wait(1000)

    //select date
    cy.get('#HolidayDate').click().then(input =>
    { input[0].dispatchEvent(new Event('input', {
    bubbles: true }))
    input.val('25/12/2022')
    })

    //give description
    cy.get('#HolidayReason').type('christmas',{force:true})

    //select optional holiday
    cy.get('#chkOptional').select('No')

    //click on save button
    cy.get('#btnSaveFinSet').click({force:true})
    //verify success message
    cy.get(".toast-message").invoke('text').then((text) => {
    expect(text.trim()).equal('Records Saved Successfully!!!')
    })
    //click on message to close message box
    cy.get(".toast-message").click()
    cy.wait(1000)
})
it ('verify Added data in all text fields',() => {
    //
    cy.xpath("//h4[contains(text(),'25/12/2022')]").invoke('text').then((text) => {
    expect(text.trim()).to.contain('25/12/2022')
    })
    //
    cy.contains("christmas").invoke('text').then((text) => {
    expect(text.trim()).to.contain('christmas')
    })
})
})

context ('Verify edit funcationality',() => {
it ('update previous data with the new data',() => {
    //click on edit button
    cy.get('.fa-edit').eq(1).click()

    //select date
    cy.get('#HolidayDate').click().then(input =>
    { input[0].dispatchEvent(new Event('input', {
    bubbles: true }))
    input.val('24/10/2022')
    })

    //give description
    cy.get('#HolidayReason').clear({force:true})
    cy.get('#HolidayReason').type('Dipawali')

    //click on save button
    cy.get('#btnSaveFinSet').click({force:true})
    //verify success message
    cy.get(".toast-message").invoke('text').then((text) => {
    expect(text.trim()).equal('Records Saved Successfully!!!')
    })
    //click on message to close message box
    cy.get(".toast-message").click()
    cy.wait(1000)
})
it ('verify updated data in all text fields',() => {
//
cy.xpath("//h4[contains(text(),'24/10/2022')]").invoke('text').then((text) => {
    expect(text.trim()).to.contain('24/10/2022')
    })
//
cy.contains("Dipawali").invoke('text').then((text) => {
    expect(text.trim()).to.contain('Dipawali')
    })
})
})

context ('Verify Added data',() => {
it ('verify holiday list in employee profile page',() => {
    //click on left upper side 3 lines to open all tabs
    cy.get('.dripicons-menu').click()
    cy.wait(2000)
    //click on empoloyee tab
    cy.get('.menu-name').contains('Employee').click()
    //click on employee list
    cy.get('[data-link="/Employee/Employee/EmployeeList"]').click()
    //click on 1st employee name
    cy.get('[title="Devang David"]').click()
    cy.wait(2000)
    //click on leave tab
    cy.get('#leave_detail_tab').click()
    //click on holiday list tab
    cy.get('#Leave_HolidayList').click()

    //verify added data
    cy.contains('04/10/2022').invoke('text').then((text) => {
    expect(text.trim()).to.contain('04/10/2022')
    })
    //
    cy.contains("Ganesh chaturthi").invoke('text').then((text) => {
    expect(text.trim()).to.contain('Ganesh chaturthi')
    })
    //
    cy.contains('24/10/2022').invoke('text').then((text) => {
    expect(text.trim()).to.contain('24/10/2022')
    })
    //
    cy.contains("Dipawali").invoke('text').then((text) => {
    expect(text.trim()).to.contain('Dipawali')
    })
})
})

context ('Verify for delete funcationality',() => { 
it ('can select settings',() => {
    //click on left upper side 3 lines to open all tabs
    cy.get('.dripicons-menu').click()
    cy.wait(2000)
    //click on setting tab
    cy.contains('Settings').click({force:true})
    
    cy.get('[class="col-md-5"]').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('Settings')
    })
    cy.wait(1000)
    //cick on Leave tab
    cy.get('#leave_detail_tab').click()
    
    cy.get('[class="col-3 text-left xheader-title"]').invoke('text').then((text) => {
        expect(text.trim()).equal('Leave')
    }) 
    //click on holiday tab  
    cy.get('#Leave_Holiday').click()

    cy.contains('Holiday Setting').invoke('text').then((text) => {
    expect(text.trim()).equal('Holiday Setting')
    })
    cy.wait(2000)
})   
it('can deleete record ', ( )=>{
        cy.get('.text-danger').eq(0).click({force:true})
        //cy.wait(1000)
        
        cy.get(".toast-message").invoke('text').then((text) => {
        cy.log(text.trim())
        expect(text.trim()).to.contain('Record Deleted Successfully!!!')
        })
        //click on message to close message box
        cy.get(".toast-message").click()
})
it('can deleete record ', ( )=>{
    cy.get('.text-danger').eq(0).click({force:true})
    //cy.wait(1000)
        
    cy.get(".toast-message").invoke('text').then((text) => {
    cy.log(text.trim())
    expect(text.trim()).to.contain('Record Deleted Successfully!!!')
    })
    //click on message to close message box
    cy.get(".toast-message").click()
          
})
it('can revert changes', ( )=>{
    //click on Define Calendar tab
    cy.get('#Leave_DefineCalendar').click()
    //
    cy.get('.fa-edit').click()  
    cy.get('#ddHoli').select('- Select -')
    //click on submit button
    cy.get('#btnSaveFinSet').click()
    cy.wait(3000)
})
})
})
