// PatientCategoriesStyles.ts
export const PatientCategoriesStyles = {
  container: "flex flex-col h-full",

  headerWrapper: "mb-4",
  headerTitle: "text-xl font-bold mb-2",
  headerDescription: "text-gray-600 dark:text-gray-300",

  inputGrid: "grid gap-3 mb-4",
  input:
    "w-full p-2 border rounded bg-white dark:[background-color:oklch(20.5%_0_0)] border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)]",
  textarea:
    "w-full p-2 border rounded min-h-[100px] bg-white dark:[background-color:oklch(20.5%_0_0)] border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)]",
  addButton:
    "px-4 py-2 rounded bg-slate-700 dark:bg-[oklch(47.6%_0.114_61.907)] text-white hover:bg-slate-800",

  categoriesList: "space-y-3",
  noCategoriesText: "text-gray-600 dark:text-gray-300",
  categoryItem:
    "p-3 border rounded bg-white dark:[background-color:oklch(20.5%_0_0)] border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)]",
  categoryContent: "flex justify-between items-start gap-3",
  categoryInfo: "",
  categoryTitle: "font-semibold",
  categoryDetails: "text-sm text-gray-600 dark:text-gray-300",
  deleteButton: "px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600",
};
