require('env2')('.env');
module.exports = {
  tags:['userReports'],
  before : function(browser)
  {
  	    browser.url('https://' + process.env.HOST + '/admin')
		.waitForElementVisible('body')
        .setValue('input[name="Username"]', process.env.USER)
        .setValue('input[name="Password"]', process.env.PW)
        .click('input[type="submit"]')
        .assert.containsText('#main_news', 'Welcome')
  },
  'Go to Reports': function (browser) {
      browser
      .url('https://' + process.env.HOST + '/admin/doProxyLogon.php?AdminID=24&Login=eddie@apexinnovations.com')
      .url('https://' + process.env.HOST + '/Reports.php')
      .assert.elementPresent('.pageName')
  },
  'Run Reports': function(browser){
  	browser
  		.execute("$('#reportDomainContainer .reportDomainButton[data-domain=\"Organization\"]').trigger('click')")
		.assert.attributeContains("button[data-domain=\"Organization\"]", 'class', 'active','Clicked Organization button')
		.assert.visible('#reportSelectionContainer','Reports dropdown visible')
		.execute("$('#reportSelectionContainer button.dropdown-toggle').trigger('click')")
		.assert.attributeContains("div#reportSelectionContainer div div.dropdown", 'class', 'open','Report dropdown open')
		.assert.visible('div#reportSelectionContainer ul.dropdown-menu li[data-report="benchmarking"]','Benchmarking visible')
		.assert.visible('div#reportSelectionContainer ul.dropdown-menu li[data-report="cereport"]','CE Report visible')
		.assert.visible('div#reportSelectionContainer ul.dropdown-menu li[data-report="completionprogress"]','Completion Progress visible')
		.assert.visible('div#reportSelectionContainer ul.dropdown-menu li[data-report="ehacsummary"]','EHAC Summary visible')
		.assert.visible('div#reportSelectionContainer ul.dropdown-menu li[data-report="licenseusage"]','License Usage visible')
		.assert.visible('div#reportSelectionContainer ul.dropdown-menu li[data-report="nihsssummary"]','NIHSS Summary visible')
		.assert.visible('div#reportSelectionContainer ul.dropdown-menu li[data-report="nihsstimeintest"]','NIHSS Time in Test visible')
		.assert.visible('div#reportSelectionContainer ul.dropdown-menu li[data-report="parkviewstudycourseevaluations"]','Parkview Study Course Evaluations visible')
		.assert.visible('div#reportSelectionContainer ul.dropdown-menu li[data-report="parkviewstudy"]','Parkview Study visible')
		.assert.visible('div#reportSelectionContainer ul.dropdown-menu li[data-report="pretestdetails"]','Pretest Details visible')
		.assert.visible('div#reportSelectionContainer ul.dropdown-menu li[data-report="qandabreakdown"]','Q and A Breakdown visible')
		.assert.visible('div#reportSelectionContainer ul.dropdown-menu li[data-report="testclearsummary"]','Test Clear Summary visible')
		.assert.visible('div#reportSelectionContainer ul.dropdown-menu li[data-report="testdetails"]','Test Details visible')
		.assert.visible('div#reportSelectionContainer ul.dropdown-menu li[data-report="timebenchmarking"]','Time Benchmarking visible')
		.assert.visible('div#reportSelectionContainer ul.dropdown-menu li[data-report="timeincourse"]','Time In Course visible')
		.assert.visible('div#reportSelectionContainer ul.dropdown-menu li[data-report="userlist"]','User List visible')
		.assert.visible('div#reportSelectionContainer ul.dropdown-menu li[data-report="usersummary"]','User Summary visible')
		
		
  },
  'end':function(browser){
  	browser.end();
  }
};
