import React from 'react';
import styles from './OutputArea.module.css'; // Importar CSS Module

interface OutputAreaProps {
  output: string;
}

const OutputArea: React.FC<OutputAreaProps> = ({ output }) => {
  return (
    <div className={styles.outputArea}>
      <textarea readOnly value={output} placeholder="El resultado aparecerá aquí"></textarea>
    </div>
  );
};

export default OutputArea;
