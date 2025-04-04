import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import {
  HiOutlineSparkles,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import { TableViewProps } from "./types";

const rowsPerPage = 10;

const TableView: React.FC<TableViewProps> = ({
  tableData,
  selectedTable,
  setIsGenerate,
  error,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(tableData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = tableData.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="m-2">
      <div className="flex gap-4 items-center mt-20">
        <div className="flex items-center border border-gray-300 rounded-md bg-white p-2 w-[220px] h-[40px]">
          <IoIosSearch className="text-gray-500 text-xl" />
          <input
            type="text"
            className="border-none outline-none pl-2 w-full"
            placeholder="Search"
          />
        </div>

        <button
          className="bg-orange-500 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-orange-600 transition"
          onClick={() => setIsGenerate && setIsGenerate(true)}
        >
          <HiOutlineSparkles className="text-xl" />
          Generate Dashboard
        </button>
      </div>

      {selectedTable && tableData.length > 0 && (
        <div className="mt-6 overflow-x-auto mr-10">
          <table className="min-w-full table-auto border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                {Object.keys(tableData[0]).map((column) => (
                  <th
                    key={column}
                    className="px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row, index) => (
                <tr key={index} className="border border-gray-300">
                  {Object.values(row).map((value, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-4 py-2 border border-gray-300 text-sm text-gray-600"
                    >
                      {String(value)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end items-center mt-4 gap-4 fixed bottom-0 right-0 mb-8 mr-10">
            <button
              onClick={() =>
                setCurrentPage((prev: number) => Math.max(prev - 1, 1))
              }
              disabled={currentPage === 1}
              className="p-2 bg-gray-300 text-gray-700 rounded-full disabled:opacity-50"
            >
              <HiChevronLeft className="text-xl" />
            </button>
            <span className="px-4 py-2 text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev: number) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-2 bg-gray-300 text-gray-700 rounded-full disabled:opacity-50"
            >
              <HiChevronRight className="text-xl" />
            </button>
          </div>
        </div>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {selectedTable && tableData.length === 0 && !error && (
        <p className="mt-4 text-gray-500">No data available for this table.</p>
      )}
    </div>
  );
};

export default TableView;
