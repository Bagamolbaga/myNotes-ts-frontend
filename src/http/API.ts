import { AxiosResponse } from "axios"
import { INote, IUser } from "../types/state"
import { API } from './axios'

export interface IReqPromis {
    message?: string
    status?: number
    note: INote
    notes: INote[]
  }
  interface INewAPI {
    note: {
      createNote : (data: INote, user: IUser, selectedGroup: number) => Promise<AxiosResponse<any>>
      getNotes : (user: IUser) => Promise<AxiosResponse<any>>
      editNote : (selectNoteId: number, data: {title: string, text: string, tags: string[]}) => Promise<AxiosResponse<any>>
      fixedNote : (id: number) => Promise<AxiosResponse<any>>
      unFixedNote : (id: number) => Promise<AxiosResponse<any>>
      deleteNote : (id: number) => Promise<AxiosResponse<any>>
    },
    group: {
      createGroup : (title: string, user: IUser) => Promise<AxiosResponse<any>>
      getGroups : (user: IUser) => Promise<AxiosResponse<any>>
    },
    user: {
      registration : (name: string, password: string, img: string) => Promise<AxiosResponse<any>>
      login : (name: string, password: string) => Promise<AxiosResponse<any>>
      auth : () => Promise<AxiosResponse<any>>
    }
  }
  
  const NewAPI: INewAPI = {
    note: {
      createNote : async (data: INote, user: IUser, selectedGroup: number) => {
        return await API.post('api/note', {
          title: data.title,
          text: data.text,
          tags: data.tags,
          user_id: user.id,
          group_id: selectedGroup,
        })
      },
  
      getNotes : async (user: IUser) => {
        return await API.get('api/note', {
          params: { 
            user_id: user.id
          },
        })
      },
  
      editNote : async (selectNoteId: number, data: {title: string, text: string, tags: string[]}) => {
        return await API.put('api/note', {
          note_id: selectNoteId,
          newTitle: data.title,
          newText: data.text,
          newTags: data.tags,
        })
      },
  
      fixedNote : async (id: number) => {
        return await API.put('api/note', {
          note_id: id,
          toFixed: true,
        })
      },
  
      unFixedNote : async (id: number) => {
        return await API.put('api/note', {
          note_id: id,
          toUnFixed: true,
        })
      },
  
      deleteNote : async (id: number) => {
        return await API.delete('api/note', {
          params: { note_id: id },
        })
      }
    },
    group: {
      getGroups : async (user: IUser) => {
        return await API.get('api/group', {
          params: { user_id: user.id },
        })
      },
  
      createGroup : async (title: string, user: IUser) => {
        return await API.post('api/group', {
          title,
          user_id: user.id,
        })
      }
    },
    user: {
      registration : async (name: string, password: string, img: string) => {
        return await API.post('api/user/registration', {
          name,
          password,
          img,
        })
      },
      login : async (name: string, password: string) => {
        return await API.post('api/user/login', {
          name,
          password,
        })
      },
      auth : async () => {
        return await API.get('api/user/auth')
      }
    }
  }
  
  export default NewAPI