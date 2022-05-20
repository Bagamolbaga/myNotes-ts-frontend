import React, { FC, MouseEvent } from "react";
import s from "./style.module.scss";

interface NoteOptionsProps {
  noteFixed: boolean
  stopPropagationEvent: (e: MouseEvent) => void;
  pinnedNoteHandler: () => void;
  copyNoteHandler: () => void;
  deleteNoteHandler: () => void;
}

const NoteOptions: FC<NoteOptionsProps> = ({
  noteFixed,
  stopPropagationEvent,
  pinnedNoteHandler,
  copyNoteHandler,
  deleteNoteHandler,
}) => {
  return (
    <div className={s.optionsModalContainer} onClick={stopPropagationEvent}>
      <div className={s.optionsItemContainer} onClick={pinnedNoteHandler}>
        <div className={s.iconContainer}>
          <i className="fas fa-thumbtack"></i>
        </div>
        <p>{noteFixed ? "Unpin note" : "Pin note"}</p>
      </div>
      <div className={s.optionsItemContainer} onClick={copyNoteHandler}>
        <div className={s.iconContainer}>
          <i className="far fa-copy"></i>
        </div>
        <p>Copy note</p>
      </div>
      <div className={s.optionsItemContainer} onClick={deleteNoteHandler}>
        <div className={s.iconContainer}>
          <i className="far fa-trash-alt"></i>
        </div>
        <p>Delete note</p>
      </div>
    </div>
  );
};

export default NoteOptions;
