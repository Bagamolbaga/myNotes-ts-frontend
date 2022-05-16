import React, { FC } from "react";
import { useTypeSelector } from "hooks/useTypeSelector";
import MobileEditNote from "./MobileEditNote";
import MobileNoteSceleton from 'components/Mobile/MobileNote/MobileNoteSceleton'

const EditNodeWrapper: FC = () => {
  const { notes } = useTypeSelector((state) => state);

  if (!notes.length) {
    return <MobileNoteSceleton />;
  }

  return <MobileEditNote />;
};

export default EditNodeWrapper;
