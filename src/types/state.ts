export interface IState {
    selectNoteId: boolean | number
    selectedGroup: boolean | number | string
    showCeateNoteForm: boolean
    showEditNoteForm: boolean
    authError: string
    loading: boolean
    lang: 'ru-RU' | 'en-US'
    user: IUser
    groups: IGroup[]
    notes: INote[]
}

export interface IUser {
    id?: number
    name?: string
    avatar?: string
    isLogin: boolean
}

export interface IGroup {
    id: number
    title: string
    color: string
    user_id: number
    createdAt: string
    updatedAt: string
}

export interface INote {
    id: number
    uuid: string
    headerImg: string
    title: string
    text: string
    user_id: number
    group_id: number
    fixed?: boolean
    tags: string[]
    createdAt?: string
    updatedAt?: string
}


