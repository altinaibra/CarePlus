export const PatientListStyles = {
  container: "w-full",
  searchWrapper: "relative mb-4",
  searchIcon:
    "absolute inset-y-0 left-2 flex items-center text-gray-500 dark:text-gray-300",
  searchInput:
    "w-5xl sm:w-5xl p-2 pl-9 border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded-md bg-white dark:[background-color:oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100",
  noPatients: "text-gray-600 dark:text-gray-300",
  tableWrapper: "overflow-x-auto w-full hidden sm:block",
  table:
    "min-w-[700px] w-full border-collapse text-gray-900 dark:text-gray-100",
  theadRow: "bg-gray-100 dark:[background-color:oklch(20.5%_0_0)]",
  th: "border-b border-gray-300 dark:[border-bottom-color:oklch(47.6%_0.114_61.907)] p-3 text-left font-semibold whitespace-nowrap",
  tbodyRow: "hover:bg-gray-50 dark:hover:[background-color:oklch(20.5%_0_0)]",
  td: "border-b p-3 dark:[border-bottom-color:oklch(47.6%_0.114_61.907)] whitespace-nowrap",
  deleteBtn:
    "flex items-center gap-1 px-3 py-1 bg-slate-700 dark:[background-color:oklch(47.6%_0.114_61.907)] text-white border-0 rounded cursor-pointer transition text-sm",
  mobileListWrapper: "sm:hidden flex flex-col gap-2",
  mobileCard:
    "border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)] rounded-lg p-3 bg-white dark:[background-color:oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100 transition-all duration-300 ease-in-out",
  mobileCardHeader:
    "flex justify-between items-center cursor-pointer font-semibold",
  mobileCardBody:
    "mt-2 text-sm space-y-1 overflow-hidden max-h-0 transition-[max-height] duration-300 ease-in-out",
  mobileCardBodyExpanded: "max-h-96", // when expanded
};
