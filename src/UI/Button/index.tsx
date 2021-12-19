import React, { FC } from "react";
import s from "./style.module.scss";

interface Props {
  children: React.ReactChildren | React.ReactNode;
  color: string;
  onClick: () => void;
}

const Button: FC<Props> = ({ children, color, onClick }) => {
  return (
    <button className={s.btn} style={{ background: color }} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
