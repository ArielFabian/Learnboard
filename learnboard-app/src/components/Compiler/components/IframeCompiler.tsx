import React from 'react';
import styles from './IframeCompiler.module.css';

interface IframeProps {
  src: string;
  width?: string;
  height?: string;
}

const IframeComponent: React.FC<IframeProps> = ({ src, width = '300px', height = '200px' }) => {
  return (
    <div className={styles.iframeContainer}>
      <iframe
        src={src}
        style={{ width: width, height: height }} // Inline styles for dynamic sizing
        className={styles.iframe}
        frameBorder="0"
        allowFullScreen
        title="Iframe Content"
      />
    </div>
  );
};

export default IframeComponent;
