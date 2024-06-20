import React from 'react';

interface LanguageSelectorProps {
  languages: { id: number; name: string }[];
  selectedLanguage: number | null;
  setSelectedLanguage: (id: number) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ languages, selectedLanguage, setSelectedLanguage }) => {
  return (
    <div className="my-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Select Language</label>
      <select
        value={selectedLanguage || ''}
        onChange={(e) => setSelectedLanguage(Number(e.target.value))}
        className="w-full p-2 border rounded"
      >
        <option value="" disabled>Select a language</option>
        {languages.map(language => (
          <option key={language.id} value={language.id}>
            {language.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
