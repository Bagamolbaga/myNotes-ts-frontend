import jwtDecode from "jwt-decode"
import { Dispatch } from "redux"
import {
  IAction,
  createGroup,
  createNote,
  getGroups,
  getNotes,
  editNote,
  setUser,
  logoutAction,
  setAuthError,
  deleteNote,
} from './actions'
import { IState } from "../types/state"
import { API } from '../http/axios'


export const createAsyncNote = (data: any) => async (dispatch: Dispatch<IAction>, getState: () => IState) => {
  const { user, selectedGroup } = getState()
  const res = await API.post('api/note', {
    title: data.title,
    text: data.text,
    tags: data.tags,
    user_id: user.id,
    group_id: selectedGroup,
  })
  if (res.status === 200) {
    dispatch(createNote(res.data))
  }
}

export const createAsyncGroup = (title: string) => async (dispatch: Dispatch<IAction>, getState: () => IState) => {
  const { user } = getState()
  const res = await API.post('api/group', {
    title,
    user_id: user.id,
  })
  if (res.status === 200) {
    dispatch(createGroup(res.data))
  }
}

export const getAsyncGroup = () => async (dispatch: Dispatch<IAction>, getState: () => IState) => {
  const { user } = getState()
  const res = await API.get('api/group', {
    params: { user_id: user.id },
  })
  if (res.status === 200) {
    dispatch(getGroups(res.data))
  }
}

export const getAsyncNotes = () => async (dispatch: Dispatch<IAction>, getState: () => IState) => {
  const { user } = getState()
  const res = await API.get('api/note', {
    params: { user_id: user.id },
  })
  if (res.status === 200) {
    dispatch(getNotes(res.data))
  }
}

export const editAsyncNotes = (data: any) => async (dispatch: Dispatch<IAction>, getState: () => IState) => {
  const { selectNoteId } = getState()
  const res = await API.put('api/note', {
    note_id: selectNoteId,
    newTitle: data.title,
    newText: data.text,
    newTags: data.tags,
  })
  if (res.status === 200) {
    dispatch(editNote({ title: data.title, text: data.text, tags: data.tags }))
  }
}

export const fixedNote = (id: number) => async (dispatch: Dispatch<IAction>) => {
  const res = await API.put('api/note', {
    note_id: id,
    toFixed: true,
  })
  if (res.status === 200) {
    dispatch(editNote({ toFixed: true, id }))
  }
}

export const unFixedNote = (id: number) => async (dispatch: Dispatch<IAction>) => {
  const res = await API.put('api/note', {
    note_id: id,
    toUnFixed: true,
  })
  if (res.status === 200) {
    dispatch(editNote({ toUnFixed: true, id }))
  }
}

export const asyncDeleteNote = (id: number) => async (dispatch: Dispatch<IAction>) => {
  const res = await API.delete('api/note', {
    params: { note_id: id },
  })
  if (res.data) {
    dispatch(deleteNote(id))
  }
}

export const registration = (name: string, password: string, img: string) => async (dispatch: Dispatch<IAction>) => {
  const res = await API.post('api/user/registration', {
    name,
    password,
    img,
  })
  if (!res.data.token) {
    return dispatch(setAuthError(res.data.message))
  }

  if (res.data.token) {
    localStorage.setItem('my-notes-token', res.data.token)
    dispatch(setUser(jwtDecode(res.data.token)))
    dispatch(setAuthError(''))
  }
}

export const login = (name: string, password: string) => async (dispatch: Dispatch<IAction>) => {
  const res = await API.post('api/user/login', {
    name,
    password,
  })
  if (!res.data.token) {
    return dispatch(setAuthError(res.data.message))
  }

  if (res.data.token) {
    localStorage.setItem('my-notes-token', res.data.token)
    dispatch(setUser(jwtDecode(res.data.token)))
    dispatch(setAuthError(''))
  }
}

export const authCheck = () => async (dispatch: Dispatch<IAction>) => {
  const res = await API.get('api/user/auth')
  if (!res.data.token) {
    return false
  }

  if (res.data.token) {
    localStorage.setItem('my-notes-token', res.data.token)
    dispatch(setUser(jwtDecode(res.data.token)))
  }
}

export const logout = () => (dispatch: Dispatch<IAction>) => {
  localStorage.setItem('my-notes-token', '')
  dispatch(logoutAction())
}