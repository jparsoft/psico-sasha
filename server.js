//Levantando server
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
//Cargando libreria para manejar arduino firmata
var five = require("johnny-five");
var board = new five.Board();

//=============================================

//Levanto servidor en puerto 8000
server.listen(4000, function () {
  console.log("Servidor levantado");
});
//=============================================

users = [];
connections = [];


//=============================================

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

//==============================================


board.on("ready", function () {
  console.log("Arduino conectado");
  console.log("==================================");
  // Create an Led on pin 13 
  var led1 = new five.Led(13);
  var led2 = new five.Led(12);
  var led3 = new five.Led(11);
  var led4 = new five.Led(10);
  //==============================================  
  //Probando leds 
  io.on('connection', function (socket) {
    connections.push(socket);
    console.log("==================================");
    console.log('Conectados: %s sockets connected', connections.length);


    socket.on('disconnect', function () {
      connections.splice(connections.indexOf(socket), 1);
      console.log("==================================");
      console.log('Conectados: %s sockets connected', connections.length);
    });


    socket.on('evento', function (data) {
      io.emit('btn estado', data);
      console.log("==================================");
      console.log(data);
      switch (data) {
        case 'true btn1':
          led1.on();
          console.log('led 1 activo');
          break;
        case 'true btn2':
          led2.on();
          console.log('led 2 activo');
          break;
        case 'true btn3':
          led3.on();
          console.log('led 3 activo');
          break;
        case 'false btn1':
          led1.off();
          console.log('led 1 desactivo');
          break;
        case 'false btn2':
          led2.off();
          console.log('led 2 desactivo');
          break;
        case 'false btn3':
          led3.off();
          console.log('led 3 desactivo');
          break;

        default:
          break;
      }

    });


    io.clients(function (error, clients) {
      if (error) throw error;
      console.log("==================================");
      console.log(clients); // => [6em3d4TJP8Et9EMNAAAA, G5p55dHhGgUnLUctAAAB]
    });

  });

});


//=============================================