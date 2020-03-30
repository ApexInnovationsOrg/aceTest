/**********/
/*Testing all functions on Licenses from admin site
/* -Select License			-		
/* -Find License			-
/* -Update License			-
/* -Update LicensePeriod	-
/* -Edit Configuration		-
/*Things that can't be tested currently because of no cleanup
/* -Create License
/* -Clone License
/* -Migrate Users
/* -Generate Encrypted keys
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