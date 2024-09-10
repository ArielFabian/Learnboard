import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './LanguageSelect.module.css'; // Importar CSS Module

interface LanguageSelectProps {
  language: string;
  setLanguage: (language: string) => void;
}

const LanguageSelect: React.FC<LanguageSelectProps> = ({ language, setLanguage }) => {
  const [languages, setLanguages] = useState<string[]>([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      const response = await axios.get('http://api-server.com/languages');
      setLanguages(response.data.languages);
    };
    fetchLanguages();
  }, []);

  return (
    <select className={styles.languageSelect} value={language} onChange={(e) => setLanguage(e.target.value)}>
      {languages.map((lang) => (
        <option key={lang} value={lang}>
          {lang}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelect;
