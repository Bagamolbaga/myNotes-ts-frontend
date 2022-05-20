import React, { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { ToDo } from '../index'

import s from './style.module.scss'

interface IToDoItem {
    todo: ToDo
    doneToggleHandler: (id: number) => void
    deleteHandler: (id: number) => void
}

const ToDoItem: FC<IToDoItem> = ({ todo, doneToggleHandler, deleteHandler }) => {
  return (
    <div className={`${s.container} ${todo.done ? s.borderDone : s.borderDefault}`}>
        {todo.title}
        <div className={s.btnContainer}>
            <button className={`${s.btnDone} ${todo.done && s.btnDoneRed}`} onClick={() => doneToggleHandler(todo.id)}>
                <FontAwesomeIcon icon="circle-check" />
            </button>
            <button className={s.btnDelete} onClick={() => deleteHandler(todo.id)}>
                <FontAwesomeIcon icon="circle-xmark" />
            </button>
        </div>
    </div>
  )
}

export default ToDoItem