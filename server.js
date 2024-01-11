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

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.send('Please join via http://localhost:8888/AITU_ChatBot');
});

app.get('/json', (req, res) => {
    const jsonResponse = { text: 'hi', numbers: [1, 2, 3] };
    res.json(jsonResponse);
});

app.get('/echo', (req, res) => {
    const input = req.query.input || '';
    
    const normal = { format: 'normal', message: input };

    const shouty = { format: 'shouty', message: input.toUpperCase() };

    const charCount = { format: 'character count', count: input.length };

    const backwards = { format: 'backwards', message: input.split('').reverse().join('') };

    res.json({ normal, shouty, charCount, backwards });
});


app.get('/AITU_ChatBot', (req, res) => {
    res.sendFile(__dirname + '/ChatBot.html');  
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('user connected', (userName) => {
        io.emit('chat message', { name: '◄AITU ChatBot v1:►', message: `${userName} has been joined to the chat!` });
    });

    socket.on('chat message', (data) => {
        io.emit('chat message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 8888;

server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
