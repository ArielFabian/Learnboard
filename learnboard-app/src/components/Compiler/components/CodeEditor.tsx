import React, { useEffect } from 'react';
import MonacoEditor, { OnChange } from '@monaco-editor/react';
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:8000');

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
  theme: string;
  language: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, setCode, theme, language }) => {
  useEffect(() => {
    const roomId: string = window.location.pathname.split('/')[2]; // Obtener el ID del room desde la URL
    socket.emit('joinRoom', roomId);

    socket.on('loadCode', (initialCode: string) => {
      setCode(initialCode);
    });

    socket.on('receiveCode', (updatedCode: string) => {
      setCode(updatedCode);
    });

    return () => {
      // No desconectar el socket manualmente
      // socket.disconnect(); 
    };
  }, [setCode]);

  const handleEditorChange: OnChange = (value?: string) => {
    if (value) {
      setCode(value);
      socket.emit('codeChange', value);
    }
  };

  return (
    <div className="editor-container">
      <MonacoEditor
        value={code}
        onChange={handleEditorChange}
        language={language}
        theme={theme}
        height="60vh"
        options={{ fontSize: 20 }}
      />
    </div>
  );
};

export default CodeEditor;
