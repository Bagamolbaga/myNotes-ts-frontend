export interface IState {
    selectNoteId: boolean | number
    selectedGroup: boolean | number | string
    showCeateNoteForm: boolean
    showEditNoteForm: boolean
    authError: string
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
    user_id: number
    createdAt: string
    updatedAt: string
}

export interface INote {
    id: number
    title: string | undefined
    text: string | undefined
    user_id: number
    group_id: number
    fixed?: boolean
    tags: string[] | undefined
    createdAt?: string
    updatedAt?: string
}


