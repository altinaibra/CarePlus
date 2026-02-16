import React from "react";
import { Link } from "react-router-dom";

const settingsOptions = [
  {
    title: "Printers",
    description: "Manage printers for the system",
    path: "/settings/printers",
    color: "bg-green-600",
  },
  {
    title: "Change Password",
    description: "Update your account password",
    path: "/settings/change-password",
    color: "bg-blue-600",
  },
];

const SettingsPage: React.FC = () => {
  return (
    <div className="p-5 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      <div className="flex flex-col gap-6">
        {settingsOptions.map((option) => (
          <Link
            to={option.path}
            key={option.title}
            className="block p-5 border rounded-lg shadow hover:shadow-lg transition bg-gray-200 dark:bg-gray-800"
          >
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-full text-white mb-3 ${option.color}`}
            >
              {option.title.charAt(0)}
            </div>
            <h3 className="text-lg font-semibold mb-1">{option.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">
              {option.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;
