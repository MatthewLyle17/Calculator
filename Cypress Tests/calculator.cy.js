describe('Calculator Tests', () => { //reload page at the start of every test
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/index.html"); 
  }); 

  //checks if the page is reachable
  it('connection', () => {
    cy.visit('http://127.0.0.1:5500/index.html')
  })

  it('tests title and heading', ()=> {
    //test title exists - Calculator Team 1
    cy.get('[data-cy="title"]').should("exist").should("have.text","Calculator Team 1")
    //test heading exists - Calculator
    cy.get('[data-cy="page-heading"]').should("exist").should("have.text","Calculator")
  })
  
  it('number button tests', () => {
    //tests number buttons exist and add digit to display
    //0
    cy.get('[data-cy="0-btn"]').should("exist").contains("0").click()
    cy.get('[data-cy="screen"]').should("exist").should("have.text","0")
    cy.reload()
    //1
    cy.get('[data-cy="1-btn"]').should("exist").contains("1").click()
    cy.get('[data-cy="screen"]').should("exist").should("have.text","1")
    cy.reload()
    //2
    cy.get('[data-cy="2-btn"]').should("exist").contains("2").click()
    cy.get('[data-cy="screen"]').should("exist").should("have.text","2")
    cy.reload()
    //3
    cy.get('[data-cy="3-btn"]').should("exist").contains("3").click()
    cy.get('[data-cy="screen"]').should("exist").should("have.text","3")
    cy.reload()
    //4
    cy.get('[data-cy="4-btn"]').should("exist").contains("4").click()
    cy.get('[data-cy="screen"]').should("exist").should("have.text","4")
    cy.reload()
    //5
    cy.get('[data-cy="5-btn"]').should("exist").contains("5").click()
    cy.get('[data-cy="screen"]').should("exist").should("have.text","5")
    cy.reload()
    //6
    cy.get('[data-cy="6-btn"]').should("exist").contains("6").click()
    cy.get('[data-cy="screen"]').should("exist").should("have.text","6")
    cy.reload()
    //7
    cy.get('[data-cy="7-btn"]').should("exist").contains("7").click()
    cy.get('[data-cy="screen"]').should("exist").should("have.text","7")
    cy.reload()
    //8
    cy.get('[data-cy="8-btn"]').should("exist").contains("8").click()
    cy.get('[data-cy="screen"]').should("exist").should("have.text","8")
    cy.reload()
    //9
    cy.get('[data-cy="9-btn"]').should("exist").contains("9").click()
    cy.get('[data-cy="screen"]').should("exist").should("have.text","9")
    cy.reload()
    //test for more than one number button pressed
    cy.get('[data-cy="1-btn"]').contains("1").click()
    cy.get('[data-cy="2-btn"]').contains("2").click()
    cy.get('[data-cy="3-btn"]').contains("3").click()
    cy.get('[data-cy="screen"]').should("exist").should("have.text","123")
    cy.reload()
    //test for when number button overflows screen
    cy.get('[data-group="number-btn"]').click({ multiple: true})
    //cy.get('[data-cy="screen"]').should("have.text","123456789")//Fails
    cy.reload()
  })

  it('operator button tests', () => {
    //tests operator buttons exist and display
    //cy.get('[data-group="operator-btn"]').should("exist").click({multiple : true}) //Was trying something
    cy.get('[data-cy="plus-btn"]').should("exist").click()
    cy.get('[data-cy="screen"]').should("have.text","+")
    cy.get('[data-cy="minus-btn"]').should("exist").click()
    cy.get('[data-cy="screen"]').should("have.text","-")
    cy.get('[data-cy="times-btn"]').should("exist").click()
    cy.get('[data-cy="screen"]').should("have.text","&times;")
    cy.get('[data-cy="divide-btn"]').should("exist").click()
    cy.get('[data-cy="screen"]').should("have.text","&divide;")
  })

  it('. button tests', ()=> {
    //test . button exists and can only be used once
    cy.get('[data-cy="7-btn"]').click();
    //checks the content of the button and clicks it twice
    cy.get('[data-cy=".-btn"]').should("exist").should("have.text", ".").click().click(); 
    cy.get('[data-cy="5-btn"]').click();
    cy.get('[data-cy="screen"]').should("have.text","7.5");
  })

  it('all clear button tests', ()=> {
    //tests all clear button exists
    cy.get('[data-cy="clear-btn"]').should("exist").should("have.text", "CE").click();
    //tests clear button resets display
    cy.get('[data-cy="screen"]').should("have.text","0");
    //tests subsequent calculations start fresh
  })

  it('equals button tests', ()=> {
    //tests equals button exists
    cy.get('[data-cy="equals-btn"]').should("exist").should("have.text", "=");    
    //test equals button produces result
    cy.get('[data-cy="1-btn"]').click();
    cy.get('[data-cy="plus-btn"]').click();
    cy.get('[data-cy="1-btn"]').click();
    cy.get('[data-cy="equals-btn"]').click();
    cy.get('[data-cy="screen"]').should("have.text","2");    
  })  

  it('delete button tests', ()=> {
    //tests delete button exists and removes last digit from display
    //first operand last digit del
    cy.get('[data-cy="1-btn"]').click().click().click(); //clicks 1 three times
    cy.get('[data-cy="screen"]').should("have.text","111"); //checks the input is 111
    cy.get('[data-cy="delete-button"]').should("exist").should("have.text", "DEL").click(); //check del btn exists and clicks it
    cy.get('[data-cy="screen"]').should("have.text","11"); //checks if screen shows 11
    //operator del    
    cy.get('[data-cy="plus-btn"]').click();
    cy.get('[data-cy="delete-button"]').click();
    cy.get('[data-cy="screen"]').should("have.text","11");    
    cy.get('[data-cy="minus-btn"]').click(); //test if is possible to select a different operator    
    cy.get('[data-cy="screen"]').should("have.text","-");
    cy.get('[data-cy="1-btn"]').click();
    cy.get('[data-cy="equals-btn"]').click();
    cy.get('[data-cy="screen"]').should("have.text","10");    
    //second operand del
    cy.get('[data-cy="1-btn"]').click();
    cy.get('[data-cy="plus-btn"]').click();
    cy.get('[data-cy="1-btn"]').click().click().click(); 
    cy.get('[data-cy="delete-button"]').click(); //click delete on second operand restores first operand (might want to change this)
    cy.get('[data-cy="screen"]').should("have.text","111");
    cy.get('[data-cy="clear-btn"]').click();
  })

  it ('display tests', ()=> {
    //test for output on display 
    	
  })
  
  it ('addition calculation tests', ()=> {
    //test for all addition calculations
    //e.g 1+1, 1+2, 1.1+2, etc.
    cy.get('[data-cy="clear-btn"]').click();
    cy.get('[data-cy="1-btn"]').click();  //1+1
    cy.get('[data-cy="plus-btn"]').click();
    cy.get('[data-cy="1-btn"]').click();
    cy.get('[data-cy="equals-btn"]').click();
    cy.get('[data-cy="screen"]').should("have.text","2");
    cy.get('[data-cy="clear-btn"]').click();
    cy.get('[data-cy="1-btn"]').click(); //1+2
    cy.get('[data-cy="plus-btn"]').click();
    cy.get('[data-cy="2-btn"]').click();
    cy.get('[data-cy="equals-btn"]').click();
    cy.get('[data-cy="screen"]').should("have.text","3");
    cy.get('[data-cy="clear-btn"]').click();
    cy.get('[data-cy="1-btn"]').click(); //1.1+2
    cy.get('[data-cy=".-btn"]').click();
    cy.get('[data-cy="1-btn"]').click();
    cy.get('[data-cy="plus-btn"]').click();
    cy.get('[data-cy="2-btn"]').click();
    cy.get('[data-cy="equals-btn"]').click();
    cy.get('[data-cy="screen"]').should("have.text","3.1");
    cy.get('[data-cy="clear-btn"]').click();
  })


  it ('subtraction calculation tests', ()=> {
    //test for all subtraction calculations
    //example same as above
    cy.get('[data-cy="2-btn"]').click();  //2-1
    cy.get('[data-cy="minus-btn"]').click();
    cy.get('[data-cy="1-btn"]').click();
    cy.get('[data-cy="equals-btn"]').click();
    cy.get('[data-cy="screen"]').should("have.text","1");
    cy.get('[data-cy="clear-btn"]').click();
    cy.get('[data-cy="2-btn"]').click();  //2-2
    cy.get('[data-cy="minus-btn"]').click();
    cy.get('[data-cy="2-btn"]').click();
    cy.get('[data-cy="equals-btn"]').click();
    cy.get('[data-cy="screen"]').should("have.text","0");
    cy.get('[data-cy="clear-btn"]').click();
    cy.get('[data-cy="2-btn"]').click(); //2.5-2.1
    cy.get('[data-cy=".-btn"]').click();
    cy.get('[data-cy="5-btn"]').click();
    cy.get('[data-cy="minus-btn"]').click();
    cy.get('[data-cy="2-btn"]').click();
    cy.get('[data-cy=".-btn"]').click()
    cy.get('[data-cy="1-btn"]').click();
    cy.get('[data-cy="equals-btn"]').click();
    cy.get('[data-cy="screen"]').should("have.text","0.4");
    cy.get('[data-cy="clear-btn"]').click();
  })

  it ('division calculation tests', ()=> {
    //test for all division calculations
    //example same as above
    cy.get('[data-cy="2-btn"]').click();  //2/2
    cy.get('[data-cy="divide-btn"]').click();
    cy.get('[data-cy="2-btn"]').click();
    cy.get('[data-cy="equals-btn"]').click();
    cy.get('[data-cy="screen"]').should("have.text","1");
    cy.get('[data-cy="clear-btn"]').click();
    cy.get('[data-cy="3-btn"]').click();  //3/2
    cy.get('[data-cy="divide-btn"]').click();
    cy.get('[data-cy="2-btn"]').click();
    cy.get('[data-cy="equals-btn"]').click();
    cy.get('[data-cy="screen"]').should("have.text","1.5");
    cy.get('[data-cy="clear-btn"]').click();
    //test for addition calculations
    //with 2 digits 95+5 
    cy.get('[data-cy="9-btn"]').click();
    cy.get('[data-cy="5-btn"]').click();
    cy.get('[data-cy="plus-btn"]').click();
    cy.get('[data-cy="5-btn"]').click();
    cy.get('[data-cy="equals-btn"]').click();
    cy.get('[data-cy="screen"]').should("have.text","100");
    cy.reload()
    //with a float 9.5+0.5
    cy.get('[data-cy="9-btn"]').click();
    cy.get('[data-cy=".-btn"]').click();
    cy.get('[data-cy="5-btn"]').click();
    cy.get('[data-cy="plus-btn"]').click();
    cy.get('[data-cy="0-btn"]').click();
    cy.get('[data-cy=".-btn"]').click();
    cy.get('[data-cy="5-btn"]').click();
    cy.get('[data-cy="equals-btn"]').click();
    cy.get('[data-cy="screen"]').should("have.text","10");
    cy.reload()
  })

  it ('subraction calculation tests', ()=> {
    //test for subtraction calculations
    //integer 84-6
    cy.get('[data-cy="8-btn"]').click();
    cy.get('[data-cy="4-btn"]').click();
    cy.get('[data-cy="minus-btn"]').click();
    cy.get('[data-cy="4-btn"]').click();
    cy.get('[data-cy="equals-btn"]').click();
    cy.get('[data-cy="screen"]').should("have.text","80");
    cy.reload()
    //float 8.44-3.21
    cy.get('[data-cy="8-btn"]').click();
    cy.get('[data-cy=".-btn"]').click();
    cy.get('[data-cy="4-btn"]').click();
    cy.get('[data-cy="4-btn"]').click();
    cy.get('[data-cy="minus-btn"]').click();
    cy.get('[data-cy="3-btn"]').click();
    cy.get('[data-cy=".-btn"]').click();
    cy.get('[data-cy="2-btn"]').click();
    cy.get('[data-cy="1-btn"]').click();
    cy.get('[data-cy="equals-btn"]').click();
    cy.get('[data-cy="screen"]').should("have.text","5.23");
    cy.reload()
    //minus answer 4-9
    cy.get('[data-cy="4-btn"]').click();
    cy.get('[data-cy="minus-btn"]').click();
    cy.get('[data-cy="9-btn"]').click();
    cy.get('[data-cy="equals-btn"]').click();
    cy.get('[data-cy="screen"]').should("have.text","-5");
    cy.reload()
  })

  it ('division calculation tests', ()=> {
    //test for division calculations
    //whole number
    cy.get('[data-cy="4-btn"]').click();
    cy.get('[data-cy="9-btn"]').click();
    cy.get('[data-cy="divide-btn"]').click();
    cy.get('[data-cy="7-btn"]').click();
    cy.get('[data-cy="equals-btn"]').click();
    cy.get('[data-cy="screen"]').should("have.text","7");
    cy.reload()
    //infinite decimal answer
    cy.get('[data-cy="6-btn"]').click();
    cy.get('[data-cy="divide-btn"]').click();
    cy.get('[data-cy="9-btn"]').click();
    cy.get('[data-cy="equals-btn"]').click();
    cy.get('[data-cy="screen"]').should("have.text","0.660.6666666666666666");
    cy.reload()
    //divide by 0
    cy.get('[data-cy="6-btn"]').click();
    cy.get('[data-cy="divide-btn"]').click();
    cy.get('[data-cy="0-btn"]').click();
    cy.get('[data-cy="equals-btn"]').click();
    cy.get('[data-cy="screen"]').should("have.text","Infinity");
    cy.reload()
  })

  it ('multiplication calculation tests', ()=> {
    //test for all multiplication calculations
    //example same as above
    cy.get('[data-cy="2-btn"]').click();  //2*2
    cy.get('[data-cy="times-btn"]').click();
    cy.get('[data-cy="2-btn"]').click();
    cy.get('[data-cy="equals-btn"]').click();
    cy.get('[data-cy="screen"]').should("have.text","4");
    cy.get('[data-cy="clear-btn"]').click();
    cy.get('[data-cy="1-btn"]').click(); //1.5*1.5
    cy.get('[data-cy=".-btn"]').click();
    cy.get('[data-cy="5-btn"]').click();
    cy.get('[data-cy="times-btn"]').click();
    cy.get('[data-cy="1-btn"]').click();
    cy.get('[data-cy=".-btn"]').click()
    cy.get('[data-cy="5-btn"]').click();
    cy.get('[data-cy="equals-btn"]').click();
    cy.get('[data-cy="screen"]').should("have.text","2.25");
    cy.get('[data-cy="clear-btn"]').click();
    //whole number
    cy.reload()
    cy.get('[data-cy="7-btn"]').click();
    cy.get('[data-cy="2-btn"]').click();
    cy.get('[data-cy="times-btn"]').click();
    cy.get('[data-cy="2-btn"]').click();
    cy.get('[data-cy="equals-btn"]').click();
    cy.get('[data-cy="screen"]').should("have.text","144");
    cy.reload()
    //decimal
    cy.get('[data-cy="6-btn"]').click();
    cy.get('[data-cy="times-btn"]').click();
    cy.get('[data-cy=".-btn"]').click();
    cy.get('[data-cy="2-btn"]').click();
    cy.get('[data-cy="9-btn"]').click();
    cy.get('[data-cy="equals-btn"]').click();
    cy.get('[data-cy="screen"]').should("have.text","174");
    cy.reload()
    //times by 0
    cy.get('[data-cy="8-btn"]').click();
    cy.get('[data-cy="times-btn"]').click();
    cy.get('[data-cy="0-btn"]').click();
    cy.get('[data-cy="equals-btn"]').click();
    cy.get('[data-cy="screen"]').should("have.text","Infinity");
    cy.reload()
  })
  
})