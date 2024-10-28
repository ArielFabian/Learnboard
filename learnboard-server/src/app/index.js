const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());
const userRoutes = require('./routes/userRoutes');
const colabRoutes = require('./routes/colabSpacesRoutes');
const modelRoutes = require('./routes/modelRoutes');
const executeRoutes = require('./routes/executeRoutes');

app.use('/users', userRoutes);
app.use('/colabs', colabRoutes);
app.use('/model', modelRoutes);
app.use('/execute', executeRoutes);

const roomsDirectory = path.join(__dirname, 'rooms');
if (!fs.existsSync(roomsDirectory)) {
  fs.mkdirSync(roomsDirectory);
}

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room ${roomId}`);

    const codeFilePath = path.join(roomsDirectory, `${roomId}_code.txt`);
    const outputFilePath = path.join(roomsDirectory, `${roomId}_output.txt`);
    const commandsFilePath = path.join(roomsDirectory, `${roomId}_commands.txt`);

    // Cargar código existente si el archivo ya existe
    if (fs.existsSync(codeFilePath)) {
      const code = fs.readFileSync(codeFilePath, 'utf-8');
      socket.emit('loadCode', code);
    }

    // Cargar output existente si el archivo ya existe
    if (fs.existsSync(outputFilePath)) {
      const output = fs.readFileSync(outputFilePath, 'utf-8');
      socket.emit('loadOutput', output);
    }

    // Escuchar cambios en el código
    socket.on('codeChange', (newCode) => {
      fs.writeFileSync(codeFilePath, newCode);
      socket.to(roomId).emit('receiveCode', newCode);
    });

    // Escuchar cambios en el output
    socket.on('outputChange', (newOutput) => {
      fs.writeFileSync(outputFilePath, newOutput);
      io.in(roomId).emit('receiveOutput', newOutput); // Emitir a todos en la sala, incluyendo al emisor
    });

    // Cargar comandos existentes si el archivo ya existe
    if (fs.existsSync(commandsFilePath)) {
      const commands = fs.readFileSync(commandsFilePath, 'utf-8');
      socket.emit('loadCommands', commands);
    }

    // Escuchar cambios en los comandos
    socket.on('commandChange', (newCommands) => {
      fs.writeFileSync(commandsFilePath, newCommands);
      io.in(roomId).emit('receiveCommands', newCommands); // Emitir a todos en la sala, incluyendo al emisor
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
