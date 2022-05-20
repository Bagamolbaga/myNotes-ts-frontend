import React, { FC } from "react";
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectNote } from '../../../store/actions/noteActions'
import { INote, IState } from "../../../types/state";
import Editor from "../../Editor/Editor";
import { OutputData } from "@editorjs/editorjs";
import s from "./NoteListItem.module.scss";
import { dateCreatedParse } from "utils/dateCreatedParse";
import TagItem from "UI/TagItem";

interface NoteListItemProps {
  note: INote;
  selected?: boolean;
  inputFocusHandler?: () => void
}

const getState = (state: IState) => state

const NoteListItem: FC<NoteListItemProps> = ({
  note,
  selected,
  inputFocusHandler
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
    <div className={`${s.container} ${selected && s.selected}`} onClick={() => selectHandler(note.id)}>
      <div className={s.typeContainer}>
        <div className={s.typeCircle} style={circleColor}></div>
      </div>
      <div className={s.contentContainer}>
        <h4 className={s.title}>{note.title}</h4>
        {/* <Editor id={note.id} readOnly={true} value={noteDataText} onEditorReadyAfterHandler={inputFocusHandler} /> */}
        <div className={s.tags}>
          {note.tags.map(tag => <TagItem key={tag} tag={tag} onlyView />)}
        </div>
        <p >Created: {dateCreatedParse(note.createdAt as string)}</p>
      </div>
    </div>
  );
};

export default NoteListItem;
