import { useTypeSelector } from "hooks/useTypeSelector";
import React, { FC, MouseEvent } from "react";

import { LANGUAGE } from "UI/LANGUAGES";

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
  const lang = useTypeSelector(state => state.lang)

  return (
    <div className={s.optionsModalContainer} onClick={stopPropagationEvent}>
      <div className={s.optionsItemContainer} onClick={pinnedNoteHandler}>
        <div className={s.iconContainer}>
          <i className="fas fa-thumbtack"></i>
        </div>
        <p>{noteFixed ? LANGUAGE[lang].NoteOptions.Unpin : LANGUAGE[lang].NoteOptions.Pin}</p>
      </div>
      <div className={s.optionsItemContainer} onClick={copyNoteHandler}>
        <div className={s.iconContainer}>
          <i className="far fa-copy"></i>
        </div>
        <p>{LANGUAGE[lang].NoteOptions.Copy}</p>
      </div>
      <div className={s.optionsItemContainer} onClick={deleteNoteHandler}>
        <div className={s.iconContainer}>
          <i className="far fa-trash-alt"></i>
        </div>
        <p>{LANGUAGE[lang].NoteOptions.Delete}</p>
      </div>
    </div>
  );
};

export default NoteOptions;
