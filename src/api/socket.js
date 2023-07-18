const { Server } = require("socket.io");

let io;

module.exports = {
    initialize: (server) => {
        io = new Server(server, {
            cors: {
                origin: process.env.CLIENT_URL
            }
        });

        io.on('connection', (socket) => {
            console.log('A user connected');

            // Handle disconnections
            socket.on('disconnect', () => {
                console.log('A user disconnected');
            });
        });
    },

    getIO: () => {
        return io;
    },
};