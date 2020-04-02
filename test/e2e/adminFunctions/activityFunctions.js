/**********/
/*Testing activity panel from admin site
/* Search Employee		-X
/* Search Event Type	-X
/* View Event			-X
/* Event Functions		-X
/* Update Event			-X
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
			.click('div#menu ul li a[href="ActivityPanel.php"]')
			.assert.containsText('div#main_news h1',"Activity Panel","On Activity Panel")
	},
	'Activity Panel page Functions - Search Employee': function (browser) {
		browser
			.click('select#EmpSearch option[value="37"]')
			.click('input[name="SearchEmp"]')
			.assert.containsText('div#main_news h2',"ApexTest Account's Activity Log")
			.assert.visible('#emptable')
	},
	'Activity Panel page Functions - Search Event': function (browser) {
		browser
			.click('select#TypeSearch option[value="75"]')
			.click('input[name="SearchEvent"]')
			.assert.containsText('div#main_news h2',"Event Type Log")
			.assert.visible('#typetable')
	},
	'Activity Panel page Functions - View Event': function (browser) {
		browser
			.url('https://' + process.env.HOST + '/admin/ActivityPanel.php?Event=1000')
			.assert.containsText('.EventTable:nth-of-type(1) thead td',"Event Information")
			.assert.containsText('.EventTable:nth-of-type(2) thead td',"User Information")
			.assert.containsText('.EventTable:nth-of-type(3) thead td',"Logged Information")
	},
	'Activity Panel page Functions - Event Functions': function (browser) {
		browser
			.click('.EventTable:nth-of-type(2) tr:nth-child(1) a')
			.assert.urlContains('EditUsers.php')
			.back()
			.click('.EventTable:nth-of-type(2) tr:nth-child(3) a')
			.assert.urlContains('MyCurriculum.php')
			.back()
	},
	'Activity Panel page Functions - Update Event': function (browser) {
		browser
			.click('#EventNotes')
			.assert.elementPresent('textarea[name="EventNotesSave"]')
			.setValue('textarea[name="EventNotesSave"]','Testing Update')
			.click('input[name="Save"]')
			.assert.containsText('div#main_news p','Note Saved')
			.click('#EventNotes')
			.assert.value('textarea[name="EventNotesSave"]','Testing Update')
			.execute('$("textarea[name=\'EventNotesSave\']").val("")')
			.click('input[name="Save"]')
			.assert.containsText('div#main_news p','Note Saved')
	},	
	'end':function(browser){
		browser.end();
	}
};
