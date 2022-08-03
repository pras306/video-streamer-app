const http = require('http');
const { Server } = require('socket.io');

const app = require('./server');

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

let viewerCount = 0;

app.get('/stream', (req, res, next) => {
    res.status(200).send("Welcome to stream endpoint");
});

io.on('connection', (socket) => {
    viewerCount += 1;
    console.log('a user connected. Total viewer count:', viewerCount);
    socket.emit('viewer-count', viewerCount);

    socket.on('disconnect', () => {
        viewerCount--;
        console.log('A user disconnected. Total viewer count:', viewerCount);
        socket.emit('viewer-count', viewerCount);
    });

    socket.on('join-as-streamer', (streamerId) => {
        socket.broadcast.emit('streamer-joined', streamerId);
    });

    socket.on('disconnect-as-streamer', (streamerId) => {
        socket.broadcast.emit('streamer-disconnected', streamerId);
    });

    socket.on('join-as-viewer', (viewerId) => {
        socket.broadcast.emit('viewer-connected', viewerId);
        socket.emit('backfill-messages', messageList);
    });
});

module.exports = server;