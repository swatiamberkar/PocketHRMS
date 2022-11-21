describe(' leave definition page', () =>{
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
var leaveTypeValue = 'SL'

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

context ('Verify Leave Definition tab',() => {
it ('verify Leave Definition tab is working or not',() => { 
    //click on Leave Definition tab
    cy.get('#Leave_LeaveDefinition').click()
                
    cy.contains('Leave Definition').invoke('text').then((text) => {
    expect(text.trim()).equal('Leave Definition')
    })  
})
it ('verify Add new leave setting button is working or not',() => { 
    
    cy.get('[title="Leave Defination"]').eq(0).click({force:true})
    //verify asset list pop-up will open or not
    cy.contains('Leave Definition').invoke('text').then((text) => {
    expect(text.trim()).equal('Leave Definition')
    })  
})    
})
/*
context ('Verify validation messages',() => {
it('verify valdation massage for Leave Name', () => {

    //1)blank form
    cy.get('#btnLeaveDefinationSave').click()
    cy.wait(1000)
    //vrify validation for blank form
    cy.get(".toast-message").invoke('text').then((text) => {
    expect(text.trim()).equal('Please enter Leave Name.')
    })
    //click on message to close message box
    cy.get(".toast-message").click()
})
it('verify valdation massage for Leave Description', () => {
    //
    cy.get('#leavName').type('LOP')
    //click on save button
    cy.get('#btnLeaveDefinationSave').click()
    cy.wait(1000)
    //vrify validation for blank form
    cy.get(".toast-message").invoke('text').then((text) => {
    expect(text.trim()).equal('Please enter Leave Description.')
    })
    //click on message to close message box
    cy.get(".toast-message").click()
})
it('verify valdation massage for Leave Category', () => {
    //
    cy.get('#leavDesc').type('for family function')
    //click on save button
    cy.get('#btnLeaveDefinationSave').click()
    cy.wait(1000)
    //vrify validation for blank form
    cy.get(".toast-message").invoke('text').then((text) => {
    expect(text.trim()).equal('Please select Leave Category.')
    })
    //click on message to close message box
    cy.get(".toast-message").click()
})
it('verify valdation massage for Leave type', () => {
    //select category
    cy.get('#leavCategory').select('LOP')
    //click on save button
    cy.get('#btnLeaveDefinationSave').click()
    cy.wait(1000)
    //vrify validation for blank form
    cy.get(".toast-message").invoke('text').then((text) => {
    expect(text.trim()).equal('Please select Leave Type.')
    })
    //click on message to close message box
    cy.get(".toast-message").click()
})
it('verify validation message for leave opening ', () => {
    //
    cy.get('#leaveType').select('Day Wise')
    //
    cy.get('#leavOpen').select('REQUIRED',{force:true})
     //click on save button
     cy.get('#btnLeaveDefinationSave').click({force:true})
     cy.wait(1000)
     //vrify validation for blank form
     cy.get(".toast-message").invoke('text').then((text) => {
     expect(text.trim()).equal('Opening is not required for LOSS OF PAY')
     })
     //click on message to close message box
     cy.get(".toast-message").click()
})
it('verify success message ', () => {
    //
    cy.get('#leavOpen').select('NOT REQUIRED',{force:true})
     //click on save button
     cy.get('#btnLeaveDefinationSave').click({force:true})
     cy.wait(1000)
     //vrify success message
     cy.get(".toast-message").invoke('text').then((text) => {
     expect(text.trim()).equal('Records Saved Successfully!!!')
     })
     //click on message to close message box
     cy.get(".toast-message").click()
     cy.wait(1000)
})
it('verify validatoin message for Duplicate record ', () => {
    //
    cy.get('[class="fas fa-plus"]').eq(0).click({force:true})
   
    cy.get('#leavName').type('LOP')
    //
    cy.get('#leavDesc').type('for family function')
    //select category
    cy.get('#leavCategory').select('LOP')
    //
    cy.get('#leaveType').select('Day Wise')
     //click on save button
     cy.get('#btnLeaveDefinationSave').click()
     cy.wait(1000)
     //vrify validation for blank form
     cy.get(".toast-message").invoke('text').then((text) => {
     expect(text.trim()).equal('LOP already found.')
     })
     //click on message to close message box
     cy.get(".toast-message").click()
})
/*it('verify validatoin message for invalid leave name ', () => {
    cy.get('#leavName').clear()
    cy.get('#leavName').type('kjfd')
    //click on save button
    cy.get('#btnLeaveDefinationSave').click()
    cy.wait(1000)
    //vrify validation for blank form
    cy.get(".toast-message").invoke('text').then((text) => {
    expect(text.trim()).equal('kjfd cannot be matched with LOSS OF PAY')
    })
    //click on message to close message box
    cy.get(".toast-message").click()
    //close pop-up
    cy.get('.btn-danger').eq(0).click({force:true})
})
})
*/

context ('Verify Add Funcationality',() => {
it('Add data in all fields ', () => {
    //click on add leave definitio button
    cy.get('[class="fas fa-plus"]').eq(0).click({force:true})
    //
    cy.get('#leavName').clear()
    cy.get('#leavName').type('CL')
    //
    cy.get('#leavDesc').clear()
    cy.get('#leavDesc').type('for emergancy work')
    //select category
    cy.get('#leavCategory').select('CASUAL LEAVE')
    //
    cy.get('#leavOpen').select('REQUIRED')
    //
    cy.get('#leaveType').select('Day Wise')
    //
    cy.get('[title="Staff"]').click()
    //
    cy.get('#paySlip').select('Yes')
    //click on save button
    cy.get('#btnLeaveDefinationSave').click({force:true})
    cy.wait(1000)
    //vrify success message
    cy.get(".toast-message").invoke('text').then((text) => {
    expect(text.trim()).equal('Records Saved Successfully!!!')
    })
    //click on message to close message box
    cy.get(".toast-message").click()
    cy.wait(1000)
})
it('can verify Added data in all fields ', () => {
    //
    cy.xpath("//h4[contains(text(),'CL')]").invoke('text').then((text) => {
    expect(text.trim()).to.contain('CL')
    })
    //
    cy.xpath("//span[contains(text(),'for emergancy work')]").invoke('text').then((text) => {
    expect(text.trim()).to.contain('for emergancy work')
    })
    /*
    cy.xpath("//span[contains(text(),'Leave Opening Not Required')]").invoke('text').then((text) => {
    expect(text.trim()).to.contain('Leave Opening Not Required')
    })*/
})
})

context ('Verify edit Funcationality',() => {
it('update previous data with the new data', () => {
    //click on edit button
    cy.get('.fa-edit').eq(0).click({force:true})
    //
    //cy.get('#leavName').clear()
    //cy.get('#leavName').type('WDL')
    //
    cy.get('#leavDesc').clear()
    cy.get('#leavDesc').type('for work')
    //select category
    cy.get('#leavCategory').select('CASUAL LEAVE')
    //
    cy.get('#leaveType').select('Hourly')
    //
    cy.get('#paySlip').select('Yes')
    //
    cy.get('#leavOpen').select('REQUIRED')
    //
    cy.get('[title="Staff"]').click()
    
    //click on save button
    cy.get('#btnLeaveDefinationUpdate').click({force:true})
    cy.wait(1000)
    //vrify success message
    cy.get(".toast-message").invoke('text').then((text) => {
    expect(text.trim()).equal('Records Saved Successfully!!!')
    })
    //click on message to close message box
    cy.get(".toast-message").click()
    cy.wait(1000)
})
it('verify updated data ', () => {
    //
    cy.xpath("//span[contains(text(),'for work')]").invoke('text').then((text) => {
    expect(text.trim()).to.contain('for work')
    })
    //
    cy.xpath("//b[contains(text(),'- HOURLY LEAVE')]").invoke('text').then((text) => {
    expect(text.trim()).to.contain('HOURLY LEAVE')
    })

})
})
it('Add releiver ', () => {
   
        cy.visit(Cypress.env('url')+'Settings/Employee/Index?module=organization&submodule=smtpsettings')
        cy.wait(1000)
        cy.get('#leave_detail_tab').click({force:true})
        cy.wait(1000)
            cy.server()
            cy.wait(2000)
            cy.get('#Leave_LeaveDefinition').click( {force: true})
            cy.wait(10000)
            cy.route('POST', Cypress.env('url')+'Leave/Setting/LeaveDefinitions').as('LeaveDefinitions')
            cy.wait(4000)
            cy.get('.media-body>u>h4').each(function(row, i){
                var num = parseFloat(i)
                cy.get('.media-body>u>h4').eq(num).invoke('text').then((text) => {
                    if (text.trim() == leaveTypeValue)
                    {
                        cy.get('.fa-edit').eq(num).click( {force: true})
                        cy.wait(2000)
                        cy.get('#reliverR').select('Y',{force:true})
                        cy.wait(2000)
                        cy.get('#btnLeaveDefinationUpdate').click({force:true})
            cy.wait(1000)
                        cy.wait('@LeaveDefinitions').its('status').should('eq', 200)
                        cy.get(".toast-message").invoke('text').then((text) => {
                            expect(text.trim()).equal('Records Saved Successfully!!!')
                        })
                    cy.get(".toast-message").click({force:true})
                    }
                    })
                })
    
   
})

/*

context ('Verify for delete funcationality',() => { 
it('can deleete record ', ( )=>{
    cy.get('.text-danger').eq(1).click({force:true})
    //cy.wait(1000)
    
    cy.get(".toast-message").invoke('text').then((text) => {
    cy.log(text.trim())
    expect(text.trim()).to.contain('Records Deleted Successfully!!!')
    })
      
    
})
it('can deleete record ', ( )=>{
    cy.get('.text-danger').eq(2).click({force:true})
    //cy.wait(1000)
    
    cy.get(".toast-message").invoke('text').then((text) => {
    cy.log(text.trim())
    expect(text.trim()).to.contain('Records Deleted Successfully!!!')
    })
      
    
})*
})*/
})