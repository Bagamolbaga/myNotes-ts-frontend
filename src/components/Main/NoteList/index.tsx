import React from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTypeSelector } from "hooks/useTypeSelector";
import Item from "./Item";
import s from "./style.module.scss";

const NoteList = () => {
  const history = useHistory();
  const { notes } = useTypeSelector((state) => state);

  const createNoteHandler = () => history.push("/create-note");

  return (
    <div className={s.container}>
      <div className={s.title}>
        Notes <FontAwesomeIcon icon="angle-right" />
      </div>
      <div className={s.list__container}>
        <div className={s.icon__container} onClick={createNoteHandler}>
          <div className={s.icon}>
            <FontAwesomeIcon icon="file-circle-plus" />
          </div>
        </div>
        {notes.map((note) => (
          <Item key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
};

export default NoteList;
