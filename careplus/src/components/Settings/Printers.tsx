import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { PrinterStyles } from "../../styles/PrinterStyles";
import { FaTrash } from "react-icons/fa";
import { Printer, printerAPI } from "../../app/api";

const Printers: React.FC = () => {
  const { t } = useTranslation();

  const [printers, setPrinters] = useState<Printer[]>([]);
  const [newPrinterName, setNewPrinterName] = useState("");
  const [newPrinterDescription, setNewPrinterDescription] = useState("");
  const [editingPrinterId, setEditingPrinterId] = useState<number | null>(null);
  const [isDefaultPrinter, setIsDefaultPrinter] = useState(false);
  useEffect(() => {
    fetchPrinters();
  }, []);

  const fetchPrinters = async () => {
    try {
      const res = await printerAPI.getAll();
      setPrinters(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSavePrinter = async () => {
    if (!newPrinterName || !newPrinterDescription) return;

    try {
      if (editingPrinterId !== null) {
        await printerAPI.update(editingPrinterId, {
          printerName: newPrinterName,
          printerDescription: newPrinterDescription,
        });
      } else {
        await printerAPI.create({
          printerName: newPrinterName,
          printerDescription: newPrinterDescription,
          defaultPrinter: false,
          entryDate: new Date().toISOString(),
        });
      }

      fetchPrinters();

      setNewPrinterName("");
      setNewPrinterDescription("");
      setEditingPrinterId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditPrinter = (printer: Printer) => {
    setEditingPrinterId(printer.printerId);
    setNewPrinterName(printer.printerName);
    setNewPrinterDescription(printer.printerDescription);
  };

  const handleDeletePrinter = async (id: number) => {
    try {
      await printerAPI.delete(id);
      fetchPrinters();
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle defaultPrinter
  const handleToggleDefault = async (printer: Printer) => {
    try {
      // If enabling this printer, disable all others
      if (!printer.defaultPrinter) {
        await Promise.all(
          printers.map((p) =>
            printerAPI.update(p.printerId, {
              defaultPrinter: p.printerId === printer.printerId,
            }),
          ),
        );
      } else {
        // If turning off, just update this printer
        await printerAPI.update(printer.printerId, { defaultPrinter: false });
      }
      fetchPrinters();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={PrinterStyles.container}>
      <h1 className="text-2xl font-bold mb-6">{t("printers.printers")}</h1>
      <p className="mb-4">{t("printers.printersDescription")}</p>

      <div className="mb-6 flex items-center gap-3">
        <input
          type="text"
          placeholder="Printer Name"
          value={newPrinterName}
          onChange={(e) => setNewPrinterName(e.target.value)}
          className="flex-1 px-4 py-2 bg-white dark:[background-color:oklch(20.5%_0_0)] border rounded
                           border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-600"
        />
        <input
          type="text"
          placeholder="Description"
          value={newPrinterDescription}
          onChange={(e) => setNewPrinterDescription(e.target.value)}
          className="flex-1 px-4 py-2 bg-white dark:[background-color:oklch(20.5%_0_0)] border rounded
                           border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-600"
        />
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={isDefaultPrinter}
            onChange={() => setIsDefaultPrinter(!isDefaultPrinter)}
            className="
              w-4 h-4 
              accent-[oklch(47.6%_0.114_61.907)] 
            "
          />
          <span className="text-black dark:text-white text-sm">
            Default Printer
          </span>
        </label>
        <button
          onClick={handleSavePrinter}
          className="px-5 py-2 bg-gray-700 dark:[background-color:oklch(47.6%_0.114_61.907)] hover:bg-orange-600 text-white rounded transition-colors"
        >
          Add printer
        </button>
      </div>

      {printers.map((printer) => (
        <div key={printer.printerId} className={PrinterStyles.card}>
          <div className="flex-1">
            <p className="font-semibold">{printer.printerName}</p>
            <p className="text-gray-600 dark:text-gray-300">
              {printer.printerDescription}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <span>{t("printers.default")}</span>
              <input
                type="checkbox"
                checked={printer.defaultPrinter}
                onChange={() => handleToggleDefault(printer)}
                className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
              />
            </label>

            <button
              onClick={() => handleEditPrinter(printer)}
              className={`${PrinterStyles.button} ${PrinterStyles.editButton}`}
            >
              {t("printers.edit")}
            </button>

            <button
              onClick={() => handleDeletePrinter(printer.printerId)}
              className={`${PrinterStyles.button} ${PrinterStyles.deleteButton} p-2 flex items-center justify-center`}
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Printers;
