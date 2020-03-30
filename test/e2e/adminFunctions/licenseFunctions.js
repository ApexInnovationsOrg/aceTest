/**********/
/*Testing all functions on Licenses from admin site
/* -Select License			-X		
/* -Find License			-X
/* -Update License			-X
/* -Add/Remove Admin		-X
/* -Update LicensePeriod	-X
/* -Edit Configuration		-X
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
			.click('div#menu ul li a[href="Licenses.php?ID=-1"]')
	},
	'License page Functions - Select License': function (browser) {
		browser
			.click('select[id="ID"] option[value="' + process.env.EDIT_USER_LICENSE_KEY_ID + "_" + process.env.EDIT_USER_LICENSE_KEY + '"]')			
			.assert.urlContains('ID=' + process.env.EDIT_USER_LICENSE_KEY_ID + "_" + process.env.EDIT_USER_LICENSE_KEY, 'On license URL')
			.assert.value('#theID',process.env.EDIT_USER_LICENSE_KEY_ID,'On license')
	},
	'License page Functions - Find License': function (browser) {
		browser
			.setValue('#ByKey',process.env.EDIT_USER_LICENSE_KEY)
			.click('input[value="Find License(s)"]')
			.execute("$('a:contains(\"" + process.env.EDIT_USER_LICENSE_KEY + "\")')[0].click()")		
			.assert.urlContains('ID=' + process.env.EDIT_USER_LICENSE_KEY_ID, 'On license URL')
			.assert.value('#theID',process.env.EDIT_USER_LICENSE_KEY_ID,'On license')
	},
	'License page Functions - Update License': function (browser) {
		browser
			.execute("$('#NumSeats').val('')")
			.setValue('#NumSeats',10)
			.execute("$('#Notes').val('')")
			.setValue('#Notes','TESTING CURRENTLY...')
			.click('#Active')
			.click('#ForceIPRangeAccess')
			.click('#Beta')
			.click('#pretestLicense')
			.click('#LMSVerificationRequired')
			.click('#Enterprise')
			.click('#Shareable')
			.click('input[value="Update License"]')
			.assert.containsText('div#main_news p',"License updated successfully","License saved successfully")
			.pause(5000)
			.assert.value('#NumSeats','10')
			.execute("$('#NumSeats').val(0)")
			.assert.containsText('#Notes','TESTING CURRENTLY...')
			.execute("$('#Notes').val('')")
			.setValue('#Notes','DO NOT USE - USED FOR e2e TESTING')
		browser.expect.element('#Active').to.not.be.selected;
		browser.expect.element('#Enterprise').to.not.be.selected;
		browser.expect.element('#Shareable').to.not.be.selected;
		browser.expect.element('#ForceIPRangeAccess').to.be.selected;
		browser.expect.element('#Beta').to.be.selected;
		browser.expect.element('#pretestLicense').to.be.selected;
		browser.expect.element('#LMSVerificationRequired').to.be.selected;		
		browser
			.click('#Active')
			.click('#ForceIPRangeAccess')
			.click('#Beta')
			.click('#pretestLicense')
			.click('#LMSVerificationRequired')
			.click('#Enterprise')
			.click('#Shareable')			
			.click('input[value="Update License"]')
			.acceptAlert()
			.assert.containsText('div#main_news p',"License updated successfully","License reverted")
	},
	'License page Functions - Add/Remove Admin': function (browser) {
		browser			
			.click('select[id="NewAdminID"] option[value="275515"]')
			.click('input[value="Update License"]')
			.assert.containsText('div#main_news p',"License updated successfully","Admin added")			
			.click('input[type="button"][value="Remove"][onClick="window.location.href = \'Licenses.php?ID=' + process.env.EDIT_USER_LICENSE_KEY_ID + '&DeleteAdmin=275515\';"]')
			.assert.urlContains('Licenses.php?ID=' + process.env.EDIT_USER_LICENSE_KEY_ID + '&DeleteAdmin=275515')
	},
	'License page Functions - Edit License Period': function (browser) {
		browser					
			.execute("$('div#main_news table tbody a')[0].click()")			
			.assert.containsText('div#main_news h1',"License Terms","On License Period")
			.click('#HS')
			.setValue('#Notes','TESTING')
			.click('input[value="Update Term"]')
			.assert.containsText('div#main_news p',"License term updated successfully","License Period updated")
			.assert.value('#Notes','TESTING')
			.execute("$('#Notes').val('')")
		browser.expect.element('#HS').to.be.selected;
		browser
			.click('#HS')			
			.click('input[value="Update Term"]')
			.assert.containsText('div#main_news p',"License term updated successfully","License Period reverted")
			.click('#viewUserButton')
			.assert.containsText('#termTable tbody td[style="text-align: center;"]','0(0)')			
			.click('div#main_sidebar input[value="Go to License"]')
			.assert.urlContains('Licenses.php?ID=' + process.env.EDIT_USER_LICENSE_KEY_ID,"Back on License")
	},
	'License page Functions - Edit Configuration': function (browser) {
		browser						
			.click('div#main_sidebar input[value="Edit Configuration"]')
			.assert.containsText('div#main_news h1',"License Configuration","On License Configuration")	
			.click('select[id="CourseID1"] option[value="0"]')			
			.click('input[value="Update Configuration"]')
			.assert.containsText('div#main_news p',"License configuration saved successfully","License Configuration course updated")
			.assert.value('#CourseID1','0')
			.click('select[id="CourseID1"] option[value="41"]')		
			.click('input[value="Update Configuration"]')
			.assert.containsText('div#main_news p',"License configuration saved successfully","License Configuration course reverted")
			.click('#AllowCourse1');
		browser.expect.element('#AllowCourse1').to.not.be.selected;
		browser.expect.element('#AllowTest1').to.not.be.selected;
		browser.expect.element('#AllowCertificate1').to.not.be.selected;
		browser.expect.element('#RandomizeAnswers1').to.not.be.selected;
		browser.expect.element('#RandomizeQuestions1').to.not.be.selected;
		browser
			.click('#AllowCourse1')
			.click('div#main_sidebar input[value="Go to License"]')
			.assert.urlContains('Licenses.php?ID=' + process.env.EDIT_USER_LICENSE_KEY_ID,"Back on License")
	},
	'end':function(browser){
		browser.end();
	}
};