import React from 'react'
import { useTypeSelector } from "../../hooks/useTypeSelector";
import SideBarSceleton from './SideBarSceleton';
import SideBar from './SideBar'

const SideBarWrapper = () => {
  const { notes } = useTypeSelector((state) => state);

    if(notes.length === 0){
        return <SideBarSceleton />
    }

  return <SideBar />
}

export default SideBarWrapper
