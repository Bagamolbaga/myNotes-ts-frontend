import React, { FC } from "react";
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { selectNote } from '../../../store/actions/noteActions'
import { INote } from "../../../types/state";
import Editor from "../../Editor";
import { OutputData } from "@editorjs/editorjs";
import s from "./NoteListItem.module.scss";

interface NoteListItemProps {
  note: INote;
  color: string;
  selected?: boolean;
}

const NoteListItem: FC<NoteListItemProps> = ({
  note,
  color = "white",
  selected,
}) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const selectHandler = (id: number) => {
    history.push(`/note/${note.id}`);
    dispatch(selectNote(id));
  };

  const circleColor = {
    background: color,
  };

  const noteDataText = JSON.parse(note.text) as OutputData;
  noteDataText.blocks = [noteDataText.blocks[0], noteDataText.blocks[1]];

  return (
    <div className={`${s.container} + ${selected && s.selected}`} onClick={() => selectHandler(note.id)}>
      <div className={s.typeContainer}>
        <div className={s.typeCircle} style={circleColor}></div>
      </div>
      <div className={s.contentContainer}>
        <h4 className={s.title}>{note.title}</h4>
        <Editor id={note.id} readOnly={true} value={noteDataText} />
        <p className={s.tags}>{note.tags}</p>
      </div>
    </div>
  );
};

export default NoteListItem;
