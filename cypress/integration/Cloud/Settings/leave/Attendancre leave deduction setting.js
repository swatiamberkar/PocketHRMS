describe(' Attendance leave deduction page', () =>{
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
    //cy.xpath('/html[1]/body[1]/div[2]/div[1]/div[1]/nav[1]/a[8]/table[1]/tbody[1]/tr[2]/td[1]/span[1]').click({forc:true})
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

context ('Verify Attendance - Leave Deduction Setting tab',() => {
it ('verify Attendance - Leave Deduction Setting tab is working or not',() => {
    //click on WeeklyOff tab  
    cy.get('#Leave_Attendance-LeaveDeductionSetting').click()
    
    cy.contains('Attendance - Leave Deduction Setting').invoke('text').then((text) => {
    expect(text.trim()).equal('Attendance - Leave Deduction Setting')
    })
})
})
context ('Verify all validation message',() => {
it ('verify validation message for shift name',() => {
    cy.get('#btnSave').click()
    //verify validation message
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Please select Shift Name.')
        })
        //click on message to close message box
        cy.get(".toast-message").click()
        cy.wait(1000)
}) 
it ('verify validation message for leave name ',() => {
    //select field
    cy.get('#ddField').select('UNPUNCHES')
    //click on save button
    cy.get('#btnSave').click()
    //verify validation message
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Please Select Leave Name !')
        })
        //click on message to close message box
        cy.get(".toast-message").click()
        cy.wait(1000)  
}) 
it ('verify validation message for leave type ',() => {
    //select leave name
    cy.get('#ddLeaveName').select('LOSS OF PAY DAYS')
    //click on save button
    cy.get('#btnSave').click()
    //verify validation message
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Please Select Leave Type !')
        })
        //click on message to close message box
        cy.get(".toast-message").click()
        cy.wait(1000)  
})
it ('verify success message  ',() => {
    //select leave type
    cy.get('#ddLeaveType').select('Half Day')
    //click on save button
    cy.get('#btnSave').click()
    //verify validation message
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Data save successfully')
        })
        //click on message to close message box
        cy.get(".toast-message").click()
        cy.wait(1000)  
})
it ('verify validation message for working hourse page setting ',() => {
    //select field
    cy.get('#ddField').select('WORKINGHOURS')
     //click on save button
     cy.get('#btnSave').click()
     //verify validation message
     cy.get(".toast-message").invoke('text').then((text) => {
         expect(text.trim()).equal('Please enter Full Day or Half Day settings.')
         })
         //click on message to close message box
         cy.get(".toast-message").click()
         cy.wait(1000)  
})
it ('verify validation message for valid field details',() => {
    //fill data inside only hourse text field
    cy.get('#FDHourFrom').clear()
    cy.get('#FDHourFrom').type('09')
    //click on save button
    cy.get('#btnSave').click()
    //verify validation message
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Enter the Valid Full Day Working Hours and Minute.')
        })
        //click on message to close message box
        cy.get(".toast-message").click()
        cy.wait(1000)  
})
it ('verify validation message for valid working houres',() => {
    cy.get('#FDHourFrom').clear()
    cy.get('#FDHourFrom').type('27')
    //
    cy.get('#FDMinFrom').clear()
    cy.get('#FDMinFrom').type('30')
    //
    cy.get('#FDHourTo').clear()
    cy.get('#FDHourTo').type('29')
    //
    cy.get('#FDMinTo').clear()
    cy.get('#FDMinTo').type('30')
    //click on save button
    cy.get('#btnSave').click()
    //verify validation message
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Enter the Valid Full Day Working Hour.')
        })
        //click on message to close message box
        cy.get(".toast-message").click()
        cy.wait(1000)  
})
it ('verify validation message for valid working minutes',() => {
    cy.get('#FDHourFrom').clear()
    cy.get('#FDHourFrom').type('10')
    //
    cy.get('#FDMinFrom').clear()
    cy.get('#FDMinFrom').type('80')
    //
    cy.get('#FDHourTo').clear()
    cy.get('#FDHourTo').type('12')
    //
    cy.get('#FDMinTo').clear()
    cy.get('#FDMinTo').type('86')
    //click on save button
    cy.get('#btnSave').click()
    //verify validation message
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Enter the Valid Full Day Working Minute.')
        })
        //click on message to close message box
        cy.get(".toast-message").click()
        cy.wait(1000)  
})
it ('verify validation message for enter leave name',() => {
    cy.get('#FDHourFrom').clear()
    cy.get('#FDHourFrom').type('10')
    //
    cy.get('#FDMinFrom').clear()
    cy.get('#FDMinFrom').type('20')
    //
    cy.get('#FDHourTo').clear()
    cy.get('#FDHourTo').type('12')
    //
    cy.get('#FDMinTo').clear()
    cy.get('#FDMinTo').type('36')
    //click on save button
    cy.get('#btnSave').click()
    //verify validation message
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Please Select Full Day Leave Name.')
        })
        //click on message to close message box
        cy.get(".toast-message").click()
        cy.wait(1000)  
})
})

context ('Verify ad funcationality',() => {
it ('Add data in all text fields for unpunchase ',() => {
    //select field
    cy.get('#ddField').select('UNPUNCHES')
    //select leave name
    cy.get('#ddLeaveName').select('LOSS OF PAY DAYS')
    //select leave type
    cy.get('#ddLeaveType').select('Full Day')

    //click on save button
    cy.get('#btnSave').click()
    //verify validation message
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Data save successfully')
        })
        //click on message to close message box
        cy.get(".toast-message").click()
        cy.wait(1000)  
})
it ('Add data in all text fields for workinghours ',() => {
    //select field
    cy.get('#ddField').select('WORKINGHOURS')
    //fill data inside full day working h ourse
    cy.get('#FDHourFrom').clear()
    cy.get('#FDHourFrom').type('09')
    //
    cy.get('#FDMinFrom').clear()
    cy.get('#FDMinFrom').type('30')
    //
    cy.get('#FDHourTo').clear()
    cy.get('#FDHourTo').type('06')
    //
    cy.get('#FDMinTo').clear()
    cy.get('#FDMinTo').type('30')
    //select leave name
    cy.get('#FDLeaveName').select('LOSS OF PAY DAYS')

    //put data for halfday working houres
    cy.get('#HDHourFrom').clear()
    cy.get('#HDHourFrom').type('09')
    //
    cy.get('#HDMinFrom').clear()
    cy.get('#HDMinFrom').type('30')
    //
    cy.get('#HDHourTo').clear()
    cy.get('#HDHourTo').type('02')
    //
    cy.get('#HDMinTo').clear()
    cy.get('#HDMinTo').type('00')
    //select leave name 
    cy.get('#HDLeaveName').select('LOSS OF PAY DAYS')

    //click on save button
    cy.get('#btnSave').click()
    //verify validation message
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Data save successfully')
        })
        //click on message to close message box
        cy.get(".toast-message").click()
        cy.wait(1000)  

})
})

context ('Verify delete funcationality',() => {
it ('delete added data for punches field',() => {
     //select unpunches field
     cy.get('#ddField').select('UNPUNCHES')
     cy.wait(2000)
     //click on delete button
     cy.get('#btnDelete').click()
     cy.wait(1000)
})
it ('delete added data for working hourse field',() => {
    //select working hourse field
    cy.get('#ddField').select('WORKINGHOURS')
    cy.wait(2000)
    //click on delete button
    cy.get('#btnDelete').click()




})
})

})

