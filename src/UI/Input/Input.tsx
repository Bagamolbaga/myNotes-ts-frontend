import React, { ChangeEvent, FC, ReactNode } from "react";
import s from "./Input.module.scss";

interface InputProps {
  placeholder?: string
  value?: string
  type?: string
  icon?: FC | ReactNode
  className?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input: FC<InputProps> = ({icon, type, value, placeholder, className, onChange}) => {
  return (
    <div className={`${s.inputContainer} ${className}`}>
      {icon && (icon)}
      <input
        key="searchInput"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
      />
    </div>
  );
};
