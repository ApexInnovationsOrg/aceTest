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
      .url('https://' + process.env.HOST + '/admin/doProxyLogon.php?AdminID=29&Login=john@apexinnovations.com')
      .url('https://' + process.env.HOST + '/Reports.php')
      .assert.elementPresent('.pageName')
  },
  'Opening Reports': function(browser){
  	browser
  		.execute("$('#reportDomainContainer .reportDomainButton[data-domain=\"Organization\"]').trigger('click')")
		.assert.attributeContains("button[data-domain=\"Organization\"]", 'class', 'active','Clicked Organization button')
		.assert.visible('#reportSelectionContainer','Reports dropdown visible')
		.pause(2000)
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
  'Benchmarking Report': function(browser){
  	browser
  		.execute("$('div#reportSelectionContainer ul.dropdown-menu li[data-report=\"benchmarking\"]').trigger('click')")
		.execute("$('input[data-param=\"StartDate\"]').data('value','2020-01-01')")
		.execute("$('input[data-param=\"EndDate\"]').data('value','2020-01-02')")
		.pause(1000)
		.execute("$('div[data-param=\"ProductID\"] li[data-id=\"12\"]').trigger('click')")	
		.execute("$('button#reportSubmitButton').trigger('click')")	
		.waitForElementPresent('div#benchmarking',30000,'Report ran')
  },
  'CE Report': function(browser){
  	browser
		.execute("$('button#reportChangeButton').trigger('click')")
  		.execute("$('div#reportSelectionContainer ul.dropdown-menu li[data-report=\"cereport\"]').trigger('click')")
		.execute("$('input[data-param=\"StartDate\"]').data('value','2020-01-01')")
		.execute("$('input[data-param=\"EndDate\"]').data('value','2020-03-16')")
		.pause(1000)
		.execute("$('div[data-param=\"ProductID\"] li[data-id=\"12\"]').trigger('click')")	
		.execute("$('button#reportSubmitButton').trigger('click')")
		.waitForElementPresent('div#cereport',30000,'Report ran')
  },
  'Completion Progress Report': function(browser){
  	browser
		.execute("$('button#reportChangeButton').trigger('click')")
  		.execute("$('div#reportSelectionContainer ul.dropdown-menu li[data-report=\"completionprogress\"]').trigger('click')")
		.execute("$('input[data-param=\"StartDate\"]').data('value','2020-01-01')")
		.execute("$('input[data-param=\"EndDate\"]').data('value','2020-01-02')")
		.pause(1000)
		.execute("$('div[data-param=\"ProductID\"] li[data-id=\"12\"]').trigger('click')")	
		.execute("$('button#reportSubmitButton').trigger('click')")
		.waitForElementPresent('div#completionprogress',30000,'Report ran')
  },
  'Course Evaluations Report': function(browser){
  	browser
		.execute("$('button#reportChangeButton').trigger('click')")
  		.execute("$('div#reportSelectionContainer ul.dropdown-menu li[data-report=\"courseevaluations\"]').trigger('click')")
		.pause(1000)
		.execute("$('div[data-param=\"ProductID\"] li[data-id=\"12\"]').trigger('click')")	
		.execute("$('button#reportSubmitButton').trigger('click')")
		.waitForElementPresent('div#courseevaluations',30000,'Report ran')
  },
  'EHAC Summary Report': function(browser){
  	browser
		.execute("$('button#reportChangeButton').trigger('click')")
  		.execute("$('div#reportSelectionContainer ul.dropdown-menu li[data-report=\"ehacsummary\"]').trigger('click')")
		.execute("$('input[data-param=\"StartDate\"]').data('value','2020-01-01')")
		.execute("$('input[data-param=\"EndDate\"]').data('value','2020-03-01')")
		.pause(1000)
		.execute("$('button#reportSubmitButton').trigger('click')")
		.waitForElementPresent('div#ehacsummary',30000,'Report ran')
  },
  'License Usage Report': function(browser){
  	browser
		.execute("$('button#reportChangeButton').trigger('click')")
  		.execute("$('div#reportSelectionContainer ul.dropdown-menu li[data-report=\"licenseusage\"]').trigger('click')")
		.pause(1000)
		.execute("$('div[data-param=\"LicenseID\"] li[data-id=\"9037\"]').trigger('click')")	
		.execute("$('button#reportSubmitButton').trigger('click')")
		.waitForElementPresent('div#licenseusage',30000,'Report ran')
  },
  'NIHSS Summary Report': function(browser){
  	browser
		.execute("$('button#reportChangeButton').trigger('click')")
  		.execute("$('div#reportSelectionContainer ul.dropdown-menu li[data-report=\"nihsssummary\"]').trigger('click')")
		.execute("$('input[data-param=\"StartDate\"]').data('value','2020-01-14')")
		.execute("$('input[data-param=\"EndDate\"]').data('value','2020-01-28')")
		.pause(1000)
		.execute("$('button#reportSubmitButton').trigger('click')")
		.waitForElementPresent('div#nihsssummary',30000,'Report ran')
  },
  'NIHSS Time in Test Report': function(browser){
  	browser
		.execute("$('button#reportChangeButton').trigger('click')")
  		.execute("$('div#reportSelectionContainer ul.dropdown-menu li[data-report=\"nihsstimeintest\"]').trigger('click')")
		.execute("$('input[data-param=\"StartDate\"]').data('value','2020-01-14')")
		.execute("$('input[data-param=\"EndDate\"]').data('value','2020-01-28')")
		.pause(1000)
		.execute("$('button#reportSubmitButton').trigger('click')")
		.waitForElementPresent('div#nihsstimeintest',30000,'Report ran')
  },
  'Parkview Study Course Evaluations Report': function(browser){
  	browser
		.execute("$('button#reportChangeButton').trigger('click')")
  		.execute("$('div#reportSelectionContainer ul.dropdown-menu li[data-report=\"parkviewstudycourseevaluations\"]').trigger('click')")
		.pause(1000)
		.execute("$('div[data-param=\"ProductID\"] li[data-id=\"68\"]').trigger('click')")	
		.execute("$('button#reportSubmitButton').trigger('click')")
		.waitForElementPresent('div#parkviewstudycourseevaluations',30000,'Report ran')
  },
  'Parkview Study Report': function(browser){
  	browser
		.execute("$('button#reportChangeButton').trigger('click')")
  		.execute("$('div#reportSelectionContainer ul.dropdown-menu li[data-report=\"parkviewstudy\"]').trigger('click')")
		.execute("$('input[data-param=\"StartDate\"]').data('value','2019-01-01')")
		.execute("$('input[data-param=\"EndDate\"]').data('value','2020-01-01')")
		.pause(1000)
		.execute("$('button#reportSubmitButton').trigger('click')")
		.waitForElementPresent('div#parkviewstudy',30000,'Report ran')
  },
  'Pretest Details Report': function(browser){
  	browser
		.execute("$('button#reportChangeButton').trigger('click')")
  		.execute("$('div#reportSelectionContainer ul.dropdown-menu li[data-report=\"pretestdetails\"]').trigger('click')")
		.execute("$('input[data-param=\"StartDate\"]').data('value','2016-01-01')")
		.execute("$('input[data-param=\"EndDate\"]').data('value','2017-01-01')")
		.execute("$('div[data-param=\"ProductID\"] li[data-id=\"9\"]').trigger('click')")
		.pause(1000)
		.execute("$('button#reportSubmitButton').trigger('click')")
		.waitForElementPresent('div#presetdetails',30000,'Report ran')
  },
  'Q and A Breakdown Report': function(browser){
  	browser
		.execute("$('button#reportChangeButton').trigger('click')")
  		.execute("$('div#reportSelectionContainer ul.dropdown-menu li[data-report=\"qandabreakdown\"]').trigger('click')")
		.pause(1000)
		.execute("$('div[data-param=\"ProductID\"] li[data-id=\"12\"]').trigger('click')")
		.execute("$('button#reportSubmitButton').trigger('click')")
		.waitForElementPresent('div#qandabreakdown',30000,'Report ran')
  },
  'Test Clear Summary Report': function(browser){
  	browser
		.execute("$('button#reportChangeButton').trigger('click')")
  		.execute("$('div#reportSelectionContainer ul.dropdown-menu li[data-report=\"testclearsummary\"]').trigger('click')")
		.execute("$('input[data-param=\"StartDate\"]').data('value','2020-01-01')")
		.execute("$('input[data-param=\"EndDate\"]').data('value','2020-01-14')")
		.pause(1000)
		.execute("$('button#reportSubmitButton').trigger('click')")
		.waitForElementPresent('div#testclearsummary',30000,'Report ran')
  },
  'Test Details Report': function(browser){
  	browser
		.execute("$('button#reportChangeButton').trigger('click')")
  		.execute("$('div#reportSelectionContainer ul.dropdown-menu li[data-report=\"testdetails\"]').trigger('click')")
		.execute("$('input[data-param=\"StartDate\"]').data('value','2020-01-01')")
		.execute("$('input[data-param=\"EndDate\"]').data('value','2020-01-14')")
		.pause(1000)
		.execute("$('button#reportSubmitButton').trigger('click')")
		.waitForElementPresent('div#testdetails',30000,'Report ran')
  },
  'Time Benchmarking Report': function(browser){
  	browser
		.execute("$('button#reportChangeButton').trigger('click')")
  		.execute("$('div#reportSelectionContainer ul.dropdown-menu li[data-report=\"timebenchmarking\"]').trigger('click')")
		.pause(1000)
		.execute("$('div[data-param=\"ProductID\"] li[data-id=\"67\"]').trigger('click')")
		.execute("$('button#reportSubmitButton').trigger('click')")
		.waitForElementPresent('div#timebenchmarking',45000,'Report ran')
  },
  'Time In Course Report': function(browser){
  	browser
		.execute("$('button#reportChangeButton').trigger('click')")
  		.execute("$('div#reportSelectionContainer ul.dropdown-menu li[data-report=\"timeincourse\"]').trigger('click')")
		.execute("$('input[data-param=\"StartDate\"]').data('value','2020-01-01')")
		.execute("$('input[data-param=\"EndDate\"]').data('value','2020-01-14')")
		.pause(1000)
		.execute("$('button#reportSubmitButton').trigger('click')")
		.waitForElementPresent('div#timeincourse',30000,'Report ran')
  },
  'User List Report': function(browser){
  	browser
		.execute("$('button#reportChangeButton').trigger('click')")
  		.execute("$('div#reportSelectionContainer ul.dropdown-menu li[data-report=\"userlist\"]').trigger('click')")
		.pause(1000)
		.execute("$('button#reportSubmitButton').trigger('click')")
		.waitForElementPresent('div#userlist',30000,'Report ran')
  },
  'User Summary Report': function(browser){
  	browser
		.execute("$('button#reportChangeButton').trigger('click')")
  		.execute("$('div#reportSelectionContainer ul.dropdown-menu li[data-report=\"usersummary\"]').trigger('click')")
		.execute("$('input[data-param=\"StartDate\"]').data('value','2020-01-01')")
		.execute("$('input[data-param=\"EndDate\"]').data('value','2020-01-14')")
		.pause(1000)
		.execute("$('button#reportSubmitButton').trigger('click')")
		.waitForElementPresent('div#usersummary',30000,'Report ran')
  },
  'end':function(browser){
  	browser.end();
  }
};
