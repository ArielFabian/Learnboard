import React from 'react';

interface OutputDisplayProps {
  output: string;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ output }) => {
  return (
    <div className="my-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Output</label>
      <textarea
        value={output}
        readOnly
        className="w-full h-64 p-2 border rounded bg-gray-100"
      ></textarea>
    </div>
  );
};

export default OutputDisplay;
