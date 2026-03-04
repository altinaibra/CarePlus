import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { departmentAPI } from "../../app/api";
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
  highlights: Array<{ label: string; value: string; Icon: DepartmentMeta["Icon"] }>;
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
    services: [
      "EKG & monitorim Holter",
      "Ekokardiografi (Echo)",
      "Konsulta kardiologjike",
      "Menaxhim i hipertensionit",
    ],
    location: "Kati 2 · Blloku A",
    hours: "08:00 – 16:00",
    phone: "+383 44 000 111",
    highlights: [
      { label: "Prioritet", value: "Kontrolle kardiake", Icon: FaStethoscope },
      { label: "Kapacitet", value: "Dhoma monitorimi", Icon: FaProcedures },
    ],
  },
  Neurology: {
    Icon: FaBrain,
    shortDescription: "Kujdes për sistemin nervor dhe çrregullimet neurologjike.",
    services: [
      "Konsulta neurologjike",
      "Vlerësim për migrenë",
      "Menaxhim i epilepsisë",
      "Vlerësim për neuropati",
    ],
    location: "Kati 3 · Blloku B",
    hours: "08:00 – 16:00",
    phone: "+383 44 000 222",
    highlights: [
      { label: "Fokus", value: "Diagnostikë neurologjike", Icon: FaStethoscope },
      { label: "Shërbim", value: "Konsulta specialistike", Icon: FaProcedures },
    ],
  },
  Pediatrics: {
    Icon: FaChild,
    shortDescription: "Kujdes shëndetësor për foshnja dhe fëmijë.",
    services: [
      "Kontrolle rutinë",
      "Vaksinim (sipas protokollit)",
      "Konsulta pediatrike",
      "Trajtim i infeksioneve të lehta",
    ],
    location: "Kati 1 · Blloku A",
    hours: "08:00 – 16:00",
    phone: "+383 44 000 333",
    highlights: [
      { label: "Fokus", value: "Rritje & zhvillim", Icon: FaStethoscope },
      { label: "Kujdes", value: "Ambiente miqësore", Icon: FaProcedures },
    ],
  },
  Emergency: {
    Icon: FaAmbulance,
    shortDescription: "Shërbime emergjente 24/7 për raste urgjente.",
    services: [
      "Triagim dhe stabilizim",
      "Ndihmë e parë",
      "Trajtim i lëndimeve akute",
      "Koordinim me repartet",
    ],
    location: "Kati përdhes · Hyrja kryesore",
    hours: "24/7",
    phone: "+383 44 000 999",
    highlights: [
      { label: "Orari", value: "24/7", Icon: FaClock },
      { label: "Urgjencë", value: "Reagim i shpejtë", Icon: FaAmbulance },
    ],
  },
  Radiology: {
    Icon: FaXRay,
    shortDescription: "Imazheri mjekësore për diagnostikë (RTG, US, etj.).",
    services: [
      "RTG (X-Ray)",
      "Ultrazë (US)",
      "Imazheri sipas kërkesës",
      "Raporte diagnostike",
    ],
    location: "Kati 0 · Blloku C",
    hours: "08:00 – 16:00",
    phone: "+383 44 000 444",
    highlights: [
      { label: "Shërbim", value: "Diagnostikë me imazhe", Icon: FaXRay },
      { label: "Proces", value: "Raportim i shpejtë", Icon: FaClock },
    ],
  },
  Orthopedics: {
    Icon: FaBone,
    shortDescription: "Trajtim i kockave, nyjeve dhe dëmtimeve muskuloskeletale.",
    services: [
      "Konsulta ortopedike",
      "Vlerësim i frakturave",
      "Rehabilitim bazik",
      "Këshillim post-operativ",
    ],
    location: "Kati 2 · Blloku B",
    hours: "08:00 – 16:00",
    phone: "+383 44 000 555",
    highlights: [
      { label: "Fokus", value: "Trauma & ortopedi", Icon: FaBone },
      { label: "Kujdes", value: "Plan rehabilitimi", Icon: FaProcedures },
    ],
  },
  default: {
    Icon: FaStethoscope,
    shortDescription: "Informacion për departamentin e zgjedhur.",
    services: ["Konsulta", "Shërbime bazike", "Udhëzime & referime"],
    location: "—",
    hours: "—",
    phone: "—",
    highlights: [
      { label: "Info", value: "Detaje të përgjithshme", Icon: FaStethoscope },
      { label: "Status", value: "Në dispozicion", Icon: FaClock },
    ],
  },
};

const DepartmentDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [department, setDepartment] = useState<Department | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchDepartment = async () => {
      try {
        const res = await departmentAPI.getById(id);
        setDepartment(res.data as Department);
      } catch (error) {
        console.error("Error loading department", error);
      }
    };

    fetchDepartment();
  }, [id]);

  if (!department) return <p className={styles.loading}>Loading...</p>;

  const bgColor = departmentColors[department.name] || departmentColors.default;
  const meta = departmentMeta[department.name] || departmentMeta.default;
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
              {meta.shortDescription}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="flex items-center gap-2 rounded-md border border-gray-200 dark:border-gray-700 p-3">
            <FaMapMarkerAlt className="text-slate-700 dark:text-gray-200" />
            <div className="text-sm text-gray-700 dark:text-gray-200">
              {meta.location}
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-md border border-gray-200 dark:border-gray-700 p-3">
            <FaClock className="text-slate-700 dark:text-gray-200" />
            <div className="text-sm text-gray-700 dark:text-gray-200">
              {meta.hours}
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-md border border-gray-200 dark:border-gray-700 p-3">
            <FaPhoneAlt className="text-slate-700 dark:text-gray-200" />
            <div className="text-sm text-gray-700 dark:text-gray-200">
              {meta.phone}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
              Shërbimet kryesore
            </h2>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              {meta.services.map((s) => (
                <li key={s} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-slate-700 dark:bg-gray-200" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
              Detaje
            </h2>
            <div className="space-y-3">
              {meta.highlights.map((h) => {
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

        <p className="mt-6 text-xs text-gray-500 dark:text-gray-400">
          ID: {department.id}
        </p>
      </div>
    </div>
  );
};

export default DepartmentDetails;
