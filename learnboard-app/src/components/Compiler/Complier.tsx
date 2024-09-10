import React, { useState } from 'react';
import CodeEditor from './components/CodeEditor';
import LanguageSelect from './components/LanguageSelect';
import ThemeSelect from './components/ThemeSelect';
import CommandInput from './components/CommandInput';
import OutputArea from './components/OutputArea';
import axios from 'axios';
import styles from './Compiler.module.css';

const monacoThemes = {
  active4d: 'Active4D',
  'all-hallows-eve': 'All Hallows Eve',
  amy: 'Amy',
  'birds-of-paradise': 'Birds of Paradise',
  blackboard: 'Blackboard',
  'brilliance-black': 'Brilliance Black',
  'brilliance-dull': 'Brilliance Dull',
  'chrome-devtools': 'Chrome DevTools',
  'clouds-midnight': 'Clouds Midnight',
  clouds: 'Clouds',
  cobalt: 'Cobalt',
  dawn: 'Dawn',
  dreamweaver: 'Dreamweaver',
  eiffel: 'Eiffel',
  'espresso-libre': 'Espresso Libre',
  github: 'GitHub',
  idle: 'IDLE',
  katzenmilch: 'Katzenmilch',
  'kuroir-theme': 'Kuroir Theme',
  lazy: 'LAZY',
  'magicwb--amiga-': 'MagicWB (Amiga)',
  'merbivore-soft': 'Merbivore Soft',
  merbivore: 'Merbivore',
  'monokai-bright': 'Monokai Bright',
  monokai: 'Monokai',
  'night-owl': 'Night Owl',
  'oceanic-next': 'Oceanic Next',
  'pastels-on-dark': 'Pastels on Dark',
  'slush-and-poppies': 'Slush and Poppies',
  'solarized-dark': 'Solarized-dark',
  'solarized-light': 'Solarized-light',
  spacecadet: 'SpaceCadet',
  sunburst: 'Sunburst',
  'textmate--mac-classic-': 'Textmate (Mac Classic)',
  'tomorrow-night-blue': 'Tomorrow-Night-Blue',
  'tomorrow-night-bright': 'Tomorrow-Night-Bright',
  'tomorrow-night-eighties': 'Tomorrow-Night-Eighties',
  'tomorrow-night': 'Tomorrow-Night',
  tomorrow: 'Tomorrow',
  twilight: 'Twilight',
  'upstream-sunburst': 'Upstream Sunburst',
  'vibrant-ink': 'Vibrant Ink',
  'xcode-default': 'Xcode_default',
  zenburnesque: 'Zenburnesque',
  iplastic: 'iPlastic',
  idlefingers: 'idleFingers',
  krtheme: 'krTheme',
  monoindustrial: 'monoindustrial',
};

const Compiler: React.FC = () => {
  const [code, setCode] = useState<string>('');
  const [theme, setTheme] = useState<string>('vs-dark');
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
      {/* Sección principal dividida en dos columnas */}
      <div className={styles.editorArea}>
        <ThemeSelect theme={theme} setTheme={setTheme} themes={monacoThemes} />
        <LanguageSelect language={language} setLanguage={setLanguage} />
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
