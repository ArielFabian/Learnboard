import React, { useState, useEffect } from 'react';
import CodeEditor from './components/CodeEditor';
import LanguageSelector from './components/LanguageSelector';
import OutputDisplay from './components/OutputDisplay';

const compiler: React.FC = () => {
  const [languages, setLanguages] = useState<{ id: number; name: string }[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<number | null>(null);
  const [code, setCode] = useState<string>('');
  const [output, setOutput] = useState<string>('');

  useEffect(() => {
    const fetchLanguages = async () => {
      const url = 'https://judge0-extra-ce.p.rapidapi.com/languages';
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '3991985dd2msh94e632ba672b516p14fc8cjsn6b7eb410d4d7',
          'x-rapidapi-host': 'judge0-extra-ce.p.rapidapi.com'
        }
      };
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setLanguages(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLanguages();
  }, []);

  const handleRunCode = async () => {
    if (!selectedLanguage) return;
    const encodedCode = btoa(code);
    const submissionUrl = 'https://judge0-extra-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=false&fields=*';
    const submissionOptions = {
      method: 'POST',
      headers: {
        'x-rapidapi-key': '',
        'x-rapidapi-host': '',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        language_id: selectedLanguage,
        source_code: encodedCode,
        stdin: btoa('Judge0')
      })
    };

    try {
      const submissionResponse = await fetch(submissionUrl, submissionOptions);
      const submissionResult = await submissionResponse.json();
      const token = submissionResult.token;

      const resultUrl = `https://judge0-extra-ce.p.rapidapi.com/submissions/${token}?base64_encoded=true&fields=*`;
      const resultOptions = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '',
          'x-rapidapi-host': ''
        }
      };

      const resultResponse = await fetch(resultUrl, resultOptions);
      const resultData = await resultResponse.json();
      console.log(resultData);
      setOutput(atob(resultData.stdout || resultData.stderr));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Code Editor</h1>
      <LanguageSelector
        languages={languages}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />
      <CodeEditor code={code} setCode={setCode} />
      <button
        onClick={handleRunCode}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Run
      </button>
      <OutputDisplay output={output} />
    </div>
  );
};

export default compiler;
