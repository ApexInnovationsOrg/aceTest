require('env2')('.env');
module.exports = {
  tags:['products', 'Flash'],
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
  'Launching EHAC Flash': function (browser) {
      browser.url('https://' + process.env.HOST + '/Classroom/launch-course.php?ID=42')
      .pause(10000)
	  .saveScreenshot('./reports/ehac.png')
  },
  'Launching Hemispheres2.0': function (browser) {
      browser.url('https://' + process.env.HOST + '/Classroom/launch-course.php?ID=47')
      .pause(10000)
	  .saveScreenshot('./reports/hemi2.0.png')
  },
  'Launching CanadianHemi2.0': function (browser) {
    browser.url('https://' + process.env.HOST + '/Classroom/launch-course.php?ID=55')
    .pause(10000)
    .saveScreenshot('./reports/canadianhemi2.0.png')
},
'Launching imPULSE2.0': function (browser) {
    browser.url('https://' + process.env.HOST + '/Classroom/launch-course.php?ID=34')
    .pause(10000)
    .saveScreenshot('./reports/impulse2.0.png')
},
'Launching imPULSE2.0 Refresher': function (browser) {
    browser.url('https://' + process.env.HOST + '/Classroom/launch-course.php?ID=83')
    .pause(10000)
    .saveScreenshot('./reports/impulserefresher2.0.png')
},
  'end':function(browser){
  	browser.end();
  }
};
