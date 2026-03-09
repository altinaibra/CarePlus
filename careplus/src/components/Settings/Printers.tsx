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

  return (
    <div className={PrinterStyles.container}>
      <h1 className="text-2xl font-bold mb-6">{t("printers.printers")}</h1>
      <p className="mb-4">{t("printers.printersDescription")}</p>

      <div className="mb-6 flex gap-3">
        <input
          type="text"
          placeholder={t("printers.printerName")}
          value={newPrinterName}
          onChange={(e) => setNewPrinterName(e.target.value)}
          className={PrinterStyles.input}
        />

        <input
          type="text"
          placeholder={t("printers.description")}
          value={newPrinterDescription}
          onChange={(e) => setNewPrinterDescription(e.target.value)}
          className={PrinterStyles.input}
        />

        <button
          onClick={handleSavePrinter}
          className={`${PrinterStyles.button} ${PrinterStyles.addButton}`}
        >
          {editingPrinterId
            ? t("printers.updatePrinter")
            : t("printers.addPrinter")}
        </button>
      </div>


      {printers.map((printer) => (
        <div key={printer.printerId} className={PrinterStyles.card}>
          <div>
            <p className="font-semibold">{printer.printerName}</p>
            <p className="text-gray-600 dark:text-gray-300">
              {printer.printerDescription}
            </p>
          </div>

          <div className="flex gap-2">
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
