import { io } from 'socket.io-client'
import { createGroup, deleteGroup } from '../store/actions/groupActions'
import { createNote, deleteNote, editNote } from '../store/actions/noteActions'
import { store } from '../store/store'
import { IGroup, INote } from '../types/state'

export const socketRef = io(`${process.env.REACT_APP_API_URL_URL}`)

socketRef.on('newNote', (data: INote) => {
    store.dispatch(createNote(data))
})

socketRef.on('deleteNote', (id: number) => {
    store.dispatch(deleteNote(id))
})

socketRef.on('editNote', (data: any) => {
    store.dispatch(editNote(data))
})

socketRef.on('fixedNote', (data: any) => {
    store.dispatch(editNote(data))
})

socketRef.on('unFixedNote', (data: any) => {
    store.dispatch(editNote(data))
})

socketRef.on('newGroup', (data: IGroup) => {
    store.dispatch(createGroup(data))
})

socketRef.on('deleteGroup', (id: number) => {
    store.dispatch(deleteGroup(id))
})
