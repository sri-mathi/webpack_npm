import * as React from "react";
import { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import SideBarLogo from "../SideBarLogo";
import WorkNames from "../WorkNames";
import { SidebarProps } from "./types";
import { twMerge } from "tailwind-merge";
import ROUTES from "../../../utils/constants/routes";

const Sidebar: React.FC<SidebarProps> = ({
  onTableClick,
  onDashboardClick,
  selectedTable,
  activeItem,
  className = "", 
}) => {
  const location = useLocation();

  return (
    <div className={twMerge("w-85 h-full top-0 left-0 z-500 flex flex-col border-r border-gray-300 bg-gray-100/70 relative", className)}>
      <div className="p-0">
        <SideBarLogo />
      </div>

      <nav className="mt-3 px-3">
        <button
          onClick={onDashboardClick}
          className={`flex items-center gap-3 text-lg font-medium p-3 rounded-lg transition w-full text-left ${
            activeItem === "dashboard" || location.pathname === "/showconnection"
              ? "bg-[#DEF0FF] text-[#0060AA] shadow-md"
              : "text-gray-700 hover:text-blue-600 hover:bg-gray-200"
          }`}
        >
          <MdOutlineDashboard size={24} />
          <Link to={ROUTES.dashboard}>
            <span>Dashboard</span>
          </Link>
        </button>

        <WorkNames onTableClick={onTableClick} selectedTable={selectedTable} />
      </nav>
    </div>
  );
};

export default memo(Sidebar);
