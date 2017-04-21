var fs = require('fs');

casper.test.begin('Login to apex', 2, function(test){
	casper.options.waitTimeout = 20000; 
	casper.start('https://apexinnovations.com/admin/Home.php');

	casper.then(function(){
		test.assertTitle('Apex Innovations Admin :: Home','Correct admin title');
		// this.fill('form#Logon',{Username:'eddie',Password:'test123'},true);
	});

	casper.waitForSelector('form#Logon',function(){
		var pText = casper.evaluate(function(){
			return document.querySelector('#main_news').querySelector("p").innerHTML;
		})
		// this.echo(pText);
		casper.fill('form#Logon',{
			Username:casper.cli.get("u"),
			Password:casper.cli.get("p")
		},true)
	})

	casper.waitForSelector('#main_news',function(){
		var pText = casper.evaluate(function(){
			return document.querySelector('#main_news').querySelector("p").innerHTML;
		})
		var loggedOutText = pText == "You are not authorized to view this page. Please login!";
		this.echo(pText);
		test.assertNot(loggedOutText,"Logged in.");

		var cookies = JSON.stringify(phantom.cookies);
		fs.write('testCookie.txt', cookies, 644);
	})

	



	
	casper.run(function(){
		test.done();
	})
})

