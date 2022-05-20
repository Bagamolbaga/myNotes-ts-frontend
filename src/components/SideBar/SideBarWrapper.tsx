import React from "react";
import { useTypeSelector } from "../../hooks/useTypeSelector";
import SideBarSceleton from "./SideBarSceleton";
import SideBar from "./SideBar";
import { useIsMobile } from "hooks/useIsMobile";
import MobileSideBar from "components/Mobile/MobileSideBar";

const SideBarWrapper = () => {
  const { user } = useTypeSelector((state) => state);
  const { isMobile } = useIsMobile();

  if (isMobile()) return null;
  
  if (!user.isLogin) {
    return <SideBarSceleton />;
  }

  return <SideBar />;
};

export default SideBarWrapper;
