export interface TableViewProps {
  tableData: any[];
  selectedTable: string | null;
  setIsGenerate?: (value: boolean) => void;
  error: string | null;
}
