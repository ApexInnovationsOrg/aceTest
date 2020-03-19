/**********/
/*Testing all functions on user accounts from admin site
/* -Create Account
/* -Update User details (Name/State/Department)
/* -Reset Password
/* -Clone User
/* -Merge User
/* -Edit CE Claimed
/* -Edit User Licenses
/* -Go to Organization
/* -Proxy Login
/* -Test Results
/* -Time in Course
/* -Welcome Email
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
