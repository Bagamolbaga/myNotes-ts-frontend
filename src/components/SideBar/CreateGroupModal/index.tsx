import React, { ChangeEvent, FC } from 'react'
import Modal from '../../../UI/Modal/index'
import {Input} from '../../../UI/Input/Input'
import Button from '../../../UI/Button'

interface Props {
    titleValue: string
    colorValue: string
    createGroup: () => void
    onClose: () => void
    onTitleChange: (e: ChangeEvent<HTMLInputElement>) => void
    onColorChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const CreateGroupModal: FC<Props> = ({ titleValue, colorValue, createGroup, onClose, onTitleChange, onColorChange}) => {
    return (
        <Modal title='Create new Group' onClose={onClose}>
            <Input classNameForContainer='m-0 mt-1' value={titleValue} placeholder='group name' onChange={onTitleChange} />
            <Input classNameForContainer='m-0 mt-1 mb-1' type='color' value={colorValue} onChange={onColorChange} />
            <Button color='#5ec040' onClick={createGroup}>Create</Button>
        </Modal>
    )
}

export default CreateGroupModal
