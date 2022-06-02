import React, {
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useState,
  useRef,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence } from "framer-motion/dist/framer-motion";

import { useOnClickOutside } from "hooks/useOnClickOutside";

import ToDoItem from "./Item";
import { Input } from "UI/Input/Input";

import s from "./style.module.scss";

export type ToDo = {
  id: number;
  title: string;
  done: boolean;
};

const TodoList = () => {
  const [data, setData] = useState<ToDo[]>(
    JSON.parse(localStorage.getItem("todo") || "[]") || []
  );

  const [title, setTitle] = useState("");
  const [titleIsValid, setTitleisValid] = useState(true);

  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    if (title.length !== 0) setTitleisValid(true);
  }, [title]);

  const onClickOutsideHandler = () => {
    if (title.length === 0) {
      setTitleisValid(true);
    }
  };

  useOnClickOutside(inputRef, onClickOutsideHandler);

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addToDoHandler();
    }
  };

  const addToDoHandler = () => {
    if (title.length === 0) {
      setTitleisValid(false);
    }

    if (title.trim().length !== 0) {
      setData([
        ...data,
        {
          id: data.length,
          title,
          done: false,
        },
      ]);

      setTitle("");
    }
  };

  const doneToggleToDoHandler = (id: number) => {
    setData(
      data.map((todo) => {
        if (todo.id === id) todo.done = !todo.done;
        return todo;
      })
    );
  };

  const deleteToDoHandler = (id: number) => {
    setData(data.filter((todo) => todo.id !== id));
  };

  return (
    <div className={s.container}>
      <div className={s.header}>
        <div className={s.inputContainer} ref={inputRef}>
          <Input
            value={title}
            isvalid={titleIsValid}
            onChange={onChangeTitleHandler}
            onKeyDown={onPressEnter}
            icon={<FontAwesomeIcon icon="list-check" />}
          />
        </div>
        <button className={s.btnAdd} onClick={addToDoHandler}>
          <FontAwesomeIcon icon="plus" />
        </button>
      </div>
      <div className={s.todoList}>
        <AnimatePresence>
          {data.map((item) => (
            <ToDoItem
              key={item.id}
              todo={item}
              doneToggleHandler={doneToggleToDoHandler}
              deleteHandler={deleteToDoHandler}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TodoList;
