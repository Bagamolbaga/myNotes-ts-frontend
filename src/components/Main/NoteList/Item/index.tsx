import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTypeSelector } from "hooks/useTypeSelector";
import { INote } from "types/state";
import TagItem from "UI/TagItem";

import s from "./style.module.scss";
import { dateCreatedParse } from "utils/dateCreatedParse";
import { selectNote } from "store/actions/noteActions";

interface IItem {
  note: INote;
}

const Item: FC<IItem> = ({ note }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { groups } = useTypeSelector(state => state);

  const itemSelectHandler = () => {
      dispatch(selectNote(note.id))
      history.push(`/note/${note.id}`)
  }

  const circleColor = {
    background: groups.find((group) => group.id === note.group_id)?.color,
    filter: 'opacity(0.8)',
    border: `1px solid ${groups.find((group) => group.id === note.group_id)?.color}`,
  };

  return (
    <div className={s.item} onClick={itemSelectHandler}>
      <div className={s.item__header}>
        <div className={`${s.circle}`} style={circleColor}></div>
        <h6>{note.title}</h6>
      </div>
      <div className="item__tags">
        {note.tags?.map((tag) => (
          <TagItem key={tag} tag={tag} onlyView />
        ))}
        <span>{dateCreatedParse(note.createdAt!)}</span>
      </div>
    </div>
  );
};

export default Item;
