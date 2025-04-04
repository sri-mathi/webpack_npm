import { useState, useRef } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { uploadCSVFiles } from "../../../services/api/api";

const UploadButton: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      if (!selectedFiles) {
        fileInputRef.current.click();
      } else {
        handleUpload();
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(event.target.files);
    }
  };

  const handleUpload = async () => {
    if (!selectedFiles) return;

    setUploading(true);
    try {
      const response = await uploadCSVFiles(selectedFiles);
      console.log("Upload success: ", response);
      alert("Uploaded Successfully!");
      setSelectedFiles(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      alert("Upload Failed!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        multiple
        ref={fileInputRef}
        className="hidden"
        accept=".csv"
        onChange={handleFileChange}
      />
      <button
        onClick={handleButtonClick}
        className="flex items-center ml-3 gap-2 border-2 border-[#FFE0A5] text-orange-500 py-2 px-4 rounded-lg hover:bg-orange-400 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={uploading}
      >
        <MdOutlineFileUpload className="text-xl" />
        <span>
          {uploading
            ? "Uploading..."
            : selectedFiles
            ? selectedFiles.length === 1
              ? `Upload (${selectedFiles.length}) File`
              : `Upload (${selectedFiles.length}) Files`
            : "Select Files"}
        </span>
      </button>
    </div>
  );
};

export default UploadButton;
