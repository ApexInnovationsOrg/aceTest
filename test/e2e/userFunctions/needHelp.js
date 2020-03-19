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
  }, 
  
};
