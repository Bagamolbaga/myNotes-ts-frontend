import React from 'react'
import { useTypeSelector } from "../../hooks/useTypeSelector";
import SideBarSceleton from './SideBarSceleton';
import SideBar from './SideBar'

const SideBarWrapper = () => {
  const { loading } = useTypeSelector((state) => state);

    if(loading){
        return <SideBarSceleton />
    }

  return <SideBar />
}

export default SideBarWrapper
