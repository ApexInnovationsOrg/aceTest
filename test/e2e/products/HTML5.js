require('env2')('.env');
module.exports = {
  tags:['products', 'HTML5'],
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
  'Launching imPULSE3.0': function (browser) {
	  browser.url('https://' + process.env.HOST + '/Classroom/launch-course.php?ID=81')
	  .assert.containsText('body','Level I of imPULSE 3.0')
  },
  'Launching Sepsis2.0': function (browser) {
	  browser.url('https://' + process.env.HOST + '/Classroom/launch-course.php?ID=138')
	  .assert.containsText('body','Level I of Sepsis 2.0')
  },
  'end':function(browser){
  	browser.end();
  }
};
