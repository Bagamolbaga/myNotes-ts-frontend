import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AnimatePresence } from "framer-motion/dist/framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useTypeSelector } from "hooks/useTypeSelector";
import { useHorizontalScroll } from "hooks/useHorizontalScroll";
import { selectActiveGroup } from "store/actions/groupActions";
import { selectNote } from "store/actions/noteActions";

import Item from "./Item";

import { LANGUAGE } from "UI/LANGUAGES";

import s from "./style.module.scss";

const NoteList = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { notes, lang } = useTypeSelector((state) => state);

  const noteListRef = useRef<HTMLDivElement>(null);

  useHorizontalScroll(noteListRef);

  const goToNotesListHandler = () => {
    if (notes.length !== 0) {
      const firstNote = notes[0];

      dispatch(selectActiveGroup("All"));
      dispatch(selectNote(firstNote.id));
      history.push(`/note/${firstNote.uuid}`);
    } else {
      history.push("/create-note");
    }
  };

  const createNoteHandler = () => history.push("/create-note");

  const sortedNotesByCreatedTime = notes.sort(
    (a, b) => Date.parse(b.createdAt!) - Date.parse(a.createdAt!)
  );

  return (
    <div className={s.container}>
      <div className={s.title} onClick={goToNotesListHandler}>
        {LANGUAGE[lang].MainPage.Notes} <FontAwesomeIcon icon="angle-right" />
      </div>
      <div className={s.list__container} ref={noteListRef}>
        <div className={s.icon__container} onClick={createNoteHandler}>
          <div className={s.icon}>
            <FontAwesomeIcon icon="file-circle-plus" />
          </div>
        </div>
        <AnimatePresence>
          {sortedNotesByCreatedTime.map((note) => (
            <Item key={note.id} note={note} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NoteList;
