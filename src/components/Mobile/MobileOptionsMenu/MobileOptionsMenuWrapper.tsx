import React from "react";
import { useTypeSelector } from "hooks/useTypeSelector";
import SideBarSceleton from "components/SideBar/SideBarSceleton";
import MobileOptionsMenu from "./MobileOptionsMenu";

const MobileOptionsMenuWrapper = () => {
  const { user } = useTypeSelector((state) => state);
  
  if (!user.isLogin) {
    return <SideBarSceleton />;
  }

  return <MobileOptionsMenu />;
};

export default MobileOptionsMenuWrapper;
