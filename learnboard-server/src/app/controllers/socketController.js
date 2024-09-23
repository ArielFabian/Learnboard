const path = require('path');
const fs = require('fs');

const joinRoom = (socket, roomId) => {
  socket.join(roomId);

  const filePath = path.join(__dirname, `../../rooms/${roomId}.txt`);

  if (fs.existsSync(filePath)) {
    const code = fs.readFileSync(filePath, 'utf-8');
    socket.emit('loadCode', code);
  }

  socket.on('codeChange', (newCode) => {
    fs.writeFileSync(filePath, newCode);
    socket.to(roomId).emit('receiveCode', newCode);
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected from room ${roomId}`);
  });
};

module.exports = {
  joinRoom,
};
