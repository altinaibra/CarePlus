import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { PrinterStyles } from "../../../styles/PrinterStyles";
import { FaTrash } from "react-icons/fa";
import { Printer, printerAPI } from "../../../app/api";
import { PrinterGroup, printerGroupAPI } from "../../../app/printerGroup";

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
      const printersWithOnline: Printer[] = res.data.map((p) => ({
        ...p,
        online: (p as Printer).online ?? false,
      }));
      setPrinters(printersWithOnline);
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
          defaultPrinter: isDefaultPrinter,
        });
      } else {
        await printerAPI.create({
          printerName: newPrinterName,
          printerDescription: newPrinterDescription,
          defaultPrinter: isDefaultPrinter,
          entryDate: new Date().toISOString(),
        });
      }

      fetchPrinters();

      setNewPrinterName("");
      setNewPrinterDescription("");
      setIsDefaultPrinter(false); // reset form
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

  const handleToggleDefault = async (printer: Printer) => {
    try {
      if (!printer.defaultPrinter) {
        await Promise.all(
          printers.map((p) =>
            printerAPI.update(p.printerId, {
              defaultPrinter: p.printerId === printer.printerId,
            }),
          ),
        );
      } else {
        await printerAPI.update(printer.printerId, { defaultPrinter: false });
      }

      fetchPrinters();
    } catch (err) {
      console.error(err);
    }
  };
  const [printerGroups, setPrinterGroups] = useState<PrinterGroup[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

  useEffect(() => {
    fetchPrinters();
    fetchPrinterGroups();
  }, []);

  const fetchPrinterGroups = async () => {
    try {
      const res = await printerGroupAPI.getAll();
      setPrinterGroups(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className={PrinterStyles.container}>
      <h1 className="text-2xl font-bold mb-6">{t("printers.printers")}</h1>

      <div className="mb-6 flex flex-col gap-3">
        <input
          type="text"
          placeholder="Printer Name"
          value={newPrinterName}
          onChange={(e) => setNewPrinterName(e.target.value)}
          className="w-full px-4 py-2 bg-white dark:[background-color:oklch(20.5%_0_0)] border rounded
             border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-600"
        />
        <input
          type="text"
          placeholder="Description"
          value={newPrinterDescription}
          onChange={(e) => setNewPrinterDescription(e.target.value)}
          className="w-full px-4 py-2 bg-white dark:[background-color:oklch(20.5%_0_0)] border rounded
             border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-600"
        />
        <div className="flex flex-col mb-2">
          <label className="text-sm text-black dark:text-white mb-1">
            {t("printers.selectGroup")}
          </label>
          <select
            value={selectedGroupId ?? ""}
            onChange={(e) => setSelectedGroupId(Number(e.target.value))}
            className="w-full px-4 py-2 bg-white dark:[background-color:oklch(20.5%_0_0)] 
                        border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] 
                        hover:border-gray-300 dark:hover:[border-color:oklch(47.6%_0.114_61.907)]"
          >
            {printerGroups.length === 0 ? (
              <option value="">{t("printers.noGroups")}</option>
            ) : (
             printerGroups.map((group, index) => (
            <option
              key={group.printerGroupId}
              value={group.printerGroupId}
              className={index % 2 === 0 ? "bg-gray-100 dark:bg-[oklch(30%_0.05_0)]" : "bg-white dark:bg-[oklch(20%_0_0)]"}
            >
              {group.groupDescription}
            </option>
          ))
            )}
          </select>
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={isDefaultPrinter}
            onChange={() => setIsDefaultPrinter((prev) => !prev)}
            className="w-4 h-4 accent-[oklch(47.6%_0.114_61.907)]"
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

      <div className="border-t border-gray-300 dark:border-gray-600 my-4"></div>

      {printers.map((printer) => (
        <div key={printer.printerId} className={PrinterStyles.card}>
          <div className="flex items-start gap-3 flex-1">
            <span
              className={`mt-1 w-3 h-3 rounded-full ${
                printer.online
                  ? "bg-green-600 dark:bg-green-400"
                  : "bg-gray-400 dark:bg-gray-400"
              }`}
            />
            <div>
              <p className="font-semibold">{printer.printerName}</p>
              <p className="text-gray-600 dark:text-gray-300">
                {printer.printerDescription}
              </p>
              <p
                className={`text-sm mt-1 ${
                  printer.online
                    ? "text-green-600 dark:text-green-400"
                    : "text-gray-400 dark:text-gray-400"
                }`}
              ></p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={printer.defaultPrinter}
                onChange={() => handleToggleDefault(printer)}
                className="
               w-5 h-5 rounded border-gray-300 dark:border-gray-600
              focus:ring-2 focus:ring-[oklch(47.6%_0.114_61.907)]
              accent-gray-700 dark:accent-[oklch(47.6%_0.114_61.907)]
              "
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
