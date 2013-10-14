var http = require('http');
var url  = require('url');

global.pinState = 0;


var gpio = require("gpio");

// Calling export with a pin number will export that header and return a gpio header instance
var gpio4 = gpio.export(4, {
   // When you export a pin, the default direction is out. This allows you to set
   // the pin value to either LOW or HIGH (3.3V) from your program.
   direction: 'out',

   // set the time interval (ms) between each read when watching for value changes
   // note: this is default to 100, setting value too low will cause high CPU usage
   interval: 200,

   // Due to the asynchronous nature of exporting a header, you may not be able to
   // read or write to the header right away. Place your logic in this ready
   // function to guarantee everything will get fired properly
   ready: function() {
   }
});


var express = require('express'),
    api = require('./api');
var server = express();
 
server.configure(function(){
  //server.use(express.bodyParser());
  server.use('/bootstrap-switch', express.static(__dirname + '/bootstrap-switch'));
  server.use('/view', express.static(__dirname + '/view'));
});


 
server.post('/', function(req, res) {
	//response.send("AEB home page.");
	
	var url_parts = url.parse(req.url, true);
    var query = url_parts.query;

    console.log(query);
	
	if(query.state)
	{
		if(query.state == 'on')
		{
			console.log('on');
			gpio4.set(1);
		}
		if(query.state == 'off')
		{
			console.log('off');
			gpio4.set(0);
		}
	}
	res.end("Done");
	//res.sendfile('./view/index.html');
});

/*
server.get('/on', function(request, response) {
	
	//response.send("Electric blanket turned on.");
});

server.get('/off', function(request, response) {
	//response.send("Electric blanket turned off.");
	
});
*/
 
// JSON API
//server.get('/switches', api.switches);
//server.get('/switches/:id', api.switch);
//server.post('/switches', api.addSwitch);
//server.put('/switches/:id', api.editSwitch);
//server.delete('/switches/:id', api.deleteSwitch);
 
// Start server
server.listen(8000);
console.log("Server running at http://127.0.0.1:8000/");

/*
http.createServer( function(req, res)
{
	var currentTime = new Date();
	console.log('Client called at ' + currentTime);

	res.writeHead(200, {'Content-Type':'text/plain'});
	res.write('RaspberryPi says hi.\n');
	//if(global.pinState == 0)
	//{
         //       global.pinState = 1;
	//	res.write('Setting pin high.');
        //}
	//else
	//{
        //        global.pinState = 0;
	//	res.write('Setting pin low.')
	//}
	//res.end();
	
	//if(global.pinState == 0)
	//	global.pinState = 1;
	//else
	//	global.pinState = 0;
	//gpio4.set(global.pinState);

	res.write('Setting pin high.');
	gpio4.set(1);
	setTimeout(function() {
		res.write('Setting pin low.')
        	gpio4.set(0);

        	res.end();

	}, 3000);	
	

}).listen('8124');
*/