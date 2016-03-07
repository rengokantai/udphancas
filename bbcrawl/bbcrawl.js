//name price
var casper = require('casper').create({
	verbose: true,
	logLevel:'debug',
	pageSettings:{
		loadImages:false,
		loadPlugins:false,
		userAgent:'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36'
	}
	//clientScripts:["../bower_components/jquery/dist/jquery.min.js","../bower_components/lodash/dist/lodash.min.js"]

});

var url = 'http://www.bestbuy.com/site/sphero-bb-8-app-enabled-droid-by-sphero-white/4316601.p?id=1219726336859&skuId=4316601/';
var ratings = [];
var dates = [];


function getRatings(){
	var ratings = document.querySelectorAll('.BVRRRatingNormalImage img');
	return Array.prototype.map.call(ratings,function(e){
		return e.getAttribute('title');
	});
}

function getDates(){
	var dates = document.querySelectorAll('span.BVRRValue.BVRRReviewDate');
	return  Array.prototype.map.call(dates,function(e){
		return e.innerText;
	})
}




casper.start(url,function(){
	title = this.echo(this.getTitle());
});

casper.wait(2000);

casper.then(function () {
	 this.click('li[aria-controls="reviews-tab"] a');
})

casper.waitForSelector('.BVRRRatingNormalImage');





casper.then(function(){
	ratings = this.evaluate(getRatings);
	dates = this.evaluate(getDates);
});



casper.then(function(){

});

casper.then(function(){
	this.echo(ratings.length + 'ratings');
	this.echo('-'+ratings.join('\n -'));
	this.echo('-'+dates.join('\n -'))
});

casper.run()