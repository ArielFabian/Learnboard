const express = require('express');
const cors = require('cors');
const https = require('https'); // Cambiado de http a https
const { Server } = require('socket.io');
const path = require('path');
const fs = require('fs');

// Cargar certificados SSL
const privateKey = fs.readFileSync('/etc/letsencrypt/live/api.learn-board.tech/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/api.learn-board.tech/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/api.learn-board.tech/chain.pem', 'utf8');

const credentials = { key: privateKey, cert: certificate, ca: ca };

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});



app.use(express.json());
// Configurar CORS para permitir solicitudes desde 'https://learn-board.tech'
app.use(cors({
  origin: 'https://learn-board.tech',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
const userRoutes = require('./routes/userRoutes');
const colabRoutes = require('./routes/colabSpacesRoutes');
const modelRoutes = require('./routes/modelRoutes');
const executeRoutes = require('./routes/executeRoutes');
const zoomRoutes = require('./routes/zoomRoutes');

app.use('/users', userRoutes);
app.use('/colabs', colabRoutes);
app.use('/model', modelRoutes);
app.use('/execute', executeRoutes);
app.use('/zoom', zoomRoutes);

const roomsDirectory = path.join(__dirname, 'rooms');
if (!fs.existsSync(roomsDirectory)) {
  fs.mkdirSync(roomsDirectory);
}

// Configuración de Socket.IO con CORS
const io = new Server(server, {
  cors: {
    origin: ['https://learn-board.tech', 'http://localhost:3000'], // Agregar frontend en producción
    methods: ['GET', 'POST'],
  },
});

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
      io.in(roomId).emit('receiveOutput', newOutput);
    });

    // Cargar comandos existentes si el archivo ya existe
    if (fs.existsSync(commandsFilePath)) {
      const commands = fs.readFileSync(commandsFilePath, 'utf-8');
      socket.emit('loadCommands', commands);
    }

    // Escuchar cambios en los comandos
    socket.on('commandChange', (newCommands) => {
      fs.writeFileSync(commandsFilePath, newCommands);
      io.in(roomId).emit('receiveCommands', newCommands);
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
