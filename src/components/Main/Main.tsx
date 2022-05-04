import React, { useState } from "react";
import NoteList from "./NoteList";
import TodoList from "./TodoList";

import s from "./style.module.scss";
import { useTitle } from "hooks/useTitle";

const Main = () => {
  useTitle('myNotes')

  const [bgImage, setBgImage] = useState('https://www.comunicaffe.com/wp-content/uploads/2020/08/drink-864958_1280.jpg')

  return (
    <div className={s.container}>
      <div className={s.image__container}>
        <img src={bgImage} alt="" onError={(e: any) => setBgImage('https://www.comunicaffe.com/wp-content/uploads/2020/08/drink-864958_1280.jpg')} />
      </div>
      <div className={s.row}>
        <NoteList />
        <TodoList />
      </div>
    </div>
  );
};

export default Main;
