import React from 'react';
import styles from './ThemeSelect.module.css';

interface ThemeSelectProps {
  theme: string;
  setTheme: (theme: string) => void;
  themes: { [key: string]: string };
}

const ThemeSelect: React.FC<ThemeSelectProps> = ({ theme, setTheme, themes }) => {
  return (
    <select className={styles.themeSelect} value={theme} onChange={(e) => setTheme(e.target.value)}>
      {Object.keys(themes).map((themeKey) => (
        <option key={themeKey} value={themeKey}>
          {themes[themeKey]}
        </option>
      ))}
    </select>
  );
};

export default ThemeSelect;
