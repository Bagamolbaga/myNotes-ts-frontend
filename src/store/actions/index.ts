import { UserActions } from './userActions'
import { GroupActions } from './groupActions'
import { NoteActions } from './noteActions'
import { OtherActions } from './otherActions'

export type IActions = UserActions | GroupActions | NoteActions | OtherActions
