import * as React from "react";
import { useState, useCallback } from "react";
import PreviewPopup from "../../components/PreviewPopup";
import GeneratePage from "../GeneratePage";
import { HiOutlineSparkles } from "react-icons/hi2";
import { EmptyDashboardProps } from "./types";
import { fetchTableNames } from "../../../services/api/api";
import { useTableNameStore } from "../../store/tableNameList.store";
import EmptyBar from "../../../assets/bar-chart-empty.svg";
import { connectToDatabase } from "../../../services/api/database";

const EmptyDashboard: React.FC<EmptyDashboardProps> = ({
  isGenerate,
  setIsGenerate,
  payload,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { tableNameData } = useTableNameStore();

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await connectToDatabase(payload);
      console.log("API Response:", data);

      const tables = await fetchTableNames();
      console.log("Tables:", tables);
      tableNameData(tables);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [payload, tableNameData]);

  const handleGenerateClick = async () => {
    await fetchData();
    setIsGenerate(true);
  };

  return (
    <>
      {isLoading ? (
        <GeneratePage />
      ) : (
        <div className="flex flex-col items-center justify-center h-screen text-center">
          <img src={EmptyBar} width={140} height={104} alt="Empty Bar Chart" />
          <h1 className="text-sm font-semibold mt-4">
            The dashboard has not yet been generated
          </h1>
          <p className="text-gray-600 mt-2">
            Select works from the database and generate a dashboard.
          </p>
          <button
            className="bg-orange-500 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-orange-600 transition mt-4"
            onClick={handleGenerateClick}
          >
            <HiOutlineSparkles className="text-xl" />
            Generate Dashboard
          </button>
          {isGenerate && <PreviewPopup setIsGenerate={setIsGenerate} />}
        </div>
      )}
    </>
  );
};

export default EmptyDashboard;
