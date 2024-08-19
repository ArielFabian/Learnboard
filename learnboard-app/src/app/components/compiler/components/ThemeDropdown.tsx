import React from "react";
import Select from "react-select";
import * as monacoThemes from "monaco-themes/themes/themelist.json";
import { customStyles } from "../constants/customStyles";

interface ThemeDropdownProps {
  handleThemeChange: (selectedOption: { value: string; label: string }) => void;
  theme: { value: string; label: string };
}

const ThemeDropdown: React.FC<ThemeDropdownProps> = ({ handleThemeChange, theme }) => {
  return (
    <Select
      placeholder={`Select Theme`}
      options={Object.entries(monacoThemes).map(([themeId, themeName]) => ({
        label: themeName,
        value: themeId,
        key: themeId,
      }))}
      value={theme}
      styles={customStyles}
      onChange={(option) => handleThemeChange(option as { value: string; label: string })}
    />
  );
};

export default ThemeDropdown;
