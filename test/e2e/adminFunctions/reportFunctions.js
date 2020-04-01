/**********/
/*Testing all reports from admin site
/* Admin Benchmarking	-
/* CE Hours Claimed		-
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
			.click('div#menu ul li a[href="Reports.php"]')
			.assert.containsText('div#main_news h1',"Reports","On Reports")
	},
	'Reports page Functions - Admin Benchmarking': function (browser) {
		browser
			.execute("$('select#report option:contains(\"AdminBenchmarking\")').click()")
			.click('input.submit[name="Generate"]')	
			.waitForElementPresent('div#report_header',60000,'Report ran')
			.assert.containsText('div#report_header','Admin Benchmarking')		
			.back()
			.pause(1000)
	},
	'Reports page Functions - CE Hours Claimed': function (browser) {
		browser
			.click('select#report option[id="CEHoursClaimed"]')
			.setValue('#startDate','2019-01-01')
			.setValue('#endDate','2019-01-02')
			.click('input.submit[name="Generate"]')
			.waitForElementPresent('div#report_header',60000,'Report ran')
			.assert.containsText('div#report_header','CE Hours Claimed')
			.back()
			.pause(1000)
	},
	'Reports page Functions - Community Downloads': function (browser) {
		browser
			.click('select#report option[id="CommunityDownloads"]')
			.setValue('#startDate','2019-01-01')
			.setValue('#endDate','2019-01-02')
			.click('input.submit[name="Generate"]')
			.waitForElementPresent('div#report_header',60000,'Report ran')
			.assert.containsText('div#report_header','Community Downloads')
			.back()
			.pause(1000)
	},
	'Reports page Functions - Course Evaluation Questions': function (browser) {
		browser
			.click('select#report option[id="CourseEvaluationQuestions"]')
			.click('input.submit[name="Generate"]')
			.waitForElementPresent('div#report_header',60000,'Report ran')
			.assert.containsText('div#report_header','Course Evaluation Questions')
			.back()
			.pause(1000)
	},
	'Reports page Functions - Course Evaluation Statistics': function (browser) {
		browser
			.click('select#report option[id="CourseEvaluationStatistics"]')
			.click('select#params option[value="ID=121"]')
			.setValue('#startDate','2019-01-01')
			.setValue('#endDate','2019-01-30')
			.click('input.submit[name="Generate"]')
			.waitForElementPresent('div#report_header',60000,'Report ran')
			.assert.containsText('div#report_header','Course Evaluations Statistics')
			.back()
			.pause(1000)
	},
	'Reports page Functions - Course Evaluations Breakdown': function (browser) {
		browser
			.click('select#report option[id="CourseEvaluationsBreakdown"]')
			.click('select#params option[value="ID=221"]')
			.click('input.submit[name="Generate"]')
			.waitForElementPresent('div#report_header',60000,'Report ran')
			.assert.containsText('div#report_header','Course Evaluations Breakdown')
			.back()
			.pause(1000)
	},
	'Reports page Functions - LMS Users': function (browser) {
		browser
			.click('select#report option[id="LMSUsers"]')
			.click('select#params option[value="ID=11396"]')
			.setValue('#startDate','2019-01-01')
			.setValue('#endDate','2019-01-30')
			.click('input.submit[name="Generate"]')
			.waitForElementPresent('div#report_header',60000,'Report ran')
			.assert.containsText('div#report_header','LMS Users')
			.back()
			.pause(1000)
	},
	'Reports page Functions - License Usage': function (browser) {
		browser
			.click('select#report option[id="LicenseUsage"]')
			.click('select#params option[value="ID=221"]')
			.click('input.submit[name="Generate"]')
			.waitForElementPresent('div#report_header',60000,'Report ran')
			.assert.containsText('div#report_header','License Usage')
			.back()
			.pause(1000)
	},
	'Reports page Functions - License Usage Summary': function (browser) {
		browser
			.click('select#report option[id="LicenseUsageSummary"]')
			.click('select#params option[value="ID=221"]')
			.click('input.submit[name="Generate"]')
			.waitForElementPresent('div#report_header',60000,'Report ran')
			.assert.containsText('div#report_header','License Usage Summary')
			.back()
			.pause(1000)
	},
	'Reports page Functions - NIHSS Summary': function (browser) {
		browser
			.click('select#report option[id="NIHSSSummary"]')
			.click('select#params option[value="ID=221"]')
			.click('input.submit[name="Generate"]')
			.waitForElementPresent('div#report_header',60000,'Report ran')
			.assert.containsText('div#report_header','NIHSS Summary')
			.back()
			.pause(1000)
	},
	'Reports page Functions - Organizational Chart': function (browser) {
		browser
			.click('select#report option[id="OrganizationalChart"]')
			.click('select#params option[value="ID=221"]')
			.click('input.submit[name="Generate"]')
			.waitForElementPresent('div#report_header',60000,'Report ran')
			.assert.containsText('div#report_header','Organizational Chart')
			.back()
			.pause(1000)
	},
	'Reports page Functions - Outcome Measures': function (browser) {
		browser
			.click('select#report option[id="OutcomeMeasures"]')
			.setValue('#startDate','2020-01-01')
			.setValue('#endDate','2020-01-01')
			.click('input.submit[name="Generate"]')
			.waitForElementPresent('div#report_header',60000,'Report ran')
			.assert.containsText('div#report_header','Outcome Measures')
			.back()
			.pause(1000)
	},
	'Reports page Functions - PARS and NARS': function (browser) {
		browser
			.click('select#report option[id="PARSandNARS"]')
			.setValue('#startDate','2020-01-01')
			.setValue('#endDate','2020-01-02')
			.click('input.submit[name="Generate"]')
			.waitForElementPresent('div#report_header',60000,'Report ran')
			.assert.containsText('div#report_header','PARS and NARS')
			.back()
			.pause(1000)
	},
	'Reports page Functions - Quarterly CE Report Issues': function (browser) {
		browser
			.click('select#report option[id="QuarterlyCEReportIssues"]')
			.click('select#params option[value="ID=64"]')
			.setValue('#startDate','2020-01-01')
			.setValue('#endDate','2020-01-02')
			.click('input.submit[name="Generate"]')
			.waitForElementPresent('div#report_header',60000,'Report ran')
			.assert.containsText('div#report_header','CE Report - Issues')
			.back()
			.pause(1000)
	},
	'Reports page Functions - Quarterly CE Report MultiChoice': function (browser) {
		browser
			.click('select#report option[id="QuarterlyCEReportMultiChoice"]')
			.click('select#params option[value="CourseID=121"]')
			.setValue('#startDate','2020-01-01')
			.setValue('#endDate','2020-01-02')
			.click('input.submit[name="Generate"]')
			.waitForElementPresent('div#report_header',60000,'Report ran')
			.assert.containsText('div#report_header','CE Report - MultiChoice')
			.back()
			.pause(1000)
	},
	'Reports page Functions - Quarterly CE Report Sessions': function (browser) {
		browser
			.click('select#report option[id="QuarterlyCEReportSessions"]')
			.setValue('#startDate','2020-01-01')
			.setValue('#endDate','2020-01-02')
			.click('input.submit[name="Generate"]')
			.waitForElementPresent('div#report_header',60000,'Report ran')
			.assert.containsText('div#report_header','CE Report - Sessions Only')
			.back()
			.pause(1000)
	},
	'Reports page Functions - Quarterly CE Report TestResults': function (browser) {
		browser
			.click('select#report option[id="QuarterlyCEReportTestResults"]')
			.setValue('#startDate','2020-01-01')
			.setValue('#endDate','2020-01-02')
			.click('input.submit[name="Generate"]')
			.waitForElementPresent('div#report_header',60000,'Report ran')
			.assert.containsText('div#report_header','CE Report - Test Results Only')
			.back()
			.pause(1000)
	},
	'Reports page Functions - Test Answer Keys': function (browser) {
		browser
			.click('select#report option[id="TestAnswerKeys"]')
			.click('select#params option[value="ID=121"]')
			.click('input.submit[name="Generate"]')
			.waitForElementPresent('div#report_header',60000,'Report ran')
			.assert.containsText('div#report_header','Test Answer Keys')
			.back()
			.pause(1000)
	},
	'Reports page Functions - Test Details': function (browser) {
		browser
			.click('select#report option[id="TestDetails"]')
			.click('select#params option[value="ID=221"]')
			.setValue('#startDate','2020-01-01')
			.setValue('#endDate','2020-01-02')
			.click('input.submit[name="Generate"]')
			.waitForElementPresent('div#report_header',60000,'Report ran')
			.assert.containsText('div#report_header','Test Details')
			.back()
			.pause(1000)
	},
	'Reports page Functions - Test Evaluation Responses': function (browser) {
		browser
			.click('select#report option[id="TestEvaluationResponses"]')
			.setValue('#startDate','2020-01-01')
			.setValue('#endDate','2020-01-02')
			.click('input.submit[name="Generate"]')
			.waitForElementPresent('div#report_header',60000,'Report ran')
			.assert.containsText('div#report_header','Test Evaluation Questions')
			.back()
			.pause(1000)
	},
	'Reports page Functions - Test Evaluation Responses Yes - No': function (browser) {
		browser
			.click('select#report option[id="TestEvaluationResponses-Yes-No"]')
			.setValue('#startDate','2020-01-01')
			.setValue('#endDate','2020-01-02')
			.click('input.submit[name="Generate"]')
			.waitForElementPresent('div#report_header',60000,'Report ran')
			.assert.containsText('div#report_header','Test Evaluation Questions - Yes/No')
			.back()
			.pause(1000)
	},
	'Reports page Functions - Test Question Statistics': function (browser) {
		browser
			.click('select#report option[id="TestQuestionStatistics"]')
			.click('select#params option[value="ID=121"]')
			.setValue('#startDate','2020-01-01')
			.setValue('#endDate','2020-01-30')
			.click('input.submit[name="Generate"]')
			.waitForElementPresent('div#report_header',60000,'Report ran')
			.assert.containsText('div#report_header','Test Question Statistics')
			.back()
			.pause(1000)
	},
	'Reports page Functions - Test Questions by Objective': function (browser) {
		browser
			.click('select#report option[id="TestQuestionsbyObjective"]')
			.click('select#params option[value="ID=121"]')
			.click('input.submit[name="Generate"]')
			.waitForElementPresent('div#report_header',60000,'Report ran')
			.assert.containsText('div#report_header','Test Questions by Objective')
			.back()
			.pause(1000)
	},
	'Reports page Functions - Time in Course Statistics': function (browser) {
		browser
			.click('select#report option[id="TimeinCourseStatistics"]')
			.click('select#params option[value="ID=121"]')
			.setValue('#startDate','2020-01-01')
			.setValue('#endDate','2020-01-02')
			.click('input.submit[name="Generate"]')
			.waitForElementPresent('div#report_header',60000,'Report ran')
			.assert.containsText('div#report_header','Time In Course Statistics')
			.back()
			.pause(1000)
	},
	'Reports page Functions - Time in Course Statistics(CAPCE)': function (browser) {
		browser
			.click('select#report option[id="TimeinCourseStatistics(CAPCE)"]')
			.click('select#params option[value="ID=121"]')
			.setValue('#startDate','2020-01-01')
			.setValue('#endDate','2020-01-02')
			.click('input.submit[name="Generate"]')
			.waitForElementPresent('div#report_header',60000,'Report ran')
			.assert.containsText('div#report_header','Time In Course Statistics')
			.back()
			.pause(1000)
	},
	'Reports page Functions - Unusual License Configurations': function (browser) {
		browser
			.click('select#report option[id="UnusualLicenseConfigurations"]')
			.click('select#params option[value="ID=221"]')
			.click('input.submit[name="Generate"]')
			.waitForElementPresent('div#report_header',60000,'Report ran')
			.assert.containsText('div#report_header','Unusual License Configurations')
			.back()
			.pause(1000)
	},
	'end':function(browser){
		browser.end();
	}
};
