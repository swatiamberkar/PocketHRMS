
	describe('Drill Down on Dashboard', function() {
	
	it('successfully page  loads', function() {
		 cy.clearLocalStorage() ;
		cy.window().then((win) => {
				win.sessionStorage.clear()
		})
        cy.clearCookies();
	//	cy.visit(Cypress.env('url')) 
	})
	
	beforeEach(function(){
        cy.getCookies()
	})
	
	it('Pocket HRMS Login', function() {
		cy.login()
	})
		
	it('Change Company', function() {	
	
		cy.changeCompany()	 	
	})


/*	it('Verify Drill Down Name & Count of Active Employees', function() {
		const { softAssert, softExpect } = chai;
		cy.wait(2000)
		
		 cy.get('.logo-sm').click({force: true})
		 cy.wait(10000)
		 
		  cy.xpath("//h2[@class='ml-auto mr-auto text-nowrap getTotalActiveEmployees']").invoke('text').then((TotalCount) => {
			cy.xpath("//h4[contains(text(),'Active Employees')]").click({force: true})
    cy.wait(2000)
	
	 cy.get("#drillModalLabelSpan").invoke('text').then((DrillDownName) => {
		 
		 softExpect(DrillDownName.trim()).to.eq('Active Employees');
	 })
	 
	 cy.get("#drillModalTotalSpan").invoke('text').then((DrillDownTotal) => {
		 
		 softExpect(DrillDownTotal.trim()).to.contains(TotalCount.trim());
	 })
			
		  })
		  })
		  
	it('Verify Drill Down Count with Employee Tiles of Active Employees', function() {
		const { softAssert, softExpect } = chai;
		cy.wait(2000)
	
	 cy.get("#drillModalTotalSpan").invoke('text').then((DrillDownTotal) => {
		 
		 
		cy.get('#partialPlaceholder > div')
  .find('.col-sm-3')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	
		 var TotalCount = listingCount.toString();
		 
		 softExpect(DrillDownTotal.trim()).to.contains(TotalCount);
	 })
			
			
		  })	
		
	})
	
	it('Verify Employee Profile by selecting Employee Tile of Active Employees', function() {
		const { softAssert, softExpect } = chai;
		cy.wait(2000)
	
	
	 cy.xpath("//div[@id='partialPlaceholder']/div/div//p[1]").eq(0).invoke('text').then((id) => {
		 
	cy.xpath("//div[@id='partialPlaceholder']/div/div//p[1]").eq(0).click({force: true})
	
	cy.wait(5000)
	 cy.xpath("//div[@class='row ml-0']//p").invoke('text').then((empId) => {
	
		 
		 softExpect(id.trim()).to.eq(empId.trim());
	 })
				
  })	
		
	})
		
	it('Verify Drill Down Name & Count of Inactive Employees', function() {
		const { softAssert, softExpect } = chai;
		cy.wait(2000)
		
		 cy.get('.logo-sm').click({force: true})
		 cy.wait(10000)
		 
		  cy.xpath("//h2[@class='mt-0 getTotalInActiveEmployees']").invoke('text').then((TotalCount) => {
			   cy.wait(2000)
			cy.xpath("//h4[contains(text(),'Inactive Employees')]").click({force: true})
    cy.wait(2000)
	
	 cy.get("#drillModalLabelSpan").invoke('text').then((DrillDownName) => {
		 
		 softExpect(DrillDownName.trim()).to.eq('InActive Employees');
	 })
	 
	 cy.get("#drillModalTotalSpan").invoke('text').then((DrillDownTotal) => {
		 
		 softExpect(DrillDownTotal.trim()).to.contains(TotalCount.trim());
	 })
			
		  })
		  })
		  
	it('Verify Drill Down Count with Employee Tiles of Inactive Employees', function() {
		const { softAssert, softExpect } = chai;
		cy.wait(2000)
	
	 cy.get("#drillModalTotalSpan").invoke('text').then((DrillDownTotal) => {
		 
		 
		cy.get('#partialPlaceholder > div')
  .find('.col-sm-3')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	
		 var TotalCount = listingCount.toString();
		 
		 softExpect(DrillDownTotal.trim()).to.contains(TotalCount);
	 })
			
			
		  })	
		
	})
	
	it('Verify Employee Profile by selecting Employee Tile of Inactive Employees', function() {
		const { softAssert, softExpect } = chai;
		cy.wait(2000)
	
	
	 cy.xpath("//div[@id='partialPlaceholder']/div/div//p[1]").eq(0).invoke('text').then((id) => {
		 
	cy.xpath("//div[@id='partialPlaceholder']/div/div//p[1]").eq(0).click({force: true})
	
	cy.wait(5000)
	 cy.xpath("//div[@class='row ml-0']//p").invoke('text').then((empId) => {
	
		 
		 softExpect(id.trim()).to.eq(empId.trim());
	 })
				
  })	
		
	})
	
	it('Verify Drill Down Name & Count of Emp Joined Last 12 Months', function() {
		const { softAssert, softExpect } = chai;
		cy.wait(2000)
		
		 cy.get('.logo-sm').click({force: true})
		 cy.wait(10000)
		 
		  cy.xpath("//h2[@class='mt-4 empjoinedlastmonth']").invoke('text').then((TotalCount) => {
			  cy.log("TotalCount: "+TotalCount)
			   cy.wait(2000)
			cy.xpath("//h4[contains(text(),'Emp Joined Last 12 Months')]").click({force: true})
    cy.wait(2000)
	
	 cy.get("#drillModalLabelSpan").invoke('text').then((DrillDownName) => {
		 
		 softExpect(DrillDownName.trim()).to.eq('Emp Joined Last 12 Months');
	 })
	 
	 cy.get("#drillModalTotalSpan").invoke('text').then((DrillDownTotal) => {
		 
		 softExpect(DrillDownTotal.trim()).to.contains(TotalCount)
	 })
			
		  })
		  })
		  
	it('Verify Drill Down Count with Employee Tiles of Emp Joined Last 12 Months', function() {
		const { softAssert, softExpect } = chai;
		cy.wait(2000)
	
	 cy.get("#drillModalTotalSpan").invoke('text').then((DrillDownTotal) => {
		 
		 
		cy.get('#partialPlaceholder > div')
  .find('.col-sm-3')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	
		 var TotalCount = listingCount.toString();
		 
		 softExpect(DrillDownTotal.trim()).to.contains(TotalCount);
	 })
			
			
		  })	
		
	})
	
	it('Verify Employee Profile by selecting Employee Tile of Emp Joined Last 12 Months', function() {
		const { softAssert, softExpect } = chai;
		cy.wait(2000)
	
	
	 cy.xpath("//div[@id='partialPlaceholder']/div/div//p[1]").eq(0).invoke('text').then((id) => {
		 
	cy.xpath("//div[@id='partialPlaceholder']/div/div//p[1]").eq(0).click({force: true})
	
	cy.wait(5000)
	 cy.xpath("//div[@class='row ml-0']//p").invoke('text').then((empId) => {
	
		 
		 softExpect(id.trim()).to.eq(empId.trim());
	 })
				
  })	
		
	})

	it('Verify Drill Down Name & Count of Emp Separated Last 12 Months', function() {
		const { softAssert, softExpect } = chai;
		cy.wait(2000)
		
		 cy.get('.logo-sm').click({force: true})
		 cy.wait(10000)
		 
		  cy.xpath("//h2[@class='mt-0 empseparatedlastmonth']").invoke('text').then((TotalCount) => {
			cy.xpath("//h4[contains(text(),'Emp Separated Last 12 Months')]").click({force: true})
    cy.wait(2000)
	
	 cy.get("#drillModalLabelSpan").invoke('text').then((DrillDownName) => {
		 
		 softExpect(DrillDownName.trim()).to.eq('Emp Separated Last 12 Months');
	 })
	 
	 cy.get("#drillModalTotalSpan").invoke('text').then((DrillDownTotal) => {
		 
		 softExpect(DrillDownTotal.trim()).to.contains(TotalCount.trim());
	 })
			
		  })
		  })
		  
	it('Verify Drill Down Count with Employee Tiles of Emp Separated Last 12 Months', function() {
		const { softAssert, softExpect } = chai;
		cy.wait(2000)
	
	 cy.get(".empseparatedlastmonth").invoke('text').then((DrillDownTotal) => {
		 cy.log('DrillDownTotal:'+DrillDownTotal)
		 
		 if (DrillDownTotal.trim() === "0" ) 
		//if(softExpect(DrillDownTotal.trim()).to.eq('0'))	 
		 {
			 cy.get(".alert-warning").invoke('text').then((NoRecord) => {
		 
				softExpect(NoRecord.trim()).to.contains('No Records Found.')
			})
		 }
		 else
		 {
		 
		cy.get('#partialPlaceholder > div')
  .find('.col-sm-3')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	
		 var TotalCount = listingCount.toString();
		 
		 softExpect(DrillDownTotal.trim()).to.contains(TotalCount);
	 })
			
		 }
		  })	
		
	})
	
	it('Verify Employee Profile by selecting Employee Tile of Emp Separated Last 12 Months', function() {
		const { softAssert, softExpect } = chai;
		cy.wait(2000)
	
	cy.get(".empseparatedlastmonth").invoke('text').then((DrillDownTotal) => {
		 cy.log('DrillDownTotal:'+DrillDownTotal)
		 
		 if (DrillDownTotal.trim() === "0" )	 
		 {
			 cy.get(".alert-warning").invoke('text').then((NoRecord) => {
		 
				softExpect(NoRecord.trim()).to.contains('No Records Found.')
			})
		 }
		 else
		 {
	
	 cy.xpath("//div[@id='partialPlaceholder']/div/div//p[1]").eq(0).invoke('text').then((id) => {
		 
	cy.xpath("//div[@id='partialPlaceholder']/div/div//p[1]").eq(0).click({force: true})
	
	cy.wait(5000)
	 cy.xpath("//div[@class='row ml-0']//p").invoke('text').then((empId) => {
	
		 
		 softExpect(id.trim()).to.eq(empId.trim());
	 })
				
  })	
	
		 }	
	})
	})
		
	it('Verify Drill Down Name & Count of Employee Present Today', function() {
		const { softAssert, softExpect } = chai;
		cy.wait(2000)
		
		 cy.get('.logo-sm').click({force: true})
		 cy.wait(10000)
		 
		  cy.xpath("//h2[@class='mt-0 PresentToday']").invoke('text').then((TotalCount) => {
			   cy.wait(2000)
			cy.xpath("//h4[contains(text(),'Employee Present Today')]").click({force: true})
    cy.wait(2000)
	
	 cy.get("#drillModalLabelSpan").invoke('text').then((DrillDownName) => {
		 
		 softExpect(DrillDownName.trim()).to.eq('Employee Present Today');
	 })
	 
	 cy.get("#drillModalTotalSpan").invoke('text').then((DrillDownTotal) => {
		 
		 softExpect(DrillDownTotal.trim()).to.contains(TotalCount.trim());
	 })
			
		  })
	})
		  
	it('Verify Drill Down Count with Employee Tiles of Employee Present Today', function() {
		const { softAssert, softExpect } = chai;
		cy.wait(2000)
	
	 cy.get("#drillModalTotalSpan").invoke('text').then((DrillDownTotal) => {
		 
		 
		cy.get('#partialPlaceholder > div')
  .find('.col-sm-3')
  .then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	
		 var TotalCount = listingCount.toString();
		 
		 softExpect(DrillDownTotal.trim()).to.contains(TotalCount);
	 })
			
			
		  })	
		
	})
	
	it('Verify Employee Profile by selecting Employee Tile of Employee Present Today', function() {
		const { softAssert, softExpect } = chai;
		cy.wait(2000)
	
	
	 cy.xpath("//div[@id='partialPlaceholder']/div/div//p[1]").eq(0).invoke('text').then((id) => {
		 
	cy.xpath("//div[@id='partialPlaceholder']/div/div//p[1]").eq(0).click({force: true})
	
	cy.wait(5000)
	 cy.xpath("//div[@class='row ml-0']//p").invoke('text').then((empId) => {
	
		 
		 softExpect(id.trim()).to.eq(empId.trim());
	 })
				
  })	
		
	})

*/

	it('Verify Drill Down Name & Count of Employee Absent Today', function() {
		const { softAssert, softExpect } = chai;
		cy.wait(2000)
		
		 cy.get('.logo-sm').click({force: true})
		 cy.wait(10000)
		 
		  cy.xpath("//h2[@class='mt-0 AbsentToday']").invoke('text').then((TotalCount) => {
			  cy.log("TotalCount: "+TotalCount)
			   cy.wait(2000)
			cy.xpath("//h4[contains(text(),'Employee Absent Today')]").click({force: true})
    cy.wait(2000)
	
	 cy.get("#drillModalLabelSpan").invoke('text').then((DrillDownName) => {
		 
		 softExpect(DrillDownName.trim()).to.eq('Employee Absent Today');
	 })
	 
	 cy.get("#drillModalTotalSpan").invoke('text').then((DrillDownTotal) => {
		 
		 softExpect(DrillDownTotal.trim()).to.contains(TotalCount)
	 })
			
		  })
		  })
		  
	it('Verify Drill Down Count with Employee Tiles of Employee Absent Today', function() {
		const { softAssert, softExpect } = chai;
		cy.wait(2000)
	
		cy.get(".AbsentToday").invoke('text').then((DrillDownTotal) => {
		 cy.log('DrillDownTotal:'+DrillDownTotal)
		 
		 
		 if (DrillDownTotal.trim() === "0" )
			 
		 
	
		 {
			 cy.get(".alert-warning").invoke('text').then((NoRecord) => {
		 
				softExpect(NoRecord.trim()).to.contains('No Records Found.')
			})
		 }
		 else
		 {
			 
		cy.get(".AbsentToday").invoke('text').then((DrillDownTotal) => {	 
		cy.get('#partialPlaceholder > div')
	.find('.col-sm-3')
	.then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	
		 var TotalCount = listingCount.toString();
		 
		 softExpect(DrillDownTotal.trim()).to.contains(TotalCount);
	 })
			
			
		  })	
		  
		  }
	 })
		
	})
	
	it('Verify Employee Profile by selecting Employee Tile of Employee Absent Today', function() {
		const { softAssert, softExpect } = chai;
		cy.wait(2000)
	
	cy.get(".AbsentToday").invoke('text').then((DrillDownTotal) => {
		 cy.log('DrillDownTotal:'+DrillDownTotal)
		 
		
		 if (DrillDownTotal.trim() === "0" )
			 
		 
	
		 {
			 cy.get(".alert-warning").invoke('text').then((NoRecord) => {
		 
				softExpect(NoRecord.trim()).to.contains('No Records Found.')
			})
		 }
		 else
		 {
			 
	 cy.xpath("//div[@id='partialPlaceholder']/div/div//p[1]").eq(0).invoke('text').then((id) => {
		 
	cy.xpath("//div[@id='partialPlaceholder']/div/div//p[1]").eq(0).click({force: true})
	
	cy.wait(5000)
	 cy.xpath("//div[@class='row ml-0']//p").invoke('text').then((empId) => {
	
		 
		 softExpect(id.trim()).to.eq(empId.trim());
	 })
				
  })	
  }
	 })
		
	})


/*	it('Verify Drill Down Name & Count of Gender Distribution- Male', function() {
		const { softAssert, softExpect } = chai;
		cy.wait(2000)
		 cy.get('.logo-sm').click({force: true})
		 cy.wait(10000)
		 cy.xpath("//h4[contains(text(),'Gender Distribution')]").click({force: true})
		 cy.wait(3000)
		 
		  cy.get('.malecount').invoke('text').then((TotalCount) => {
			  cy.log("TotalCount: "+TotalCount)
			   cy.wait(2000)
			cy.get('[seriesName="Male"]>path').click({force: true})
    cy.wait(2000)
	
	 cy.get("#drillModalLabelSpan").invoke('text').then((DrillDownName) => {
		 
		 softExpect(DrillDownName.trim()).to.eq('GENDER (Male)');
	 })
	 
	 cy.get("#drillModalTotalSpan").invoke('text').then((DrillDownTotal) => {
		 
		 softExpect(DrillDownTotal.trim()).to.contains(TotalCount)
	 })
			
		  })
	})
		  
	it('Verify Drill Down Count with Employee Tiles of Gender Distribution- Male', function() {
		const { softAssert, softExpect } = chai;
		cy.wait(2000)
	
		cy.get(".malecount").invoke('text').then((DrillDownTotal) => {
		 cy.log('DrillDownTotal:'+DrillDownTotal)
		 
		
			 
		cy.get(".malecount").invoke('text').then((DrillDownTotal) => {	 
		cy.get('#partialPlaceholder > div')
	.find('.col-sm-3')
	.then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	
		 var TotalCount = listingCount.toString();
		 
		 softExpect(DrillDownTotal.trim()).to.contains(TotalCount);
	 })
			
			
		  })	
		  
		  
	 })
		
	})
	
	it('Verify Employee Profile by selecting Employee Tile of Gender Distribution- Male', function() {
		const { softAssert, softExpect } = chai;
		cy.wait(2000)
	
	cy.get("#drillModalTotalSpan").invoke('text').then((DrillDownTotal) => {
		 cy.log('DrillDownTotal:'+DrillDownTotal)
		 
		 
	 cy.xpath("//div[@id='partialPlaceholder']/div/div//p[1]").eq(0).invoke('text').then((id) => {
		 
	cy.xpath("//div[@id='partialPlaceholder']/div/div//p[1]").eq(0).click({force: true})
	
	cy.wait(5000)
	 cy.xpath("//div[@class='row ml-0']//p").invoke('text').then((empId) => {
	
		 
		 softExpect(id.trim()).to.eq(empId.trim());
	 })
				
  })	
  
	 })
		
	})
	
	it('Verify Drill Down Name & Count of Gender Distribution- Female', function() {
		const { softAssert, softExpect } = chai;
		cy.wait(2000)
		 cy.get('.logo-sm').click({force: true})
		 cy.wait(10000)
		 cy.xpath("//h4[contains(text(),'Gender Distribution')]").click({force: true})
		 cy.wait(3000)
		 
		  cy.get('.femalecount').invoke('text').then((TotalCount) => {
			  cy.log("TotalCount: "+TotalCount)
			   cy.wait(2000)
			cy.get('[seriesName="Female"]>path').click({force: true})
    cy.wait(2000)
	
	 cy.get("#drillModalLabelSpan").invoke('text').then((DrillDownName) => {
		 
		 softExpect(DrillDownName.trim()).to.eq('GENDER (Female)');
	 })
	 
	 cy.get("#drillModalTotalSpan").invoke('text').then((DrillDownTotal) => {
		 
		 softExpect(DrillDownTotal.trim()).to.contains(TotalCount)
	 })
			
		  })
	})
		  
	it('Verify Drill Down Count with Employee Tiles of Gender Distribution- Female', function() {
		const { softAssert, softExpect } = chai;
		cy.wait(2000)
	
		cy.get(".femalecount").invoke('text').then((DrillDownTotal) => {
		 cy.log('DrillDownTotal:'+DrillDownTotal)
		 
		
			 
		cy.get(".femalecount").invoke('text').then((DrillDownTotal) => {	 
		cy.get('#partialPlaceholder > div')
	.find('.col-sm-3')
	.then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	
		 var TotalCount = listingCount.toString();
		 
		 softExpect(DrillDownTotal.trim()).to.contains(TotalCount);
	 })
			
			
		  })	
		  
		  
	 })
		
	})
	
	it('Verify Employee Profile by selecting Employee Tile of Gender Distribution- Female', function() {
		const { softAssert, softExpect } = chai;
		cy.wait(2000)
	
	cy.get("#drillModalTotalSpan").invoke('text').then((DrillDownTotal) => {
		 cy.log('DrillDownTotal:'+DrillDownTotal)
		 
		 
	 cy.xpath("//div[@id='partialPlaceholder']/div/div//p[1]").eq(0).invoke('text').then((id) => {
		 
	cy.xpath("//div[@id='partialPlaceholder']/div/div//p[1]").eq(0).click({force: true})
	
	cy.wait(5000)
	 cy.xpath("//div[@class='row ml-0']//p").invoke('text').then((empId) => {
	
		 
		 softExpect(id.trim()).to.eq(empId.trim());
	 })
				
  })	
  
	 })
		
	})
*/

/*	it('Verify Drill Down Name & Count of Gender Distribution- Male', function() {
		const { softAssert, softExpect } = chai;
		cy.wait(2000)
		 cy.get('.logo-sm').click({force: true})
		 cy.wait(10000)
		 
		 cy.xpath("//h4[contains(text(),'Employee Count By Category')]").click({force: true})
		 cy.wait(3000)

		cy.xpath('//div[@id="empcountbycategory"]//*[name()="svg"]/*[name()="g"][2]/*[name()="g"][4]//*[name()="path"][2]').invoke('val')
  .then(TotalCount =>
  {
    const someText = TotalCount;
    cy.log(someText);
  cy.log(TotalCount);
  
  cy.xpath('//div[@id="empcountbycategory"]//*[name()="svg"]/*[name()="g"][2]/*[name()="g"][4]//*[name()="path"][2]').within((val) => {
            //cy.get("val").then($val => {
                cy.log("Text : "+val);
            //});
			
  })
			//softExpect($input.val()).to.eq(ConfirmationPeriod_Month);			
		
		  cy.xpath('//div[@id="empcountbycategory"]//*[name()="svg"]/*[name()="g"][2]/*[name()="g"][4]//*[name()="path"][2]').click({force: true})
    cy.wait(2000)
	
  
	 cy.get("#drillModalLabelSpan").invoke('text').then((DrillDownName) => {
		 
		 softExpect(DrillDownName.trim()).to.eq('GENDER (Male)');
	 })
	 
	 cy.get("#drillModalTotalSpan").invoke('text').then((DrillDownTotal) => {
		 
		 softExpect(DrillDownTotal.trim()).to.contains(TotalCount)
	 })
			
		  })
	})
		  
	it('Verify Drill Down Count with Employee Tiles of Gender Distribution- Male', function() {
		const { softAssert, softExpect } = chai;
		cy.wait(2000)
	
		cy.get(".femalecount").invoke('text').then((DrillDownTotal) => {
		 cy.log('DrillDownTotal:'+DrillDownTotal)
		 
		
			 
		cy.get(".femalecount").invoke('text').then((DrillDownTotal) => {	 
		cy.get('#partialPlaceholder > div')
	.find('.col-sm-3')
	.then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	
		 var TotalCount = listingCount.toString();
		 
		 softExpect(DrillDownTotal.trim()).to.contains(TotalCount);
	 })
			
			
		  })	
		  
		  
	 })
		
	})
	
	it('Verify Employee Profile by selecting Employee Tile of Gender Distribution- Male', function() {
		const { softAssert, softExpect } = chai;
		cy.wait(2000)
	
	cy.get("#drillModalTotalSpan").invoke('text').then((DrillDownTotal) => {
		 cy.log('DrillDownTotal:'+DrillDownTotal)
		 
		 
	 cy.xpath("//div[@id='partialPlaceholder']/div/div//p[1]").eq(0).invoke('text').then((id) => {
		 
	cy.xpath("//div[@id='partialPlaceholder']/div/div//p[1]").eq(0).click({force: true})
	
	cy.wait(5000)
	 cy.xpath("//div[@class='row ml-0']//p").invoke('text').then((empId) => {
	
		 
		 softExpect(id.trim()).to.eq(empId.trim());
	 })
				
  })	
  
	 })
		
	})
	
	it('Verify Drill Down Name & Count of Gender Distribution- Female', function() {
		const { softAssert, softExpect } = chai;
		cy.wait(2000)
		 cy.get('.logo-sm').click({force: true})
		 cy.wait(10000)
		 cy.xpath("//h4[contains(text(),'Gender Distribution')]").click({force: true})
		 cy.wait(3000)
		 
		  cy.get('.malecount').invoke('text').then((TotalCount) => {
			  cy.log("TotalCount: "+TotalCount)
			   cy.wait(2000)
			cy.get('[seriesName="Female"]>path').click({force: true})
    cy.wait(2000)
	
	 cy.get("#drillModalLabelSpan").invoke('text').then((DrillDownName) => {
		 
		 softExpect(DrillDownName.trim()).to.eq('GENDER (Female)');
	 })
	 
	 cy.get("#drillModalTotalSpan").invoke('text').then((DrillDownTotal) => {
		 
		 softExpect(DrillDownTotal.trim()).to.contains(TotalCount)
	 })
			
		  })
	})
		  
	it('Verify Drill Down Count with Employee Tiles of Gender Distribution- Female', function() {
		const { softAssert, softExpect } = chai;
		cy.wait(2000)
	
		cy.get(".malecount").invoke('text').then((DrillDownTotal) => {
		 cy.log('DrillDownTotal:'+DrillDownTotal)
		 
		
			 
		cy.get(".malecount").invoke('text').then((DrillDownTotal) => {	 
		cy.get('#partialPlaceholder > div')
	.find('.col-sm-3')
	.then(listing => {
    const listingCount = Cypress.$(listing).length;
	cy.log(listingCount)
	
		 var TotalCount = listingCount.toString();
		 
		 softExpect(DrillDownTotal.trim()).to.contains(TotalCount);
	 })
			
			
		  })	
		  
		  
	 })
		
	})
	
	it('Verify Employee Profile by selecting Employee Tile of Gender Distribution- Female', function() {
		const { softAssert, softExpect } = chai;
		cy.wait(2000)
	
	cy.get("#drillModalTotalSpan").invoke('text').then((DrillDownTotal) => {
		 cy.log('DrillDownTotal:'+DrillDownTotal)
		 
		 
	 cy.xpath("//div[@id='partialPlaceholder']/div/div//p[1]").eq(0).invoke('text').then((id) => {
		 
	cy.xpath("//div[@id='partialPlaceholder']/div/div//p[1]").eq(0).click({force: true})
	
	cy.wait(5000)
	 cy.xpath("//div[@class='row ml-0']//p").invoke('text').then((empId) => {
	
		 
		 softExpect(id.trim()).to.eq(empId.trim());
	 })
				
  })	
  
	 })
		
	})
*/	
})