import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useTypeSelector } from '../hooks/useTypeSelector'
import { Col } from 'react-bootstrap'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  getAsyncGroup,
  getAsyncNotes,
  createAsyncGroup,
  authCheck,
} from '../store/asyncActions'
import {
  showAllNote,
  showCreateNoteForm,
  selectActiveGroup,
} from '../store/actions'
import Avatar from './Avatar'
import './styles/SideBar.scss'

const SideBar = () => {
  const history = useHistory()
  const [showAddGroupForm, setShowAddGroupForm] = useState(false)
  const [groupVal, setGroupVal] = useState('')

  const dispatch = useDispatch()
  const { groups, selectedGroup, user, showCeateNoteForm } = useTypeSelector((state) => state)

  useEffect(() => {
    dispatch(authCheck())
  }, [dispatch])

  useEffect(() => {
    if (user.isLogin) {
      dispatch(getAsyncGroup())
      dispatch(getAsyncNotes())
    }
  }, [dispatch, history, user])

  const isDisabled = !groupVal.length

  const addNewGroup = () => {
    setShowAddGroupForm(false)
    setGroupVal('')
    dispatch(createAsyncGroup(groupVal))
  }

  return (
    <Col className="sideBar__container">
      <Avatar />

      <Link to="/note/create" className={`sideBar__btn_notes ${showCeateNoteForm && 'sideBar__btn_notes-all-cheked'}`} onClick={() => dispatch(showCreateNoteForm())}>
        <FontAwesomeIcon icon={faPlus} />
        add Note
      </Link>

      <Link to="/" className={`sideBar__btn_notes sideBar__btn_notes-all ${selectedGroup === 'All' && 'sideBar__btn_notes-all-cheked'}`} onClick={() => dispatch(showAllNote())}>
        My notes
      </Link>

      {
        groups.map((g) => <button type="button" onClick={() => dispatch(selectActiveGroup(g.id))} key={g.id} className={selectedGroup === g.id ? 'sideBar__btn_group-cheked' : 'sideBar__btn_group'}>{g.title}</button>)
      }

      {
        showAddGroupForm
          ? (
            <>
              <input value={groupVal} onChange={(e) => setGroupVal(e.target.value)} type="text" className="sideBar__input_add" />
              <button type="button" disabled={isDisabled} onClick={addNewGroup} className="sideBar__btn_group_add">ADD</button>
              <button type="button" onClick={() => setShowAddGroupForm(false)} className="sideBar__btn_group_add sideBar__btn_group_add-back">back</button>
            </>
          )
          : <button type="button" onClick={() => setShowAddGroupForm(true)} className="sideBar__btn_group">Add Group</button>
      }

    </Col>
  )
}

export default SideBar