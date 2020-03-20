/**********/
/*Testing all functions on Organizations from admin site
/* -Update Org details (Name/State/etc..)
/* -Add Department
/* -Add User
/* -Clone Organization
/* -Create Organization
/* -Move Seats
/* -Move Users
/* -Password Policy
/*
***********/
require('env2')('.env');
module.exports = {
  tags:['adminFunctions'],
  before : function(browser)
  {
  	    browser.url('https://' + process.env.HOST + '/admin')
		.waitForElementVisible('body')
        .setValue('input[name="Username"]', process.env.USER)
        .setValue('input[name="Password"]', process.env.PW)
        .click('input[type="submit"]')
        .assert.containsText('#main_news', 'Welcome')
  },
  'end':function(browser){
  	browser.end();
  }
};
