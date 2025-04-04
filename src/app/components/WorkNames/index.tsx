import React from "react";
import { useState, useEffect } from "react";
import { FaDatabase } from "react-icons/fa";
import { WorkNamesProps } from "./types";
import { fetchTableNames } from "../../../services/api/api";
import { useTableNameStore } from "../../store/tableNameList.store";
import { Link } from "react-router-dom";

const WorkNames: React.FC<WorkNamesProps> = ({
  onTableClick,
  selectedTable,
}) => {
  const { updateLoading, tableNameData, updateError } = useTableNameStore();

  const [tableNames, setTableNames] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTableNames = async () => {
      try {
        updateLoading();
        const tables = await fetchTableNames();
        setTableNames(tables);
        tableNameData(tables);
      } catch (error) {
        setError((error as Error).message);
        updateError((error as Error).message);
      }
    };

    getTableNames();
  }, [tableNameData, updateError, updateLoading]);

  return (
    <div className="p-2">
      <h2 className="ml-2 text-lg mb-2 text-orange-600">Works</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {tableNames.length ? (
            tableNames.map((tableName, index) => (
              <Link to={`/preview/${tableName}`}>
                <li key={index} className="flex items-center">
                  <button
                    onClick={() => onTableClick(tableName)}
                    className={`p-2 w-full text-left rounded-md flex items-center ${
                      tableName === selectedTable
                        ? "text-gray-700 hover:text-blue-600 hover:bg-gray-200"
                        : // ? "bg-blue-100 text-blue-600"
                          "text-gray-700 hover:text-blue-600 hover:bg-gray-200"
                    }`}
                  >
                    <FaDatabase className="mr-2" />
                    {tableName} Data
                  </button>
                </li>
              </Link>
            ))
          ) : (
            <p>No table names found.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default WorkNames;
