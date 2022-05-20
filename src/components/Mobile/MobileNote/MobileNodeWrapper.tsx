import React, { FC } from "react";
import { useTypeSelector } from "hooks/useTypeSelector";
import Note from "./MobileNote";
import MobileNoteSceleton from './MobileNoteSceleton'

const NodeWrapper: FC = () => {
  const { notes } = useTypeSelector((state) => state);

  if (!notes.length) {
    return <MobileNoteSceleton />;
  }

  return <Note />;
};

export default NodeWrapper;
