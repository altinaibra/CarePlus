import React, { useEffect, useState } from "react";
import LaboratoryPageStyles from "../styles/LaboratoryPageStyles";
import { typesOfAnalysesAPI, TypeOfAnalyses } from "../app/typesOfAnalysesApi";
import { Currency, currencyAPI } from "../app/currenciesApi";
import { printerAPI } from "../app/printer";
import { useTranslation } from "react-i18next";
import { FaFlask, FaPrint } from "react-icons/fa";

const LaboratoryPage: React.FC = () => {
  const [labTypes, setLabTypes] = useState<TypeOfAnalyses[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLabs, setSelectedLabs] = useState<Set<number>>(new Set());
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [editingPriceId, setEditingPriceId] = useState<number | null>(null);
  const [tempPrices, setTempPrices] = useState<Record<number, number>>({});
  const [expandedIds, setExpandedIds] = useState<number[]>([]); // mobile expand
  const { t } = useTranslation();

  const mainCurrency = currencies.find((c) => c.isMainCurrency);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await currencyAPI.getAll();
        setCurrencies(response.data);
      } catch (error) {
        console.error("Error fetching currencies:", error);
      }
    };
    fetchCurrencies();
  }, []);

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await typesOfAnalysesAPI.getAll();
        setLabTypes(response.data);

        const initialPrices: Record<number, number> = {};
        response.data.forEach((lab) => {
          initialPrices[lab.id] = lab.price;
        });
        setTempPrices(initialPrices);
      } catch (error) {
        console.error("Error fetching lab types:", error);
      }
    };
    fetchLabs();
  }, []);

  const filteredLabs = labTypes.filter(
    (lab) =>
      (lab.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (lab.description?.toLowerCase() || "").includes(searchTerm.toLowerCase()),
  );

  const toggleLabSelection = (id: number) => {
    const newSet = new Set(selectedLabs);
    newSet.has(id) ? newSet.delete(id) : newSet.add(id);
    setSelectedLabs(newSet);
  };

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const totalPrice = labTypes
    .filter((lab) => selectedLabs.has(lab.id))
    .reduce((sum, lab) => sum + (tempPrices[lab.id] ?? lab.price), 0);

  const handlePriceChange = (labId: number, value: string) => {
    setTempPrices((prev) => ({ ...prev, [labId]: parseFloat(value) || 0 }));
  };

  const handlePriceKeyDown = (
    labId: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Enter" || e.key === "Escape") setEditingPriceId(null);
  };

  const handlePrint = async () => {
    const selectedLabsForPrint = labTypes
      .filter((lab) => selectedLabs.has(lab.id))
      .map((lab) => ({
        name: lab.name || "",
        price: tempPrices[lab.id] ?? lab.price,
        unit: lab.unit || "",
      }));

    try {
      await printerAPI.printLabReport({
        currency: mainCurrency?.currencySymbol ?? "",
        totalPrice,
        selectedLabs: selectedLabsForPrint,
      });
    } catch (error) {
      console.error("Error printing lab report:", error);
    }
  };

  return (
    <div className={LaboratoryPageStyles.container}>
      <h2 className={`${LaboratoryPageStyles.title} flex items-center gap-2`}>
        <FaFlask className="text-primary dark:text-white" />
        {t("laboratory.types")}
      </h2>

      <div className="flex items-center mb-4 w-full">
        <div className="relative flex-1 max-w-md">
          <span className="absolute inset-y-0 left-2 flex items-center text-gray-500 dark:text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 4a6 6 0 016 6c0 1.39-.47 2.67-1.26 3.68l4.29 4.29-1.42 1.42-4.29-4.29A6 6 0 1110 4z"
              />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-9 bg-white dark:[background-color:oklch(20.5%_0_0)] border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] text-gray-900 dark:text-gray-100 rounded-md"
          />
        </div>
        <button
          onClick={handlePrint}
          disabled={selectedLabs.size === 0}
          className="ml-auto px-4 py-2 rounded-md font-bold text-white bg-slate-700 dark:[background-color:oklch(47.6%_0.114_61.907)] hover:bg-slate-800 transition flex items-center gap-2"
        >
          {t("laboratory.print")}
          <FaPrint className="text-white" />
        </button>
      </div>

      {/* Desktop table */}
      <div className="hidden sm:block">
        <table className={LaboratoryPageStyles.table}>
          <thead>
            <tr>
              {["selectAnalysis", "name", "description", "price", "unit"].map(
                (key) => (
                  <th key={key} className={LaboratoryPageStyles.th}>
                    {t(`laboratory.${key}`)}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {filteredLabs.length > 0 ? (
              filteredLabs.map((lab) => (
                <tr key={lab.id} className={LaboratoryPageStyles.trHover}>
                  <td className={LaboratoryPageStyles.td}>
                    <input
                      type="checkbox"
                      checked={selectedLabs.has(lab.id)}
                      onChange={() => toggleLabSelection(lab.id)}
                      className="accent-gray-300 dark:accent-[oklch(47.6%_0.114_61.907)]"
                    />
                  </td>
                  <td className={LaboratoryPageStyles.td}>{lab.name}</td>
                  <td className={LaboratoryPageStyles.td}>{lab.description}</td>
                  <td className={LaboratoryPageStyles.td}>
                    {editingPriceId === lab.id ? (
                      <input
                        type="text"
                        value={tempPrices[lab.id]}
                        onChange={(e) =>
                          handlePriceChange(lab.id, e.target.value)
                        }
                        onBlur={() => setEditingPriceId(null)}
                        onKeyDown={(e) => handlePriceKeyDown(lab.id, e)}
                        autoFocus
                        className="w-20 border rounded-md bg-white dark:[background-color:oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100 px-1"
                      />
                    ) : (
                      <span
                        className="cursor-pointer"
                        onClick={() => setEditingPriceId(lab.id)}
                      >
                        {tempPrices[lab.id].toFixed(2)}{" "}
                        {mainCurrency?.currencySymbol}
                      </span>
                    )}
                  </td>
                  <td className={LaboratoryPageStyles.td}>{lab.unit}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className={LaboratoryPageStyles.td} colSpan={5}>
                  {t("noAnalysesFound")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="sm:hidden flex flex-col gap-2">
        {filteredLabs.map((lab) => (
          <div
            key={lab.id}
            className="border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded-lg p-3 bg-white dark:[background-color:oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100 transition-all duration-300"
          >
            <div
              className="flex justify-between items-center cursor-pointer font-semibold"
              onClick={() => toggleExpand(lab.id)}
            >
              <span>{lab.name}</span>
              <span>{expandedIds.includes(lab.id) ? "▲" : "▼"}</span>
            </div>
            <div
              className={`mt-2 space-y-1 overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                expandedIds.includes(lab.id) ? "max-h-96" : "max-h-0"
              }`}
            >
              <p>
                {t("laboratory.description")}: {lab.description}
              </p>
              <p>
                {t("laboratory.price")}:{" "}
                {editingPriceId === lab.id ? (
                  <input
                    type="text"
                    value={tempPrices[lab.id]}
                    onChange={(e) => handlePriceChange(lab.id, e.target.value)}
                    onBlur={() => setEditingPriceId(null)}
                    onKeyDown={(e) => handlePriceKeyDown(lab.id, e)}
                    autoFocus
                    className="w-20 border rounded-md bg-white dark:[background-color:oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100 px-1"
                  />
                ) : (
                  <span
                    className="cursor-pointer"
                    onClick={() => setEditingPriceId(lab.id)}
                  >
                    {tempPrices[lab.id].toFixed(2)}{" "}
                    {mainCurrency?.currencySymbol}
                  </span>
                )}
              </p>
              <p>
                {t("laboratory.unit")}: {lab.unit}
              </p>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedLabs.has(lab.id)}
                  onChange={() => toggleLabSelection(lab.id)}
                  className="accent-gray-300 dark:accent-[oklch(47.6%_0.114_61.907)]"
                />
                {t("laboratory.selectAnalysis")}
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-end">
        <div className="flex items-center gap-3 p-4">
          <h3 className="text-lg font-bold">{t("Total")}:</h3>
          <p className="text-xl font-semibold px-3 py-1 border-b border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded-md bg-white dark:[background-color:oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100">
            {totalPrice.toFixed(2)} {mainCurrency?.currencySymbol}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LaboratoryPage;
