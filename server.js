

var SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline')
var serialPort = SerialPort.serialPort;
var sp = new SerialPort("com10", {
  baudRate: 9600,
});
var  elemnts = new Array(10);
for (let i = 0; i< elemnts.length;i++){
  elemnts[i]= 0;
}
var toSend;
var sendToarduino= "";

sp.on("open",open);
sp.on("data",getData);

const parser = sp.pipe(new Readline({ delimiter: '\r\n' }))
//const parser = sp.parser.readLine(("\r\n"));
var d = parser.on('data',getData);


var incoming;

function open(){
  console.log("port is open");
}

function getData(data){
  toSend =data;

  sp.write(sendToarduino);
 }

//



var express = require('express');
var app = express();
var port = process.env.port || 3000;
var server = app.listen(port);

app.use(express.static('public'));
console.log("socket is runing");

var socket = require('socket.io');
var io = socket(server);


io.sockets.on('connection',onConnection);

function onConnection(socket){
  console.log("new connection"+socket.id);


socket.on('msg',message);


function message(data){
  console.log(data);
  //socket.broadcast.emit('msg',toSend);
  io.sockets.emit('msg',toSend);
  sendToarduino = data;
  // sp.write(data);
}
}
