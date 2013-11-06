var http = require('http');
var url  = require('url');

global.pinState = 0;

// POWER enum
var POWER = {
	OFF  : {value: 0, name: "Off", powerTick: 0}, 
	LOW  : {value: 1, name: "Low", powerTick: 1}, 
	MED  : {value: 2, name: "Medium", powerTick: 2}, 
	HIGH : {value: 3, name: "High", powerTick: 3}
}; 

// STATE enum
var STATE = {
	OFF  : {value: 0, name: "Off"}, 
	ON  : {value: 1, name: "On"}
}; 

//============= GPIO SETUP ===============//

var gpio = require("gpio");

// ONLINE LED (OUTPUT)

// Calling export with a pin number will export that header and return a gpio header instance
var gpioOnline = gpio.export(25, {
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

// POWER LED (OUTPUT)

var gpioPower = gpio.export(4, {
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

// POWER LEVEL LEDS (OUTPUTS)

var gpioLowPwr = gpio.export(24, {
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

var gpioMedPwr = gpio.export(23, {
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

var gpioHighPwr = gpio.export(22, {
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

// RELAY CONTROL (OUTPUT)

var gpioRelay = gpio.export(17, {
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

// PUSH-BUTTON SWITCH (INPUT)

var gpioSwitch = gpio.export(18, {
   // When you export a pin, the default direction is out. This allows you to set
   // the pin value to either LOW or HIGH (3.3V) from your program.
   direction: 'in',

   // set the time interval (ms) between each read when watching for value changes
   // note: this is default to 100, setting value too low will cause high CPU usage
   interval: 50,

   // Due to the asynchronous nature of exporting a header, you may not be able to
   // read or write to the header right away. Place your logic in this ready
   // function to guarantee everything will get fired properly
   ready: function() {
   }
}); 

// Bind to the "change" event
gpioSwitch.on("change", function(val) {
	// val will be one when pushed down, zero when released
	if(val == 1)
	{
		// Always go to on state if push button is pressed.
		relayState = STATE.ON;
		if(powerLevel == POWER.OFF)
		{
			powerLevel = POWER.LOW;
		}
		else if(powerLevel == POWER.LOW)
		{
			powerLevel = POWER.MED;
		}
		else if(powerLevel == POWER.MED)
		{
			powerLevel = POWER.HIGH;
		}
		else if(powerLevel == POWER.HIGH)
		{
			powerLevel = POWER.OFF;
		}
	}   
});

// The current power level of the electric blanket. Off is the default.
var powerLevel = POWER.OFF;

var relayState = STATE.OFF;

var express = require('express'),
    api = require('./api');
var server = express();
 
server.configure(function(){
  // File system for bootstrap switch (radio button)
  server.use('/bootstrap-switch', express.static(__dirname + '/bootstrap-switch'));
  
  // File system for bootstrap slider
  server.use('/slider', express.static(__dirname + '/slider'));
  
  // File system for index.html
  server.use('/', express.static(__dirname + '/view'));
});

var tick = 0;

// Called once per second
function RelayControl()
{
	tick++;
	if(tick >= 3)
		tick = 0;
	
	if(relayState == STATE.ON)
	{
		if(powerLevel == POWER.OFF)
		{
			gpioLowPwr.set(0);
			gpioMedPwr.set(0);
			gpioHighPwr.set(0);
		}
		else if(powerLevel == POWER.LOW)
		{
			gpioLowPwr.set(1);
			gpioMedPwr.set(0);
			gpioHighPwr.set(0);
		}
		else if(powerLevel == POWER.MED)
		{
			gpioLowPwr.set(1);
			gpioMedPwr.set(1);
			gpioHighPwr.set(0);
		}
		else if(powerLevel == POWER.HIGH)
		{
			gpioLowPwr.set(1);
			gpioMedPwr.set(1);
			gpioHighPwr.set(1);
		}
	
		if(powerLevel.powerTick > tick)
		{
			gpioRelay.set(1);
		}
		else
		{
			gpioRelay.set(0);
			
		}
	
	}
	else
	{
		gpioRelay.set(0);
		gpioLowPwr.set(0);
		gpioMedPwr.set(0);
		gpioHighPwr.set(0);
	}
	
	
	//gpioPower.set(1);
	//console.log(tick);
}

// Called if info is posted to the root URL
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
			relayState = STATE.ON;
		}
		if(query.state == 'off')
		{
			console.log('off');
			relayState = STATE.OFF;
		}
	}
	
	if(query.power)
	{
		if(query.power == 0)
			powerLevel = POWER.OFF;
		else if(query.power == 1)
			powerLevel = POWER.LOW;
		else if(query.power == 2)
			powerLevel = POWER.MED;
		else if(query.power == 3)
			powerLevel = POWER.HIGH;
	}
	
	// Have to send something, otherwise client browser treats it as a failed communication
	res.end("Done");
	//res.sendfile('./view/index.html');
});

// Start server
server.listen(8000);
console.log("Server running at http://127.0.0.1:8000/");

// Start relay control
setInterval(RelayControl, 1000);

// Start connectivity checker
setInterval(ConnectivityChecker, 5000);

function ConnectivityChecker()
{
	require('dns').resolve('www.google.com', function(err) {
		if (err)
		{
			// no connection
			// Set the online LED on
			gpioOnline.set(0);
		}
		else
		{
			// connection
			// Set the online LED on
			gpioOnline.set(1);
		}
	});
}

//============= GRAVEYARD ===============//

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

server.get('/on', function(request, response) {
	
	//response.send("Electric blanket turned on.");
});

server.get('/off', function(request, response) {
	//response.send("Electric blanket turned off.");
	
});

 
// JSON API
//server.get('/switches', api.switches);
//server.get('/switches/:id', api.switch);
//server.post('/switches', api.addSwitch);
//server.put('/switches/:id', api.editSwitch);
//server.delete('/switches/:id', api.deleteSwitch);

*/