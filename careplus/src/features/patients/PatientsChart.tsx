import { useEffect, useState } from "react";
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
import { patientAPI } from "../../app/api";

interface PatientsChartProps {
  patients?: any[];
}

interface ChartPoint {
  name: string;
  count: number;
}

export default function PatientsChart({ patients }: PatientsChartProps) {
  const [chartMode, setChartMode] = useState<"day" | "week" | "month">("day");
  const [fetchedPatients, setFetchedPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();
  const patientList = Array.isArray(patients) ? patients : fetchedPatients;

  const parseDate = (patient: any): Date | null => {
    const value = patient?.createdAt || patient?.registrationDate;
    if (!value) return null;
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  };

  const getWeekNumber = (date: Date) => {
    const target = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
    );
    const dayNumber = (target.getUTCDay() + 6) % 7;
    target.setUTCDate(target.getUTCDate() - dayNumber + 3);
    const firstThursday = target.valueOf();
    target.setUTCMonth(0, 1);
    if (target.getUTCDay() !== 4) {
      target.setUTCMonth(0, 1 + ((4 - target.getUTCDay() + 7) % 7));
    }
    return 1 + Math.round((firstThursday - target.valueOf()) / 604800000);
  };

  const buildChartData = (datePart: string): ChartPoint[] => {
    const groups: Record<
      string,
      { name: string; count: number; sortValue: number }
    > = {};

    patientList.forEach((patient: any) => {
      const date = parseDate(patient);
      if (!date) return;

      let key = "";
      let name = "";
      let sortValue = date.getTime();

      if (datePart === "day") {
        key = date.toISOString().slice(0, 10);
        name = date.toLocaleDateString();
      } else if (datePart === "week") {
        const week = getWeekNumber(date);
        key = `${date.getFullYear()}-W${week}`;
        name = `Week ${week} ${date.getFullYear()}`;
        const monday = new Date(date);
        const day = monday.getDay();
        monday.setDate(monday.getDate() - ((day + 6) % 7));
        sortValue = monday.getTime();
      } else {
        const month = date.getMonth() + 1;
        key = `${date.getFullYear()}-${month.toString().padStart(2, "0")}`;
        name = date.toLocaleString("default", {
          month: "short",
          year: "numeric",
        });
        sortValue = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
      }

      if (!groups[key]) {
        groups[key] = { name, count: 0, sortValue };
      }
      groups[key].count += 1;
    });

    return Object.values(groups)
      .sort((a, b) => a.sortValue - b.sortValue)
      .map((group) => ({ name: group.name, count: group.count }));
  };

  const chartData = buildChartData(chartMode);

  useEffect(() => {
    if (patients) return;

    const loadPatients = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await patientAPI.getAll();
        setFetchedPatients(response.data || []);
      } catch (err: any) {
        setError(t("patients.fetchError") || "Failed to load patient data.");
      } finally {
        setLoading(false);
      }
    };

    loadPatients();
  }, [patients, t]);

  const filteredPatients = patientList.filter((patient: any) => {
    const d = parseDate(patient);
    if (!d) return false;

    const today = new Date();

    if (chartMode === "day") {
      return d.toLocaleDateString() === today.toLocaleDateString();
    }

    if (chartMode === "week") {
      const currentWeekStart = new Date(today);
      const currentDay = currentWeekStart.getDay();
      currentWeekStart.setDate(
        currentWeekStart.getDate() - ((currentDay + 6) % 7),
      );
      const patientWeekStart = new Date(d);
      const patientDay = patientWeekStart.getDay();
      patientWeekStart.setDate(
        patientWeekStart.getDate() - ((patientDay + 6) % 7),
      );
      return (
        patientWeekStart.toDateString() === currentWeekStart.toDateString() &&
        d.getFullYear() === today.getFullYear()
      );
    }

    return (
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );
  });

  const genderStats = {
    female:
      filteredPatients.filter(
        (p: any) =>
          p.gender?.toLowerCase() === "female" ||
          p.gender?.toLowerCase() === "f",
      ).length || 0,
    male:
      filteredPatients.filter(
        (p: any) =>
          p.gender?.toLowerCase() === "male" || p.gender?.toLowerCase() === "m",
      ).length || 0,
  };
  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="mb-6">
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setChartMode("day")}
          className={`px-3 py-1 rounded transition ${
            chartMode === "day"
              ? "bg-slate-700 dark:bg-[oklch(47.6%_0.114_61.907)] text-white"
              : "bg-slate-700 dark:bg-[oklch(47.6%_0.114_61.907)]"
          }`}
        >
          {t("patients.byDay")}
        </button>

        <button
          onClick={() => setChartMode("week")}
          className={`px-3 py-1 rounded transition ${
            chartMode === "week"
              ? "bg-slate-700 dark:bg-[oklch(47.6%_0.114_61.907)] text-white"
              : "bg-slate-700 dark:bg-[oklch(47.6%_0.114_61.907)]"
          }`}
        >
          {t("patients.byWeek")}
        </button>

        <button
          onClick={() => setChartMode("month")}
          className={`px-3 py-1 rounded transition ${
            chartMode === "month"
              ? "bg-slate-700 dark:bg-[oklch(47.6%_0.114_61.907)] text-white"
              : "bg-slate-700 dark:bg-[oklch(47.6%_0.114_61.907)]"
          }`}
        >
          {t("patients.byMonth")}
        </button>
      </div>

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
