require('env2')('.env');
module.exports = {
  tags:['products', 'HTML5', 'NIHSS'],
  before : function(browser)
  {
  	    browser.url('https://' + process.env.HOST + '/admin')
		.waitForElementVisible('body')
        .setValue('input[name="Username"]', process.env.USER)
        .setValue('input[name="Password"]', process.env.PW)
        .click('input[type="submit"]')
		.assert.containsText('#main_news', 'Welcome')
		.execute("window.newcommand = $('.button[value=\"Proxy Login as Self\"]').attr('onclick').replace(\",'_blank'\",\",'_self'\")")
		.execute("$('.button[value=\"Proxy Login as Self\"]').attr('onclick',window.newcommand).trigger('click')") 
  },
  'Proxy Login as self': function (browser) {
      browser.assert.elementPresent('.pageName')	
  },
  'Launching NIHSS': function (browser) {
	  browser.url('https://' + process.env.HOST + '/doLaunchCourse.php?ID=41')
	  .assert.containsText('body','NIH Stroke Scale Training & Certification')
  },
  'end':function(browser){
  	browser.end();
  }
};
