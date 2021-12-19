import React, { ChangeEvent, FC } from 'react'
import Modal from '../../../UI/Modal/index'
import {Input} from '../../../UI/Input/Input'
import Button from '../../../UI/Button'

interface Props {
    value: string
    createGroup: () => void
    onClose: () => void
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const CreateGroupModal: FC<Props> = ({ value, createGroup, onClose, onChange}) => {
    return (
        <Modal title='Create new Group' onClose={onClose}>
            <Input className='m-0 mt-1 mb-1' value={value} placeholder='group name' onChange={onChange} />
            <Button color='#5ec040' onClick={createGroup}>Create</Button>
        </Modal>
    )
}

export default CreateGroupModal
