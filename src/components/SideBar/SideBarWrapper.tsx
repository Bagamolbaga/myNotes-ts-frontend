import React from 'react'
import { useTypeSelector } from "../../hooks/useTypeSelector";
import SideBarSceleton from './SideBarSceleton';
import SideBar from './SideBar'

const SideBarWrapper = () => {
  const { user } = useTypeSelector((state) => state);

    if(!user.isLogin){
        return <SideBarSceleton />
    }

  return <SideBar />
}

export default SideBarWrapper
