/**********/
/*Testing all functions on Systems from admin site
/* -Select					-X	
/* -Update (Name/etc..)		-X
/* -Add/Remove Admin		-X
/* -Add/Remove Org			-X
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
	'System page Functions - Select System': function (browser) {
		browser
			.click('div#menu ul li a[href="Systems.php?ID=-1"]')
			.assert.containsText('div#main_news h1',"Systems","On Systems")
			.click('select[name="ID"] option[value="7"]')
			.assert.urlContains('Systems.php?ID=7',"On Apex System");			
	},
	'System page Functions - Update System': function (browser) {
		browser
			.execute("$('#Name').val('')")			
			.execute("$('#Comments').val('')")	
			.setValue('#Name','TestingSystem')
			.setValue('#Comments','TestingSystemComments')
			.click('input[value="Update System"]')
			.assert.containsText('div#main_news p',"System saved successfully","System updated")
			.assert.value('#Name','TestingSystem','Name changed')
			.assert.value('#Comments','TestingSystemComments','Comments changed')
			.execute("$('#Name').val('')")			
			.execute("$('#Comments').val('')")	
			.setValue('#Name','Apex-Related Organizations')
			.setValue('#Comments','These are Apex related organizations (not used in sales demos)')
			.click('input[value="Update System"]')
			.assert.containsText('div#main_news p',"System saved successfully","System reverted")
	},
	'System page Functions - Add/Remove Admin': function (browser) {
		browser
			.click('select[name="NewAdminID"] option[value="275515"]')
			.click('input[value="Update System"]')
			.assert.containsText('div#main_news p',"System saved successfully","System updated")
			.assert.elementPresent('#Admin275515ID','Admin added')
			.click('input[type="button"][value="Remove"][onclick="window.location.href = \'Systems.php?ID=7&DeleteAdmin=275515\';"]')
			.assert.not.elementPresent('#Admin275515ID','Admin not in list')			
	},
	'System page Functions - Add/Remove Organization': function (browser) {
		browser			
			.click('input[type="button"][value="Remove"][onclick="window.location.href = \'Systems.php?ID=7&RemoveOrganization=221\'"]')				
			.assert.not.elementPresent('input[onclick="window.location.href = \'Systems.php?ID=7&RemoveOrganization=221\'"]','Org removed')
			.click('select[name="NewOrgID"] option[value="221"]')
			.click('input[value="Update System"]')	
			.assert.containsText('div#main_news p',"System saved successfully","System reverted")		
			.assert.elementPresent('a[href="Organizations.php?ID=221"]','Org added back')			
	},	
	'end':function(browser){
		browser.end();
	}
};