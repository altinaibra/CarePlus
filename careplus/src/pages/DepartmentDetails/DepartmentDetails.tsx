import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import styles from "../../styles/DepartmentDetailsStyles";
import {
  FaHeartbeat,
  FaBrain,
  FaChild,
  FaAmbulance,
  FaXRay,
  FaBone,
  FaStethoscope,
  FaClock,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaProcedures,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { departmentAPI, departmentDetailsAPI, DepartmentDetailsInfo } from "../../app/departmentAPI";

interface Department {
  id: number;
  name: string;
}

type DepartmentMeta = {
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  shortDescription: string;
  services: string[];
  location: string;
  hours: string;
  phone: string;
  highlights: Array<{
    label: string;
    value: string;
    Icon: DepartmentMeta["Icon"];
  }>;
};

const departmentColors: Record<string, string> = {
  Cardiology: "bg-red-200",
  Radiology: "bg-blue-200",
  Emergency: "bg-yellow-200",
  Neurology: "bg-purple-200",
  Pediatrics: "bg-green-200",
  default: "bg-gray-200",
};

const departmentMeta: Record<string, DepartmentMeta> = {
  Cardiology: {
    Icon: FaHeartbeat,
    shortDescription: "Diagnosticim dhe trajtim i sëmundjeve të zemrës.",
    services: [],
    location: "",
    hours: "",
    phone: "",
    highlights: [],
  },
  Neurology: {
    Icon: FaBrain,
    shortDescription: "",
    services: [],
    location: "",
    hours: "",
    phone: "",
    highlights: [],
  },
  Pediatrics: {
    Icon: FaChild,
    shortDescription: "",
    services: [],
    location: "",
    hours: "",
    phone: "",
    highlights: [],
  },
  Emergency: {
    Icon: FaAmbulance,
    shortDescription: "",
    services: [],
    location: "",
    hours: "",
    phone: "",
    highlights: [],
  },
  Radiology: {
    Icon: FaXRay,
    shortDescription: "",
    services: [],
    location: "",
    hours: "",
    phone: "",
    highlights: [],
  },
  Orthopedics: {
    Icon: FaBone,
    shortDescription: "",
    services: [],
    location: "",
    hours: "",
    phone: "",
    highlights: [],
  },
  default: {
    Icon: FaStethoscope,
    shortDescription: "",
    services: [],
    location: "",
    hours: "",
    phone: "",
    highlights: [],
  },
};

const DepartmentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [department, setDepartment] = useState<Department | null>(null);
  const [details, setDetails] = useState<DepartmentDetailsInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const [deptResp, detailsResp] = await Promise.allSettled([
          departmentAPI.getById(id),
          departmentDetailsAPI.getByDepartment(id),
        ]);

        if (deptResp.status === "fulfilled")
          setDepartment(deptResp.value.data as Department);
        if (detailsResp.status === "fulfilled")
          setDetails(detailsResp.value.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (!department)
    return <p className={styles.loading}>Department not found</p>;

  const bgColor = departmentColors[department.name] || departmentColors.default;
  const meta = departmentMeta[department.name] || departmentMeta.default;

  const services =
    details?.services
      ?.split(";")
      .map((s) => s.trim())
      .filter(Boolean) || [];
  const highlights = details
    ? [
        {
          label: details.highlight1Label,
          value: details.highlight1Value,
          Icon: FaStethoscope,
        },
        {
          label: details.highlight2Label,
          value: details.highlight2Value,
          Icon: FaClock,
        },
      ]
    : [];

  const DeptIcon = meta.Icon;

  return (
    <div className={`${bgColor} ${styles.container}`}>
      <div className={styles.card}>
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 rounded-lg bg-slate-100 text-slate-700 dark:bg-gray-700 dark:text-gray-100">
            <DeptIcon size={28} />
          </div>
          <div className="flex-1">
            <h1 className={styles.title}>{department.name}</h1>
            <p className="text-gray-700 dark:text-gray-300">
              {details?.shortDescription || meta.shortDescription}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="flex items-center gap-2 rounded-md border border-gray-200 dark:border-gray-700 p-3">
            <FaMapMarkerAlt className="text-slate-700 dark:text-gray-200" />
            <div className="text-sm text-gray-700 dark:text-gray-200">
              {details?.location}
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-md border border-gray-200 dark:border-gray-700 p-3">
            <FaClock className="text-slate-700 dark:text-gray-200" />
            <div className="text-sm text-gray-700 dark:text-gray-200">
              {details?.hours}
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-md border border-gray-200 dark:border-gray-700 p-3">
            <FaPhoneAlt className="text-slate-700 dark:text-gray-200" />
            <div className="text-sm text-gray-700 dark:text-gray-200">
              {details?.phone}
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
          <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
            {t("mainServices")}
          </h2>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            {services.map((s) => (
              <li key={s} className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-slate-700 dark:bg-gray-200" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 mt-4">
          <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
            {t("details")}
          </h2>
          <div className="space-y-3">
            {highlights.map((h) => {
              const HIcon = h.Icon;
              return (
                <div
                  key={`${h.label}-${h.value}`}
                  className="flex items-center gap-3"
                >
                  <div className="p-2 rounded-md bg-slate-100 text-slate-700 dark:bg-gray-700 dark:text-gray-100">
                    <HIcon size={16} />
                  </div>
                  <div className="text-sm">
                    <div className="text-gray-600 dark:text-gray-400">
                      {h.label}
                    </div>
                    <div className="font-semibold text-gray-900 dark:text-gray-100">
                      {h.value}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetails;
