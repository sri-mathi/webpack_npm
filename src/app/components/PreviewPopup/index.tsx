import React, { useCallback, useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { HiOutlineSparkles } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { fetchTableColumnDataTypes, fetchTableData } from "../../../services/api/api";
import { PreviewPopupProps } from "./types";
import { useTableNameStore } from "../../store/tableNameList.store";
import { useTableDataStore } from "../../store/tableData.store";
import { useDashboardStore } from "../../store/dashboardState.store";

const PreviewPopup: React.FC<PreviewPopupProps> = ({ setIsGenerate }) => {
  // const navigate = useNavigate();
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [selectedTables, setSelectedTables] = useState<string[]>([]);

  const { tableName: tableList } = useTableNameStore();
  const { data, tableData, updateError } = useTableDataStore();

  const { setIsFetchingData, setColumnData, setSelectedTables: setGlobalSelectedTables } =
    useDashboardStore();

  const getData = useCallback(
    async (selectedTable: string) => {
      try {
        if (selectedTable) {
          const result = await fetchTableData(selectedTable);
          tableData(result);
        }
      } catch (error) {
        updateError((error as Error).message);
      }
    },
    [tableData, updateError]
  );

  useEffect(() => {
    if (selectedTable) getData(selectedTable);
  }, [getData, selectedTable]);

  const handleTableSelection = (
    e: React.ChangeEvent<HTMLInputElement>,
    table: string
  ) => {
    e.stopPropagation();
    setSelectedTables((prev) =>
      prev.includes(table) ? prev.filter((t) => t !== table) : [...prev, table]
    );
    if (e.target.checked) {
      setSelectedTable(table);
    } else {
      setSelectedTable(null);
      tableData([]);
    }
  };

  const handlegetTableData =async () => {
    setIsFetchingData(true);
    console.log("Selected Tables : ", selectedTables);
    setGlobalSelectedTables(selectedTables);
    // navigate('/dashboard');
    setIsGenerate(false);

    const data = await fetchTableColumnDataTypes(selectedTables);
    setColumnData(data);
    console.log("column", data);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-1000 bg-gray-100/70">
      <div className="bg-white rounded-lg shadow-lg w-[80%] h-[70%] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-[#EAEFF4]">
          <h2 className="text-lg font-bold">Generate Dashboard</h2>
          <IoIosClose
            className="text-2xl cursor-pointer"
            onClick={() => setIsGenerate(false)}
          />
        </div>
        <div className="flex flex-grow overflow-hidden p-3">
          <div className="w-70 border-r border-[#EAEFF4] p-10 overflow-auto">
            <h2 className="text-sm text-gray-500 mb-3">SELECT WORKS</h2>
            {tableList?.map((table) => (
              <div key={table} className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={selectedTables.includes(table)}
                  onChange={(e) => handleTableSelection(e, table)}
                  onClick={(e) => e.stopPropagation()}
                />
                <span
                  className="cursor-pointer"
                  onClick={() => setSelectedTable(table)}
                >
                  {table} Data
                </span>
              </div>
            ))}
          </div>
          <div className="w-400 overflow-hidden">
            {selectedTables?.length > 0 ? (
              <div>
                <div className="flex flex-wrap gap-2 mb-4 border-b border-[#EAEFF4] p-4">
                  {selectedTables.map((table) => (
                    <span
                      key={table}
                      className={`px-3 py-1 rounded-lg text-sm font-medium cursor-pointer ${
                        table === selectedTable
                          ? "text-blue-500"
                          : "text-gray-700"
                      }`}
                      onClick={() => {
                        setSelectedTable(table);
                      }}
                    >
                      {table}
                    </span>
                  ))}
                </div>
                {data?.length > 0 ? (
                  <div className="rounded-md overflow-hidden p-4">
                    <div
                      className="overflow-auto"
                      style={{ maxHeight: "450px" }}
                    >
                      <table className="w-full border-collapse border">
                        <thead className="bg-gray-100">
                          <tr>
                            {Object.keys(data[0]).map((col) => (
                              <th
                                key={col}
                                className="border border-gray-300 px-2 py-1 text-sm font-medium text-gray-700"
                              >
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((row: any, i:number) => (
                            <tr key={i} className="border border-gray-300">
                              {Object.values(row).map((val, j) => (
                                <td
                                  key={j}
                                  className="border border-gray-300 px-2 py-1 text-sm text-gray-600"
                                >
                                  {String(val)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">No data available</p>
                )}
              </div>
            ) : (
              <p className="text-gray-500">Select tables to preview data</p>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-4 mb-4 mr-4">
          <button
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
            onClick={() => setIsGenerate(false)}
          >
            Cancel
          </button>
          <button
            className="flex px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
            onClick={handlegetTableData}
          >
            <HiOutlineSparkles className="text-xl mr-2" /> Generate Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewPopup;
