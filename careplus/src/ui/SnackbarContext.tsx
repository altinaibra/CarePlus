import React, { createContext, useContext, useState, ReactNode } from "react";

type SnackbarType = "success" | "error" | "warning";

interface SnackbarContextProps {
  showSnackbar: (message: string, type?: SnackbarType) => void;
}

const SnackbarContext = createContext<SnackbarContextProps | undefined>(
  undefined,
);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

interface SnackbarProviderProps {
  children: ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<SnackbarType>("success");

  const showSnackbar = (msg: string, msgType: SnackbarType = "success") => {
    setMessage(msg);
    setType(msgType);
    setVisible(true);
    setTimeout(() => setVisible(false), 4000);
  };

  const getBgColor = () => {
    switch (type) {
      case "success":
        return "bg-green-100 border-l-4 border-green-500";
      case "error":
        return "bg-red-100 border-l-4 border-red-500";
      case "warning":
        return "bg-yellow-100 border-l-4 border-yellow-500";
      default:
        return "bg-gray-100 border-l-4 border-gray-500";
    }
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {visible && (
        <div
          className={`fixed bottom-5 left-1/2 -translate-x-1/2 px-4 py-3 rounded shadow-md flex items-center space-x-2 ${getBgColor()} z-50 dark:bg-[#333] dark:text-white`}
        >
          {type === "success" && (
            <span className="text-green-600 font-bold">✔</span>
          )}
          {type === "error" && (
            <span className="text-red-600 font-bold">✖</span>
          )}
          {type === "warning" && (
            <span className="text-yellow-600 font-bold">⚠</span>
          )}
          <span className="text-gray-900 dark:text-white">{message}</span>
        </div>
      )}
    </SnackbarContext.Provider>
  );
};
