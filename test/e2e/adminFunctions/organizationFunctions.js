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
	'Organization page Functions - Find Org': function (browser) {
		browser
			.click('div#menu ul li a[href="Organizations.php?ID=-1"]')
			.assert.containsText('div#main_news h1',"Organization","On Organizations")
			.waitForElementPresent('input[name="query"]',10000,'Found Organization search')
			.pause(2500)
			.setValue('input[name="query"]','Apex HQ')
			.pause(2500)
			.execute("$('select[name=\"ID\"]').val(221)")
			.click('select[name="ID"]')		
			.pause(3000)
			.click('select[name="ID"] option[value="221"]')		
			.execute("$('select[name=\"ID\"] option[value=\"221\"]').trigger('click')")
			.assert.value('select[name="ID"]',"221","Found Apex HQ")
			.pause(1000)			
			.click('input[value="Go"][class="goButton"]')
			.pause(10000)
	},
	'end':function(browser){
		browser.end();
	}
};
