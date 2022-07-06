import React, { ChangeEvent, FC, useEffect, useState } from 'react'

import { useTypeSelector } from 'hooks/useTypeSelector';

import Modal from '../../../UI/Modal/index'
import Button from '../../../UI/Button'
import {Input} from '../../../UI/Input/Input'
import { LANGUAGE } from "UI/LANGUAGES";

interface Props {
    titleValue: string
    colorValue: string
    createGroup: () => void
    onClose: () => void
    onTitleChange: (e: ChangeEvent<HTMLInputElement>) => void
    onColorChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const CreateGroupModal: FC<Props> = ({ titleValue, colorValue, createGroup, onClose, onTitleChange, onColorChange}) => {
    const lang = useTypeSelector(state => state.lang)

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
        <Modal title={LANGUAGE[lang].Modals.CreateNewGroup} onClose={onClose}>
            <Input classNameForContainer='m-0 mt-1' value={titleValue} isvalid={titleIsValid} placeholder={LANGUAGE[lang].Modals.CreateNewGroup_GroupName} onChange={onTitleChange} />
            <Input classNameForContainer='m-0 mt-1 mb-1' type='color' value={colorValue} onChange={onColorChange} />
            <Button color='#5ec040' onClick={createGroupHandeler}>{LANGUAGE[lang].Modals.CreateNewGroup_Create}</Button>
        </Modal>
    )
}

export default CreateGroupModal
