var casper = require('casper').create({
	verbose: true,
	logLevel:'debug',
	pageSettings:{
		userAgent:'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36'
	}

});

var url = 'https://twitter.com/';
var twitterid = 'tom';
var email = 'yuriqiao@aol.com';
var password = '1qaz2wsx';
var searchKey = 'ga';





casper.start(url+twitterid,function(){
	this.echo(this.getTitle());
});

// casper.start().then(function () {
// 	 this.open('https://twitter.com',{
// 	 	method:'get',
// 	 	headers:{
// 	 		''
// 	 	}
// 	 })
// })


// casper.wait(2000,function(){
// 	console.log('test');
// });

casper.then(function() {
	this.fillSelectors('form.js-front-signin',{
		'input[name="session[username_or_email]"]':email,
		'input[name="session[password]"]':password
	},true);
})

casper.then(function(){
	this.echo(this.getCurrentUrl());
});

casper.then(function(){
	this.fill('form#global-nav-search',{
		q:searchKey
	},true);
});

casper.waitForSelector('.trends-inner');

casper.then(function(){
	this.emit('res.log');
});

casper.on('res.log',function(){
	this.captureSelector('t.png','div.stream-container');
});


casper.run();