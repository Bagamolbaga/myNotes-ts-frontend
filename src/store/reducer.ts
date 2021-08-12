import { IState } from '../types/state'
import { IAction, actionTypes } from './actions'

const initialState: IState = {
    selectNoteId: false,
    selectedGroup: 'All',
    showCeateNoteForm: false,
    showEditNoteForm: false,
    authError: '',
    user: {
        isLogin: false,
    },
    groups: [],
    notes: [],
  }

export const reducer = (state = initialState, action: IAction) : IState => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: {
                id: action.payload.id,
                name: action.payload.name,
                avatar: action.payload.avatar,
                isLogin: true,
                },
            }
        default:
            return state
    }
}