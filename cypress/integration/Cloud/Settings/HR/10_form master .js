describe('Form master page', () =>{
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

function DeleteRecord () {

    cy.get('.text-danger').eq(0).click();
    
    cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Settings Delete successfully.!')
    })	
    //click on message to close message box
    cy.get(".toast-message").click()
    cy.wait(1000)
}

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
context ('Verify form master tab',() => {
it ('verify form master tab is working or not',() => { 
    //click on asset list tab
    cy.get('#HR_FormMaster').click()
                
    cy.contains('Form Master').invoke('text').then((text) => {
    expect(text.trim()).equal('Form Master')
    })  
})
it ('verify Add report builder-forms button is working or not',() => { 
    
    cy.get('[class="fa fa-plus"]').eq(0).click()
    //verify asset list pop-up will open or not
    cy.contains('Form Master').invoke('text').then((text) => {
    expect(text.trim()).equal('Form Master')
    })  
})    
})


context ('Verify validation message',() => {
it('can verify validation  message for form name field', () => {
        //click on submit button
        cy.get('#sbtBtn').click()
        //verify validation message
        cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Please enter Form Name.')
        //click on message to close message box
        cy.get(".toast-message").click()
        cy.wait(2000)   
         })

        //filldata inside order field 
        cy.get('#insOrder').clear()       
        cy.get('#insOrder').type(1)
        //filldata inside form name text field
        cy.get('#insFormName').clear()
        cy.get('#insFormName').type('t')
       
         //click on submit button
        cy.get('#sbtBtn').click()
        //verify validation message
        cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Settings saved successfully.!')
        //click on message to close message box
        cy.get(".toast-message").click()
        cy.wait(2000)
         })
})
it('can verify validation  message for duplicate order number field', () => {
        cy.get('[class="fa fa-plus"]').eq(0).click()
        //filldata inside form name text field
        cy.get('#insFormName').clear()
        cy.get('#insFormName').type('shjkdgfg')
        //filldata inside order field 
        cy.get('#insOrder').clear()       
        cy.get('#insOrder').type(1)
        //click on submit button
        cy.get('#sbtBtn').click()
        //verify validation message
        cy.get(".toast-message").invoke('text').then((text) => {
        expect(text.trim()).equal('Order Number already Exists. Choose a different Order Number.')
        //click on message to close message box
        cy.get(".toast-message").click()
        cy.wait(2000)   
            })
})
it('can verify validation  message for duplicate form name field', () => {
    //cy.get('[class="fa fa-plus"]').eq(0).click()
    //filldata inside form name text field
    cy.get('#insFormName').clear()
    cy.get('#insFormName').type('t')
    //filldata inside order field 
    cy.get('#insOrder').clear()       
    cy.get('#insOrder').type(2)
    //click on submit button
    cy.get('#sbtBtn').click()
    //verify validation message
    cy.get(".toast-message").invoke('text').then((text) => {
    expect(text.trim()).equal('Form Name already Exists. input a different Form Name.')
    //click on message to close message box
    cy.get(".toast-message").click()
    cy.wait(2000)   
            })
})
it('can verify validation  message for order field', () => {
    //cy.get('[class="fa fa-plus"]').eq(0).click()
    //filldata inside form name text field
    cy.get('#insFormName').clear()
    cy.get('#insFormName').type('s')
    //filldata inside order field 
    cy.get('#insOrder').clear()       
    //cy.get('#insOrder').type(2)
    //click on submit button
    cy.get('#sbtBtn').click()
    //verify validation message
    cy.get(".toast-message").invoke('text').then((text) => {
    expect(text.trim()).equal('Order No cannot be Blank or 0.')
    //click on message to close message box
    cy.get(".toast-message").click()
    cy.wait(2000)   
    })
})
})


context ('Verify Add funcationality',() => {
it('can add all fields', () => {
    //select module name
    cy.get('#insFormModule').select('Travel')
    cy.get('#insFormName').clear()
    cy.get('#insFormName').type('declaration')
    cy.get('#insDescription').type('please read carefully and fill all mandatory fields')
    cy.get('#insOrder').clear()
    cy.get('#insOrder').type(2)
     //click on submit button
     cy.get('#sbtBtn').click()
     //verify validation message
     cy.get(".toast-message").invoke('text').then((text) => {
     expect(text.trim()).equal('Settings saved successfully.!')
     //click on message to close message box
     cy.get(".toast-message").click()
     cy.wait(2000)   
     })
})
it('can verify added data', () => {
    cy.contains('Module Name -Travel').invoke('text').then((text) => {
    expect(text.trim()).include("Module Name -Travel")
    }) 
    //
    cy.contains('Form Name - declaration').invoke('text').then((text) => {
    expect(text.trim()).include("Form Name - declaration")
    })
    //
    cy.contains('Description-please read carefully and fill all mandatory fields').invoke('text').then((text) => {
    expect(text.trim()).include("Description-please read carefully and fill all mandatory fields")
    }) 
    //
    cy.contains('Order- 2').invoke('text').then((text) => {
    expect(text.trim()).include("Order- 2")
    })  

})    
})


context ('Verify edit funcationality',() => {
it('can replace old data with new data', () => {
    cy.get('.fa-edit').eq(1).click()
    cy.get('#insFormName').clear()
    cy.get('#insFormName').type('declaration form')
    cy.get('#insDescription').clear()
    cy.get('#insDescription').type('please read carefully and fill all mandatory fields and give confirmation')
    //click on submit button
    cy.get('#sbtBtn').click()
    //verify validation message
    cy.get(".toast-message").invoke('text').then((text) => {
    expect(text.trim()).equal('Settings saved successfully.!')
    //click on message to close message box
    cy.get(".toast-message").click()
    cy.wait(2000)   
    })

})
it('can add all fields', () => {
    cy.get('[title="Form Creator"]').eq(0).click()
    cy.wait(1000)
    cy.get('.fa-plus').eq(0).click()
    //
    cy.get('#FieldType').select('DropDown')
    cy.get('#FieldName').type('VENUE')
    cy.get('#FieldValue').type('goa,gujrat,manali')
    cy.get('[name="FieldSize"]').type('venue')
    cy.get('#LabelName').type('VENUE')
    cy.get('#Order').type(4)
    cy.get('#FieldSize').type('2')
    cy.get('#PanelName').type('akash')
    cy.get('#sbtBtn').click()
    cy.wait(1000)
   // cy.get('.text-danger').eq(1).click();
    //cy.wait(2000)
    cy.get('#HR_FormMaster').click()

})
it('can verify updated data', () => {
    //
    cy.contains('declaration form').invoke('text').then((text) => {
        expect(text.trim()).include("declaration form")
    })
    
    cy.contains('please read carefully and fill all mandatory fields and give confirmation').invoke('text').then((text) => {
        expect(text.trim()).include("please read carefully and fill all mandatory fields and give confirmation")
    }) 
     
     cy.contains('Order- 2 ').invoke('text').then((text) => {
        expect(text.trim()).include("Order- 2")
    })
})
})


context ('Verify delete funcationality',() => {
it('can delete record', () => {

    DeleteRecord()
    DeleteRecord()
   // DeleteRecord()       
})
})  


context ('Form master - Flow',() => {
it('can add all fields', () => {
    //click on add button
    cy.get('[class="fa fa-plus"]').eq(0).click()
    //select module name
    cy.get('#insFormModule').select('Travel')
    cy.get('#insFormName').clear()
    cy.get('#insFormName').type('declaration')
    cy.get('#insDescription').type('please read carefully and fill all mandatory fields')
    cy.get('#insOrder').clear()
    cy.get('#insOrder').type(2)
     //click on submit button
     cy.get('#sbtBtn').click()
     //verify validation message
     cy.get(".toast-message").invoke('text').then((text) => {
     expect(text.trim()).equal('Settings saved successfully.!')
     //click on message to close message box
     cy.get(".toast-message").click()
     cy.wait(2000)   
     })
})
it('can add all fields', () => {
    //
    cy.get('#HR_FieldCreation').click()
    cy.wait(1000)
    cy.get('.text-danger').eq(1).click()
    cy.wait(1000)

})
})

})