import { IUser, IGroup, INote } from '../types/state'

export enum actionTypes {
    GET_NOTES = 'GET_NOTES',
    CREATE_NOTE = 'CREATE_NOTE',
    GET_GROUP = 'GET_GROUP',
    CREATE_GROUP = 'CREATE_GROUP',
    SHOW_ALL_NOTES = 'SHOW_ALL_NOTES',
    SHOW_CREATE_NOTE_FORM = 'SHOW_CREATE_NOTE_FORM',
    SELECT_ACTIVE_GROUP = 'SELECT_ACTIVE_GROUP',
    SHOW_ACTIVE_GROUP = 'SHOW_ACTIVE_GROUP',
    SELECT_NOTE = 'SELECT_NOTE',
    EDIT_SELECT_NOTE = 'EDIT_SELECT_NOTE',
    SHOW_EDIT_NOTE_FORM = 'SHOW_EDIT_NOTE_FORM',
    SET_USER = 'SET_USER',
    LOGOUT = 'LOGOUT',
    SET_EROR = 'SET_EROR',
    GO_BACK = 'GO_BACK',
    DELETE_NOTE = 'DELETE_NOTE',
}

interface setUserAction {
    type: actionTypes.SET_USER
    payload: IUser
}


export const setUser = (value: IUser) : setUserAction  => ({
    type: actionTypes.SET_USER,
    payload: value,
  })

export type IAction = setUserAction