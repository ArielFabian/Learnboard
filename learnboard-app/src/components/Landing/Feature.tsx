import React from 'react';
import styles from './Feature.module.css';
import styles2 from './Feature.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

type FeatureProps = {
  title: string;
  description: string;
  icons: string;
};

const Feature: React.FC<FeatureProps> = ({ title, description, icons }) => {
  return (
    <div className={`${styles.feature} ${styles2.feature2}`}>
      <img src={icons} alt={title} className="feature-icon" />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Feature;