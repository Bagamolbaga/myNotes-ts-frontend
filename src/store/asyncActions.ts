import { Dispatch } from "redux"
import { IAction, setUser } from "./actions"
import { API } from '../http/axios'

export const login = (name: string, password: string) => async (dispatch: Dispatch<IAction>) => {
    const res = await API.post('api/user/login', {
      name,
      password,
    })
    dispatch(setUser({id: 5, isLogin: true}))
}
