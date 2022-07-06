import React, { CSSProperties, FC } from "react";

import { useTypeSelector } from "hooks/useTypeSelector";
import { IGroup } from "types/state";

import Modal from "UI/Modal";
import Button from "UI/Button";
import { LANGUAGE } from "UI/LANGUAGES";

import s from "./style.module.scss";

interface Props {
  group: IGroup;
  onClose: () => void;
  yesHandler: (id: number) => void;
  noHandler: () => void;
}

const translatedInfoModal = (lang: 'ru-RU' | 'en-US', styleGroupName: any, groupName: string, groupsCount: number) => {
  const langs = {
    'en-US': <p> The <span style={styleGroupName}>{groupName}</span> group and <span style={styleGroupName}>{groupsCount}</span> notes will be deleted </p>,
    'ru-RU': <p> Группа <span style={styleGroupName}>{groupName}</span> и <span style={styleGroupName}>{groupsCount}</span> заметок будут удалены</p>,
  }

  return langs[lang]
}

const DeleteGroupYesNoModal: FC<Props> = ({
  group,
  onClose,
  yesHandler,
  noHandler,
}) => {
  const { notes, lang } = useTypeSelector(state => state)

  const notesCount = notes.filter(note => note.group_id === group.id).length

  const styleGroupName: CSSProperties = {
    color: group.color
  }

  return (
    <Modal className={s.container} title={LANGUAGE[lang].Modals.DeleteGroup} onClose={onClose}>
        {translatedInfoModal(lang, styleGroupName, group.title, notesCount)}
      <Button
        className={`${s.btnYes} m-0 mt-2`}
        onClick={() => yesHandler(group.id)}
      >
        {LANGUAGE[lang].Modals.DeleteGroup_Yes}
      </Button>
      <Button className={`${s.btnNo} m-0 mt-1`} onClick={noHandler}>
        {LANGUAGE[lang].Modals.DeleteGroup_No}
      </Button>
    </Modal>
  );
};

export default DeleteGroupYesNoModal;
