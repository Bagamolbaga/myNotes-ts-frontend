import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ToDo } from "../index";

import s from "./style.module.scss";
import { motion, Variants } from "framer-motion/dist/framer-motion";

interface IToDoItem {
  todo: ToDo;
  doneToggleHandler: (id: number) => void;
  deleteHandler: (id: number) => void;
}

const ToDoItem: FC<IToDoItem> = ({
  todo,
  doneToggleHandler,
  deleteHandler,
}) => {
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
        duration: 0.2
      }
    },
  };
  return (
      <motion.div
        initial={"initial"}
        animate={"show"}
        exit={'hide'}
        variants={variants}
        className={`${s.container} ${
          todo.done ? s.borderDone : s.borderDefault
        }`}
      >
        {todo.title}
        <div className={s.btnContainer}>
          <button
            className={`${s.btnDone} ${todo.done && s.btnDoneRed}`}
            onClick={() => doneToggleHandler(todo.id)}
          >
            <FontAwesomeIcon icon="circle-check" />
          </button>
          <button
            className={s.btnDelete}
            onClick={() => deleteHandler(todo.id)}
          >
            <FontAwesomeIcon icon="circle-xmark" />
          </button>
        </div>
      </motion.div>
  );
};

export default ToDoItem;
