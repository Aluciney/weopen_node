require('dotenv').config();

const express = require('express');
const cors = require('cors');
const http = require("http");
const socketIO = require("socket.io");
const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./routes'));

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', socket => {
    // console.log('New client connected' + socket.id);
    //console.log(socket);

    socket.on('public_chat', msg => {
        io.emit('receivedMessage', msg);
    });

    // disconnect is fired when a client leaves the server
    socket.on('disconnect', () => {
        // console.log('user disconnected');
    });
});

server.listen(process.env.PORT || 3001);