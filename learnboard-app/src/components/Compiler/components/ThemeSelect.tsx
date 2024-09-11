import React from 'react';
import styles from './ThemeSelect.module.css'; // Asegúrate de importar los estilos

interface ThemeSelectProps {
  theme: 'vs-dark' | 'vs-light';
  setTheme: (theme: 'vs-dark' | 'vs-light') => void;
  themes: { [key: string]: string };
}

const ThemeSelect: React.FC<ThemeSelectProps> = ({ theme, setTheme, themes }) => {
  return (
    <select
      className={styles.themeSelect} // Aplicar clase local
      value={theme}
      onChange={(e) => setTheme(e.target.value as 'vs-dark' | 'vs-light')}
    >
      {Object.keys(themes).map((key) => (
        <option key={key} value={key}>
          {themes[key]}
        </option>
      ))}
    </select>
  );
};

export default ThemeSelect;
