require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 3500;
const app = require('./app');
const server = require('http').createServer(app);
const socket = require('./socket');

// Connect to MongoDB
connectDB();
//Initialize Socket.IO
socket.initialize(server);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

