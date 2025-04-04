export interface ConnectionPopupProps {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setConnectionStatus: React.Dispatch<React.SetStateAction<string | null>>;
  }