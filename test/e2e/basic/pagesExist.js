module.exports = {
    '@tags':['basic'],
	afterEach:function(browser){
		browser.assert.not.containsText('html','Warning:')
	},
    'Home Page exists': function(browser){
        browser.url('https://' + process.env.HOST)
        .waitForElementVisible('body')
        .assert.elementPresent('body')
    },
    'Store exists': function(browser){
        browser.url('https://' + process.env.HOST + "/store")
        .waitForElementVisible('body')
        .assert.elementPresent('.sunburst')
    },
    'Admin Site exists': function(browser){
        browser.url('https://' + process.env.HOST + "/store")
        .waitForElementVisible('body')
        .assert.elementPresent('.sunburst')
    },
    'Education Page exists': function(browser){
        browser.url('https://' + process.env.HOST + "/products.html")
        .waitForElementVisible('body')
        .assert.elementPresent('#productModal')
    },
    'Team Page exists': function(browser){
        browser.url('https://' + process.env.HOST + "/team.html")
        .waitForElementVisible('body')
        .assert.elementPresent('canvas')
    },
    'OP Page exists': function(browser){
        browser.url('https://' + process.env.HOST + "/op.html")
        .waitForElementVisible('body')
        .assert.elementPresent('.container .bigPadTop')
    },
    'Careers Page exists': function(browser){
        browser.url('https://' + process.env.HOST + "/careers.html")
        .waitForElementVisible('body')
        .assert.containsText('body', "Teamwork makes the dream work!")
    },
    'Contact Us Page exists': function(browser){
        browser.url('https://' + process.env.HOST + "/contactUs.html")
        .waitForElementVisible('body')
        .assert.containsText('body', "Having trouble logging in? Course not loading?")
    },
    'News Page exists': function(browser){
        browser.url('https://' + process.env.HOST + "/contactUs.html")
        .waitForElementVisible('body')
        .assert.elementPresent(".translucentWhiteBackground")
    }
    
}