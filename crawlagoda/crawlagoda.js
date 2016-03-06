//name price
var casper = require('casper').create({
	verbose: true,
	logLevel:'debug',
	pageSettings:{
		loadImages:false,
		loadPlugins:false,
		userAgent:'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36'
	},
	clientScripts:["../bower_components/jquery/dist/jquery.min.js","../bower_components/lodash/dist/lodash.min.js"]

});

var url = 'http://www.agoda.com/pages/agoda/default/DestinationSearchResult.aspx?asq=ltZUx7IfD1MB%2bs%2bu8Bt1hmj7ZRP%2bpD1u84J421cc6R12VkktIRK1FyNY37VdM9EHjeMVbk5xSQyYWSvGDmY3wI%2bhEvUO9yr3rWBskxpewivYhzwdXoT6ZvFL83WMfWoLCpAzJy%2bIPcIhZIlXClDyym2c0wr1KhL%2fgrsEhZU%2b5Lgf7EIxDoTvxDSIG61j7TJX6ZxCORhL3RKFmdrXVbrcEbICjpP%2bZXhLJok%2f33DHkuHSVIog4XPXwMMI07nEqsJN&city=17072&tick=635929194174/';
var names = [];
var prices = [];


function getNames(){
	var names = $('[data-selenium=hotel-name]');
	return _.map(names,function(e){
		return e.innerHTML;
	});
}

function getPrices(){
	var prices = $('[data-selenium=display-price]');
	return _.map(prices,function(e){
		return e.innerHTML;
	})
}




casper.start(url,function(){
	title = this.echo(this.getTitle());
});

casper.waitForSelector('.hotel-name');

casper.then(function () {
	 this.clickLabel('Stars (5...1)','span');
})

casper.wait(1000);

casper.then(function(){
	names = this.evaluate(getNames);
	prices = this.evaluate(getPrices);
});



casper.then(function(){

});

casper.then(function(){
	this.echo(names.length + 'links');
	this.echo('-'+names.join('\n -'));
	this.echo('-'+prices.join('\n -')).exit();
});

casper.run()