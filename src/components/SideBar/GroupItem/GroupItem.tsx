import React, { FC, MouseEvent, useState } from "react";
import { motion, Variants } from "framer-motion/dist/framer-motion";

import s from "./GroupItem.module.scss";

interface GroupItemProps {
  showSideBar: boolean;
  color: string;
  label: string;
  notesCount: number;
  onClick: () => void;
  deleteHandler: (e: MouseEvent<HTMLDivElement>) => void;
  isSelected: boolean;
  withIcon?: boolean;
}

const GroupItem: FC<GroupItemProps> = ({
  showSideBar,
  color = "white",
  label,
  notesCount = 0,
  onClick,
  deleteHandler,
  isSelected,
  withIcon = true,
}) => {
  const [showPopUp, setShowPopUp] = useState(false);

  const variants: Variants = {
    initial: {
      opacity: 0,
    },
    show: {
      opacity: 1,
    },
    hide: {
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  const iconStyle = {
    color: color,
  };

  return (
    <motion.div
      initial={"initial"}
      animate={"show"}
      exit={"hide"}
      variants={variants}
      className={s.container}
      onClick={onClick}
    >
      <motion.div
        onMouseEnter={() => setShowPopUp(true)}
        onMouseLeave={() => setShowPopUp(false)}
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 1 }}
        data-isShow={showSideBar}
        layout
        className={`${s.groupsItem} ${isSelected && s.selected}`}
      >
        <div className={s.iconAndLabelContainer}>
          <div className={s.iconContainer}>
            <i className="far fa-folder" style={iconStyle}></i>
          </div>
          <p>
            {label}
            <span className={s.groupsItemCount}>{notesCount}</span>
          </p>
        </div>
        {withIcon && (
          <div
            className={`${s.iconContainer} ${s.iconDeleteGroup}`}
            onClick={(e: MouseEvent<HTMLDivElement>) => deleteHandler(e)}
          >
            <i className="far fa-trash-alt"></i>
          </div>
        )}
      </motion.div>
      {showPopUp && showSideBar && <p className={s.hoverAlt}>{label}</p>}
    </motion.div>
  );
};

export default GroupItem;
