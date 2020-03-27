/**********/
/*Testing all functions on Organizations from admin site
/* -Find Apex HQ			-X		
/* -Update (Name/etc..)		-X
/* -Add/Remove Admin		-X
/* -Add Department			-X
/* -Add License				-X
/* -Add User				-X
/* -Clone Organization		-X
/* -Create Organization		-X
/* -Move Seats				-X
/* -Move Users				-X
/* -Password Policy			-X
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
	'Organization page Functions - Find Organization': function (browser) {
		browser
			.click('div#menu ul li a[href="Organizations.php?ID=-1"]')
			.assert.containsText('div#main_news h1',"Organizations","On Organizations")
			.waitForElementPresent('input[name="query"]',10000,'Found Organization search')
			.setValue('input[name="query"]','Apex HQ')
			.click('select[name="ID"]')		
			.click('select[name="ID"] option[value="221"]')	
			.pause(1000)
			.click('input[value="Go"][class="goButton"]')
			.assert.urlContains('ID=221','On Organization')
	},
	'Organization page Functions - Update Organization': function (browser) {
		browser
			.setValue('input[id="Name"]',' Test')
			.execute("$('input[id=\"City\"]').val('')")
			.setValue('input[id="City"]','Miami')
			.click('select[id="StateID"] option[value="17"]')
			.click('input[value="Update Organization"]')
			.assert.containsText('div#main_news p',"Organization saved successfully","Organization saved")	
			.assert.value('input[id="Name"]','Apex HQ Test','Name was updated')
			.execute("$('input[id=\"Name\"]').val('')")
			.setValue('input[id="Name"]','Apex HQ')		
			.assert.value('input[id="City"]','Miami','City was updated')
			.execute("$('input[id=\"City\"]').val('')")		
			.setValue('input[id="City"]','Lafayette')
			.assert.value('select[id="StateID"]','17','State was updated')
			.click('select[id="StateID"] option[value="27"]')
			.click('input[value="Update Organization"]')
			.assert.containsText('div#main_news p',"Organization saved successfully","Organization reverted")	
	},
	'Organization page Functions - Add/Remove Admin': function (browser) {
		browser
			.click('input[type="button"][value="Remove"][onClick="window.location.href = \'Organizations.php?ID=221&DeleteAdmin=275515\';"]')
			.assert.containsText('div#main_news p',"Administrator removed successfully","Admin Removed")			
			.click('select[id="NewAdminID"] option[value="275515"]')
			.click('input[value="Update Organization"]')
			.assert.elementPresent('#Admin275515ID','Admin added back to org')
			.assert.containsText('div#main_news p',"Organization saved successfully","Organization reverted")
	},
	'Organization page Functions - Add Department': function (browser) {
		browser
			.click('div#main_sidebar input[value="Add Department"]')
			.assert.containsText('div#main_news h1',"Departments","On Departments")
			.assert.value('select[id="OrganizationID"]','221',"Organization selected")
			.click('input[value="Go"][class="button"]')
			.assert.containsText('div#main_news h1',"Organizations","Back to Organizations")	
			.assert.urlContains('Organizations.php?ID=221',"On Apex HQ")				
	},
	'Organization page Functions - Add License': function (browser) {
		browser
			.click('div#main_sidebar input[value="Add License"]')
			.assert.containsText('div#main_news h1',"Licenses","On Licenses")
			.assert.value('select[id="OrganizationID"]','221',"Organization selected")
			.click('input[value="Go"][class="button"]')
			.assert.containsText('div#main_news h1',"Organizations","Back to Organizations")	
			.assert.urlContains('Organizations.php?ID=221',"On Apex HQ")				
	},
	'Organization page Functions - Add User': function (browser) {
		browser
			.click('div#main_sidebar input[value="Add User"]')
			.assert.containsText('div#main_news h1',"Users","On Users")
			.assert.urlContains('OrganizationID=221',"Organization used")
			.back()
			.assert.containsText('div#main_news h1',"Organizations","Back to Organizations")
			.assert.urlContains('Organizations.php?ID=221',"On Apex HQ")					
	},
	'Organization page Functions - Clone Organization': function (browser) {
		browser
			.click('div#main_sidebar input[value="Clone Organization"]')			
			.setAlertText('Apex HQ Clone')		
			.acceptAlert()
			.assert.urlContains('CloneID=221',"Organization used")
			.back()
			.assert.containsText('div#main_news h1',"Organizations","Back to Organizations")	
			.assert.urlContains('Organizations.php?ID=221',"On Apex HQ")				
	},
	'Organization page Functions - Create Organization': function (browser) {
		browser
			.click('div#main_sidebar input[value="Create Organization"]')			
			.assert.urlContains('Organizations.php?ID=-1',"New Organization")
			.back()		
			.assert.containsText('div#main_news h1',"Organizations","Back to Organizations")	
			.assert.urlContains('Organizations.php?ID=221',"On Apex HQ")		
	},
	'Organization page Functions - Move Seats': function (browser) {
		browser
			.click('div#main_sidebar input[value="Move Seats"]')			
			.assert.urlContains('OrganizationID=221',"Organization used")
			.assert.containsText('div#main_news h1',"Move Seats","On Move Seats")
			.click('div#main_sidebar input[value="Go to Organization"]')			
			.assert.containsText('div#main_news h1',"Organizations","Back to Organizations")	
			.assert.urlContains('Organizations.php?ID=221',"On Apex HQ")		
	},
	'Organization page Functions - Move Users': function (browser) {
		browser
			.click('div#main_sidebar input[value="Move Users"]')			
			.assert.urlContains('OrganizationID=221',"Organization used")
			.assert.containsText('div#main_news h1',"Move Users Between Departments","On Move Users")
			.click('div#main_sidebar input[value="Go to Organization"]')			
			.assert.containsText('div#main_news h1',"Organizations","Back to Organizations")	
			.assert.urlContains('Organizations.php?ID=221',"On Apex HQ")		
	},
	'Organization page Functions - Password Policy': function (browser) {
		browser
			.click('div#main_sidebar input[value="Password Policy"]')			
			.assert.urlContains('OrganizationID=221',"Organization used")
			.assert.containsText('div#main_news h1',"Password Policy","On Password Policy")
			.execute("$('input[id=\"PasswordExpirationDays\"]').val('')")
			.execute("$('input[id=\"PasswordMinLength\"]').val('')")
			.execute("$('input[id=\"PasswordHistoryLength\"]').val('')")
			.execute("$('input[id=\"PasswordLockoutAttempts\"]').val('')")
			.execute("$('input[id=\"PasswordLockoutDuration\"]').val('')")
			.setValue('input[id="PasswordExpirationDays"',7)
			.setValue('input[id="PasswordMinLength"',7)
			.setValue('input[id="PasswordHistoryLength"',7)
			.setValue('input[id="PasswordLockoutAttempts"',7)
			.setValue('input[id="PasswordLockoutDuration"',7)
			.click('#PasswordComplexityNumeric')
			.click('#PasswordComplexityLowercase')
			.click('#PasswordComplexitySpecial')
			.click('#PasswordComplexityNoUserInfo')
			.click('#PasswordComplexityUppercase')
			.click('input[value="Update Policy"]')				
			.assert.containsText('div#main_news p',"Password policy saved successfully.","Policy updated")
			.assert.value('input[id="PasswordExpirationDays"','7')
			.assert.value('input[id="PasswordMinLength"','7')
			.assert.value('input[id="PasswordHistoryLength"','7')
			.assert.value('input[id="PasswordLockoutAttempts"','7')
			.assert.value('input[id="PasswordLockoutDuration"','7');
		browser.expect.element('#PasswordComplexityNumeric').to.not.be.selected;
		browser.expect.element('#PasswordComplexityLowercase').to.not.be.selected;
		browser.expect.element('#PasswordComplexitySpecial').to.be.selected;
		browser.expect.element('#PasswordComplexityNoUserInfo').to.be.selected;
		browser.expect.element('#PasswordComplexityUppercase').to.not.be.selected;
		browser	
			.click('#PasswordComplexityNumeric')
			.click('#PasswordComplexityLowercase')
			.click('#PasswordComplexitySpecial')
			.click('#PasswordComplexityNoUserInfo')
			.click('#PasswordComplexityUppercase')
			.execute("$('input[id=\"PasswordExpirationDays\"]').val('')")
			.execute("$('input[id=\"PasswordMinLength\"]').val('')")
			.execute("$('input[id=\"PasswordHistoryLength\"]').val('')")
			.execute("$('input[id=\"PasswordLockoutAttempts\"]').val('')")
			.execute("$('input[id=\"PasswordLockoutDuration\"]').val('')")
			.setValue('input[id="PasswordExpirationDays"',0)
			.setValue('input[id="PasswordMinLength"',6)
			.setValue('input[id="PasswordHistoryLength"',0)
			.setValue('input[id="PasswordLockoutAttempts"',0)
			.setValue('input[id="PasswordLockoutDuration"',0)
			.click('input[value="Update Policy"]')
			.assert.containsText('div#main_news p',"Password policy saved successfully.","Policy reverted")
			.click('div#main_sidebar input[value="Go to Organization"]')			
			.assert.containsText('div#main_news h1',"Organizations","Back to Organizations")	
			.assert.urlContains('Organizations.php?ID=221',"On Apex HQ");
	},
	'end':function(browser){
		browser.end();
	}
};