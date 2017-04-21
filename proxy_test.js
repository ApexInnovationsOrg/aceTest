var fs = require('fs');

casper.test.begin('Proxy Login to eddie@apexinnovations.com', 3, function(test){
	casper.on('remote.message', function(msg) {
	    this.echo('console.log: ' + msg);
	})
	
	casper.options.waitTimeout = 20000; 
	var data = fs.read('testCookie.txt');
	phantom.cookies = JSON.parse(data);

	casper.start('https://apexinnovations.com/admin/doProxyLogon.php?AdminID=24&Login=eddie@apexinnovations.com', function(){
		test.assertHttpStatus(200);
	});

	casper.then(function(){
		test.assertTitle('Apex Innovations :: My Curriculum','Correct curriculum title');
	});

	casper.waitForSelector('select#ProductID',function(){
		this.evaluate(function(){
			$('#ProductID').val('39').change();
		})
		
		var systemicTitle = this.evaluate(function(){
			return $('#Table_39 h1').text();
		})


		casper.test.assert(systemicTitle == 'Systemic','Cool - proxy logged in and can select different courses')

		var cookies = JSON.stringify(phantom.cookies);
		fs.write('testCookie.txt', cookies, 644);
	})
	
	casper.run(function(){
		test.done();
	})
})

