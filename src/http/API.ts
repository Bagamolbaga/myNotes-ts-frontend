import { IGroup } from './../types/state';
import { AxiosResponse } from "axios"
import { INote, IUser } from "../types/state"
import { API } from './axios'

type UserRes = {
    message?: string
    token?: string
  }
  interface INewAPI {
    note: {
      createNote : (data: INote, user: IUser, selectedGroup: number) => Promise<AxiosResponse<INote>>
      getNotes : (user: IUser) => Promise<AxiosResponse<INote[]>>
      editNote : (selectNoteId: number, data: {title: string, text: string, tags: string[]}) => Promise<AxiosResponse<any>>
      fixedNote : (id: number) => Promise<AxiosResponse<any>>
      unFixedNote : (id: number) => Promise<AxiosResponse<any>>
      deleteNote : (id: number) => Promise<AxiosResponse<any>>
    },
    group: {
      createGroup : (title: string, user: IUser) => Promise<AxiosResponse<IGroup>>
      getGroups : (user: IUser) => Promise<AxiosResponse<IGroup[]>>
    },
    user: {
      registration : (nameOrEmail: string, password: string, img: string) => Promise<AxiosResponse<UserRes>>
      login : (nameOrEmail: string, password: string) => Promise<AxiosResponse<UserRes>>
      auth : () => Promise<AxiosResponse<UserRes>>
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
      registration : async (nameOrEmail: string, password: string, img: string) => {
        return await API.post('api/user/registration', {
          nameOrEmail,
          password,
          img,
        })
      },
      login : async (nameOrEmail: string, password: string) => {
        return await API.post('api/user/login', {
          nameOrEmail,
          password,
        })
      },
      auth : async () => {
        return await API.get('api/user/auth')
      }
    }
  }
  
  export default NewAPI