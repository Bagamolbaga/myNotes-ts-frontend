import React, { ChangeEvent, FC, InputHTMLAttributes, ReactNode } from "react";
import s from "./Input.module.scss";

interface InputProps {
  placeholder?: string
  value?: string
  type?: string
  icon?: FC | ReactNode
  isValid?: boolean
  classNameForContainer?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input: FC<InputProps & InputHTMLAttributes<HTMLInputElement>> = (props) => {
  const { icon, classNameForContainer, isValid = true } = props
  return (
    <div className={`${s.inputContainer} ${classNameForContainer} ${!isValid && s.error}`}>
      {icon && (icon)}
      <input
        className="m-0"
        key="searchInput"
        {...props}
      />
    </div>
  );
};
