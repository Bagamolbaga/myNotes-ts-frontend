import React, { CSSProperties, FC } from "react";

import { useTypeSelector } from "hooks/useTypeSelector";
import { IGroup } from "types/state";

import Modal from "UI/Modal";
import Button from "UI/Button";

import s from "./style.module.scss";

interface Props {
  group: IGroup;
  onClose: () => void;
  yesHandler: (id: number) => void;
  noHandler: () => void;
}

const DeleteGroupYesNoModal: FC<Props> = ({
  group,
  onClose,
  yesHandler,
  noHandler,
}) => {
  const { notes } = useTypeSelector(state => state)

  const notesCount = notes.filter(note => note.group_id === group.id).length

  const styleGroupName: CSSProperties = {
    color: group.color
  }

  return (
    <Modal className={s.container} title={`Delete group?`} onClose={onClose}>
      <p>
        The <span style={styleGroupName}>{group.title}</span> group and <span style={styleGroupName}>{notesCount}</span> notes will be deleted
      </p>
      <Button
        className={`${s.btnYes} m-0 mt-2`}
        onClick={() => yesHandler(group.id)}
      >
        Yes
      </Button>
      <Button className={`${s.btnNo} m-0 mt-1`} onClick={noHandler}>
        Back
      </Button>
    </Modal>
  );
};

export default DeleteGroupYesNoModal;
