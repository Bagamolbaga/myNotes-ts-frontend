import React from "react";
import s from "./SideBarSceleton.module.scss";

const SideBarSceleton = () => {
  return (
    <div className={s.SideBarSceleton__container}>
      <div className={s.SideBarSceleton__avatar_container}>
        <div className={s.avatar_circle}></div>
        <div className={s.avatar_stroke}></div>
      </div>
      <div className={s.nav_stroke}></div>
      <div className={s.nav_stroke}></div>
      <div className={s.nav_stroke}></div>
      <div className={s.nav_stroke}></div>
      <br />
      <div className={s.group_stroke}></div>
      <div className={s.group_stroke}></div>
      <div className={s.group_stroke}></div>
      <div className={s.group_stroke}></div>
      <div className={s.group_stroke}></div>
      <br />
      <br />
      <div className={s.group_stroke}></div>
      <div className={s.group_stroke}></div>
      <div className={s.group_stroke}></div>
      <div className={s.group_stroke}></div>
    </div>
  );
};

export default SideBarSceleton;
