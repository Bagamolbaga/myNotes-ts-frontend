import React, { FC } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { OutputData } from "@editorjs/editorjs";
import {
  motion,
  Variants,
  AnimatePresence,
} from "framer-motion/dist/framer-motion";

import { selectNote } from "../../../store/actions/noteActions";
import { INote, IState } from "../../../types/state";
import { dateCreatedParse } from "utils/dateCreatedParse";

import TagItem from "UI/TagItem";

import s from "./NoteListItem.module.scss";

interface NoteListItemProps {
  note: INote;
  selected?: boolean;
  inputFocusHandler?: () => void;
}

const getState = (state: IState) => state;

const NoteListItem: FC<NoteListItemProps> = ({
  note,
  selected,
  inputFocusHandler,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { groups } = useSelector(getState);

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

  const selectHandler = () => {
    history.push(`/note/${note.uuid}`);
    dispatch(selectNote(note.id));
  };

  const circleColor = {
    background: groups.find((group) => group.id === note.group_id)?.color,
  };

  const noteDataText = JSON.parse(note.text) as OutputData;
  noteDataText.blocks = [noteDataText.blocks[0], noteDataText.blocks[1]];

  return (
    <motion.div
      initial={"initial"}
      animate={"show"}
      exit={"hide"}
      variants={variants}
      className={`${s.container} ${selected && s.selected}`}
      onClick={selectHandler}
    >
      <div className={s.typeContainer}>
        <div className={s.typeCircle} style={circleColor}></div>
      </div>
      <div className={s.contentContainer}>
        <h4 className={s.title}>{note.title}</h4>
        {/* <Editor id={note.id} readOnly={true} value={noteDataText} onEditorReadyAfterHandler={inputFocusHandler} /> */}
        <div className={s.tags}>
          <AnimatePresence>
            {note.tags.map((tag) => (
              <TagItem key={tag} tag={tag} onlyView />
            ))}
          </AnimatePresence>
        </div>
        <p>Created: {dateCreatedParse(note.createdAt as string)}</p>
      </div>
    </motion.div>
  );
};

export default NoteListItem;
