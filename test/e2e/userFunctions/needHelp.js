require('env2')('.env');
module.exports = {
  tags:['userFunctions', 'needHelp'], 
  tempData:{
		dataWithUnixTime : 'ApexTesting' + Math.round((new Date()).getTime() / 1000)
	},
  beforeEach : function(browser)
  {
		browser.deleteCookies();
		browser.getCookies();
  	    browser.url('https://' + process.env.HOST)
		.waitForElementVisible('body');

		this.tempData.dataWithUnixTime = 'ApexTesting' + Math.round((new Date()).getTime() / 1000)
  },

  'Submit Tech Ticket by Clicking Need Help Button': function (browser) {
    browser
	.click('#customerSupportHelpButton')
	.assert.containsText('body', 'Customer/Technical Support', 'Common Questions', 'Contact Support')
	.click('button[class="btn btn-secondary"]')
	.assert.containsText('body', 'Contacting Support', 'How would you like to be contacted?', 'Back')
	.click('button[class="btn btn-link"]') // testing back & forth functionality
	.click('button[class="btn btn-secondary"]')
	.click('span[title="Email"]')
	.assert.containsText('body', 'We\'ll email you.', 'Please provide an email address where we can reach you.')
	.setValue('input[type="Email"]', process.env.USER)
	.setValue('input[placeholder="First Name"]', 'John')
	.setValue('input[placeholder="Last Name"]', 'Doe')
	.waitForElementVisible('.selectedIssueSelectionContainer')
	.click('button[class="dropdown-toggle btn btn-secondary"]')
	.assert.visible('a[title="I don\'t remember my login email and/or password."]') //validating every option is in the list
	.assert.visible('a[title="I need to update my name and/or email address."]')
	.assert.visible('a[title="I need a copy of my certificate(s)."]')
	.assert.visible('a[title="I need to sync my score to my LMS."]')
	.assert.visible('a[title="I need a test reset."]')
	.assert.visible('a[title="I\'m logged in, but I can\'t access the course."]')
	.assert.visible('a[title="Something else..."]')
	.click('a[title="I don\'t remember my login email and/or password."]')
	.waitForElementVisible('textarea[class="fullWidth"]')
	.setValue('textarea[placeholder="Providing a clear, concise description of the problem you\'re having helps us to better help you. Be sure to provide any context you think could be relevant. We appreciate you taking the time."]', 'Test tech support ticket, please ignore!')
	.click({
		selector: 'button[class="btn btn-secondary"]',
		index: 1
	})
	.waitForElementVisible('button[class="btn btn-success"]')
	.click({
		selector: 'button[class="btn btn-success"]',
		index: 0
	}) //submit the ticket!
	.pause(5000)
	.assert.containsText('body', 'Your support request was submitted successfully')
  }, 

  'Submit Tech Ticket While Logged In': function(browser){ //logging in and proxy in as self
	browser.url('https://' + process.env.HOST + '/admin')
	.waitForElementVisible('body')
	.setValue('input[name="Username"]', process.env.USER)
	.setValue('input[name="Password"]', process.env.PW)
	.click('input[type="submit"]')
	.assert.containsText('#main_news', 'Welcome')
	.execute("window.newcommand = $('.button[value=\"Proxy Login as Self\"]').attr('onclick').replace(\",'_blank'\",\",'_self'\")")
	.execute("$('.button[value=\"Proxy Login as Self\"]').attr('onclick',window.newcommand).trigger('click')")
	.click('#customerSupportHelpButton')
	.assert.containsText('body', 'Customer/Technical Support', 'Common Questions', 'Contact Support')
	.click('button[class="btn btn-secondary"]')
	.assert.containsText('body', 'Contacting Support', 'How would you like to be contacted?', 'Back')
	.click('button[class="btn btn-link"]') // testing back & forth functionality
	.click('button[class="btn btn-secondary"]')
	.click('span[title="Email"]')
	.assert.containsText('body', 'We\'ll email you.', 'Please provide an email address where we can reach you.')
	.setValue('input[type="Email"]', process.env.USER)
	.waitForElementVisible('.selectedIssueSelectionContainer')
	.click('button[class="dropdown-toggle btn btn-secondary"]')
	.assert.visible('a[title="I don\'t remember my login email and/or password."]') //validating every option is in the list
	.assert.visible('a[title="I need to update my name and/or email address."]')
	.assert.visible('a[title="I need a copy of my certificate(s)."]')
	.assert.visible('a[title="I need to sync my score to my LMS."]')
	.assert.visible('a[title="I need a test reset."]')
	.assert.visible('a[title="I\'m logged in, but I can\'t access the course."]')
	.assert.visible('a[title="Something else..."]')
	.click('a[title="I don\'t remember my login email and/or password."]')
	.waitForElementVisible('textarea[class="fullWidth"]')
	.setValue('textarea[placeholder="Providing a clear, concise description of the problem you\'re having helps us to better help you. Be sure to provide any context you think could be relevant. We appreciate you taking the time."]', 'Test tech support ticket, please ignore!')
	.click({
		selector: 'button[class="btn btn-secondary"]',
		index: 1
	})
	.waitForElementVisible('button[class="btn btn-success"]')
	.click({
		selector: 'button[class="btn btn-success"]',
		index: 0
	}) //submit the ticket!
	.pause(5000)
	.assert.containsText('body', 'Your support request was submitted successfully') 
  },

  'Submit Tech Ticket by Clicking Contact Us': function (browser) {
	browser.url('https://' + process.env.HOST + '/contactUs.html')
	.assert.containsText('body', 'Technical Support')
	.click('span[class="visible-sm-inline-block visible-md-inline-block visible-lg-inline-block"]')
	.assert.containsText('body', 'Customer/Technical Support', 'Common Questions', 'Contact Support')
	.click('button[class="btn btn-secondary"]')
	.assert.containsText('body', 'Contacting Support', 'How would you like to be contacted?', 'Back')
	.click('button[class="btn btn-link"]') // testing back & forth functionality
	.click('button[class="btn btn-secondary"]')
	.click('span[title="Email"]')
	.assert.containsText('body', 'We\'ll email you.', 'Please provide an email address where we can reach you.')
	.setValue('input[type="Email"]', process.env.USER)
	.setValue('input[placeholder="First Name"]', 'John')
	.setValue('input[placeholder="Last Name"]', 'Doe')
	.waitForElementVisible('.selectedIssueSelectionContainer')
	.click('button[class="dropdown-toggle btn btn-secondary"]')
	.assert.visible('a[title="I don\'t remember my login email and/or password."]') //validating every option is in the list
	.assert.visible('a[title="I need to update my name and/or email address."]')
	.assert.visible('a[title="I need a copy of my certificate(s)."]')
	.assert.visible('a[title="I need to sync my score to my LMS."]')
	.assert.visible('a[title="I need a test reset."]')
	.assert.visible('a[title="I\'m logged in, but I can\'t access the course."]')
	.assert.visible('a[title="Something else..."]')
	.click('a[title="I don\'t remember my login email and/or password."]')
	.waitForElementVisible('textarea[class="fullWidth"]')
	.setValue('textarea[placeholder="Providing a clear, concise description of the problem you\'re having helps us to better help you. Be sure to provide any context you think could be relevant. We appreciate you taking the time."]', 'Test tech support ticket, please ignore!')
	.click({
		selector: 'button[class="btn btn-secondary"]',
		index: 1
	})
	.waitForElementVisible('button[class="btn btn-success"]')
	.click({
		selector: 'button[class="btn btn-success"]',
		index: 0
	}) //submit the ticket!
	.pause(5000)
	.assert.containsText('body', 'Your support request was submitted successfully') 
  },

  'Submit Tech Ticket by Clicking Contact Us While Logged In': function (browser) {
	browser.url('https://' + process.env.HOST + '/admin')
	.waitForElementVisible('body')
	.setValue('input[name="Username"]', process.env.USER)
	.setValue('input[name="Password"]', process.env.PW)
	.click('input[type="submit"]') 
	.assert.containsText('#main_news', 'Welcome')
	.execute("window.newcommand = $('.button[value=\"Proxy Login as Self\"]').attr('onclick').replace(\",'_blank'\",\",'_self'\")")
	.execute("$('.button[value=\"Proxy Login as Self\"]').attr('onclick',window.newcommand).trigger('click')")
	.click({
		selector: 'li[class="dropdown"]',
		index: 3
	})
	.click('a[href="contactUs.html"]')
	.assert.containsText('body', 'Technical Support')
	.click('span[class="visible-sm-inline-block visible-md-inline-block visible-lg-inline-block"]')
	.assert.containsText('body', 'Customer/Technical Support', 'Common Questions', 'Contact Support')
	.click('button[class="btn btn-secondary"]')
	.assert.containsText('body', 'Contacting Support', 'How would you like to be contacted?', 'Back')
	.click('button[class="btn btn-link"]') // testing back & forth functionality
	.click('button[class="btn btn-secondary"]')
	.click('span[title="Email"]')
	.assert.containsText('body', 'We\'ll email you.', 'Please provide an email address where we can reach you.')
	.waitForElementVisible('.selectedIssueSelectionContainer')
	.click('button[class="dropdown-toggle btn btn-secondary"]')
	.assert.visible('a[title="I don\'t remember my login email and/or password."]') //validating every option is in the list
	.assert.visible('a[title="I need to update my name and/or email address."]')
	.assert.visible('a[title="I need a copy of my certificate(s)."]')
	.assert.visible('a[title="I need to sync my score to my LMS."]')
	.assert.visible('a[title="I need a test reset."]')
	.assert.visible('a[title="I\'m logged in, but I can\'t access the course."]')
	.assert.visible('a[title="Something else..."]')
	.click('a[title="I don\'t remember my login email and/or password."]')
	.waitForElementVisible('textarea[class="fullWidth"]')
	.setValue('textarea[placeholder="Providing a clear, concise description of the problem you\'re having helps us to better help you. Be sure to provide any context you think could be relevant. We appreciate you taking the time."]', 'Test tech support ticket, please ignore!')
	.click({
		selector: 'button[class="btn btn-secondary"]',
		index: 1
	})
	.waitForElementVisible('button[class="btn btn-success"]')
	.click({
		selector: 'button[class="btn btn-success"]',
		index: 0
	}) //submit the ticket!
	.pause(5000)
	.assert.containsText('body', 'Your support request was submitted successfully') 
  }  
};
