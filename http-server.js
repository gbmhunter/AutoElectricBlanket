var http = require('http');
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
