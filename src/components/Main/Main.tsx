import React from "react";
import NoteList from "./NoteList";
import TodoList from "./TodoList";

import s from "./style.module.scss";

const Main = () => {
  return (
    <div className={s.container}>
      <div className={s.image__container}>
        <img src="https://wallpapercave.com/uwp/uwp1959921.jpeg" alt="" />
      </div>
      <div className={s.row}>
        <NoteList />
        <TodoList />
      </div>
    </div>
  );
};

export default Main;
