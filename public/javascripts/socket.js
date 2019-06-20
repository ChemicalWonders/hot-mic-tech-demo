var socket_io = require('socket.io');
var io = socket_io();
var socket = {};

socket.io = io;
io.on('connection', function(socket) {
    console.log('A user connected');

    socket.on('disconnect', function(){
        console.log('A user disconnected');
    });

    socket.on('chat message', function(message){
        console.log('message: ' + message);
        io.emit('chat message', message);
    })
});

socket.sendNotification = function() {
    io.sockets.emit('hello', {msg: 'Hello World!'});
}

module.exports = socket;