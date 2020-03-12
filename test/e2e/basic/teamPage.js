module.exports = {
    '@tags':['basic'],
    'Home Page exists': function(browser){
        browser.url('https://' + process.env.HOST + "/team.html")
        .waitForElementVisible('body')
        .assert.elementPresent('canvas')
    }
}