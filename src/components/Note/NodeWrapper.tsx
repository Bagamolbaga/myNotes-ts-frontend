import React, { FC } from "react";
import { useTypeSelector } from "../../hooks/useTypeSelector";
import Note from "./Note";
import NoteSceleton from './NoteSceleton'

const NodeWrapper: FC = () => {
  const { notes } = useTypeSelector((state) => state);

  if (!notes.length) {
    return <NoteSceleton />;
  }

  return <Note />;
};

export default NodeWrapper;
