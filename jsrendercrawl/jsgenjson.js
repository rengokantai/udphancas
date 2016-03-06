var casper = require('casper').create({
	verbose: true,
	logLevel:'error',
	pageSettings:{
		loadImages:false,
		loadPlugins:false,
		userAgent:'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.116 Safari/537.36'
	},
	clientScripts:["../bower_components/jquery/dist/jquery.min.js","../bower_components/lodash/dist/lodash.min.js"]

});

var fs = require('fs');

var url = 'http://pycoders.com/archive/';
var link = [];
var title = [];
var date = [];
var output = [];

function genJSON(){
	output.push({
		link:link,
		title:title,
		date:date
	});
	return JSON.stringify(output);
}

function getLinks(){
	var link = $('.campaign a');
	return _.map(link,function(e){
		return e.getAttribute('href');
	});
}

function getTitle(){
	var title = $('.campaign a');
	return _.map(title,function(e){
		return e.innerHTML.replace(/\:.*$/g,''); //innerText will print char like &nbsp;
	})
}

function getDate(){
	var date = $('.campaign');
	return _.map(date,function(e){
		return e.innerText.replace(/\-.*$/g,''); //innerText will print char like &nbsp;
	})
}


casper.start(url,function(){
	title = this.evaluate(getTitle);
});


casper.then(function(){
	links = this.evaluate(getLinks);
});



casper.then(function(){
	date = this.evaluate(getDate);
});

// casper.run(function(){
// 	this.echo(links.length + 'links');
// 	this.echo('-'+links.join('\n -'));
// 	this.echo('-'+title.join('\n -'));
// 	this.echo('-'+date.join('\n -')).exit();
// });

casper.run(function () {
	var data =output;
	fs.write('data.json',data,'w');
	this.echo('exported json').exit();
})