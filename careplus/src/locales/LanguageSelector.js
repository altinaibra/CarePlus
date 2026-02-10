import React from "react";
import Select from "react-select";
import FlagAL from "../assets/images/FlagAL.png";
import FlagEN from "../assets/images/FlagEN.png";
import { useTheme } from "../context/ThemeContext";

const options = [
  { value: "al", label: "AL", flag: FlagAL },
  { value: "en", label: "EN", flag: FlagEN },
];

function LanguageSelector({ i18n, changeLanguage }) {
  const { isDarkMode } = useTheme();
  const colors = isDarkMode
    ? {
        text: "#f3f4f6",
        textMuted: "#d1d5db",
        bg: "#1f2937",
        bgMenu: "#111827",
        border: "#374151",
        optionHover: "#374151",
      }
    : {
        text: "#111827",
        textMuted: "#374151",
        bg: "#ffffff",
        bgMenu: "#ffffff",
        border: "#d1d5db",
        optionHover: "#f3f4f6",
      };

  return (
    <Select
      value={options.find((opt) => opt.value === i18n.language)}
      onChange={(selected) => changeLanguage(selected.value)}
      options={options}
      isSearchable={false}
      formatOptionLabel={(opt) => (
        <div
          className="flex items-center gap-2"
          style={{ color: colors.text }}
        >
          <img src={opt.flag} alt={opt.label} className="w-5 h-4 rounded-sm" />
          <span>{opt.label}</span>
        </div>
      )}
      styles={{
        control: (base) => ({
          ...base,
          minHeight: 34,
          height: 34,
          borderRadius: 8,
          fontSize: 13,
          cursor: "pointer",
          color: colors.text,
          backgroundColor: colors.bg,
          borderColor: colors.border,
          boxShadow: "none",
          ":hover": { borderColor: colors.border },
        }),
        indicatorsContainer: (base) => ({
          ...base,
          height: 34,
        }),
        singleValue: (base) => ({
          ...base,
          color: colors.text,
        }),
        placeholder: (base) => ({
          ...base,
          color: colors.textMuted,
        }),
        option: (base, state) => ({
          ...base,
          color: colors.text,
          fontSize: 13,
          backgroundColor: state.isFocused ? colors.optionHover : colors.bgMenu,
          ":active": { backgroundColor: colors.optionHover },
        }),
        menu: (base) => ({
          ...base,
          backgroundColor: colors.bgMenu,
          border: `1px solid ${colors.border}`,
        }),
      }}
      className="w-30 "
    />
  );
}

export default LanguageSelector;
