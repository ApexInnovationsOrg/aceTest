/**********/
/*Testing all functions on user accounts from admin site
/* -Search for User       -X
/* -Create User           -X
/* -Update User details   -X
/* -Delete User           -X
/* -Reset Password        -X
/* -Merge User            -X
/* -Clone User			  -X
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
	tempData:{
		dataWithUnixTime : Math.round((new Date()).getTime() / 1000)
	},
	before : function(browser)
	{
		browser.url('https://' + process.env.HOST + '/admin')
			.waitForElementVisible('body')
			.setValue('input[name="Username"]', process.env.USER)
			.setValue('input[name="Password"]', process.env.PW)
			.click('input[type="submit"]')
			.assert.containsText('#main_news', 'Welcome')
	},
	'User page Functions - Create User': function (browser) {
		browser
			.click('div#menu ul li a[href="Users.php"]')
			.assert.containsText('div#main_news h1',"Users","On Users")
			.click('div#main_sidebar input[value="Create User"]')
			.assert.urlContains('EditUsers.php?ID=-1','On create user')
			.setValue('input#Login','testdoe.' + this.tempData.dataWithUnixTime + '@apexinnovations.com')
			.setValue('input#FirstName','Test')
			.setValue('input#LastName','Doe')
			.setValue('input#Address','123 Abc')
			.setValue('input#City','Lafayette')
			.click('select#StateID')
			.click('select#StateID option[value="27"]')
			.setValue('input#PostalCode','70506')
			.setValue('input#Phone','5555555555')
			.click('select.departmentScrolldown option[value="584"]')
			.click('input.submit[value="Create User"]')
			.assert.containsText('div#main_news p',"User saved successfully","User saved")			
	},
	'User page Functions - Update User': function (browser) {
		browser
			.setValue('input#FirstName','2Update')
			.setValue('input#LastName','2Update')
			.click('select#StateID')
			.click('select#StateID option[value="1"]')
			.click('input.submit[value="Update User"]')
			.assert.containsText('div#main_news p',"User saved successfully","User saved")			
			.assert.value('input#FirstName',"Test2Update","First name updated")			
			.assert.value('input#LastName',"Doe2Update","Last name updated")	
	},
	'User page Functions - Reset User Password': function (browser) {
		browser
			.click('input.submit[value="Reset Password"]')
			.pause(1000)
			.setAlertText('test123')
			.acceptAlert()
			.assert.containsText('div#main_news p',"User password successfully reset to 'test123'","User password reset")
	},
	'User page Functions - Clone User': function (browser) {
		browser			
			.click('div#main_sidebar input[value="Clone User"]')
			.setValue('input#Login','testdoe2.' + this.tempData.dataWithUnixTime + '@apexinnovations.com')
			.setValue('input#FirstName','Test')
			.setValue('input#LastName','Doe')
			.pause(3000)
			.click('input.submit[value="Create User"]')	
			.assert.containsText('div#main_news p',"User saved successfully","User cloned")	
	},
	'User page Functions - Merge User': function (browser) {
		browser
			.click('div#menu ul li a[href="Users.php"]')
			.assert.containsText('div#main_news h1',"Users","On Users")		
			.click('div#main_sidebar input[value="Merge Users"]')
			.assert.containsText('div#main_news h1',"Merge Users","On Merge Users")
			.setValue('input#ByName1','Test2Update Doe2Update')
			.setValue('input#ByName2','Test Doe')
			.click('input#Find')
			.click('input[name="User1ID"]')
			.click({
				selector: 'input[name="User2ID"]',
				index: 0
			})
			.click('input#Merge')			
			.assert.containsText('div#main_news p',"User account successfully merged","User merged")
	},
	'User page Functions - Search for User': function (browser) {
		browser
			.click('div#menu ul li a[href="Users.php"]')
			.assert.containsText('div#main_news h1',"Users","On Users")
			.assert.containsText('form#Finder legend',"Find User(s)","Find Users")
			.setValue('input#ByName','Test2Update Doe2Update')
			.click('input#Find')
			.assert.containsText('table#table a',"Doe2Update, Test2Update","Can see Test Doe user")
			.click({
				selector: 'table#table a',
				index: 0
			})
	},
	'User page Functions - Delete User': function (browser) {
		browser
			.click('div#main_sidebar input[value="Delete User"]')
			.pause(1000)
			.acceptAlert()
			.assert.containsText('div#main_news p',"User successfully deleted","User deleted")	
	},
	'end':function(browser){
		browser.end();
	}
};
