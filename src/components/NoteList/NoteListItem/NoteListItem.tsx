import React, { FC } from "react";
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectNote } from '../../../store/actions/noteActions'
import { INote, IState } from "../../../types/state";
import Editor from "../../Editor";
import { OutputData } from "@editorjs/editorjs";
import s from "./NoteListItem.module.scss";

interface NoteListItemProps {
  note: INote;
  selected?: boolean;
}

const getState = (state: IState) => state

const NoteListItem: FC<NoteListItemProps> = ({
  note,
  selected,
}) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { groups } = useSelector(getState)

  const selectHandler = (id: number) => {
    history.push(`/note/${note.id}`);
    dispatch(selectNote(id));
  };

  const circleColor = {
    background: groups.find(group => group.id === note.group_id)?.color,
  };

  const noteDataText = JSON.parse(note.text) as OutputData;
  noteDataText.blocks = [noteDataText.blocks[0], noteDataText.blocks[1]];
  
  return (
    <div className={`${s.container} ${selected === true && s.selected}`} onClick={() => selectHandler(note.id)}>
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
