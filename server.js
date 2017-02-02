//Levantando server
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
//=============================================

//Levanto servidor en puerto 8000
server.listen(4000,function(){
   console.log("Servidor levantado"); 
});
//=============================================

users = [];
connections = [];

//=============================================

app.get('/', function (req, res) {
  res.sendFile(__dirname +'/index.html');
});

//==============================================

io.sockets.on('connection', function(socket){
    connections.push(socket);
    console.log('Conectados: %s sockets connected',connections.length);
    
    //Desconexion
    //connectios.splice(connections.indexOf())
    
});



//=============================================
//Cargando libreria para manejar arduino firmata
var five = require("johnny-five");
var board = new five.Board();
 
board.on("ready", function() {
    console.log("Arduino conectado");
  // Create an Led on pin 13 
  var led1 = new five.Led(13);
  var led2 = new five.Led(12);
  var led3 = new five.Led(11);
  var led4 = new five.Led(10);    
//==============================================  
  //Probando leds 
  //led1.blink(500);
  //led2.blink(600);
  //led3.blink(700);
  //led4.on();    
//==============================================    
});