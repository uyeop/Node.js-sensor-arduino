var fs = require('fs');
var http = require('http');
var socketio = require('socket.io');
var url = require("url"); 
var SerialPort = require("serialport").SerialPort;

var socketServer;
var serialPort;
var portName = '/dev/ttyACM0'; //change this to your Arduino port
var receivedData = "";
var sendData = "";

// handle contains locations to browse to (vote and poll); pathnames.
function startServer(route,handle,debug)
{
    // on request event
	function onRequest(request, response) {
	  // parse the requested url into pathname. pathname will be compared
	  // in route.js to handle (var content), if it matches the a page will 
	  // come up. Otherwise a 404 will be given. 
	  var pathname = url.parse(request.url).pathname; 
	  console.log("Request for " + pathname + " received");
	  var content = route(handle,pathname,response,request,debug);
	}
	
	var httpServer = http.createServer(onRequest).listen(1337, function(){
		console.log("Listening at: http://localhost:1337");
		console.log("Server is up");
	}); 
	serialListener(debug);
	initSocketIO(httpServer,debug);
}

function initSocketIO(httpServer,debug)
{
	socketServer = socketio.listen(httpServer);
	if(debug == false){
		socketServer.set('log level', 1); // socket IO debug off
	}
	socketServer.on('connection', onConnect);
}


// Define the different actions to communicate with the browser
function onConnect(socket)
{
    console.log("user connected");
    socket.emit('onconnection', {frame:sendData});

    socketServer.on('update', function(data) 
                            {
                                //console.log(data);
                                socket.emit('updateData',{frame:data});
                            });
    socket.on('buttonval', function(data) 
                            {
                                serialPort.write(data + 'E');
                            });
    socket.on('sliderval', function(data) 
                            {
	                            serialPort.write(data + 'P');
                            });
}

// Listen to serial port
function serialListener(debug)
{
    serialPort = new SerialPort(portName, {
        baudrate: 9600,
        // defaults for Arduino serial communication
         dataBits: 8,
         parity: 'none',
         stopBits: 1,
         flowControl: false
    });
 
    serialPort.on("open", function () 
                            {
                                console.log('open serial communication');
                                // Listens to incoming data
                                 serialPort.on('data', receiveData);  
    });  
}

//handle the received data from serial port
function receiveData(data)
{

    receivedData += data.toString();
    if (receivedData.indexOf('start') >= 0 && receivedData.indexOf('end') >= 0) 
    {
        sendData = receivedData.substring(receivedData.indexOf('start') +5, receivedData.indexOf('end'));
        receivedData = '';
    }
    // send the incoming data to browser with websockets.
    socketServer.emit('update', sendData);

}


exports.start = startServer;