import React from "react";
import s from "./style.module.scss";

const MainSceleton = () => {
  return (
    <div className={s.container}>
      <div className={s.container__noteList__container}>
        <div className={s.title}></div>
        <div className={s.container__items}>
          <div className={s.item}></div>
          <div className={s.item}></div>
          <div className={s.item}></div>
          <div className={s.item}></div>
        </div>
      </div>
      <div className={s.container__todoList__container}>
        <div className={s.item}></div>
        <div className={s.item}></div>
        <div className={s.item}></div>
        <div className={s.item}></div>
        <div className={s.item}></div>
      </div>
    </div>
  );
};

export default MainSceleton;
