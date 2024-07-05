import React, { useState } from "react";
import Editor, { OnChange } from "@monaco-editor/react";

interface CodeEditorWindowProps {
  onChange: (action: string, value: string) => void;
  language: string;
  code: string;
  theme: string;
}

const CodeEditorWindow: React.FC<CodeEditorWindowProps> = ({
  onChange,
  language,
  code,
  theme,
}) => {
  const [value, setValue] = useState<string>(code || "");

  const handleEditorChange: OnChange = (value, _event) => {
    const codeValue = value || "";
    setValue(codeValue);
    onChange("code", codeValue);
  };

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="85vh"
        width={`100%`}
        language={language || "javascript"}
        value={value}
        theme={theme}
        defaultValue="// some comment"
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default CodeEditorWindow;
