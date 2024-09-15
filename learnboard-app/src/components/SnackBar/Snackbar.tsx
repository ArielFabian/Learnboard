import React from 'react';
import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa'; // Íconos
import classNames from 'classnames';
import styles from './Snackbar.module.css';

interface SnackbarProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
  show: boolean;
}

const Snackbar: React.FC<SnackbarProps> = ({ message, type, onClose, show }) => {
  // Definir el ícono basado en el tipo
  const renderIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle />;
      case 'error':
        return <FaTimesCircle />;
      case 'warning':
        return <FaExclamationTriangle />;
      case 'info':
        return <FaInfoCircle />;
      default:
        return null;
    }
  };

  return (
    <div
      className={classNames(styles.snackbar, styles[type], { [styles.show]: show })}
    >
      <div className={styles.icon}>{renderIcon()}</div>
      <div className={styles.message}>{message}</div>
      <button className={styles.close} onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

export default Snackbar;
