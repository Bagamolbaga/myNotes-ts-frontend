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
      editNote : (selectNoteId: number, data: {title: string, text: string, tags: string[], groupId: number, headerImg: string}) => Promise<AxiosResponse<any>>
      fixedNote : (id: number) => Promise<AxiosResponse<any>>
      unFixedNote : (id: number) => Promise<AxiosResponse<any>>
      deleteNote : (id: number) => Promise<AxiosResponse<any>>
    },
    group: {
      createGroup : (title: string, color: string, user: IUser) => Promise<AxiosResponse<IGroup>>
      getGroups : (user: IUser) => Promise<AxiosResponse<IGroup[]>>
      deleteGroup : (id: number) => Promise<AxiosResponse<number>>
    },
    user: {
      registration : (name: string, email: string, password: string, img: string) => Promise<AxiosResponse<UserRes>>
      login : (nameOrEmail: string, password: string) => Promise<AxiosResponse<UserRes>>
      auth : () => Promise<AxiosResponse<UserRes>>
      sendEmailResetPassword : (nameOrEmail: string) => Promise<AxiosResponse<UserRes>>
      resetPassword : (tokenId: string, newPass: string) => Promise<AxiosResponse<UserRes>>
      authGoogle : (name: string, email: string, avatar: string) => Promise<AxiosResponse<UserRes>>
    }
  }
  
  const NewAPI: INewAPI = {
    note: {
      createNote : async (data: INote, user: IUser, selectedGroup: number) => {
        return await API.post('api/note', {
          headerImg: data.headerImg,
          title: data.title,
          text: data.text,
          tags: data.tags,
          user_id: user.id,
          group_id: selectedGroup,
          uuid: data.uuid
        })
      },
  
      getNotes : async (user: IUser) => {
        return await API.get('api/note', {
          params: { 
            user_id: user.id
          },
        })
      },
  
      editNote : async (selectNoteId, data) => {
        return await API.put('api/note', {
          note_id: selectNoteId,
          newTitle: data.title,
          newText: data.text,
          newTags: data.tags,
          newGroupId: data.groupId,
          newHeaderImg: data.headerImg,
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
  
      createGroup : async (title: string, color: string, user: IUser) => {
        return await API.post('api/group', {
          title,
          color,
          user_id: user.id,
        })
      },

      deleteGroup : async (id: number) => {
        return API.delete('api/group', {
          params: { group_id: id }
        })
      }
    },
    user: {
      registration : async (name: string, email: string, password: string, img: string) => {
        return await API.post('api/user/registration', {
          name,
          email,
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
      },
      sendEmailResetPassword : async (nameOrEmail: string) => {
        return await API.post('api/user/send-email-reset-password', {
          nameOrEmail
        })
      },
      resetPassword : async (tokenId: string, newPass: string) => {
        return await API.post('api/user/reset-password', {
          tokenId,
          newPass
        })
      },
      authGoogle:async (name: string, email: string, avatar: string) => {
        return API.post('api/user/google-auth', {
          name,
          email,
          avatar,
        })
      }
    }
  }
  
  export default NewAPI