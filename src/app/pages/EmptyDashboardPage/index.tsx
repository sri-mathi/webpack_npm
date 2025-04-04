import * as React from "react";
import { useState } from "react";
import PreviewPopup from "../../components/PreviewPopup";
import GeneratePage from "../GeneratePage";
import { HiOutlineSparkles } from "react-icons/hi2";
import { EmptyDashboardProps } from "./types";
import EmptyBar from "../../../assets/bar-chart-empty.svg";

const EmptyDashboard: React.FC<EmptyDashboardProps> = ({
  isGenerate,
  setIsGenerate,
}) => {
  const [isLoading, setIsLoading] = useState(false);
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
            onClick={() => setIsGenerate(true)}
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
