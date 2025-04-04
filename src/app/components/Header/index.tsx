import * as React from "react";
import { useState, memo } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { NAVBAR_CONSTANTS } from "./constants";
import useLogout from "../../hooks/useLogout";

const Header = ({ selectedTable, className }: { selectedTable: string | null; className?: string }) => {
  const { handleLogout } = useLogout();
  const [isOpen, setIsOpen] = useState(false);
  const userName: string | null = localStorage.getItem("name");
  const userEmail: string | null = localStorage.getItem("email");

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className={`fixed top-0 left-0 w-full h-[70px] bg-white border-b border-gray-300 py-5 px-6 flex justify-between items-center z-50 ${className}`}>
      <h4 className="text-lg font-semibold text-gray-900 ml-70">
        {selectedTable ? "Dashboard" : "Dashboard"}
      </h4>

      <div className="flex items-center gap-4">
        <IoMdNotificationsOutline className="text-gray-700 text-3xl cursor-pointer hover:opacity-80" />

        <div className="relative">
          <button onClick={toggleDropdown} className="flex items-center gap-2 text-gray-900 focus:outline-none">
            <FaUserCircle className="text-3xl cursor-pointer hover:bg-gray-300 rounded-full" />
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-6 w-auto p-2 bg-white rounded-sm shadow-lg">
              <div className="flex items-center gap-3 p-4 border-b" style={{ borderColor: "#EAEFF4" }}>
                <FaUserCircle className="text-3xl flex-shrink-0 cursor-pointer hover:bg-gray-300 rounded-full" />
                <div>
                  <p className="font-semibold">{userName || "Guest"}</p>
                  <p className="text-sm text-gray-500">{userEmail || "No Email"}</p>
                </div>
              </div>
              <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-black-700 hover:bg-gray-100">
                <div className="flex items-center gap-5 p-1">
                  <div className="text-2xl">
                    <IoLogOutOutline />
                  </div>
                  <div>{NAVBAR_CONSTANTS.logout}</div>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(Header);
