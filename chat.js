// Laboratory_#1_ChatBot_App 
// Web Technologies Back-End Project
// Byegarys Byekbolat 
// Group: IT-2202

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/ChatBot.html');
});

io.on('connection', (socket) => {
    console.log('Client has been connected!');

    socket.on('Client is connected!', (userName) => {
        io.emit('Chat message', { name: '◄AITU ChatBot v1:►', message: `${userName} has been joined to the chat!` });
    });

    socket.on('Chat message', (data) => {
        io.emit('Chat message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(8888, () => {
    console.log('Server listening on http://localhost:8888');
});
