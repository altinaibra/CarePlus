interface LabReportData {
  selectedLabs: {
    id: number;
    name: string;
    price: number;
    unit: string;
  }[];
  totalPrice: number;
  currency: string;
}

interface Window {
  labData?: LabReportData;
}
