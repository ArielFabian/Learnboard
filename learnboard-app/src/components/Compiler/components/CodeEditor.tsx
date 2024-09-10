import React from 'react';
import MonacoEditor from '@monaco-editor/react'; // Importar correctamente

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
  theme: string;
  language: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, setCode, theme, language }) => {
  // Función que maneja el cambio en el editor
  const handleEditorChange = (value?: string) => {
    if (value) setCode(value);
  };

  return (
    <div className="editor-container">
      <MonacoEditor
        value={code}
        onChange={(value) => handleEditorChange(value)} // Actualizamos el valor cuando cambia el código
        language={language}
        theme={theme}
        height="60vh"
        options={{
          fontSize: 14,
        }}
      />
    </div>
  );
};

export default CodeEditor;
