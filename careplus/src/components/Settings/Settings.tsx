import React, { createContext, useContext, useState, ReactNode } from "react";

interface SettingsContextType {
  printers: string[];
  addPrinter: (printer: string) => void;
  removePrinter: (printer: string) => void;
  changePassword: (newPassword: string) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [printers, setPrinters] = useState<string[]>(["Printer 1"]);

  const addPrinter = (printer: string) =>
    setPrinters((prev) => [...prev, printer]);
  const removePrinter = (printer: string) =>
    setPrinters((prev) => prev.filter((p) => p !== printer));

  const changePassword = (newPassword: string) => {
    // këtu mund të bësh call tek API për ndryshimin e fjalëkalimit
    console.log("Password changed to:", newPassword);
    alert("Password changed successfully!");
  };

  return (
    <SettingsContext.Provider
      value={{ printers, addPrinter, removePrinter, changePassword }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
