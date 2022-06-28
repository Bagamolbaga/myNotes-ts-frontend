import React, { CSSProperties, FC } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useTypeSelector } from "hooks/useTypeSelector";
import { INote } from "types/state";
import TagItem from "UI/TagItem";

import s from "./style.module.scss";
import { dateCreatedParse } from "utils/dateCreatedParse";
import { selectNote } from "store/actions/noteActions";
import { motion, Variants } from "framer-motion/dist/framer-motion";

interface IItem {
  note: INote;
}

const Item: FC<IItem> = ({ note }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { groups } = useTypeSelector((state) => state);

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

  const itemSelectHandler = () => {
    dispatch(selectNote(note.id));
    history.push(`/note/${note.uuid}`);
  };

  const circleColor = {
    background: groups.find((group) => group.id === note.group_id)?.color,
    filter: "opacity(0.8)",
    border: `1px solid ${
      groups.find((group) => group.id === note.group_id)?.color
    }`,
  };

  const bgImage: CSSProperties = {
    backgroundImage: `url(${note.headerImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <motion.div
      initial={"initial"}
      animate={"show"}
      exit={"hide"}
      variants={variants}
      className={s.item}
      style={bgImage}
      onClick={itemSelectHandler}
    >
      <div className={s.item__header}>
        <div className={`${s.circle}`} style={circleColor}></div>
        <h6>{note.title}</h6>
      </div>
      <div className="item__tags">
        {note.tags?.map((tag) => (
          <TagItem className="mt-05" key={tag} tag={tag} onlyView />
        ))}
        <div className={s.item__date}>{dateCreatedParse(note.createdAt!)}</div>
      </div>
    </motion.div>
  );
};

export default Item;
