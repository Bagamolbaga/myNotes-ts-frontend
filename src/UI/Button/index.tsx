import React, { ButtonHTMLAttributes, FC } from "react";
import s from "./style.module.scss";

interface Props {
  className?: string
  children: React.ReactChildren | React.ReactNode;
  color?: string;
  onClick: () => void;
}

const Button: FC<Props & ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  const { className,color, onClick, children } = props;

  return (
    <button className={`${s.btn} ${className}`} style={{ background: color }} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
