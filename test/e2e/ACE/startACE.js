require('env2')('.env');
module.exports = {
  tags:['ACE'],
  before : function(browser)
  {
  	    browser.url('https://' + process.env.HOST + '/admin')
		.waitForElementVisible('body')
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
		.click('.pageIdentify')
		.execute("$('#ACEModal button[data-dismiss=\"modal\"]').trigger('click')")
		.pause(100)
  },
  'Create a text element': (browser)=>{
  	browser
  		.execute('loadPage("PAGE_380100006")')
  		.pause(500)
  		.click('.pageIdentify')
  		.pause(501)
  		.click('#ACEAddElement')
  		.execute("$('li[data-option=\"live_text\"]').trigger('click')")
  		.pause(50)
  		.execute("$('.saveContentTypeText').trigger('click')")
		.execute("tinymce.activeEditor.execCommand('mceInsertContent', false, 'testing text');")
  		.pause(1000)
  		.click('#ACESaveChanges')
  		.pause(1000)
  		.execute("$('.confirm').trigger('click')")
  		.pause(5000)

  },
  'end':function(browser){
  	browser.end();
  }
};
