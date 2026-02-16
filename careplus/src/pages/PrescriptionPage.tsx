import React, { useState } from "react";

const PrescriptionPage: React.FC = () => {
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientGender, setPatientGender] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] = useState("");

  const handleSave = () => {
    alert("Prescription saved!");
  };

  const handleClose = () => {
    alert("Closing page...");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mx-auto px-60 bg-gray-100 dark:bg-gray-800 min-h-screen">
      <div className="flex justify-end mb-4">
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800 transition"
        >
          Print
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-6">Patient Prescription</h2>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Patient Name</label>
        <input
          type="text"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter patient name"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block mb-1 font-semibold">Age</label>
          <input
            type="number"
            value={patientAge}
            onChange={(e) => setPatientAge(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Age"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block mb-1 font-semibold">Gender</label>
          <input
            type="text"
            value={patientGender}
            onChange={(e) => setPatientGender(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Gender"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Diagnosis</label>
        <textarea
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          className="w-full p-2 border rounded min-h-[80px]"
          placeholder="Enter diagnosis"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Prescription</label>
        <textarea
          value={prescription}
          onChange={(e) => setPrescription(e.target.value)}
          className="w-full p-2 border rounded min-h-[120px]"
          placeholder="Enter prescription details"
        />
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={handleClose}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
        >
          Close
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default PrescriptionPage;
