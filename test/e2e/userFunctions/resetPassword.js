require('env2')('.env');
module.exports = {
  tags:['userFunctions', 'resetPassword'], 
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
  'Reset Password by Clicking Login Button': function (browser) {
    browser
	.click('.loginButton')
	.assert.containsText('body', 'Forgot Your Password?')
    .click('a[href="/password/email"]')
	.assert.containsText('body', 'Reset Password')
	.setValue('input[name="Login"]', process.env.USER)
	.click('button[type="submit"]')
	.assert.containsText('body', 'We have e-mailed your password reset link!')
  }, 
  'Reset Password without Valid Email': function (browser) {
    browser
	.click('.loginButton')
	.assert.containsText('body', 'Forgot Your Password?')
    .click('a[href="/password/email"]')
	.assert.containsText('body', 'Reset Password')
	.setValue('input[name="Login"]', this.tempData.dataWithUnixTime + '@apexinnovations.com')
	.click('button[type="submit"]')
	.assert.containsText('body', 'We can\'t find a user with that e-mail address.')
  }, 
};
