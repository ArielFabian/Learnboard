import React, { useState } from 'react';
import CodeEditor from './components/CodeEditor';
import LanguageSelect from './components/LanguageSelect';
import ThemeSelect from './components/ThemeSelect';
import CommandInput from './components/CommandInput';
import OutputArea from './components/OutputArea';
import axios from 'axios';
import styles from './Compiler.module.css';

const monacoThemes = {
  'vs-dark': 'Tema Oscuro',
  'vs-light': 'Tema Claro',
};

const Compiler: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [theme, setTheme] = useState<'vs-dark' | 'vs-light'>('vs-dark');
  const [language, setLanguage] = useState<string>('javascript');
  const [commands, setCommands] = useState<string>('');
  const [output, setOutput] = useState<string>('');

  // Función para manejar el envío del código
  const handleSubmit = async () => {
    try {
      const encodedCode = btoa(code); // Encode en base64
      const response = await axios.post('http://api-server.com/execute', {
        language,
        code: encodedCode,
        commands,
      });
      setOutput(response.data.output);
    } catch (error) {
      setOutput('Error al ejecutar el código');
    }
  };

  return (
    <div className={styles.compilerContainer}>
      {/* Contenedor para los selects */}
      <div className={styles.editorArea}>
        <div className={styles.selectContainer}>
          <ThemeSelect theme={theme} setTheme={setTheme} themes={monacoThemes} />
          <LanguageSelect language={language} setLanguage={setLanguage} />
        </div>
        <CodeEditor code={code} setCode={setCode} theme={theme} language={language} />
      </div>

      <div className={styles.sidebarArea}>
        <CommandInput commands={commands} setCommands={setCommands} />
        <button className={styles.runBtn} onClick={handleSubmit}>
          Ejecutar Código
        </button>
        <OutputArea output={output} />
      </div>
    </div>
  );
};

export default Compiler;
