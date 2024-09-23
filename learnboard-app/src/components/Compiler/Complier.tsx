import React, { useState, useRef } from 'react';
import CodeEditor from './components/CodeEditor';
import LanguageSelect from './components/LanguageSelect';
import ThemeSelect from './components/ThemeSelect';
import CommandInput from './components/CommandInput';
import OutputArea from './components/OutputArea';
import axios from 'axios';
import styles from './Compiler.module.css';
import { QRCodeCanvas } from 'qrcode.react';
import { io, Socket } from 'socket.io-client';

interface CompilerProps {
  showCompiler?: boolean;
  onShowCompilerChange?: (newShowCompiler: boolean) => void;
  iframeSrc: string;
  handleIframeStateChange: (newSrc: string | ((prevState: string) => string)) => void;
}

const socket: Socket = io('http://localhost:8000');

// Mapear lenguajes a extensiones de archivo
const languageToExtension: { [key: string]: string } = {
  javascript: 'js',
  python: 'py',
  cpp: 'cpp',
  java: 'java',
  c: 'c',
  ruby: 'rb',
  swift: 'swift',
  kotlin: 'kt',
  go: 'go',
};

const statuses = [
  { id: 1, description: 'In Queue' },
  { id: 2, description: 'Processing' },
  { id: 3, description: 'Accepted' },
  { id: 4, description: 'Wrong Answer' },
  { id: 5, description: 'Time Limit Exceeded' },
  { id: 6, description: 'Compilation Error' },
  { id: 7, description: 'Runtime Error (SIGSEGV)' },
  { id: 8, description: 'Runtime Error (SIGXFSZ)' },
  { id: 9, description: 'Runtime Error (SIGFPE)' },
  { id: 10, description: 'Runtime Error (SIGABRT)' },
  { id: 11, description: 'Runtime Error (NZEC)' },
  { id: 12, description: 'Runtime Error (Other)' },
  { id: 13, description: 'Internal Error' },
  { id: 14, description: 'Exec Format Error' },
];

// Función para decodificar una cadena en base64
const decodeBase64 = (encodedData: string) => {
  try {
    return atob(encodedData);
  } catch (error) {
    return 'Error decoding base64';
  }
};

const Compiler: React.FC<CompilerProps> = ({ showCompiler, onShowCompilerChange, iframeSrc, handleIframeStateChange }) => {
  const [code, setCode] = useState<string>('');
  const [theme, setTheme] = useState<'vs-dark' | 'vs-light'>('vs-dark');
  const [language, setLanguage] = useState<string>('javascript');
  const [commands, setCommands] = useState<string>('');
  const [output, setOutput] = useState<string>(''); // Estado para almacenar el output actual
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/execute', {
        language,
        code,
        commands,
      });
      const result = response.data.output;

      const statusDescription = statuses.find((status) => status.id === result.status.id)?.description || 'Unknown Status';
      const time = `Execution Time: ${result.time || 'N/A'} sec`;
      const memory = `Memory Usage: ${result.memory || 'N/A'} KB`;
      let outputText;
      if (result.status.id !== 3) {
        outputText = decodeBase64(result.stderr) || 'No stderr output';
      } else {
        outputText = decodeBase64(result.stdout) || 'No stdout output';
      }
      const finalOutput = `Status: ${statusDescription}\n${time}\n${memory}\n\nOutput:\n${outputText}`;
      setOutput(finalOutput); // Actualizar el estado del output

      // Enviar el resultado al OutputArea a través de sockets
      const roomId: string = window.location.pathname.split('/')[2];
      socket.emit('outputChange', finalOutput, roomId);
    } catch (error) {
      const errorMessage = 'Error executing code';
      setOutput(errorMessage);
      socket.emit('outputChange', errorMessage);
    }
  };

  const toggleShowCompiler = () => {
    onShowCompilerChange && onShowCompilerChange(!showCompiler);
  };

  const [showQR, setShowQR] = useState(false);

  const toggleQR = () => {
    setShowQR(!showQR);
  };

  const currentUrl = window.location.href;

  const handleDownloadCode = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const fileExtension = languageToExtension[language as keyof typeof languageToExtension] || 'txt';
    if (downloadLinkRef.current) {
      downloadLinkRef.current.href = url;
      downloadLinkRef.current.download = `code.${fileExtension}`;
      downloadLinkRef.current.click();
    }
  };

  return (
    <div className={styles.compilerContainer}>
      <div className={styles.editorArea}>
        <div className={styles.selectContainer}>
          <ThemeSelect theme={theme} setTheme={setTheme} themes={{ 'vs-dark': 'Dark', 'vs-light': 'Light' }} />
          <LanguageSelect language={language} setLanguage={setLanguage} />
          <button className={styles.downloadBtn} onClick={handleDownloadCode}>
            <img src="/images/assets/svgs/download.svg" alt="Download" className={styles.downloadIcon} />
            Descargar Código
          </button>
          <button className={styles.runBtn} onClick={handleSubmit}>
            Ejecutar Código
          </button>
          <a ref={downloadLinkRef} style={{ display: 'none' }}>
            Descargar
          </a>
          <button className={styles.runBtn} onClick={toggleShowCompiler}>
            Canvas
          </button>
          <button className={styles.runBtn} onClick={toggleQR}>
            {showQR ? 'Ocultar QR' : 'QR'}
            {showQR && (
              <div className={styles['qr-overlay']}>
                <div className={styles['qr-popup']}>
                  <QRCodeCanvas value={currentUrl} size={200} />
                  <button className={styles['close-button']} onClick={toggleQR}>
                    X
                  </button>
                </div>
              </div>
            )}
          </button>
        </div>
        <div className={styles.codeEditor}>
          <CodeEditor code={code} setCode={setCode} theme={theme} language={language} />
        </div>
        {/* Integrar OutputArea para mostrar el resultado en tiempo real */}
        <OutputArea output={output} socket={socket} />
      </div>

      <div className={styles.sidebarArea}>
        <h3 className={styles.inputLabel}>Inputs</h3>
        <CommandInput commands={commands} setCommands={setCommands} socket={socket} />
      </div>
    </div>
  );
};

export default Compiler;
