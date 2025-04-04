import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connectToDatabase } from "../../../services/api/database";
import { ConnectionPopupProps } from "./types";

import "./style.css";
import { useDatabaseStore } from "../../store/database.store";

const ConnectionPopup: React.FC<ConnectionPopupProps> = ({
  setIsModalOpen,
  setConnectionStatus,
}) => {
  const { updateLoading, updateError, updatebdData } = useDatabaseStore();
  const [host, setHost] = useState('doworks-testin.c7jrg0h7nzsx.ap-south-1.rds.amazonaws.com');
  const [username, setUsername] = useState("calibraint");
  const [password, setPassword] = useState("Spider$05");
  const [database, setDatabase] = useState("CRM-a89b6449-a48f-412c-bcd6-b364272ddfb7");
  const [port, setPort] = useState("5432");
  // const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // this is for dev use only 
    const payload = {
      host: 'doworks-testin.c7jrg0h7nzsx.ap-south-1.rds.amazonaws.com',
      user: 'calibraint',
      password: 'Spider$05',
      database:"CRM-a89b6449-a48f-412c-bcd6-b364272ddfb7",
      port: "5432",
    };

    try {
      updateLoading();
      const data = await connectToDatabase(payload);

      console.log("API Response:", data);

      if (data.message === "Failed to connect to the database" || data.error) {
        setConnectionStatus("Database Connection Failed");
        updateError(data.message || data.error);
      } else {
        updatebdData(data);
        setConnectionStatus("Database Connected Successfully");
        // navigate("/previewpage");
      }
    } catch (error) {
      console.error("Error connecting to database:", error);
      setConnectionStatus("Database Connection Failed");
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center ml-64">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-[460px] h-[550px] scale-95 animate-modal">
          <h2 className="text-lg font-semibold mb-3">Connect Datasource</h2>
          <p className="text-gray-600 mb-4">
            Stay connected and manage your tasks efficiently!
          </p>
          <form onSubmit={handleSubmit}>
            <label>Host</label>
            <input
              type="text"
              placeholder="doworks-db.c5xugf.us-east"
              className="w-full p-2 border border-gray-300 rounded-md mb-3"
              value={host}
              onChange={(e) => setHost(e.target.value)}
              required
            />
            <label>Username</label>
            <input
              type="text"
              placeholder="Doworks"
              className="w-full p-2 border border-gray-300 rounded-md mb-3"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded-md mb-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="flex justify-end gap-3 mb-5">
              <div>
                <label>Database</label>
                <input
                  type="text"
                  placeholder="Optional"
                  className="w-full p-2 border border-gray-300 rounded-md mb-3"
                  value={database}
                  onChange={(e) => setDatabase(e.target.value)}
                />
              </div>
              <div>
                <label>Port</label>
                <input
                  type="text"
                  placeholder="3306"
                  className="w-full p-2 border border-gray-300 rounded-md mb-3"
                  value={port}
                  onChange={(e) => setPort(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md cursor-pointer"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-orange-600 text-white rounded-md cursor-pointer"
              >
                Connect
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConnectionPopup;
