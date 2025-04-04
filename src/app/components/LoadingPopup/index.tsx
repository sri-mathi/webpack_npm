import React from "react";
import { FaSpinner, FaCheckCircle } from "react-icons/fa";
import DashboardIcon from "../../../assets/dashboard.svg";

interface LoadingPopupProps {
  currentStep: number;
}

const LoadingPopup: React.FC<LoadingPopupProps> = ({ currentStep }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-1000">
      <div className="bg-white rounded-lg ml-30 p-8 h-[300px] w-[600px] flex items-center justify-center">
        <div>
          <img src={DashboardIcon} width={200} height={100} alt="Dashboard" />
        </div>

        <div className="ml-8 text-sm">
          <h1 className="font-semibold text-lg mb-4">Generating your dashboard</h1>
          <p
            className={`flex items-center mt-4 ${
              currentStep === 0 ? "font-bold" : "text-[#363F4A]"
            }`}
          >
            {currentStep > 0 ? (
              <FaCheckCircle className="text-green-500 mr-2" />
            ) : (
              <FaSpinner className="animate-spin text-gray-500 mr-2" />
            )}
            Fetching Data
          </p>
          <p
            className={`flex items-center mt-3 ${
              currentStep === 1 ? "font-bold" : "text-[#363F4A]"
            }`}
          >
            {currentStep > 1 ? (
              <FaCheckCircle className="text-green-500 mr-2" />
            ) : currentStep === 1 ? (
              <FaSpinner className="animate-spin text-gray-500 mr-2" />
            ) : (
              <FaSpinner className="text-gray-300 mr-2" />
            )}
            Analyzing Data
          </p>
          <p
            className={`flex items-center mt-3 ${
              currentStep === 2 ? "font-bold" : "text-[#363F4A]"
            }`}
          >
            {currentStep > 2 ? (
              <FaCheckCircle className="text-green-500 mr-2" />
            ) : currentStep === 2 ? (
              <FaSpinner className="animate-spin text-gray-500 mr-2" />
            ) : (
              <FaSpinner className="text-gray-300 mr-2" />
            )}
            Generating Results
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingPopup;