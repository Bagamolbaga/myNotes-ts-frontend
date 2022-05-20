import React from 'react'
import { useTypeSelector } from 'hooks/useTypeSelector';
import Main from './index';
import MainSceleton from './MainSceleton';

const MainWrapper = () => {
    const { user } = useTypeSelector((state) => state);

    if (!user.isLogin) {
      return <MainSceleton />;
    }
  
    return <Main />;
}

export default MainWrapper