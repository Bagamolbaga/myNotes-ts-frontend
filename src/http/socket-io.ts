import { io } from 'socket.io-client'
import { createGroup, createNote, deleteNote, editNote, selectNote } from '../store/actions'
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
    store.dispatch(selectNote(data.selectNoteId))
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
