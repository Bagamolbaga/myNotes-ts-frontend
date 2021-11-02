import React, { FC } from 'react';
import { INote } from '../../../types/state';
import QuillEditor from '../../QuillEditor';
import s from './NoteListItem.module.scss';
import '../../Quill.scss'

interface NoteListItemProps {
	note: INote;
	color: string;
	selected?: boolean;
}

const NoteListItem: FC<NoteListItemProps> = ({ note, color = 'white', selected }) => {
	const circleColor = {
		background: color
	};

	return (
		<div className={`${s.container} + ${selected && s.selected}`}>
			<div className={s.typeContainer}>
				<div className={s.typeCircle} style={circleColor}></div>
			</div>
			<div className={s.contentContainer}>
				<h4 className={s.title}>{note.title}</h4>
				<p className={s.text}>{<QuillEditor className="quillEditor__hideToolBar" value={note.text}/>}</p>
				<p className={s.tags}>{note.tags}</p>
			</div>
		</div>
	);
};

export default NoteListItem;
