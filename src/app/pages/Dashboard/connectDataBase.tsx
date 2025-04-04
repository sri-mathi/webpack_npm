import React, { useState } from "react";

import DashboardImage from "../../../assets/dashboard.svg";
import UploadButton from "../../components/UploadButton";

import ConnectDatabaseButton from "../../components/ConnectDatabaseButton";
import ConnectionPopup from "../../components/ConnectionPopup";

const ConnectDataBasePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [connectionStatus, setConnectionStatus] = useState<string | null>(null);

  return (
    <>
      <div className="flex items-center justify-center flex-col gap-3 w-100% h-100%">
        <img src={DashboardImage} width={208.31} height={123.4} />
        <div className="text-sm text-center w-[380px]">
          <h1 className="font-semibold mb-1">
            We don't have anything to show you!
          </h1>
          <p className="text-gray-500 mb-3">
            Monitor your projects, track your team's progress, and more with a
            widget on your dashboard.
          </p>
          <div className="flex gap-4 justify-center">
            <UploadButton />
            <button onClick={() => setIsModalOpen(true)}>
              <ConnectDatabaseButton />
            </button>
          </div>
        </div>
      </div>

      {/* TODO: implement snack for common */}
      {/* {connectionStatus && (
        <div
          className={`fixed bottom-0 left-0 mb-4 ml-4 p-3 border-t ${
            connectionStatus === "Database Connection Failed"
              ? "border-red-500 bg-white"
              : "border-green-500 bg-white"
          } text-black rounded-lg shadow-lg flex items-center gap-2 z-1000`}
        >
          {connectionStatus === "Database Connection Failed" ? (
            <IoIosClose className="text-red-500 text-xl" />
          ) : (
            <IoCheckmarkCircleSharp className="text-green-500 text-xl" />
          )}
          <span className="flex-1">{connectionStatus}</span>
          <IoIosClose
            className="text-xl cursor-pointer"
            onClick={() => setConnectionStatus(null)}
          />
        </div>
      )} */}

      {isModalOpen && (
        <ConnectionPopup
          setIsModalOpen={setIsModalOpen}
          setConnectionStatus={setConnectionStatus}
        />
      )}
    </>
  );
};

export default ConnectDataBasePage;
