import React from 'react';
import styles from './OutputArea.module.css'; // Importar CSS Module

interface OutputAreaProps {
  output: string;
}

const OutputArea: React.FC<OutputAreaProps> = ({ output }) => {
  return (
    <div className={styles.outputArea}>
      <h3 className={styles.outputLabel}>Output</h3>
      <textarea readOnly value={output} placeholder="El resultado aparecerá aquí" disabled></textarea>
    </div>
  );
};

export default OutputArea;
