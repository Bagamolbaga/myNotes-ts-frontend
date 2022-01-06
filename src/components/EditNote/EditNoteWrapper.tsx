import React, { FC } from "react";
import { useTypeSelector } from "../../hooks/useTypeSelector";
import EditNote from "./EditNote";
import NoteSceleton from '../Note/NoteSceleton'

const EditNodeWrapper: FC = () => {
  const { notes } = useTypeSelector((state) => state);

  if (!notes.length) {
    return <NoteSceleton />;
  }

  return <EditNote />;
};

export default EditNodeWrapper;
