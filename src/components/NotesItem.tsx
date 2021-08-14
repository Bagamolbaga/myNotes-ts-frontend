import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useTypeSelector } from '../hooks/useTypeSelector'
import MarkdownPreview from '@uiw/react-markdown-preview'
import { faTimes, faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { selectNote } from '../store/actions'
import { asyncDeleteNote, fixedNote, unFixedNote } from '../store/asyncActions'
import './styles/NotesItem.scss'
import { INote } from '../types/state'

interface NotesItemProps {
    data: INote
}

const NotesItem: React.FC<NotesItemProps> = ({ data }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { notes } = useTypeSelector((state) => state)

  const selectHandler = (id: number) => {
    history.push(`/note/${data.id}`)
    dispatch(selectNote(id))
  }

  const deleteHandler = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation()
    dispatch(asyncDeleteNote(id))
  }

  const fixedHandler = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation()
    const fixedNotesLength = notes.filter((note) => note.fixed).length

    if (data.fixed) {
      dispatch(unFixedNote(id))
    } else if (fixedNotesLength < 3) {
      dispatch(fixedNote(id))
    }
  }

  return (
    <div role="button" tabIndex={0} className="notesItem__container" data-node-type="parent" onClick={() => selectHandler(data.id)}>
      <div>
        <div className="notesItem__container-title">
          <h4>{data.title}</h4>
        </div>
        <div className="notesItem__container-MD_container">
          <MarkdownPreview source={data.text} />
        </div>
      </div>
      <div>
        <div className="notesItem__container_tags">
          {data.tags && data.tags.map((tag) => (
            <p key={tag + data.title} className="notesItem__container_tags-tag">
              {`#${tag}`}
            </p>
          ))}
        </div>
        <div className="notesItem__container__delete-container">
          <button
            type="button"
            className={data.fixed ? 'notesItem__container__delete-btn' : 'notesItem__container__fixed-btn'}
            data-node-type="btn-fix"
            onClick={(e) => fixedHandler(e, data.id)}
          >
            <FontAwesomeIcon icon={faLink} />
          </button>
          <button
            type="button"
            className="notesItem__container__delete-btn"
            data-node-type="btn-del"
            onClick={(e) => deleteHandler(e, data.id)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotesItem