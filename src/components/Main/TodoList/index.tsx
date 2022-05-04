import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useOnClickOutside } from "hooks/useOnClickOutside";

import { Input } from "UI/Input/Input";
import s from "./style.module.scss";
import { useRef } from "react";
import ToDoItem from "./Item";

export type ToDo = {
  id: number
  title: string
  done: boolean
}

const TodoList = () => {

  const [data, setData] = useState<ToDo[]>(JSON.parse(localStorage.getItem('todo') || '[]') || [])

  const [title, setTitle] = useState("");
  const [titleIsValid, setTitleisValid] = useState(true);

  const inputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(data))
  }, [data])
  
  useEffect(() => {
    if (title.length !== 0) setTitleisValid(true)
  }, [title])

  const onClickOutsideHandler = () => {
    if (title.length === 0) {
      setTitleisValid(true)
    }
  }

  useOnClickOutside(inputRef, onClickOutsideHandler)

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) =>{
    setTitle(e.target.value);
  }

  const onPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addToDoHandler()
    }
  }

  const addToDoHandler = () => {
    if (title.length === 0) {
      setTitleisValid(false)
    }

    if (title.trim().length !== 0) {
      setData([...data,
        {
          id: data.length,
          title,
          done: false,
        }
      ])

      setTitle('')
    }
  }

  const doneToggleToDoHandler = (id: number) => {
    setData(data.map(todo => {
      if (todo.id === id) todo.done = !todo.done
      return todo
    }))
  }

  const deleteToDoHandler = (id: number) => {
    setData(data.filter(todo => todo.id !== id))
  }

  return (
    <div className={s.container}>
      <div className={s.header}>
        <div className={s.inputContainer} ref={inputRef}>
          <Input
            value={title}
            isValid={titleIsValid}
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
        {
          data.map(item => (<ToDoItem todo={item} doneToggleHandler={doneToggleToDoHandler} deleteHandler={deleteToDoHandler} />))
        }
      </div>
    </div>
  );
};

export default TodoList;
