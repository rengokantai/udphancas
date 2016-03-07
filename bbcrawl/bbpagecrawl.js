
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
var currentPage = 1;
var startPage = '';
function terminate(){
	this.echo('terminate').exit();
}

function startPageFn(){
	var startPage = document.querySelector("span.BVRRSelectedPageNumber");
	return Array.prototype.map.call(startPage,function(e){
		return e.innerText;
	})
}


var processPage = function(){
	casper.wait(1000,function(){
		console.log('1 sec');
	})
	this.echo(currentPage);
	this.capture('results-p' + currentPage+".png");

	if(currentPage>3||!this.exists('.BVRRRatingNormalImage')){
		return terminate.call(casper);
	}
	currentPage++;
	this.echo('request next: '+currentPage);
	this.thenClick('span.BVRRPageLink.BVRRNextPage a').then(function(){
		this.waitFor(function(){
			return startPage!=1;
		},processPage,terminate);
	});
}

casper.start(url,function(){
	title = this.echo(this.getTitle());
});

casper.wait(2000);

casper.then(function () {
	 this.click('li[aria-controls="reviews-tab"] a');
})


casper.then(function(){
	startPage=this.evaluate(startPageFn);
})

casper.waitForSelector('.BVRRRatingNormalImage',processPage,terminate);

casper.run();