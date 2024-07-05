import React from 'react';

interface CodeEditorProps {
  code: string;
  setCode: (code: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, setCode }) => {
  return (
    <div className="my-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Code</label>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full h-64 p-2 border rounded"
      ></textarea>
    </div>
  );
};

export default CodeEditor;
