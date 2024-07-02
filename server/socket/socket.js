// socket.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Authorization', 'Content-Type'],
  credentials: true,
};

app.use(cors(corsOptions));

const userSocketMap = {};

const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  const { userId } = socket.handshake.query;

  if (userId) {
    userSocketMap[userId] = socket.id;
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  }

  socket.on('newMessage', (message) => {
    const { receiverId } = message;
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('newMessage', message);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    delete userSocketMap[userId];
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  });
});

module.exports = { io, app, server, getReceiverSocketId };
