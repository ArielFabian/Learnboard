import React from 'react';
import styles from './CommandInput.module.css'; // Importar CSS Module

interface CommandInputProps {
  commands: string;
  setCommands: (commands: string) => void;
}

const CommandInput: React.FC<CommandInputProps> = ({ commands, setCommands }) => {
  return (
    <div className={styles.commandInput}>
      <textarea
        value={commands}
        onChange={(e) => setCommands(e.target.value)}
        placeholder="Ingresa comandos adicionales"
      ></textarea>
    </div>
  );
};

export default CommandInput;
