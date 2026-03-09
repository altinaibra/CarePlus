import React, { ReactNode } from "react";

interface RightSlideModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const RightSlideModal: React.FC<RightSlideModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-full z-50 transition-opacity duration-300 ${
        isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div
        className={`absolute top-0 right-0 h-full bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300
          w-full sm:w-[600px] md:w-[700px] lg:w-[800px] xl:w-[900px] ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="p-4 h-full overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

export default RightSlideModal;
