import React from "react";
import Select from "react-select";
import FlagAL from "../assets/images/FlagAL.png";
import FlagEN from "../assets/images/FlagEN.png";

const options = [
  { value: "al", label: "AL", flag: FlagAL },
  { value: "en", label: "EN", flag: FlagEN },
];

function LanguageSelector({ i18n, changeLanguage }) {
  return (
    <Select
      value={options.find((opt) => opt.value === i18n.language)}
      onChange={(selected) => changeLanguage(selected.value)}
      options={options}
      isSearchable={false}
      formatOptionLabel={(opt) => (
        <div className="flex items-center gap-2 text-[#333]">
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
          color: "#333",
        }),
        indicatorsContainer: (base) => ({
          ...base,
          height: 34,
        }),
        singleValue: (base) => ({
          ...base,
          color: "#333",
        }),
        option: (base, state) => ({
          ...base,
          color: "#333",
          fontSize: 13,
        }),
      }}
      className="w-30 "
    />
  );
}

export default LanguageSelector;
