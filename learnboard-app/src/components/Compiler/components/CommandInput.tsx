import React, { useEffect } from 'react';
import styles from './CommandInput.module.css';
import { Socket } from 'socket.io-client';

interface CommandInputProps {
  commands: string;
  setCommands: (commands: string) => void;
  socket: Socket;
}

const CommandInput: React.FC<CommandInputProps> = ({ commands, setCommands, socket }) => {

  useEffect(() => {
    const roomId: string = window.location.pathname.split('/')[2];
    socket.emit('joinRoom', roomId);

    socket.on('loadCommands', (initialCommands: string) => {
      setCommands(initialCommands);
    });

    socket.on('receiveCommands', (updatedCommands: string) => {
      setCommands(updatedCommands); // Actualiza el estado cuando se recibe un comando nuevo
    });

    return () => {
      socket.off('loadCommands');
      socket.off('receiveCommands');
    };
  }, [socket, setCommands]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCommands = e.target.value;
    setCommands(newCommands);
    socket.emit('commandChange', newCommands);
  };

  return (
    <div className={styles.commandInput}>
      <textarea
        value={commands}
        onChange={handleChange}
        placeholder="Ingresa comandos adicionales"
      ></textarea>
    </div>
  );
};

export default CommandInput;
