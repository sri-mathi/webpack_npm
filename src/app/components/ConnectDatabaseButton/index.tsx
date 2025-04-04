import { FaDatabase } from "react-icons/fa";

const ConnectDatabaseButton = () => {
  return (
    <button className="flex items-center gap-2 bg-[#FB7000] text-white py-2 px-4 rounded-lg hover:bg-orange-400 cursor-pointer">
      <FaDatabase className="text-l" />
      <span>Connect Database</span>
    </button>
  );
};

export default ConnectDatabaseButton;
