/**********/
/*Testing all functions on Organizations from admin site
/* -Find Apex HQ			-X		
/* -Update (Name/etc..)		-X
/* -Add/Remove Admin		-X
/* -Deactivate Department	-X
/* -Create Department		-X
/* -Merge Departments		-X
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
	'Department page Functions - Find Department': function (browser) {
		browser
			.click('div#menu ul li a[href="Departments.php?ID=-1"]')
			.assert.containsText('div#main_news h1',"Departments","On Departments")
			.waitForElementPresent('div#main_news input:nth-child(2)',10000,'Found Department search')
			.setValue('div#main_news input:nth-child(2)','Development Apex HQ')
			.click('select[name="DepartmentID"]')		
			.click('select[name="DepartmentID"] option[value="1522"]')	
			.pause(1000)
			.click('input[value="Go"][class="goButton"]')
			.assert.urlContains('ID=1522','On Department')
	},
	'Department page Functions - Update Department': function (browser) {
		browser
			.setValue('#Name',' Test')
			.click('#Active')			
			.click('input[value="Update Department"]')
			.assert.containsText('div#main_news p',"Department saved successfully","Department saved")
			.assert.value('#Name','Development Test','Name was updated')
			.execute("$('#Name').val('')")	
			.setValue('#Name','Development');
		browser.expect.element('#Active').to.not.be.selected;		
		browser
			.click('#Active')	
			.click('input[value="Update Department"]')
			.assert.containsText('div#main_news p',"Department saved successfully","Department reverted")				
	},
	'Department page Functions - Add/Remove Admin': function (browser) {
		browser
			.click('input[type="button"][value="Remove"][onClick="window.location.href = \'Departments.php?ID=1522&DeleteAdmin=275515\';"]')
			.assert.containsText('div#main_news p',"Administrator removed successfully","Admin Removed")			
			.click('select[id="NewAdminID"] option[value="275515"]')
			.click('input[value="Update Department"]')
			.assert.elementPresent('#Admin275515ID','Admin added back to dept')
			.assert.containsText('div#main_news p',"Department saved successfully","Department reverted")			
	},
	'Department page Functions - Deactivate Department': function (browser) {
		browser
			.click('div#main_sidebar input[value="Deactivate Department"]')
			.assert.urlContains('Deactivate=true',"Deactivated");
		browser.expect.element('#Active').to.not.be.selected;	
		browser
			.click('#Active')	
			.click('input[value="Update Department"]')
			.assert.containsText('div#main_news p',"Department saved successfully","Department reverted")
	},	
	'Department page Functions - Create Department': function (browser) {
		browser
			.click('div#main_sidebar input[value="Create Department"]')
			.click('select[id="OrganizationID"] option[value="221"]')			
			.setValue('#Name','Development Clone')
			.click('input[value="Create Department"]')
			.assert.not.value('#theID',0,'New Department created')
			.url('https://' + process.env.HOST + '/admin/Departments.php?ID=1522')
	},
	'Department page Functions - Merge Department': function (browser) {
		browser
			.url('https://' + process.env.HOST + '/admin/Organizations.php?ID=221')
			.execute("$('a:contains(\"Development Clone\")')[0].click()")
			.click('div#main_sidebar input[value="Merge Departments"]')
			.click('select[name="MergeID"]')		
			.click('select[name="MergeID"] option[value="1522"]')
			.click('input[value="Merge Departments"]')
			.assert.containsText('div#main_news p',"Departments merged successfully","Departments Merged")	
			.click('a[href="Departments.php?ID=1522"]')			
			.assert.urlContains('ID=1522','On Department')
	},
	'end':function(browser){
		browser.end();
	}
};