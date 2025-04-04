import React from "react";
import LOGO_IMAGE from "../../../assets/do-works.svg";

const SideBarLogo = () => {
  return (
    <div className="p-4">
      <img src={LOGO_IMAGE} alt="Brand Logo" className="w-[120px] h-[40px]" />
    </div>
  );
};

export default SideBarLogo;
