import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function PatientsChart({ patients }: any) {
  const [chartMode, setChartMode] = useState<"day" | "week" | "month">("day");
  const { t } = useTranslation();
  const groupBy = (datePart: string) => {
    const map: Record<string, number> = {};

    if (!patients || !Array.isArray(patients)) {
      return [];
    }

    patients.forEach((p: any) => {
      const d = new Date(p.createdAt || p.registrationDate);
      let key = "";

      if (datePart === "day") {
        key = d.toLocaleDateString();
      } else if (datePart === "week") {
        const weekNumber = Math.ceil((d.getDate() - d.getDay() + 1) / 7);
        key = `Week ${weekNumber}`;
      } else if (datePart === "month") {
        key = d.toLocaleString("default", { month: "short", year: "numeric" });
      }

      map[key] = (map[key] || 0) + 1;
    });

    return Object.keys(map).map((k) => ({ name: k, count: map[k] }));
  };

  const chartData = groupBy(chartMode);

  // Filter patients by current mode and calculate gender statistics
  const getFilteredPatients = () => {
    if (!patients || !Array.isArray(patients)) {
      return [];
    }

    const today = new Date();
    return patients.filter((p: any) => {
      const d = new Date(p.createdAt || p.registrationDate);

      if (chartMode === "day") {
        return d.toLocaleDateString() === today.toLocaleDateString();
      } else if (chartMode === "week") {
        const todayWeek = Math.ceil((today.getDate() - today.getDay() + 1) / 7);
        const pWeek = Math.ceil((d.getDate() - d.getDay() + 1) / 7);
        return pWeek === todayWeek && d.getFullYear() === today.getFullYear();
      } else if (chartMode === "month") {
        return (
          d.getMonth() === today.getMonth() &&
          d.getFullYear() === today.getFullYear()
        );
      }
      return false;
    });
  };

  const filteredPatients = getFilteredPatients();

  const genderStats = {
    female:
      filteredPatients?.filter(
        (p: any) =>
          p.gender?.toLowerCase() === "female" ||
          p.gender?.toLowerCase() === "f",
      ).length || 0,
    male:
      filteredPatients?.filter(
        (p: any) =>
          p.gender?.toLowerCase() === "male" || p.gender?.toLowerCase() === "m",
      ).length || 0,
  };

  return (
    <div className="mb-6">
      {/* Buttons */}
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setChartMode("day")}
          className={`px-3 py-1 rounded transition ${
            chartMode === "day"
              ? "bg-slate-700 text-white"
              : "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          {t("patients.byDay")}
        </button>

        <button
          onClick={() => setChartMode("week")}
          className={`px-3 py-1 rounded transition ${
            chartMode === "week"
              ? "bg-slate-700 text-white"
              : "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          {t("patients.byWeek")}
        </button>

        <button
          onClick={() => setChartMode("month")}
          className={`px-3 py-1 rounded transition ${
            chartMode === "month"
              ? "bg-slate-700 text-white"
              : "bg-gray-200 dark:bg-gray-700"
          }`}
        >
          {t("patients.byMonth")}
        </button>
      </div>

      {/* Chart */}
      <div className="w-full h-64 bg-white dark:[background-color:oklch(20.5%_0_0)] p-4 rounded-lg shadow border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar
              dataKey="count"
              fill="rgba(51,65,85,0.9)"
              label={{ position: "top" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gender Statistics */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">
            {t("patients.female") || "Female"}
          </p>
          <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
            {genderStats.female}
          </p>
        </div>
        <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg border border-pink-200 dark:border-pink-800">
          <p className="text-sm font-semibold text-pink-600 dark:text-pink-400 mb-1">
            {t("patients.male") || "Male"}
          </p>
          <p className="text-2xl font-bold text-pink-700 dark:text-pink-300">
            {genderStats.male}
          </p>
        </div>
      </div>
    </div>
  );
}
