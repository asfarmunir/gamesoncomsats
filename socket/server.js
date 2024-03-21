// const express = require("express");
// const app = express();
// const server = require('http').createServer(app);
// const io = require("socket.io")(server, {
//     cors: {
//         origin: "http://localhost:3000",
//     },
//     pingTimeout: 60 * 1000,
// });

// server.listen(5000, () => {
//     console.log("Server is running on port 5000");
// });

// const activeConnections = new Set();

// io.on("connection", (socket) => {
//     console.log("New client connected:", socket.id);
//     activeConnections.add(socket);

//     socket.on('disconnect', () => {
//         console.log("Client disconnected:", socket.id);
//         activeConnections.delete(socket);
//     });

//     socket.on('matchStart', (teams) => {
//         console.log('Match started:', teams);
//         io.emit('matchStart', teams);
//     });

//     socket.on('teams', (teamData) => {
//         console.log('Received team data:', teamData);
//         io.emit('teams', teamData);
//     });

//     socket.on('footballScore', (footballData) => {
//         console.log('Received football score:', footballData);
//         io.emit('footballScore', footballData);
//     });

//     socket.on('cricketScore', (cricketData) => {
//         console.log('Received cricket score:', cricketData);
//         io.emit('cricketScore', cricketData);
//     });
// });

// // Graceful shutdown
// process.on('SIGINT', () => {
//     console.log("Server shutting down gracefully...");
//     activeConnections.forEach(socket => socket.disconnect(true));
//     setTimeout(() => process.exit(0), 1000); // Wait for 1 second before exiting
// });


const express = require("express");

const app = express();
const server = app.listen('5000', (req, res) => {
    console.log("server is running on port 5000");
})

const io = require("socket.io")(server, {
    cors: {
        origin: "http://localhost:3000",
    },
    pingTimeout: 60 * 1000,
});

io.on("connection", (socket) => {
    console.log("Connected to socket.io");

    socket.on('matchStart', (teams) => {
        console.log('match Started');
        io.emit('matchStart', teams)
    })

    socket.on('teams', (teamData) => {
        console.log(teamData);
        io.emit('teams', teamData)
    })

    socket.on('footballScore', (footballData) => {
        console.log('football score', footballData);
        io.emit('footballScore', footballData)
    })
    socket.on('cricketScore', (cricketData) => {
        console.log(cricketData);
        io.emit('cricketScore', cricketData)
    })
})