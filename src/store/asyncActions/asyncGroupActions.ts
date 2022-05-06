import { Dispatch } from "redux";
import { GroupActions, createGroup, getGroups, deleteGroup } from "../actions/groupActions";
import { deleteNote, NoteActions } from 'store/actions/noteActions'
import { OtherActions, setLoading } from "../actions/otherActions";
import { IState } from "../../types/state";
import { socketRef } from "../../http/socket-io";
import API from "../../http/API";

export const createAsyncGroup =
  (title: string, color: string) =>
  async (dispatch: Dispatch<GroupActions>, getState: () => IState) => {
    const { user } = getState();
    const res = await API.group.createGroup(title, color, user);
    if (res.status === 200) {
      dispatch(createGroup(res.data));
      socketRef.emit("newGroup", res.data);
    }
  };

type GroupAndOtherActions = GroupActions | OtherActions;
export const getAsyncGroup =
  () =>
  async (dispatch: Dispatch<GroupAndOtherActions>, getState: () => IState) => {
    const { user } = getState();
    dispatch(setLoading(true));
    const res = await API.group.getGroups(user);
    if (res.status === 200) {
      dispatch(getGroups(res.data));
    }
  };

  export const asyncDeleteGroup = (id: number) => async (dispatch: Dispatch<GroupActions | NoteActions>, getState: () => IState) => {
    const { notes } = getState();

    const res = await API.group.deleteGroup(id)

    if (res.data) {
      dispatch(deleteGroup(id))
      socketRef.emit('deleteGroup', id)

      notes.forEach( async ( note ) => {
        if (note.group_id === id) {
          const res = await API.note.deleteNote(note.id)
          
          if (res.data) {
            dispatch(deleteNote(note.id))
            socketRef.emit('deleteNote', id)
          }
        } 
      })
    

    }
  }
