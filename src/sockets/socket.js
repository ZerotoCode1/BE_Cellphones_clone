const http = require('http')
const express = require('express')
const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173/', 'http://localhost:3006/'],
    methods: ['GET', 'POST']
  }
})
const userSocketMap = {}
const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId]
}

io.on('connection', (socket) => {
  console.log('a user connected', socket.id)
  const userId = socket.handshake.query.userId
  // console.log('userId', userId)
  if (userId != 'undefined') userSocketMap[userId] = socket.id
  io.emit('getOnlineUsers', Object.keys(userSocketMap))

  // socket.on('chat message', (msg) => {
  //   io.emit('chat message', msg)
  // })

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id)
    delete userSocketMap[userId]
    io.emit('getOnlineUsers', Object.keys(userSocketMap))
  })
})

module.exports = { app, io, server, getReceiverSocketId }
