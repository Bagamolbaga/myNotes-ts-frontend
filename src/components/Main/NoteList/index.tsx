import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useTypeSelector } from "hooks/useTypeSelector";
import { selectActiveGroup } from "store/actions/groupActions";
import { selectNote } from "store/actions/noteActions";

import Item from "./Item";

import s from "./style.module.scss";

const NoteList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { notes } = useTypeSelector((state) => state);

  const goToNotesListHandler = () => {
    if (notes.length !== 0) {
      const firstNote = notes[0];

      dispatch(selectActiveGroup("All"));
      dispatch(selectNote(firstNote.id));
      history.push(`/note/${firstNote.id}`);
    } else {
      history.push("/create-note");
    }
  };

  const createNoteHandler = () => history.push("/create-note");

  return (
    <div className={s.container}>
      <div className={s.title} onClick={goToNotesListHandler}>
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
