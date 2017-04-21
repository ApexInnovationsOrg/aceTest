require('env2')('.env');
module.exports = {
  before : function(browser)
  {
  	    browser.url('https://' + process.env.HOST + '/admin')
        .setValue('input[name="Username"]', process.env.USER)
        .setValue('input[name="Password"]', process.env.PW)
        .click('input[type="submit"]')
        .assert.containsText('#main_news', 'Welcome')
  },
  'Start Engine': function (browser) {
      browser
      .url('https://' + process.env.HOST + '/admin/doProxyLogon.php?AdminID=24&Login=eddie@apexinnovations.com')
      .pause(1000)
      // .click('select[id="ProductID"] option[value="' + process.env.PRODUCTID + '"]')
      .execute("$('#ProductID').val('" + process.env.PRODUCTID + "').change()")
      .pause(500)
      // .click('.courseRow:first-child input[value="Start"]')
      .execute("$('#Product_" + process.env.PRODUCTID + "').find('input[value=\"Start\"]').first().trigger('click')")
      // .url('https://' + process.env.HOST + '/Classroom/launch-course.php?ID=' + process.env.COURSEID)
      .pause(4000)
      .window_handles(function(result) {
	     var handle = result.value[1];
	     browser.switchWindow(handle);
	   })
      // .waitForElementVisible('body',1000)
      .assert.elementPresent('.pageIdentify')
  },
  'Start ACE': function(browser){
  	browser
  		.click('.pageIdentify')
  		.pause(501)
  		.assert.visible('#ACEModal')
  },
  'Click through ACE properties': function(browser){
  	browser
  		.click('#ACEContent')
		.pause(100)
		.assert.elementPresent('.aceTable','Table present for content')
		.click('#ACEFunFacts')
		.pause(100)
		.assert.elementPresent('.aceTable','Table present for fun facts...')
		.click('#ACEAddtlInfo')
		.pause(100)
		.assert.elementPresent('.aceTable','Table present for additional info')
		.click('#ACEInstructions')
		.pause(100)
		.elements('css selector', '.ACE_data_input_component', function(result) {
					this.assert.equal(result.value.length, 1, 'proper amount of instruction inputs');
				})
		.click('#ACEAssets')
		.pause(100)
		.assert.elementPresent('.aceTable','Table present for ACE Assets')
		.click('#ACEActionGroups')
		.pause(100)
		.assert.elementPresent('.aceTable','Table present for Action Groups')
  },
  'end':function(browser){
  	browser.end();
  }
};
