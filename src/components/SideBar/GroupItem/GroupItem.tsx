import React, { FC, useState } from "react";
import s from "./GroupItem.module.scss";

interface GroupItemProps {
  showSideBar: boolean;
  color: string;
  label: string;
  onClick: () => void;
  isSelected: boolean;
  withIcon?: boolean;
}

const GroupItem: FC<GroupItemProps> = ({
  showSideBar,
  color = "white",
  label,
  onClick,
  isSelected,
  withIcon = true,
}) => {
  const [showPopUp, setShowPopUp] = useState(false);

  const iconStyle = {
    color: color,
  };

  return (
    <div className={s.container} onClick={onClick}>
      <div
        onMouseEnter={() => setShowPopUp(true)}
        onMouseLeave={() => setShowPopUp(false)}
        className={`${s.groupsItem} + ${
          showSideBar ? s.reverseTabOnlyIcon : s.reverseTabAllContent
        } + ${isSelected && s.selected}`}
      >
        <div className={s.iconAndLabelContainer}>
          <div className={s.iconContainer}>
            <i className="far fa-folder" style={iconStyle}></i>
          </div>
          <p>
            {label}
            <span className={s.groupsItemCount}>7</span>
          </p>
        </div>
        {withIcon && (
          <div className={`${s.iconContainer} ${s.iconDeleteGroup}`}>
            <i className="far fa-trash-alt"></i>
          </div>
        )}
      </div>
      {showPopUp && showSideBar && <p className={s.hoverAlt}>{label}</p>}
    </div>
  );
};

export default GroupItem;
