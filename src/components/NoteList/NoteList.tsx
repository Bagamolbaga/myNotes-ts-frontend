import React, { FC } from 'react';
import { useTypeSelector } from '../../hooks/useTypeSelector';
import NoteListItem from './NoteListItem/NoteListItem';
import s from './NoteList.module.scss';

const NoteList: FC = () => {
	const { notes } = useTypeSelector(state => state)

	const pinnedNotes = notes.filter(note => note.fixed)

	return (
		<div className={s.container}>
			<div className={s.headerContainer}>
				<div className={s.inputContainer}>
					<i className="fas fa-search"></i>
					<input placeholder="Search" type="text" name="search" id="" />
				</div>
				<button className={s.btnAdd}>
					<i className="fas fa-plus"></i>
				</button>
			</div>
			<div className={s.listAndPinnedListContainer}>
				<div>
					<div className={s.listTitle}>
						<i className="fas fa-list-ul"></i>
						<p>All notes</p>
						<i className={`fas fa-sort-down ${s.arrowRotate}`}></i>
					</div>
					<div className={s.list}>
						{notes.map(note => <NoteListItem key={note.id} note={note} color="#d83030" />)}
					</div>
				</div>
				<div
					className={s.pinnedList}
					style={{ maxHeight: 3 * 125 + 61 + 'px' }}>
					<div className={s.listTitle}>
						<i className="fas fa-list-ul"></i>
						<p>Pinned notes</p>
						<i className={`fas fa-sort-down ${s.arrowRotate}`}></i>
					</div>
					{pinnedNotes && pinnedNotes.map(note => <NoteListItem key={note.id} note={note} color="#d83030" />)}
				</div>
			</div>
		</div>
	);
};

export default NoteList;
