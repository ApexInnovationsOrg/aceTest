require('env2')('.env');
module.exports = {
  tags:['userFunctions'],
  tempData:{
		dataWithUnixTime : 'ApexTesting' + Math.round((new Date()).getTime() / 1000)
	},
  beforeEach : function(browser)
  {
		browser.deleteCookies();
		browser.getCookies();
  	    browser.url('https://' + process.env.HOST + '/CreateAccountLanding.php')
		.waitForElementVisible('body').refresh();

		this.tempData.dataWithUnixTime = 'ApexTesting' + Math.round((new Date()).getTime() / 1000)
  },
  'No license key account creation': function (browser) {
    browser
    .click('input[value="NoLicenseAccount"]')
    .click('input[value="Next »"]')
    .assert.urlContains('NIH=1&Acct=1')
    .assert.containsText('body','EHAC and the NIH Stroke Scale are provided FREE OF CHARGE.')
	.setValue('input[name="Organization"]', this.tempData.dataWithUnixTime)
    .click('input[value="Next »"]')
	.waitForElementVisible('#Page2')
	.setValue('input[name="FirstName"]', this.tempData.dataWithUnixTime)
	.setValue('input[name="LastName"]', this.tempData.dataWithUnixTime)
	.setValue('input[name="Email"]', this.tempData.dataWithUnixTime + '@apexinnovations.com')
	.setValue('input[name="ConfirmEmail"]', this.tempData.dataWithUnixTime + '@apexinnovations.com')
	.setValue('input[name="Password2"]', this.tempData.dataWithUnixTime)
	.setValue('input[name="ConfirmPassword2"]', this.tempData.dataWithUnixTime)
    .click('input[value="Next »"]')
	.waitForElementVisible('#Page3')
    .click('input[value="« Back"]')
	.waitForElementVisible('#Page2')
    .click('input[value="« Back"]')//just testing the back & forth functionality
	.waitForElementVisible('#Page1a')
    .click('input[value="Next »"]')
	.waitForElementVisible('#Page2')
    .click('input[value="Next »"]')
	.waitForElementVisible('#Page3')
	.setValue('input[name="Phone"]', '1234567890')
    .click('input[value="Next »"]')
	.waitForElementVisible('#Page4')
	.click('#DepartmentID')
	.click('#DepartmentID option[value="584"]')
	.click('#ProfessionalRolesID')
	.click('#ProfessionalRolesID option[value="2"]')
	.click('#CredentialID')
	.click('#CredentialID option[value="4"]')
    .click('input[value="Next »"]')
	.assert.containsText('#SuccessContent','You have successfully created your new account and have activated the following course')
    .click('#SuccessSubmit')
    .assert.containsText('body','NIH Stroke Scale Training and Certification')
  }, 
'License key account creation': function (browser) {
    browser
    .click('input[value="LicenseAccount"]')
    .click('input[value="Next »"]')
    .assert.not.urlContains('NIH=1')
    .assert.containsText('body','If you have multiple license keys to register, please enter them all in the spaces above.')
	.setValue('input[name="LicenseKey1"]', process.env.LICENSE_KEY)
    .click('input[value="Next »"]')
	.waitForElementVisible('#Page2')
	.setValue('input[name="FirstName"]', this.tempData.dataWithUnixTime)
	.setValue('input[name="LastName"]', this.tempData.dataWithUnixTime)
	.setValue('input[name="Email"]', this.tempData.dataWithUnixTime + '@apexinnovations.com')
	.setValue('input[name="ConfirmEmail"]', this.tempData.dataWithUnixTime + '@apexinnovations.com')
	.setValue('input[name="Password2"]', this.tempData.dataWithUnixTime)
	.setValue('input[name="ConfirmPassword2"]', this.tempData.dataWithUnixTime)
    .click('input[value="Next »"]')
	.waitForElementVisible('#Page3')
    .click('input[value="« Back"]')
	.waitForElementVisible('#Page2')
    .click('input[value="« Back"]')//just testing the back & forth functionality
	.waitForElementVisible('#Page1b')
    .click('input[value="Next »"]')
	.waitForElementVisible('#Page2')
    .click('input[value="Next »"]')
	.waitForElementVisible('#Page3')
	.setValue('input[name="Phone"]', '1234567890')
    .click('input[value="Next »"]')
	.waitForElementVisible('#Page4')
	.click('#DepartmentID')
	.click('#DepartmentID option:nth-child(2)')
	.click('#ProfessionalRolesID')
	.click('#ProfessionalRolesID option[value="2"]')
	.click('#CredentialID')
	.click('#CredentialID option[value="4"]')
    .click('input[value="Next »"]')
	.assert.containsText('#SuccessContent','You have successfully created your new account and have activated the following course')
    .click('#SuccessSubmit')
    .assert.containsText('body','Select a Course')
  }
};
