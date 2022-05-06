import React, { FC } from "react";
import s from './style.module.scss'

interface Props {
    title: string
    children: React.ReactChild | React.ReactNode
    className?: string
    onClose: () => void
}

const Modal: FC<Props> = ({title, children, className, onClose}) => {

    const stopPropaginationEvent = (e: React.MouseEvent) => e.stopPropagation()

  return (
    <div
      className={s.container}
      onClick={onClose}
    >
      <div className={`${s.modal} ${className}`}
        onClick={stopPropaginationEvent}
      >
        <p>{title}</p>
        {children}
      </div>
    </div>
  );
};

export default Modal;
