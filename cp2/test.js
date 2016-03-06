var casper = require('casper').create();

casper.start('http://en.wikipedia.org',function(){
	this.echo('====');
})

casper.then(function(){
	this.echo(this.getCurrentUrl());
})
casper.run(function(){
	thid.echo('done').exit();
})