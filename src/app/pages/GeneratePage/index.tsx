import React from "react";
import { FaSpinner, FaCheckCircle } from "react-icons/fa";
import DashboardIcon from "../../../assets/dashboard.svg";
import { useSteps } from "../../hooks/useSteps";

const GeneratePage = () => {
  const { step } = useSteps(3);
  return (
    <div className="flex items-center justify-center h-screen ml-64">
      <div>
        <img src={DashboardIcon} width={248} height={123} />
      </div>

      <div className="ml-6 text-sm">
        <h1 className="font-semibold ">Generating your dashboard</h1>
        <p
          className={`flex items-center mt-4 ${
            step === 0 ? "font-bold" : "text-[#363F4A]"
          }`}
        >
          {step >= 1 ? (
            <FaCheckCircle className="text-green-500 mr-2" />
          ) : (
            <FaSpinner className="animate-spin text-gray-500 mr-2" />
          )}
          Fetching Data
        </p>
        <p
          className={`flex items-center mt-2 ${
            step === 1 ? "font-bold" : "text-[#363F4A]"
          }`}
        >
          {step >= 2 ? (
            <FaCheckCircle className="text-green-500 mr-2" />
          ) : (
            <FaSpinner className="animate-spin text-gray-500 mr-2" />
          )}
          Analyzing Data
        </p>
        <p
          className={`flex items-center mt-2 ${
            step === 2 ? "font-bold" : "text-[#363F4A]"
          }`}
        >
          {step >= 3 ? (
            <FaCheckCircle className="text-green-500 mr-2" />
          ) : (
            <FaSpinner className="animate-spin text-gray-500 mr-2" />
          )}
          Generating Results
        </p>
      </div>
    </div>
  );
};

export default GeneratePage;
