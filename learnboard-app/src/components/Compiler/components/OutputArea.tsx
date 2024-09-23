import React, { useEffect, useState } from 'react';
import styles from './OutputArea.module.css';
import { Socket } from 'socket.io-client';

interface OutputAreaProps {
  socket: Socket;
  output: string;
}

const OutputArea: React.FC<OutputAreaProps> = ({ socket, output }) => {
  const [liveOutput, setLiveOutput] = useState<string>(output);

  useEffect(() => {
    const roomId: string = window.location.pathname.split('/')[2];
    socket.emit('joinRoom', roomId);

    // Cargar el output inicial si existe
    socket.on('loadOutput', (initialOutput: string) => {
      setLiveOutput(initialOutput);
    });

    // Actualizar el output cuando se recibe un nuevo valor desde el socket
    socket.on('receiveOutput', (updatedOutput: string) => {
      setLiveOutput(updatedOutput);
    });

    return () => {
      socket.off('loadOutput');
      socket.off('receiveOutput');
    };
  }, [socket]);

  // Actualizar el output cuando cambia la prop `output`
  useEffect(() => {
    setLiveOutput(output);
  }, [output]);

  return (
    <div className={styles.outputArea}>
      <h3 className={styles.outputLabel}>Output</h3>
      <textarea readOnly value={liveOutput} placeholder="El resultado aparecerá aquí" disabled></textarea>
    </div>
  );
};

export default OutputArea;
