var casper = require('casper').create({
	verbose: true,
	logLevel:'error',
	clientScript:["bower_components/jquery/dist/jquery.min.js","bower_components/lodash/dist/lodash.min.js"]
})

var links = [];

function getLinks(){
	var links = document.querySelectorAll('.b_algo a');
	return Array.prototype.map.call(links,function(e){
		return e.getAttribute('href');
	});
};

casper.start('http://bing.com/',function(){
	this.fill('form[action="/search"]',{q:'reactjs'},true);
})

casper.then(function(){
	links = this.evaluate(getLinks);
	this.fill('form[action="/search"]',{q:'emberjs'},true);
})

casper.then(function(){
	links = links.concat(this.evaluate(getLinks));
})

casper.run(function(){
	this.echo(links.length + 'links');
	this.echo('-'+links.join('\n -')).exit();
});