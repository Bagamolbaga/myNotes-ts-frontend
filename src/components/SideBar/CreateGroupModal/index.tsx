import React, { ChangeEvent, FC, useEffect, useState } from 'react'
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

    const [titleIsValid, setTitleIsValid] = useState(true)

    useEffect(() => {
        titleValue.length !== 0 && setTitleIsValid(true)
    }, [titleValue])
    

    const createGroupHandeler = () => {
        if (!titleValue) {
            setTitleIsValid(false)
        }

        if (titleIsValid) {
            createGroup()
        }
    }

    return (
        <Modal title='Create new Group' onClose={onClose}>
            <Input classNameForContainer='m-0 mt-1' value={titleValue} isvalid={titleIsValid} placeholder='group name' onChange={onTitleChange} />
            <Input classNameForContainer='m-0 mt-1 mb-1' type='color' value={colorValue} onChange={onColorChange} />
            <Button color='#5ec040' onClick={createGroupHandeler}>Create</Button>
        </Modal>
    )
}

export default CreateGroupModal
