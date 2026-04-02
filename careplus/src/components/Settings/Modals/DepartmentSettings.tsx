import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "../../../ui/SnackbarContext";
import { Department, departmentAPI } from "../../../app/api";
import { FaTrash, FaEdit, FaSave, FaBuilding } from "react-icons/fa";

const DepartmentSettings: React.FC = () => {
  const { t } = useTranslation();
  const { showSnackbar } = useSnackbar();

  const [departments, setDepartments] = useState<Department[]>([]);
  const [newDepartment, setNewDepartment] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedDepartment, setEditedDepartment] = useState("");

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await departmentAPI.getAll();
      setDepartments(res.data);
    } catch (error) {
      console.error("Error loading departments", error);
    }
  };

  const addDepartment = async () => {
    if (!newDepartment.trim()) return;

    try {
      await departmentAPI.create({
        name: newDepartment,
        description: "",
      });

      showSnackbar(t("settingsPage.departmentAdded"), "success");
      setNewDepartment("");
      fetchDepartments();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteDepartment = async (id: number | string) => {
    try {
      await departmentAPI.delete(id);
      showSnackbar(t("settingsPage.departmentDeleted"), "success");
      fetchDepartments();
    } catch (error) {
      console.error(error);
    }
  };

  const startEdit = (dept: Department) => {
    setEditingId(Number(dept.id));
    setEditedDepartment(dept.name);
  };

  const saveEdit = async (id: number | string) => {
    if (!editedDepartment.trim()) return;

    try {
      await departmentAPI.update(id, {
        name: editedDepartment,
      });

      showSnackbar(t("settingsPage.departmentUpdated"), "success");
      setEditingId(null);
      fetchDepartments();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <FaBuilding className="text-primary dark:text-white" />
        {t("settingsPage.departments")}
      </h2>

      <div className="flex gap-2 mb-4">
        <input
          value={newDepartment}
          onChange={(e) => setNewDepartment(e.target.value)}
          placeholder={t("settingsPage.newDepartment")}
          className="flex-1 p-2 bg-white dark:[background-color:oklch(20.5%_0_0)] border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] text-gray-900 dark:text-white rounded"
        />

        <button
          onClick={addDepartment}
          className="px-4 py-2 bg-slate-700 dark:bg-[oklch(47.6%_0.114_61.907)] text-white rounded"
        >
          {t("settingsPage.add")}
        </button>
      </div>

      <div className="border-t border-gray-300 dark:border-gray-600 my-4"></div>

      <div className="flex flex-col gap-2">
        {departments.map((dept) => (
          <div
            key={dept.id}
            className="flex justify-between items-center p-3 bg-white dark:[background-color:oklch(20.5%_0_0)] border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded"
          >
            {editingId === dept.id ? (
              <input
                value={editedDepartment}
                onChange={(e) => setEditedDepartment(e.target.value)}
                className="flex-1 p-2 bg-white dark:[background-color:oklch(20.5%_0_0)] border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] text-gray-900 dark:text-white rounded"
              />
            ) : (
              <span className="text-gray-700 dark:text-gray-300">
                {dept.name}
              </span>
            )}

            <div className="flex gap-2">
              {editingId === dept.id ? (
                <button
                  onClick={() => saveEdit(dept.id)}
                  className="px-2 h-8 rounded bg-gray-500 dark:[background-color:oklch(20.5%_0_0)] border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] text-white"
                >
                  <FaSave />
                </button>
              ) : (
                <button
                  onClick={() => startEdit(dept)}
                  className="px-2 h-8 rounded bg-gray-500 dark:[background-color:oklch(20.5%_0_0)] border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] text-white"
                >
                  <FaEdit />
                </button>
              )}

              <button
                onClick={() => deleteDepartment(dept.id)}
                className="px-2 h-8 rounded text-white hover:opacity-80 transition bg-slate-700 dark:[background-color:oklch(47.6%_0.114_61.907)]"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentSettings;
