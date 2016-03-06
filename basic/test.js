var casper = require('casper').create();

casper.start('http://www.google.es/',function(){
	this.echo(this.getTitle());
})

casper.then(function(){
	this.echo(this.getCurrentUrl());
})
casper.run(function(){
	thid.echo('done').exit();
})