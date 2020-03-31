/**********/
/*Testing all functions on Systems from admin site
/* -Select					-X	
/* -Update (Name/etc..)		-
/* -Add/Remove Admin		-
/* -Add/Remove Org			-
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