

class Leave {

	constructor() {

	}

    applyLeave(employeeID,EmployeeFirstName,EmployeeLastName, managerID,
		ManagerFirstName, ManagerLastName, leaveType, leaveTypeValue, leaveFromDate, leaveToDate, todayDate, employeeJoiningDate, 
		 leaveFromDayType, leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
		 APPROVERS, STATUS, MANAGERREMARKS, ReliverSetting, leaveDay)	{

        const { softAssert, softExpect , softTrue} = chai;
        cy.visit(Cypress.env('essUrl')+'Leave/Transaction/LeaveRequest?Menu=leave')

		cy.wait(3000)	
		cy.get('#drpLeaveType').select(leaveType)
		cy.wait(500)

		if(ReliverSetting == 'Yes')
		{
		cy.get('#select2-multiEmp-container').click({ force: true })
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(ReliverCode)
		cy.contains('li', '['+ReliverCode+']').click({ force: true })
		}

		cy.get('#txtFromDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(leaveFromDate)
		})

        cy.get('#txtReason').click({force: true})
		
		cy.get('#txtToDate').click().then(input => {
				input[0].dispatchEvent(new Event('input', { bubbles: true }))
				input.val(leaveToDate)
		})
			
        cy.get('#txtReason').click({force: true})
		cy.get('#txtReason').type(Reason)

		cy.get('#drpLeaveStation').select(LeaveStation,{force: true})
		
		cy.get('#txtAddress').click({force: true})
		cy.get('#txtAddress').type(VacationAddress)
		cy.get('#txtContact').click({force: true})
		cy.get('#txtContact').type(ContactNumber)


		cy.get('#btnAdd').click({force: true})

              cy.get('[data-title="From Date"]').should('have.text', leaveFromDate);
              cy.get('[data-title="Half/Full Day"]').eq(0).should('have.text', leaveFromDayType);
              
             // cy.get('#tblLeave > tbody > tr > :nth-child(2)').should('have.text', leaveFromDayType);
              cy.get('[data-title="To Date"]').should('have.text', leaveToDate);
              cy.get('[data-title="Half/Full Day"]').eq(1).should('have.text', leaveFromDayType);

             // cy.get('#tblLeave > tbody > tr > :nth-child(4)').should('have.text', leaveToDayType);
              cy.get('.days').should('have.text', leaveDay);
              cy.get('[data-title="Leave Type"]').should('have.text', leaveType);
              cy.get('#btnConfirm').click();

              cy.get('.noty_body').should('have.text', "Leave Applied Successfully!!!");

		        cy.wait(2000)

      	  cy.xpath("//form[@id='UnapprovedLeaveForm']//tbody/tr[1]/td[1]/span").invoke('text').then((text) => {
            softExpect(text.trim()).to.eq('Pending');
            })

           cy.xpath("//form[@id='UnapprovedLeaveForm']//tbody/tr[1]/td[2]").invoke('text').then((text) => {
            softExpect(text.trim()).to.eq(leaveFromDate);
           })

        cy.xpath("//form[@id='UnapprovedLeaveForm']//tbody/tr[1]/td[3]").invoke('text').then((text) => {
            softExpect(text.trim().toLowerCase()).to.eq(leaveFromDayType.replace(/ +/g, "").trim().toLowerCase());
            })

            cy.xpath("//form[@id='UnapprovedLeaveForm']//tbody/tr[1]/td[4]").invoke('text').then((text) => {
                softExpect(text.trim()).to.eq(leaveToDate);
               })

             cy.xpath("//form[@id='UnapprovedLeaveForm']//tbody/tr[1]/td[5]").invoke('text').then((text) => {
            softExpect(text.trim().toLowerCase()).to.eq(leaveFromDayType.replace(/ +/g, "").trim().toLowerCase());
            })

            cy.xpath("//form[@id='UnapprovedLeaveForm']//tbody/tr[1]/td[6]").invoke('text').then((text) => {
                softExpect(text.trim()).to.eq(leaveDay);
               })

               cy.xpath("//form[@id='UnapprovedLeaveForm']//tbody/tr[1]/td[7]").invoke('text').then((text) => {
                softExpect(text.trim()).to.eq(leaveType);
               })


}   

	verifyLeaveDetails(employeeID,EmployeeFirstName,EmployeeLastName, managerID,
	ManagerFirstName, ManagerLastName, leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, todayDate, Designation, Department, employeeJoiningDate, 
	 leaveFromDayType, leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
	 APPROVERS, STATUS, MANAGERREMARKS, ReliverSetting, leaveDay)	{
	

		   cy.get('.form-horizontal > :nth-child(1) > :nth-child(1) > :nth-child(2)').invoke('text').then((EmployeeName) => {	
			expect(EmployeeName.trim()).to.contains(EmployeeFirstName +" "+ EmployeeLastName)
			}) 

			cy.get('.form-horizontal > :nth-child(2) > :nth-child(1) > :nth-child(2)').invoke('text').then((ManagerName) => {
				expect(ManagerName.trim()).to.contains(ManagerFirstName + ManagerLastName)
				}) 
			
			cy.get('.form-horizontal > :nth-child(1) > :nth-child(2) > :nth-child(2)').invoke('text').then((EmployeeID) => {	
				expect(EmployeeID.trim()).to.contains(employeeID)
				}) 
					
			cy.get('.form-horizontal > :nth-child(2) > :nth-child(2) > :nth-child(2)') .invoke('text').then((Designation) => {
					expect(Designation.trim()).to.contains(Designation.trim())
					}) 

			cy.get('.form-horizontal > :nth-child(1) > :nth-child(3) > :nth-child(2)') .invoke('text').then((Department) => {
						expect(Department.trim()).to.contains(Department.trim())
						}) 


		  cy.get('.form-horizontal > :nth-child(2) > :nth-child(3) > :nth-child(2)') .invoke('text').then((EmployeeJoiningDate) => {
			 expect(EmployeeJoiningDate.trim()).to.contains(employeeJoiningDate.trim())
			 }) 

		 cy.get('.form-horizontal > :nth-child(1) > :nth-child(4) > :nth-child(2)') .invoke('text').then((TodayDate) => {
			expect(TodayDate.trim()).to.contains(todayDate)
			}) 
			
			cy.get('.form-horizontal > :nth-child(2) > :nth-child(4) > :nth-child(2)') .invoke('text').then((LeaveTypeValue) => {
				expect(LeaveTypeValue.trim()).to.contains(leaveTypeValue)
				}) 

				cy.get('.form-horizontal > :nth-child(2) > :nth-child(4) > :nth-child(2)') .invoke('text').then((Balance) => {
					expect(Balance.trim()).to.contains(balance)
					}) 


		 cy.get('.form-horizontal > :nth-child(3) > :nth-child(1) > :nth-child(2)') .invoke('text').then((LeaveFromDay) => {
			cy.log(LeaveFromDay.trim())
			var data = LeaveFromDay.trim()	
			var date =data.slice(0, 11);
			cy.log(date)
			var type =data.slice(11, 18);
			cy.log(type)
			
			expect(date.trim()).to.contains(leaveFromDate)
			expect(type.trim().toLowerCase()).to.contains(leaveFromDayType.replace(/ +/g, "").trim().toLowerCase())
			}) 
			

		 cy.get('.form-horizontal > :nth-child(3) > :nth-child(2) > :nth-child(2)').invoke('text').then((LeaveToDay) => {

			cy.log(LeaveToDay.trim())
			var data = LeaveToDay.trim()
			var date =data.slice(0, 11);
			cy.log(date)
			var type =data.slice(11, 18);
			cy.log(type)
			
			expect(date.trim()).to.contains(leaveToDate)
			expect(type.trim().toLowerCase()).to.contains(leaveToDayType.replace(/ +/g, "").trim().toLowerCase())


			//expect(text.trim()).to.contains(leaveToDate +" "+leaveToDayType.replace(/ +/g, "").trim().toLowerCase())
			}) 

			cy.get('.form-horizontal > :nth-child(4) > :nth-child(1) > :nth-child(2)').invoke('text').then((text) => {
			expect(text.trim()).to.contains(Reason)
			}) 

			cy.get('.form-horizontal > :nth-child(4) > :nth-child(2) > :nth-child(2)').invoke('text').then((text) => {
				expect(text.trim()).to.contains(LeaveStation)
				})

			cy.get('.form-horizontal > :nth-child(3) > :nth-child(3) > :nth-child(2)').invoke('text').then((text) => {
			expect(text.trim()).to.contains(VacationAddress)
			}) 

			cy.get(':nth-child(4) > :nth-child(3) > :nth-child(2)').invoke('text').then((text) => {
				expect(text.trim()).to.contains(ContactNumber)
				}) 

				if(ReliverSetting == 'Yes')
				{
				cy.get(':nth-child(3) > :nth-child(4) > :nth-child(2)').invoke('text').then((text) => {
				expect(text.trim()).to.contains(ReliverCode)
				}) 

				cy.get(':nth-child(4) > :nth-child(4) > :nth-child(2)').invoke('text').then((text) => {
				expect(text.trim()).to.contains(ReliverName)
				})

			}

		 cy.get('.mt-4 > tbody > tr > :nth-child(1)').invoke('text').then((text) => {
			expect(text.trim()).to.contains(APPROVERS)
			}) 

		
		 cy.get('.mt-4 > tbody > tr > :nth-child(2)').invoke('text').then((text) => {
			expect(text.trim()).to.contains(managerID)
			}) 

		cy.get('.mt-4 > tbody > tr > :nth-child(3)').invoke('text').then((text) => {
				expect(text.trim()).to.contains((ManagerFirstName + " "+ManagerLastName))
			}) 
		cy.get('.mt-4 > tbody > tr > :nth-child(4)').invoke('text').then((text) => {
					expect(text.trim()).to.contains(STATUS)
		}) 
		cy.get('.mt-4 > tbody > tr > :nth-child(5)').invoke('text').then((text) => {
						expect(text.trim()).to.contains(MANAGERREMARKS)
				}) 

}  
 
	verifyLeaveDetailsAtLeaveRequest(employeeID,EmployeeFirstName,EmployeeLastName, managerID,
		ManagerFirstName, ManagerLastName, leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, todayDate, Designation, Department, employeeJoiningDate, 
		 leaveFromDayType, leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
		 APPROVERS, STATUS, MANAGERREMARKS, ReliverSetting, leaveDay)	{
     
        cy.visit(Cypress.env('essUrl')+'Leave/Transaction/LeaveRequest?Menu=leave')
		cy.xpath("//button[contains(@onclick,'displayModal')]").click({force: true})

		this.verifyLeaveDetails(employeeID,EmployeeFirstName,EmployeeLastName, managerID,
			ManagerFirstName, ManagerLastName, leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, todayDate, Designation, Department, employeeJoiningDate, 
			 leaveFromDayType, leaveToDayType, Reason, LeaveStation,VacationAddress, ContactNumber, ReliverCode, ReliverName,
			 APPROVERS, STATUS, MANAGERREMARKS, ReliverSetting, leaveDay)
    }   
 
    verifyNotificationAtManager(employeeID) {
        var moment = require('moment');
         cy.get('#empCount').click();
         cy.wait(2000)


        const addTen = moment().add(10, 'minutes').calendar()
        var addTenMinutesTime = addTen.slice(8);

        const subtractTen = moment().subtract(10, 'minutes').calendar()
        var subtractTenMinutesTime = subtractTen.slice(8);

        const currentTime = moment().format('DD MMM yyyy')

        var beforeTenMinutes = currentTime + " " + subtractTenMinutesTime

        var afterTenMinutes = currentTime + " " + addTenMinutesTime

        const start = moment(beforeTenMinutes)
        const end = moment(afterTenMinutes)
        // display hours + minutes + AM|PM
        const f = 'DD MMM yyyy hh:mm A'


        cy.get('.content-body >h6').eq(0).invoke('text').then((title) => {
            cy.get('.content-body >p').eq(0).invoke('text').then((Note) => {
                cy.log("title: " + title)
                cy.log("Note: " + Note)
                expect(title.trim()).to.include('Leave Applied')
                expect(Note.trim()).to.include(employeeID)
                //softExpect(Note.trim()).to.contains(employeeID);	

                cy.get('.content-body >h6 >small').eq(0).should(($el) => {
                    const m = moment($el.text().trim())
                    expect(m.isBetween(start, end),
                        `${m.format(f)} should be between ${start.format(f)} and ${end.format(f)}`).to.be.true
                })

            })
        })

   
    }

    verifyRequstedLeaveDetailsAtManager(employeeID,EmployeeFirstName,EmployeeLastName, managerID,
		ManagerFirstName, ManagerLastName, leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, todayDate, Designation, Department, employeeJoiningDate, 
		 leaveFromDayType, leaveToDayType, Reason, LeaveStation, VacationAddress, ContactNumber, ReliverCode, ReliverName,
		 APPROVERS, STATUS, MANAGERREMARKS, ReliverSetting, leaveDay) {
      
        cy.visit(Cypress.env('essUrl')+'Leave/Transaction/LeaveApproval?Menu=leaveapprove')
		cy.wait(2000)	


		cy.get('#tblData > tbody > tr').each(function(row, i){	
			 			var num = parseFloat(i+1)	

			cy.get('#tblData > tbody > tr:nth-child('+num+')>td:nth-child(3)').invoke('text').then((EmpCode) => {
				expect(EmpCode.trim()).to.equal(employeeID)
			})  

					cy.get('#tblData > tbody > tr:nth-child('+num+')>td:nth-child(4)').invoke('text').then((EmpCode) => {
						expect(EmpCode.trim()).to.contains(EmployeeFirstName)
					}) 

					cy.get('#tblData > tbody > tr:nth-child('+num+')>td:nth-child(4)').invoke('text').then((EmpCode) => {
						expect(EmpCode.trim()).to.contains(EmployeeLastName)
					}) 

					cy.readFile('cypress/fixtures/Company.json').then((text) =>{
						text.forEach(function(entry) {	
										 
						var company = entry.comapnayname	

						cy.get('#tblData > tbody > tr:nth-child('+num+')>td:nth-child(5)').invoke('text').then((LeaveType) => {	
							expect(LeaveType.trim()).to.equal(company)
						})

						})	
					})

						cy.get('#tblData > tbody > tr:nth-child('+num+')>td:nth-child(7)').invoke('text').then((LeaveType) => {	
							expect(LeaveType.trim()).to.equal(leaveTypeValue)
						})   

					cy.get('#tblData > tbody > tr:nth-child('+num+')>td:nth-child(8)').invoke('text').then((LeaveDate) => {	
						expect(LeaveDate.trim()).to.equal(leaveFromDate)
						})  

						cy.get('#tblData > tbody > tr:nth-child('+num+')>td:nth-child(9)').invoke('text').then((LeaveDate) => {	
							expect(LeaveDate.trim()).to.equal(leaveToDate)
					})  

cy.get('.btn-primary').click({force: true})


this.verifyLeaveDetails(employeeID,EmployeeFirstName,EmployeeLastName, managerID,
	ManagerFirstName, ManagerLastName, leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, todayDate, Designation, Department, employeeJoiningDate, 
	 leaveFromDayType, leaveToDayType, Reason, LeaveStation,VacationAddress, ContactNumber, ReliverCode, ReliverName,
	 APPROVERS, STATUS, MANAGERREMARKS, ReliverSetting, leaveDay)			
	
	})
		

    }

    approveLeave(employeeID, leaveType, leaveTypeValue, leaveFromDate) {
        const { softAssert, softExpect, softTrue } = chai;
        cy.visit(Cypress.env('essUrl')+'Leave/Transaction/LeaveApproval?Menu=leaveapprove')
		cy.wait(2000)	
		cy.wait(2000)
		cy.get('#tblData > tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)	
		
			cy.log("num: "+num)
			//cy.wait(2000)	
			cy.get('#tblData > tbody > tr:nth-child('+num+')>td:nth-child(3)').invoke('text').then((EmpCode) => {
			cy.get('#tblData > tbody > tr:nth-child('+num+')>td:nth-child(7)').invoke('text').then((LeaveType) => {	
			cy.get('#tblData > tbody > tr:nth-child('+num+')>td:nth-child(8)').invoke('text').then((LeaveDate) => {		
			cy.log("EmpCode: "+EmpCode)
			cy.log("LeaveType: "+LeaveType)
			cy.log("LeaveDate: "+leaveFromDate)
			
			cy.get('#tblData > tbody').find('tr').then(listing => {
			const listingCount = Cypress.$(listing).length;
			expect(listing).to.have.length(listingCount);

			if (EmpCode.trim() == employeeID && LeaveType.trim() == leaveType || LeaveType.trim() == leaveTypeValue && LeaveDate.trim() == leaveFromDate)
			{
				cy.get('#tblData > tbody > tr:nth-child('+num+')>td:nth-child(12)>input').click({force: true})
				cy.xpath("//button[contains(text(),'Save')]").click({force: true})
                cy.wait(1000)
				cy.get(".noty_body").invoke('text').then((text) => {
		
				softExpect(text.trim()).to.eq("Records are processed in background, please wait!");
				
				cy.wait(2000)
			})
			}
			else if(num==listingCount)
		{
			cy.softAssert(true, false,'Same data not found in the table');
  			cy.softAssertAll();
		}
            });	
		})
			})
			})
			
		})


    }

    verifyLeaveInTeamReport(employeeID, leaveFromDate, leaveToDate) {
        const { softAssert, softExpect, softTrue } = chai;
		cy.wait(10000)
		cy.visit(Cypress.env('essUrl') +'Leave/TeamReport/MyTeamLeaveReport?Menu=leavedetails');
		cy.wait(500)

		
		cy.get('#StartDate').click().then(input => {
			input[0].dispatchEvent(new Event('input', { bubbles: true }))
			input.val(leaveFromDate)
	})

	
	cy.get('#EndDate').click().then(input => {
		input[0].dispatchEvent(new Event('input', { bubbles: true }))
		input.val(leaveToDate)
})


cy.get('#searchbtn').click();
cy.wait(5000)

			cy.xpath("//div[@id='divleavereportmanager']//table/tbody/tr").each(function(row, i){	
			var num = parseFloat(i+1)	
			var len = 
			
			cy.xpath("//div[@id='divleavereportmanager']//table/tbody/tr["+num+"]/td[1]").invoke('text').then((EmpCode) => {
			cy.xpath("//div[@id='divleavereportmanager']//table/tbody/tr["+num+"]/td[4]").invoke('text').then((Fromdate) => {
		
				if (EmpCode.trim() == employeeID && Fromdate.trim() == leaveFromDate)
				{
					cy.xpath("//div[@id='divleavereportmanager']//table/tbody/tr["+num+"]/td[9]").invoke('text').then((text) => {
					softExpect(text.trim()).to.eq("Approved");
					
					cy.wait(2000)
					})
				}
			})
				})	
			})

			this.verifyLeaveDetails(employeeID,EmployeeFirstName,EmployeeLastName, managerID,
				ManagerFirstName, ManagerLastName, leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, todayDate, Designation, Department, employeeJoiningDate, 
				 leaveFromDayType, leaveToDayType, Reason, LeaveStation,VacationAddress, ContactNumber, ReliverCode, ReliverName,
				 APPROVERS, STATUS, MANAGERREMARKS, ReliverSetting, leaveDay)	

	}

    verifyNotificationAtEmployee(employeeID ) {
        const { softAssert, softExpect, softTrue } = chai;
        var moment = require('moment');
        const addTen = moment().add(10, 'minutes').calendar()
        var addTenMinutesTime = addTen.slice(8);

        const subtractTen = moment().subtract(10, 'minutes').calendar()
        var subtractTenMinutesTime = subtractTen.slice(8);

        const currentTime = moment().format('DD MMM yyyy')

        var beforeTenMinutes = currentTime + " " + subtractTenMinutesTime

        var afterTenMinutes = currentTime + " " + addTenMinutesTime

        const start = moment(beforeTenMinutes)
        const end = moment(afterTenMinutes)
        // display hours + minutes + AM|PM
        const f = 'DD MMM yyyy hh:mm A'


        cy.get('#empCount').click();
        cy.wait(2000)
        cy.get('.content-body >h6').eq(0).invoke('text').then((title) => {
            cy.get('.content-body >p').eq(0).invoke('text').then((Note) => {
                cy.log("title: " + title)
                cy.log("Note: " + Note)

                expect(title.trim()).to.include('Leave Accepted');
                softExpect(Note.trim()).to.contains('Approval of Leave for '+employeeID);	

                cy.get('.content-body >h6 >small').eq(0).should(($el) => {
                    const m = moment($el.text().trim())
                    expect(m.isBetween(start, end),
                        `${m.format(f)} should be between ${start.format(f)} and ${end.format(f)}`).to.be.true
                })

            })
            })


    }

	verifyNotificationAtReliver(employeeID, EmployeeFirstName, EmployeeLastName, leaveFromDate, leaveToDate) {
        const { softAssert, softExpect, softTrue } = chai;
        var moment = require('moment');
        const addTen = moment().add(10, 'minutes').calendar()
        var addTenMinutesTime = addTen.slice(8);

        const subtractTen = moment().subtract(10, 'minutes').calendar()
        var subtractTenMinutesTime = subtractTen.slice(8);

        const currentTime = moment().format('DD MMM yyyy')

        var beforeTenMinutes = currentTime + " " + subtractTenMinutesTime

        var afterTenMinutes = currentTime + " " + addTenMinutesTime

        const start = moment(beforeTenMinutes)
        const end = moment(afterTenMinutes)
        // display hours + minutes + AM|PM
        const f = 'DD MMM yyyy hh:mm A'


        cy.get('#empCount').click({force: true})
        cy.wait(2000)
        cy.get('.content-body >h6').eq(0).invoke('text').then((title) => {
            cy.get('.content-body >p').eq(0).invoke('text').then((Note) => {
                cy.log("title: " + title)
                cy.log("Note: " + Note)

                expect(title.trim()).to.include('Reliver Employee');
                softExpect(Note.trim()).to.contains('You will be Reliver for '+employeeID +' ('+EmployeeFirstName+' '+EmployeeLastName+') from '+leaveFromDate+' to '+leaveToDate);	

                cy.get('.content-body >h6 >small').eq(0).should(($el) => {
                    const m = moment($el.text().trim())
                    expect(m.isBetween(start, end),
                        `${m.format(f)} should be between ${start.format(f)} and ${end.format(f)}`).to.be.true
                })

            })
            })


    }

    verifyStatusAtEmployee(leaveFromDate ) {
        const { softAssert, softExpect, softTrue } = chai;  
        cy.visit(Cypress.env('essUrl')+'Leave/Transaction/LeaveRequest?Menu=leave')
	cy.wait(2000)
	



	cy.get('.table-responsive-vertical > .table > tbody > tr').each(function(row, i){	
		var num = parseFloat(i+1)	
		var len = 

		cy.get('.table-responsive-vertical > .table > tbody > tr:nth-child('+num+') >:nth-child(2)').invoke('text').then((Fromdate) => {

		
		if (Fromdate.trim() == leaveFromDate)
		{
			cy.get('.table-responsive-vertical > .table > tbody > tr:nth-child('+num+') >:nth-child(1)').invoke('text').then((text) => {
			softExpect(text.trim()).to.eq("Approved");
			
			cy.wait(2000)
			})
		}

		})	
	})

	cy.xpath("//button[contains(@onclick,'displayModal')]").click({force: true})

	this.verifyLeaveDetails(employeeID,EmployeeFirstName,EmployeeLastName, managerID,
		ManagerFirstName, ManagerLastName, leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, todayDate, Designation, Department, employeeJoiningDate, 
		 leaveFromDayType, leaveToDayType, Reason, LeaveStation,VacationAddress, ContactNumber, ReliverCode, ReliverName,
		 APPROVERS, STATUS, MANAGERREMARKS, ReliverSetting, leaveDay)	
    }
    

    verifyLeaveInMyReport(leaveFromDate)	 {
        const { softAssert, softExpect, softTrue } = chai;
        cy.visit(Cypress.env('essUrl') +'Leave/MyReport/MyLeaveReport?Menu=leavedetails');
		//cy.get('#leavedetails_Tab').click();
		cy.wait(3000)

			cy.get('#ESRtableSorter> tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)	
			var len = 
				
			cy.get('#ESRtableSorter> tbody > tr:nth-child('+num+') >:nth-child(2)').invoke('text').then((Fromdate) => {
		
				if (Fromdate.trim() == leaveFromDate)
				{
					cy.get('#ESRtableSorter> tbody > tr:nth-child('+num+') >:nth-child(1)').invoke('text').then((text) => {
					softExpect(text.trim()).to.eq("Approved");
					
					cy.wait(2000)
					})
				}
		
				})	
			})

			this.verifyLeaveDetails(employeeID,EmployeeFirstName,EmployeeLastName, managerID,
				ManagerFirstName, ManagerLastName, leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, todayDate, Designation, Department, employeeJoiningDate, 
				 leaveFromDayType, leaveToDayType, Reason, LeaveStation,VacationAddress, ContactNumber, ReliverCode, ReliverName,
				 APPROVERS, STATUS, MANAGERREMARKS, ReliverSetting, leaveDay)	
    }

    verifyLeaveInEmployeeReport(admin, employeeID, leaveFromDate ) {
        const { softAssert, softExpect, softTrue } = chai;
		cy.visit(Cypress.env('essUrl') +'Leave/EmployeeReport/EmployeeLeaveReport?Menu=leavedetails');
		cy.wait(500)

		cy.get('#select2-multiEmp-container').click({ force: true })
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(employeeID)
		cy.contains('li', '['+employeeID+']').click({ force: true })

		cy.get('#searchbtn').click({ force: true })
		cy.wait(1000)

			cy.get('#dataGrid> div >table >tbody > tr').each(function(row, i){	
			var num = parseFloat(i+1)	
			var len = 
				
			cy.get('#dataGrid> div> table >tbody > tr:nth-child('+num+') >:nth-child(3)').invoke('text').then((Fromdate) => {
		
				if (Fromdate.trim() == leaveFromDate)
				{
					softExpect(Fromdate.trim()).to.eq(leaveFromDate);

					cy.get('#dataGrid> div> table >tbody > tr:nth-child('+num+') >:nth-child(8) > span').invoke('text').then((text) => {
					softExpect(text.trim()).to.eq("Approved");
					
					})
				}
		
				})	
			})
			this.verifyLeaveDetails(employeeID,EmployeeFirstName,EmployeeLastName, managerID,
				ManagerFirstName, ManagerLastName, leaveType, leaveTypeValue, balance, leaveFromDate, leaveToDate, todayDate, Designation, Department, employeeJoiningDate, 
				 leaveFromDayType, leaveToDayType, Reason, LeaveStation,VacationAddress, ContactNumber, ReliverCode, ReliverName,
				 APPROVERS, STATUS, MANAGERREMARKS, ReliverSetting, leaveDay)	

    }

	
	setRelever(leaveTypeValue) {
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
					cy.get('#reliverR').select('N',{force:true})
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
      
}

	SetSelfServiceRole(EmployeeID, Role) {

	cy.navigate_EmployeeProfile(EmployeeID)	
		cy.wait(2000)
		cy.get('#profile_detail_tab').click()
		cy.wait(1000)
		cy.get('#Profile_SelfServiceRole').click()
		cy.wait(1000)
		cy.get('[name="SelfServiceRole"]').select(Role)
		cy.get('[value="Save"]').click()
		cy.wait(2000)
}

SetPassword(EmployeeID)
{
	cy.visit(Cypress.env('url')+'Settings/Employee/Index?module=hr&submodule=GeneratePassword') 

	cy.get('#select2-multiEmp-container').click({ force: true })
		cy.get('input[type="search"]').click({ force: true })
		cy.get('input[type="search"]').type(EmployeeID)
		cy.contains('li', '['+EmployeeID+']').click({ force: true })


   // cy.xpath("//label[contains(text(),'Category')]").click()
    cy.wait(2000)
    cy.get('#OverWriteRad').click({force:true})
    cy.wait(2000)
    cy.get('[name="PayslipPassword"]').eq(2).click({force:true})
    cy.wait(2000)
    cy.get('#savesetting').click()
    cy.wait(2000)
    cy.get(".alert-warning").invoke('text').then((text) => {
    cy.log(text.trim())	
    expect(text.trim()).contains('Generate Password will get processed in background.')
	cy.wait(20000)             
    })
}

SetManager(employeeID, managerID)
{
	cy.navigate_EmployeeProfile(employeeID)
        cy.wait(2000)
        cy.get('#approval_matrix_tab').click({force:true})
        cy.wait(2000)
        cy.get('[title="Add Approval Matrix Manager"]').eq(0).click({force: true})
        cy.wait(2000)
            cy.get('#select2-approvalManager-container').click({force: true})
            cy.wait(2000)
            cy.get('input[type="search"]').click({force: true})
            cy.get('input[type="search"]').type(managerID)
            cy.wait(2000)
            cy.get('.select2-results__option--highlighted').click({force: true})
            cy.wait(2000)
        cy.get('#approvalmust').select('Yes',{force: true})
        cy.get('#cancelrights').select('Yes',{force: true})
        //cy.xpath("//label[contains(text(),'Daily Working Hours')]").click()
        cy.get('#Leave').click({force: true})
        cy.xpath("//label[contains(text(),'Attendance Regularization')]").click({force: true})
        //cy.xpath("//label[contains(text(),'On Duty')]").click()
        cy.get('#btnSaveText').click({force: true})
        cy.wait(2000)
}

AddLeaveOpening(employeeID, leaveType)
{
	cy.navigate_EmployeeProfile(employeeID)
        cy.wait(2000)
        cy.get('#leave_detail_tab').click()

		cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").each(function(row, i){	
		var num = parseFloat(i+1)
		cy.log("num: "+num)
		
		cy.xpath("//div[@id='carouselExampleIndicators']//div[@class='card-body body-bg']//h4").eq(i).invoke('text').then((text) => {	
		cy.log("text: "+text)
			if(text.trim()==leaveType){
				expect(text).to.eq(leaveType)
		
	
		cy.xpath("//div[@id='carouselExampleIndicators']//table/tbody/tr[5]/th[2]").eq(i).invoke('text').then((availableLeave) => {	
		cy.log("availableLeave: "+availableLeave)
		
		cy.log("i: "+i)
			if(availableLeave.trim() =='0'){
			cy.get(':nth-child(2) > .card > .card-body > .float-right > a > .fas').click()

			//cy.get('.fa-ellipsis-v').eq(i-1).click()
			
			cy.get('#LeaveOpen').click({force: true})
			cy.get('#LeaveOpen').clear()
			cy.get('#LeaveOpen').type('10');
			
			cy.get('#saveloader').click({force: true})
			cy.wait(8000)	
			}

		})
	}
})

		})
}


DeleteLeaveConfiguration(leaveType){
	cy.wait(1000)
			cy.visit(Cypress.env('url')+'Settings/Employee/Index?module=organization&submodule=smtpsettings')
			cy.get('#leave_detail_tab').click({force:true})
			cy.get('#leave_detail_tab').click()
			cy.get('#leave_detail_tab').click({force:true})
			cy.wait(3000)


	cy.get('#Leave_LeaveConfiguration').click({force:true})
	cy.wait(8000)
	
	cy.get('#ddLeavType').select(leaveType)
	cy.wait(2000)
	
	cy.get('#btnDelete').click({force:true})
	cy.wait(3000)
		cy.get(".toast-message").invoke('text').then((text) => {
		cy.log(text.trim())
		expect(text.trim()).equal('Data deleted successfully.!')		
		})
}


}



export default Leave