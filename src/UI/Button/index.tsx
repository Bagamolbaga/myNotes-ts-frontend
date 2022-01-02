import React, { FC } from "react";
import s from "./style.module.scss";

interface Props {
  className?: string
  children: React.ReactChildren | React.ReactNode;
  color: string;
  onClick: () => void;
}

const Button: FC<Props> = ({ className, children, color, onClick }) => {
  return (
    <button className={`${s.btn} ${className}`} style={{ background: color }} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
