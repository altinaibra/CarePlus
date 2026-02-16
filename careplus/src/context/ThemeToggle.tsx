import React from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "./ThemeContext";

interface ThemeToggleProps {
  containerClass?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ containerClass = "" }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  const IconComponent = isDarkMode ? MdLightMode : MdDarkMode;

  return (
    <button
      onClick={toggleDarkMode}
      className={`flex items-center justify-center p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition ${containerClass}`}
      title="Toggle theme"
    >
      {React.createElement(
        IconComponent as React.ComponentType<{ size?: number }>,
        {
          size: 20,
        },
      )}
    </button>
  );
};

export default ThemeToggle;
