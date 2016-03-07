####udphancasp

Notes
#####1
using node 4, phantomjs 1.9.7 and casperjs1.1.0 beta-5  
5 methods:
```
create()
echo()
then()
run()
start()
```
#####6
some param to bypass https
```
casperjs --ssl-protocal=any
casperjs --ignore-ssl-errors=true
casperjs --web-security=no
```

######Dont pull css
```js
casper.options.onResourceRequested = function(C,requestData,request){
	if((/http:\/\/.+?.css/gi).test(requestData['url'])||requestData['Content-Type']=='text/css'){
		request.abort();
	}
}
```
#####errors
```js
casper.on('resource.error',)
casper.on('remote.message',)
casper.on('page.error',)
```

scrollToBottom
```js
casper('http://',function(){
	this.scrollToBottom();
	this.wait(1000);
})
```

or, customized
```js
casper.start(url,function(){
	this.wait(1000,function(){
	this.page.scrollPosition={
	top:this.page.scrollPosition['top']+document.body.scrollHeight,
	left:0
	};
	if(this.visible("div.loadmore"){
	.....
	})
	})
})
```