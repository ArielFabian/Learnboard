import React from 'react';
import './Feature.css';
import 'bootstrap/dist/css/bootstrap.min.css';

type FeatureProps = {
  title: string;
  description: string;
  icons: string;
};

const Feature: React.FC<FeatureProps> = ({ title, description, icons }) => {
  return (
    <div className="feature">
      <img src={icons} alt={title} className="feature-icon" />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Feature;