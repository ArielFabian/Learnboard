import React from 'react';
import styles from './LanguageSelect.module.css'; // Asegúrate de importar los estilos

interface LanguageSelectProps {
  language: string;
  setLanguage: (language: string) => void;
}

const LanguageSelect: React.FC<LanguageSelectProps> = ({ language, setLanguage }) => {
  const languages = ['javascript', 'python', 'cpp', 'java'];
  return (
    <select
      className={styles.languageSelect} // Aplicar clase local
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
    >
      {languages.map((lang) => (
        <option key={lang} value={lang}>
          {lang}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelect;
