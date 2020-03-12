module.exports = {
    '@tags':['basic'],
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
    }
}