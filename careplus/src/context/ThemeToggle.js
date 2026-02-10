import React from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "./ThemeContext";

const ThemeToggle = ({ containerClass = "" }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className={`flex items-center justify-center p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition ${containerClass}`}
      title="Toggle theme"
    >
      {isDarkMode ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
    </button>
  );
};

export default ThemeToggle;
